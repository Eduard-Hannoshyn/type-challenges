/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in

  ### Question

  Implement the built-in `Omit<T, K>` generic without using it.

  Constructs a type by picking all properties from `T` and then removing `K`

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/3
*/

/* _____________ Your Code Here _____________ */

type MyOmit<T extends object, U extends keyof T> = {
    [K in keyof T as ({
        [P in K]: P
    } & {
        [P in U]: never
    })[K]]: T[K]
}

// type MyOmit<T extends object, U extends keyof T> = {
//     [K in keyof T as K extends U ? never : K]: T[K]
// }

// type MyOmit<T extends object, K extends keyof T> = {
//     [P in Exclude<keyof T, K>]: T[P]
// }

// type MyOmit<T extends object, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


/* _____________ Test Cases _____________ */
import type {Equal, Expect} from '@type-challenges/utils'

// @ts-ignore
type cases = [
    Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
    Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
    title: string
    description: string
    completed: boolean
}

interface Expected1 {
    title: string
    completed: boolean
}

interface Expected2 {
    title: string
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/

