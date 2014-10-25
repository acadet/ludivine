/// <reference path="../../../ref.ts" />

class LinkedListTest extends UnitTestClass {
	private _list : LinkedList<number>;

	setUp() : void {
		this._list = new LinkedList<number>();
	}

	tearDown() : void {
		this._list = null;
	}

	LinkedListConstructorTest() : void {
		// Arrange
		var list : LinkedList<number>;
	
		// Act
		list = new LinkedList<number>();
	
		// Assert
		Assert.isNotNull(list);
		Assert.areEqual(0, list.getLength());
	}

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

	LinkedListRemoveIfEmptyTest() : void {
		// Arrange
	
		// Act
		this._list.removeIf(x => true);
	
		// Assert
		Assert.areEqual(0, this._list.getLength());
	}

	//region ICollection

	LinkedListSelectTest() : void {
		// Arrange
		var outcome : LinkedList<number>;

		this._list.add(45);
		this._list.add(34);
		this._list.add(2);
	
		// Act
		outcome = this._list.select(x => x < 40);
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(2, outcome.getLength());
		Assert.areEqual(34, outcome.getAt(0));
		Assert.areEqual(2, outcome.getAt(1));
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

	LinkedListMapTest() : void {
		// Arrange
		var outcome : LinkedList<number>;

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);
	
		// Act
		outcome = this._list.map(x => x * x);
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(1, outcome.getAt(0));
		Assert.areEqual(2 * 2, outcome.getAt(1));
		Assert.areEqual(3 * 3, outcome.getAt(2));
	}

	LinkedListOrderByTest() : void {
		// Arrange
		var outcome : LinkedList<number>;

		this._list.add(2);
		this._list.add(-3);
		this._list.add(56);
	
		// Act
		outcome = this._list.orderBy(x => x * x);
	
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
		outcome = this._list.orderBy(x => x);
	
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
		outcome = this._list.orderByDesc(x => x * x);
	
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
		outcome = this._list.orderByDesc(x => x);
	
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
		outcome = this._list.reverse();
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(32, outcome.getAt(0));
		Assert.areEqual(43, outcome.getAt(1));
		Assert.areEqual(45, outcome.getAt(2));
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

	LinkedListMinEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._list.min(x => x);
	
		// Assert
		Assert.isNull(outcome);
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

	LinkedListMaxEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._list.max(x => x);
	
		// Assert
		Assert.isNull(outcome);
	}

	//endregion ICollection
}
