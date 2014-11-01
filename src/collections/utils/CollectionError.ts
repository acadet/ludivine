/// <reference path="../../ref.ts" />

/**
 * @class CollectionException
 * @brief Custom error for collection module
 */
class CollectionException extends Exception {
	constructor(msg : string) {
		super(msg, 'CollectionException');
	}
}
