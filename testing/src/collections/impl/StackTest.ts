/// <reference path="../../../ref.ts" />

class StackTest extends UnitTestClass {
	private _stack : Stack<number>;
	private _stackElement : StackUtils.StackElement<string>;

	private _toStack<T>(source : ICollection<T>) : Stack<T> {
		return <Stack<T>>source;
	}

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

	StackConstructorTest() : void {
		// Arrange
		var stack : Stack<number>;
	
		// Act
		stack = new Stack<number>();
	
		// Assert
		Assert.isNotNull(stack);
		Assert.areEqual(0, stack.getSize());
	}

	StackConstructorWithSourceTest() : void {
		// Arrange
		var stack : Stack<string>;
		var source : ArrayList<string>;

		source = new ArrayList<string>();
		source.add('foo');
		source.add('barbar');
		source.add('foobar');
	
		// Act
		stack = new Stack<string>(source);
	
		// Assert
		Assert.isNotNull(stack);
		Assert.areEqual(3, stack.getSize());
		Assert.areEqual('foobar', stack.pop());
		Assert.areEqual('barbar', stack.pop());
		Assert.areEqual('foo', stack.pop());
	}

	StackGetSizeEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._stack.getSize();
	
		// Assert
		Assert.areEqual(0, outcome);
	}

	StackGetSizeAfterPushingTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(3);
		this._stack.push(67);
	
		// Act
		outcome = this._stack.getSize();
	
		// Assert
		Assert.areEqual(2, outcome);
	}

	StackGetSizeAfterTopingTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(67);
		this._stack.top();
	
		// Act
		outcome = this._stack.getSize();
	
		// Assert
		Assert.areEqual(1, outcome);
	}

	StackGetSizeAfterPopingTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(65);
		this._stack.push(2);
		this._stack.pop();
	
		// Act
		outcome = this._stack.getSize();
	
		// Assert
		Assert.areEqual(1, outcome);
	}

	StackTopTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(65);
		this._stack.push(45);
	
		// Act
		outcome = this._stack.top();
	
		// Assert
		Assert.areEqual(45, outcome);
		Assert.areEqual(2, this._stack.getSize());
	}

	StackTopEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._stack.top();
	
		// Assert
		Assert.isNull(outcome);
	}

	StackPopTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(3);
		this._stack.push(7);
	
		// Act
		outcome = this._stack.pop();
	
		// Assert
		Assert.areEqual(7, outcome);
		Assert.areEqual(1, this._stack.getSize());
	}

	StackPopEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._stack.pop();
	
		// Assert
		Assert.isNull(outcome);
	}

	StackPushTest() : void {
		// Arrange
	
		// Act
		this._stack.push(45);
		this._stack.push(65);
	
		// Assert
		Assert.areEqual(2, this._stack.getSize());
		Assert.areEqual(65, this._stack.pop());
		Assert.areEqual(45, this._stack.pop());
	}

	StackPushSingleElementTest() : void {
		// Arrange
	
		// Act
		this._stack.push(34);
	
		// Assert
		Assert.areEqual(1, this._stack.getSize());
		Assert.areEqual(34, this._stack.pop());
	}

	//region ISortableCollection

	StackOrderByTest() : void {
		// Arrange
		var outcome : Stack<number>;

		this._stack.push(54);
		this._stack.push(3);
		this._stack.push(-67);

		// Act
		outcome = this._toStack(this._stack.orderBy(x => x * x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.pop());
		Assert.areEqual(54, outcome.pop());
		Assert.areEqual(-67, outcome.pop());
	}

	StackOrderByEmptyTest() : void {
		// Arrange
		var outcome : Stack<number>;
	
		// Act
		outcome = this._toStack(this._stack.orderBy(x => x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	StackOrderByDescTest() : void {
		// Arrange
		var outcome : Stack<number>;

		this._stack.push(-67);
		this._stack.push(45);
		this._stack.push(65);
	
		// Act
		outcome = this._toStack(this._stack.orderByDesc(x => x * x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(-67, outcome.pop());
		Assert.areEqual(65, outcome.pop());
		Assert.areEqual(45, outcome.pop());
	}

	StackOrderByDescEmptyTest() : void {
		// Arrange
		var outcome : Stack<number>;
	
		// Act
		outcome = this._toStack(this._stack.orderByDesc(x => x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	StackReverseTest() : void {
		// Arrange
		var outcome : Stack<number>;

		this._stack.push(56);
		this._stack.push(43);
		this._stack.push(78);
	
		// Act
		outcome = this._toStack(this._stack.reverse());
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(56, outcome.pop());
		Assert.areEqual(43, outcome.pop());
		Assert.areEqual(78, outcome.pop());
	}

	//endregion ISortableCollection

	//region ICollection

	StackForEachTest() : void {
		// Arrange
		var acc : Array<number>;

		acc = new Array<number>();
		this._stack.push(45);
		this._stack.push(67);
		this._stack.push(78);
	
		// Act
		this._stack.forEach(x => acc.push(x));
	
		// Assert
		Assert.areEqual(3, acc.length);
		Assert.areEqual(78, acc[0]);
		Assert.areEqual(67, acc[1]);
		Assert.areEqual(45, acc[2]);
	}

	StackForEachEmptyTest() : void {
		// Arrange
		var acc : number;

		acc = 0;
	
		// Act
		this._stack.forEach(x => acc += x);
	
		// Assert
		Assert.areEqual(0, acc);
	}

	StackFindTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(56);
		this._stack.push(65);
		this._stack.push(67);
	
		// Act
		outcome = this._stack.find(x => x < 66);
	
		// Assert
		Assert.areEqual(65, outcome);
	}

	StackFindLastElementTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(4);
		this._stack.push(65);
		this._stack.push(67);
	
		// Act
		outcome = this._stack.find(x => x < 10);
	
		// Assert
		Assert.areEqual(4, outcome);
	}

	StackFindNoResultTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(4);
		this._stack.push(5);
		this._stack.push(7);
	
		// Act
		outcome = this._stack.find(x => x > 10);
	
		// Assert
		Assert.isNull(outcome);
	}

	StackFindEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._stack.find(x => true);
	
		// Assert
		Assert.isNull(outcome);
	}

	StackMapTest() : void {
		// Arrange
		var outcome : Stack<number>;

		this._stack.push(1);
		this._stack.push(2);
		this._stack.push(3);
	
		// Act
		outcome = this._toStack(this._stack.map(x => x * x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(9, outcome.pop());
		Assert.areEqual(4, outcome.pop());
		Assert.areEqual(1, outcome.pop());
	}

	StackMaxTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(-10);
		this._stack.push(5);
		this._stack.push(2);
	
		// Act
		outcome = this._stack.max(x => x * x);
	
		// Assert
		Assert.areEqual(-10, outcome);
	}

	StackMinTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(-2);
		this._stack.push(1);
		this._stack.push(5);
	
		// Act
		outcome = this._stack.min(x => x * x);
	
		// Assert
		Assert.areEqual(1, outcome);
	}

	StackSelectTest() : void {
		// Arrange
		var outcome : Stack<number>;

		this._stack.push(45);
		this._stack.push(3);
		this._stack.push(67);
		this._stack.push(4);
	
		// Act
		outcome = this._toStack(this._stack.select(x => x > 10));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(2, outcome.getSize());
		Assert.areEqual(67, outcome.pop());
		Assert.areEqual(45, outcome.pop());
	}

	StackSumTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(1);
		this._stack.push(2);
		this._stack.push(3);
	
		// Act
		outcome = this._stack.sum(x => x * x);
	
		// Assert
		Assert.areEqual(9 + 4 + 1, outcome);
	}

	StackToArrayTest() : void {
		// Arrange
		var outcome : Array<number>;

		this._stack.push(43);
		this._stack.push(32);
		this._stack.push(45);
	
		// Act
		outcome = this._stack.toArray();
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.length);
		Assert.areEqual(45, outcome[0]);
		Assert.areEqual(32, outcome[1]);
		Assert.areEqual(43, outcome[2]);
	}

	StackToDictionaryTest() : void {
		// Arrange
		var outcome : IDictionary<number, number>;

		this._stack.push(34);
		this._stack.push(35);
		this._stack.push(46);
	
		// Act
		outcome = this._stack.toDictionary(
			(x) => { return x; },
			(x) => { return x % 2; }
		);
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(0, outcome.get(34));
		Assert.areEqual(1, outcome.get(35));
		Assert.areEqual(0, outcome.get(46));
	}

	StackToListTest() : void {
		// Arrange
		var outcome : IList<number>;

		this._stack.push(21);
		this._stack.push(9);
		this._stack.push(8);
	
		// Act
		outcome = this._stack.toList();
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(8, outcome.getAt(0));
		Assert.areEqual(9, outcome.getAt(1));
		Assert.areEqual(21, outcome.getAt(2));
	}

	//endregion ICollection
}
