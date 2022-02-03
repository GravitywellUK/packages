import {
  ApiPolicyStatement,
  AuthorizerScope,
  generateApiPolicyStatement
} from "../src/api";

describe("@gravitywelluk/infrastructure package tests", () => {
  test("generateApiPolicyStatement correctly generates an IAM Policy Statement", () => {
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
});