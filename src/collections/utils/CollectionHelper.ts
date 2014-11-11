/// <reference path="../../ref.ts" />

module CollectionUtils {
	export class CollectionHelper {
		//region Fields
		
		//endregion Fields
		
		//region Constructors
		
		//endregion Constructors
		
		//region Methods
		
		//region Private Methods

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

		static max<T>(source : ICollection<T>, getter : Func<T, number>) : T {
			return CollectionHelper._extrema(source, getter, (a, b) => a > b);
		}

		static min<T>(source : ICollection<T>, getter : Func<T, number>) : T {
			return CollectionHelper._extrema(source, getter, (a, b) => a < b);
		}

		static sum<T>(source : ICollection<T>, getter : Func<T, number>) : number {
			var outcome : number;

			outcome = 0;
			source.forEach(x => outcome += getter(x));

			return outcome;
		}

		static toArray<T>(source : ICollection<T>) : Array<T> {
			var outcome : Array<T>;

			outcome = new Array<T>();
			source.forEach(x => outcome.push(x));

			return outcome;
		}

		static toDictionary<T, K, V>(
			source : ICollection<T>,
			keyGetter : Func<T, K>,
			valueGetter : Func<T, V>) : IDictionary<K, V> {

			var outcome : IDictionary<K, V>;

			outcome = new Dictionary<K, V>();
			source.forEach(x => outcome.add(keyGetter(x), valueGetter(x)));

			return outcome;
		}
		
		//endregion Public Methods
		
		//endregion Methods
	}
}
