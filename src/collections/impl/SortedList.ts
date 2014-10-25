/// <reference path="../../ref.ts" />

module SortedListUtils {
	export class SortedListElement<T> {
		//region Fields

		private _content : T;
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

		getContent() : T {
			return this._content;
		}

		setContent(value : T) : void {
			this._content = value;
		}

		getNext() : SortedListElement<T> {
			return this._next;
		}

		setNext(value : SortedListElement<T>) : void {
			this._next = value;
		}

		hasNext() : boolean {
			return this._next !== null && this._next !== undefined;
		}
		
		//endregion Public Methods
		
		//endregion Methods
	}

	export class SortedListCursor<T> {
		//region Fields

		private _previous : SortedListElement<T>;
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

		getPrevious() : SortedListElement<T> {
			return this._previous;
		}

		setPrevious(value : SortedListElement<T>) : void {
			this._previous = value;
		}

		hasPrevious() : boolean {
			return this._previous !== null && this._previous !== undefined;
		}

		getCurrent() : SortedListElement<T> {
			return this._current;
		}

		setCurrent(value : SortedListElement<T>) : void {
			this._current = value;
		}
		
		//endregion Public Methods
		
		//endregion Methods
	}
}

class SortedList<A, B> {
	//region Fields

	private _head : SortedListUtils.SortedListElement<A>;
	private _getter : Func<A, B>;
	private _size : number;
	private _asc : boolean;
	
	//endregion Fields
	
	//region Constructors

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

	private _forEach(func : Func<SortedListUtils.SortedListCursor<A>, boolean>) : boolean {
		var prev : SortedListUtils.SortedListElement<A>, current : SortedListUtils.SortedListElement<A>;

		if (this.getLength() === 0) {
			return false;
		}

		current = this._head;
		while (current.hasNext()) {
			if (func(new SortedListUtils.SortedListCursor(prev, current))) {
				return;
			}
			prev = current;
			current = current.getNext();
		}

		return func(new SortedListUtils.SortedListCursor(prev, current));
	}
	
	//endregion Private Methods
	
	//region Public Methods

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
					latestCursor = cursor;

					if (comparator(this._getter(cursor.getCurrent().getContent()), this._getter(value))) {
						cursor.getPrevious().setNext(e);
						e.setNext(cursor.getCurrent());

						return true;
					} else {
						return false;
					}
				}
			);

			if (!success) {
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
					return false;
				}
				i++;
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
				return cursor.getCurrent().getContent() === value;
			}
		);

		if (done) {
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

		prev = null;
		current = this._head;

		for (var i = 0; i < this.getLength(); i++) {
			if (func(current.getContent())) {
				if (prev !== null && prev !== undefined) {
					prev.setNext(current.getNext());
				} else {
					this._head = current.getNext();
				}

				this._size--;
			} else {
				prev = current;
			}

			current = current.getNext();
		}
	}

	//region ICollection

	select(selector : Func<A, boolean>) : SortedList<A, B> {
		var outcome : SortedList<A, B>;

		outcome = new SortedList<A, B>(this._getter);
		this.forEach(
			(e) => {
				if (selector(e)) {
					outcome.add(e);
				}
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

	map(action : Func<A, A>) : SortedList<A, B> {
		var outcome : SortedList<A, B>;

		outcome = new SortedList<A, B>(this._getter);

		this.forEach(
			(e) => {
				outcome.add(action(e));
			}
		);

		return outcome;
	}

	orderBy<C>(getter : Func<A, C>) : SortedList<A, C> {
		var outcome : SortedList<A, C>;

		outcome = new SortedList<A, C>(getter);
		this.forEach(e => outcome.add(e));

		return outcome;
	}

	orderByDesc<C>(getter : Func<A, C>) : SortedList<A, C> {
		var outcome : SortedList<A, C>;

		outcome = new SortedList<A, C>(getter, false);
		this.forEach(e => outcome.add(e));

		return outcome;
	}

	reverse() : SortedList<A, B> {
		var outcome : SortedList<A, B>;

		outcome = new SortedList<A, B>(this._getter, false);
		this.forEach(e => outcome.add(e));

		return outcome;
	}

	toArray() : Array<A> {
		var outcome : Array<A>;

		outcome = new Array<A>();
		this.forEach(e => outcome.push(e));

		return outcome;
	}

	sum(getter : Func<A, number>) : number {
		var acc : number;

		acc = 0;
		this.forEach(e => acc += getter(e));

		return acc;
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

	//endregion ICollection
	
	//endregion Public Methods
	
	//endregion Methods
}
