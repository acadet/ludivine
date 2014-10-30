/// <reference path="../../ref.ts" />

interface IListableCollection<T> extends ISortableCollection<T, IListableCollection<T>> {
	/**
	 * Adds a new item to list
	 * @param {T} t [description]
	 */
	add(value : T) : void;

	/**
	 * Gets an element at specified index
	 * @param  {number} index [description]
	 * @return {T}            [description]
	 */
	getAt(index : number) : T;

	/**
	 * Gets length of list
	 * @return {number} [description]
	 */
	getLength() : number;

	/**
	 * Removes an element from list
	 * @param {T} t [description]
	 */
	remove(value : T) : void;

	removeAt(index : number) : void;

	removeIf(func : Func<T, boolean>) : void;
}
