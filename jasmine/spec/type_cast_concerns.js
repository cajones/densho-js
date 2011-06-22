
describe("type casting", function() {
    var assertions = {
        castSuccessfully: function(typeName, value) {
            var actual = densho.as(typeName, value);

            expect(actual).toEqual(value);           
        },
        
        castAndExpectNull: function(typeName, value) {
            var actual = densho.as(typeName, value);

            expect(actual).toBeNull();            
        }
    };
    
    describe("given jQuery is present", function() {

        describe("and I have a string value", function() {

            var value = "its a string!";

            it("should cast a string", assertions.castSuccessfully("string", value));

            it("should not cast a number", assertions.castAndExpectNull("number", value));

            it("should not cast a function",  assertions.castAndExpectNull("function", value));
            
            it("should not cast an object",  assertions.castAndExpectNull("object", value));
        });

        describe("and I have a function value", function() {

            var value = function() {
                    alert("by Odin's beard!");
                };
                
            it("should cast a function", assertions.castSuccessfully("function", value));
            
            it("should not cast a string", assertions.castAndExpectNull("string", value));

            it("should not cast a number", assertions.castAndExpectNull("number", value));
            
            it("should not cast an object", assertions.castAndExpectNull("object", value));
        });
        
        describe("and I have a function value", function() {

            var value = {
                foo: "bar"
            };
                
            it("should cast an object", assertions.castSuccessfully("object", value));

            it("should not cast a string", assertions.castAndExpectNull("string", value));

            it("should not cast a number", assertions.castAndExpectNull("number", value));
            
            it("should not cast a function", assertions.castAndExpectNull("function", value));
        });
    });
});