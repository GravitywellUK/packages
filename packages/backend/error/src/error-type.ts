/**
 * The type of the error to be thrown. Each name corresponds to a distinct HTTP status code, as documented [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
 */
export enum ErrorType {
  /**
   * 400: The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
   */
  BadRequest = 400,
  /**
   * 401: The client must authenticate itself to get the requested response.
   */
  Unauthorized = 401,
  /**
   * [Experimental] 402: A digital payment is required to proceed.
   */
  PaymentRequired = 402,
  /**
   * 403: The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
   */
  Forbidden = 403,
  /**
   * The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client.
   */
  NotFound = 404,
  /**
   * The request method is known by the server but is not supported by the target resource. For example, an API may not allow calling DELETE to remove a resource.
   */
  MethodNotAllowed = 405,
  /**
   * This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content that conforms to the criteria given by the user agent.
   */
  NotAcceptable = 406,
  /**
   * This is similar to 401 Unauthorized but authentication is needed to be done by a proxy.
   */
  ProxyAuthenticationRequired = 407,
  /**
   * The server would like to shut down this unused connection.
   */
  RequestTimeout = 408,
  /**
   * This response is sent when a request conflicts with the current state of the server.
   */
  Conflict = 409,
  /**
   * This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
   */
  Gone = 410,
  /**
   * Server rejected the request because the Content-Length header field is not defined and the server requires it.
   */
  LengthRequired = 411,
  /**
   * The client has indicated preconditions in its headers which the server does not meet.
   */
  PreconditionFailed = 412,
  /**
   * Request entity is larger than limits defined by server. The server might close the connection or return an Retry-After header field.
   */
  PayloadTooLarge = 413,
  /**
   * The URI requested by the client is longer than the server is willing to interpret.
   */
  URITooLong = 414,
  /**
   * The media format of the requested data is not supported by the server, so the server is rejecting the request.
   */
  UnsupportedMediaType = 415,
  /**
   * The range specified by the Range header field in the request cannot be fulfilled. It's possible that the range is outside the size of the target URI's data.
   */
  RangeNotSatisfiable = 416,
  /**
   * This response code means the expectation indicated by the Expect request header field cannot be met by the server.
   */
  ExpectationFailed = 417,
  /**
   * The request was well-formed but was unable to be followed due to semantic errors.
   */
  UnprocessableEntity = 422,
  /**
   * Indicates that the server is unwilling to risk processing a request that might be replayed.
   */
  TooEarly = 425,
  /**
   * The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol(s).
   */
  UpgradeRequired = 426,
  /**
   * The origin server requires the request to be conditional. This response is intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
   */
  PreconditionRequired = 428,
  /**
   * The user has sent too many requests in a given amount of time ("rate limiting").
   */
  TooManyRequests = 429,
  /**
   * The server is unwilling to process the request because its header fields are too large. The request may be resubmitted after reducing the size of the request header fields.
   */
  RequestHeaderFieldsTooLarge = 431,
  /**
   * The user agent requested a resource that cannot legally be provided, such as a web page censored by a government.
   */
  UnavailableForLegalReasons = 451,
  /**
   * The server has encountered a situation it does not know how to handle.
   */
  InternalServerError = 500,
  /**
   * The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
   */
  NotImplemented = 501,
  /**
   * This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
   */
  BadGateway = 502,
  /**
   * The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.
   */
  ServiceUnavailable = 503,
  /**
   * This error response is given when the server is acting as a gateway and cannot get a response in time.
   */
  GatewayTimeout = 504,
  /**
   * The HTTP version used in the request is not supported by the server.
   */
  HTTPVersionNotSupported = 505,
  /**
   * The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
   */
  VariantAlsoNegotiates = 506,
  /**
   * The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.
   */
  InsufficientStorage = 507,
  /**
   * The server detected an infinite loop while processing the request.
   */
  LoopDetected = 508,
  /**
   * Further extensions to the request are required for the server to fulfill it.
   */
  NotExtended = 510,
  /**
   * Indicates that the client needs to authenticate to gain network access.
   */
  NetworkAuthenticationRequired = 511
}