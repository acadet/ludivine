/// <reference path="../ref.ts" />

module Mocks {
	export class Collection<T> implements ICollection<T> {
		private _findArgs : Array<any>;
		private _forEachArgs : Array<any>;
		private _mapArgs : Array<any>;
		private _maxArgs : Array<any>;
		private _minArgs : Array<any>;
		private _selectArgs : Array<any>;
		private _sumArgs : Array<any>;
		private _toArrayArgs : Array<any>;
		private _toDictionaryArgs : Array<any>;
		private _toListArgs : Array<any>;

		private _findTimes : number;
		private _forEachTimes : number;
		private _mapTimes : number;
		private _maxTimes : number;
		private _minTimes : number;
		private _selectTimes : number;
		private _sumTimes : number;
		private _toArrayTimes : number;
		private _toDictionaryTimes : number;
		private _toListTimes : number;

		private _findOutcome : T;
		private _forEachOutcome : Array<T>;
		private _mapOutcome : ICollection<T>;
		private _maxOutcome : T;
		private _minOutcome : T;
		private _selectOutcome : ICollection<T>;
		private _sumOutcome : number;
		private _toArrayOutcome : Array<T>;
		private _toDictionaryOutcome : any;
		private _toListOutcome : IList<T>;

		constructor() {
			this._findTimes = 0;
			this._forEachTimes = 0;
			this._mapTimes = 0;
			this._maxTimes = 0;
			this._minTimes = 0;
			this._selectTimes = 0;
			this._sumTimes = 0;
			this._toArrayTimes = 0;
			this._toDictionaryTimes = 0;
			this._toListTimes = 0;
		}

		//region ICollection

		find(selector : Func<T, boolean>) : T {
			this._findTimes++;
			this._findArgs = [selector];
			return this._findOutcome;
		}

		forEach(action : Action<T>) : void {
			this._forEachTimes++;
			this._forEachArgs = [action];

			for (var i = 0; i < this._forEachOutcome.length; i++) {
				action(this._forEachOutcome[i]);
			}
		}

		map(action : Func<T, T>) : ICollection<T> {
			this._mapTimes++;
			this._mapArgs = [action];
			return this._mapOutcome;
		}

		max(getter : Func<T, number>) : T {
			this._maxTimes++;
			this._mapArgs = [getter];
			return this._maxOutcome;
		}

		min(getter : Func<T, number>) : T {
			this._minTimes++;
			this._minArgs = [getter];
			return this._minOutcome;
		}

		select(selector : Func<T, boolean>) : ICollection<T> {
			this._selectTimes++;
			this._selectArgs =  [selector];
			return this._selectOutcome;
		}

		sum(getter : Func<T, number>) : number {
			this._sumTimes++;
			this._sumArgs = [getter];
			return this._sumOutcome;
		}

		toArray() : Array<T> {
			this._toArrayTimes++;
			this._toArrayArgs = [];
			return this._toArrayOutcome;
		}

		toDictionary<K, V>(keyGetter : Func<T, K>, valueGetter : Func<T, V>) : IDictionary<K, V> {
			this._toDictionaryTimes++;
			this._toDictionaryArgs = [keyGetter, valueGetter];
			return this._toDictionaryOutcome;
		}
		
		toList() : IList<T> {
			this._toListTimes++;
			this._toListArgs = [];
			return this._toListOutcome;
		}

		//endregion ICollection

		//region Mock

		FindArgs() : Array<any> {
			return this._findArgs;
		}

		ForEachArgs() : Array<any> {
			return this._forEachArgs;
		}

		MapArgs() : Array<any> {
			return this._mapArgs;
		}

		MaxArgs() : Array<any> {
			return this._maxArgs;
		}

		MinArgs() : Array<any> {
			return this._minArgs;
		}

		SelectArgs() : Array<any> {
			return this._selectArgs;
		}

		SumArgs() : Array<any> {
			return this._sumArgs;
		}

		ToArrayArgs() : Array<any> {
			return this._toArrayArgs;
		}

		ToDictionaryArgs() : Array<any> {
			return this._toDictionaryArgs;
		}

		ToListArgs() : Array<any> {
			return this._toListArgs;
		}

		FindTimes() : number {
			return this._findTimes;
		}

		ForEachTimes() : number {
			return this._forEachTimes;
		}

		MapTimes() : number {
			return this._mapTimes;
		}

		MaxTimes() : number {
			return this._maxTimes;
		}

		MinTimes() : number {
			return this._minTimes;
		}

		SelectTimes() : number {
			return this._selectTimes;
		}

		SumTimes() : number {
			return this._sumTimes;
		}

		ToArrayTimes() : number {
			return this._toArrayTimes;
		}

		ToDictionaryTimes() : number {
			return this._toDictionaryTimes;
		}

		ToListTimes() : number {
			return this._toListTimes;
		}

		FindOutcome(value : T) : void {
			this._findOutcome = value;
		}

		ForEachOutcome(value : Array<T>) : void {
			this._forEachOutcome = value;
		}

		MapOutcome(value : ICollection<T>) : void {
			this._mapOutcome = value;
		}

		MaxOutcome(value : T) : void {
			this._maxOutcome = value;
		}

		MinOutcome(value : T) : void {
			this._minOutcome = value;
		}

		SelectOutcome(value : ICollection<T>) : void {
			this._selectOutcome = value;
		}

		SumOutcome(value : number) : void {
			this._sumOutcome = value;
		}

		ToArrayOutcome(value : Array<T>) : void {
			this._toArrayOutcome = value;
		}

		ToDictionaryOutcome(value : any) : void {
			this._toDictionaryOutcome = value;
		}

		ToListOutcome(value : IList<T>) : void {
			this._toListOutcome = value;
		}

		//endregion Mock
	}
}
