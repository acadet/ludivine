/// <reference path="../../ref.ts" />

class Dictionary<K, V>
	implements
		IDictionary<K, V>,
		ICollection<KeyValuePair<K, V>, Dictionary<K, V>> {
	//region Fields

	private _content : Array<KeyValuePair<K, V>>;
	
	//endregion Fields
	
	//region Constructors

	constructor() {
		this._content = new Array<KeyValuePair<K, V>>();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	//region IDictionary

	add(key : K, value : V) : void {
		var size : number;

		size = this._content.length;

		for (var i = 0; i < size; i++) {
			var pair : KeyValuePair<K, V>;

			pair = this._content[i];
			if (pair.getKey() === key) {
				throw new CollectionException('Unable to add value: key already exists');
			}
		}

		this._content.push(new KeyValuePair<K, V>(key, value));
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

	select(selector : Func<KeyValuePair<K, V>, boolean>) : Dictionary<K, V> {
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

	forEach(action : Action<KeyValuePair<K, V>>) : void {
		var size : number;

		size = this._content.length;
		for (var i = 0; i < size; i++) {
			action(this._content[i]);
		}
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

	map(action : Func<KeyValuePair<K, V>, KeyValuePair<K, V>>) : Dictionary<K, V> {
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

	toArray() : Array<KeyValuePair<K, V>> {
		return this._content;
	}

	sum(getter : Func<KeyValuePair<K, V>, number>) : number {
		var acc : number;

		acc = 0;
		this.forEach(x => acc += getter(x));

		return acc;
	}

	min(getter : Func<KeyValuePair<K, V>, number>) : KeyValuePair<K, V> {
		var min : number;
		var e : KeyValuePair<K, V>;

		if (this.getSize() === 0) {
			return null;
		}

		e = this._content[0];
		min = getter(e);
		this.forEach(
			(x) => {
				var value : number;

				value = getter(x);
				if (value < min) {
					min = value;
					e = x;
				}
			}
		);

		return e;
	}

	max(getter : Func<KeyValuePair<K, V>, number>) : KeyValuePair<K, V> {
		var max : number;
		var e : KeyValuePair<K, V>;

		if (this.getSize() === 0) {
			return null;
		}

		e = this._content[0];
		max = getter(e);
		this.forEach(
			(x) => {
				var value : number;

				value = getter(x);
				if (value > max) {
					max = value;
					e = x;
				}
			}
		);

		return e;
	}

	//endregion ICollection
	
	//endregion Public Methods
	
	//endregion Methods
}
