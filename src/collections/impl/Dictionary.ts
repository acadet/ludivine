/// <reference path="../../ref.ts" />

/**
 * @class Dictionary
 * @brief Implementation of IDictionary
 */
class Dictionary<K, V> implements IDictionary<K, V> {
	//region Fields

	/**
	 * Inner content
	 */
	private _content : Array<KeyValuePair<K, V>>;
	
	//endregion Fields
	
	//region Constructors

	/**
	 * Builds new dictionary
	 * @param {ICollection<KeyValuePair<K, V>>} source Optional data source
	 */
	constructor(source? : ICollection<KeyValuePair<K, V>>) {
		this._content = new Array<KeyValuePair<K, V>>();

		if (source !== null && source !== undefined) {
			source.forEach(x => this.add(x.getKey(), x.getValue()));
		}
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	//region IDictionary

	add(key : K, value : V) : void {
		if (this.hasKey(key)) {
			throw new CollectionException('Unable to add value: key already exists');
		} else {
			this._content.push(new KeyValuePair<K, V>(key, value));
		}
	}

	get(key : K) : V {
		var size : number;

		size = this._content.length;

		for (var i = 0; i < size; i++) {
			var pair : KeyValuePair<K, V>;

			pair = this._content[i];
			if (pair.getKey() === key) {
				return pair.getValue();
			}
		}

		throw new CollectionException('No value found for provided key');
	}

	getSize() : number {
		return this._content.length;
	}

	hasKey(key : K) : boolean {
		var size : number;

		size = this._content.length;
		for (var i = 0; i < size; i++) {
			var pair : KeyValuePair<K, V>;

			pair = this._content[i];
			if (pair.getKey() === key) {
				return true;
			}
		}

		return false;
	}

	remove(key : K) : void {
		var size : number;
		var a : Array<KeyValuePair<K, V>>;

		a = new Array<KeyValuePair<K, V>>();
		size = this._content.length;

		for (var i = 0; i < size; i++) {
			var pair : KeyValuePair<K, V>;

			pair = this._content[i];
			if (pair.getKey() !== key) {
				a.push(pair);
			}
		}

		if (a.length === size) {
			// No element has been removed
			throw new CollectionException('Unable to remove pair: key does not exist');
		}

		this._content = a;
	}

	removeIf(func : Func<KeyValuePair<K, V>, boolean>) : void {
		var size : number;
		var a : Array<KeyValuePair<K, V>>;

		a = new Array<KeyValuePair<K, V>>();
		size = this._content.length;

		for (var i = 0; i < size; i++) {
			var pair : KeyValuePair<K, V>;

			pair = this._content[i];
			if (!func(pair)) {
				a.push(pair);
			}
		}

		this._content = a;
	}

	//endregion IDictionary

	//region ICollection

	average(getter : Func<KeyValuePair<K, V>, number>) : number {
		return CollectionUtils.CollectionHelper.average(this, getter);
	}

	exists(selector : Func<KeyValuePair<K, V>, boolean>) : boolean {
		return this.find(selector) !== null;
	}

	find(selector : Func<KeyValuePair<K, V>, boolean>) : KeyValuePair<K, V> {
		var size : number;

		size = this._content.length;
		for (var i = 0; i < size; i++) {
			var pair : KeyValuePair<K, V>;

			pair = this._content[i];
			if (selector(pair)) {
				return pair;
			}
		}

		return null;
	}

	forEach(action : Action<KeyValuePair<K, V>>) : void {
		var size : number;

		size = this._content.length;
		for (var i = 0; i < size; i++) {
			action(this._content[i]);
		}
	}

	intersect(collection : ICollection<KeyValuePair<K, V>>) : ICollection<KeyValuePair<K, V>> {
		var outcome : Dictionary<K, V>;

		outcome = new Dictionary<K, V>();
		this.forEach(
			(x) => {
				if (collection.exists(e => (e.getKey() === x.getKey()) && (e.getValue() === x.getValue()))) {
					outcome.add(x.getKey(), x.getValue());
				}
			}
		);

		return outcome;
	}

	map(action : Func<KeyValuePair<K, V>, KeyValuePair<K, V>>) : ICollection<KeyValuePair<K, V>> {
		var outcome : Dictionary<K, V>;

		outcome = new Dictionary<K, V>();
		this.forEach(
			(pair) => {
				var result : KeyValuePair<K, V>;

				result = action(pair);
				outcome.add(result.getKey(), result.getValue());
			}
		);

		return outcome;
	}

	max(getter : Func<KeyValuePair<K, V>, number>) : KeyValuePair<K, V> {
		return CollectionUtils.CollectionHelper.max(this, getter);
	}

	min(getter : Func<KeyValuePair<K, V>, number>) : KeyValuePair<K, V> {
		return CollectionUtils.CollectionHelper.min(this, getter);
	}

	select(selector : Func<KeyValuePair<K, V>, boolean>) : ICollection<KeyValuePair<K, V>> {
		var outcome : Dictionary<K, V>;

		outcome = new Dictionary<K, V>();
		this.forEach(
			(pair) => {
				if (selector(pair)) {
					outcome.add(pair.getKey(), pair.getValue());
				}
			}
		);

		return outcome;
	}

	sum(getter : Func<KeyValuePair<K, V>, number>) : number {
		return CollectionUtils.CollectionHelper.sum(this, getter);
	}

	toArray() : Array<KeyValuePair<K, V>> {
		return CollectionUtils.CollectionHelper.toArray(this);
	}

	toDictionary<A, B>(
		keyGetter : Func<KeyValuePair<K, V>, A>,
		valueGetter : Func<KeyValuePair<K, V>, B>) : IDictionary<A, B> {
		return CollectionUtils.CollectionHelper.toDictionary(this, keyGetter, valueGetter);
	}

	/**
	 * Reproduces collection as a list
	 * @return {IList<T>} Outcome IList
	 */
	toList() : IList<KeyValuePair<K, V>> {
		return new ArrayList<KeyValuePair<K, V>>(this);
	}

	union(collection : ICollection<KeyValuePair<K, V>>) : ICollection<KeyValuePair<K, V>> {
		var outcome : Dictionary<K, V>;

		outcome = new Dictionary<K, V>(this);
		collection.forEach(
			(x) => {
				if (!this.exists(e => (e.getKey() === x.getKey()) && (e.getValue() === x.getValue()))) {
					outcome.add(x.getKey(), x.getValue());
				}
			}
		);

		return outcome;
	}

	uniq() : ICollection<KeyValuePair<K, V>> {
		return new Dictionary<K, V>(this);
	}

	//endregion ICollection
	
	//endregion Public Methods
	
	//endregion Methods
}
