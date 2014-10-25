/// <reference path="../../ref.ts" />

interface IList<T, S extends IList<any, any>> extends ICollection<T, S>  {
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
	 * Inserts an element at specified index
	 * @param {number} index [description]
	 * @param {T}      t     [description]
	 */
	insertAt(index : number, value : T) : void;

	/**
	 * Removes an element from list
	 * @param {T} t [description]
	 */
	remove(value : T) : void;

	removeAt(index : number) : void;

	removeIf(func : Func<T, boolean>) : void;
}
