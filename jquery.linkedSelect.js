/*!
 * Item: linkedSelect 1.2.0 (https://github.com/zargaripour/linkedSelect.js)
 * Author: Hamed Zargaripour (https://zargaripour.com)
 * Licensed under MIT
 */
(function (n) {
    n.fn.linkedSelect = function (data, toggle, options) {

        options = (typeof options === 'undefined') ? {} : options;

        var opt = [];
        opt['force'] = (options['force']) ? options['force'] : false;
        opt['text'] = (options['text']) ? options['text'] : "Choose your option";
        opt['framework'] = (options['framework']) ? options['framework'] : null;

        if (!data || !toggle) {
            return null;
        } else {
            var $group = $('[data-toggle="' + toggle + '"]');

            function select(list, level) {
                var $thisElement = $group.filter('[data-level="' + level + '"]');
                var defaultKey = $thisElement.attr('data-value');
                var defaultExist = false;

                if ($thisElement.length > 0) {

                    var tempLevel = level;
                    do {
                        if ($group.filter('[data-level="' + tempLevel + '"]').length > 0) {
                            $group.filter('[data-level="' + tempLevel + '"]').find('option').remove();
                            if (opt['force'] === true)
                                $group
                                    .filter('[data-level="' + tempLevel + '"]')
                                    .append($('<option value="" disabled selected>' + opt['text'] + '</option>'));
                            else
                                $group
                                    .filter('[data-level="' + tempLevel + '"]')
                                    .append($('<option value="">' + opt['text'] + '</option>'));
                        } else
                            break;
                        tempLevel++;
                    } while (true);

                    if (typeof list === 'object') {

                        $.each(list, function (key, value) {
                            var fixedValue = null;

                            if (value['__title'] === undefined)
                                fixedValue = value;
                            else
                                fixedValue = value['__title'];

                            if (key === '__title') {
                                //skip the title
                            } else if (key === defaultKey) {
                                $thisElement.append($('<option></option>')
                                    .attr('value', key)
                                    .attr('selected', 'selected')
                                    .text(fixedValue));
                                defaultExist = true;
                            } else {
                                $thisElement.append($('<option></option>')
                                    .attr('value', key)
                                    .text(fixedValue));
                            }
                        });

                        if (defaultExist === true) {
                            list = ListGenerator(data, level);
                            select(list, level + 1);
                        }
                    }
                }

                if (opt['framework'] === "materialize")
                    $('select').material_select('update');
            }

            /* create new object list for each level from main object list */
            function ListGenerator(data, level) {
                var list = data;
                for (var index = 0; index <= level; index++) {
                    var SelectedValue = $group.filter('[data-level="' + index + '"]').val();
                    list = list[SelectedValue];
                }
                return list;
            }

            /* run function when user change the option */
            $group.filter('[data-level]').change(function () {
                /* find out witch level has been changed */
                var level = parseInt($(this).attr('data-level'));
                /* prepare the choices */
                var list = ListGenerator(data, level);
                /* prepare next choices */
                select(list, level + 1);
            });

            /* start to fill the first level choices */
            select(data, 0);
        }
    };
})(jQuery);