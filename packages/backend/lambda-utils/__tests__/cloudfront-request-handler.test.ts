import {
  CloudFrontRequest, CloudFrontRequestEvent, CloudFrontResultResponse
} from "aws-lambda";

import {
  cloudFrontRequestHandler, CloudFrontRequestHandlerAsync, createContext
} from "../src";

describe("@gravitywelluk/lambda-utils cloudfront-request-handler", () => {
  const mockContext = createContext();

  const mockRequestEvent: CloudFrontRequestEvent = {
    Records: [
      {
        cf: {
          config: {
            distributionDomainName: "d111111abcdef8.cloudfront.net",
            distributionId: "EDFDVBD6EXAMPLE",
            eventType: "origin-request",
            requestId: "4TyzHTaYWb1GX1qTfsHhEqV6HUDd_BzoBZnwfnvQc_1oF26ClkoUSEQ=="
          },
          request: {
            clientIp: "203.0.113.178",
            headers: {
              "x-forwarded-for": [
                {
                  key: "X-Forwarded-For",
                  value: "203.0.113.178"
                }
              ],
              "user-agent": [
                {
                  key: "User-Agent",
                  value: "Amazon CloudFront"
                }
              ],
              "via": [
                {
                  key: "Via",
                  value: "2.0 2afae0d44e2540f472c0635ab62c232b.cloudfront.net (CloudFront)"
                }
              ],
              "host": [
                {
                  key: "Host",
                  value: "example.org"
                }
              ],
              "cache-control": [
                {
                  key: "Cache-Control",
                  value: "no-cache, cf-no-cache"
                }
              ]
            },
            method: "GET",
            origin: {
              custom: {
                customHeaders: {},
                domainName: "example.org",
                keepaliveTimeout: 5,
                path: "",
                port: 443,
                protocol: "https",
                readTimeout: 30,
                sslProtocols: [
                  "TLSv1",
                  "TLSv1.1",
                  "TLSv1.2"
                ]
              }
            },
            querystring: "",
            uri: "/"
          }
        }
      }
    ]
  };

  test("Basic handler works correctly", async () => {
    const handler: CloudFrontRequestHandlerAsync = async event => {
      return event.Records[ 0 ].cf.request;
    };

    const mockHandler = jest.fn(handler);
    const result = await cloudFrontRequestHandler(mockHandler)(mockRequestEvent, mockContext);

    expect(mockHandler).toBeCalledTimes(1);
    expect(result).toMatchObject(mockRequestEvent.Records[ 0 ].cf.request);
  });
});