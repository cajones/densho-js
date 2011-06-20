describe("hijax with a selector", function() {
    
    $("#hijax-this").hijax("#hijax-with-a-selector-target");
    
    it("should replace click behaviour", function() {
        
        expect($("#hijax-this")).toBeTruthy();
    });
});