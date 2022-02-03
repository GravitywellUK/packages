import * as sst from "@serverless-stack/resources";
import * as apig from "@aws-cdk/aws-apigateway";

import { AuthorizerScope } from "./types";

/**
 * Define what API resources are accessible following a successful response from a custom authorizer.
 *
 * Default scope (`{ allow: [ "/*" ] }`) allows access to all endpoints.
 *
 * If using multiple authorizers, `scope` can be used to lock down user permissions to the specific endpoints covered by each one.
 *
 * _IMPORTANT:_ The resource policy returned by an authorizer must be defined inside its handler using the inserted `ALLOWED_API_RESOURCES` and `DENIED_API_RESOURCES` environment variables.
 * @param {sst.App} app - SST app
 * @param {apig.RestApi} api - REST API
 * @param {sst.Function} authorizer - Authorizer lambda
 * @param {AuthorizerScope} scope - Allowed / denied API paths (supports wildcards)
 * @returns {void}
 */
export const configureAuthorizerScope = (
  app: sst.App,
  api: apig.RestApi,
  authorizer: sst.Function,
  scope: AuthorizerScope = { allow: [ "/*" ] }
): void => {
  const buildArnPathGlob = (path: string) => api.arnForExecuteApi("*", path, app.stage);
  const allowedResources = scope.allow.map(buildArnPathGlob);
  const deniedResources = scope.deny?.map(buildArnPathGlob);

  authorizer.addEnvironment("ALLOWED_API_RESOURCES", allowedResources.join());

  if (deniedResources) {
    authorizer.addEnvironment("DENIED_API_RESOURCES", deniedResources.join());
  }
};