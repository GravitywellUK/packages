import {
  ApiPolicyStatement,
  AuthorizerScope,
  generateApiPolicyStatement
} from "../src/api";

describe("@gravitywelluk/infrastructure package tests", () => {
  test("generateApiPolicyStatement correctly generates a basic IAM Policy Statement", () => {
    const exampleAuthorizerScope: AuthorizerScope = { allow: [ "some:resource/*" ] };

    const validPolicyStatement: ApiPolicyStatement = [
      {
        Action: "execute-api:Invoke",
        Effect: "Allow",
        Resource: [ "some:resource/*" ]
      }
    ];

    const generatedPolicyStatement = generateApiPolicyStatement(exampleAuthorizerScope);

    expect(generatedPolicyStatement).toMatchObject(validPolicyStatement);
  });

  test("generateApiPolicyStatement correctly generates a more complex IAM Policy Statement", () => {
    const exampleAuthorizerScope: AuthorizerScope = {
      allow: [ "some:resource/*" ],
      deny: [ "some:resource/*/admin/*" ]
    };

    const validPolicyStatement: ApiPolicyStatement = [
      {
        Action: "execute-api:Invoke",
        Effect: "Allow",
        Resource: [ "some:resource/*" ]
      },
      {
        Action: "execute-api:Invoke",
        Effect: "Deny",
        Resource: [ "some:resource/*/admin/*" ]
      }
    ];

    const generatedPolicyStatement = generateApiPolicyStatement(exampleAuthorizerScope);

    expect(generatedPolicyStatement).toMatchObject(validPolicyStatement);
  });
});