describe("namespaces", function() {

    describe("given a FOO.bar namespace", function() {
        
        densho.namespace("FOO.bar");
        
        it("should create a FOO object", function() {
            expect(FOO).toBeTruthy();
        });

        it("should create a FOO.bar object", function() {
            expect(FOO.bar).toBeTruthy();
        });
    });
});