import { StatusCodes } from "http-status-codes";

export const ERROR_CODE = {
  /**
   * @type: BAD_REQUEST
   * @description: The server cannot or will not process the request due to something
   * that is perceived to be a client error (e.g., malformed request syntax,
   * invalid request message framing, or deceptive request routing).
   */
  BAD_REQUEST: {
    CODE: StatusCodes.BAD_REQUEST,
    PARAM_MISSING: "400a",
    API_NOT_EXIST: "400c",
  },
  /**
   * @type: UNAUTHORIZED
   * @description: Although the HTTP standard specifies "unauthorized",
   * semantically this response means "unauthenticated".
   * That is, the client must authenticate itself to get the requested response.
   */
  UNAUTHORIZED: {
    CODE: StatusCodes.UNAUTHORIZED,
    INVALID_TOKEN: "401a",
    TOKEN_EXPIRED: "401b",
    PERMISSION_DENIED: "401c",
  },
  /**
   * @type: NOT_FOUND
   * @description: The server can not find the requested resource
   */
  NOT_FOUND: {
    CODE: StatusCodes.NOT_FOUND,
    USER_NOT_FOUND: "404a",
  },
  /**
   * @type: METHOD_NOT_ALLOWED
   * @description: The request method is known by the server but is not supported by the target resource.
   * For example, an API may not allow calling DELETE to remove a resource.
   */
  METHOD_NOT_ALLOWED: {
    CODE: StatusCodes.METHOD_NOT_ALLOWED,
    WRONG_PASSWORD: "405a",
  },
  /**
   * @type: UNPROCESSABLE_ENTITY
   * @description: The request was well-formed but was unable to be followed due to semantic errors.
   */
  UNPROCESSABLE_ENTITY: {
    CODE: StatusCodes.UNPROCESSABLE_ENTITY,
    LOGIN_FAIL: "422a",
    SIGN_IN_FAIL: "422b",
    DUPLICATE_EMAIL: "422c",
  },
  /**
   * @type: INTERNAL_SERVER_ERROR
   * @description: The server has encountered a situation it does not know how to handle.
   */
  INTERNAL_SERVER_ERROR: {
    CODE: StatusCodes.INTERNAL_SERVER_ERROR,
    SOMETHING_WENT_WRONG: "500a",
  },
};

export const SUCCESS_CODE = {
  CODE: StatusCodes.OK,
  LOGIN_SUCCESS: "200a",
};
