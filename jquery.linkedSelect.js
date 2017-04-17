/*!
 * Item: linkedSelect 1.1.0 (https://github.com/zargaripour/linkedSelect)
 * Author: Hamed Zargaripour (https://zargaripour.com)
 * Licensed under MIT
 */
(function(n) {
    n.fn.linkedSelect = function(data, toggle, options) {

        options = (typeof options === 'undefined') ? {} : options;

        var opt = [];
        opt['force']        = (options['force'])        ? options['force']      :false;
        opt['text']         = (options['text'])         ? options['text']       :"Choose your option";
        opt['framework']    = (options['framework'])    ? options['framework']  :null;

        if(!data || !toggle){
            return null;
        }
        else {
            var $group = $('[data-toggle="'+ toggle +'"]');

            function select(list,level) {
                var $thisElement    = $group.filter('[data-level="'+ level +'"]');
                var defaultKey      = $thisElement.attr('data-value');
                var defaultExist    = false;

                if($thisElement.length > 0) {

                    var tempLevel = level;
                    do {
                        if ($group.filter('[data-level="'+ tempLevel +'"]').length > 0)
                            {
                                $group.filter('[data-level="'+ tempLevel +'"]').find('option').remove();
                                if (opt['force'] == true)
                                    $group.filter('[data-level="'+ tempLevel +'"]').append($('<option value="" disabled selected>' + opt['text'] + '</option>'));
                                else
                                    $group.filter('[data-level="'+ tempLevel +'"]').append($('<option value="">' + opt['text'] + '</option>'));
                            }
                        else
                            break;
                        tempLevel++;
                    }while(true);

                    if (typeof list === 'object') {

                        $.each(list, function (key, value) {
                            var fixedValue = null;

                            if(value['__title'] == undefined)
                                fixedValue = value;
                            else
                                fixedValue = value['__title'];

                            if(key == '__title') {
                                //skip the title
                            }
                            else if(key == defaultKey) {
                                $thisElement.append($('<option></option>')
                                    .attr('value', key)
                                    .attr('selected', 'selected')
                                    .text(fixedValue));
                                defaultExist = true;
                            }
                            else {
                                $thisElement.append($('<option></option>')
                                    .attr('value', key)
                                    .text(fixedValue));
                            }
                        });

                        if (defaultExist == true){
                            list = ListGenerator(data, level);
                            select(list, level + 1);
                        }
                    }
                }

                if (opt['framework'] == "materialize")
                    $('select').material_select('update');
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

