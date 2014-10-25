/// <reference path="../../ref.ts" />

class CollectionException extends Exception {
	constructor(msg : string) {
		super(msg, 'CollectionException');
	}
}
