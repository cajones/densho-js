describe("type casting", function() {

    describe("given jQuery is present", function() {

        describe("and I have a string value", function() {

            var value = "its a string!";

            it("should cast a string", function() {

                var actual = densho.as("string", value);

                expect(actual).toEqual(value);
            });

            it("should not cast a number", function() {

                var actual = densho.as("number", value);

                expect(actual).toBeNull();
            });

            it("should not cast a function", function() {

                var actual = densho.as("function", value);

                expect(actual).toBeNull();
            });
        });

        describe("and I have a function value", function() {

            var value = function() {
                    alert("by Odin's beard!");
                };
            it("should cast a function", function() {

                var actual = densho.as("function", value);

                expect(actual).toEqual(value);
            });

            it("should not cast a string", function() {

                var actual = densho.as("string", value);

                expect(actual).toBeNull();
            });

            it("should not cast a number", function() {

                var actual = densho.as("number", value);

                expect(actual).toBeNull();
            });
        });
    });
});