/// <reference path="ref.ts" />

/**
 * Shortcuts for typing functions
 */

/**
 * @class Func0
 * @brief Function with no args 
 */
interface Func0<U> {
	() : U;
}

/**
 * @class Func
 * @brief Function expecting a single arg
 */
interface Func<T, U> {
	(t: T) : U;
}

/**
 * @class Func2
 * @brief Function expecting 2 args
 */
interface Func2<T, U, V> {
	(t : T, u : U) : V;
}

/**
 * @class Func3
 * @brief Function expecting 3 args
 */
interface Func3<T, U, V, W> {
	(t : T, u : U, v : V) : W
}

/**
 * @class Func4
 * @brief Function expecting 4 args
 */
interface Func4<T, U, V, W, X> {
	(t : T, u : U, v : V, w : W) : X
}
