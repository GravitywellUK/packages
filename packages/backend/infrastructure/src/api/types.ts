export interface AuthorizerScope {
  allow?: string[];
  deny?: string[];
}

export interface ApiPolicy {
  Action: "execute-api:Invoke";
  Effect: "Allow" | "Deny";
  Resource: string | string[];
}

export type ApiPolicyStatement = ApiPolicy[];