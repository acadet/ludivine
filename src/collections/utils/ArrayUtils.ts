/// <reference path="../../ref.ts" />

module CollectionUtils {

	/**
	 * @class ArrayUtils
	 * @brief Provides methods for handling arrays
	 */
	export class ArrayUtils {

		/**
		 * Swaps two indexes in provided array
		 */
		private static _swap<T>(source : Array<T>, i : number, j : number) : void {
			var tmp : T;

			tmp = source[i];
			source[i] = source[j];
			source[j] = tmp;
		}

		/**
		 * Applies partition operation to provided array.
		 * At the end, pivot is surrounded by lower and greater 
		 * elements
		 * @param {Array} source Source array
		 * @param {Func} getter Gets value to compare from element in array
		 * @param {Func} comparator Compares two values and return true if first one is lower than other one
		 * @param {number} first Starting index
		 * @param {number} last Ending index
		 * @param {number} pivot Pivot index
		 */
		private static _partition<T, U>(
			source : Array<T>,
			getter : Func<T, U>,
			comparator : Func2<U, U, boolean>,
			first : number,
			last : number,
			pivot : number) : number {

			var j : number;
			var pivotValue : U;

			j = pivot;
			pivotValue = getter(source[pivot]);

			for (var i = first; i <= last; i++) {
				var value : U;

				value = getter(source[i]);

				if (comparator(value, pivotValue)) {
					if (j < i) {
						// Pivot is before lower value
						// Swap with value just after pivot
						ArrayUtils._swap(source, j + 1, i);
						ArrayUtils._swap(source, j, j + 1);
						j++;
					}
				} else {
					if (i < j) {
						// Pivot is after greater value
						ArrayUtils._swap(source, i, j);
						j = i;
					}
				}
			}

			return j;
		}

		/**
		 * Inner operation for sorting an array
		 * @param {Array} source Array to sort
		 * @param {Func} getter Gets comparable value from element in array
		 * @param {Func} comparator Comparator function
		 * @param {number} first Starting index
		 * @param {number} last Ending index
		 */
		private static _sort<T, U>(
			source : Array<T>,
			getter : Func<T, U>,
			comparator : Func2<U, U, boolean>,
			first : number,
			last : number) : void {

			if (first < last) {
				var pivot : number;

				// Choose random pivot
				pivot = Math.round(Math.random() * (last - first));
				// Get final index of pivot
				pivot = ArrayUtils._partition(source, getter, comparator, first, last, pivot);

				// Sort other parts
				ArrayUtils._sort(source, getter, comparator, first, pivot - 1);
				ArrayUtils._sort(source, getter, comparator, pivot + 1, last);
			}
		}

		/**
		 * Sorts provided array
		 * @param {Array} source Array to sort
		 * @param {Func} getter Returns comparable value from any element
		 * @param {boolean} asc Sets ascending sort (default) or no
		 */
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
