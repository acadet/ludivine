/// <reference path="../../ref.ts" />

interface ICollection<T, S extends ICollection<any, any>> {
	select(selector : Func<T, boolean>) : S;

	forEach(action : Action<T>) : void;

	find(selector : Func<T, boolean>) : T;

	map(action : Func<T, T>) : S;

	/**
	 * Casts list to an array
	 * @return {Array<T>} [description]
	 */
	toArray() : Array<T>;

	sum(getter : Func<T, number>) : number;

	min(getter : Func<T, number>) : T;

	max(getter : Func<T, number>) : T;
}
