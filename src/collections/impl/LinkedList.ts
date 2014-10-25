/// <reference path="../../ref.ts" />

module LinkedListUtils {
	export class LinkedListElement<T> {
		//region Fields

		private _content : T;
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

		getContent() : T {
			return this._content;
		}

		setContent(value : T) : void {
			this._content = value;
		}

		getNext() : LinkedListElement<T> {
			return this._next;
		}

		setNext(value : LinkedListElement<T>) : void {
			this._next = value;
		}

		hasNext() : boolean {
			return this._next !== null && this._next !== undefined;
		}
		
		//endregion Public Methods
		
		//endregion Methods
	}
}

class LinkedList<T> implements IList<T, LinkedList<T>> {
	//region Fields

	private _head : LinkedListUtils.LinkedListElement<T>;
	private _tail : LinkedListUtils.LinkedListElement<T>;
	private _size : number;
	
	//endregion Fields
	
	//region Constructors

	constructor() {
		this._size = 0;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

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

	remove(value : T) : void {
		var prev : LinkedListUtils.LinkedListElement<T>, current : LinkedListUtils.LinkedListElement<T>;

		current = this._head;

		for (var i = 0; i < this.getLength(); i++) {
			if (current.getContent() === value) {
				if (i === 0) {
					this._head = current.getNext();
				} else {
					prev.setNext(current.getNext());
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

		for (var i = 0; i < this.getLength(); i++) {
			if (i === index) {
				if (i === 0) {
					this._head = current.getNext();
				} else {
					prev.setNext(current.getNext());
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
					this._head = current.getNext();
				} else {
					prev.setNext(current.getNext());
				}
				this._size--;
			} else {
				prev = current;
			}
			
			current = current.getNext();
		}
	}

	//region ICollection

	select(selector : Func<T, boolean>) : LinkedList<T> {
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

	map(action : Func<T, T>) : LinkedList<T> {
		var outcome : LinkedList<T>;

		outcome = new LinkedList<T>();
		this.forEach(x => outcome.add(action(x)));

		return outcome;
	}

	orderBy<U>(getter : Func<T, U>) : LinkedList<T> {
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

	orderByDesc<U>(getter : Func<T, U>) : LinkedList<T> {
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

	reverse() : LinkedList<T> {
		var outcome : LinkedList<T>;
		var a : Array<T>;

		outcome = new LinkedList<T>();
		a = this.toArray();

		for (var i = a.length - 1; i >= 0; i--) {
			outcome.add(a[i]);
		}

		return outcome;
	}

	toArray() : Array<T> {
		var outcome : Array<T>;

		outcome = new Array<T>();
		this.forEach(x => outcome.push(x));

		return outcome;
	}

	sum(getter : Func<T, number>) : number {
		var acc : number;

		acc = 0;
		this.forEach(x => acc += getter(x));

		return acc;
	}

	min(getter : Func<T, number>) : T {
		var min : number;
		var current : T;

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

	max(getter : Func<T, number>) : T {
		var max : number;
		var current : T;

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
