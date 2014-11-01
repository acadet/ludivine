/// <reference path="ref.ts" />

/**
 * @class PeriodicTimer
 * @brief Executes specific action each period
 */
class PeriodicTimer<T> {
	//region Fields

	/**
	 * Inner timer
	 */
	private _timer : any;
	
	//endregion Fields
	
	//region Constructors

	/**
	 * Builds and starts timer
	 * @param {Action<T>} handler  Executed action
	 * @param {number}    period   Period (in ms)
	 * @param {T}         argument Optional argument for handler
	 */
	constructor(handler : Action<T>, period : number, argument? : T) {
		this._timer =
			setInterval(
				() => {
					handler(argument);
				},
				period
			);
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	/**
	 * Stops timer
	 */
	stop() : void {
		clearInterval(this._timer);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
