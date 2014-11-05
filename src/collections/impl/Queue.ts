/// <reference path="../../ref.ts" />

/**
 * Inner content for Queue
 */
module QueueUtils {

	/**
	 * @class QueueElement
	 * @brief Queue element with simple chain
	 */
	export class QueueElement<T> {
		//region Fields

		/**
		 * Inner content
		 */
		private _content : T;

		/**
		 * Neighbor
		 */
		private _next : QueueElement<T>;
		
		//endregion Fields
		
		//region Constructors

		constructor(content? : T) {
			this._content = content;
			this._next = null;
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
		 * Returns neighbor
		 * @return {QueueElement<T>} Neighbor
		 */
		getNext() : QueueElement<T> {
			return this._next;
		}

		/**
		 * Sets neighbor
		 * @param {QueueElement<T>} value Value
		 */
		setNext(value : QueueElement<T>) : void {
			this._next = value;
		}

		/**
		 * Returns true if there is a neighbor
		 * @return {boolean} True if there is neighborhood
		 */
		hasNext() : boolean {
			return (this._next !== null && this._next !== undefined);
		}
		
		//endregion Public Methods
		
		//endregion Methods
	}
}

/**
 * @class Queue
 * @brief Queue structure
 */
class Queue<T> implements ISortableCollection<T> {
	//region Fields

	/**
	 * Oldest element
	 */
	private _top : QueueUtils.QueueElement<T>;

	/**
	 * Newest element
	 */
	private _bottom : QueueUtils.QueueElement<T>;

	/**
	 * Current size
	 */
	private _size : number;
	
	//endregion Fields
	
	//region Constructors

	/**
	 * Builds new queue
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
	
	//endregion Private Methods
	
	//region Public Methods

	/**
	 * Returns current size
	 * @return {number} Size
	 */
	getSize() : number {
		return this._size;
	}

	/**
	 * Gets oldest element without removing it from queue
	 * @return {T} Top element
	 */
	top() : T {
		if (this._size === 0) {
			return null;
		} else {
			return this._top.getContent();
		}
	}

	/**
	 * Gets oldest element and removes it from queue
	 * @return {T} Oldest element
	 */
	pop() : T {
		if (this._size === 0) {
			return null;
		} else {
			var outcome : T;

			outcome = this._top.getContent();
			if (this._size === 1) {
				this._top = null;
				this._bottom = null;
			} else {
				this._top = this._top.getNext();
			}

			this._size--;

			return outcome;
		}
	}

	/**
	 * Adds element in queue
	 * @param {T} value Value
	 */
	push(value : T) : void {
		var e : QueueUtils.QueueElement<T>;

		e = new QueueUtils.QueueElement(value);

		if (this._size === 0) {
			this._top = e;
			this._bottom = e;
		} else {
			this._bottom.setNext(e);
			this._bottom = e;
		}

		this._size++;
	}

	//region ISortableCollection

	orderBy<U>(getter : Func<T, U>) : ISortableCollection<T> {
		var a : Array<T>;
		var outcome : Queue<T>;

		outcome = new Queue<T>();

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

	orderByDesc<U>(getter : Func<T, U>) : ISortableCollection<T> {
		var a : Array<T>;
		var outcome : Queue<T>;

		outcome = new Queue<T>();

		if (this.getSize() === 0) {
			return outcome;
		}

		a = new Array<T>();
		this.forEach(e => a.push(e));
		CollectionUtils.ArrayUtils.sort(a, getter, false);

		for (var i = 0; i < a.length; i++) {
			outcome.push(a[i]);
		}

		return outcome;
	}

	reverse() : ISortableCollection<T> {
		var outcome : Queue<T>;
		var a : Array<T>;

		outcome = new Queue<T>();

		if (this.getSize() === 0) {
			return outcome;
		}

		a = new Array<T>();
		this.forEach(x => a.push(x));

		for (var i = a.length - 1; i >= 0; i--) {
			outcome.push(a[i]);
		}

		return outcome;
	}

	//endregion ISortableCollection

	//region ICollection

	find(selector : Func<T, boolean>) : T {
		var cursor : QueueUtils.QueueElement<T>;
		var e : T;

		if (this.getSize() === 0) {
			return null;
		}

		cursor = this._top;

		while (cursor.hasNext()) {
			e = cursor.getContent();
			if (selector(e)) {
				return e;
			}

			cursor = cursor.getNext();
		}

		e = cursor.getContent();
		if (selector(e)) {
			return e;
		}

		return null;
	}

	forEach(action : Action<T>) : void {
		var cursor : QueueUtils.QueueElement<T>;

		if (this.getSize() === 0) {
			return;
		}

		cursor = this._top;

		while (cursor.hasNext()) {
			action(cursor.getContent());
			cursor = cursor.getNext();
		}

		action(cursor.getContent());
	}

	map(action : Func<T, T>) : ICollection<T> {
		var outcome : Queue<T>;

		outcome = new Queue<T>();

		this.forEach(
			(e) => {
				outcome.push(action(e));
			}
		);

		return outcome;
	}

	max(getter : Func<T, number>) : T {
		var max : number;
		var outcome : T;

		if (this.getSize() === 0) {
			return null;
		}

		outcome = this._top.getContent();
		max = getter(outcome);

		this.forEach(
			(e) => {
				var value : number;

				value = getter(e);

				if (value > max) {
					max = value;
					outcome = e;
				}
			}
		);

		return outcome;
	}

	min(getter : Func<T, number>) : T {
		var min : number;
		var outcome : T;

		if (this.getSize() === 0) {
			return null;
		}

		outcome = this._top.getContent();
		min = getter(outcome);

		this.forEach(
			(e) => {
				var value : number;

				value = getter(e);

				if (value < min) {
					min = value;
					outcome = e;
				}
			}
		);

		return outcome;
	}

	select(selector : Func<T, boolean>) : ICollection<T> {
		var outcome : Queue<T>;

		outcome = new Queue<T>();

		this.forEach(
			(e) => {
				if (selector(e)) {
					outcome.push(e);
				}
			}
		);

		return outcome;
	}

	sum(getter : Func<T, number>) : number {
		var total : number;

		total = 0;
		this.forEach(e => total += getter(e));

		return total;
	}

	toArray() : Array<T> {
		var outcome : Array<T>;

		outcome = new Array<T>();
		this.forEach(x => outcome.push(x));

		return outcome;
	}

	toDictionary<K, V>(keyGetter : Func<T, K>, valueGetter : Func<T, V>) : IDictionary<K, V> {
		var outcome : IDictionary<K, V>;

		outcome = new Dictionary<K, V>();
		this.forEach(x => outcome.add(keyGetter(x), valueGetter(x)));

		return outcome;
	}

	toList() : IList<T> {
		return new ArrayList<T>(this);
	}

	//endregionICollection
	
	//endregion Public Methods
	
	//endregion Methods
}
