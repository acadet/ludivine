/// <reference path="../../ref.ts" />

/**
 * @class ISortableCollection
 * @description Interface for any sortable collection (where there is an order relation).
 * Returns new collection with called typing
 */
interface ISortableCollection<T, S extends ISortableCollection<any, any>> extends ICollection<T, S> {

	/**
	 * Orders collection using ascending method
	 * @param {Func<T, U>} getter Returns comparable value
	 * @return {S} Ordered collection
	 */
	orderBy<U>(getter : Func<T, U>) : S;

	/**
	 * Orders collection using descending method
	 * @param {Func<T, U>} getter Returns comparable value
	 * @return {S} Ordered collection
	 */
	orderByDesc<U>(getter : Func<T, U>) : S;

	/**
	 * Reverses whole collection order
	 * @return {S} Reversed collection
	 */
	reverse() : S;
}
