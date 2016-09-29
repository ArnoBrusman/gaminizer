
(function ($, _) {
//// global event handler for auto-complete input elements;
    window.AutoComplete = function (options) {
        var _clickHandler, namespace, $element, $display;

        namespace = _.isUndefined(options) || _.isUndefined(options.namespace)
                ? 'autocomplete' : options.namespace;

        $element = {};
        this.entries = {};

        this.template = _.template($('#autocomplete_template').html());

        this.initialize = function ($element, entries) {

            var self = this, _destroy;
            this.$element = $element;
            this.setEntries(entries);

            // set keylisteners;
            this.$element.on('keyup', function (event) {
                self.keyupHandler(event);
            });
            this.$element.on('keydown', function (event) {
                self.keydownHandler(event);
            });

            _destroy = _.bind(this.unbindGlobalEvents, this);
            $(document).on('pjax:start', _destroy);
            
            return this;
        };

        this.ignoreKeys = [16, // shift
            17, // ctrl
            18, // alt
            38, // up arrow
            40		// down arrow
        ];

        this.setEntries = function (entries)
        {
            this.entries = entries;
            return this;
        };

        this.clickHandler = function (event) {

            var $target = $(event.target);

            if ($target.hasClass("placeholder") || $target.parent().hasClass("placeholder")
                    || this.$element[0] === $target[0]) {
                return;
            }

            //test if click was inside 
            if ($("#autocomplete-matches").has($target).length === 1) {
                var $targetElement = $target.closest(".list-item");

                // jQuery doesn't pass along objects with length property unmodified, so we use the array work-around
                // see: http://bugs.jquery.com/ticket/5532
                this.$element.trigger("autocomplete", [$targetElement]);

            }
            if (!_.isUndefined(this.$display)) {
                this.removeDisplay();
            }

        };

        this.keyupHandler = function (event) {

            var $target, value, matches, keycode;

            $target = $(event.target);
            value = $target.val();
            keycode = event.keyCode;

            // prevent the autocomplete function from running on certain keys;
            if (_.indexOf(this.ignoreKeys, keycode) !== -1)
                return;

            if (keycode === 13) {		// enter
                this.selectCurrent($target);
                $target.trigger('blur');
                event.preventDefault();
                return;
            }

            if (!value) {
                $("#autocomplete-matches").remove();
                return this;
            }

            matches = this.matchQuery(value);
            this.displayMatches(matches);
            
            return this;
        };

        this.keydownHandler = function (event) {

            var keycode = event.keyCode;

            if (keycode === 38) {
                this.selectPrevious();
                event.preventDefault();
                return;
            }

            if (keycode === 40) {
                this.selectNext();
                event.preventDefault();
                return;
            }
        };

        this.displayAll = function ()
        {
            this.displayMatches(this.matchQuery('%'));
        };

        this.displayMatches = function (matches) {
            var html, offset, $list;

            html = this.template({matches: matches});
            offset = this.$element.offset();

            // *** shorten this? 
            this.$display = $("body").find("#autocomplete-matches");
            if (this.$display.length === 0) {
                this.$display = $("<div id='autocomplete-matches'></div>")
                        .appendTo("body");
            }
            this.$display.css({position: "absolute", left: offset.left, top: offset.top + this.$element.outerHeight() + 10, 'z-index': 9})
                    .html(html);
            $list = this.$display.find('.list');
            $list.jScrollPane();

            this.bindGlobalEvents();

        };

        this.removeDisplay = function () {

            this.$display.remove();
            this.unbindGlobalEvents();
        };

        this.selectNext = function () {
            if (!this.$display)
                return;

            var selectedMatch = this.$display.find(".selected").removeClass("selected"),
                    nextMatch = selectedMatch.next();

            if (nextMatch.length === 0)
                nextMatch = this.$display.find('.list-item:eq(0)');

            nextMatch.addClass("selected");
        };

        this.selectPrevious = function () {
            if (!this.$display)
                return;

            var selectedMatch = this.$display.find(".selected").removeClass("selected"),
                    nextMatch = selectedMatch.prev();

            if (nextMatch.length === 0)
                nextMatch = this.$display.find('.list-item').last();

            nextMatch.addClass("selected");
        };

        this.selectCurrent = function ($this) {

            if (!this.$display)
                return;

            var $selectedMatch = this.$display.find(".selected");
            if ($selectedMatch.length > 0) {
                this.$activeElement.trigger("autocomplete", [$selectedMatch]);
                this.$display.remove();
            }

        };

        this.matchQuery = function (query) {

            var specialCharacters = ["^", "$", ".", "*", "+", "?", "=", "!", ":", "|", "\\", "/", "(", ")", "[", "]", "{", "}"];

            var matches, entries, html, regex;
            entries = this.entries;

            // create a regular expression from the query string;
            regex = "";
            for (var i = 0; i < query.length; i++) {
                var character = query.charAt(i);

                // ignore "magic marker"
                // HACK *** this is stupid find a better way to do this
                if (character === "%" || character === " ")
                    continue;

                // escape special characters
                if (_.indexOf(specialCharacters, character) !== -1)
                    charachter = "\\" + character;
                regex += "([^" + character + "]*)(" + character + ")";
            }

            regex += "(.*)";

            regex = new RegExp(regex, "i");

            // run all entries through matching logic;	
            for (i = 0; i < entries.length; i++) {

                var match = entries[i].string.match(regex);
                if (!match)
                    continue;

                // get rid of first element, which contains the matching string itself;
                match.splice(0, 1);
                // markup all the matches, every odd member of the match array is a match, due to the structure of the regExs;
                for (var j = 1; j < match.length; j = j + 2)
                    match[j] = "<span class=\"match\">" + match[j] + "</span>";

                // glue string back together; 
                var string = match.join("");

                var adjacents = 0;
                // remove html separating adjacent spans
                string = string.replace(/<\/span><span class="match">/g, function () {
                    adjacents++;
                    return "";
                });

                var k = 0, html = entries[i].html;
                // replace the magic markers with html fragments;
                string = string.replace(/%%/g, function () {
                    return html[k++];
                });

                if (!matches)
                    matches = [];

                matches.push({match: match, html: string, adjacents: adjacents, value: entries[i].value});

            }

            // remove the display if we don't have any matches;
            // *** HACK this should be moved;
            if (!matches) {
                return;
            }

            // sort matches based on fewest separate fragments; fewer fragments means query letters are (more) adjacent, which we'll consider a better match 
            matches.sort(function (a, b) {
                return b.adjacents - a.adjacents;
            });

            return matches;

        };

        this.unbindGlobalEvents = function ()
        {
            // remove all handlers that might have been set on the item;
            $("body").off("click." + namespace);
            $("body").off("mouseenter", "#autocomplete-matches .list-item");
        };
        this.bindGlobalEvents = function ()
        {
            var self = this;
            _clickHandler = _.bind(this.clickHandler, this);
            // set a global click listener;
            $("body").on("click." + namespace, _clickHandler);

            // set a mouseenter listener for the matches-box;
            $("body").on("mouseenter", "#autocomplete-matches .list-item", function (event) {
                self.$display.find(".selected").removeClass("selected");
                $(event.target).addClass("selected");
            });

        };

        return this;
    };

})(jQuery, _);