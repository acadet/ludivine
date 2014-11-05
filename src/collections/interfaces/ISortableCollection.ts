/// <reference path="../../ref.ts" />

/**
 * @class ISortableCollection
 * @description Interface for any sortable collection (where there is an order relation).
 * Returns new collection with called typing
 */
interface ISortableCollection<T> extends ICollection<T> {

	/**
	 * Orders collection using ascending method
	 * @param {Func<T, U>} getter Returns comparable value
	 * @return {S} Ordered collection
	 */
	orderBy<U>(getter : Func<T, U>) : ISortableCollection<T>;

	/**
	 * Orders collection using descending method
	 * @param {Func<T, U>} getter Returns comparable value
	 * @return {S} Ordered collection
	 */
	orderByDesc<U>(getter : Func<T, U>) : ISortableCollection<T>;

	/**
	 * Reverses whole collection order
	 * @return {S} Reversed collection
	 */
	reverse() : ISortableCollection<T>;
}
