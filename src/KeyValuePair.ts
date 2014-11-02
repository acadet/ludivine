/// <reference path="ref.ts" />

/**
 * @class KeyValuePair
 * @brief Pairs key and value
 */
class KeyValuePair<T, U> {
	//region Fields

	/**
	 * Inner key
	 */
	private _key : T;

	/**
	 * Inner value
	 */
	private _value : U;
	
	//endregion Fields
	
	//region Constructors

	/**
	 * Builds a new pair
	 * @param {T} key   Optional key
	 * @param {U} value Optional value
	 */
	constructor(key? : T, value? : U) {
		this._key = key;
		this._value = value;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	/**
	 * Returns key
	 * @return {T} [description]
	 */
	getKey() : T {
		return this._key;
	}

	/**
	 * Sets key
	 * @param {T} key [description]
	 */
	setKey(key : T) : void {
		this._key = key;
	}

	/**
	 * Gets value
	 * @return {U} [description]
	 */
	getValue() : U {
		return this._value;
	}

	/**
	 * Sets value
	 * @param {U} value [description]
	 */
	setValue(value : U) : void {
		this._value = value;
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
