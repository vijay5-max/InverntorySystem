class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(res, data, message = "Success", statusCode = 200) {
    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, message, data));
  }
}

export default ApiResponse;