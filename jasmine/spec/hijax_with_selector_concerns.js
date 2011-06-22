describe("hijax with a selector", function() {
    var isReady;
    $(function() {
        $("#hijax-with-a-selector #hijax-this").hijax("#hijax-with-a-selector .target");
        isReady = true;
    });

    it("should replace click behaviour", function() {

        waitsFor(function() {
            return isReady;
        });

        runs(function() {
            expect($("#hijax-with-a-selector #hijax-this").data("events").click).toBeTruthy();
        });
    });

    it("should load the target when clicked", function() {
        var theTargetContent = '<div id="select-this"><span>ajax content</span></div>';
        
        waitsFor(function() {
            return isReady;
        });

        runs(function() {
            $("#hijax-with-a-selector #hijax-this").click();
        });

        waitsFor(function() {
            return $("#hijax-with-a-selector .target").html() !== "";
        });

        runs(function() {
            expect($("#hijax-with-a-selector .target").html()).toEqual(theTargetContent);
        });
    });
});