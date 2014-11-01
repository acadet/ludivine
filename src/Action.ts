/// <reference path="ref.ts" />

/**
 * Actions are shortcuts for typing functions with no outcome
 */

/**
 * @class Action0
 * @brief Action with no args
 */
interface Action0 {
	() : void;
}

/**
 * @class Action
 * @brief Action expecting a single arg
 */
interface Action<T> {
	(t : T) : void;
}

/**
 * @class Action2
 * @brief Action expecting two args
 */
interface Action2<T, U> {
	(t : T, u : U) : void;
}

/**
 * @class Action3
 * @brief Action expecting 3 args
 */
interface Action3<T, U, V> {
	(t : T, u : U, v : V) : void;
}

/**
 * @class Action4
 * @type Action expecting 4 args
 */
interface Action4<T, U, V, W> {
	(t : T, u : U, v : V, w : W) : void;
}
