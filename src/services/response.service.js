/**
 * Response service class
 */
class ResponseService {
	/**
	 * * function to set a success response
	 * @param  {integer} statusCode
	 * @param  {string} message
	 * @param  {object} data
	 * @returns {object} object
	 */
	static setSuccess(statusCode, message, data) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.type = 'success';
	}

	/**
	 * * function to set response error
	 * @param  {integer} statusCode
	 * @param  {string} message
	 * @returns {object} object
	 */
	static setError(statusCode, message) {
		this.statusCode = statusCode;
		this.message = message;
		this.type = 'error';
	}

	/**
	 * * function to send a response
	 * @param  {object} res
	 * @returns {object} object
	 */
	static send(res) {
		if (this.type === 'success') {
			return res
				.writeHead(this.statusCode, { 'Content-Type': 'application/json' })
				.end(
					JSON.stringify({
						status: this.statusCode,
						message: this.message,
						data: this.data,
					})
				);
		}
		return res
			.writeHead(this.statusCode, { 'Content-Type': 'application/json' })
			.end(
				JSON.stringify({
					status: this.statusCode,
					message: this.message,
				})
			);
	}
}

export default ResponseService;
