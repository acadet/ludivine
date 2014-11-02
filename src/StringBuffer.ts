/// <reference path="ref.ts" />

/**
 * @class StringBuffer
 * @brief Stores strings to get result later 
 */
class StringBuffer {
	//region Fields

	/**
	 * Stored content
	 */
	private _content : Array<string>;
	
	//endregion Fields
	
	//region Constructors

	/**
	 * Builds a new buffer
	 * @param {string} first Optional first string
	 */
	constructor(first : string = '') {
		this._content = new Array<string>();
		this._content.push(first);
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	//endregion Public Methods
	
	//endregion Methods

	/**
	 * Appends string to buffer and returns this one
	 * @param  {string}       s [description]
	 * @return {StringBuffer}   [description]
	 */
	append(s: string) : StringBuffer {
		this._content.push(s);
		return this;
	}

	/**
	 * Builds outcome using stored strings
	 * @return {string} [description]
	 */
	toString() : string {
		var result : string = '';

		for (var i = 0; i < this._content.length; i++) {
			result += this._content[i];
		}

		return result;
	}
}
