import * as jwt from "jsonwebtoken";

interface AppleClientSecretGeneratorParams {
  teamId: string;
  clientId: string;
  keyId: string;
  appleKey: string;
}

export const generateAppleClientSecret = (params: AppleClientSecretGeneratorParams) => {
  const {
    teamId,
    clientId,
    keyId,
    appleKey
  } = params;

  const claims = {
    iss: teamId,
    exp: Math.floor(Date.now() / 1000) + 300000,
    aud: "https://appleid.apple.com",
    sub: clientId
  };

  const token = jwt.sign(
    claims,
    appleKey,
    {
      algorithm: "ES256",
      keyid: keyId
    }
  );

  return token;
};