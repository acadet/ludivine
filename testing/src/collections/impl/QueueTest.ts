/// <reference path="../../../ref.ts" />

class QueueTest extends UnitTestClass {
	private _queue : Queue<number>;
	private _queueElement : QueueUtils.QueueElement<string>;

	private _toQueue<T>(source : ICollection<T>) : Queue<T> {
		return <Queue<T>>source;
	}

	setUp() : void {
		this._queue = new Queue<number>();
		this._queueElement = new QueueUtils.QueueElement<string>();
	}

	tearDown() : void {
		this._queue = null;
		this._queueElement = null;
	}

	//region QueueElement

	QueueElementConstructorTest() : void {
		// Arrange
		var e : QueueUtils.QueueElement<string>;

		// Act
		e = new QueueUtils.QueueElement<string>('foo');

		// Assert
		Assert.isNotNull(e);
		Assert.areEqual('foo', e.getContent());
		Assert.isFalse(e.hasNext());
	}

	QueueElementContentTest() : void {
		// Arrange
		var value : string, outcome : string;

		value = 'foo';

		// Act
		this._queueElement.setContent(value);
		outcome = this._queueElement.getContent();

		// Assert
		Assert.areEqual(value, outcome);
	}

	QueueElementNextTest() : void {
		// Arrange
		var value : QueueUtils.QueueElement<string>, outcome : QueueUtils.QueueElement<string>;

		value = new QueueUtils.QueueElement<string>();

		// Act
		this._queueElement.setNext(value);
		outcome = this._queueElement.getNext();

		// Assert
		Assert.areEqual(value, outcome);
	}

	QueueElementHasNextTest() : void {
		// Arrange
		var outcome : boolean;

		this._queueElement.setNext(new QueueUtils.QueueElement<string>());

		// Act
		outcome = this._queueElement.hasNext();

		// Assert
		Assert.isTrue(outcome);
	}

	QueueElementHasNextNoElementTest() : void {
		// Arrange
		var outcome : boolean;

		// Act
		outcome = this._queueElement.hasNext();

		// Assert
		Assert.isFalse(outcome);
	}

	//endregion QueueElement

	QueueConstructorTest() : void {
		// Arrange
		var queue : Queue<number>;

		// Act
		queue = new Queue<number>();

		// Assert
		Assert.isNotNull(queue);
		Assert.areEqual(0, queue.getSize());
	}

	QueueConstructorWithSourceTest() : void {
		// Arrange
		var queue : Queue<string>;
		var source : Mocks.Collection<string>;

		source = new Mocks.Collection<string>();
		source.ForEachOutcome(['foo', 'bar', 'barbar']);

		// Act
		queue = new Queue<string>(source);

		// Assert
		Assert.isNotNull(queue);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, queue.getSize());
		Assert.areEqual('foo', queue.pop());
		Assert.areEqual('bar', queue.pop());
		Assert.areEqual('barbar', queue.pop());
	}

	QueueGetSizeEmptyTest() : void {
		// Arrange
		var outcome : number;

		// Act
		outcome = this._queue.getSize();

		// Assert
		Assert.areEqual(0, outcome);
	}

	QueueGetSizePushTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(3);
		this._queue.push(4);

		// Act
		outcome = this._queue.getSize();

		// Assert
		Assert.areEqual(2, outcome);
	}

	QueueGetSizeAfterTopingTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(3);
		this._queue.push(4);
		this._queue.top();

		// Act
		outcome = this._queue.getSize();

		// Assert
		Assert.areEqual(2, outcome);
	}

	QueueGetSizeAfterPopingTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(3);
		this._queue.push(4);
		this._queue.pop();

		// Act
		outcome = this._queue.getSize();

		// Assert
		Assert.areEqual(1, outcome);
	}

	QueueTopTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(65);
		this._queue.push(43);

		// Act
		outcome = this._queue.top();

		// Assert
		Assert.areEqual(65, outcome);
		Assert.areEqual(outcome, this._queue.top());
	}

	QueueTopEmptyTest() : void {
		// Arrange
		var outcome : number;

		// Act
		outcome = this._queue.top();

		// Assert
		Assert.isNull(outcome);
	}

	QueuePopTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(65);
		this._queue.push(45);

		// Act
		outcome = this._queue.pop();

		// Assert
		Assert.areEqual(65, outcome);
		Assert.areEqual(45, this._queue.top());
	}

	QueuePopEmptyTest() : void {
		// Arrange
		var outcome : number;

		// Act
		outcome = this._queue.pop();

		// Assert
		Assert.isNull(outcome);
	}

	QueuePopSingleElementTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(65);

		// Act
		outcome = this._queue.pop();

		// Assert
		Assert.areEqual(65, outcome);
		Assert.isNull(this._queue.top());
	}

	QueuePushTest() : void {
		// Arrange

		// Act
		this._queue.push(65);

		// Assert
		Assert.areEqual(65, this._queue.top());
	}

	QueuePushMultipleTest() : void {
		// Arrange

		// Act
		this._queue.push(65);
		this._queue.push(56);

		// Assert
		Assert.areEqual(65, this._queue.pop());
		Assert.areEqual(56, this._queue.pop());
	}

	//region ISortableCollection

	QueueOrderByTest() : void {
		// Arrange
		var outcome : Queue<number>;

		this._queue.push(45);
		this._queue.push(43);
		this._queue.push(78);
		this._queue.push(2);

		// Act
		outcome = this._toQueue(this._queue.orderBy(x => x));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(2, outcome.pop());
		Assert.areEqual(43, outcome.pop());
		Assert.areEqual(45, outcome.pop());
		Assert.areEqual(78, outcome.pop());
	}

	QueueOrderByEmptyTest() : void {
		// Arrange
		var outcome : Queue<number>;

		// Act
		outcome = this._toQueue(this._queue.orderBy(x => x));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	QueueOrderByDescTest() : void {
		// Arrange
		var outcome : Queue<number>;

		this._queue.push(43);
		this._queue.push(67);
		this._queue.push(87);
		this._queue.push(3);

		// Act
		outcome = this._toQueue(this._queue.orderByDesc(x => x));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(87, outcome.pop());
		Assert.areEqual(67, outcome.pop());
		Assert.areEqual(43, outcome.pop());
		Assert.areEqual(3, outcome.pop());
	}

	QueueOrderByDescEmptyTest() : void {
		// Arrange
		var outcome : Queue<number>;

		// Act
		outcome = this._toQueue(this._queue.orderByDesc(x => x));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
	}

	QueueReverseTest() : void {
		// Arrange
		var outcome : Queue<number>;

		this._queue.push(45);
		this._queue.push(43);
		this._queue.push(67);

		// Act
		outcome = this._toQueue(this._queue.reverse());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(67, outcome.pop());
		Assert.areEqual(43, outcome.pop());
		Assert.areEqual(45, outcome.pop());
	}

	QueueReverseEmptyTest() : void {
		// Arrange
		var outcome : Queue<number>;

		// Act
		outcome = this._toQueue(this._queue.reverse());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(0, outcome.getSize());
		Assert.areNotEqual(this._queue, outcome);
	}

	//endregion ISortableCollection

	//region ICollection

	QueueAverageTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(-1);
		this._queue.push(-2);
		this._queue.push(-3);

		// Act
		outcome = this._queue.average(x => -x);

		// Assert
		Assert.areEqual(2, outcome);
	}

	QueueExistsTest() : void {
		// Arrange
		var outcome : boolean;

		this._queue.push(56);
		this._queue.push(57);
		this._queue.push(58);

		// Act
		outcome = this._queue.exists(x => x > 50);

		// Assert
		Assert.isTrue(outcome);
	}

	QueueExistsFalseTest() : void {
		// Arrange
		var outcome : boolean;

		this._queue.push(56);
		this._queue.push(57);
		this._queue.push(58);

		// Act
		outcome = this._queue.exists(x => x > 100);

		// Assert
		Assert.isFalse(outcome);
	}

	QueueFindTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(5);
		this._queue.push(3);
		this._queue.push(4);

		// Act
		outcome = this._queue.find(x => x <= 4);

		// Assert
		Assert.areEqual(3, outcome);
	}

	QueueFindLastElementTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(5);
		this._queue.push(3);
		this._queue.push(4);

		// Act
		outcome = this._queue.find(x => x === 4);

		// Assert
		Assert.areEqual(4, outcome);
	}

	QueueFindNoResultTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(5);
		this._queue.push(3);
		this._queue.push(4);

		// Act
		outcome = this._queue.find(x => x > 10);

		// Assert
		Assert.isNull(outcome);
	}

	QueueFindEmptyTest() : void {
		// Arrange
		var outcome : number;

		// Act
		outcome = this._queue.find(x => true);

		// Assert
		Assert.isNull(outcome);
	}

	QueueForEachTest() : void {
		// Arrange
		var acc : Array<number>;

		acc = new Array<number>();
		this._queue.push(1);
		this._queue.push(2);
		this._queue.push(3);

		// Act
		this._queue.forEach(x => acc.push(x));

		// Assert
		Assert.areEqual(3, acc.length);
		Assert.areEqual(1, acc[0]);
		Assert.areEqual(2, acc[1]);
		Assert.areEqual(3, acc[2]);
	}

	QueueForEachEmptyTest() : void {
		// Arrange
		var acc : number;

		acc = 0;

		// Act
		this._queue.forEach(x => acc += x);

		// Assert
		Assert.areEqual(0, acc);
	}

	QueueIntersectTest() : void {
		// Arrange
		var source : Queue<number>, outcome : Queue<number>;

		source = new Queue<number>();
		source.push(2);
		source.push(3);
		source.push(4);

		this._queue.push(1);
		this._queue.push(2);
		this._queue.push(3);

		// Act
		outcome = this._toQueue(this._queue.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(2, outcome.getSize());
		Assert.areEqual(2, outcome.pop());
		Assert.areEqual(3, outcome.pop());
	}

	QueueIntersectEmptySourceTest() : void {
		// Arrange
		var source : Queue<number>, outcome : Queue<number>;

		source = new Queue<number>();
		source.push(1);
		source.push(2);
		source.push(3);

		// Act
		outcome = this._toQueue(this._queue.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	QueueIntersectEmptyTargetTest() : void {
		// Arrange
		var source : Queue<number>, outcome : Queue<number>;

		source = new Queue<number>();
		this._queue.push(1);
		this._queue.push(2);
		this._queue.push(3);

		// Act
		outcome = this._toQueue(this._queue.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	QueueMapTest() : void {
		// Arrange
		var outcome : Queue<number>;

		this._queue.push(1);
		this._queue.push(2);
		this._queue.push(3);

		// Act
		outcome = this._toQueue(this._queue.map(x => x * x));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(1, outcome.pop());
		Assert.areEqual(4, outcome.pop());
		Assert.areEqual(9, outcome.pop());
	}

	QueueMaxTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(56);
		this._queue.push(-90);
		this._queue.push(67);

		// Act
		outcome = this._queue.max(x => x * x);

		// Assert
		Assert.areEqual(-90, outcome);
	}

	QueueMinTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(56);
		this._queue.push(5);
		this._queue.push(-60);

		// Act
		outcome = this._queue.min(x => x * x);

		// Assert
		Assert.areEqual(5, outcome);
	}

	QueueSelectTest() : void {
		// Arrange
		var outcome : Queue<number>;

		this._queue.push(45);
		this._queue.push(3);
		this._queue.push(67);
		this._queue.push(34);

		// Act
		outcome = this._toQueue(this._queue.select(x => x > 40));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(2, outcome.getSize());
		Assert.areEqual(45, outcome.pop());
		Assert.areEqual(67, outcome.pop());
	}

	QueueSumTest() : void {
		// Arrange
		var outcome : number;

		this._queue.push(2);
		this._queue.push(-2);
		this._queue.push(5);

		// Act
		outcome = this._queue.sum(x => x);

		// Assert
		Assert.areEqual(5, outcome);
	}

	QueueToArrayTest() : void {
		// Arrange
		var outcome : Array<number>;

		this._queue.push(45);
		this._queue.push(67);
		this._queue.push(32);

		// Act
		outcome = this._queue.toArray();

		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.length);
		Assert.areEqual(45, outcome[0]);
		Assert.areEqual(67, outcome[1]);
		Assert.areEqual(32, outcome[2]);
	}

	QueueToDictionaryTest() : void {
		// Arrange
		var outcome : IDictionary<number, number>;

		this._queue.push(34);
		this._queue.push(45);
		this._queue.push(33);

		// Act
		outcome = this._queue.toDictionary(
			(x) => { return x; },
			(x) => { return x % 2; }
		);

		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(0, outcome.get(34));
		Assert.areEqual(1, outcome.get(45));
		Assert.areEqual(1, outcome.get(33));
	}

	QueueToListTest() : void {
		// Arrange
		var outcome : IList<number>;

		this._queue.push(45);
		this._queue.push(32);
		this._queue.push(21);

		// Act
		outcome = this._queue.toList();

		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(45, outcome.getAt(0));
		Assert.areEqual(32, outcome.getAt(1));
		Assert.areEqual(21, outcome.getAt(2));
	}

	QueueUnionTest() : void {
		// Arrange
		var source : Mocks.Collection<number>;
		var outcome : Queue<number>;

		source = new Mocks.Collection<number>();
		source.ForEachOutcome([3, 4, 5]);

		this._queue.push(1);
		this._queue.push(2);
		this._queue.push(3);

		// Act
		outcome = this._toQueue(this._queue.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(5, outcome.getSize());
		Assert.areEqual(1, outcome.pop());
		Assert.areEqual(2, outcome.pop());
		Assert.areEqual(3, outcome.pop());
		Assert.areEqual(4, outcome.pop());
		Assert.areEqual(5, outcome.pop());
	}

	QueueUnionEmptySourceTest() : void {
		// Arrange
		var source : Mocks.Collection<number>;
		var outcome : Queue<number>;

		source = new Mocks.Collection<number>();
		source.ForEachOutcome([3, 4, 5]);

		// Act
		outcome = this._toQueue(this._queue.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(3, outcome.pop());
		Assert.areEqual(4, outcome.pop());
		Assert.areEqual(5, outcome.pop());
	}

	QueueUnionEmptyTargetTest() : void {
		// Arrange
		var source : Mocks.Collection<number>;
		var outcome : Queue<number>;

		source = new Mocks.Collection<number>();
		source.ForEachOutcome([]);

		this._queue.push(1);
		this._queue.push(2);
		this._queue.push(3);

		// Act
		outcome = this._toQueue(this._queue.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(1, outcome.pop());
		Assert.areEqual(2, outcome.pop());
		Assert.areEqual(3, outcome.pop());
	}

	QueueUniqTest() : void {
		// Arrange
		var outcome : Queue<number>;

		this._queue.push(1);
		this._queue.push(2);
		this._queue.push(2);
		this._queue.push(3);
		this._queue.push(3);

		// Act
		outcome = this._toQueue(this._queue.uniq());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(1, outcome.pop());
		Assert.areEqual(2, outcome.pop());
		Assert.areEqual(3, outcome.pop());
	}

	QueueUniqEmptyTest() : void {
		// Arrange
		var outcome : Queue<number>;

		// Act
		outcome = this._toQueue(this._queue.uniq());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._queue, outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	//endregion ICollection
}
