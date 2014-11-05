/// <reference path="../../../ref.ts" />

class ArrayListTest extends UnitTestClass {
	private _list : ArrayList<number>;

	private _toArrayList<T>(source : ICollection<T>) : ArrayList<T> {
		return <ArrayList<T>>source;
	}

	setUp() : void {
		this._list = new ArrayList<number>();
	}

	tearDown() : void {
		this._list = null;
	}

	ArrayListConstructorTest() : void {
		// Arrange
		var list : ArrayList<number>;
	
		// Act
		list = new ArrayList<number>();
	
		// Assert
		Assert.isNotNull(list);
		Assert.areEqual(0, list.getLength());
	}

	ArrayListConstructorWithSourceTest() : void {
		// Arrange
		var list : ArrayList<string>;
		var source : ArrayList<string>;

		source = new ArrayList<string>();
		source.add('foo');
		source.add('bar');
	
		// Act
		list = new ArrayList<string>(source);
	
		// Assert
		Assert.isNotNull(list);
		Assert.areNotEqual(source, list);
		Assert.areEqual(2, list.getLength());
		Assert.areEqual('foo', list.getAt(0));
		Assert.areEqual('bar', list.getAt(1));
	}

	ArrayListAddTest() : void {
		// Arrange
	
		// Act
		this._list.add(45);
		this._list.add(67);
	
		// Assert
		Assert.areEqual(2, this._list.getLength());
		Assert.areEqual(45, this._list.getAt(0));
		Assert.areEqual(67, this._list.getAt(1));
	}

	ArrayListGetAtTest() : void {
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

	ArrayListGetAtNegativeIndexTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._list.getAt(-1);
	
		// Assert
		Assert.throws(f);
	}

	ArrayListGetAtUnboundIndexTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._list.getAt(56);
	
		// Assert
		Assert.throws(f);
	}

	ArrayListGetLengthTest() : void {
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

	ArrayListGetLengthEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._list.getLength();
	
		// Assert
		Assert.areEqual(0, outcome);
	}

	ArrayListInsertAtTest() : void {
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

	ArrayListInsertAtEndTest() : void {
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

	ArrayListInsertAtNegativeIndexTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._list.insertAt(-34, 2);
	
		// Assert
		Assert.throws(f);
	}

	ArrayListRemoveTest() : void {
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

	ArrayListRemoveFirstOccurrenceTest() : void {
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

	ArrayListRemoveEmptyTest() : void {
		// Arrange
	
		// Act
		this._list.remove(345);
	
		// Assert
		Assert.areEqual(0, this._list.getLength());
	}

	ArrayListRemoveAtTest() : void {
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

	ArrayListRemoveAtNegativeIndexTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._list.removeAt(-45);
	
		// Assert
		Assert.throws(f);
	}

	ArrayListRemoveAtUnboundIndexTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._list.removeAt(345);
	
		// Assert
		Assert.throws(f);
	}

	ArrayListRemoveIfTest() : void {
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

	ArrayListRemoveIfEmptyTest() : void {
		// Arrange
	
		// Act
		this._list.removeIf(x => true);
	
		// Assert
		Assert.areEqual(0, this._list.getLength());
	}

	//region ISortableCollection

	ArrayListOrderByTest() : void {
		// Arrange
		var outcome : ArrayList<number>;

		this._list.add(2);
		this._list.add(-3);
		this._list.add(56);
	
		// Act
		outcome = this._toArrayList(this._list.orderBy(x => x * x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(2, outcome.getAt(0));
		Assert.areEqual(-3, outcome.getAt(1));
		Assert.areEqual(56, outcome.getAt(2));
	}

	ArrayListOrderByEmptyTest() : void {
		// Arrange
		var outcome : ArrayList<number>;
	
		// Act
		outcome = this._toArrayList(this._list.orderBy(x => x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	ArrayListOrderByDescTest() : void {
		// Arrange
		var outcome : ArrayList<number>;

		this._list.add(-4);
		this._list.add(3);
		this._list.add(56);
	
		// Act
		outcome = this._toArrayList(this._list.orderByDesc(x => x * x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(56, outcome.getAt(0));
		Assert.areEqual(-4, outcome.getAt(1));
		Assert.areEqual(3, outcome.getAt(2));
	}

	ArrayListOrderByDescEmptyTest() : void {
		// Arrange
		var outcome : ArrayList<number>;
	
		// Act
		outcome = this._toArrayList(this._list.orderByDesc(x => x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	ArrayListReverseTest() : void {
		// Arrange
		var outcome : ArrayList<number>;

		this._list.add(45);
		this._list.add(43);
		this._list.add(32);
	
		// Act
		outcome = this._toArrayList(this._list.reverse());
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(32, outcome.getAt(0));
		Assert.areEqual(43, outcome.getAt(1));
		Assert.areEqual(45, outcome.getAt(2));
	}

	//endregion ISortableCollection

	//region ICollection

	ArrayListFindTest() : void {
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

	ArrayListFindNoResultTest() : void {
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

	ArrayListForEachTest() : void {
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

	ArrayListMapTest() : void {
		// Arrange
		var outcome : ArrayList<number>;

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);
	
		// Act
		outcome = this._toArrayList(this._list.map(x => x * x));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(1, outcome.getAt(0));
		Assert.areEqual(2 * 2, outcome.getAt(1));
		Assert.areEqual(3 * 3, outcome.getAt(2));
	}

	ArrayListMaxTest() : void {
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

	ArrayListMaxEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._list.max(x => x);
	
		// Assert
		Assert.isNull(outcome);
	}

	ArrayListMinTest() : void {
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

	ArrayListMinEmptyTest() : void {
		// Arrange
		var outcome : number;
	
		// Act
		outcome = this._list.min(x => x);
	
		// Assert
		Assert.isNull(outcome);
	}

	ArrayListSelectTest() : void {
		// Arrange
		var outcome : ArrayList<number>;

		this._list.add(45);
		this._list.add(34);
		this._list.add(2);
	
		// Act
		outcome = this._toArrayList(this._list.select(x => x < 40));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(2, outcome.getLength());
		Assert.areEqual(34, outcome.getAt(0));
		Assert.areEqual(2, outcome.getAt(1));
	}

	ArrayListSumTest() : void {
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

	ArrayListToArrayTest() : void {
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
		outcome.push(34);
		Assert.areEqual(3, this._list.getLength());
	}

	ArrayListToDictionaryTest() : void {
		// Arrange
		var outcome : IDictionary<number, number>;

		this._list.add(3);
		this._list.add(4);
		this._list.add(5);
	
		// Act
		outcome = this._list.toDictionary(
			(x) => { return x; },
			(x) => { return x % 2; }
		);
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(1, outcome.get(3));
		Assert.areEqual(0, outcome.get(4));
		Assert.areEqual(1, outcome.get(5));
	}

	ArrayListToListTest() : void {
		// Arrange
		var outcome : IList<number>;

		this._list.add(4);
		this._list.add(56);
		this._list.add(67);
	
		// Act
		outcome = this._list.toList();
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areNotEqual(this._list, outcome);
		Assert.areEqual(4, outcome.getAt(0));
		Assert.areEqual(56, outcome.getAt(1));
		Assert.areEqual(67, outcome.getAt(2));
	}

	//endregion ICollection
}
