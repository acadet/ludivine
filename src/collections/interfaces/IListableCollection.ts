/// <reference path="../../ref.ts" />

/**
 * @class IListableCollection
 * @brief Interface for listable collections, whatever complexity they have (arraylist, sortedlist etc.)
 */
interface IListableCollection<T> extends ISortableCollection<T, IListableCollection<T>> {

	/**
	 * Adds new item to list
	 * @param {T} t Value
	 */
	add(value : T) : void;

	/**
	 * Gets element at specified index. Throws error if index is unbound
	 * @param  {number} index Index
	 * @return {T}            Value
	 */
	getAt(index : number) : T;

	/**
	 * Gets length of list
	 * @return {number} Length
	 */
	getLength() : number;

	/**
	 * Removes element from list
	 * @param {T} t Value
	 */
	remove(value : T) : void;

	/**
	 * Removes element at specified index. Throws error if index is unbound
	 * @param {number} index Index
	 */
	removeAt(index : number) : void;

	/**
	 * Removes all elements matching provided condition
	 * @param {Func<T, boolean>} func Returns true if element has to be removed
	 */
	removeIf(func : Func<T, boolean>) : void;
}
