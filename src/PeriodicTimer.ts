/// <reference path="ref.ts" />

class PeriodicTimer<T> {
	//region Fields

	private _timer : any;
	
	//endregion Fields
	
	//region Constructors

	constructor(handler : Action<T>, period : number, argument : T = null) {
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

	stop() : void {
		clearInterval(this._timer);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
