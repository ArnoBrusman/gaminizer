
// global event handler for auto-complete input elements;
rpgt.AutoComplete = {


	initialize: function ($element, entries) {

        this.template =  _.template($('#autocomplete_template').html()),
                
		// remove all handlers that might have been set on the item;
		$element.off();
		$("body").off("click", function (event) { self.clickHandler( event) });
		$("body").off("mouseenter", "#autocomplete-matches .list-item")

		var self = this;		

		// set keylisteners;
		$element.on('keyup', function (event) { self.keyupHandler( event, $element, entries) });
		$element.on('keydown', function (event) { self.keydownHandler( event, $element ) });

		// set a global click listener;
		$("body").on("click", function (event) { self.clickHandler( event) });

		// set a mouseenter listener for the matches-box;
		$("body").on("mouseenter", "#autocomplete-matches .list-item", function (event) { 
			self.$display.find(".selected").removeClass("selected");
			$(event.target).addClass("selected")
		})

	},

	ignoreKeys: [	16,		// shift
					17,		// ctrl
					18,		// alt
					38,		// up arrow
					40		// down arrow
	],

	clickHandler: function (event) {

		var $target = $(event.target);
		if ($target.hasClass("placeholder") || $target.parent().hasClass("placeholder")) {
			return;
		}

		//test if click was inside 
		if ($("#autocomplete-matches").has($target).length === 1) {		
			var $targetElement = $(event.target).closest(".list-item");			

			// jQuery doesn't pass along objects with length property unmodified, so we use the array work-around
			// see: http://bugs.jquery.com/ticket/5532		
			this.$activeElement.trigger("autocomplete", [ $targetElement ]); 
			
		}
		$("#autocomplete-matches").remove() 

	},
	
	keyupHandler: function (event, $element, entries) {		

		this.$activeElement = $element

		var $target, value, matches, keycode;
		
		$target = $( event.target )
		value = $target.val();
		keycode = event.keyCode;

		// prevent the autocomplete function from running on certain keys;
		if (_.indexOf( this.ignoreKeys, keycode ) !== -1)
			return;

		if (keycode === 13) {		// enter
			this.selectCurrent($target);
			$target.trigger( 'blur' );
			event.preventDefault();
			return;			
		}

		if (!value) {			
			$("#autocomplete-matches").remove();
			return
		}	
										
		matches = this.matchQuery(value, entries);
		
		this.displayMatches( $target, matches );		

	},

	keydownHandler: function (event) {

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
	},

	displayMatches: function ($this, matches) {		

		var html = this.template({ matches: matches });
		var offset = $this.offset();
		
		// *** shorten this? 
		this.$display = $("body").find("#autocomplete-matches");
		if (this.$display.length === 0)
			this.$display = $("<div id='autocomplete-matches'></div>")
				.appendTo("body")
				.css({position: "absolute", left: offset.left, top: offset.top + $this.outerHeight() + 10, 'z-index': 9});
				
		this.$display.html(html);	

	},

	selectNext: function () {
		if (!this.$display) 
			return;

		var selectedMatch = this.$display.find(".selected").removeClass("selected"),
			nextMatch = selectedMatch.next();

		if (nextMatch.length === 0)
			nextMatch = this.$display.find('.list-item:eq(0)')
		
		nextMatch.addClass("selected");
	},

	selectPrevious: function () {
		if (!this.$display) 
			return;

		var selectedMatch = this.$display.find(".selected").removeClass("selected"),
			nextMatch = selectedMatch.prev();

		if (nextMatch.length === 0)
			nextMatch = this.$display.find('.list-item').last();
		
		nextMatch.addClass("selected");
	},

	selectCurrent: function ($this) {

		if (!this.$display) 
			return;

		var $selectedMatch = this.$display.find(".selected")		
		if ($selectedMatch.length > 0) {
			$this.trigger("autocomplete", [$selectedMatch]);
			this.$display.remove();		
		}

	},

	matchQuery: function (query, entries) {

		var specialCharacters = ["^", "$", ".", "*", "+", "?", "=", "!", ":", "|", "\\", "/", "(", ")", "[", "]", "{", "}"];

		var matches, entry, html, regex;

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
			regex += "([^" + character + "]*)(" + character	+ ")";
		}

		regex += "(.*)"

		regex = new RegExp( regex, "i");

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
			
			var adjacents = 0
			// remove html separating adjacent spans
			string = string.replace(/<\/span><span class="match">/g, function () {
				adjacents++; return "";
			})

			var k = 0, html = entries[i].html;
			// replace the magic markers with html fragments;
			string = string.replace(/%%/g, function () {
				return html[k++]				
			})

			if (!matches)
					matches = [];

			matches.push({ match: match, html: string, adjacents: adjacents, id: entries[i].id })

		}		
		
		// remove the display if we don't have any matches;
		// *** HACK this should be moved;
		if (!matches) {			
			return;
		}

		// sort matches based on fewest separate fragments; fewer fragments means query letters are (more) adjacent, which we'll consider a better match 
		matches.sort(function (a, b) { return b.adjacents - a.adjacents })
		// truncate length of return array to max 10
		if (matches.length > 10) {
			matches = matches.splice( 0, 10 );
		}

		return matches;

	}

}

