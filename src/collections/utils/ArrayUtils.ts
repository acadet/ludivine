/// <reference path="../../ref.ts" />

module CollectionUtils {
	export class ArrayUtils {
		private static _swap<T>(source : Array<T>, i : number, j : number) : void {
			var tmp : T;

			tmp = source[i];
			source[i] = source[j];
			source[j] = tmp;
		}

		private static _partition<T, U>(
			source : Array<T>,
			getter : Func<T, U>,
			comparator : Func2<U, U, boolean>,
			first : number,
			last : number,
			pivot : number) : number {

			var j : number;
			var baseValue : U;

			j = pivot;
			baseValue = getter(source[pivot]);

			for (var i = first; i <= last; i++) {
				var value : U;

				value = getter(source[i]);

				if (comparator(value, baseValue)) {
					if (j < i) {
						ArrayUtils._swap(source, j + 1, i);
						ArrayUtils._swap(source, j, j + 1);
						j++;
					}
				} else {
					if (i < j) {
						ArrayUtils._swap(source, i, j);
						j = i;
					}
				}
			}

			return j;
		}

		private static _sort<T, U>(
			source : Array<T>,
			getter : Func<T, U>,
			comparator : Func2<U, U, boolean>,
			first : number,
			last : number) : void {

			if (first < last) {
				var pivot : number;

				pivot = Math.round(Math.random() * (last - first));
				pivot = ArrayUtils._partition(source, getter, comparator, first, last, pivot);

				ArrayUtils._sort(source, getter, comparator, first, pivot - 1);
				ArrayUtils._sort(source, getter, comparator, pivot + 1, last);
			}
		}

		static sort<T, U>(source : Array<T>, getter : Func<T, U>, asc : boolean = true) : void {
			var comparator : Func2<U, U, boolean>;

			if (source.length === 0) {
				return;
			}

			if (asc) {
				comparator = (a, b) => {
					return a <= b;
				};
			} else {
				comparator = (a, b) => {
					return a >= b;
				};
			}

			ArrayUtils._sort(source, getter, comparator, 0, source.length - 1);
		}
	}
}
