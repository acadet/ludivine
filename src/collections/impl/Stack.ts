/// <reference path="../../ref.ts" />

module StackUtils {
	export class StackElement<T> {
		//region Fields

		private _prev : StackElement<T>;
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

		getContent() : T {
			return this._content;
		}

		setContent(value : T) : void {
			this._content = value;
		}

		getPrev() : StackElement<T> {
			return this._prev;
		}

		setPrev(value : StackElement<T>) : void {
			this._prev = value;
		}

		hasPrev() : boolean {
			return this._prev !== null && this._prev !== undefined;
		}
		
		//endregion Public Methods
		
		//endregion Methods
	}
}

class Stack<T> implements ICollection<T, Stack<T>> {
	//region Fields

	private _tail : StackUtils.StackElement<T>;
	private _size : number;
	
	//endregion Fields
	
	//region Constructors

	constructor() {
		this._size = 0;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _forEachInversed(action : Action<T>) : void {
		var a : Array<T>;
		var cursor : StackUtils.StackElement<T>;

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

	getSize() : number {
		return this._size;
	}

	top() : T {
		if (this.getSize() === 0) {
			return null;
		} else {
			return this._tail.getContent();
		}
	}

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

	//region ICollection

	select(selector : Func<T, boolean>) : Stack<T> {
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
		}

		e = cursor.getContent();
		if (selector(e)) {
			return e;
		} else {
			return null;
		}
	}

	map(action : Func<T, T>) : Stack<T> {
		var outcome : Stack<T>;

		outcome = new Stack<T>();

		this._forEachInversed(e => outcome.push(action(e)));

		return outcome;
	}

	orderBy<U>(getter : Func<T, U>) : Stack<T> {
		var outcome : Stack<T>;
		var a : Array<T>;

		a = new Array<T>();
		this.forEach(e => a.push(e));
		CollectionUtils.ArrayUtils.sort(a, getter);
		outcome = new Stack<T>();

		for (var i = a.length - 1; i >= 0; i--) {
			outcome.push(a[i]);
		}

		return outcome;
	}

	orderByDesc<U>(getter : Func<T, U>) : Stack<T> {
		var outcome : Stack<T>;
		var a : Array<T>;

		a = new Array<T>();
		this.forEach(e => a.push(e));
		CollectionUtils.ArrayUtils.sort(a, getter);
		outcome = new Stack<T>();

		for (var i =0; i < a.length; i++) {
			outcome.push(a[i]);
		}

		return outcome;
	}

	reverse() : Stack<T> {
		var outcome : Stack<T>;

		outcome = new Stack<T>();
		this.forEach(e => outcome.push(e));

		return outcome;
	}

	sum(getter : Func<T, number>) : number {
		var total : number;

		this.forEach(x => total += getter(x));

		return total;
	}

	min(getter : Func<T, number>) : T {
		var min : number;
		var e : T;

		if (this.getSize() === 0) {
			return null;
		}

		e = this._tail.getContent();
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

	max(getter : Func<T, number>) : T {
		var max : number;
		var e : T;

		if (this.getSize() === 0) {
			return null;
		}

		e = this._tail.getContent();
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
