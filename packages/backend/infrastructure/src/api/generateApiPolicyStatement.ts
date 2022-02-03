import { ApiPolicyStatement } from ".";
import { AuthorizerScope } from "./types";

/**
 * Utility for generating a scoped IAM resource policy statement for an API Gateway authorizer
 * @param {AuthorizerScope} scope - Allowed / denied API paths (supports wildcards)
 * @returns {ApiPolicyStatement}
 */
export const generateApiPolicyStatement = (scope: AuthorizerScope): ApiPolicyStatement => {
  const policies: ApiPolicyStatement = [];

  if (scope.allow) {
    policies.push({
      Action: "execute-api:Invoke",
      Effect: "Allow",
      Resource: scope.allow
    });
  }

  if (scope.deny) {
    policies.push({
      Action: "execute-api:Invoke",
      Effect: "Deny",
      Resource: scope.deny
    });
  }

  return policies;
};