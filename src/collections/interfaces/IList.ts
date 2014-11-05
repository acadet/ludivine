/// <reference path="../../ref.ts" />

/**
 * @class IList
 * @brief Interface for simple lists
 */
interface IList<T> extends IListableCollection<T> {
	/**
	 * Inserts value at specified index
	 * @param {number} index Index
	 * @param {T}      value     Value
	 */
	insertAt(index : number, value : T) : void;
}
