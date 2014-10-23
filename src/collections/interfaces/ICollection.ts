/// <reference path="../../ref.ts" />

// enum SchedulerValue {
// 	Greater = 1,
// 	Equal = 0,
// 	Lower = -1
// }

interface ICollection<T> {
	select(selector : Func<T, boolean>) : ICollection<T>;

	forEach(action : Action<T>) : void;

	find(selector : Func<T, boolean>) : T;

	map<U>(action : Func<T, U>) : ICollection<U>;

	orderBy<U>(getter : Func<T, U>) : ICollection<T>;

	orderByDesc<U>(getter : Func<T, U>) : ICollection<T>;

	reverse() : ICollection<T>;

	sum(getter : Func<T, number>) : number;

	min(getter : Func<T, number>) : T;

	max(getter : Func<T, number>) : T;
}
