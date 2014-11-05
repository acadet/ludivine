/// <reference path="../../ref.ts" />

/**
 * @class IDictionary
 * @brief Dictionary interface
 */
interface IDictionary<K, V> extends ICollection<KeyValuePair<K, V>> {

	/**
	 * Adds new key/value pair. Throws error if key is already existing
	 * @param {K} key   Key
	 * @param {V} value Value
	 */
	add(key : K, value : V) : void;

	/**
	 * Gets value from provided key. Throws error if key does not exist
	 * @param  {K} key Key
	 * @return {V}     Paired value
	 */
	get(key : K) : V;

	/**
	 * Returns size of dictionary
	 * @return {number} Size
	 */
	getSize() : number;

	/**
	 * Tests if key exists
	 * @param  {K}       key Key
	 * @return {boolean}     True if key exists
	 */
	hasKey(key : K) : boolean;

	/**
	 * Removes pair from dictionary. Throws error if key does not exist
	 * @param {K} key Key
	 */
	remove(key : K) : void;

	/**
	 * Removes each pair matching provided condition
	 * @param {Func<KeyValuePair<K, V>, boolean>} func Returns true if element has to be removed
	 */
	removeIf(func : Func<KeyValuePair<K, V>, boolean>) : void;
}
