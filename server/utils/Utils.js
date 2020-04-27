export default class Util {
  constructor() {
    this.statusCode = null;
    this.status = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode, data) {
    this.statusCode = statusCode;
    this.data = data;
    this.status = 'success';
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.status = 'error';
  }

  send(res) {
    const { statusCode, status, data, message } = this;
    if (status === 'success') {
      return res.status(statusCode).json({ status, data });
    }
    return res.status(statusCode).json({ status, message });
  }
}
