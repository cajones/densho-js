describe("hijax with a selector, and children of the selector are links", function() {
    var isReady;
    var $parent;
    $(function() {
        $parent = $("#hijax-with-a-selector-and-child-link");
        $parent.hijax("#hijax-with-a-selector-and-child-link .target");
                
        isReady = true;
    });

    it("should replace click behaviour on the children", function() {

        waitsFor(function() {
            return isReady;
        });

        runs(function() {
            expect($("a", $parent).data("events").click).toBeTruthy();
        });
    });

    it("should load the target when clicked", function() {
        var theTargetContent = '<div id="select-this"><span>ajax content</span></div>';
        
        waitsFor(function() {
            return isReady;
        });

        runs(function() {
            $("a", $parent).click();
        });

        waitsFor(function() {
            return $(".target", $parent).html() !== "";
        });

        runs(function() {
            expect($(".target", $parent).html()).toEqual(theTargetContent);
        });
    });
});