/// <reference path="../../ref.ts" />

interface ISortableCollection<T, S extends ISortableCollection<any, any>> extends ICollection<T, S> {
	orderBy<U>(getter : Func<T, U>) : S;

	orderByDesc<U>(getter : Func<T, U>) : S;

	reverse() : S;
}
