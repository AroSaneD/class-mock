/// <reference types="jest" />
declare type Constructor<T> = Function & {
    prototype: T;
};
export declare type Mocked<T> = T & {
    [P in keyof T]: T[P] & jasmine.Spy;
};
/**
 * Returns a Mocked object of the given class.
 * Currently only supports concrete classes and instance methods for the class.
 */
export declare function mock<T>(classToMock: Constructor<T>): Mocked<T>;
export {};
