/// <reference path="../../ref.ts" />

module CollectionUtils {
	export class CollectionHelper {
		//region Fields

		//endregion Fields

		//region Constructors

		//endregion Constructors

		//region Methods

		//region Private Methods

		/**
		 * Computes extrema from collection
		 * @param {ICollection<T>} source Data source
		 * @param {Func<T, number>} getter Returns comparable value from element
		 * @param {Func2<number, number, boolean>} comparator Comparable function
		 * @return {T} Extrema
		 */
		private static _extrema<T>(
			source : ICollection<T>,
			getter : Func<T, number>,
			comparator : Func2<number, number, boolean>) : T {

			var outcome : T;
			var extrema : number;
			var isFirstTime : boolean;

			isFirstTime = true;
			source.forEach(
				(e) => {
					if (isFirstTime) {
						isFirstTime = false;
						outcome = e;
						extrema = getter(e);
					} else {
						var value : number;

						value = getter(e);

						if (comparator(value, extrema)) {
							outcome = e;
							extrema = value;
						}
					}
				}
			);

			if (isFirstTime) {
				// No element, return default value
				return null;
			} else {
				return outcome;
			}
		}

		//endregion Private Methods

		//region Public Methods

		/**
		 * Computes average value from collection
		 * @param {ICollection<T>} source Data source
		 * @param {Func<T, number>} getter Returns value from any element
		 * @return {number} Average value
		 */
		static average<T>(source : ICollection<T>, getter : Func<T, number>) : number {
			var outcome : number;
			var size : number;

			size = 0;
			outcome = 0;
			source.forEach(
				(x) => {
					outcome += getter(x);
					size++;
				}
			);

			if (size === 0) {
				return 0;
			} else {
				return outcome / size;
			}
		}

		/**
		 * Computes max value from collection
		 * @param {ICollection<T>} source Data source
		 * @param {Func<T, number>} getter Returns value from any element
		 * @return {number} Maximum
		 */
		static max<T>(source : ICollection<T>, getter : Func<T, number>) : T {
			return CollectionHelper._extrema(source, getter, (a, b) => a > b);
		}

		/**
		 * Computes min value from collection
		 * @param {ICollection<T>} source Data source
		 * @param {Func<T, number>} getter Returns value from any element
		 * @return {number} Minimum
		 */
		static min<T>(source : ICollection<T>, getter : Func<T, number>) : T {
			return CollectionHelper._extrema(source, getter, (a, b) => a < b);
		}

		/**
		 * Sums values from collection
		 * @param {ICollection<T>} source Data source
		 * @param {Func<T, number>} getter Gets value to sum from any element
		 * @return {number} sum
		 */
		static sum<T>(source : ICollection<T>, getter : Func<T, number>) : number {
			var outcome : number;

			outcome = 0;
			source.forEach(x => outcome += getter(x));

			return outcome;
		}

		/**
		 * Returns collection as array
		 * @param {ICollection<T>} source Data source
		 * @return {Array<T>} Outcome
		 */
		static toArray<T>(source : ICollection<T>) : Array<T> {
			var outcome : Array<T>;

			outcome = new Array<T>();
			source.forEach(x => outcome.push(x));

			return outcome;
		}

		/**
		 * Returns collection as dictionary
		 * @param {ICollection<T>} source Data source
		 * @param {Func<T, K>} keyGetter Returns key from element
		 * @param {Func<T, V>} valueGetter Returns value from element
		 * @return {IDictionary<K, V>} Outcome
		 */
		static toDictionary<T, K, V>(
			source : ICollection<T>,
			keyGetter : Func<T, K>,
			valueGetter : Func<T, V>) : IDictionary<K, V> {

			var outcome : IDictionary<K, V>;

			outcome = new Dictionary<K, V>();
			source.forEach(x => outcome.add(keyGetter(x), valueGetter(x)));

			return outcome;
		}

		/**
		 * Returns collection as list
		 * @param {ICollection<T>} source Data source
		 * @return {IList<T>} Outcome
		 */
		static toList<T>(source : ICollection<T>) : IList<T> {
			return new ArrayList<T>(source);
		}

		//endregion Public Methods

		//endregion Methods
	}
}
