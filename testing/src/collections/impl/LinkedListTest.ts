/// <reference path="../../../ref.ts" />

class LinkedListTest extends UnitTestClass {
	private _list : LinkedList<number>;
	private _element : LinkedListUtils.LinkedListElement<string>;

	private _toLinkedList<T>(source : ICollection<T>) : LinkedList<T> {
		return <LinkedList<T>>source;
	}

	setUp() : void {
		this._list = new LinkedList<number>();
		this._element = new LinkedListUtils.LinkedListElement<string>();
	}

	tearDown() : void {
		this._list = null;
		this._element = null;
	}

	//region LinkedListElement

	LinkedListElementConstructorTest() : void {
		// Arrange
		var element : LinkedListUtils.LinkedListElement<string>;
	
		// Act
		element = new LinkedListUtils.LinkedListElement<string>('foo');
	
		// Assert
		Assert.isNotNull(element);
		Assert.areEqual('foo', element.getContent());
		Assert.isFalse(element.hasNext());
	}

	LinkedListElementContentTest() : void {
		// Arrange
		var value : string, outcome : string;

		value = 'foo';
	
		// Act
		this._element.setContent(value);
		outcome = this._element.getContent();
	
		// Assert
		Assert.areEqual(value, outcome);
	}

	LinkedListElementNextTest() : void {
		// Arrange
		var value : LinkedListUtils.LinkedListElement<string>, outcome : LinkedListUtils.LinkedListElement<string>;

		value = new LinkedListUtils.LinkedListElement<string>();
	
		// Act
		this._element.setNext(value);
		outcome = this._element.getNext();
	
		// Assert
		Assert.areEqual(value, outcome);
	}

	LinkedListElementHasNextTest() : void {
		// Arrange
		var outcome : boolean;

		this._element.setNext(new LinkedListUtils.LinkedListElement<string>());
	
		// Act
		outcome = this._element.hasNext();

		// Assert
		Assert.isTrue(outcome);
	}

	LinkedListElementHasNextNoElementTest() : void {
		// Arrange
		var outcome : boolean;
	
		// Act
		outcome = this._element.hasNext();
	
		// Assert
		Assert.isFalse(outcome);
	}

	//endregion LinkedListElement

	//region IList

	LinkedListConstructorTest() : void {
		// Arrange
		var list : LinkedList<number>;
	
		// Act
		list = new LinkedList<number>();
	
		// Assert
		Assert.isNotNull(list);
		Assert.areEqual(0, list.getLength());
	}

	LinkedListConstructorWithSourceTest() : void {
		// Arrange
		var list : LinkedList<string>;
		var source : Mocks.Collection<string>;

		source = new Mocks.Collection<string>();
		source.ForEachOutcome(['foo', 'bar', 'foobar']);
	
		// Act
		list = new LinkedList<string>(source);
	
		// Assert
		Assert.isNotNull(list);
		Assert.areNotEqual(source, list);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, list.getLength());
		Assert.areEqual('foo', list.getAt(0));
		Assert.areEqual('bar', list.getAt(1));
		Assert.areEqual('foobar', list.getAt(2));
	}

	LinkedListInsertAtTest() : void {
		// Arrange
		this._list.add(45);
		this._list.add(67);
		this._list.add(2);
	
		// Act
		this._list.insertAt(1, 34);
	
		// Assert
		Assert.areEqual(4, this._list.getLength());
		Assert.areEqual(45, this._list.getAt(0));
		Assert.areEqual(34, this._list.getAt(1));
		Assert.areEqual(67, this._list.getAt(2));
		Assert.areEqual(2, this._list.getAt(3));
	}

	LinkedListInsertAtBeginningTest() : void {
		// Arrange
		this._list.add(43);
		this._list.add(32);
	
		// Act
		this._list.insertAt(0, 2);
	
		// Assert
		Assert.areEqual(3, this._list.getLength());
		Assert.areEqual(2, this._list.getAt(0));
		Assert.areEqual(43, this._list.getAt(1));
		Assert.areEqual(32, this._list.getAt(2));
	}

	LinkedListInsertAtEndTest() : void {
		// Arrange
		this._list.add(45);
		this._list.add(46);
	
		// Act
		this._list.insertAt(56, 34);
	
		// Assert
		Assert.areEqual(3, this._list.getLength());
		Assert.areEqual(45, this._list.getAt(0));
		Assert.areEqual(46, this._list.getAt(1));
		Assert.areEqual(34, this._list.getAt(2));
	}

	LinkedListInsertAtNegativeIndexTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._list.insertAt(-34, 2);
	
		// Assert
		Assert.throws(f);
	}

	//endregion IList

	//region IListableCollection

	LinkedListAddTest() : void {
		// Arrange
	
		// Act
		this._list.add(45);
		this._list.add(67);
	
		// Assert
		Assert.areEqual(2, this._list.getLength());
		Assert.areEqual(45, this._list.getAt(0));
		Assert.areEqual(67, this._list.getAt(1));
	}

	LinkedListAddSingleTest() : void {
		// Arrange
	
		// Act
		this._list.add(45);
	
		// Assert
		Assert.areEqual(1, this._list.getLength());
		Assert.areEqual(45, this._list.getAt(0));
	}

	LinkedListGetAtTest() : void {
		// Arrange
		var outcome1 : number, outcome2 : number;

		this._list.add(45);
		this._list.add(2);
		this._list.add(65);
	
		// Act
		outcome1 = this._list.getAt(1);
		outcome2 = this._list.getAt(2);
	
		// Assert
		Assert.areEqual(2, outcome1);
		Assert.areEqual(65, outcome2);
	}

	LinkedListGetAtNegativeIndexTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._list.getAt(-1);
	
		// Assert
		Assert.throws(f);
	}

	LinkedListGetAtUnboundIndexTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._list.getAt(56);
	
		// Assert
		Assert.throws(f);
	}

	LinkedListGetLengthTest() : void {
		// Arrange
		var outcome : number;

		this._list.add(45);
		this._list.add(67);
		this._list.add(78);
	
		// Act
		outcome = this._list.getLength();
	
		// Assert
		Assert.areEqual(3, outcome);
	}

	LinkedListGetLengthEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._list.getLength();
	
		// Assert
		Assert.areEqual(0, outcome);
	}

	LinkedListRemoveTest() : void {
		// Arrange
		this._list.add(34);
		this._list.add(45);
		this._list.add(65);
	
		// Act
		this._list.remove(45);
	
		// Assert
		Assert.areEqual(2, this._list.getLength());
		Assert.areEqual(34, this._list.getAt(0));
		Assert.areEqual(65, this._list.getAt(1));
	}

	LinkedListRemoveFirstOccurrenceTest() : void {
		// Arrange
		this._list.add(34);
		this._list.add(34);
		this._list.add(45);
	
		// Act
		this._list.remove(34);
	
		// Assert
		Assert.areEqual(2, this._list.getLength());
		Assert.areEqual(34, this._list.getAt(0));
		Assert.areEqual(45, this._list.getAt(1));
	}

	LinkedListRemoveFirstElementTest() : void {
		// Arrange
		this._list.add(43);
		this._list.add(2);
		this._list.add(10);
	
		// Act
		this._list.remove(43);
	
		// Assert
		Assert.areEqual(2, this._list.getLength());
		Assert.areEqual(2, this._list.getAt(0));
		Assert.areEqual(10, this._list.getAt(1));
	}

	LinkedListRemoveLastElementTest() : void {
		// Arrange
		this._list.add(35);
		this._list.add(32);
		this._list.add(21);
	
		// Act
		this._list.remove(21);
	
		// Assert
		Assert.areEqual(2, this._list.getLength());
		Assert.areEqual(35, this._list.getAt(0));
		Assert.areEqual(32, this._list.getAt(1));
		this._list.add(23);
		Assert.areEqual(3, this._list.getLength());
		Assert.areEqual(23, this._list.getAt(2));
	}

	LinkedListRemoveSingleElementListTest() : void {
		// Arrange
		this._list.add(45);
	
		// Act
		this._list.remove(45);
	
		// Assert
		Assert.areEqual(0, this._list.getLength());
		this._list.add(4);
		Assert.areEqual(1, this._list.getLength());
		Assert.areEqual(4, this._list.getAt(0));
	}

	LinkedListRemoveEmptyTest() : void {
		// Arrange
	
		// Act
		this._list.remove(345);
	
		// Assert
		Assert.areEqual(0, this._list.getLength());
	}

	LinkedListRemoveAtTest() : void {
		// Arrange
		this._list.add(34);
		this._list.add(67);
		this._list.add(32);
	
		// Act
		this._list.removeAt(1);
	
		// Assert
		Assert.areEqual(2, this._list.getLength());
		Assert.areEqual(34, this._list.getAt(0));
		Assert.areEqual(32, this._list.getAt(1));
	}

	LinkedListRemoveAtFirstIndexTest() : void {
		// Arrange
		this._list.add(45);
		this._list.add(32);
		this._list.add(34);
	
		// Act
		this._list.removeAt(0);
	
		// Assert
		Assert.areEqual(2, this._list.getLength());
		Assert.areEqual(32, this._list.getAt(0));
		Assert.areEqual(34, this._list.getAt(1));
	}

	LinkedListRemoveAtLastIndexTest() : void {
		// Arrange
		this._list.add(45);
		this._list.add(67);
		this._list.add(21);
	
		// Act
		this._list.removeAt(2);
	
		// Assert
		Assert.areEqual(2, this._list.getLength());
		Assert.areEqual(45, this._list.getAt(0));
		Assert.areEqual(67, this._list.getAt(1));
		this._list.add(12);
		Assert.areEqual(3, this._list.getLength());
		Assert.areEqual(12, this._list.getAt(2));
	}

	LinkedListRemoveAtSingleElementListTest() : void {
		// Arrange
		this._list.add(4);
	
		// Act
		this._list.removeAt(0);
	
		// Assert
		Assert.areEqual(0, this._list.getLength());
		this._list.add(34);
		Assert.areEqual(1, this._list.getLength());
		Assert.areEqual(34, this._list.getAt(0));
	}

	LinkedListRemoveAtNegativeIndexTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._list.removeAt(-45);
	
		// Assert
		Assert.throws(f);
	}

	LinkedListRemoveAtUnboundIndexTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._list.removeAt(345);
	
		// Assert
		Assert.throws(f);
	}

	LinkedListRemoveIfTest() : void {
		// Arrange
		this._list.add(45);
		this._list.add(34);
		this._list.add(23);
	
		// Act
		this._list.removeIf(x => x > 30);
	
		// Assert
		Assert.areEqual(1, this._list.getLength());
		Assert.areEqual(23, this._list.getAt(0));
	}

	LinkedListRemoveIfFirstElementTest() : void {
		// Arrange
		this._list.add(43);
		this._list.add(32);
		this._list.add(21);
	
		// Act
		this._list.removeIf(x => x > 30);
	
		// Assert
		Assert.areEqual(1, this._list.getLength());
		Assert.areEqual(21, this._list.getAt(0));
	}

	LinkedListRemoveIfLastElementTest() : void {
		// Arrange
		this._list.add(4);
		this._list.add(56);
		this._list.add(120);
	
		// Act
		this._list.removeIf(x => x > 100);
	
		// Assert
		Assert.areEqual(2, this._list.getLength());
		Assert.areEqual(4, this._list.getAt(0));
		Assert.areEqual(56, this._list.getAt(1));
		this._list.add(45);
		Assert.areEqual(3, this._list.getLength());
		Assert.areEqual(45, this._list.getAt(2));
	}

	LinkedListRemoveIfSingleElementListTest() : void {
		// Arrange
		this._list.add(45);
	
		// Act
		this._list.removeIf(x => true);
	
		// Assert
		Assert.areEqual(0, this._list.getLength());
		this._list.add(23);
		Assert.areEqual(1, this._list.getLength());
		Assert.areEqual(23, this._list.getAt(0));
	}

	LinkedListRemoveIfEmptyTest() : void {
		// Arrange
	
		// Act
		this._list.removeIf(x => true);
	
		// Assert
		Assert.areEqual(0, this._list.getLength());
	}

	//endregion IListableCollection

	//region ISortableCollection

	LinkedListOrderByTest() : void {
		// Arrange
		var outcome : LinkedList<number>;

		this._list.add(2);
		this._list.add(-3);
		this._list.add(56);
	
		// Act
		outcome = this._toLinkedList(this._list.orderBy(x => x * x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(2, outcome.getAt(0));
		Assert.areEqual(-3, outcome.getAt(1));
		Assert.areEqual(56, outcome.getAt(2));
	}

	LinkedListOrderByEmptyTest() : void {
		// Arrange
		var outcome : LinkedList<number>;
	
		// Act
		outcome = this._toLinkedList(this._list.orderBy(x => x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	LinkedListOrderByDescTest() : void {
		// Arrange
		var outcome : LinkedList<number>;

		this._list.add(-4);
		this._list.add(3);
		this._list.add(56);
	
		// Act
		outcome = this._toLinkedList(this._list.orderByDesc(x => x * x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(56, outcome.getAt(0));
		Assert.areEqual(-4, outcome.getAt(1));
		Assert.areEqual(3, outcome.getAt(2));
	}

	LinkedListOrderByDescEmptyTest() : void {
		// Arrange
		var outcome : LinkedList<number>;
	
		// Act
		outcome = this._toLinkedList(this._list.orderByDesc(x => x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	LinkedListReverseTest() : void {
		// Arrange
		var outcome : LinkedList<number>;

		this._list.add(45);
		this._list.add(43);
		this._list.add(32);
	
		// Act
		outcome = this._toLinkedList(this._list.reverse());
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(32, outcome.getAt(0));
		Assert.areEqual(43, outcome.getAt(1));
		Assert.areEqual(45, outcome.getAt(2));
	}

	//endregion ISortableCollection

	//region ICollection

	LinkedListAverageTest() : void {
		// Arrange
		var outcome : number;

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);
	
		// Act
		outcome = this._list.average(x => x * x);
	
		// Assert
		Assert.areEqual(14 / 3, outcome);
	}

	LinkedListExistsTest() : void {
		// Arrange
		var outcome : boolean;

		this._list.add(23);
		this._list.add(24);
		this._list.add(25);
	
		// Act
		outcome = this._list.exists(x => x === 25);
	
		// Assert
		Assert.isTrue(outcome);
	}

	LinkedListExistsFalseTest() : void {
		// Arrange
		var outcome : boolean;

		this._list.add(45);
		this._list.add(56);
	
		// Act
		outcome = this._list.exists(x => x > 100);
	
		// Assert
		Assert.isFalse(outcome);
	}

	LinkedListFindTest() : void {
		// Arrange
		var outcome : number;

		this._list.add(56);
		this._list.add(34);
		this._list.add(22);
		this._list.add(2);
	
		// Act
		outcome = this._list.find(x => x > 10 && x < 50);
	
		// Assert
		Assert.areEqual(34, outcome);
	}

	LinkedListFindLastElementTest() : void {
		// Arrange
		var outcome : number;

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);
	
		// Act
		outcome = this._list.find(x => x > 2);
	
		// Assert
		Assert.areEqual(3, outcome);
	}

	LinkedListFindEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._list.find(x => true);
	
		// Assert
		Assert.isNull(outcome);
	}

	LinkedListFindNoResultTest() : void {
		// Arrange
		var outcome : number;

		this._list.add(4);
		this._list.add(3);
		this._list.add(5);
	
		// Act
		outcome = this._list.find(x => x > 100);
	
		// Assert
		Assert.isNull(outcome);
	}

	LinkedListForEachTest() : void {
		// Arrange
		var acc : Array<number>;

		acc = new Array<number>();
		this._list.add(34);
		this._list.add(56);
		this._list.add(45);
	
		// Act
		this._list.forEach(e => acc.push(e));
	
		// Assert
		Assert.areEqual(3, this._list.getLength());
		Assert.areEqual(34, this._list.getAt(0));
		Assert.areEqual(56, this._list.getAt(1));
		Assert.areEqual(45, this._list.getAt(2));
	}

	LinkedListForEachEmptyTest() : void {
		// Arrange
		var acc : number;
	
		acc = 0;

		// Act
		this._list.forEach(x => acc++);
	
		// Assert
		Assert.areEqual(0, acc);
	}

	LinkedListIntersectTest() : void {
		// Arrange
		var outcome : LinkedList<number>;
		var source : LinkedList<number>;

		source = new LinkedList<number>();
		source.add(5);
		source.add(6);
		source.add(7);

		this._list.add(4);
		this._list.add(6);
		this._list.add(8);
	
		// Act
		outcome = this._toLinkedList(this._list.intersect(source));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._list, outcome);
		Assert.areEqual(1, outcome.getLength());
		Assert.areEqual(6, outcome.getAt(0));
	}

	LinkedListIntersectEmptySourceTest() : void {
		// Arrange
		var outcome : LinkedList<number>, source : LinkedList<number>;

		source = new LinkedList<number>();
		source.add(4);
		source.add(6);
	
		// Act
		outcome = this._toLinkedList(this._list.intersect(source));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._list, outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	LinkedListIntersectEmptyTargetTest() : void {
		// Arrange
		var outcome : LinkedList<number>, source : LinkedList<number>;

		source = new LinkedList<number>();
		this._list.add(56);
		this._list.add(57);
		this._list.add(58);
	
		// Act
		outcome = this._toLinkedList(this._list.intersect(source));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._list, outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	LinkedListMapTest() : void {
		// Arrange
		var outcome : LinkedList<number>;

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);
	
		// Act
		outcome = this._toLinkedList(this._list.map(x => x * x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(1, outcome.getAt(0));
		Assert.areEqual(2 * 2, outcome.getAt(1));
		Assert.areEqual(3 * 3, outcome.getAt(2));
	}

	LinkedListMaxTest() : void {
		// Arrange
		var outcome : number;

		this._list.add(34);
		this._list.add(-56);
		this._list.add(2);
	
		// Act
		outcome = this._list.max(x => x * x);
	
		// Assert
		Assert.areEqual(-56, outcome);
	}

	LinkedListMinTest() : void {
		// Arrange
		var outcome : number;

		this._list.add(56);
		this._list.add(-3);
		this._list.add(2);
	
		// Act
		outcome = this._list.min(x => x * x);
	
		// Assert
		Assert.areEqual(2, outcome);
	}

	LinkedListSelectTest() : void {
		// Arrange
		var outcome : LinkedList<number>;

		this._list.add(45);
		this._list.add(34);
		this._list.add(2);
	
		// Act
		outcome = this._toLinkedList(this._list.select(x => x < 40));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(2, outcome.getLength());
		Assert.areEqual(34, outcome.getAt(0));
		Assert.areEqual(2, outcome.getAt(1));
	}

	LinkedListSumTest() : void {
		// Arrange
		var outcome : number;

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);
	
		// Act
		outcome = this._list.sum(x => x * x);
	
		// Assert
		Assert.areEqual(1 + 4 + 9, outcome);
	}

	LinkedListToArrayTest() : void {
		// Arrange
		var outcome : Array<number>;

		this._list.add(45);
		this._list.add(67);
		this._list.add(32);
	
		// Act
		outcome = this._list.toArray();
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.length);
		Assert.areEqual(45, outcome[0]);
		Assert.areEqual(67, outcome[1]);
		Assert.areEqual(32, outcome[2]);
	}

	LinkedListToDictionaryTest() : void {
		// Arrange
		var outcome : IDictionary<number, number>;

		this._list.add(34);
		this._list.add(45);
		this._list.add(32);
	
		// Act
		outcome = this._list.toDictionary(
			(x) => { return x; },
			(x) => { return x % 2; }
		);
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(0, outcome.get(34));
		Assert.areEqual(1, outcome.get(45));
		Assert.areEqual(0, outcome.get(32));
	}

	LinkedListToListTest() : void {
		// Arrange
		var outcome : IList<number>;

		this._list.add(34);
		this._list.add(99);
		this._list.add(32);
	
		// Act
		outcome = this._list.toList();
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._list, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(34, outcome.getAt(0));
		Assert.areEqual(99, outcome.getAt(1));
		Assert.areEqual(32, outcome.getAt(2));
	}

	LinkedListUnionTest() : void {
		// Arrange
		var source : Mocks.Collection<number>;
		var outcome : LinkedList<number>;

		source = new Mocks.Collection<number>();
		source.ForEachOutcome([1, 2, 3]);

		this._list.add(3);
		this._list.add(4);
		this._list.add(5);
	
		// Act
		outcome = this._toLinkedList(this._list.union(source));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._list, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(5, outcome.getLength());
		Assert.areEqual(3, outcome.getAt(0));
		Assert.areEqual(4, outcome.getAt(1));
		Assert.areEqual(5, outcome.getAt(2));
		Assert.areEqual(1, outcome.getAt(3));
		Assert.areEqual(2, outcome.getAt(4));
	}

	LinkedListUnionEmptySourceTest() : void {
		// Arrange
		var source : Mocks.Collection<number>;
		var outcome : LinkedList<number>;

		source = new Mocks.Collection<number>();
		source.ForEachOutcome([1, 2, 3]);
	
		// Act
		outcome = this._toLinkedList(this._list.union(source));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._list, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(1, outcome.getAt(0));
		Assert.areEqual(2, outcome.getAt(1));
		Assert.areEqual(3, outcome.getAt(2));
	}

	LinkedListUnionEmptyTargetTest() : void {
		// Arrange
		var source : Mocks.Collection<number>;
		var outcome : LinkedList<number>;

		source = new Mocks.Collection<number>();
		source.ForEachOutcome([]);

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);
	
		// Act
		outcome = this._toLinkedList(this._list.union(source));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._list, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(1, outcome.getAt(0));
		Assert.areEqual(2, outcome.getAt(1));
		Assert.areEqual(3, outcome.getAt(2));
	}

	LinkedListUniqTest() : void {
		// Arrange
		var outcome : LinkedList<number>;

		this._list.add(1);
		this._list.add(2);
		this._list.add(2);
		this._list.add(3);
		this._list.add(1);
	
		// Act
		outcome = this._toLinkedList(this._list.uniq());
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._list, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(1, outcome.getAt(0));
		Assert.areEqual(2, outcome.getAt(1));
		Assert.areEqual(3, outcome.getAt(2));
	}

	LinkedListUniqEmptyTest() : void {
		// Arrange
		var outcome : LinkedList<number>;
	
		// Act
		outcome = this._toLinkedList(this._list.uniq());
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._list, outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	//endregion ICollection
}
