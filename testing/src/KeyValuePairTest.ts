/// <reference path="../ref.ts" />

class KeyValuePairTest extends UnitTestClass {
	private _pair : KeyValuePair<string, number>;

	setUp() : void {
		this._pair = new KeyValuePair<string, number>();
	}

	tearDown() : void {
		this._pair = null;
	}

	KeyValuePairConstructorTest() : void {
		// Arrange
		var pair : KeyValuePair<string, string>;
	
		// Act
		pair = new KeyValuePair<string, string>('foo', 'bar');
	
		// Assert
		Assert.isNotNull(pair);
		Assert.areEqual('foo', pair.getKey());
		Assert.areEqual('bar', pair.getValue());
	}

	KeyValuePairKeyTest() : void {
		// Arrange
		var value : string, outcome : string;

		value = 'foo';
	
		// Act
		this._pair.setKey(value);
		outcome = this._pair.getKey();
	
		// Assert
		Assert.areEqual(value, outcome);
	}

	KeyValuePairValueTest() : void {
		// Arrange
		var value : number, outcome : number;

		value = 34;
	
		// Act
		this._pair.setValue(value);
		outcome = this._pair.getValue();
	
		// Assert
		Assert.areEqual(value, outcome);
	}
}
