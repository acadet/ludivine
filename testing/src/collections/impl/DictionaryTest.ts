/// <reference path="../../../ref.ts" />

class DictionaryTest extends UnitTestClass {
	private _dict : Dictionary<string, number>;

	private _toDictionary<K, V>(source : ICollection<KeyValuePair<K, V>>) : Dictionary<K, V> {
		return <Dictionary<K, V>>source;
	}

	setUp() : void {
		this._dict = new Dictionary<string, number>();
	}

	tearDown() : void {
		this._dict = null;
	}

	DictionaryConstructorTest() : void {
		// Arrange
		var dict : Dictionary<number, string>;
	
		// Act
		dict = new Dictionary<number, string>();
	
		// Assert
		Assert.isNotNull(dict);
		Assert.areEqual(0, dict.getSize());
	}

	DictionaryConstructorWithSourceTest() : void {
		// Arrange
		var dict : Dictionary<number, string>;
		var source : ArrayList<KeyValuePair<number, string>>;

		source = new ArrayList<KeyValuePair<number, string>>();
		source.add(new KeyValuePair<number, string>(34, 'foo'));
		source.add(new KeyValuePair<number, string>(56, 'bar'));
		source.add(new KeyValuePair<number, string>(67, 'foobar'));
	
		// Act
		dict = new Dictionary<number, string>(source);
	
		// Assert
		Assert.isNotNull(dict);
		Assert.areEqual(3, dict.getSize());
		Assert.areEqual('foo', dict.get(34));
		Assert.areEqual('bar', dict.get(56));
		Assert.areEqual('foobar', dict.get(67));
	}

	//region IDictionary

	DictionaryAddTest() : void {
		// Arrange
	
		// Act
		this._dict.add('foo', 45);
		this._dict.add('bar', 35);
	
		// Assert
		Assert.areEqual(2, this._dict.getSize());
		Assert.areEqual(45, this._dict.get('foo'));
		Assert.areEqual(35, this._dict.get('bar'));
	}

	DictionaryAddExistingKeyTest() : void {
		// Arrange
		var f : Action0;

		this._dict.add('foo', 45);
	
		// Act
		f = () => this._dict.add('foo', 45);
	
		// Assert
		Assert.throws(f);
	}

	DictionaryGetTest() : void {
		// Arrange
		var outcome : number;

		this._dict.add('foo', 45);
	
		// Act
		outcome = this._dict.get('foo');
	
		// Assert
		Assert.areEqual(45, outcome);
	}

	DictionaryGetNoValueTest() : void {
		// Arrange
		var f : Action0;
	
		// Act
		f = () => this._dict.get('foo');
	
		// Assert
		Assert.throws(f);
	}

	DictionaryGetSizeTest() : void {
		// Arrange
		var outcome : number;

		this._dict.add('foo', 45);
		this._dict.add('bar', 34);
	
		// Act
		outcome = this._dict.getSize();
	
		// Assert
		Assert.areEqual(2, outcome);
	}

	DictionaryHasKeyTest() : void {
		// Arrange
		var outcome : boolean;

		this._dict.add('foo', 45);
		this._dict.add('bar', 99);
	
		// Act
		outcome = this._dict.hasKey('foo');
	
		// Assert
		Assert.isTrue(outcome);
	}

	DictionaryHasKeyFalseTest() : void {
		// Arrange
		var outcome : boolean;

		this._dict.add('foo', 45),
		this._dict.add('bar', 56);
	
		// Act
		outcome = this._dict.hasKey('barbar');
	
		// Assert
		Assert.isFalse(outcome);
	}

	DictionaryRemoveTest() : void {
		// Arrange
		this._dict.add('foo', 45);
		this._dict.add('bar', 34);
		this._dict.add('foobar', 23);
	
		// Act
		this._dict.remove('bar');
	
		// Assert
		Assert.areEqual(2, this._dict.getSize());
		Assert.areEqual(45, this._dict.get('foo'));
		Assert.areEqual(23, this._dict.get('foobar'));
		Assert.throws(() => this._dict.get('bar'));
	}

	DictionaryRemoveNoKeyTest() : void {
		// Arrange
		var f : Action0;

		this._dict.add('foo', 45);
	
		// Act
		f = () => this._dict.remove('bar');

		// Assert
		Assert.throws(f);
	}

	DictionaryRemoveIfTest() : void {
		// Arrange
		this._dict.add('foo', 34);
		this._dict.add('bar', 23);
		this._dict.add('foobar', 99);
	
		// Act
		this._dict.removeIf(x => x.getValue() > 30);
	
		// Assert
		Assert.areEqual(1, this._dict.getSize());
		Assert.areEqual(23, this._dict.get('bar'));
		Assert.throws(() => this._dict.get('foo'));
		Assert.throws(() => this._dict.get('foobar'));
	}

	//endregion IDictionary

	//region ICollection

	DictionaryFindTest() : void {
		// Arrange
		var outcome : KeyValuePair<string, number>;

		this._dict.add('foo', 45);
		this._dict.add('bar', 34);
	
		// Act
		outcome = this._dict.find(x => x.getKey() === 'bar');
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual('bar', outcome.getKey());
		Assert.areEqual(34, outcome.getValue());
	}

	DictionaryFindNoResultTest() : void {
		// Arrange
		var outcome : KeyValuePair<string, number>;

		this._dict.add('foo', 34);
		this._dict.add('bar', 25);
	
		// Act
		outcome = this._dict.find(x => x.getValue() > 40);
	
		// Assert
		Assert.isNull(outcome);
	}

	DictionaryForEachTest() : void {
		// Arrange
		var acc : number;

		acc = 0;
		this._dict.add('a', 1);
		this._dict.add('b', 2);
		this._dict.add('c', 3);
	
		// Act
		this._dict.forEach(x => acc += x.getValue());
	
		// Assert
		Assert.areEqual(6, acc);
	}

	DictionaryMapTest() : void {
		// Arrange
		var outcome : Dictionary<string, number>;

		this._dict.add('foo', 45);
		this._dict.add('bar', 35);
		this._dict.add('foobar', 23);
	
		// Act
		outcome = this._toDictionary(this._dict.map(
			(pair) => {
				pair.setValue(pair.getValue() * pair.getValue());
				return pair;
			}
		));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._dict, outcome);
		Assert.areEqual(45 * 45, outcome.get('foo'));
		Assert.areEqual(35 * 35, outcome.get('bar'));
		Assert.areEqual(23 * 23, outcome.get('foobar'));
	}

	DictionaryMaxTest() : void {
		// Arrange
		var outcome : KeyValuePair<string, number>;

		this._dict.add('foo', 45);
		this._dict.add('bar', 99);
		this._dict.add('foobar', 23);
	
		// Act
		outcome = this._dict.max(x => x.getValue());
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual('bar', outcome.getKey());
		Assert.areEqual(99, outcome.getValue());
	}

	DictionaryMaxEmptyTest() : void {
		// Arrange
		var outcome : KeyValuePair<string, number>;
	
		// Act
		outcome = this._dict.max(x => x.getKey().length * 2);
	
		// Assert
		Assert.isNull(outcome);
	}

	DictionaryMinTest() : void {
		// Arrange
		var outcome : KeyValuePair<string, number>;

		this._dict.add('foo', 45);
		this._dict.add('bar', 32);
		this._dict.add('foobar', 99);
	
		// Act
		outcome = this._dict.min(x => x.getValue());
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual('bar', outcome.getKey());
		Assert.areEqual(32, outcome.getValue());
	}

	DictionaryMinEmptyTest() : void {
		// Arrange
		var outcome : KeyValuePair<string, number>;
	
		// Act
		outcome = this._dict.min(x => x.getKey().length);
	
		// Assert
		Assert.isNull(outcome);
	}

	DictionarySelectTest() : void {
		// Arrange
		var outcome : Dictionary<string, number>;

		this._dict.add('foo', 34);
		this._dict.add('bar', 32);
		this._dict.add('foobar', 78);
	
		// Act
		outcome = this._toDictionary(this._dict.select(x => x.getKey().length < 5));
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._dict, outcome);
		Assert.areEqual(2, outcome.getSize());
		Assert.areEqual(34, outcome.get('foo'));
		Assert.areEqual(32, outcome.get('bar'));
		Assert.throws(() => outcome.get('foobar'));
	}

	DictionarySumTest() : void {
		// Arrange
		var outcome : number;

		this._dict.add('foo', 32);
		this._dict.add('bar', 98);
	
		// Act
		outcome = this._dict.sum(x => x.getKey().length);
	
		// Assert
		Assert.areEqual(6, outcome);
	}

	DictionaryToArrayTest() : void {
		// Arrange
		var outcome : Array<KeyValuePair<string, number>>;

		this._dict.add('foo', 35);
		this._dict.add('bar', 32);
	
		// Act
		outcome = this._dict.toArray();
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(2, outcome.length);
		Assert.areEqual('foo', outcome[0].getKey());
		Assert.areEqual(35, outcome[0].getValue());
		Assert.areEqual('bar', outcome[1].getKey());
		Assert.areEqual(32, outcome[1].getValue());
	}

	DictionaryToDictionaryTest() : void {
		// Arrange
		var outcome : IDictionary<number, string>;

		this._dict.add('foo', 45);
		this._dict.add('bar', 34);
		this._dict.add('foobar', 23);
	
		// Act
		outcome = this._dict.toDictionary(
			(x) => { return x.getValue(); },
			(x) => { return x.getKey(); }
		);
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areNotEqual(this._dict, outcome);
		Assert.areEqual(3, outcome.getSize());
		Assert.areEqual('foo', outcome.get(45));
		Assert.areEqual('bar', outcome.get(34));
		Assert.areEqual('foobar', outcome.get(23));
	}

	DictionaryToListTest() : void {
		// Arrange
		var outcome : IList<KeyValuePair<string, number>>;

		this._dict.add('foo', 45);
		this._dict.add('bar', 23);
		this._dict.add('foobar', 12);
	
		// Act
		outcome = this._dict.toList();
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(3, outcome.getLength());
		Assert.areEqual('foo', outcome.getAt(0).getKey());
		Assert.areEqual(45, outcome.getAt(0).getValue());
		Assert.areEqual('bar', outcome.getAt(1).getKey());
		Assert.areEqual(23, outcome.getAt(1).getValue());
		Assert.areEqual('foobar', outcome.getAt(2).getKey());
		Assert.areEqual(12, outcome.getAt(2).getValue());
	}

	//endregion ICollection
}
