/// <reference path="../../ref.ts" />

interface IDictionary<K, V> extends ICollection<KeyValuePair<K, V>, IDictionary<K, V>> {
	add(key : K, value : V) : void;

	get(key : K) : V;

	getSize() : number;

	remove(key : K) : void;

	removeIf(func : Func<KeyValuePair<K, V>, boolean>) : void;
}
