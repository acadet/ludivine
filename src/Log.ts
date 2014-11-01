/// <reference path="ref.ts" />

/**
 * @class LogLevel
 * @brief Available levels of log
 */
enum LogLevel {
	Debug = 0, // all messages
	Test = 1, // only inform, warnings & errors
	Production = 2, // only warnings & erros
	Opaque = 3 // only errors
}

/**
 * @class Log
 * @brief Simple log
 */
class Log {
	//region Fields	

	/**
	 * Current level of log. Default value to Debug
	 */
	private static _currentLevel : LogLevel = LogLevel.Debug;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	//endregion Private Methods
	
	//region Public Methods
	
	/**
	 * Sets current level of log
	 * @param {LogLevel} level Desired level
	 */
	static setLevel(level : LogLevel) : void {
		Log._currentLevel = level;
	}

	/**
	 * Prints a debug message
	 * @param {string} msg Message
	 */
	static debug(msg : string) : void {
		if (this._currentLevel <= LogLevel.Debug) {
			console.log('DEBUG: ' + msg);
		}
	}

	/**
	 * Prints information
	 * @param {string} msg Message
	 */
	static inform(msg : string) : void {
		if (this._currentLevel <= LogLevel.Test) {
			console.log('%cINFORM: ' + msg, 'color: DeepSkyBlue;');
		}
	}

	/**
	 * Prints warning
	 * @param {string} msg Message
	 */
	static warn(msg : string) : void {
		if (this._currentLevel <= LogLevel.Production) {
			console.log('%cWARN: ' + msg, 'color: orange;');
		}
	}

	/**
	 * Prints an error
	 * @param {Exception} error Exception
	 */
	static error(error : Exception) : void {
		console.error('Error: ' + error.toString());
	}

	//endregion Public Methods
	
	//endregion Methods
}
