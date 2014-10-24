/// <reference path="../../ref.ts" />

module QueueUtils {
	export class QueueElement<T> {
		//region Fields

		private _content : T;
		private _next : QueueElement<T>;
		
		//endregion Fields
		
		//region Constructors

		constructor(content : T = null) {
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

		getNext() : QueueElement<T> {
			return this._next;
		}

		setNext(value : QueueElement<T>) : void {
			this._next = value;
		}

		hasNext() : boolean {
			return (this._next !== null && this._next !== undefined);
		}
		
		//endregion Public Methods
		
		//endregion Methods
	}
}

class Queue<T> implements ICollection<T, Queue<T>> {
	//region Fields

	private _top : QueueUtils.QueueElement<T>;
	private _bottom : QueueUtils.QueueElement<T>;
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

	getSize() : number {
		return this._size;
	}

	top() : T {
		if (this._size === 0) {
			return null;
		} else {
			return this._top.getContent();
		}
	}

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

	//region ICollection

	select(selector : Func<T, boolean>) : Queue<T> {
		var outcome : Queue<T>;

		outcome = new Queue<T>();

		if (this.getSize() === 0) {
			return outcome;
		}

		this.forEach(
			(e) => {
				if (selector(e)) {
					outcome.push(e);
				}
			}
		);

		return outcome;
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

	map(action : Func<T, T>) : Queue<T> {
		var outcome : Queue<T>;

		outcome = new Queue<T>();

		this.forEach(
			(e) => {
				outcome.push(action(e));
			}
		);

		return outcome;
	}

	orderBy<U>(getter : Func<T, U>) : Queue<T> {
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

	orderByDesc<U>(getter : Func<T, U>) : Queue<T> {
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

	reverse() : Queue<T> {
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

	sum(getter : Func<T, number>) : number {
		var total : number;

		total = 0;
		this.forEach(e => total += getter(e));

		return total;
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

	//endregionICollection
	
	//endregion Public Methods
	
	//endregion Methods
}
