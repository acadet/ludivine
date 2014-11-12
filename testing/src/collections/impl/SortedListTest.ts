/// <reference path="../../../ref.ts" />

class SortedListTest extends UnitTestClass {
	private _ascList : SortedList<string, number>;
	private _descList : SortedList<string, number>;
	private _element : SortedListUtils.SortedListElement<string>;
	private _cursor : SortedListUtils.SortedListCursor<string>;

	private _toSortedList<A, B>(source : ICollection<A>) : SortedList<A, B> {
		return <SortedList<A, B>>source;
	}

	setUp() : void {
		this._ascList = new SortedList<string, number>(x => x.length);
		this._descList = new SortedList<string, number>(x => x.length, false);
		this._element = new SortedListUtils.SortedListElement<string>();
		this._cursor = new SortedListUtils.SortedListCursor<string>();
	}

	tearDown() : void {
		this._ascList = null;
		this._descList = null;
		this._element = null;
		this._cursor = null;
	}

	//region SortedListElement

	SortedListElementConstructorTest() : void {
		// Arrange
		var element : SortedListUtils.SortedListElement<number>;

		// Act
		element = new SortedListUtils.SortedListElement<number>(56);

		// Assert
		Assert.isNotNull(element);
		Assert.areEqual(56, element.getContent());
		Assert.isFalse(element.hasNext());
	}

	SortedListElementContentTest() : void {
		// Arrange
		var value : string, outcome : string;

		value = 'foo';

		// Act
		this._element.setContent(value);
		outcome = this._element.getContent();

		// Assert
		Assert.areEqual(value, outcome);
	}

	SortedListElementNextTest() : void {
		// Arrange
		var value : SortedListUtils.SortedListElement<string>, outcome : SortedListUtils.SortedListElement<string>;

		value = new SortedListUtils.SortedListElement<string>();

		// Act
		this._element.setNext(value);
		outcome = this._element.getNext();

		// Assert
		Assert.areEqual(value, outcome);
	}

	SortedListElementHasNextTest() : void {
		// Arrange
		var outcome : boolean;

		this._element.setNext(new SortedListUtils.SortedListElement<string>());

		// Act
		outcome = this._element.hasNext();

		// Assert
		Assert.isTrue(outcome);
	}

	SortedListElementHasNextNoElementTest() : void {
		// Arrange
		var outcome : boolean;

		// Act
		outcome = this._element.hasNext();

		// Assert
		Assert.isFalse(outcome);
	}

	//endregion SortedListElement

	//region SortedListCursor

	SortedListCursorConstructorTest() : void {
		// Arrange
		var cursor : SortedListUtils.SortedListCursor<number>;
		var e1 : SortedListUtils.SortedListElement<number>, e2 : SortedListUtils.SortedListElement<number>;

		e1 = new SortedListUtils.SortedListElement<number>();
		e2 = new SortedListUtils.SortedListElement<number>();

		// Act
		cursor = new SortedListUtils.SortedListCursor<number>(e1, e2);

		// Assert
		Assert.isNotNull(cursor);
		Assert.areEqual(e1, cursor.getPrevious());
		Assert.areEqual(e2, cursor.getCurrent());
		Assert.isTrue(cursor.hasPrevious());
	}

	SortedListCursorPreviousTest() : void {
		// Arrange
		var value : SortedListUtils.SortedListElement<string>, outcome : SortedListUtils.SortedListElement<string>;

		value = new SortedListUtils.SortedListElement<string>();

		// Act
		this._cursor.setPrevious(value);
		outcome = this._cursor.getPrevious();

		// Assert
		Assert.areEqual(value, outcome);
	}

	SortedListCursorHasPreviousTest() : void {
		// Arrange
		var outcome : boolean;

		this._cursor.setPrevious(new SortedListUtils.SortedListElement<string>());

		// Act
		outcome = this._cursor.hasPrevious();

		// Assert
		Assert.isTrue(outcome);
	}

	SortedListCursorHasPreviousNoElementTest() : void {
		// Arrange
		var outcome : boolean;

		// Act
		outcome = this._cursor.hasPrevious();

		// Assert
		Assert.isFalse(outcome);
	}

	SortedListCursorCurrentTest() : void {
		// Arrange
		var value : SortedListUtils.SortedListElement<string>, outcome : SortedListUtils.SortedListElement<string>;

		value = new SortedListUtils.SortedListElement<string>();

		// Act
		this._cursor.setCurrent(value);
		outcome = this._cursor.getCurrent();

		// Assert
		Assert.areEqual(value, outcome);
	}

	//endregion SortedListCursor

	//region Ascending SortedList

	SortedListAscConstructorTest() : void {
		// Arrange
		var list : SortedList<number, number>;

		// Act
		list = new SortedList<number, number>(x => x);

		// Assert
		Assert.isNotNull(list);
		Assert.areEqual(0, list.getLength());
	}

	SortedListAscAddTest() : void {
		// Arrange

		// Act
		this._ascList.add('foobar');
		this._ascList.add('bar');

		// Assert
		Assert.areEqual(2, this._ascList.getLength());
		Assert.areEqual('bar', this._ascList.getAt(0));
		Assert.areEqual('foobar', this._ascList.getAt(1));
	}

	SortedListAscAddSingleTest() : void {
		// Arrange

		// Act
		this._ascList.add('foo');

		// Assert
		Assert.areEqual(1, this._ascList.getLength());
		Assert.areEqual('foo', this._ascList.getAt(0));
	}

	SortedListAscAddFirstElementTest() : void {
		// Arrange
		this._ascList.add('foobar');

		// Act
		this._ascList.add('bar');

		// Assert
		Assert.areEqual(2, this._ascList.getLength());
		Assert.areEqual('bar', this._ascList.getAt(0));
		Assert.areEqual('foobar', this._ascList.getAt(1));
	}

	SortedListAscAddLastElementTest() : void {
		// Arrange
		this._ascList.add('foo');
		this._ascList.add('barbar');

		// Act
		this._ascList.add('foobarbar');

		// Assert
		Assert.areEqual(3, this._ascList.getLength());
		Assert.areEqual('foo', this._ascList.getAt(0));
		Assert.areEqual('barbar', this._ascList.getAt(1));
		Assert.areEqual('foobarbar', this._ascList.getAt(2));
	}

	SortedListAscGetAtTest() : void {
		// Arrange
		var outcome : string;

		this._ascList.add('foo');
		this._ascList.add('bar');

		// Act
		outcome = this._ascList.getAt(1);

		// Assert
		Assert.areEqual('bar', outcome);
	}

	SortedListAscGetAtNegativeIndexTest() : void {
		// Arrange
		var f : Action0;

		// Act
		f = () => {
			this._ascList.getAt(-89);
		};

		// Assert
		Assert.throws(f);
	}

	SortedListAscGetAtUnboundIndexTest() : void {
		// Arrange
		var f : Action0;

		this._ascList.add('foo');
		this._ascList.add('bar');

		// Act
		f = () => {
			this._ascList.getAt(45);
		};

		// Assert
		Assert.throws(f);
	}

	SortedListAscGetLengthTest() : void {
		// Arrange
		var outcome : number;

		this._ascList.add('foo');
		this._ascList.add('bar');

		// Act
		outcome = this._ascList.getLength();

		// Assert
		Assert.areEqual(2, outcome);
	}

	SortedListAscRemoveTest() : void {
		// Arrange
		this._ascList.add('foo');
		this._ascList.add('bar');
		this._ascList.add('foobar');

		// Act
		this._ascList.remove('bar');

		// Assert
		Assert.areEqual(2, this._ascList.getLength());
		Assert.areEqual('foo', this._ascList.getAt(0));
		Assert.areEqual('foobar', this._ascList.getAt(1));
	}

	SortedListAscRemoveFirstElementTest() : void {
		// Arrange
		this._ascList.add('foo');
		this._ascList.add('bar');
		this._ascList.add('foobar');

		// Act
		this._ascList.remove('foo');

		// Assert
		Assert.areEqual(2, this._ascList.getLength());
		Assert.areEqual('bar', this._ascList.getAt(0));
		Assert.areEqual('foobar', this._ascList.getAt(1));
	}

	SortedListAscRemoveNoElementTest() : void {
		// Arrange
		this._ascList.add('foo');
		this._ascList.add('bar');

		// Act
		this._ascList.remove('foobar');

		// Assert
		Assert.areEqual(2, this._ascList.getLength());
		Assert.areEqual('foo', this._ascList.getAt(0));
		Assert.areEqual('bar', this._ascList.getAt(1));
	}

	SortedListAscRemoveAtTest() : void {
		// Arrange
		this._ascList.add('foobar');
		this._ascList.add('bar');
		this._ascList.add('foo');

		// Act
		this._ascList.removeAt(1);

		// Assert
		Assert.areEqual(2, this._ascList.getLength());
		Assert.areEqual('bar', this._ascList.getAt(0));
		Assert.areEqual('foobar', this._ascList.getAt(1));
	}

	SortedListAscRemoveAtHeadTest() : void {
		// Arrange
		this._ascList.add('foo');
		this._ascList.add('foobar');
		this._ascList.add('bar');

		// Act
		this._ascList.removeAt(0);

		// Assert
		Assert.areEqual(2, this._ascList.getLength());
		Assert.areEqual('bar', this._ascList.getAt(0));
		Assert.areEqual('foobar', this._ascList.getAt(1));
	}

	SortedListAscRemoveAtNegativeIndexTest() : void {
		// Arrange
		var f : Action0;

		// Act
		f = () => this._ascList.removeAt(-56);

		// Assert
		Assert.throws(f);
	}

	SortedListAscRemoveAtUnboundIndexTest() : void {
		// Arrange
		var f : Action0;

		this._ascList.add('foobar');

		// Act
		f = () => this._ascList.removeAt(1);

		// Assert
		Assert.throws(f);
	}

	SortedListAscRemoveIfTest() : void {
		// Arrange
		this._ascList.add('foo');
		this._ascList.add('f');
		this._ascList.add('bar');

		// Act
		this._ascList.removeIf(x => x.length === 3);

		// Assert
		Assert.areEqual(1, this._ascList.getLength());
		Assert.areEqual('f', this._ascList.getAt(0));
	}

	SortedListAscRemoveIfFirstElementTest() : void {
		// Arrange
		this._ascList.add('foo');
		this._ascList.add('foobar');
		this._ascList.add('bar');

		// Act
		this._ascList.removeIf(x => x.length === 3);

		// Assert
		Assert.areEqual(1, this._ascList.getLength());
		Assert.areEqual('foobar', this._ascList.getAt(0));
	}

	SortedListAscRemoveIgnoreTest() : void {
		// Arrange
		this._ascList.add('foo');
		this._ascList.add('foobar');
		this._ascList.add('foobarbar');

		// Act
		this._ascList.removeIf(x => x.length < 4 || x.length > 7);

		// Assert
		Assert.areEqual(1, this._ascList.getLength());
		Assert.areEqual('foobar', this._ascList.getAt(0));
	}

	//region Ascending ISortableCollection

	SortedListAscOrderByTest() : void {
		// Arrange
		var outcome : SortedList<string, string>;

		this._ascList.add('foobar');
		this._ascList.add('foo');
		this._ascList.add('bar');

		// Act
		outcome = this._toSortedList<string, string>(this._ascList.orderBy(x => x));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('bar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('foobar', outcome.getAt(2));
	}

	SortedListAscOrderByDescTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		this._ascList.add('foobar');
		this._ascList.add('foo');
		this._ascList.add('bar');

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.orderByDesc(x => x.length));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foobar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('bar', outcome.getAt(2));
	}

	SortedListAscReverseTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		this._ascList.add('foobar');
		this._ascList.add('foo');
		this._ascList.add('bar');

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.reverse());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foobar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('bar', outcome.getAt(2));
	}

	//endregion Ascending ISortableCollection

	//region Ascending ICollection

	SortedListAscAverageTest() : void {
		// Arrange
		var outcome : number;

		this._ascList.add('foo');
		this._ascList.add('bar');
		this._ascList.add('foobar');

		// Act
		outcome = this._ascList.average(x => x.length);

		// Assert
		Assert.areEqual(4, outcome);
	}

	SortedListAscExistsTest() : void {
		// Arrange
		var outcome : boolean;

		this._ascList.add('foo');
		this._ascList.add('bar');
		this._ascList.add('foobar');

		// Act
		outcome = this._ascList.exists(x => x.length > 5);

		// Assert
		Assert.isTrue(outcome);
	}

	SortedListAscExistsFalseTest() : void {
		// Arrange
		var outcome : boolean;

		this._ascList.add('foo');
		this._ascList.add('bar');
		this._ascList.add('barbar');

		// Act
		outcome = this._ascList.exists(x => x.length > 10);

		// Assert
		Assert.isFalse(outcome);
	}

	SortedListAscForEachTest() : void {
		// Arrange
		var acc : Array<string>;

		acc = new Array<string>();
		this._ascList.add('foobar');
		this._ascList.add('bar');
		this._ascList.add('foo');

		// Act
		this._ascList.forEach(x => acc.push(x));

		// Assert
		Assert.areEqual(3, acc.length);
		Assert.areEqual('bar', acc[0]);
		Assert.areEqual('foo', acc[1]);
		Assert.areEqual('foobar', acc[2]);
	}

	SortedListAscFindTest() : void {
		// Arrange
		var outcome : string;

		this._ascList.add('foobar');
		this._ascList.add('foo');
		this._ascList.add('bar');

		// Act
		outcome = this._ascList.find(x => x.length > 4);

		// Assert
		Assert.areEqual('foobar', outcome);
	}

	SortedListAscFindNoResultTest() : void {
		// Arrange
		var outcome : string;

		this._ascList.add('foobar');
		this._ascList.add('foo');

		// Act
		outcome = this._ascList.find(x => x.length < 3);

		// Assert
		Assert.isNull(outcome);
	}

	SortedListAscIntersectTest() : void {
		// Arrange
		var source : SortedList<string, number>, outcome : SortedList<string, number>;

		source = new SortedList<string, number>(x => x.length);
		source.add('bar');
		source.add('foo');
		source.add('foobar');

		this._ascList.add('bar');
		this._ascList.add('foobar');
		this._ascList.add('barbar');

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(2, outcome.getLength());
		Assert.areEqual('bar', outcome.getAt(0));
		Assert.areEqual('foobar', outcome.getAt(1));
	}

	SortedListAscIntersectEmptySourceTest() : void {
		// Arrange
		var source : SortedList<string, number>, outcome : SortedList<string, number>;

		source = new SortedList<string, number>(x => x.length);
		source.add('foo');
		source.add('foobar');
		source.add('bar');

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	SortedListAscIntersectEmptyTargetTest() : void {
		// Arrange
		var source : SortedList<string, number>, outcome : SortedList<string, number>;

		source = new SortedList<string, number>(x => x.length);
		this._ascList.add('barbar');
		this._ascList.add('foobar');
		this._ascList.add('foo');

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	SortedListAscMapTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		this._ascList.add('foobar');
		this._ascList.add('bar');
		this._ascList.add('foo');

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.map(x => x + x));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('barbar', outcome.getAt(0));
		Assert.areEqual('foofoo', outcome.getAt(1));
		Assert.areEqual('foobarfoobar', outcome.getAt(2));
	}

	SortedListAscMaxTest() : void {
		// Arrange
		var outcome : string;

		this._ascList.add('foo');
		this._ascList.add('foobar');

		// Act
		outcome = this._ascList.max(x => x.length);

		// Assert
		Assert.areEqual('foobar', outcome);
	}

	SortedListAscMinTest() : void {
		// Arrange
		var outcome : string;

		this._ascList.add('foobar');
		this._ascList.add('foo');

		// Act
		outcome = this._ascList.min(x => -x.length);

		// Assert
		Assert.areEqual('foobar', outcome);
	}

	SortedListAscSelectTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		this._ascList.add('foo');
		this._ascList.add('foobar');
		this._ascList.add('bar');

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.select(x => x.length === 3));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(2, outcome.getLength());
		Assert.areEqual('foo', outcome.getAt(0));
		Assert.areEqual('bar', outcome.getAt(1));
	}

	SortedListAscSumTest() : void {
		// Arrange
		var outcome : number;

		this._ascList.add('foo');
		this._ascList.add('foobar');

		// Act
		outcome = this._ascList.sum(x => x.length);

		// Assert
		Assert.areEqual(9, outcome);
	}

	SortedListAscToArrayTest() : void {
		// Arrange
		var outcome : Array<string>;

		this._ascList.add('foobar');
		this._ascList.add('foo');
		this._ascList.add('bar');

		// Act
		outcome = this._ascList.toArray();

		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.length);
		Assert.areEqual('foo', outcome[0]);
		Assert.areEqual('bar', outcome[1]);
		Assert.areEqual('foobar', outcome[2]);
	}

	SortedListAscToDictionaryTest() : void {
		// Arrange
		var outcome : IDictionary<string, number>;

		this._ascList.add('foo');
		this._ascList.add('bar');
		this._ascList.add('foobar');

		// Act
		outcome = this._ascList.toDictionary(
			(x) => { return x; },
			(x) => { return x.length; }
		);

		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(3, outcome.get('foo'));
		Assert.areEqual(3, outcome.get('bar'));
		Assert.areEqual(6, outcome.get('foobar'));
	}

	SortedListAscToListTest() : void {
		// Arrange
		var outcome : IList<string>;

		this._ascList.add('foo');
		this._ascList.add('foobar');
		this._ascList.add('bar');

		// Act
		outcome = this._ascList.toList();

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foo', outcome.getAt(0));
		Assert.areEqual('bar', outcome.getAt(1));
		Assert.areEqual('foobar', outcome.getAt(2));
	}

	SortedListAscUnionTest() : void {
		// Arrange
		var source : Mocks.Collection<string>;
		var outcome : SortedList<string, number>;

		source = new Mocks.Collection<string>();
		source.ForEachOutcome(['foobar', 'foo', 'bar']);

		this._ascList.add('barbar');
		this._ascList.add('bar');
		this._ascList.add('foo');

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(4, outcome.getLength());
		Assert.areEqual('bar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('barbar', outcome.getAt(2));
		Assert.areEqual('foobar', outcome.getAt(3));
	}

	SortedListAscUnionEmptySourceTest() : void {
		// Arrange
		var source : Mocks.Collection<string>;
		var outcome : SortedList<string, number>;

		source = new Mocks.Collection<string>();
		source.ForEachOutcome(['foobar', 'foo', 'bar']);

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foo', outcome.getAt(0));
		Assert.areEqual('bar', outcome.getAt(1));
		Assert.areEqual('foobar', outcome.getAt(2));
	}

	SortedListAscUnionEmptyTargetTest() : void {
		// Arrange
		var source : Mocks.Collection<string>;
		var outcome : SortedList<string, number>;

		source = new Mocks.Collection<string>();
		source.ForEachOutcome([]);

		this._ascList.add('foobar');
		this._ascList.add('bar');
		this._ascList.add('foo');

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('bar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('foobar', outcome.getAt(2));
	}

	SortedListAscUniqTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		this._ascList.add('foo');
		this._ascList.add('bar');
		this._ascList.add('foobar');
		this._ascList.add('bar');
		this._ascList.add('foobar');

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.uniq());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foo', outcome.getAt(0));
		Assert.areEqual('bar', outcome.getAt(1));
		Assert.areEqual('foobar', outcome.getAt(2));
	}

	SortedListAscUniqEmptyTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		// Act
		outcome = this._toSortedList<string, number>(this._ascList.uniq());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._ascList, outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	//endregion Ascending ICollection

	//endregion Ascending SortedList

	//region Descending SortedList

	SortedListDescConstructorTest() : void {
		// Arrange
		var list : SortedList<number, number>;

		// Act
		list = new SortedList<number, number>(x => x);

		// Assert
		Assert.isNotNull(list);
		Assert.areEqual(0, list.getLength());
	}

	SortedListDescAddTest() : void {
		// Arrange

		// Act
		this._descList.add('bar');
		this._descList.add('foobar');

		// Assert
		Assert.areEqual(2, this._descList.getLength());
		Assert.areEqual('foobar', this._descList.getAt(0));
		Assert.areEqual('bar', this._descList.getAt(1));
	}

	SortedListDescAddSingleTest() : void {
		// Arrange

		// Act
		this._descList.add('foo');

		// Assert
		Assert.areEqual(1, this._descList.getLength());
		Assert.areEqual('foo', this._descList.getAt(0));
	}

	SortedListDescAddFirstElementTest() : void {
		// Arrange
		this._descList.add('bar');

		// Act
		this._descList.add('foobar');

		// Assert
		Assert.areEqual(2, this._descList.getLength());
		Assert.areEqual('foobar', this._descList.getAt(0));
		Assert.areEqual('bar', this._descList.getAt(1));
	}

	SortedListDescAddLastElementTest() : void {
		// Arrange
		this._descList.add('foobarbar');
		this._descList.add('barbar');

		// Act
		this._descList.add('foo');

		// Assert
		Assert.areEqual(3, this._descList.getLength());
		Assert.areEqual('foobarbar', this._descList.getAt(0));
		Assert.areEqual('barbar', this._descList.getAt(1));
		Assert.areEqual('foo', this._descList.getAt(2));
	}

	SortedListDescGetAtTest() : void {
		// Arrange
		var outcome : string;

		this._descList.add('foo');
		this._descList.add('bar');

		// Act
		outcome = this._descList.getAt(1);

		// Assert
		Assert.areEqual('bar', outcome);
	}

	SortedListDescGetAtNegativeIndexTest() : void {
		// Arrange
		var f : Action0;

		// Act
		f = () => {
			this._descList.getAt(-89);
		};

		// Assert
		Assert.throws(f);
	}

	SortedListDescGetAtUnboundIndexTest() : void {
		// Arrange
		var f : Action0;

		this._descList.add('foo');
		this._descList.add('bar');

		// Act
		f = () => {
			this._descList.getAt(45);
		};

		// Assert
		Assert.throws(f);
	}

	SortedListDescGetLengthTest() : void {
		// Arrange
		var outcome : number;

		this._descList.add('foo');
		this._descList.add('bar');

		// Act
		outcome = this._descList.getLength();

		// Assert
		Assert.areEqual(2, outcome);
	}

	SortedListDescRemoveTest() : void {
		// Arrange
		this._descList.add('foo');
		this._descList.add('bar');
		this._descList.add('foobar');

		// Act
		this._descList.remove('bar');

		// Assert
		Assert.areEqual(2, this._descList.getLength());
		Assert.areEqual('foobar', this._descList.getAt(0));
		Assert.areEqual('foo', this._descList.getAt(1));
	}

	SortedListDescRemoveFirstElementTest() : void {
		// Arrange
		this._descList.add('foo');
		this._descList.add('bar');
		this._descList.add('foobar');

		// Act
		this._descList.remove('foobar');

		// Assert
		Assert.areEqual(2, this._descList.getLength());
		Assert.areEqual('foo', this._descList.getAt(0));
		Assert.areEqual('bar', this._descList.getAt(1));
	}

	SortedListDescRemoveNoElementTest() : void {
		// Arrange
		this._descList.add('foo');
		this._descList.add('bar');

		// Act
		this._descList.remove('foobar');

		// Assert
		Assert.areEqual(2, this._descList.getLength());
		Assert.areEqual('foo', this._descList.getAt(0));
		Assert.areEqual('bar', this._descList.getAt(1));
	}

	SortedListDescRemoveAtTest() : void {
		// Arrange
		this._descList.add('foobar');
		this._descList.add('bar');
		this._descList.add('foo');

		// Act
		this._descList.removeAt(1);

		// Assert
		Assert.areEqual(2, this._descList.getLength());
		Assert.areEqual('foobar', this._descList.getAt(0));
		Assert.areEqual('foo', this._descList.getAt(1));
	}

	SortedListDescRemoveAtHeadTest() : void {
		// Arrange
		this._descList.add('foo');
		this._descList.add('bar');
		this._descList.add('foobar');

		// Act
		this._descList.removeAt(0);

		// Assert
		Assert.areEqual(2, this._descList.getLength());
		Assert.areEqual('foo', this._descList.getAt(0));
		Assert.areEqual('bar', this._descList.getAt(1));
	}

	SortedListDescRemoveAtNegativeIndexTest() : void {
		// Arrange
		var f : Action0;

		// Act
		f = () => this._descList.removeAt(-56);

		// Assert
		Assert.throws(f);
	}

	SortedListDescRemoveAtUnboundIndexTest() : void {
		// Arrange
		var f : Action0;

		this._descList.add('foobar');

		// Act
		f = () => this._descList.removeAt(1);

		// Assert
		Assert.throws(f);
	}

	SortedListDescRemoveIfTest() : void {
		// Arrange
		this._descList.add('foo');
		this._descList.add('f');
		this._descList.add('bar');

		// Act
		this._descList.removeIf(x => x.length === 3);

		// Assert
		Assert.areEqual(1, this._descList.getLength());
		Assert.areEqual('f', this._descList.getAt(0));
	}

	SortedListDescRemoveIfFirstElementTest() : void {
		// Arrange
		this._descList.add('foo');
		this._descList.add('foobar');
		this._descList.add('bar');

		// Act
		this._descList.removeIf(x => x.length > 3);

		// Assert
		Assert.areEqual(2, this._descList.getLength());
		Assert.areEqual('foo', this._descList.getAt(0));
		Assert.areEqual('bar', this._descList.getAt(1));
	}

	SortedListDescRemoveIgnoreTest() : void {
		// Arrange
		this._descList.add('foo');
		this._descList.add('foobar');
		this._descList.add('foobarbar');

		// Act
		this._descList.removeIf(x => x.length < 4 || x.length > 7);

		// Assert
		Assert.areEqual(1, this._descList.getLength());
		Assert.areEqual('foobar', this._descList.getAt(0));
	}

	//region Descending ISortableCollection

	SortedListDescOrderByTest() : void {
		// Arrange
		var outcome : SortedList<string, string>;

		this._descList.add('foo');
		this._descList.add('bar');
		this._descList.add('foobar');

		// Act
		outcome = this._toSortedList<string, string>(this._descList.orderBy(x => x));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('bar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('foobar', outcome.getAt(2));
	}

	SortedListDescOrderByDescTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		this._descList.add('foo');
		this._descList.add('bar');
		this._descList.add('foobar');

		// Act
		outcome = this._toSortedList<string, number>(this._descList.orderByDesc(x => x.length));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foobar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('bar', outcome.getAt(2));
	}

	SortedListDescReverseTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		this._descList.add('foo');
		this._descList.add('bar');
		this._descList.add('foobar');

		// Act
		outcome = this._toSortedList<string, number>(this._descList.reverse());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foo', outcome.getAt(0));
		Assert.areEqual('bar', outcome.getAt(1));
		Assert.areEqual('foobar', outcome.getAt(2));
	}

	//endregion Descending ISortableCollection

	//region Descending ICollection

	SortedListAverageTest() : void {
		// Arrange
		var outcome : number;

		this._descList.add('foo');
		this._descList.add('foobar');
		this._descList.add('bar');

		// Act
		outcome = this._descList.average(x => x.length);

		// Assert
		Assert.areEqual(4, outcome);
	}

	SortedListDescExistsTest() : void {
		// Arrange
		var outcome : boolean;

		this._descList.add('foo');
		this._descList.add('foobar');
		this._descList.add('foo');

		// Act
		outcome = this._descList.exists(x => x.length < 5);

		// Assert
		Assert.isTrue(outcome);
	}

	SortedListDescExistsFalseTest() : void {
		// Arrange
		var outcome : boolean;

		this._descList.add('foo');
		this._descList.add('foobar');
		this._descList.add('barbar');

		// Act
		outcome = this._descList.exists(x => x.length < 0);

		// Assert
		Assert.isFalse(outcome);
	}

	SortedListDescFindTest() : void {
		// Arrange
		var outcome : string;

		this._descList.add('foo');
		this._descList.add('bar');
		this._descList.add('foobar');

		// Act
		outcome = this._descList.find(x => x.length > 4);

		// Assert
		Assert.areEqual('foobar', outcome);
	}

	SortedListDescFindNoResultTest() : void {
		// Arrange
		var outcome : string;

		this._descList.add('foo');
		this._descList.add('foobar');

		// Act
		outcome = this._descList.find(x => x.length < 3);

		// Assert
		Assert.isNull(outcome);
	}

	SortedListDescForEachTest() : void {
		// Arrange
		var acc : Array<string>;

		acc = new Array<string>();
		this._descList.add('bar');
		this._descList.add('foo');
		this._descList.add('foobar');

		// Act
		this._descList.forEach(x => acc.push(x));

		// Assert
		Assert.areEqual(3, acc.length);
		Assert.areEqual('foobar', acc[0]);
		Assert.areEqual('bar', acc[1]);
		Assert.areEqual('foo', acc[2]);
	}

	SortedListDescIntersectTest() : void {
		// Arrange
		var source : SortedList<string, number>, outcome : SortedList<string, number>;

		source = new SortedList<string, number>(x => x.length, false);
		source.add('foo');
		source.add('foobar');
		source.add('barbar');

		this._descList.add('foobar');
		this._descList.add('bar');
		this._descList.add('foo');

		// Act
		outcome = this._toSortedList<string, number>(this._descList.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(2, outcome.getLength());
		Assert.areEqual('foobar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
	}

	SortedListDescIntersectEmptySourceTest() : void {
		// Arrange
		var source : SortedList<string, number>, outcome : SortedList<string, number>;

		source = new SortedList<string, number>(x => x.length, false);
		source.add('bar');
		source.add('foobar');
		source.add('foo');

		// Act
		outcome = this._toSortedList<string, number>(this._descList.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	SortedListDescIntersectEmptyTargetTest() : void {
		// Arrange
		var source : SortedList<string, number>, outcome : SortedList<string, number>;

		source = new SortedList<string, number>(x => x.length, false);
		this._descList.add('foo');
		this._descList.add('foobar');
		this._descList.add('bar');

		// Act
		outcome = this._toSortedList<string, number>(this._descList.intersect(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	SortedListDescMapTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		this._descList.add('bar');
		this._descList.add('foo');
		this._descList.add('foobar');

		// Act
		outcome = this._toSortedList<string, number>(this._descList.map(x => x + x));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foobarfoobar', outcome.getAt(0));
		Assert.areEqual('barbar', outcome.getAt(1));
		Assert.areEqual('foofoo', outcome.getAt(2));
	}

	SortedListDescMaxTest() : void {
		// Arrange
		var outcome : string;

		this._descList.add('foobar');
		this._descList.add('foo');

		// Act
		outcome = this._descList.max(x => x.length);

		// Assert
		Assert.areEqual('foobar', outcome);
	}

	SortedListDescMinTest() : void {
		// Arrange
		var outcome : string;

		this._descList.add('foo');
		this._descList.add('foobar');

		// Act
		outcome = this._descList.min(x => -x.length);

		// Assert
		Assert.areEqual('foobar', outcome);
	}

	SortedListDescSelectTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		this._descList.add('foo');
		this._descList.add('foobar');
		this._descList.add('bar');

		// Act
		outcome = this._toSortedList<string, number>(this._descList.select(x => x.length === 3));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(2, outcome.getLength());
		Assert.areEqual('foo', outcome.getAt(0));
		Assert.areEqual('bar', outcome.getAt(1));
	}

	SortedListDescSumTest() : void {
		// Arrange
		var outcome : number;

		this._descList.add('foobar');
		this._descList.add('foo');

		// Act
		outcome = this._descList.sum(x => x.length);

		// Assert
		Assert.areEqual(9, outcome);
	}

	SortedListDescToArrayTest() : void {
		// Arrange
		var outcome : Array<string>;

		this._descList.add('foo');
		this._descList.add('bar');
		this._descList.add('foobar');

		// Act
		outcome = this._descList.toArray();

		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.length);
		Assert.areEqual('foobar', outcome[0]);
		Assert.areEqual('foo', outcome[1]);
		Assert.areEqual('bar', outcome[2]);
	}

	SortedListDescToDictionaryTest() : void {
		// Arrange
		var outcome : IDictionary<string, number>;

		this._descList.add('foo');
		this._descList.add('foobar');
		this._descList.add('bar');

		// Act
		outcome = this._descList.toDictionary(
			(x) => { return x; },
			(x) => { return x.length; }
		);

		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(6, outcome.get('foobar'));
		Assert.areEqual(3, outcome.get('foo'));
		Assert.areEqual(3, outcome.get('bar'));
	}

	SortedListDescToListTest() : void {
		// Arrange
		var outcome : IList<string>;

		this._descList.add('foo');
		this._descList.add('bar');
		this._descList.add('foobar');

		// Act
		outcome = this._descList.toList();

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foobar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('bar', outcome.getAt(2));
	}

	SortedListDescUnionTest() : void {
		// Arrange
		var source : Mocks.Collection<string>;
		var outcome : SortedList<string, number>;

		source = new Mocks.Collection<string>();
		source.ForEachOutcome(['foo', 'bar', 'foobar']);

		this._descList.add('foo');
		this._descList.add('barbar');
		this._descList.add('foobar');

		// Act
		outcome = this._toSortedList<string, number>(this._descList.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(4, outcome.getLength());
		Assert.areEqual('barbar', outcome.getAt(0));
		Assert.areEqual('foobar', outcome.getAt(1));
		Assert.areEqual('foo', outcome.getAt(2));
		Assert.areEqual('bar', outcome.getAt(3));
	}

	SortedListDescUnionEmptySourceTest() : void {
		// Arrange
		var source : Mocks.Collection<string>;
		var outcome : SortedList<string, number>;

		source = new Mocks.Collection<string>();
		source.ForEachOutcome(['foo', 'bar', 'foobar']);

		// Act
		outcome = this._toSortedList<string, number>(this._descList.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(1, source.ForEachTimes());
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foobar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('bar', outcome.getAt(2));
	}

	SortedListDescUnionEmptyTargetTest() : void {
		// Arrange
		var source : Mocks.Collection<string>;
		var outcome : SortedList<string, number>;

		source = new Mocks.Collection<string>();
		source.ForEachOutcome([]);
		this._descList.add('foo');
		this._descList.add('foobar');
		this._descList.add('bar');

		// Act
		outcome = this._toSortedList<string, number>(this._descList.union(source));

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foobar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('bar', outcome.getAt(2));
	}

	SortedListDescUniqTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		this._descList.add('foo');
		this._descList.add('foobar');
		this._descList.add('foobar');
		this._descList.add('bar');
		this._descList.add('bar');

		// Act
		outcome = this._toSortedList<string, number>(this._descList.uniq());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foobar', outcome.getAt(0));
		Assert.areEqual('foo', outcome.getAt(1));
		Assert.areEqual('bar', outcome.getAt(2));
	}

	SortedListDescUniqEmptyTest() : void {
		// Arrange
		var outcome : SortedList<string, number>;

		// Act
		outcome = this._toSortedList<string, number>(this._descList.uniq());

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._descList, outcome);
		Assert.areEqual(0, outcome.getLength());
	}

	//endregion Descending ICollection

	//ednregion Descending SortedList
}
