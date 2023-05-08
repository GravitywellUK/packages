import { URLSearchParams } from "url";

import type { OauthBasicConfig } from "@serverless-stack/node/auth";
import { createAdapter } from "@serverless-stack/node/auth";
import { useEvent } from "@serverless-stack/node/context";
import fetch from "node-fetch";
import type { Issuer } from "openid-client";
import { generators } from "openid-client";
import jwt from "jsonwebtoken";
import {
  useDomainName,
  usePath
} from "@serverless-stack/node/api";

export interface OauthConfig extends OauthBasicConfig {
  issuer: Issuer;
}

export const AppleAdapter = createAdapter((config: OauthConfig) => {
  return async function () {
    const [ step ] = usePath().slice(-1);

    const callback = "https://" + [
      useDomainName(),
      ...usePath().slice(0, -1),
      "callback"
    ].join("/");

    const client = new config.issuer.Client({
      client_id: config.clientID,
      client_secret: config.clientSecret,
      redirect_uris: [ callback ],
      response_types: [ "code" ]
    });

    if (step === "authorize") {
      const code_verifier = generators.codeVerifier();
      const state = generators.state();
      const code_challenge = generators.codeChallenge(code_verifier);

      const url = client.authorizationUrl({
        scope: config.scope,
        state,
        code_challenge,
        code_challenge_method: "S256",
        response_mode: "form_post",
        response_type: "code",
        prompt: config.prompt
      });

      const expires = new Date(Date.now() + 1000 * 600).toUTCString();

      return {
        statusCode: 302,
        cookies: [ `auth-code-verifier=${code_verifier}; HttpOnly; expires=${expires}`, `auth-state=${state}; HttpOnly; expires=${expires}` ],
        headers: { location: url }
      };
    }

    if (step === "callback") {
      const evt = useEvent("api");
      const body = evt.body;

      if (!body) {
        throw new Error("Authorization server didn't return body ");
      }
      const buff = Buffer.from(body, "base64");
      const decodedBody = buff.toString("ascii");
      const bodyParams = new URLSearchParams(decodedBody);
      const code = bodyParams.get("code");
      const rawUser = bodyParams.get("user");
      const user = rawUser ? JSON.parse(rawUser) : null;

      const tokenReq = {
        client_id: config.clientID,
        client_secret: config.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: encodeURIComponent(callback)
      };

      const formBody = [];

      for (const property in tokenReq) formBody.push(property + "=" + tokenReq[ property as keyof typeof tokenReq ]);

      const response = await fetch("https://appleid.apple.com/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.join("&")
      });

      const tokenset = await response.json() as {
        access_token: string,
        token_type: string,
        expires_in: number,
        id_token: string,
        refresh_token: string,
      };

      const { email } = jwt.decode(tokenset.id_token) as {
        iss: string,
        aud: string,
        exp: number;
        iat: number;
        sub: string,
        at_hash: string,
        email: string,
        email_verified: string;
        auth_time: number;
        nonce_supported: boolean;
      };

      return config.onSuccess({
        ...tokenset,
        expired: () => false,
        claims: () => ({
          ...user,
          given_name: user?.name?.firstName || email.split("@")[ 0 ],
          family_name: user?.name?.lastName,
          email
        })
      }, client);
    }
    throw new Error("Invalid auth request");
  };
});