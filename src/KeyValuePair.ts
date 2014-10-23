/// <reference path="ref.ts" />

class KeyValuePair<T, U> {
	//region Fields

	private _key : T;
	private _value : U;
	
	//endregion Fields
	
	//region Constructors

	constructor(key : T = null, value : U = null) {
		this._key = key;
		this._value = value;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	getKey() : T {
		return this._key;
	}

	setKey(key : T) : void {
		this._key = key;
	}

	getValue() : U {
		return this._value;
	}

	setValue(value : U) : void {
		this._value = value;
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
