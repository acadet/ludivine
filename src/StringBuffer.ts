/// <reference path="ref.ts" />

class StringBuffer {
	//region Fields

	private _content : Array<string>;
	
	//endregion Fields
	
	//region Constructors

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

	append(s: string) : StringBuffer {
		this._content.push(s);
		return this;
	}

	toString() : string {
		var result : string = '';

		for (var i = 0; i < this._content.length; i++) {
			result += this._content[i];
		}

		return result;
	}
}
