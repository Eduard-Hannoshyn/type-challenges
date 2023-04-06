// interface User {
//     name: string,
//     age: number
//     job: string;
// }
//
// type ClassConstructor<T> = new(...args: any[]) => T;
//
// const SayHiFuncDecorator = <T extends ClassConstructor<User>>(Class: T) => {
//     return class Decorator extends Class {
//
//         constructor(...args: any[]) {
//             super(...args)
//         }
//
//         sayHi() {
//             console.log(`${this.name} ${this.age}`);
//         }
//     }
//
// }
//
// @SayHiFuncDecorator
// class CreateUser implements User {
//     constructor(
//         public name: string,
//         public age: number,
//         public job: string
//     ) {
//     }
// }
//
//
// const CreateUserWithDecorator = SayHiFuncDecorator(CreateUser);
// const userWithDecorator = new CreateUserWithDecorator("Eduard", 27, "Frontend")
// userWithDecorator.sayHi()
// const user = new CreateUser("Eduard", 28, "Frontend");
// user.sayHi();
// @ts-ignore
// @ts-ignore


// interface PrinterConstructor {
//     name: string;
//     message: string;
//
//     showMessage(): void;
//
//     showDescription(): void;
// }


// interface PrinterConstructorProto {
//
//     showMessage(): void;
//
//     showDescription(): void;
// }
//
// type ClassConstructor<T> = new(...ars: any[]) => T;
//
// const AutoBind = <T extends ClassConstructor<PrinterConstructor>>(Class: T) => {
//     return class extends Class {
//         constructor(...props: any[]) {
//             super(...props);
//
//             for (const k of Reflect.ownKeys(Class.prototype)) {
//                 const key = k as keyof PrinterConstructor;
//
//                 if (typeof this[key] === "function") {
//                     this[key] = this[key].bind(this);
//                 }
//             }
//         }
//
//     }
// }

// const methodAutoBind = (classPrototype: {}, methodName: string, descriptor: PropertyDescriptor) => {
//     return {
//         enumerable: descriptor.enumerable,
//         configurable: descriptor.configurable,
//         get() {
//             return descriptor.value.bind(this)
//         }
//     }
// }
//
// @AutoBind
// class Printer implements PrinterConstructor {
//     constructor(public name: string) {
//     }
//
//     message = "this works";
//
//     // @methodAutoBind
//     showMessage() {
//         console.log(this.message)
//     }
//
//     // @methodAutoBind
//     showDescription() {
//         console.log(this.name)
//     }
// }
//
// // const PrinterWithAutoBind = AutoBind(Printer);
// // const p = new PrinterWithAutoBind("Samsung");/
//
// const p = new Printer("Samsung");
// const button = document.querySelector("button")!;
// button.addEventListener('click', p.showMessage)
// button.addEventListener('click', p.showDescription)

// enum ValidationType {
//     required = "required",
//     positive = "positive",
//     notJS = "javaScript"
// }
//
// interface ValidatorConfig {
//     [property: string]: {
//         [validatableProp: string]: ValidationType[]
//     }
// }
//
// const registerValidators: ValidatorConfig = {};
//
// function Required(classPrototype: {}, propertyName: string) {
//     registerValidators[classPrototype.constructor.name] = {
//         ...registerValidators[classPrototype.constructor.name],
//         [propertyName]: [
//             ...registerValidators[classPrototype.constructor.name]?.[propertyName] ?? [],
//             ValidationType.required
//         ]
//     }
// }
//
// function Positive(classPrototype: {}, propertyName: string) {
//     registerValidators[classPrototype.constructor.name] = {
//         ...registerValidators[classPrototype.constructor.name],
//         [propertyName]: [
//             ...registerValidators[classPrototype.constructor.name]?.[propertyName] ?? [],
//             ValidationType.positive
//         ]
//     }
// }
//
// function NotJS(classPrototype: {}, propertyName: string) {
//     registerValidators[classPrototype.constructor.name] = {
//         ...registerValidators[classPrototype.constructor.name],
//         [propertyName]: [
//             ...registerValidators[classPrototype.constructor.name]?.[propertyName] ?? [],
//             ValidationType.notJS
//         ]
//     }
// }
//
// function validate(obj: any) {
//     const objValidatorConfig = registerValidators[obj.constructor.name];
//     let isValid = true;
//
//     if (!objValidatorConfig) {
//         return true;
//     }
//
//     for (const key in objValidatorConfig) {
//         for (const validator of objValidatorConfig[key]) {
//             switch (validator) {
//                 case ValidationType.required:
//                     isValid &&= !!obj[key];
//                     break;
//                 case  ValidationType.positive:
//                     isValid &&= obj[key] > 0;
//                     break;
//                 case  ValidationType.notJS:
//                     isValid &&= obj[key] !== ValidationType.notJS;
//                     break;
//             }
//         }
//     }
//
//     return isValid;
// }
//
// type ClassConstructor<T> = new(...ars: any[]) => T;
//
//
// function Validate(errFunc: () => void) {
//     return <T extends ClassConstructor<any>>(Class: T) => {
//         return class extends Class {
//             constructor(...props: any[]) {
//                 super(...props);
//
//                 const objValidatorConfig = registerValidators[Class.name];
//                 let isValid = true;
//
//                 if (objValidatorConfig) {
//                     for (const key in objValidatorConfig) {
//                         for (const validator of objValidatorConfig[key]) {
//                             switch (validator) {
//                                 case ValidationType.required:
//                                     isValid &&= !!this[key];
//                                     break;
//                                 case  ValidationType.positive:
//                                     isValid &&= this[key] > 0;
//                                     break;
//                                 case  ValidationType.notJS:
//                                     isValid &&= this[key] !== ValidationType.notJS;
//                                     break;
//                             }
//                         }
//                     }
//                 }
//
//                 if (!isValid) {
//                     errFunc();
//                 }
//             }
//         }
//     }
// }
//
//
// @Validate(() => alert("Invalid input, please try again!"))
// class Course {
//     @NotJS
//     @Required
//     title: string;
//     @Positive
//     price: number;
//
//     constructor(t: string, p: number) {
//         this.title = t;
//         this.price = p;
//     }
//
//
// }
//
// const courseForm = document.querySelector('form')!;
// courseForm.addEventListener("submit", event => {
//     event.preventDefault();
//
//     const title = document.getElementById('title') as HTMLInputElement
//     const price = document.getElementById('price') as HTMLInputElement
//     const course = new Course(title.value, +price.value);
//
//     // if (!validate(course)) {
//     //     alert("Invalid input, please try again!");
//     //     return;
//     // }
//     //
//     console.log(course)
// })

// 1 1 2 3 5 8 13

// const fib = (n: number) => {
//     let prevNum = 1;
//     let num = 1;
//
//     for (let i = 2; i < n; i++) {
//         const newNum = num + prevNum;
//         prevNum = num;
//         num = newNum;
//     }
//
//     return num
// }

// const fib = (n: number): number => {
//     if (n === 1 || n === 2) return 1;
//
//     return fib(n - 1) + fib(n - 2)
// };

// console.log(fib(7)); // 13


// const polindrom = (words: string) => {
//     return words.split('').reverse().join('') === words;
// }

// console.log(polindrom("aabbaa"))
// console.log(polindrom("aabaB"))
// console.log(polindrom("aZazA"))

// function one(callback?: Function) {
//     if (typeof callback === 'function') {
//         return callback(1)
//     }
//
//     return 1
// }
//
// function two() {
// }
//
// function three(callback?: Function) {
//     if (typeof callback === 'function') {
//         return callback(3)
//     }
//
//     return 3
// }
//
// function four(callback?: Function) {
//     if (typeof callback === 'function') {
//         return callback(4)
//     }
//
//     return 4
// }
//
// function five() {
// }
//
// function six() {
// }
//
// function seven() {
// }
//
// function eight() {
// }
//
// function nine() {
// }
//
// function plus(callback: number) {
//     return (prevNum: number) => {
//             return prevNum + callback;
//     }
// }
//
// function minus() {
// }
//
// function divide() {
// }
//
// function mult(callback?: Function | number) {
//     return (prevNum: number) => {
//         if (typeof callback === "number") {
//             return prevNum * callback;
//         }
//     }
// }
//
//
// console.log(one(plus(three()))); //4
// console.log(four(mult(three()))); //12
//
// console.log(four(mult(three((plus(three())))))); //24


// interface Concerts {
//     [key: string]: Date;
// }
//
// const concerts = {
//     kiev: new Date("2023-01-02"),
//     lviv: new Date("2023-05-02"),
//     kharkiv: new Date("2023-03-02"),
//     odessa: new Date("2023-04-02"),
// }
//
// function concertsToArray(concerts: Concerts) {
//     return Object.entries(concerts).filter(([_, date]) => {
//         return Date.now() < date.getTime();
//     }).sort(([_, aDate], [_1, bDate]) => {
//         return aDate.getTime() - bDate.getTime();
//     }).map(([city]) => {
//         return city
//     })
// }
//
// console.log(concertsToArray(concerts));

// const matrix = [
//     'XOOXO',
//     'XOOXO',
//     'OOOXO',
//     'XXOXO',
//     'OX000',
// ]
//
// const calculatePerimetr = (matrix: string[]) => {
//     const arrMatrix = matrix.map((row) => {
//         return row.split('');
//     })
//
//     let p = 0;
//
//     arrMatrix.forEach((row, rowIndex) => {
//         row.forEach((item, itemIndex) => {
//             if (item === "X") {
//                 let itemP = 4;
//
//                 const prevRowIndex = rowIndex - 1;
//                 const nextRowIndex = rowIndex + 1;
//
//                 const prevItemIndex = itemIndex - 1;
//                 const nextItemIndex = itemIndex + 1;
//
//                 if (prevRowIndex >= 0) {
//                     const prevRowItem = arrMatrix[prevRowIndex][itemIndex];
//
//                     if (prevRowItem === "X") {
//                         itemP--
//                     }
//                 }
//
//                 if (nextRowIndex <= arrMatrix.length - 1) {
//                     const nextRowItem = arrMatrix[nextRowIndex][itemIndex];
//
//                     if (nextRowItem === "X") {
//                         itemP--
//                     }
//                 }
//
//                 if (prevItemIndex >= 0) {
//                     const prevItemItem = arrMatrix[rowIndex][prevItemIndex];
//
//                     if (prevItemItem === "X") {
//                         itemP--
//                     }
//                 }
//
//                 if (nextItemIndex <= row.length - 1) {
//                     const nextItemItem = arrMatrix[rowIndex][nextItemIndex];
//
//                     if (nextItemItem === "X") {
//                         itemP--
//                     }
//                 }
//
//                 p += itemP;
//             }
//         })
//     })
//
//     return p
// }
//
// console.log(calculatePerimetr(matrix));

// const arr = [1, 1, 2, 2, 3, 4, 5, 5];

// function withoutRepeat(arr: number[]) {
//     const temp: { [key: string]: boolean } = {}
//
//     for (const item of arr) {
//         temp[item] = !temp[item] ? true : false;
//     }
//
//     return Object.keys(temp).filter(([key]) => temp[key])
// }
//
// console.log(withoutRepeat(arr))

// interface TreeItem {
//     v: number,
//     c?: Tree,
// }
//
// type Tree = TreeItem[]
//
// const tree: Tree = [
//     {
//         v: 4,
//     },
//     {
//         v: 3,
//         c: [
//             {
//                 v: 7,
//                 c: [
//                     {
//                         v: 8
//                     }
//                 ]
//             },
//             {
//                 v: 6,
//             },
//             {
//                 v: 5,
//             }
//
//         ]
//     },
//     {
//         v: 2,
//     },
//     {
//         v: 1,
//     }
// ]
//
//
// function getTreeSum(tree: Tree) {
//     const result: number[] = [];
//     let stack = window.structuredClone(tree);
//
//     while (stack.length > 0) {
//         const item = stack.shift()!;
//
//         result.push(item.v)
//
//         if (Array.isArray(item.c)) {
//             stack = [...item.c, ...stack];
//         }
//     }
//
//     return result
// }
//
// function getTreeSums(tree: Tree) {
//     let result: number[] = [];
//
//     tree.forEach((item) => {
//         result.push(item.v);
//
//         if (Array.isArray(item.c)) {
//             const nestedResult = getTreeSum(item.c)
//
//             result = [...result, ...nestedResult]
//         }
//     })
//
//     return result;
// }
//
// //
// console.log(getTreeSum(tree))
// console.log(getTreeSums(tree))

// ==============================

// type Prop<T> = {
//     get: () => T;
//     set: (t: T) => void,
// }
//
// function createProp<T>(val: T): Prop<T> {
//     return {
//         get() {
//             return val
//         },
//         set(v: T) {
//             val = v
//         }
//     }
// }
//
// const props = {
//     name: createProp("liz"),
//     age: createProp(10)
// }
//
// type Props = typeof props;
// type Key = keyof Props
//
// const a = props.name;
// const b = a.get();
// a.set(b);
//
// function x(k: Key) {
//     const y = props[k];
//     const z = y.get();
//     y.set(z)
// }

// ==============================

// type Prop<T> = {
//     get: () => T;
//     set: (t: T) => void,
// }
//
// function createProp<T>(val: T) {
//     return {
//         get(): T {
//             return val
//         },
//         set(v: T): void {
//             val = v
//         }
//     }
// }
//
// type Prop<T> = ReturnType<typeof createProp<T>>
//
// type PropMap = {
//     name: string,
//     age: number,
//     date: Date
// }
//
// type Props2 = {
//     [PropName in keyof PropMap]: Prop<PropMap[PropName]>
// }
//
// const props: Props2 = {
//     name: createProp("liz"),
//     age: createProp(10),
//     date: createProp(new Date())
// }
//
// // type Props = typeof props;
// // type Key = keyof Props
//
// const a = props.name;
// const b = a.get();
// a.set(b);
//
// function x<K extends keyof Props2>(k: K) {
//     const y = props[k];
//     const z = y.get();
//     y.set(z)
// }







