/// <reference path="../../ref.ts" />

interface IList<T> extends IListableCollection<T>  {
	/**
	 * Inserts an element at specified index
	 * @param {number} index [description]
	 * @param {T}      t     [description]
	 */
	insertAt(index : number, value : T) : void;
}
