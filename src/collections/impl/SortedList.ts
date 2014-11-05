/// <reference path="../../ref.ts" />

/**
 * Inner content for SortedList
 */
module SortedListUtils {

	/**
	 * @class SortedListElement
	 * @brief Element for SortedList using simply chain
	 */
	export class SortedListElement<T> {
		//region Fields

		/**
		 * Wrapped content
		 */
		private _content : T;

		/**
		 * Neighbor
		 */
		private _next : SortedListElement<T>;
		
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
		 * @return {SortedListElement<T>} Neighbor
		 */
		getNext() : SortedListElement<T> {
			return this._next;
		}

		/**
		 * Sets neighbor
		 * @param {SortedListElement<T>} value Value
		 */
		setNext(value : SortedListElement<T>) : void {
			this._next = value;
		}

		/**
		 * Returns true if there is a neighbor
		 * @return {boolean} True if neighbor
		 */
		hasNext() : boolean {
			return this._next !== null && this._next !== undefined;
		}
		
		//endregion Public Methods
		
		//endregion Methods
	}

	/**
	 * @class SortedListCursor
	 * @brief Cursor when browsing SortedList
	 */
	export class SortedListCursor<T> {
		//region Fields

		/**
		 * Previous element
		 */
		private _previous : SortedListElement<T>;

		/**
		 * Current element
		 */
		private _current : SortedListElement<T>;
		
		//endregion Fields
		
		//region Constructors

		constructor(previous? : SortedListElement<T>, current? : SortedListElement<T>) {
			this._previous = previous;
			this._current = current;
		}
		
		//endregion Constructors
		
		//region Methods
		
		//region Private Methods
		
		//endregion Private Methods
		
		//region Public Methods

		/**
		 * Returns previous element
		 * @return {SortedListElement<T>} Previous element
		 */
		getPrevious() : SortedListElement<T> {
			return this._previous;
		}

		/**
		 * Sets previous element
		 * @param {SortedListElement<T>} value Value
		 */
		setPrevious(value : SortedListElement<T>) : void {
			this._previous = value;
		}

		/**
		 * Returns true if cursor has previous
		 * @return {boolean} True if element has previous
		 */
		hasPrevious() : boolean {
			return this._previous !== null && this._previous !== undefined;
		}

		/**
		 * Gets current element
		 * @return {SortedListElement<T>} Current element
		 */
		getCurrent() : SortedListElement<T> {
			return this._current;
		}

		/**
		 * Sets current element
		 * @param {SortedListElement<T>} value Value
		 */
		setCurrent(value : SortedListElement<T>) : void {
			this._current = value;
		}
		
		//endregion Public Methods
		
		//endregion Methods
	}
}

/**
 * @class SortedList
 * @description Sorted list. Double typed: first one is for wrapped elements,
 * other one is for comparable value
 */
class SortedList<A, B> implements IListableCollection<A> {
	//region Fields

	/**
	 * Head of list
	 */
	private _head : SortedListUtils.SortedListElement<A>;

	/**
	 * Returns comparable value from any element
	 */
	private _getter : Func<A, B>;

	/**
	 * Current size
	 */
	private _size : number;

	/**
	 * True if list is ascending sorted
	 */
	private _asc : boolean;
	
	//endregion Fields
	
	//region Constructors

	/**
	 * Creates new sorted list
	 * @param {Func<A, B>} getter Returns comparable value from any element of list
	 * @param {boolean} ascending True if list has to be ascending (default)
	 */
	constructor(getter : Func<A, B>, ascending? : boolean) {
		this._getter = getter;
		this._size = 0;

		if (ascending !== null && ascending !== undefined) {
			this._asc = ascending;
		} else {
			this._asc = true;
		}
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	/**
	 * Browses list and applies provided function with a cursor. Stops when action
	 * returns true
	 * @param  {Func<SortedListUtils.SortedListCursor<A>, boolean>} func Action to apply
	 * @return {boolean} Outcome from action
	 */
	private _forEach(func : Func<SortedListUtils.SortedListCursor<A>, boolean>) : boolean {
		var prev : SortedListUtils.SortedListElement<A>, current : SortedListUtils.SortedListElement<A>;

		if (this.getLength() === 0) {
			return false;
		}

		current = this._head;
		prev = null;
		while (current.hasNext()) {
			if (func(new SortedListUtils.SortedListCursor(prev, current))) {
				// Stop browsing
				return true;
			}
			prev = current;
			current = current.getNext();
		}

		return func(new SortedListUtils.SortedListCursor(prev, current));
	}
	
	//endregion Private Methods
	
	//region Public Methods

	//region IListableCollection

	add(value : A) : void {
		var e : SortedListUtils.SortedListElement<A>;

		e = new SortedListUtils.SortedListElement<A>(value);

		if (this.getLength() === 0) {
			this._head = e;
		} else {
			var success : boolean;
			var latestCursor : SortedListUtils.SortedListCursor<A>;
			var comparator : Func2<B, B, boolean>;

			if (this._asc) {
				comparator = (a, b) => {
					return a < b;
				};
			} else {
				comparator = (a, b) => {
					return a > b;
				};
			}

			success = this._forEach(
				(cursor) => {
					var current : SortedListUtils.SortedListElement<A>;

					current = cursor.getCurrent();
					latestCursor = cursor;

					if (comparator(this._getter(value), this._getter(current.getContent()))) {
						if (cursor.hasPrevious()) {
							cursor.getPrevious().setNext(e);
						} else {
							// Element is new head
							this._head = e;
						}
						e.setNext(current);

						return true;
					} else {
						return false;
					}
				}
			);

			if (!success) {
				// No slot found before, append element
				latestCursor.getCurrent().setNext(e);
			}
		}

		this._size++;
	}

	getAt(index : number) : A {
		var outcome : A;
		var i : number;

		if (index < 0 || index >= this.getLength()) {
			throw new CollectionException('Unbound index');
		}

		i = 0;

		this._forEach(
			(cursor) => {
				if (i === index) {
					outcome = cursor.getCurrent().getContent();
					return true;
				} else {
					i++;
					return false;
				}
			}
		);

		return outcome;
	}

	getLength() : number {
		return this._size;
	}

	remove(value : A) : void {
		var done : boolean;

		done = this._forEach(
			(cursor) => {
				if (cursor.getCurrent().getContent() === value) {
					if (cursor.hasPrevious()) {
						cursor.getPrevious().setNext(cursor.getCurrent().getNext());
					} else {
						// Element was head, neighbor is new one
						this._head = cursor.getCurrent().getNext();
					}
					return true;
				} else {
					return false;
				}
			}
		);

		if (done) {
			// Decrease size if elemnt has been removed
			this._size--;
		}
	}

	removeAt(index : number) : void {
		var i : number;

		if (index < 0 || index >= this.getLength()) {
			throw new CollectionException('Unbound index');
		}

		i = 0;

		this._forEach(
			(cursor) => {
				if (i === index) {
					var e : SortedListUtils.SortedListElement<A>;

					e = cursor.getCurrent().getNext();

					if (cursor.hasPrevious()) {
						cursor.getPrevious().setNext(e);
					} else {
						// Element was head, set head as neighbor
						this._head = e;
					}

					return true;
				}
				i++;
			}
		);

		this._size--;
	}

	removeIf(func : Func<A, boolean>) : void {
		var prev : SortedListUtils.SortedListElement<A>, current : SortedListUtils.SortedListElement<A>;
		var size : number;

		size = this.getLength();
		prev = null;
		current = this._head;

		for (var i = 0; i < size; i++) {
			if (func(current.getContent())) {
				if (prev !== null && prev !== undefined) {
					prev.setNext(current.getNext());
				} else {
					// Element was head, set neighbor as new one
					this._head = current.getNext();
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

	orderBy<C>(getter : Func<A, C>) : ISortableCollection<A> {
		var outcome : SortedList<A, C>;

		outcome = new SortedList<A, C>(getter);
		this.forEach(e => outcome.add(e));

		return outcome;
	}

	orderByDesc<C>(getter : Func<A, C>) : ISortableCollection<A> {
		var outcome : SortedList<A, C>;

		outcome = new SortedList<A, C>(getter, false);
		this.forEach(e => outcome.add(e));

		return outcome;
	}

	reverse() : ISortableCollection<A> {
		var outcome : SortedList<A, B>;

		outcome = new SortedList<A, B>(this._getter, !this._asc);
		this.forEach(e => outcome.add(e));

		return outcome;
	}

	//endregion ISortableCollection

	//region ICollection

	find(selector : Func<A, boolean>) : A {
		var outcome : A;

		outcome = null;

		this._forEach(
			(cursor) => {
				var content : A;

				content = cursor.getCurrent().getContent();

				if (selector(content)) {
					outcome = content;
					return true;
				}

				return false;
			}
		);

		return outcome;
	}

	forEach(action : Action<A>) : void {
		this._forEach(
			(cursor) => {
				action(cursor.getCurrent().getContent());
				return false;
			}
		);
	}

	map(action : Func<A, A>) : ICollection<A> {
		var outcome : SortedList<A, B>;

		outcome = new SortedList<A, B>(this._getter, this._asc);

		this.forEach(
			(e) => {
				outcome.add(action(e));
			}
		);

		return outcome;
	}

	max(getter : Func<A, number>) : A {
		var max : number;
		var current : A;

		if (this.getLength() === 0) {
			return null;
		}

		current = this._head.getContent();
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

	min(getter : Func<A, number>) : A {
		var min : number;
		var current : A;

		if (this.getLength() === 0) {
			return null;
		}

		current = this._head.getContent();
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

	select(selector : Func<A, boolean>) : ICollection<A> {
		var outcome : SortedList<A, B>;

		outcome = new SortedList<A, B>(this._getter, this._asc);
		this.forEach(
			(e) => {
				if (selector(e)) {
					outcome.add(e);
				}
			}
		);

		return outcome;
	}

	sum(getter : Func<A, number>) : number {
		var acc : number;

		acc = 0;
		this.forEach(e => acc += getter(e));

		return acc;
	}

	toArray() : Array<A> {
		var outcome : Array<A>;

		outcome = new Array<A>();
		this.forEach(e => outcome.push(e));

		return outcome;
	}

	toDictionary<K, V>(keyGetter : Func<A, K>, valueGetter : Func<A, V>) : IDictionary<K, V> {
		var outcome : IDictionary<K, V>;

		outcome = new Dictionary<K, V>();
		this.forEach(x => outcome.add(keyGetter(x), valueGetter(x)));

		return outcome;
	}

	toList() : IList<A> {
		return new ArrayList<A>(this);
	}

	//endregion ICollection
	
	//endregion Public Methods
	
	//endregion Methods
}
