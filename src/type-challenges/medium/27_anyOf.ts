/*
  949 - AnyOf
  -------
  by null (@kynefuk) #medium #array

  ### Question

  Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.

  For example:

  ```ts
  type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
  ```

  > View on GitHub: https://tsch.js.org/949
*/

import type { Equal, Expect } from '@type-challenges/utils'

/* _____________ Your Code Here _____________ */
type Falsy = [[], {}, 0, '', false, null, undefined];
type IsFalsy<T, F extends any[] = Falsy> = F extends [infer Q, ...infer R] ? Q extends T ? true : IsFalsy<T, R> : false;
type AnyOf<T extends readonly any[]> = T extends [infer Q, ...infer R] ? IsFalsy<Q> extends false ? true : AnyOf<R> : false;

// @ts-ignore
type c = [
    Expect<Equal<IsFalsy<[1, 2]>, false>>,
    Expect<Equal<IsFalsy<{a: 1}>, false>>,
    Expect<Equal<IsFalsy<1>, false>>,
    Expect<Equal<IsFalsy<'1'>, false>>,
    Expect<Equal<IsFalsy<true>, false>>,
    Expect<Equal<IsFalsy<[]>, true>>,
    Expect<Equal<IsFalsy<{}>, true>>,
    Expect<Equal<IsFalsy<0>, true>>,
    Expect<Equal<IsFalsy<''>, true>>,
    Expect<Equal<IsFalsy<false>, true>>,
    Expect<Equal<IsFalsy<null>, true>>,
    Expect<Equal<IsFalsy<undefined>, true>>,
]


// /* _____________ Test Cases _____________ */

// @ts-ignore
type cases = [
    Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
    Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
    Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
    Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
    Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
    Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
    Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
    Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
    Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
    Expect<Equal<AnyOf<[]>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/949/answer
  > View solutions: https://tsch.js.org/949/solutions
  > More Challenges: https://tsch.js.org
*/
