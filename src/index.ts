declare type Constructor<T> = new (...args: any[]) => T;

export type Mocked<T> = T & { [P in keyof T]: T[P] & jasmine.Spy };

// todo: abstract methods
// todo: add passthrough to original methods
// todo: non-method fields, maybe?
/**
 * Returns a Mocked object of the given class. 
 * Currently only supports concrete classes and instance methods for the class.
 */
export function mock<T>(classToMock: Constructor<T>): Mocked<T> {
    const mockedObject: any = {};

    function setupMethodsFromPrototype(proto: any) {
        if (proto === null || proto === Object.prototype) {
            return;
        }

        for (const key of Object.getOwnPropertyNames(proto)) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, key)!;

            if (typeof descriptor.value === 'function' && key !== 'constructor') {
                mockedObject[key] = jasmine.createSpy(key);
            }
        }

        setupMethodsFromPrototype(Object.getPrototypeOf(proto));
    }

    setupMethodsFromPrototype(classToMock.prototype);

    return mockedObject;
}
