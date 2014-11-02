/// <reference path="ref.ts" />

/**
 * @class Timer
 * @brief Class timer
 */
class Timer<T> {
	//region Fields

	/**
	 * Inner timer
	 */
	private _timer : any;
	
	//endregion Fields
	
	//region Constructors

	/**
	 * Builds and starts timer
	 * @param {Action<T>} handler  Action to run
	 * @param {number}    delay    Delay
	 * @param {T}         argument Optional argument for handler
	 */
	constructor(handler : Action<T>, delay : number, argument? : T) {
		this._timer = 
			setTimeout(
				() => {
					handler(argument);
				},
				delay
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
		clearTimeout(this._timer);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
