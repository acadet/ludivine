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
		var source : Mocks.Collection<string>;

		source = new Mocks.Collection<string>();
		source.ForEachOutcome(['foo', 'barbar', 'foobar']);

		// Act
		stack = new Stack<string>(source);

		// Assert
		Assert.isNotNull(stack);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, stack.getSize());
		Assert.areEqual('foobar', stack.pop());
		Assert.areEqual('barbar', stack.pop());
		Assert.areEqual('foo', stack.pop());
	}

	StackConstructorWithEmptySourceTest() : void {
		// Arrange
		var outcome : Stack<string>;
		var source : Mocks.Collection<string>;

		source = new Mocks.Collection<string>();
		source.ForEachOutcome([]);

		// Act
		outcome = new Stack<string>(source);

		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(0, outcome.getSize());
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

	StackReverseEmptyTest() : void {
		// Arrange
		var outcome : Stack<number>;

		// Act
		outcome = this._toStack(this._stack.reverse());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	StackReverseTwiceTest() : void {
		// Arrange
		var outcome : Stack<number>;

		this._stack.push(45);
		this._stack.push(56);
		this._stack.push(77);

		// Act
		outcome = this._toStack(this._stack.reverse().reverse());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(77, outcome.pop());
		Assert.areEqual(56, outcome.pop());
		Assert.areEqual(45, outcome.pop());
	}

	//endregion ISortableCollection

	//region ICollection

	StackAverageTest() : void {
		// Arrange
		var outcome : number;

		this._stack.push(1);
		this._stack.push(-2);
		this._stack.push(-3);

		// Act
		outcome = this._stack.average(x => Math.abs(x));

		// Assert
		Assert.areEqual(2, outcome);
	}

	StackExistsTest() : void {
		// Arrange
		var outcome : boolean;

		this._stack.push(56);
		this._stack.push(34);
		this._stack.push(-47);

		// Act
		outcome = this._stack.exists(x => x > 0);

		// Assert
		Assert.isTrue(outcome);
	}

	StackExistsFalseTest() : void {
		// Arrange
		var outcome : boolean;

		this._stack.push(1);
		this._stack.push(2);
		this._stack.push(3);

		// Act
		outcome = this._stack.exists(x => x > 10);

		// Assert
		Assert.isFalse(outcome);
	}

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

	StackIntersectTest() : void {
		// Arrange
		var source : Stack<number>, outcome : Stack<number>;

		source = new Stack<number>();
		source.push(2);
		source.push(3);
		source.push(4);

		this._stack.push(1);
		this._stack.push(2);
		this._stack.push(3);

		// Act
		outcome = this._toStack(this._stack.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(2, outcome.getSize());
		Assert.areEqual(3, outcome.pop());
		Assert.areEqual(2, outcome.pop());
	}

	StackIntersectEmptySourceTest() : void {
		// Arrange
		var source : Stack<number>, outcome : Stack<number>;

		source = new Stack<number>();
		source.push(1);
		source.push(2);
		source.push(3);

		// Act
		outcome = this._toStack(this._stack.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	StackIntersectEmptyTargetTest() : void {
		// Arrange
		var source : Stack<number>, outcome : Stack<number>;

		source = new Stack<number>();
		this._stack.push(1);
		this._stack.push(2);
		this._stack.push(3);

		// Act
		outcome = this._toStack(this._stack.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(0, outcome.getSize());
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

	StackMapEmptyTest() : void {
		// Arrange
		var outcome : Stack<number>;

		// Act
		outcome = this._toStack(this._stack.map(x => x));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(0, outcome.getSize());
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

	StackSelectEmptyTest() : void {
		// Arrange
		var outcome : Stack<number>;

		// Act
		outcome = this._toStack(this._stack.select(x => true));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	StackSelectNothingTest() : void {
		// Arrange
		var outcome : Stack<number>;

		this._stack.push(45);
		this._stack.push(56);
		this._stack.push(67);

		// Act
		outcome = this._toStack(this._stack.select(x => x > 100));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(0, outcome.getSize());
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

	StackUnionTest() : void {
		// Arrange
		var source : Mocks.Collection<number>;
		var outcome : Stack<number>;

		source = new Mocks.Collection<number>();
		source.ForEachOutcome([2, 3, 4]);

		this._stack.push(1);
		this._stack.push(2);
		this._stack.push(3);

		// Act
		outcome = this._toStack(this._stack.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(4, outcome.getSize());
		Assert.areEqual(4, outcome.pop());
		Assert.areEqual(3, outcome.pop());
		Assert.areEqual(2, outcome.pop());
		Assert.areEqual(1, outcome.pop());
	}

	StackUnionEmptySourceTest() : void {
		// Arrange
		var source : Mocks.Collection<number>;
		var outcome : Stack<number>;

		source = new Mocks.Collection<number>();
		source.ForEachOutcome([1, 2, 3]);

		// Act
		outcome = this._toStack(this._stack.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(3, outcome.pop());
		Assert.areEqual(2, outcome.pop());
		Assert.areEqual(1, outcome.pop());
	}

	StackUnionEmptyTargetTest() : void {
		// Arrange
		var source : Mocks.Collection<number>;
		var outcome : Stack<number>;

		source = new Mocks.Collection<number>();
		source.ForEachOutcome([]);
		this._stack.push(4);
		this._stack.push(5);
		this._stack.push(6);

		// Act
		outcome = this._toStack(this._stack.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(6, outcome.pop());
		Assert.areEqual(5, outcome.pop());
		Assert.areEqual(4, outcome.pop());
	}

	StackUniqTest() : void {
		// Arrange
		var outcome : Stack<number>;

		this._stack.push(1);
		this._stack.push(2);
		this._stack.push(3);
		this._stack.push(2);
		this._stack.push(1);

		// Act
		outcome = this._toStack(this._stack.uniq());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(3, outcome.pop());
		Assert.areEqual(2, outcome.pop());
		Assert.areEqual(1, outcome.pop());
	}

	StackUniqEmptyTest() : void {
		// Arrange
		var outcome : Stack<number>;

		// Act
		outcome = this._toStack(this._stack.uniq());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	StackUniqTwiceTest() : void {
		// Arrange
		var outcome : Stack<number>;

		this._stack.push(56);
		this._stack.push(56);
		this._stack.push(45);
		this._stack.push(67);
		this._stack.push(45);

		// Act
		outcome = this._toStack(this._stack.uniq().uniq());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._stack, outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(67, outcome.pop());
		Assert.areEqual(45, outcome.pop());
		Assert.areEqual(56, outcome.pop());
	}

	//endregion ICollection
}
