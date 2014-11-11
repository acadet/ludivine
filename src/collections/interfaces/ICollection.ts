/// <reference path="../../ref.ts" />

/**
 * @class ICollection
 * @description Base interface for collections. Provides generic operations.
 * Returns new instance of called collection everytime.
 */
interface ICollection<T> {
	average(getter : Func<T, number>) : number;

	exists(selector : Func<T, boolean>) : boolean;

	/**
	 * Finds first element matching condition. Default result is null
	 * @param  {Func<T, boolean>} selector Condition to match
	 * @return {T} Found element or null
	 */
	find(selector : Func<T, boolean>) : T;

	/**
	 * Applies provided action to each element of collection.
	 * Mind order of collection is preserved
	 * @param {Action<T>} action Application
	 */
	forEach(action : Action<T>) : void;

	intersect(collection : ICollection<T>) : ICollection<T>;

	/**
	 * Applies operation to each element and returns edited collection
	 * @param  {Func<T, T>} action Map operation
	 * @return {S} New edited collection
	 */
	map(action : Func<T, T>) : ICollection<T>;

	/**
	 * Computes maximum from elements using provided getter
	 * @param  {Func<T, number>} getter Returns value to use for any element
	 * @return {T} Maximum
	 */
	max(getter : Func<T, number>) : T;

	/**
	 * Computes minimum from elements using provided getter
	 * @param  {Func<T, number>} getter Returns value to use for any element
	 * @return {T} Minimum
	 */
	min(getter : Func<T, number>) : T;

	/**
	 * Applies a filter on collection
	 * @param  {Func<T, boolean>} selector Returns true if element must be kept
	 * @return {S} New filtered collection
	 */
	select(selector : Func<T, boolean>) : ICollection<T>;

	/**
	 * Sums values from elements using provided getter
	 * @param  {Func<T, number>} getter Returns value to sum for any element
	 * @return {number} Amount
	 */
	sum(getter : Func<T, number>) : number;

	/**
	 * Reproduces collection as an array
	 * @return {Array<T>} Outcome array
	 */
	toArray() : Array<T>;

	/**
	 * Reproduces collection as a dictionary
	 * @param {Func<T, K>} keyGetter Returns key from source element
	 * @param {Func<T, V>} valueGetter Returns value from source element
	 * @return {IDictionary<K, V>} Outcome IDictionary
	 */
	toDictionary<K, V>(keyGetter : Func<T, K>, valueGetter : Func<T, V>) : IDictionary<K, V>;

	/**
	 * Reproduces collection as a list
	 * @return {IList<T>} Outcome IList
	 */
	toList() : IList<T>;

	union(collection : ICollection<T>) : ICollection<T>;

	uniq() : ICollection<T>;
}
