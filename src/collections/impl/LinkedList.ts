/// <reference path="../../ref.ts" />

/**
 * Inner content for LinkedList
 */
module LinkedListUtils {
	/**
	 * @class LinkedListElement
	 * @brief Linked element with simple chain
	 */
	export class LinkedListElement<T> {
		//region Fields

		/**
		 * Wrapped content
		 */
		private _content : T;

		/**
		 * Next element
		 */
		private _next : LinkedListElement<T>;
		
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
		 * Gets next element
		 * @return {LinkedListElement<T>} Next element
		 */
		getNext() : LinkedListElement<T> {
			return this._next;
		}

		/**
		 * Sets next element
		 * @param {LinkedListElement<T>} value Value
		 */
		setNext(value : LinkedListElement<T>) : void {
			this._next = value;
		}

		/**
		 * Returns true if element has a neighbor
		 * @return {boolean} True if neighborhood
		 */
		hasNext() : boolean {
			return this._next !== null && this._next !== undefined;
		}
		
		//endregion Public Methods
		
		//endregion Methods
	}
}

/**
 * @class LinkedList
 * @brief Implementation of IList using linked elements
 */
class LinkedList<T> implements IList<T> {
	//region Fields

	private _head : LinkedListUtils.LinkedListElement<T>;
	private _tail : LinkedListUtils.LinkedListElement<T>;
	private _size : number;
	
	//endregion Fields
	
	//region Constructors

	/**
	 * Builds new list
	 * @param {ICollection<T>} source Optional data source
	 */
	constructor(source? : ICollection<T>) {
		this._size = 0;

		if (source !== null && source !== undefined) {
			source.forEach(x => this.add(x));
		}
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	//region IList

	insertAt(index : number, value : T) : void {
		if (index < 0) {
			throw new CollectionException('Unbound index');
		}

		if (index >= this.getLength()) {
			this.add(value);
		} else {
			var prev : LinkedListUtils.LinkedListElement<T>, current : LinkedListUtils.LinkedListElement<T>;
			var e : LinkedListUtils.LinkedListElement<T>;

			e = new LinkedListUtils.LinkedListElement(value);
			current = this._head;

			for (var i = 0; i < this.getLength(); i++) {
				if (i === index) {
					if (i === 0) {
						// Element is new head
						e.setNext(this._head);
						this._head = e;
					} else {
						prev.setNext(e);
						e.setNext(current);
					}

					this._size++;
					return;
				}

				prev = current;
				current = current.getNext();
			}
		}
	}

	//endregion IList

	//region IListableCollection

	add(value : T) : void {
		var e : LinkedListUtils.LinkedListElement<T>;

		e = new LinkedListUtils.LinkedListElement(value);

		if (this.getLength() === 0) {
			this._head = e;
			this._tail = e;
		} else {
			this._tail.setNext(e);
			this._tail = e;
		}

		this._size++;
	}

	getAt(index : number) : T {
		var e : LinkedListUtils.LinkedListElement<T>;

		if (index < 0 || index >= this._size) {
			throw new CollectionException('Unbound index');
		}

		e = this._head;
		for (var i = 0; i < this.getLength(); i++) {
			if (i === index) {
				return e.getContent();
			}
			e = e.getNext();
		}
	}

	getLength() : number {
		return this._size;
	}

	remove(value : T) : void {
		var prev : LinkedListUtils.LinkedListElement<T>, current : LinkedListUtils.LinkedListElement<T>;

		current = this._head;
		prev = null;

		for (var i = 0; i < this.getLength(); i++) {
			if (current.getContent() === value) {
				if (i === 0) {
					// Neighbor is new head
					this._head = current.getNext();
				} else {
					prev.setNext(current.getNext());
				}

				if (i === this.getLength() - 1) {
					// If last element has been removed, update tail
					this._tail = prev;
				}

				this._size--;
				return;
			}

			prev = current;
			current = current.getNext();
		}
	}

	removeAt(index : number) : void {
		var prev : LinkedListUtils.LinkedListElement<T>, current : LinkedListUtils.LinkedListElement<T>;

		if (index < 0 || index >= this.getLength()) {
			throw new CollectionException('Unbound index');
		}

		current = this._head;
		prev = null;

		for (var i = 0; i < this.getLength(); i++) {
			if (i === index) {
				if (i === 0) {
					// Neighbor is new head
					this._head = current.getNext();
				} else {
					prev.setNext(current.getNext());
				}

				if (i === this.getLength() - 1) {
					// If last element has been removed, update tail
					this._tail = prev;
				}

				this._size--;
				return;
			}

			prev = current;
			current = current.getNext();
		}
	}

	removeIf(func : Func<T, boolean>) : void {
		var prev : LinkedListUtils.LinkedListElement<T>, current : LinkedListUtils.LinkedListElement<T>;

		prev = null;
		current = this._head;

		for (var i = 0; i < this.getLength(); i++) {
			if (func(current.getContent())) {
				if (prev === null || prev === undefined) {
					// No previous, neighbor is new head
					this._head = current.getNext();
				} else {
					prev.setNext(current.getNext());
				}

				if (i === this.getLength() - 1) {
					// If last element has been removed, update tail
					this._tail = prev;
				}
				
				this._size--;
			} else {
				// Go further if no element has been removed
				prev = current;
			}
			
			current = current.getNext();
		}
	}

	//endregion IListableCollection

	//region ISortableCollection

	orderBy<U>(getter : Func<T, U>) : ISortableCollection<T> {
		var a : Array<T>;
		var size : number;
		var outcome : LinkedList<T>;

		outcome = new LinkedList<T>();

		if (this.getLength() === 0) {
			return outcome;
		}

		a = this.toArray();
		CollectionUtils.ArrayUtils.sort(a, getter);

		size =  a.length;
		for (var i = 0; i < size; i++) {
			outcome.add(a[i]);
		}

		return outcome;
	}

	orderByDesc<U>(getter : Func<T, U>) : ISortableCollection<T> {
		var a : Array<T>;
		var size : number;
		var outcome : LinkedList<T>;

		outcome = new LinkedList<T>();

		if (this.getLength() === 0) {
			return outcome;
		}

		a = this.toArray();
		CollectionUtils.ArrayUtils.sort(a, getter, false);

		size =  a.length;
		for (var i = 0; i < size; i++) {
			outcome.add(a[i]);
		}

		return outcome;
	}

	reverse() : ISortableCollection<T> {
		var outcome : LinkedList<T>;
		var a : Array<T>;

		outcome = new LinkedList<T>();
		a = this.toArray();

		for (var i = a.length - 1; i >= 0; i--) {
			outcome.add(a[i]);
		}

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
		var cursor : LinkedListUtils.LinkedListElement<T>;
		var e : T;

		if (this.getLength() === 0) {
			return null;
		}

		cursor = this._head;
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
		} else {
			return null;
		}
	}

	forEach(action : Action<T>) : void {
		var cursor : LinkedListUtils.LinkedListElement<T>;

		if (this.getLength() === 0) {
			return;
		}

		cursor = this._head;
		while (cursor.hasNext()) {
			action(cursor.getContent());
			cursor = cursor.getNext();
		}

		action(cursor.getContent());
	}

	intersect(collection : ICollection<T>) : ICollection<T> {
		var outcome : LinkedList<T>;

		outcome = new LinkedList<T>();
		this.forEach(
			(x) => {
				if (collection.exists(e => e === x)) {
					outcome.add(x);
				}
			}
		);

		return outcome;
	}

	map(action : Func<T, T>) : ICollection<T> {
		var outcome : LinkedList<T>;

		outcome = new LinkedList<T>();
		this.forEach(x => outcome.add(action(x)));

		return outcome;
	}

	max(getter : Func<T, number>) : T {
		return CollectionUtils.CollectionHelper.max(this, getter);
	}

	min(getter : Func<T, number>) : T {
		return CollectionUtils.CollectionHelper.min(this, getter);
	}

	select(selector : Func<T, boolean>) : ICollection<T> {
		var outcome : LinkedList<T>;

		outcome = new LinkedList<T>();
		this.forEach(
			(e) => {
				if (selector(e)) {
					outcome.add(e);
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
		return new ArrayList<T>(this);
	}

	union(collection : ICollection<T>) : ICollection<T> {
		var outcome : LinkedList<T>;

		outcome = new LinkedList<T>(this);
		collection.forEach(
			(x) => {
				if (!this.exists(e => e === x)) {
					outcome.add(x);
				}
			}
		);

		return outcome;
	}

	uniq() : ICollection<T> {
		var outcome : LinkedList<T>;

		outcome = new LinkedList<T>();
		this.forEach(
			(x) => {
				if (!outcome.exists(e => e === x)) {
					outcome.add(x);
				}
			}
		);

		return outcome;
	}

	//endregion ICollection
	
	//endregion Public Methods
	
	//endregion Methods
}
