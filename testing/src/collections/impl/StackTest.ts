/// <reference path="../../../ref.ts" />

class StackTest extends UnitTestClass {
	private _stack : Stack<number>;
	private _stackElement : StackUtils.StackElement<string>;

	setUp() : void {
		this._stack = new Stack<number>();
		this._stackElement = new StackUtils.StackElement<string>();
	}

	tearDown() : void {
		this._stack = null;
		this._stackElement = null;
	}

	//region StackElement

	StackElementConstructorTest() : void {
		// Arrange
		var stackElement : StackUtils.StackElement<string>;
	
		// Act
		stackElement = new StackUtils.StackElement<string>('foo');
	
		// Assert
		Assert.isNotNull(stackElement);
		Assert.areEqual('foo', stackElement.getContent());
	}

	StackElementContentTest() : void {
		// Arrange
		var value : string, outcome : string;

		value = 'foo';
	
		// Act
		this._stackElement.setContent(value);
		outcome = this._stackElement.getContent();
	
		// Assert
		Assert.areEqual(value, outcome);
	}

	StackElementPrevTest() : void {
		// Arrange
		var value : StackUtils.StackElement<string>, outcome : StackUtils.StackElement<string>;

		value = new StackUtils.StackElement<string>();
	
		// Act
		this._stackElement.setPrev(value);
		outcome = this._stackElement.getPrev();
	
		// Assert
		Assert.areEqual(value, outcome);
	}

	StackElementHasPrevTest() : void {
		// Arrange
		var outcome : boolean;

		this._stackElement.setPrev(new StackUtils.StackElement<string>());
	
		// Act
		outcome = this._stackElement.hasPrev();
	
		// Assert
	}

	StackElementEmptyTest() : void {
		// Arrange
		var outcome : boolean;
	
		// Act
		outcome = this._stackElement.hasPrev();
	
		// Assert
		Assert.isFalse(outcome);
	}

	//endregion StackElement
}
