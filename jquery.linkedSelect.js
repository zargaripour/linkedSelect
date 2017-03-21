/*!
 * Item: linkedSelect 1.0.0 (https://github.com/zargaripour/linkedSelect)
 * Author: Hamed Zargaripour (https://zargaripour.com)
 * Licensed under MIT
 */
(function(n) {
    n.fn.linkedSelect = function(data, toggle, options) {

        var firstBlank = options['firstBlank'];

        if(!data || !toggle){
            return null;
        }
        else {
            var $group = $('[data-toggle="'+ toggle +'"]');

            function select(list,level) {
                var $thisElement    = $group.filter('[data-level="'+ level +'"]');
                var defaultKey      = $thisElement.attr("data-value");
                var defaultExist    = false;

                if($thisElement.length > 0) {
                    $thisElement.find('option').remove();

                    if (typeof list === 'object') {

                        if (firstBlank)
                            $thisElement.append($("<option></option>"));

                        $.each(list, function (key, value) {
                            var fixedValue = null;

                            if(value["__title"] == undefined)
                                fixedValue = value;
                            else
                                fixedValue = value["__title"];

                            if(key == "__title") {
                                //skip the title
                            }
                            else if(key == defaultKey) {
                                $thisElement.append($("<option></option>")
                                    .attr("value", key)
                                    .attr("selected", "selected")
                                    .text(fixedValue));
                                defaultExist = true;
                            }
                            else {
                                $thisElement.append($("<option></option>")
                                    .attr("value", key)
                                    .text(fixedValue));
                            }
                        });

                        if (defaultExist == true){
                            list = ListGenerator(data, level);
                            select(list, level + 1);
                        }
                    }
                }
            }

            function ListGenerator(data, level) {
                var list = data;

                for (var index = 0; index <= level ; index++ ) {
                    var SelectedValue = $group.filter('[data-level="' + index + '"]').val();
                    list = list[SelectedValue];
                }

                return list;
            }

            $group.filter('[data-level]').change(function() {
                var level   = parseInt($(this).attr('data-level'));
                var list    = ListGenerator(data, level);

                select(list, level + 1);
            });

            select(data, 0);
        }
    };
})(jQuery);

