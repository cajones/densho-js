//
// densho-js
// javascript library for javascript ninja
// author : chris jones
// Copyright 2011 Chris Jones. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
//   1. Redistributions of source code must retain the above copyright notice, this list of
//      conditions and the following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above copyright notice, this list
//      of conditions and the following disclaimer in the documentation and/or other materials
//      provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY CHRIS JONES ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
//
var densho = {

    DEFAULT_HIJAX_LINK_SELECTOR: "a[href]",

    namespace: function(ns, container) {
        var n = ns.split(".");
        var p = container || window || {};
        for (var i = 0; i <= n.length; i++) {
            p[n[i]] = p[n[i]] || {};
            p = p[n[i]];
        }
        return parent;
    },

    type: function(obj) {
        if (!jQuery) throw new Exception("jQuery 1.5.1 is required");

        return jQuery.type(obj);
    },

    as: function(type, obj) {
        return (densho.type(obj) === type) ? obj : null;
    },

    hijax: function() {
        var defaults = {
            dataType: "html",
            linkSelector: densho.DEFAULT_HIJAX_LINK_SELECTOR
        };
        
        var selector = densho.as("string", arguments[0]),
            success = densho.as("function", arguments[0]),
            failure = densho.as("function", arguments[1]),
            options = jQuery.extend(defaults, arguments[2]),
            $links;

        (function($) {
            success = success ||
            function(result) {
                $(selector).html(result);
            };
            
            $links = this.is(options.linkSelector) ? this : this.find(options.linkSelector);
            
            $links.each(function() {
                var uri = $(this).attr("href");
                var hijaxSelector = $(this).data("hijaxSelector") || "*";
                
                if (uri) $(this).click(function() {
                    $.ajax({
                        url: uri,
                        dataType: options.dataType,
                        success: function(data, textStatus, jqXHR) {
                            success($(data).filter(hijaxSelector), textStatus, jqXHR);
                        }
                    });
                    return false;
                });
            });
        }).apply(this, [jQuery]);
    },

    integrateJQuery: function() {
        if (jQuery) {
            (function($) {
                $.extend($, {
                    namespace: function() {
                        return densho.namespace(ns, container);
                    }
                });

                $.fn.hijax = function() {
                    return densho.hijax.apply(this, arguments);
                };
            })(jQuery);
        }
    }
};
densho.integrateJQuery();