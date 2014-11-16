/// <reference path="../../ref.ts" />

/**
 * Inner content for stack
 */
module StackUtils {

	/**
	 * @class StackElement
	 * @brief Stack element with simple chain
	 */
	export class StackElement<T> {
		//region Fields

		/**
		 * Neighbor
		 */
		private _prev : StackElement<T>;

		/**
		 * Wrapped content
		 */
		private _content : T;

		//endregion Fields

		//region Constructors

		constructor(content? : T) {
			this._content = content;
			this._prev = null;
		}

		//endregion Constructors

		//region Methods

		//region Private Methods

		//endregion Private Methods

		//region Public Methods

		/**
		 * Returns wrapped content
		 * @return {T} Wrapped content
		 */
		getContent() : T {
			return this._content;
		}

		/**
		 * Sets wrapped content
		 * @param {T} value Value
		 */
		setContent(value : T) : void {
			this._content = value;
		}

		/**
		 * Gets neighbor
		 * @return {StackElement<T>} Neighbor
		 */
		getPrev() : StackElement<T> {
			return this._prev;
		}

		/**
		 * Sets neighbor
		 * @param {StackElement<T>} value Value
		 */
		setPrev(value : StackElement<T>) : void {
			this._prev = value;
		}

		/**
		 * Returns true if element has neighbor
		 * @return {boolean} True if element has neighbor
		 */
		hasPrev() : boolean {
			return this._prev !== null && this._prev !== undefined;
		}

		//endregion Public Methods

		//endregion Methods
	}
}

/**
 * @class Stack
 * @brief A simple stack structure
 */
class Stack<T> implements ISortableCollection<T> {
	//region Fields

	/**
	 * Tail element (newest one)
	 */
	private _tail : StackUtils.StackElement<T>;

	/**
	 * Current size
	 */
	private _size : number;

	//endregion Fields

	//region Constructors

	/**
	 * Builds new stack
	 * @param {ICollection<T>} source Optional data source
	 */
	constructor(source? : ICollection<T>) {
		this._size = 0;

		if (source !== null && source !== undefined) {
			source.forEach(x => this.push(x));
		}
	}

	//endregion Constructors

	//region Methods

	//region Private Methods

	/**
	 * Browses stack from oldest to newest
	 * @param {Action<T>} action Applied to each element
	 */
	private _forEachInversed(action : Action<T>) : void {
		var a : Array<T>;
		var cursor : StackUtils.StackElement<T>;

		if (this.getSize() === 0) {
			return;
		}

		a = new Array<T>();
		cursor = this._tail;

		while (cursor.hasPrev()) {
			a.push(cursor.getContent());
			cursor = cursor.getPrev();
		}

		a.push(cursor.getContent());

		for (var i = a.length - 1; i >= 0; i--) {
			action(a[i]);
		}
	}

	//endregion Private Methods

	//region Public Methods

	/**
	 * Returns current size
	 * @return {number} Current size
	 */
	getSize() : number {
		return this._size;
	}

	/**
	 * Gets newest element without removing it from stack
	 * @return {T} Newest element
	 */
	top() : T {
		if (this.getSize() === 0) {
			return null;
		} else {
			return this._tail.getContent();
		}
	}

	/**
	 * Gets newest element and removes it from stack
	 * @return {T} Newest element
	 */
	pop() : T {
		if (this.getSize() === 0) {
			return null;
		} else {
			var e : T;

			e = this._tail.getContent();
			this._size--;
			this._tail = this._tail.getPrev();

			return e;
		}
	}

	/**
	 * Adds new value to stack
	 * @param {T} value Value
	 */
	push(value : T) : void {
		var e : StackUtils.StackElement<T>;

		e = new StackUtils.StackElement(value);

		if (this.getSize() === 0) {
			this._tail = e;
		} else {
			e.setPrev(this._tail);
			this._tail = e;
		}

		this._size++;
	}

	//region ISortableCollection

	orderBy<U>(getter : Func<T, U>) : ISortableCollection<T> {
		var outcome : Stack<T>;
		var a : Array<T>;

		outcome = new Stack<T>();

		if (this.getSize() === 0) {
			return outcome;
		}

		a = new Array<T>();
		this.forEach(e => a.push(e));
		CollectionUtils.ArrayUtils.sort(a, getter);

		for (var i = a.length - 1; i >= 0; i--) {
			outcome.push(a[i]);
		}

		return outcome;
	}

	orderByDesc<U>(getter : Func<T, U>) : ISortableCollection<T> {
		var outcome : Stack<T>;
		var a : Array<T>;

		outcome = new Stack<T>();

		if (this.getSize() === 0) {
			return outcome;
		}

		a = new Array<T>();
		this.forEach(e => a.push(e));
		CollectionUtils.ArrayUtils.sort(a, getter);

		for (var i = 0; i < a.length; i++) {
			outcome.push(a[i]);
		}

		return outcome;
	}

	reverse() : ISortableCollection<T> {
		var outcome : Stack<T>;

		outcome = new Stack<T>();
		this.forEach(e => outcome.push(e));

		return outcome;
	}

	//endregion ISortableCollection

	//region ICollection

	average(getter : Func<T, number>) : number {
		return CollectionUtils.CollectionHelper.average(this, getter);
	}

	exists(selector : Func<T, boolean>) : boolean {
		return this.find(selector) !== null;
	}

	find(selector : Func<T, boolean>) : T {
		var cursor : StackUtils.StackElement<T>;
		var e : T;

		if (this.getSize() === 0) {
			return null;
		}

		cursor = this._tail;

		while (cursor.hasPrev()) {
			e = cursor.getContent();
			if (selector(e)) {
				return e;
			}
			cursor = cursor.getPrev();
		}

		e = cursor.getContent();
		if (selector(e)) {
			return e;
		} else {
			return null;
		}
	}

	forEach(action : Action<T>) : void {
		var cursor : StackUtils.StackElement<T>;

		if (this.getSize() === 0) {
			return;
		}

		cursor = this._tail;

		while (cursor.hasPrev()) {
			action(cursor.getContent());
			cursor = cursor.getPrev();
		}

		action(cursor.getContent());
	}

	intersect(collection : ICollection<T>) : ICollection<T> {
		var outcome : Stack<T>;

		outcome = new Stack<T>();
		this._forEachInversed(
			(x) => {
				if (collection.exists(e => e === x)) {
					outcome.push(x);
				}
			}
		);

		return outcome;
	}

	map(action : Func<T, T>) : ICollection<T> {
		var outcome : Stack<T>;

		outcome = new Stack<T>();

		this._forEachInversed(e => outcome.push(action(e)));

		return outcome;
	}

	max(getter : Func<T, number>) : T {
		return CollectionUtils.CollectionHelper.max(this, getter);
	}

	min(getter : Func<T, number>) : T {
		return CollectionUtils.CollectionHelper.min(this, getter);
	}

	select(selector : Func<T, boolean>) : ICollection<T> {
		var outcome : Stack<T>;

		outcome = new Stack<T>();

		this._forEachInversed(
			(e) => {
				if (selector(e)) {
					outcome.push(e);
				}
			}
		);

		return outcome;
	}

	sum(getter : Func<T, number>) : number {
		return CollectionUtils.CollectionHelper.sum(this, getter);
	}

	toArray() : Array<T> {
		return CollectionUtils.CollectionHelper.toArray(this);
	}

	toDictionary<K, V>(keyGetter : Func<T, K>, valueGetter : Func<T, V>) : IDictionary<K, V> {
		return CollectionUtils.CollectionHelper.toDictionary(this, keyGetter, valueGetter);
	}

	toList() : IList<T> {
		return CollectionUtils.CollectionHelper.toList(this);
	}

	union(collection : ICollection<T>) : ICollection<T> {
		var outcome : Stack<T>;

		outcome = new Stack<T>();
		this._forEachInversed(x => outcome.push(x));
		collection.forEach(
			(x) => {
				if (!this.exists(e => e === x)) {
					outcome.push(x);
				}
			}
		);

		return outcome;
	}

	uniq() : ICollection<T> {
		var outcome : Stack<T>;

		outcome = new Stack<T>();
		this._forEachInversed(
			(x) => {
				if (!outcome.exists(e => e === x)) {
					outcome.push(x);
				}
			}
		);

		return outcome;
	}

	//endregion ICollection

	//endregion Public Methods

	//endregion Methods
}
