"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mock = void 0;
// todo: abstract methods
// todo: add passthrough to original methods
// todo: non-method fields, maybe?
// todo: investigate getters
/**
 * Returns a Mocked object of the given class.
 * Currently only supports concrete classes and instance methods for the class.
 */
function mock(classToMock) {
    const mockedObject = {};
    function setupMethodsFromPrototype(proto) {
        if (proto === null || proto === Object.prototype) {
            return;
        }
        for (const key of Object.getOwnPropertyNames(proto)) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, key);
            if (typeof descriptor.value === "function" &&
                key !== "constructor") {
                mockedObject[key] = jasmine.createSpy(key);
            }
        }
        setupMethodsFromPrototype(Object.getPrototypeOf(proto));
    }
    setupMethodsFromPrototype(classToMock.prototype);
    return mockedObject;
}
exports.mock = mock;
