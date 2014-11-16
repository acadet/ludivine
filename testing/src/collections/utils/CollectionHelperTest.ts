/// <reference path="../../../ref.ts" />

class CollectionHelperTest extends UnitTestClass {
	private _collection : Mocks.Collection<number>;

	setUp() : void {
		this._collection = new Mocks.Collection<number>();
	}

	tearDown() : void {
		this._collection = null;
	}

	CollectionHelperAverageTest() : void {
		// Arrange
		var outcome : number;

		this._collection.ForEachOutcome([10, 15, 20]);

		// Act
		outcome = CollectionUtils.CollectionHelper.average(this._collection, x => x + 5);

		// Assert
		Assert.areEqual(20, outcome);
	}

	CollectionHelperAverageEmptyTest() : void {
		// Arrange
		var outcome : number;

		this._collection.ForEachOutcome([]);

		// Act
		outcome = CollectionUtils.CollectionHelper.average(this._collection, x => x);

		// Assert
		Assert.areEqual(0, outcome);
	}

	CollectionHelperMaxTest() : void {
		// Arrange
		var outcome : number;

		this._collection.ForEachOutcome([34, -56, 23]);

		// Act
		outcome = CollectionUtils.CollectionHelper.max(this._collection, x => x * x);

		// Assert
		Assert.areEqual(-56, outcome);
	}

	CollectionHelperMaxEmptyTest() : void {
		// Arrange
		var outcome : number;

		this._collection.ForEachOutcome([]);

		// Act
		outcome = CollectionUtils.CollectionHelper.max(this._collection, x => x);

		// Assert
		Assert.isNull(outcome);
	}

	CollectionHelperMinTest() : void {
		// Arrange
		var outcome : number;

		this._collection.ForEachOutcome([-32, 21, 31]);

		// Act
		outcome = CollectionUtils.CollectionHelper.min(this._collection, x => x * x);

		// Assert
		Assert.areEqual(21, outcome);
	}

	CollectionHelperMinEmptyTest() : void {
		// Arrange
		var outcome : number;

		this._collection.ForEachOutcome([]);

		// Act
		outcome = CollectionUtils.CollectionHelper.min(this._collection, x => x);

		// Assert
		Assert.isNull(outcome);
	}

	CollectionHelperSumTest() : void {
		// Arrange
		var outcome : number;

		this._collection.ForEachOutcome([1, 2, 3]);

		// Act
		outcome = CollectionUtils.CollectionHelper.sum(this._collection, x => x * x);

		// Assert
		Assert.areEqual(1 + 4 + 9, outcome);
	}

	CollectionHelperSumEmptyTest() : void {
		// Arrange
		var outcome : number;

		this._collection.ForEachOutcome([]);

		// Act
		outcome = CollectionUtils.CollectionHelper.sum(this._collection, x => x);

		// Assert
		Assert.areEqual(0, outcome);
	}

	CollectionHelperToArrayTest() : void {
		// Arrange
		var outcome : Array<number>;

		this._collection.ForEachOutcome([12, 34, 45]);

		// Act
		outcome = CollectionUtils.CollectionHelper.toArray(this._collection);

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._collection, outcome);
		Assert.areEqual(3, outcome.length);
		Assert.areEqual(12, outcome[0]);
		Assert.areEqual(34, outcome[1]);
		Assert.areEqual(45, outcome[2]);
	}

	CollectionHelperToArrayEmptyTest() : void {
		// Arrange
		var outcome : Array<number>;

		this._collection.ForEachOutcome([]);

		// Act
		outcome = CollectionUtils.CollectionHelper.toArray(this._collection);

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._collection, outcome);
		Assert.areEqual(0, outcome.length);
	}

	CollectionHelperToDictionaryTest() : void {
		// Arrange
		var outcome : IDictionary<number, number>;

		this._collection.ForEachOutcome([21, 12, -67]);

		// Act
		outcome = CollectionUtils.CollectionHelper.toDictionary(
			this._collection,
			x => x,
			x => x * x
		);

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._collection, outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual(21 * 21, outcome.get(21));
		Assert.areEqual(12 * 12, outcome.get(12));
		Assert.areEqual(-67 * -67, outcome.get(-67));
	}

	CollectionHelperToDictionaryEmptyTest() : void {
		// Arrange
		var outcome : IDictionary<number, string>;

		this._collection.ForEachOutcome([]);

		// Act
		outcome = CollectionUtils.CollectionHelper.toDictionary(
			this._collection,
			x => x * x,
			x => 'foo'
		);

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._collection, outcome);
		Assert.areEqual(0, outcome.getSize());
	}

	CollectionHelperToListTest() : void {
		// Arrange
		var outcome : IList<number>;

		this._collection.ForEachOutcome([23, 45, 67]);

		// Act
		outcome = CollectionUtils.CollectionHelper.toList(this._collection);

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._collection, outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual(23, outcome.getAt(0));
		Assert.areEqual(45, outcome.getAt(1));
		Assert.areEqual(67, outcome.getAt(2));
	}

	CollectionHelperToListEmptyTest() : void {
		// Arrange
		var outcome : IList<number>;

		this._collection.ForEachOutcome([]);

		// Act
		outcome = CollectionUtils.CollectionHelper.toList(this._collection);

		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._collection, outcome);
		Assert.areEqual(0, outcome.getLength());
	}
}
