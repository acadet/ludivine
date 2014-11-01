/// <reference path="ref.ts" />

/**
 * @class Exception
 * @brief Wraps any error. 
 * @description User can extend this class to create his custom 
 * exception.
 */
class Exception {
	//region Fields
	
	/**
	 * Wrapped error
	 */
	private _error : any;

	//endregion Fields
	
	//region Constructors
	
	constructor(msg : string, name : string = 'Exception') {
		this._error = new Error(msg);
		this._error.name = name;
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	/**
	 * Gets inner message
	 * @return {string} Inner message
	 */
	getMessage() : string {
		return this._error.message;
	}

	/**
	 * Gets name of exception
	 * @return {string} Name of exception
	 */
	getName() : string {
		return this._error.name;
	}

	/**
	 * Gets stack trace
	 * @return {string} Stack trace
	 */
	getStackTrace() : string  {
		return this._error.stack;
	}

	/**
	 * Stringifies error
	 * @return {string} [description]
	 */
	toString() : string {
		return this._error.name + ': ' + this._error.message;
	}

	//endregion Public Methods
	
	//endregion Methods
}
