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
			base : number) : number {

			var j : number;
			var baseValue : U;

			ArrayUtils._swap(source, base, last);
			j = first;
			baseValue = getter(source[last]);

			for (var i = first; i < last - 1; i++) {
				var a : U;

				a = getter(source[i]);
				if (comparator(a, baseValue)) {
					ArrayUtils._swap(source, i, j);
					j++;
				}
			}

			ArrayUtils._swap(source, j, last);
			return j;
		}

		private static _sort<T, U>(
			source : Array<T>,
			getter : Func<T, U>,
			comparator : Func2<U, U, boolean>,
			first : number,
			last : number) : void {

			if (first < last) {
				var base : number;

				base = Math.round(Math.random() * (last - first));
				base = ArrayUtils._partition(source, getter, comparator, first, last, base);

				ArrayUtils._sort(source, getter, comparator, first, base - 1);
				ArrayUtils._sort(source, getter, comparator, base + 1, last);
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
