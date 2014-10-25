/// <reference path="../ref.ts" />

class StringBufferTest extends UnitTestClass {
	private _buffer : StringBuffer;

	setUp() : void {
		this._buffer = new StringBuffer();
	}

	tearDown() : void {
		this._buffer = null;
	}

	StringBufferConstructorTest() : void {
		// Arrange
		var buffer : StringBuffer;
	
		// Act
		buffer = new StringBuffer('foo');
	
		// Assert
		Assert.isNotNull(buffer);
		Assert.areEqual('foo', buffer.toString());
	}

	StringBufferAppendTest() : void {
		// Arrange
	
		// Act
		this._buffer.append('foo').append('bar');
	
		// Assert
		Assert.areEqual('foobar', this._buffer.toString());
	}
}
