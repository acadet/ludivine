/// <reference path="../../ref.ts" />

class ArrayList<T>
	implements IList<T>, ISortableCollection<T, ArrayList<T>> {
	//region Fields

	private _content : Array<T>;
	
	//endregion Fields
	
	//region Constructors

	constructor() {
		this._content = new Array<T>();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	//region IList

	add(value : T) : void {
		this._content.push(value);
	}

	getAt(index : number) : T {
		if (index < 0 || index >= this._content.length) {
			throw new CollectionException('Unbound index');
		}

		return this._content[index];
	}

	getLength() : number {
		return this._content.length;
	}

	insertAt(index : number, value : T) : void {
		if (index < 0) {
			throw new CollectionException('Unbound index');
		}

		if (index >= this._content.length) {
			this.add(value);
		} else {
			var tmp : T;

			tmp = this._content[index];
			this._content[index] = value;

			this.insertAt(index + 1, tmp);
		}
	}

	remove(value : T) : void {
		var a : Array<T>;
		var size : number;
		var done : boolean;

		size = this.getLength();

		if (size === 0) {
			return;
		}

		a = new Array<T>();
		done = false;

		for (var i = 0; i < size; i++) {
			var e : T;

			e = this._content[i];

			if (e !== value) {
				a.push(e);
			} else {
				if (done) {
					a.push(e);
				} else {
					done = true;
				}
			}
		}

		this._content = a;
	}

	removeAt(index : number) : void {
		var size : number;
		var a : Array<T>;

		size = this.getLength();

		if (index < 0 || index >= size) {
			throw new CollectionException('Unbound index');
		}

		a = new Array<T>();
		for (var i = 0; i < size; i++) {
			if (i !== index) {
				a.push(this.getAt(i));
			}
		}

		this._content = a;
	}

	removeIf(func : Func<T, boolean>) : void {
		var a : Array<T>;
		var size : number;

		size = this.getLength();

		if (size === 0) {
			return;
		}

		a = new Array<T>();

		for (var i = 0; i < size; i++) {
			var e : T;

			e = this._content[i];

			if (!func(e)) {
				a.push(e);
			}
		}

		this._content = a;
	}

	//endregion IList

	//region ICollection

	select(selector : Func<T, boolean>) : ArrayList<T> {
		var outcome : ArrayList<T>;

		outcome = new ArrayList<T>();

		this.forEach(
			(e) => {
				if (selector(e)) {
					outcome.add(e);
				}
			}
		);

		return outcome;
	}

	forEach(action : Action<T>) : void {
		var size : number;

		size = this.getLength();

		for (var i = 0; i < size; i++) {
			action(this.getAt(i));
		}
	}

	find(selector : Func<T, boolean>) : T {
		var size : number;

		size = this.getLength();

		for (var i = 0; i < size; i++) {
			var e : T;

			e = this.getAt(i);
			if (selector(e)) {
				return e;
			}
		}

		return null;
	}

	map(action : Func<T, T>) : ArrayList<T> {
		var outcome : ArrayList<T>;

		outcome = new ArrayList<T>();
		this.forEach(e => outcome.add(action(e)));

		return outcome;
	}

	orderBy<U>(getter : Func<T, U>) : ArrayList<T> {
		var a : Array<T>;
		var outcome : ArrayList<T>;

		outcome = new ArrayList<T>();

		if (this.getLength() === 0) {
			return outcome;
		}

		a = new Array<T>();
		this.forEach(e => a.push(e));
		CollectionUtils.ArrayUtils.sort(a, getter);
		
		for (var i = 0; i < a.length; i++) {
			outcome.add(a[i]);
		}

		return outcome;
	}

	orderByDesc<U>(getter : Func<T, U>) : ArrayList<T> {
		var a : Array<T>;
		var outcome : ArrayList<T>;

		outcome = new ArrayList<T>();

		if (this.getLength() === 0) {
			return outcome;
		}

		a = new Array<T>();
		this.forEach(e => a.push(e));
		CollectionUtils.ArrayUtils.sort(a, getter, false);
		
		for (var i = 0; i < a.length; i++) {
			outcome.add(a[i]);
		}

		return outcome;
	}

	reverse() : ArrayList<T> {
		var outcome : ArrayList<T>;

		outcome = new ArrayList<T>();

		for (var i = this.getLength() - 1; i >= 0; i--) {
			outcome.add(this.getAt(i));
		}

		return outcome;
	}

	toArray() : Array<T> {
		return this._content;
	}

	sum(getter : Func<T, number>) : number {
		var acc : number;

		acc = 0;
		this.forEach(e => acc += getter(e));

		return acc;
	}

	min(getter : Func<T, number>) : T {
		var min : number;
		var current : T;

		if (this.getLength() === 0) {
			return null;
		}

		current = this.getAt(0);
		min = getter(current);

		this.forEach(
			(e) => {
				var value : number;

				value = getter(e);

				if (value < min) {
					min = value;
					current = e;
				}
			}
		);

		return current;
	}

	max(getter : Func<T, number>) : T {
		var max : number;
		var current : T;

		if (this.getLength() === 0) {
			return null;
		}

		current = this.getAt(0);
		max = getter(current);

		this.forEach(
			(e) => {
				var value : number;

				value = getter(e);

				if (value > max) {
					max = value;
					current = e;
				}
			}
		);

		return current;
	}

	//endregion ICollection
	
	//endregion Public Methods
	
	//endregion Methods
}
