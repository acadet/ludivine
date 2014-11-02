/// <reference path="../../ref.ts" />

/**
 * @class ICollection
 * @description Base interface for collections. Provides generic operations.
 * Returns new instance of called collection everytime.
 */
interface ICollection<T, S extends ICollection<any, any>> {

	/**
	 * Applies a filter on collection
	 * @param  {Func<T, boolean>} selector Returns true if element must be kept
	 * @return {S} New filtered collection
	 */
	select(selector : Func<T, boolean>) : S;

	/**
	 * Applies provided action to each element of collection.
	 * Mind order of collection is preserved
	 * @param {Action<T>} action Application
	 */
	forEach(action : Action<T>) : void;

	/**
	 * Finds first element matching condition. Default result is null
	 * @param  {Func<T, boolean>} selector Condition to match
	 * @return {T} Found element or null
	 */
	find(selector : Func<T, boolean>) : T;

	/**
	 * Applies operation to each element and returns edited collection
	 * @param  {Func<T, T>} action Map operation
	 * @return {S} New edited collection
	 */
	map(action : Func<T, T>) : S;

	/**
	 * Casts collection to an array
	 * @return {Array<T>} Outcome array
	 */
	toArray() : Array<T>;

	/**
	 * Sums values from elements using provided getter
	 * @param  {Func<T, number>} getter Returns value to sum for any element
	 * @return {number} Amount
	 */
	sum(getter : Func<T, number>) : number;

	/**
	 * Computes minimum from elements using provided getter
	 * @param  {Func<T, number>} getter Returns value to use for any element
	 * @return {T} Minimum
	 */
	min(getter : Func<T, number>) : T;

	/**
	 * Computes maximum from elements using provided getter
	 * @param  {Func<T, number>} getter Returns value to use for any element
	 * @return {T} Maximum
	 */
	max(getter : Func<T, number>) : T;
}
