/// <reference path="ref.ts" />

class Timer<T> {
	//region Fields

	private _timer : any;
	
	//endregion Fields
	
	//region Constructors

	constructor(handler : Action<T>, delay : number, argument : T = null) {
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

	stop() : void {
		clearTimeout(this._timer);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
