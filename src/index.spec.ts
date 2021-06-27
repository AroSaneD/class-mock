import { mock } from ".";

describe("Concrete classes", () => {
    class ExampleConcreteClass {
        public testField: string;

        constructor() {
            this.testField = "Set";
        }

        testMethod() {
            return "Original response";
        }
    }

    test("Should mock methods of a given class", () => {
        const mocked = mock(ExampleConcreteClass);
        // expect(mocked.testField).toBe("Set");
        expect(typeof mocked.testMethod).toBe(typeof jasmine.createSpy);
    });

    test("Should allow mocking of methods of given class", () => {
        const mocked = mock(ExampleConcreteClass);
        mocked.testMethod.and.returnValue("Fake response");
        expect(mocked.testMethod()).toBe("Fake response");
    });
});
