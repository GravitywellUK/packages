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
    // 300,000 milliseconds from now = 300 seconds = 5 minutes
    // This is long enough to allow for users to handle 2FA etc, but short for security
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