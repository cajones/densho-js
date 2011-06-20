describe("densho framework", function() {

    it("should create a densho object", function() {

        expect(densho).toBeTruthy();
    });

    describe("given jQuery is present", function() {
            
        it("should integrate namespace with jQuery", function() {

            expect(jQuery.namespace).toBeTruthy();
            
        });
        
        it("should integrate hijax with jQuery", function() {
            
            expect($("body").hijax).toBeTruthy();
        });
    });
});