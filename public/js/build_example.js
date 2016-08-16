/* (c) 2015 Crediteuren Portal KasCoöperatie - v. 01-02-2015, @ 14:09 */


(function() {
var method;
var noop = function noop() {};
var methods = [
'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
'timeStamp', 'trace', 'warn'
];
var length = methods.length; 
var console = (window.console = window.console || {}); 
while (length--) { 
method = methods[length]; 
// Only stub undefined methods. 
if (!console[method]) { 
console[method] = noop;
} 
} 
})();



console.log('(c) 2015 Crediteuren Portal KasCoöperatie - v. 01-02-2015, @ 14:09'); 


// *************************************
//
//      augmenting prototype for IE8
//
// *************************************

// imlement string.trim()
// http://stackoverflow.com/questions/2308134/trim-in-javascript-not-working-in-ie

if (typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, ''); 
	}
}

// imlement array.indexOf();
// http://stackoverflow.com/questions/3629183/why-doesnt-indexof-work-on-an-array-ie8

if (typeof Array.prototype.indexOf !== 'function') {
  
  Array.prototype.indexOf = function(elt /*, from*/)
  
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };

}

// *************************************
//
//      top level variables
//      
//
// *************************************
myAPP = {
	collections: {}, 
	models: {},
	views: {}	
};

_.extend(myAPP, Backbone.Events);
myAPP.listenTo(myAPP, 'toast', function () { $("body").trigger('toast') })

// *************************************
//
//      api URL
//
// *************************************

// this variable should point to the api root-url; 
// end with slash!
// 
myAPP.apiUrl = "/api/";

// *************************************
//
//      default accounts 
//
// *************************************

myAPP.superAdminAccountId = "152";
myAPP.guestUserAccountId = "150";
myAPP.guestUserEmail = "test@gmail.com";
myAPP.guestUserPassword = "test";

myAPP.images = ["img/bee2.gif", 
				"img/wizard-content-0.jpg", 
				"img/wizard-content-1.jpg", 
				"img/wizard-content-2.jpg",
				"img/wizard-content-3.jpg",
				"img/wizard-content-4.jpg",
				"img/wizard-content-4a.jpg",
				"img/wizard-content-4b.jpg",
				"img/wizard-content-5.jpg",
				];


// *************************************
//
//      constants relating to updates
//
// *************************************

myAPP._finalizeInvoicesStartDate = new Date("2017-12-29");

// *************************************
//
//      myAPP methods 
//
// *************************************

myAPP.getUserRole = function () {

	if (!myAPP.session || !myAPP.currentUser)
		return;

	if (myAPP.session.get( "isGuestUser" ))
		return "guestUser";

	if (myAPP.currentUser) {
		var role = myAPP.currentUser.get( "role" );
		if (role === "superadmin")
			return "superadmin";

		var account = myAPP.currentUser.get("account")
		if (account && account[0]) {			
			return account[0].role	 
		}	
	}		 

}

myAPP.isPaidAccount = function () {

	if (myAPP.currentAccount) {
		return ( myAPP.currentAccount.get("subscription") === "payed")
	}
	if (myAPP.getUserRole === "superadmin")
		return true;
}

// ### matchHash	(<span class="parameter"></span>)
// Match the hash against certain values and set startup route
myAPP.matchHash = function () {
	
	var hash = window.location.hash;	
	var match = hash.match(/#password\?id\=(\d+)&hash\=([a-z0-9]+)/)
	if (match) {
		myAPP._userId = match[1];
		myAPP._hash = match[2];
		myAPP._routeOnStartup = "password";		
		return		
	}

	if (hash.match(/#import/)) {
		myAPP._routeOnStartup = "import"
		return;
	}

	if (hash.match(/#sandbox/)) {
		myAPP._isSandbox = true;
	}

}

// ### checkCookie	(<span class="parameter"></span>)
// check cookie for settings parameters

myAPP.checkCookie = function () {
	var cookie;	
	cookie = $.cookie()['dont-show-wizard'];
	myAPP.dontShowAccountWizard = (cookie && cookie.split(",")) || [];
};

myAPP.setDontShowWizardCookie = function(account) {
	var cookie = $.cookie("dont-show-wizard") || "",
		id = myAPP.currentAccount.get("id");

	cookie = (cookie) ? cookie + "," + id : id;
	$.cookie("dont-show-wizard", cookie, { expires: 365 }); 
}

myAPP.login = function () {

	myAPP.createGlobalResources();

	// superadmin

	if ( myAPP.session.get( "isSuperAdmin" )) {
		myAPP.appView.setSuperAdminView();
	
	// guest user
	} else if ( myAPP.session.get( "isGuestUser" )) {		
		myAPP.appView.setNormalView();		
		myAPP.dummyFetchResources({ 
			success: function () { 
				myAPP.router.navigate("facturen/facturen/nieuw", { trigger: true });		
				var tutorial = new Tutorial( myAPP.tutorials.sandbox)			
				tutorial.start();
			}
		});

	// normal user
	} else {
		myAPP.appView.setNormalView();
		myAPP.fetchResources({ 
			success: function () { 
				myAPP.router.navigate("dashboard", { trigger: true }); 
				myAPP.setEventListeners();
				if (!myAPP.currentAccount.isComplete() || myAPP.currentAccount.get("isImported")) {
					myAPP.onIncompleteAccount();	
				}				
			}
		});
	}

};

myAPP.logout = function () {

	myAPP.session.logout();		
	myAPP.appView.initialize();
	myAPP.router.navigate("", { trigger: true })	
	myAPP.appView.render();

}

myAPP.onIncompleteAccount = function () {	

	if (myAPP.dontShowAccountWizard.indexOf(myAPP.currentAccount.get("id")) !== -1) {
		return;
	}
	
	myAPP.accountWizard.start();

}

myAPP.createGlobalResources = function() {

	myAPP.debtors = new myAPP.collections.Debtors();
	myAPP.invoices = new myAPP.collections.Invoices();
	myAPP.articles = new myAPP.collections.Articles();
	myAPP.articleGroups = new myAPP.collections.ArticleGroups();	
	myAPP.payments = new myAPP.collections.Payments();
	myAPP.periodicals = new myAPP.collections.Periodicals();
	myAPP.quotes = new myAPP.collections.Quotes();	
	myAPP.periodicalChildren = new myAPP.collections.Invoices();
	myAPP.periodicalChildren.url = function () { return "accounts/" + myAPP.currentAccount.get("id") + "/periodicals/invoices" }	
	myAPP.objections = new myAPP.collections.Objections();
	myAPP.paymentPlans = new myAPP.collections.PaymentPlans();
	myAPP.balances = new myAPP.collections.Balances();
	myAPP.notifications = new myAPP.collections.Notifications();
	myAPP.templates = new myAPP.collections.Templates();

	// account settings is a model, not a collection
	myAPP.accountSettings = new myAPP.models.AccountSettings();

	// users collection works a little different as well	
	var users = myAPP.currentAccount.get("users")
	if (users) {
		users = users.user;
	}
	else {
		users = myAPP.currentAccount.get("user");
	}

	if ( myAPP.session.get ( "isGuestUser" ))
		users = myAPP.currentUser;

	myAPP.users = new myAPP.collections.Users( users )

}

// force browser to preload images;
myAPP.loadImages = function () {

	for (var i = 0; i < myAPP.images.length; i++) {
		var image = new Image();
		image.src = myAPP.images[i];
	}

} 


myAPP.setEventListeners = function () {

	$(document).on("keydown", function (event) {
		if (event.keyCode === 116) {
			event.preventDefault();
			myAPP.fetchResources({ fetchAccount: true }); 
		}
		
	})
}

myAPP.start = function () {

	// set default route;
	myAPP._routeOnStartup = "home";
	myAPP.matchHash();

	// create essential objects;
	myAPP.router = new myAPP.Router();
	myAPP.session = new myAPP.models.Session({ isActive: false });
	myAPP.appView = new myAPP.views.AppView({ el: $("<div class='master'></div>").appendTo($("body")) });
	
	// don't have Backbone match the current URL to a route, to prevent (re)-triggering of route handler;
	Backbone.history.start();		
	myAPP.router.navigate(myAPP._routeOnStartup, { trigger: true })

	// sandBox
	if (myAPP._isSandbox) {
		myAPP.session.loginAsGuest();		
		myAPP.login();
		return
	}

	// check cookies;	
	myAPP.checkCookie();

	myAPP.loadImages();

	myAPP.listenTo( myAPP.session, 'change:isActive', function () {
		
		// session activated;
		if (myAPP.session.get( "isActive" )) {
			myAPP.login()
		} else {
			myAPP.logout();
		}
	})

}




//------------------------------------



// replace browser dialogue boxes with our own dialogue boxes

window.alert = function (message) {

	var _handler = function (event) {
		if (event.keyCode === 27) {
			myAPP.animations.closePopup();
			$("body").off("keyup", _handler)
		}
	}

	var $html = $(JST[ "templates/popups/alert.html" ]({ message: message }));
	myAPP.animations.openPopup( $html )

	$(".popup").on("click", "#ok", function () {
		myAPP.animations.closePopup();
	})

	//$("body").on("keyup", _handler)

}

window.confirm = function (message, callbackConfirm, callbackCancel) {

	var $html = $(JST[ "templates/popups/confirm.html" ]({ message: message }));

	// var $popup = $( ".popup" );

	// if ($popup.length > 0) {

	// 	// remove old confirm window;
	// 	$("body") .off("click", "#confirm") .off("click", "#cancel")
	// 	$(".opacity-screen").stop( true ).css({ opacity: 0.7 })
	// 	$popup
	// 		.addClass("old")
	// 		.stop( true )
	// 		.animate({ opacity: 0, top: "+=100" }, { specialEasing: { top: "easeOutCubic", opacity: "linear" } , 
	// 			complete: function () { $(".old").remove() } })
			
	// 	// create new window;		
	// 	var offsetTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	// 	offsetTop += Math.floor( ( $(window).height() - $html.height() ) / 2 ) - 200;

	// 	$html
	// 		.addClass("new")
	// 		.appendTo($( "body" ));
	// 	$( ".new" ).css({ opacity: 0, top: offsetTop }).animate({ opacity: 1, top: "+=100" }, 
	// 		{ specialEasing: { top: "easeOutCubic", opacity: "linear"},
	// 		complete: function () { $(".new").removeClass( "new" ) } })

	// 	$( ".new .close-button" ).one("click", function () {
	// 		myAPP.animations.closePopup();
	// 	})
	
	// } else {
		
	myAPP.animations.openPopup( $html )
	

	$(".popup").on("click", "#confirm", function () { 	
		//$("body") .off("click", "#confirm") .off("click", "#cancel")
		myAPP.animations.closePopup();		
		if (callbackConfirm) callbackConfirm();

	})
	
	$(".popup").on("click", "#cancel", function () { 
		//$("body") .off("click", "#confirm") .off("click", "#cancel")		
		myAPP.animations.closePopup()		
		if (callbackCancel) callbackCancel();
	})

}



//------------------------------------



// *** Everything animation related, including element dimensions;
// *** all these methods need a non-animated parent element to function! They will attach and remove the content from the parent element, they won't 
// *** create a wrapper

myAPP.animations = (function () { 

	var getHeight = function (element) {

		element.css({opacity: 0, position: "absolute"});
		element.appendTo($("body"));
		var height = element.height();
		return height;

	}

	var defaults = {
		duration: 400
	}

	var _oldElement, _callback, _handler; 

	var _animate = function (parameters) {		

		var easing = {top: "easeOutCubic", left: "easeOutCubic", opacity: "linear"}
		
		var oldElement = parameters.oldElement,
			newElement = parameters.newElement,
			duration = parameters.duration || defaults.duration,
			callback = parameters.callback,
			remove = parameters.remove;

			if (!oldElement)
				throw "animations won't work without a jquery element passed as oldElement parameter";
			
			var $parent = oldElement.parent(),
				width = $parent.width();
			$parent.css({ position: "relative" })
			
			oldElement
				.stop(true, true)
				.css({position: "absolute", width: width})
				.animate(parameters.oldElementProperties, {duration: duration, specialEasing: easing, complete: function() {					
					oldElement.css({ display: "none" })					
			}})

			newElement	
				.stop(true, true)
				.appendTo($parent)			
				.css({position: "absolute", opacity: 0, display: "block"})				

			newElement										
				.css(_.extend(parameters.newElementStartProperties, {position: "absolute", width: width}))
				.animate(parameters.newElementEndProperties, {duration: duration, specialEasing: easing, complete: function () {					
					newElement.css({position: "relative", width: "inherit"});
					if (callback) {
						callback();
					}
					if (_oldElement) {
						_oldElement.remove();
					}
			}});

			if (remove)	{				
				_oldElement = oldElement
			}

	}

	return { 

		slideLeft: function (parameters)  {

						_.extend(parameters, {
							oldElementProperties: { left: -100, opacity: 0 },
							newElementStartProperties: { left: 100, opacity: 0},
							newElementEndProperties: {left: 0, opacity: 1}
						});

						_animate(parameters)

		},

		slideRight: function (parameters) {

						_.extend(parameters, {
							oldElementProperties: { left: 100, opacity: 0 },
							newElementStartProperties: { left: -100, opacity: 0},
							newElementEndProperties: {left: 0, opacity: 1}
						});
						
			
						_animate(parameters)
		},
		

		drop: function (parameters) {
						
						_.extend(parameters, {
							oldElementProperties: { top: 100, opacity: 0 },
							newElementStartProperties: { top: -100, opacity: 0},
							newElementEndProperties: {top: 0, opacity: 1}
						});
		
						_animate(parameters);
		},

		lift: function (parameters) {

						_.extend(parameters, {
							oldElementProperties: { top: -100, opacity: 0 },
							newElementStartProperties: { top: 100, opacity: 0},
							newElementEndProperties: {top: 0, opacity: 1}
						});

						_animate(parameters)
						
		},

		// the blink method works on input elements as well, not just divs or spans
		blink: function ($elements, newValue, callback) {

						$elements.each(function (index, Element) {

							var $element = $(Element),
								_callback = function () {  

								if ($element.is("input") || $element.is("textarea")) {
									$element.val(newValue).animate({ opacity: 1 }, { duration: 200, complete: function () { $element.data({ isAnimating: false }) } })								
								} else {									
									$element.html(newValue).animate({ opacity: 1 }, { duration: 200, complete: function () { $element.data({ isAnimating: false }) } })
								}

								if (callback) callback();
							}

							if(!($element instanceof $))
								throw "$element is not a jQuery object";

							var oldValue = $element.is("input")	? $element.val() : $element.html(); 
							
							if (!$element.is("input") && !$element.is("textarea") && newValue === oldValue) {
								return;
							}

							$element.stop(true, true);

							if (!$element.data( "isAnimating" )) {
								$element.animate({ opacity: 0 }, { duration: 200, complete: _callback })
							} else {
								_callback();
							}

							$element.data({ isAnimating: true })	

						})										

		},

		flashElement: function ($element, type) {
								
						if(!($element instanceof $))
							throw "$element is not a jQuery object";

						var color = "#ffffa0", duration = 400;					

						switch (type) {
							case 'change':	color = "#ffffa0"; break;
							case 'error': color = "#ff8080"; break;
							case 'success': color = "#dcffc5"; duration = 800; break;							
						}
						
						$element.stop().css({ backgroundColor: color }).animate({ backgroundColor: "transparent" }, { duration: duration });

		},

		//  leave this available as a method if we only want to add a marker, but no tooltips, etc.
		addErrorMarker: function ($element) {
						// an error marker is absolutely positioned relative to the element, so set css position attribute;
						if (!$element.css("position") || $element.css("position") === "static")																								
							$element.css({position: "relative"})
						var template = "<div class='error-marker'><span class='entype error'>" + myAPP.templateHelpers.charCodes.error + "</span></div>";
						var $errorMarker = $(template).css({opacity: 0}).appendTo($element).animate({opacity: 1})

		},

		addErrorMarkup: function ($element, errorMessage) {
						myAPP.animations.addErrorMarker($element);
						$element.attr({"data-tooltip": errorMessage, "data-tooltip-class": "error"}).addClass("myAPP-tooltip error");
						myAPP.animations.flashElement($element, "error");
		},

		removeErrorMarkup: function ($element) {						
						var $errorMarker = $element.find(".error-marker");
						$errorMarker.animate({ opacity: 0 }, { complete: function ()  { $errorMarker.remove() } });
						// *** HACK: this will also remove normal tooltips!
						$element.removeClass("myAPP-tooltip error").attr({"data-tooltip": null, "data-tooltip-class": null})
						myAPP.clearTooltipOnElement($element)
		},

		getTextWidth: function (text) {
						// append a dummy element to the DOM
						var span = $("<span class='temp'>" + text + "</span>").appendTo($("body")).css({position: "absolute", visibility: "hidden", display: "inline-block"})
						var width= span.width();    
						span.remove();                
						return width;    
		},  

		// *************************************
		//
		//      popups
		//
		// *************************************


		openPopup: function (html, callback, duration) { 

						duration = duration || 0;
						_callback = callback; 

						myAPP.clearTooltips();

						// if a popup is already shown, remove 'active' tag and event listeners.
						// $(".popup")
						//	.off("click", ".close-button")
						//	.removeClass( "active" );
						myAPP.animations.closePopup();

						var offsetTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

						var $opacityScreen = $("<div class=\"opacity-screen\"></div>")
							.css({ zIndex: 9000, position: "fixed", width: "100%", height: "100%", top: 0, backgroundColor: "#fff", opacity: 0 })
							.appendTo($("body"))
							.animate({ opacity: 0.7 }, { duration: 400 })

						var $html = $(html)							
							.appendTo($("body"))
							.addClass("popup active") 
							//.css({ opacity: 1 })
							.animate({ opacity: 1 }, { duration: duration })

						var windowHeight = $(window).height(),
							popupHeight = $html.height();

						if (windowHeight > popupHeight)
							offsetTop += Math.floor((windowHeight - popupHeight) / 2);

						$html.css({ top: offsetTop })

						// set event handler for closing window;
						$(".popup.active").one("click", ".close-button", function () {													
							myAPP.animations.closePopup();							
						});

						_handler = function (event) {

							var keyCode = event.keyCode
							if (keyCode === 27) {													
								myAPP.animations.closePopup();								
								return;
							}
							
						}

						$("body").on("keyup", _handler)

		},

		closePopup: function (duration) {
						var $popup = $( ".popup.active" );

						duration = duration || 0;
						
						$popup 
							.removeClass("active")							
							.animate({ opacity: 0 }, { duration: duration, complete: function () { $popup.remove(); } });

						// remove tout les handlers.
						$popup.find("*").andSelf().off();

						$(".opacity-screen")
							.animate({ opacity: 0 }, { 
								complete: function () { $( ".opacity-screen").remove() 
									if (_callback) _callback();
									$(".popup").addClass("active")
							} })
						
						$("body")
							.off("keyup", _handler)
						
						myAPP.clearTooltips();

		}
	}

})();



//------------------------------------



// global event handler for auto-complete input elements;


myAPP.AutoComplete = {

	initialize: function ($element, entries) {

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

		// if (!matches) {			
		// 	if (this.$display)
		// 		this.$display.remove();
		// 	return;
		// }
		
		this.displayMatches( $target, matches );		

	},

	keydownHandler: function (event) {

		var keycode = event.keyCode;

		if (keycode === 38) {
			selectPrevious();
			event.preventDefault();
			return;
		}

		if (keycode === 40) {
			selectNext();
			event.preventDefault();
			return;
		}
	},

	displayMatches: function ($this, matches) {		

		var html = JST['templates/dropdowns/autocomplete.html']({ matches: matches });
		var offset = $this.offset();
		
		// *** shorten this? 
		this.$display = $("body").find("#autocomplete-matches");
		if (this.$display.length === 0)
			this.$display = $("<div id='autocomplete-matches'></div>")
				.appendTo("body")
				.css({position: "absolute", left: offset.left, top: offset.top + $this.outerHeight() + 10});
				
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
			$this.trigger("autocomplete", $selectedMatch);
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





//------------------------------------



Backbone.History.prototype.getParameters = function () {
	
	var fragment = this.getFragment().replace(/%20/, " ");
	return (fragment.split("/"))		

}




//------------------------------------



Backbone.Collection.prototype.parse = function(response) {
	// remove namespace wrapper from response
	var data;
	
	for (var key in response)
		data = response[key]
	
	return data;
}

Backbone.Model.prototype.parse = function(response) {
	var data;
	
	for (var key in response)
		data = response[key]
	
	return data;
}

// parse a regular response from the server;

myAPP.parseResponse = function (response) {
	if (!response || !response.responseText) {
		console.warn("*** WARN: no response passed to parseResponse");
		return
	}

	var responseObject = {},
		parsedResponse = JSON.parse(response.responseText);

	return parsedResponse;
	
}

// parse the error response from the server;

myAPP.parseErrorResponse = function (response) {	
	if (!response || !response.responseText) {
		console.warn("*** WARN: no response passed to parseErrorResponse")
		return;
	}
	var responseObject = {},
		parsedResponse = JSON.parse(response.responseText)		
		if (!parsedResponse.validation) {
			console.warn("*** WARN: The response from the server doesn't appear to contain a validation object ",  parsedResponse);
			return(parsedResponse)
		}


		for (var object in parsedResponse.validation) {
			// there should be only one object nested inside response.validation, but we don't know its class;
			for (var key in parsedResponse.validation[object]) {				
				responseObject[key] = parsedResponse.validation[object][key];
			}
		}
	return responseObject;
}




//------------------------------------



Backbone.Model.prototype.save = function(key, val, options) {      

      // Wrap an optional error callback with a fallback error event.
      var wrapError = function (model, options) {
        var error = options.error;
        options.error = function(resp) {
          if (error) error(model, resp, options);
          model.trigger('error', model, resp, options);
        };
      };


      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key === null || key === undefined || typeof key === 'object') {

        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
      if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

      options = _.extend({validate: true}, options);

      // Do not persist invalid models.
      if (!this._validate(attrs, options)) return false;

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // *** MODIFIED
      // Don't validate data coming back from server
      options.validate = false;

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false; 
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');


      // *** CHANGED!!!
      if (options.patch) {
       
        options.attrs = attrs;
      }

      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    }



//------------------------------------



// overwrite Backbone's sync method to change PATCH method to PUT method. 
// also implement Namespacing, see: 
// https://github.com/documentcloud/backbone/issues/1777

Backbone.sync = function(method, model, options) {
    
    if (model && !model.namespace) {      
      console.warn("*** WARNING: this model has no namespace attribute", model)
    }

    var methodMap = {
    'create': 'POST',
    'update': 'PUT',

    // *** changed *** 
    'patch':  'PUT',
    
    'delete': 'DELETE',
    'read':   'GET'
  };

    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};
    
    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

   

    // Ensure that we have the appropriate request data.
    if (options.data === undefined && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';

      // *** CUSTOM
      // implement Namespacing
      var _data
      if (model.namespace) {
        _data = {};
        _data[model.namespace] = options.attrs || model.toJSON(options)
        //params.data = JSON.stringify(options.attrs || model.toJSON(options));
      } else {
        _data = options.attrs ||model.toJSON(options);
      }
      params.data = JSON.stringify(_data)
    }  

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };



//------------------------------------



Backbone.Model.prototype._validate = function(attrs, options) {	
	if (!options.validate || !this.validate) return true;
	
	// *** MODIFIED
	// Don't validate all attributes of a model if selection of attributes is passed;		
	if (!attrs || _.isEmpty(attrs))
		attrs = _.extend({}, this.attributes, attrs);

	var error = this.validationError = this.validate(attrs, options) || null;
	if (!error) return true;	
	this.trigger('invalid', this, error, options || {});
	return false;
  }



//------------------------------------



var _remove = Backbone.View.prototype.remove;

Backbone.View.prototype.remove = function () { 

	console.log('prototype remove called!');
	myAPP.clearTooltips();
	
	_remove.apply(this, arguments)
}

Backbone.View.prototype.initialize = function () {

	var self = this;

	this.listenTo(myAPP, 'resourcesLoaded', function () {
		console.log('refresh called on view ', self);
		self.render();
	})

}



//------------------------------------



myAPP.base64 = function(username, password) {
            
            var token = username + ":" + password;
            var hash = window.btoa ? window.btoa(token) : window.base64.encode(token);
            return hash;
}



//------------------------------------



myAPP.constants = {

	currencyMarker: "€",

	countries: [
			
                {countryCode: "af", country: "Afghanistan"},
                {countryCode: "al", country: "Albanië"},
                {countryCode: "dz", country: "Algerije"},
                {countryCode: "ad", country: "Andorra"},
                {countryCode: "ao", country: "Angola"},
                {countryCode: "ar", country: "Argentinië"},
                {countryCode: "am", country: "Armenië"},
                {countryCode: "aw", country: "Aruba"},
                {countryCode: "au", country: "Australië"},
                {countryCode: "az", country: "Azerbeidzjan"},
                {countryCode: "bd", country: "Bangladesh"},
                {countryCode: "bb", country: "Barbados"},
                {countryCode: "be", country: "België"},
                {countryCode: "bm", country: "Bermuda"},
                {countryCode: "bo", country: "Bolivia"},
                {countryCode: "ba", country: "Bosnië en Herzegovina"},
                {countryCode: "br", country: "Brazilië"},
                {countryCode: "bg", country: "Bulgarije"},
                {countryCode: "kh", country: "Cambodja"},
                {countryCode: "ca", country: "Canada"},
                {countryCode: "cf", country: "Centraal-Afrikaanse Republiek"},
                {countryCode: "cl", country: "Chili"},
                {countryCode: "cn", country: "China"},
                {countryCode: "co", country: "Colombia"},
                {countryCode: "cr", country: "Costa Rica"},
                {countryCode: "cu", country: "Cuba"},
                {countryCode: "cw", country: "Curaçao"},
                {countryCode: "cy", country: "Cyprus"},
                {countryCode: "sc", country: "De Seychellen"},
                {countryCode: "cd", country: "Democratische Replubliek Congo"},
                {countryCode: "dk", country: "Denemarken"},
                {countryCode: "do", country: "Dominicaanse Republiek"},
                {countryCode: "de", country: "Duitsland"},
                {countryCode: "ec", country: "Ecuador"},
                {countryCode: "eg", country: "Egypte"},
                {countryCode: "sv", country: "El Salvador"},
                {countryCode: "ee", country: "Estland"},
                {countryCode: "et", country: "Ethiopië"},
                {countryCode: "ph", country: "Filipijnen"},
                {countryCode: "fi", country: "Finland"},
                {countryCode: "fr", country: "Frankrijk"},
                {countryCode: "gm", country: "Gambia"},
                {countryCode: "gh", country: "Ghana"},
                {countryCode: "gi", country: "Gibraltar"},
                {countryCode: "gr", country: "Griekenland"},
                {countryCode: "gg", country: "Guernsey"},
                {countryCode: "hn", country: "Honduras"},
                {countryCode: "hk", country: "Hong Kong"},
                {countryCode: "hu", country: "Hongarije"},
                {countryCode: "is", country: "IJsland"},
                {countryCode: "in", country: "India"},
                {countryCode: "id", country: "Indonesië"},
                {countryCode: "iq", country: "Irak"},
                {countryCode: "ir", country: "Iran"},
                {countryCode: "ie", country: "Ireland"},
                {countryCode: "il", country: "Israël"},
                {countryCode: "it", country: "Italië"},
                {countryCode: "ci", country: "Ivoorkust"},
                {countryCode: "jm", country: "Jamaica"},
                {countryCode: "jp", country: "Japan"},
                {countryCode: "jo", country: "Jordanië"},
                {countryCode: "cm", country: "Kameroen"},
                {countryCode: "kz", country: "Kazachstan"},
                {countryCode: "ke", country: "Kenia"},
                {countryCode: "hr", country: "Kroatië"},
                {countryCode: "la", country: "Laos"},
                {countryCode: "lv", country: "Letland"},
                {countryCode: "lb", country: "Libanon"},
                {countryCode: "lr", country: "Liberia"},
                {countryCode: "ly", country: "Libië"},
                {countryCode: "li", country: "Liechtenstein"},
                {countryCode: "lt", country: "Litouwen"},
                {countryCode: "lu", country: "Luxemburg"},
                {countryCode: "mk", country: "Macedonia"},
                {countryCode: "my", country: "Maleisië"},
                {countryCode: "mt", country: "Malta"},
                {countryCode: "ma", country: "Marokko"},
                {countryCode: "mx", country: "Mexico"},
                {countryCode: "mc", country: "Monaco"},
                {countryCode: "me", country: "Montenegro"},
                {countryCode: "nl", country: "Nederland"},
                {countryCode: "an", country: "De Nederlandse Antillen"},
                {countryCode: "np", country: "Nepal"},
                {countryCode: "nz", country: "Nieuw Zeeland"},
                {countryCode: "ng", country: "Nigeria"},
                {countryCode: "kr", country: "Noord-Korea"},
                {countryCode: "no", country: "Noorwegen"},
                {countryCode: "ua", country: "Oekraïne"},
                {countryCode: "at", country: "Oostenrijk"},
                {countryCode: "pk", country: "Pakistan"},
                {countryCode: "ps", country: "De Palestijnse Autoriteit"},
                {countryCode: "pa", country: "Panama"},
                {countryCode: "py", country: "Paraguay"},
                {countryCode: "pe", country: "Peru"},
                {countryCode: "pl", country: "Polen"},
                {countryCode: "pt", country: "Portugal"},
                {countryCode: "qa", country: "Qatar"},
                {countryCode: "ro", country: "Roemenië"},
                {countryCode: "ru", country: "Rusland"},
                {countryCode: "sm", country: "San Marino"},
                {countryCode: "sa", country: "Saoedi-Arabië"},
                {countryCode: "sn", country: "Senegal"},
                {countryCode: "rs", country: "Servië"},
                {countryCode: "sg", country: "Singapore"},
                {countryCode: "si", country: "Slovenië"},
                {countryCode: "sk", country: "Slowakije"},
                {countryCode: "sd", country: "Soedan"},
                {countryCode: "es", country: "Spanje"},
                {countryCode: "lk", country: "Sri Lanka"},
                {countryCode: "sr", country: "Suriname"},
                {countryCode: "sy", country: "Syrië"},
                {countryCode: "tw", country: "Taiwan"},
                {countryCode: "th", country: "Thailand"},
                {countryCode: "cz", country: "Tsjechië"},
                {countryCode: "tn", country: "Tunesië"},
                {countryCode: "tr", country: "Turkije"},
                {countryCode: "uy", country: "Uruguay"},
                {countryCode: "ve", country: "Venezuela"},
                {countryCode: "gb", country: "Verenigd Koninkrijk"},
                {countryCode: "ae", country: "Verenigde Arabische Emiraten"},
                {countryCode: "us", country: "Verenigde Staten"},
                {countryCode: "vn", country: "Vietnam"},
                {countryCode: "by", country: "Wit-Rusland"},
                {countryCode: "zw", country: "Zimbabwe"},
                {countryCode: "za", country: "Zuid-Afrika"},
                {countryCode: "kp", country: "Zuid-Korea"},
                {countryCode: "se", country: "Zweden"},
                {countryCode: "ch", country: "Zwitserland"}

	],

        costs: {
                nr_sent_postals: 1.75,
                nr_payments_icepay: 0.75,
                nr_invoices_redeemed: 2.50
        },
	
	userRoles: ['admin', 'viewer', 'employee'],

	paymentTerms: [14, 30, 60],

	quoteTerms:[14, 28, 30, 60, 90],

	paymentTypes: ["Ideal", "Creditcard", "Transfer", "Other" , "User"],

	deliveryMethods: ["E-mail", "E-mail en Post", "Alleen post"],

	timePeriods: ["alles", "maand", "kwartaal", "jaar"],

	// period types for periodicals
	invoicePeriodicalPeriods: ["dagen", "weken", "maanden", "jaren"],

	months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],

	quarters: ["1e", "2e", "3e", "4e"],

	years: (function () { var array = [], startyear = 2013; for (var i = -3; i < 3; i++) { array.push(startyear + i); } return array; })(),

	vats: ["21%", "19%", "6%", "0%", "anders"],

        // maximum number of times client will poll for update on an object
        maxTimesPolled: 12
};




//------------------------------------



// global event handlers for dropdown menus;
// will trigger 'dropdown' event on related element with parameter value = data-dropdown-value or $target = the clicked element in dropdown list

$(function () {
	
	var $dropdown;

	var showSubmenu = function(event) {
	
		// remove a possible submenu
		removeSubmenu(); 
		var $this = $(this);
		
		var $target = $(event.currentTarget);
		var dropdownSubmenu = $target.attr("data-dropdown-submenu"), dropdownSubmenuParameter = $target.attr("data-dropdown-submenu-parameter");

		if (!dropdownSubmenu)
			throw "no submenu associated with this option";
		
		var offset = $this.offset(), width = $this.closest(".dropdown-content").width()

		var $submenu = $(JST["templates/dropdowns/" + dropdownSubmenu + ".html"]({parameter: dropdownSubmenuParameter}))
			.appendTo($("body"))
			.css({position: "absolute", top: offset.top, left: offset.left + width, zIndex: 9999 })
			.addClass("dropdown-submenu dropdown-content")	
						
	}	

	var removeSubmenu = function (event) {	
		
		// don't remove submenu when entering submenu or (re-)entering option that has a submenu		
		if (event) {

			var $relatedTarget = $(event.relatedTarget);
			
			if ($relatedTarget.hasClass("dropdown-submenu") || 
				$relatedTarget.closest(".dropdown-submenu").length > 0 || 
				$relatedTarget.hasClass("scrollbar") || 
				$relatedTarget.hasClass("marker")) {
				
				return;			
			}
		}
		
		$("body").find(".dropdown-submenu").remove();
	}

	var createDropDown = function ( $this ) {

		var dropdown = $this.attr("data-dropdown"),
			offset = $this.offset();	
			dropdownObject = $this.attr("data-dropdown-object")

		$dropdown = $(JST["templates/dropdowns/" + dropdown + ".html"]({ dropdownObject: myAPP._dropdownObject }))
			.appendTo("body")
			.css({position: "absolute", left: offset.left, top: offset.top + $this.outerHeight() + 10})
			.addClass("dropdown-content");			

		var items = $dropdown.find(".list-item").length;
		
		// add scrollbar if dropdown becomes too long
		if (items > 10)
			$dropdown.scrollbar();		

		// set handlers for submenus		
		if ($dropdown.hasClass("has-submenus")) {			
			$("body").on("mouseover", ".dropdown-content .show-submenu", showSubmenu)
			$dropdown.on("mouseout", ".dropdown-submenu, .show-submenu", removeSubmenu)
		}

	}

	// *************************************
	//
	//      event handlers
	//
	// *************************************


	
	// clickhandler for creating the dropdown;
	$("body").on("click", ".myAPP-dropdown", function (event) {			

		// remove any existing dropdowns;
		$(".dropdown-content").remove();

		$this = $(this);

		createDropDown( $this )
		
	})

	// clickhandler for removing the dropdown;
	$("body").on("click", function (event) {		

		var currentValue,
			value,
			$element,
			$dropdown = $(".dropdown-content")

		if ($dropdown.length === 0)
			return;

		// prevent the handler from removing the dropdown on the same click as the dropdown is created;
		if (!$dropdown.hasClass("mark")) {
			$dropdown.addClass("mark")
			return;
		}

		var $target = $(event.target);				
		if (jQuery.contains($dropdown[0], $target[0]) || ($(".dropdown-submenu")[0] && jQuery.contains($(".dropdown-submenu")[0], $target[0]))) {	

			// ignore clicks on the scroll bar
			if ($target.hasClass("scrollbar") || $target.hasClass("marker")) {				
				return
			}


			// currentValue = $this.find(".value").text()
			
			$element = $target.closest("[data-dropdown-value], [data-dropdown-submenu]"); 
			value = $element.attr("data-dropdown-value")

			if ($element.attr("data-dropdown-submenu") !== undefined) {			
				return;
			}				
			
			// if we can't find a .list-item parent, just return the element on which the click occured;
			//if ($element.length === 0) {

			
			if (value) {
				$this.trigger("dropdown", value)					
			} else {				
				// jQuery doesn't pass along objects with length property unmodified, so we use the array work-around
				// see: http://bugs.jquery.com/ticket/5532
				$this.trigger("dropdown", [ $element ])
			}
			
			if ($this.hasClass("myAPP-dropdown-autoupdate")) {					
				myAPP.animations.blink($this.find(".value"), $element.find(".value").text());	
			}						
			
		}
		// remove dropdown
		$dropdown.remove();	
		$(".dropdown-submenu").remove();

	});

	myAPP.clearDropdowns = function () {		
		if ($dropdown)
			$dropdown.remove();
	}

});




//------------------------------------



myAPP.fetchResources = function ( parameters ) {

	if (myAPP.isFetchingResources)
		return;

	myAPP.createLoaderPopup();

	myAPP.resourcesFetched = 0;
	myAPP.totalResources = 12;	
	myAPP.isFetchingResources = true;
	myAPP._onFetchSuccess = parameters && parameters.success;

	// reset all resources
	myAPP.createGlobalResources();

	// fetch resources;
	myAPP.invoices.fetch({ success: function () {  myAPP.onFetchSuccess("facturen"); }});
	myAPP.debtors.fetch({ success: function () {   myAPP.onFetchSuccess("debiteuren"); } });
	myAPP.articles.fetch({ success: function () {  myAPP.onFetchSuccess("artikelen"); } });		
	myAPP.articleGroups.fetch({ success: function () {  myAPP.onFetchSuccess("artikelgroepen"); } });
	myAPP.payments.fetch({ success: function () {  myAPP.onFetchSuccess("betalingen"); } });
	myAPP.periodicals.fetch({ success: function () {  myAPP.onFetchSuccess("periodieken"); } });
	myAPP.periodicalChildren.fetch({ success: function () {  myAPP.onFetchSuccess("periodieken") } });
	myAPP.objections.fetch({ success: function () {  myAPP.onFetchSuccess("bezwaren");	} });
	myAPP.accountSettings.fetch({ success: function () {  myAPP.onFetchSuccess("instellingen"); } });		
	myAPP.paymentPlans.fetch({ success: function () {  myAPP.onFetchSuccess("regelingen"); } });	
	myAPP.balances.fetch({ success: function () {  myAPP.onFetchSuccess("kosten"); } });		
	myAPP.templates.fetch({ success: function () {  myAPP.onFetchSuccess("templates"); } });		

	if (parameters.fetchAccount) {
		myAPP.currentAccount.fetch({ success: function () {  myAPP.onFetchSuccess("account"); } });
		myAPP.accountSettings.fetch({ success: function () {  myAPP.onFetchSuccess("account-settings"); } });
		myAPP.totalResources = myAPP.totalResources + 2;
	}

};

myAPP.dummyFetchResources = function ( parameters ) {

	myAPP.createLoaderPopup();

	myAPP.resourcesFetched = 0;
	myAPP.totalResources = 11;	
	myAPP.isFetchingResources = true;
	myAPP._onFetchSuccess = parameters && parameters.success;

	var resources = ["facturen", "debiteuren", "artikelen", "artikelgroepen", "betalingen", "periodieken", "verzonden periodieke facturen",
		"bezwaren", "account instellingen", "betalingsregelingen", "kosten" ],
		resource,
		timer = 0;

	for (var i = 0 ;  i < resources.length; i++) {
		resource = resources[i];
		var number = _.random(30);
		timer = number * number;
		setTimeout( function () { myAPP.onFetchSuccess( resource ) }, timer);
	}

};

myAPP.createLoaderPopup = function () {
	
	$(".mainPaneWrapper").animate({ opacity: 0.3 });

	$(JST["templates/popups/resource-loader.html"]())	
		.appendTo( $("body").find("#mainpane"))
		.css({ top: "+=75", opacity: 0 })
		.animate({ opacity: 1, top: -75 }, { specialEasing: { top: "easeOutCubic" }});


	myAPP.animateProgressBar();
	setInterval(myAPP.animateProgressBar, 1500);

};

myAPP.animateProgressBar = function () {

	var width = $(".progress-bar .indicator").width();	

	$(".progress-bar .animation")
		.css({ opacity: 1, width: 0 })
		.animate({ opacity: 0, width: width }, { easing: "easeOutCubic", duration: 500 })
};

myAPP.removeLoaderPopup = function ( callback ) {

	var $loader = $("body").find("#loader");

	$loader
		.find(".indicator")
		.stop(true)
		.animate({ width: "100%" }, { complete: function () {
			
			$loader.animate({ top: "+=75", opacity: 0 }, { specialEasing: { top: "easeOutCubic" },
				complete: function () { 
					$loader.remove(); 
					if (callback)
						callback();
					$(".mainPaneWrapper").animate({ opacity: 1 });
				}});
			
		}});
	
	clearInterval(myAPP.animateProgressBar);
};

myAPP.updateLoaderPopup = function ( percentage, resource ) {

	var $loader = $("body").find("#loader");

	$loader.find(".resource").html(resource);
	$loader.find(".counter").html(  myAPP.resourcesFetched + " van " + myAPP.totalResources);
	$loader.find(".indicator").stop(true).animate({ width: percentage + "%" });

};

myAPP.onFetchSuccess = function ( resource ) {

	var percentage;

	myAPP.resourcesFetched++;
	percentage = Math.ceil(myAPP.resourcesFetched / myAPP.totalResources * 100); 
	myAPP.updateLoaderPopup( percentage, resource );
		
	if (myAPP.resourcesFetched === myAPP.totalResources && myAPP.isFetchingResources) {	

			// we're done loading;			
			myAPP.isFetchingResources = false;		
			// callback;
			myAPP.onFetchResourcesSuccess();				

	}

};

myAPP.onFetchResourcesSuccess = function () {

				var i;

				// *** Stuff to do once loading is complete;

				// *************************************
				//
				//      periodicalChildren;
				//
				//		add periodical children before processing invoices collection!
				//
				// *************************************
				
				// assign periodical children to periodical objects, and to invoices collection

				for (i = 0; i < myAPP.periodicalChildren.models.length; i++) {
					var child = myAPP.periodicalChildren.models[i],
						parentId = child.get( "periodical_id" );
					
					// *** temporary!!!!
					child.invoiceLines.fetch();

					var periodical = myAPP.periodicals.get( parentId );

					if (periodical)
						periodical.childInvoices.add( child );

				}

				myAPP.invoices.add( myAPP.periodicalChildren.models );
				
				// *************************************
				//
				//      invoices
				//      quotes
				//      creditInvoices
				//      
				//
				// *************************************				

				for (i = 0; i < myAPP.invoices.models.length; i++) {
					var invoice = myAPP.invoices.models[i];

					// get rid of deleted invoices;
					if (invoice.get( "deleted" )) {
						myAPP.invoices.remove( invoice );
						continue;
					}	

					// add debtor to invoice and vice versa;					 
					var debtor = myAPP.debtors.get(invoice.get( "account_debtor_id" ));
					if (debtor) {
						invoice.debtor = debtor;
						debtor.addInvoice( invoice );
					}

					// add creditInvoice to parentinvoice;
					if (invoice.get( "isCreditInvoice" )) {						
						var parentInvoice = myAPP.invoices.get( invoice.get( "parent_credit_id" ) );
						if (parentInvoice)
							parentInvoice.addCreditInvoice( invoice );
						continue;
					}

					// move quotes to separate collection;
					if (invoice.get( "isQuote" )) {
						if (invoice.get("status") === "ready" || invoice.get("status") === "draft")
							continue;					
						myAPP.quotes.add( invoice );
					}			
				
				}

				myAPP.invoices.remove( myAPP.quotes.models );

				// *************************************
				//
				//      unsent periodicals
				//
				// *************************************

				// move periodicals from invoices to periodicals; necessary because periodicals from facturen.net are listed as regular invoices;
				var periodicals = myAPP.invoices.where({ status: "periodical" });

				_.each(periodicals, function (invoice) {

					// ignore deleted invoices
					if (invoice.get("deleted"))
						return;
					
					var _periodical = invoice.toPeriodical();
					myAPP.periodicals.add( _periodical );

				});	

				// remove the periodicals from the invoices collection;
				myAPP.invoices.remove( periodicals );	

				// periodicals can't be delete, but they can be stopped; so we shouldn't show stopped periodicals as they're considerd deleted by the user.
				var stoppedPeriodicals = myAPP.periodicals.where({ period: "stop" });
				myAPP.periodicals.remove( stoppedPeriodicals );	
				
				// *************************************
				//
				//      payments
				//
				// *************************************

				for (i = 0; i < myAPP.payments.models.length; i++) {
					var payment = myAPP.payments.models[i],
						invoice = myAPP.invoices.get( payment.get( "invoice_id" ) ),
						debtor = myAPP.debtors.get( payment.get( "account_debtor_id" ) );

					if (invoice) {							
						invoice.addPayment( payment );	
						payment.invoice = invoice;						
					}

					if (debtor) {
						payment.debtor = debtor;
					}
				}

				// *************************************
				//
				//      notifications
				//
				// *************************************

				// ** TEMPORARY generate notifications on all resources loaded;
				myAPP.notifications.fetch();

				// *************************************
				//
				//      calculate Statistics
				//
				// *************************************
				// 
				myAPP.invoices.calculateStatistics();
				myAPP.payments.calculateStatistics();

				// *************************************
				//
				//      create autocomplete entries
				//
				// *************************************
				
				myAPP.removeLoaderPopup( myAPP._onFetchSuccess );

				myAPP.trigger("resourcesLoaded");
};

	




//------------------------------------



myAPP.resizeImage = function (image, maxWidth, maxHeight) {

	// if (!(image instanceof Image))
	// 	throw "image parameter is not an Image object";

	var scaleFactor; 

		width = image.width; 
		height = image.height;

	var getScaleFactor = function (value, maxValue) {
		if (value > maxValue) {			
			return maxValue / value;
		}
		return 1
	}

	scaleFactor = getScaleFactor(width, maxWidth);

	if (height * scaleFactor > maxHeight) {
		// image still too large
		scaleFactor = getScaleFactor(height, maxHeight)

	}

	image.width = Math.round(width * scaleFactor); 
	image.height = Math.round(height * scaleFactor);

}



//------------------------------------



myAPP.setupImageUpload = function (options) {

	var $element = options.element,
		$droparea = $element.find(".drop-area"),
		$input = $element.find("input"),
		url = options.url,		
		lastEnter

	// setup ajax image upload
	console.log($element);

	$element.fileupload({
		url: url,
		fileInput: $input,		

		add: function (e, data) { 
			$droparea.stop(true).css({ backgroundColor: "#fff", borderColor: "#ccc" });
			$droparea.find(".image-holder").empty();
			$droparea.find( ".placeholder" ).html( "<div class=\"file-upload-bar\"><div class=\"indicator\"></div></div>" );
			data.submit();
			// clear tooltip form hovering over uplaod button
			myAPP.clearTooltips();
			myAPP.animations.removeErrorMarkup($droparea);
		},					

		progressall: function (e, data) { 
			
			var progress = parseInt(data.loaded / data.total * 100, 10);
			var $progressIndicator = $droparea.find(".indicator");
			$progressIndicator.stop(true).animate({ width: progress + "%" })
		},

		done: function (e, data) {									
			$(".file-upload-bar").remove();				
			var url = myAPP.accountSettings.get("logoUrl");				
			myAPP.loadImage($droparea.find(".image-holder"), url, 300, 160)														

			if (options.success)
				options.success();

		},

		fail: function () {									
			$droparea.find(".placeholder").html("<div class=\"text\">Upload gif, jpeg of png</div>");
			myAPP.animations.addErrorMarkup($droparea, myAPP.texts.errors.incorrectFileFormat);									

			if (options.error)
				options.error();
		}

	})

	// HTML5 drag events	

	$element
		.on("dragenter", function (event) { 
			$droparea.stop(true).animate({backgroundColor: "#f7faff", borderColor: "#4080be"})
			$droparea.find("img").stop(true).animate({opacity: 0.2})
			lastEnter = event.target
		})
		.on("dragleave", function (event) { 
			if (lastEnter !== event.target)
				return;
			$droparea.stop(true).animate({backgroundColor: "#fff", borderColor: "#ccc" })
			$droparea.find("img").stop(true).animate({opacity:1 })
		})

}



//------------------------------------



// loads image, fades it in;

myAPP.loadImage = function ($element, url, maxWidth, maxHeight, duration) {

	duration = duration || 400;

	//url = url + "&" + new Date().getTime();

	var $img = $("<img>")			
		.attr({ src: url })
		.css({ display: "block", opacity: 0 })									
		.prependTo($element)	

	$img.on("load", function () {

		myAPP.resizeImage($img[0], maxWidth, maxHeight);

		var marginLeft = ((maxWidth - $img[0].width) / 2) | 0,
			marginTop = ((maxHeight - $img[0].height) / 2) | 0;

		$img.css({ marginLeft: marginLeft, marginTop: marginTop, width: $img[0].width, height: $img[0].height })
			.animate({ opacity: 1 })
	
	})
		
}



//------------------------------------



// get changes in the model, after getters & setters

Backbone.Model.setChangedValues = function () {

	// store the old initialize function
	var _initialize = this.prototype.initialize;

	_.extend(this.prototype, {

		initialize: function () { 
			_initialize.apply(this, arguments);
			this._oldValues = _.clone(this.attributes)

			var self = this;

			this.listenTo(this, 'sync', function () {				
				self.resetChangedValues() 
			})
		},

		// i don't know about this.........
		resetChangedValues: function () {			
			this._oldValues = this.getAttributes();		
		},

		getChangedValues: function (resetChangedValues) {

			var self = this, changedValues;

			var values = this.getAttributes();

			for (var key in values) {			

				if (values[key] !== this._oldValues[key]) {						
					if (!changedValues)
						changedValues = {};
					changedValues[key] = values[key]				
					
				}
			}		

			// reset _oldValues if desired
			if (resetChangedValues)
				this._oldValues = this.getAttributes();
			
			return changedValues;
		}
	});


	return this;

}



//------------------------------------



// // we expected dependencies to be listed as such: 
// //
// //	[this.]computedValues: { computedValue_1: ['dependency1', 'dependency2'], computedValue_n: ...   }
// //
// //	it expects a function to exist for each computed value, with a name similar to the computedValue; 
// //  as the computedValue will be stored in model.attributes, this won't cause a naming conflict, and save us the trouble
// //  of manually firing event handlers when the computedValue is set. 
// //
// // found this at http://jsfiddle.net/Cpn3g/250/, changed it a bit

// // DONT USE COMPUTED VALUES IF YOU ACTUALLY WANT GETTERS AND SETTERS: COMPUTED VALUES IS STRICTLY FOR VALUES DEPENDING ON OTHER VALUES
// // linking event handlers if you will

// Backbone.Model.setComputedValues = function () {

// 	//var model = this;

// 	var _initialize = this.prototype.initialize;

// 	_.extend(this.prototype, {

// 		initialize: function () {
// 			_initialize.apply(this, arguments)

// 			if (!this.computedValues)
// 				throw "can\'t initialize computed values without definition of the computed values and dependencies";

// 			var self = this;
						
// 			// initialize computed Values on model initialization;
// 			// assumes a method with the same name as the computed value exists!
// 			for (var computedValue in this.computedValues) {					
// 				this.set(computedValue, this[computedValue]());
// 			}

// 			var listener = function (attribute, dependency) { return function (model) {				
// 				self.set(attribute, self[attribute].call(self));
// 			}}

// 			for (var key in this.computedValues) {
// 				for (var i = 0; i < this.computedValues[key].length; i++) {
// 					var dependency = this.computedValues[key][i];				
// 					this.listenTo(this, 'change:' + dependency, listener(key, dependency));
// 				}
// 			}
// 		}
// 	});	

// 	return this;
	
// }



//------------------------------------



// original coded by berzniz, 
// https://github.com/berzniz


Backbone.Model.setGettersSetters = function () {

	var _get = this.prototype.get,
		_set = this.prototype.set

	_.extend(this.prototype, {
	
		get: function(attr) {
			// Call the getter if available
			// *** NEW: if no getter, see if a computed value calculator is present 
			// ( which we consider a function on the model with same name as requested attribute)
			
			if (this.getters && _.isFunction(this.getters[attr])) {
				return this.getters[attr].call(this, this.attributes[attr]);
			}
			//} else if (this[attr] && _.isFunction(this[attr])) {
			//	return this[attr].call(this)
			//}

			return _get.call(this, attr);
		},

		set: function(key, value, options) {
			var attrs, attr;

			// Normalize the key-value into an object
			if (_.isObject(key) || key === null) {
				attrs = key;
				options = value;
			} else {
				attrs = {};
				attrs[key] = value;
			}
						
			// Go over all the set attributes and call the setter if available
			// also, trim spaces if a string

			for (attr in attrs) {				
				if (this.setters && _.isFunction(this.setters[attr])) {					
					// trim spaces
					if (typeof attrs[attr] === "string")
						attrs[attr] = attrs[attr].trim();
					// run through applicable setter
					attrs[attr] = this.setters[attr].call(this, attrs[attr]);		

				}	
			
			}

			return _set.call(this, attrs, options);
		},

		// make sure the getters and setters are used when returning model's attributes - if this is desired; 
		// this method "replaces" Backbone's toJSON();
		getAttributes: function  () {			
			var response = _.clone(this.attributes)
			
			for (var key in response) {
				response[key] = this.get(key);
			}		

			return response;

		}

	})

	return this;

};



//------------------------------------



// Doesn't apply getters; looks at raw data sent to server;
// N.B. validates works both ways: both data to and from the server is evaluated;


Backbone.Model.validates = function () {

	if (!this.prototype.validation) {		
		console.error("* DEBUG: ", this.prototype);
		throw "validates.js : validation interface active but no validation object on model" 
	}

	var _validate = function( validator, value, scope ) {		

		var error, errorMessage, key;

		// first apply validation;
		if (typeof validator === "function")
			error = validator.call(scope, value);

		else if (typeof validator === "object") {
			for (key in validator) {				
				error = (typeof validator[key] === "function") ? 
					validator[key].call( scope, value ) : myAPP.validationMethods[key]( value, validator[key] );		
				if (error)
					break;
			}
			
		}

		else {
			// throw an error on incorrect debug object
			console.error("* DEBUG ");	
			throw  "validates.js: incorrect validator";
		}

		// translate error to an errorMessage
		if (error) {
			if (typeof error === "object") {
				return error.errorMessage
			} else {
				errorMessage = myAPP.texts.errors[error]
				if (errorMessage) {
					errorMessage = errorMessage.replace(/%parameter%/, validator[key])
					return errorMessage;
				} else {
					console.warn("No error message for: ", error)
					return error;
				}
			}
		}

		
	}

	_.extend(this.prototype, {

		// tests the fields passed in attributes		
		validate: function( attributes, options ) {

			var errors; 

			for (var key in attributes) {

				if (this.validation[key]) {
					var error = _validate( this.validation[key], attributes[key], this)

					

					if (error) {
						if (!errors) {
							errors = {}
						}
						errors[key] = error;
					}
				}
					
			}		
			
			return errors;

		},

		// tests if model as a whole is valid
		validateAll: function () { 
			var errors; 

			for (var key in this.validation) {			
				
				if (this.validation[key]) {
					var error = _validate( this.validation[key], this.attributes[key], this)

					if (error) {
						if (!errors) { 
							errors = {}
						}

						errors[key] = error;
					}
				}
			}			
			
			return errors;
		}

	});

	return this;

}



//------------------------------------



myAPP.modelHelpers = {

	parseDate: function  (dateString )  {				

			if (!dateString || !dateString.match)
				return;
		
			var match = dateString.match(/(\d{4})-(\d{2})-(\d{2}).*/)
			
			if (!match) {
				throw "Wrong date format handed to parseDate: " + dateString;				
			}
			
			// months are numbered 0 - 11 in javascript Date class
			return new Date(match[1], Number(match[2]) - 1, match[3])

	},

	parseToServerDate: function (date) {

			if (!(date instanceof Date)) {				
				return date;
			}

			var _date, day, month; 

			day = date.getDate();			
			day = day < 10 ? "0" + day : day;
			month = date.getMonth() + 1;			
			month = month < 10 ? "0" + month : month;				
			_date = date.getFullYear() + "-" + month + "-" + day;	

			return _date
	},

	parseZipcode: function ( zipcode ) {

			if (!zipcode)
				return;

			var match = zipcode.trim().match(/(\d{4})\s*([a-zA-Z]{2})/)
			if (match)
				return match[1] + " " + match[2]
			else
				return zipcode

	},

	parseAmount: function (value) {	

			// if the value is a string: 
			if (value && typeof value === "string") {
				
				// remove all non decimals
				value = value.replace(/[^0-9\.\-,]/g, "")			
			
				// replace comma with dot
				if (value.match(/,/)) {				
					value = value.replace(/,/g, ".");				
				}
													
			}
				
			value = parseFloat(value)

			if (isNaN(value))
				value = 0;

			return value;
	}

}



//------------------------------------



myAPP.parseInput = {

	amount: function (value) {

			// if value is already a number, skip parsing
			if (!isNaN(value))
				return value

			// remove all letters and stuff from value;
			value = value.replace(/[^0-9\.,]/g, "")
			
			if (value.match(/,/)) {				
				value = value.replace(/\./g, "");				
				value = value.split(",");				
				var integer = value.shift();

				// test comment;

				var decimals = value.join();
				value = Number(integer + "." + decimals)				
				

			} else {	
				value = parseFloat(value)
			}

			return value;
	}

}



//------------------------------------



/*
 * Tiny Scrollbar
 * http://www.baijs.nl/tinyscrollbar/
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 13 / 08 / 2012
 * @version 1.81
 * @author Maarten Baijs
 *
 */
;( function( $ ) {


    $.fn.scrollbar = function( params ) {

        var $viewPort, $content, $scrollbar, $marker, ratio, mouseStart, offset = 0; 
        
        var options = {

            viewPortHeight: 260,
            wheel: 40

        }

        var mouseWheelHandler = function (event) { 
                
                var delta = event.originalEvent.wheelDelta ? event.originalEvent.wheelDelta / 120 : event.originalEvent.detail / 3;
                var scroll = delta * options.wheel;
                
                offset += scroll;

                var maxHeight = $content.height() - $viewPort.height();

                if (offset < maxHeight * -1)
                    offset = maxHeight * -1;

                if (offset > 0)
                    offset = 0;

                $marker.css({ top: Math.floor( - offset * ratio) });
                $content.css({ top: offset })

                event.preventDefault();                
            
        }      

        var mousedownHandler = function (event) {

            var mouseStart = event.pageY,
                markerStart = parseInt($marker.css("top"), 10);

            $marker.addClass("pressed")
                
            // the actual mousemove handler
            $("body").bind("mousemove", function ( event) {                                           

                var markerOffset = (event.pageY - mouseStart) + markerStart;
                var maxMarkerOffset = $scrollbar.height() - $marker.height()
                var maxHeight = $content.height() - $viewPort.height();

                offset = markerOffset / maxMarkerOffset * maxHeight * -1;

                if (offset < maxHeight * -1)
                    offset = maxHeight * -1;

                if (offset > 0)
                    offset = 0;
                
                $marker.css({ top: Math.floor( - offset * ratio) })
                $content.css({ top: offset })

            })

            $(window).one("mouseup", function () {          
                $marker.removeClass("pressed")      
                $("body").off("mousemove")
            })
           
        }   

        this.each( function() { 
            
            var $this = $( this );

            $viewPort = $this;            

            $this.wrapInner( $("<div class='content'></div>") );

            $content = $this.find(".content")
                                .css({ width: $this.width() });  
            
            $scrollbar = $("<div class='scrollbar'><div class='marker'></div></div>")
                .appendTo( $this )           
                .css({ height: options.viewPortHeight, left: $content.width() })

            $this
                .addClass("scrollable")
                .css({ height: options.viewPortHeight })

            // create a little extra width for the scrollb ar=
            $this.css({ width: $content.width() + 15 });                

            ratio = options.viewPortHeight / $content.height();

            // substract a little to account for marker border, shadow, etc.
            $marker = $scrollbar.find(".marker")
                .css({ height: ratio * options.viewPortHeight - 3 })            

            $this.bind("DOMMouseScroll mousewheel", mouseWheelHandler)

            $marker.bind("mousedown",mousedownHandler)               
                
        });

        return this;
    };


}(jQuery));



//------------------------------------



$(function () {

	$("body").on("click", "li.tab", function () { 
		$(this).siblings().removeClass("selected");
		$(this).addClass("selected")
	})

})



//------------------------------------



myAPP.templateHelpers = {
	
	month: function (month) {
		var months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
		return months[month];
	},

	fullMonth: function (month) {
		var months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
		return months[month];
	},

	parseDate: function (date) {
		if (!(date instanceof Date))
			//throw "date parameter for myAPP.templateHelpers.parseData is wrong format!: " + date;		
			return;
		return date.getDate() + " " + myAPP.templateHelpers.month(date.getMonth()) + " " + date.getFullYear();
	},

	parseTime: function (date) {
		if (!(date instanceof Date))
			throw "date parameter for myAPP.templateHelpers.parseTime is not a Date object";
		var hours = date.getHours();
		var minutes = date.getMinutes();
		return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
	},
 
	// ### parseNumber	(<span class="parameter">parseNumber</span>)
	// parses a number to a string, two decimals. The additional code is required because of javascript's rounding of floating point variables	
	// <span class="small">accepts</span><span class="type">{ number }</span><code>1039.995</code>
	// 
	// <span class="small">returns</span><span class="type">{ string }</span><code>"1040.00"</code>

	parseNumber: function (number) {
		var numberString;

		number = Number(number);
		if (isNaN(number))
			return;	

		number = this.roundUp(number, 2);		

		numberString = String((+number).toFixed(2)).replace(".", ",");	
		numberString = numberString.replace(/(\d+)(\d{3}\,\d{2})/, "$1.$2");
		return numberString;
	},	

	// fix from: http://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
	roundUp: function(number, decimals)	{
		decimals = decimals || 0;
		var s = String(number);
		var regExp = "(\\.\\d{" + decimals +"})5";
		if(number % 1) {
			s = s.replace(new RegExp(regExp), '$16');
		}
		return Number((+s).toFixed(decimals));
	},	
	
	charCodes: {
		newInvoice: "&#xe91d;",		
		invoice: "&#xe91e;",
		invoices: "&#xe91c;",
		periodical: "&#xe8aa;",
		quote: "&#xe827;",
		invoiceLines: "&#xe8a5;",

		leftArrow: "&#xe880;",
		rightArrow: "&#xe881;",
		leftArrow2: "&#xe87c;",
		rightArrow2: "&#xe87d;",
		
		// invoice statuses
		ready: "&#xe836;",
		draft: "&#xe836;",
		approved: "&#xe862;",
		send: "&#xe8b7;",
		credit: "&#xe817;",
		reminder: "&#xe864;",
		summation: "&#xe83e;",
		collection: "&#xe91f;",
		objection: "&#xe82c;",
		paymentPlan: "&#xe8d1;", 
		stopped: "&#xe898;",
		debited: "&#x25A0;",
		redeemed: "&#xe83c;",
		payed: "&#xe812;",
		sending: "&#xe863;",
		startedFromReminder: "&#xe85c;",
		
		warning: "&#xe83e;",
		
		sent: "&#xe805;",
		email: "&#xe805;",

		pause: "&#xe899;",
		paused: "&#xe899;",
		edit: "&#xe836;",
		start: "&#xe897;",
		back: "&#xe820;",
		stop: "&#xe898;",
		reset: "&#xe88f;",
		cancel: "&#xe813;", 
		close: "&#x2715;",
		archive: "&#xe851;",
		resend: "&#xe8b7;",
		swapVat: "&#xe892;",

		
		// delete is a reserverd keyword in javascript
		ddelete: "&#xe847;",
		thumbsup: "&#xe82b;",
		suitcase: "&#xe8bc;",
		password: "&#xe824;",

		account: "&#xe840;",
		subscription: "&#xe8dd;",
		
		login: "&#xe85c;",
		logout: "&#xe85d;",
		settings: "&#xe856;",
		dashboard: "&#xe8de;",

		admin: "&#xe8d7;",
		employee: "&#xe80a;",
		viewer: "&#xe826;",

		search: "&#xe803;",

		debtor:  "&#xe80a;",
		user: "&#xe80a;",
		addUser: "&#xe80c;",
		users: "&#xe80b;",

		company: "&#xe8bc;",
		payment: "&#xe8cf;",		
		address: "&#xe841;",
		contact: "&#xe854;",
		building: "&#xe920;",
		template: "&#xe84b;",

		calendar: "&#xe85b;",

		//preview: "&#xE70A;",
		save: "&#xe8d0;",
		attachment: "&#xe823;",
		upload: "&#xe82e;",
		download: "&#xe82d;",

		addLine: "&#xe8a6;",
		article: "&#xe859;",
		articleGroup: "&#xe85a;",		

		time: "&#xe862;",
		pdf: "&#xe826;",
		view: "&#xe826;",
		help: "&#xe81c;",
		
		open: "&#xe825;",
		reply: "&#xe83b;",
		rejected: "&#xE80A;",
		error: "&#xe814;",
		
		approve: "&#xe812;",
		reject: "&#xe813;",

		active: "&#x25B6;",

		upgrade: "&#x1F680;",
		
		logo: "&#xe80f;",
		hourglass: "&#xe863;",
		
		postal: "&#xe805;",
		notification: "&#xe8d2;",

		piechart: "&#xe8c4;",

		

		list: "&#xe8a5;",
		cog: "&#xe855;",
		imported: "&#xe86c;"

	}

};



//------------------------------------



myAPP.texts = {

	forgotPassword: "Vul onderstaande gegevens in. We sturen u dan een link waarmee u het wachtwoord kunt herstellen." ,
	signup: "Vul uw e-mailadres in om u aan te melden bij KasCo. We sturen u dan een link om uw e-mailadres te verifiëren.",
	emailRequired: "Vul een e-mailadres in",
	invalidEmail: "%email% is geen geldig e-mailadres",
	confirmEmail: "Vul twee keer hetzelfde e-mailadres in",
	emailNotFound: "Onbekend e-mailadres",
	incorrectDataFromUrl: "De link uit de e-mail bevat onjuiste informatie. Probeer nogmaals uw wachtwoord te resetten, of neem contact op met %email%",
	
	multipleAccounts: "Aan dit e-mailadres zijn meerdere accounts gekoppeld. Selecteer de account waarmee u wilt inloggen.",
	accountTitleRequired: "Vul een bedrijfsnaam in",
	accountTitleLength: "De bedrijfsnaam moet uit minstens 2 letters bestaan",
	confirmationEmailSent: "Bedankt voor uw aanmelding bij KasCo. We hebben een e-mail met instructies verzonden naar %email%",
	passwordResetSent: "We hebben een e-mail met instructies voor het herstellen van uw wachtwoord verzonden naar %email%",
	choosePassword: "Vul hieronder tweemaal hetzelfde wachtwoord in. Kies een geschikt wachtwoord, bij voorkeur bestaande uit willekeurig gekozen letters, cijfers en speciale karakters.",
	passwordLength: "Het wachtwoord moet minimaal 8 tekens bevatten",
	passwordAlphanumerical: "Uw wachtwoord mag geen speciale tekens bevatten",
	confirmPassword: "Vul tweemaal hetzelfde wachtwoord in",
	passwordComplete: "Uw wachtwoord is ingesteld. U kunt nu met uw wachtwoord inloggen.",

	// invoice
	noZeroTotalInvoice: "Een factuur kan geen totaal van € 0,00 hebben.",
	noNegativeTotalInvoice: "Een factuur kan geen negatief totaal hebben. Wilt u een creditfactuur versturen? Ga daarvoor naar de te crediteren factuur en kies creditfactuur.",	
	incompleteAccount: "We kunnen uw factuur niet versturen omdat we niet alle benodigde gegevens hebben. Wilt u uw account nu compleet maken?",
	unknownError: "Er heeft zich een onbekende fout voorgedaan. Neem a.u.b. contact op met info@kascooperatie.nl",
	maxInvoicesSent: "U heeft het maximale aantal facturen voor deze maand verzonden. Om meer facturen te versturen dient u uw account te upgraden en lid te worden van KasCo.<br></strong>Een lidmaatschap kost € 17,50 per maand.</strong>",
	invoiceDatePast: "De gekozen factuurdatum ligt in het verleden. De door u gekozen betaaltermijn is dus deels verstreken.",
	invoiceDateFuture: "De gekozen factuurdatum ligt in de toekomst. De factuur wordt pas op de door u gekozen dag verzonden.",
	accountInactive: "Uw account is op dit moment niet actief. U kunt nu geen facturen versturen met uw KasCo account. Neem contact op met KasCo voor meer informatie.",
	noKvkNumber: "U heeft geen Kvk nummer ingesteld voor uw facturen. Wilt u de factuur zonder kvk nummer verzenden?",
	noInvoiceNumber: "U kunt geen herinnering versturen zonder een factuurnummer in te voeren",
	redeemInvoice: "De kosten voor het kwijtschelden van de incassokosten bedragen € 2,50. Wilt u doorgaan?",
	deleteInvoice: "Let op: U staat op het punt een verzonden factuur te verwijderen. Doorgaan?",
	transferVat: "Wilt u de btw verleggen? De btw-percentages worden op 0% gezet.",

	inappropriatePaymentTerm: "Let op: een redelijke betalingstermijn dient minstens 14 dagen te zijn",
	extraCostsDeliveryMethod: "Let op: voor het verzenden van een factuur per post wordt € %costs% in rekening gebracht.",
	noDebtorEmail: "Van debiteur %debtor% is geen e-mailadres bekend. Voer het e-mailadres in of kies een andere verzendmethode.",

	// quote
	quoteDatePast: "De gekozen offertedatum ligt in het verleden. De door u gekozen acceptatietermijn is dus deels verstreken. Wilt u doorgaan?",
	quoteDateFuture: "De gekozen offertedatum ligt in de toekomst. De offerte wordt pas op de door u gekozen dag verzonden. Wilt u doorgaan?",

	// payment
	warnExtraCosts: "Voor deze factuur gelden incassokosten. Als de debiteur slechts de hoofdsom heeft betaald, zal het incassotraject doorlopen." +
		"Indien u het incassotraject wilt stoppen, dient u de factuur kwijt te schelden. Voor meer informatie kunt u contact met ons opnemen.",

	// credit invoice;
	alreadyHasCreditInvoice: "Voor deze factuur is al een creditfactuur verzonden. Wilt u nog een creditfactuur versturen?",
	noPositiveTotalCreditInvoice: "Een creditfactuur kan geen positief saldo hebben",
	creditInvoicesTotalExceedsParent: "Door verzending van deze creditfactuur is er meer gecrediteerd dan het totaalbedrag van de oorspronkelijke factuur. Wilt u doorgaan?",
	partialTotalCreditInvoice: "U stuurt nu een creditfactuur voor een gedeelte van het totaalbedrag van de oorspronkelijke factuur. Wilt u doorgaan?",
	extraCosts: "Let op: voor deze factuur zijn in verband met overschrijding van de betaaltermijn incassokosten à %extra_costs% gerekend." + 
	"Als u de factuur volledig wenst af te boeken, dient u deze kosten op te nemen in de creditfactuur. Wilt u deze kosten ook afboeken?",


	// acount complete popup
	accountIncomplete: "Voordat u een factuur kunt versturen, dient u onderstaande gegevens in te vullen. U kunt uw gegevens later nog wijzigen.",
	accountComplete: "Vanaf nu kunt u via KasCo facturen sturen. U kunt uw instellingen wijzigen via het menu Account.",

	// objectionView

	objectionReply: "Geef hieronder uw reactie op het bezwaar van de debiteur. KasCo's juristen zullen contact met u opnemen en u adviseren.",
	replySent: "Uw reactie is verzonden naar KasCo. Wij zullen contact met u opnemen.",

	// account settings

	selectFile: "Selecteer bestand",
	uploadFile: "Upload een bestand van uw computer (JPEG, GIF of PNG).",
	neverLoggedIn: "Niet eerder ingelogd",
	lastLogin: "Laatst ingelogd",
	currentUser: "Huidige gebruiker",
	loggedInAs: "Ingelogd als",
	fullMembership: "Volledig lidmaatschap",
	notApplicable: "Niet van toepassing",
	chooseAccount: "Kies een account",	

	errorOnAccountSettingsSave: "Er is fout opgetreden bij het opslaan de instellingen",

	yourPassword: "Uw wachtwoord",
	_confirmPassword: "Bevestig wachtwoord",

	createUser: "Creëer gebruiker",

	// superadmin 

	deleteAccount: "Weet u zeker dat u deze account wilt verwijderen?",

	// toasts
	toasts: {

		errorOnCreate: "Aanmaken mislukt",
		successOnCreate: "%object% succesvol aangemaakt",

		successOnDebtorCreate: "Debiteur %name% succesvol aangemaakt",

		onInvoiceCreateSuccess: "%type% verzonden"
	},

	placeholders: {

		invoiceLine: {
			title: "Voer product/dienst in",
			description: "Voer omschrijving in"
		}
	},

	labels: {
		
		draft: "Concept",			
		ready: "Concept",
		sending: "Verzenden...",
		approved: "Toekomstig",
		send: "Verzonden",
		reminder: "Herinnering",
		summation: "Aanmaning",
		collection: "Incasso",
		objection: "Bezwaar",		
		paused: "Pauze",		
		debited: "Gecrediteerd",
		redeemed: "Kwijtgescholden",
		payed: "Betaald",	
		stopped: "Facturen.net",
		credit: "Credit"	

	},

	paymentTypes: {

		Ideal: "iDEAL",
		Creditcard: "Creditcard",
		Transfer: "Overboeking",
		User: "Handmatig",
		Other: "Anders"

	},

	tooltips: {

		newUser: "Nieuwe gebruiker maken",
		hasAdminRights: "Deze gebruiker heeft admin-rechten",
		editUser: "Bewerk deze gebruiker",
		editUserRole: "Wijzig rol gebruiker",
		changePassword: "Wijzig wachtwoord",
		removeUser: "Verwijder deze gebruiker",

		// collection views
		sortable: "Klik om te sorteren op %attribute%",

		// invoiceView, editInvoiceView
		newInvoice: "Een nieuwe factuur maken",
		viewInvoice: "Bekijk factuur",
		viewInvoicePDF: "Bekijk pdf",
		pauseInvoice: "Pauzeer factuur",
		deleteInvoice: "Verwijder factuur",
		unpauseInvoice: "Herstart factuur",		
		approveInvoice: "Keur factuur goed",
		saveInvoice: "Sla factuur op",
		sendInvoice: "Verstuur factuur",
		paymentTerm: "Kies betaaltermijn",
		deliveryMethod: "Kies verzendmethode",
		originalInvoiceNumber: "Vul het oorspronkelijke factuurnummer in",
		invoiceStatus: "Kies start status van de factuur",
		addLine: "Voeg factuurregel toe",
		addProduct: "Voeg artikel toe",
		pickDate: "Kies een datum",
		invoicePeriod: "Kies periode",
		setInvoiceType: "Kies type factuur",
		viewPeriodicalInstances: "Bekijk verzonden facturen",
		deletePeriodical: "Periodiek stopzetten en verwijderen",
		creditInvoice: "Boek creditfactuur voor deze factuur",
		invoiceNumberUndetermined: "Het factuurnummer wordt automatisch ingevuld bij verzending van de factuur",
		bookPayment: "Boek betaling voor deze factuur",
		sendReminder: "Verstuur een herinnering",
		sendSummation: "Verstuur een aanmaning",
		createInvoiceFromQuote: "Maak factuur op basis van deze offerte",
		startCycle: "Start invordering van deze factuur",
		actions: "Acties voor factuur",
		redeem: "Extra kosten kwijtschelden",
		archive: "Factuur archiveren",
		changeDeliveryMethod: "Wijzig verzendmethod",
		resend: "Factuur opnieuw versturen",
		originalInvoicePdf: "Bekijk oorspronkelijke factuur",
		reminderPdf: "Bekijk herinnering",
		summationPdf: "Bekijk aanmaning",
		deleteInvoiceLine: "Verwijder factuurregel",
		addDebtorBeforeSend: "Voeg een debiteur aan de factuur toe",
		invoiceTemplate: "Kies template voor factuur",
		clickToCreateDebtor: "Klik hier om een nieuwe debiteur aan te maken",
		searchDebtor: "Zoek een bestaande debiteur",

		removeDebtorFromInvoice: "Verwijder debiteur van deze factuur",
		transferVatToDebtor: "Verleg de btw naar debiteur",

		// invoices-collection view
		startedFromReminder: "De oorspronkelijke factuur is niet via KasCo verzonden",
		noAutocycle: "Deze factuur wordt automatisch geïncasseerd",
		deliveryMethodPostal: "Deze factuur is per post verzonden" ,
		deliveryMethodBoth: "Deze factuur is per post en e-mail verzonden",		
		hasPaymentPlan: "Er geldt een betalingsregeling of deze is aangevraagd",		
		reminderOpen: "Voor deze factuur is een herinnering verzonden",
		reminderClosed: "Voor deze factuur werd een herinnering verzonden",		
		summationOpen: "Voor deze factuur is een herinnering en een aanmaning verzonden",		
		summationClosed: "Voor deze factuur werd een herinnering en een aanmaning verzonden",		
		collectionOpen: "Na herinnering en aanmaning wordt deze factuur geïncaseerd",
		collectionClosed: "Deze factuur werd na herinnering en aanmaning geïncasseerd",

		// invoices-collection view  statuses
		draft: "Deze factuur is nog niet verzonden",
		ready: "Deze factuur is nog niet verzonden",		
		sending: "Aan het verzenden",
		approved: "Deze factuur wordt over %days% dag(en) verzonden",
		send: "Deze factuur vervalt over %days% dag(en)",
		sendDue: "Deze factuur is vervallen op %date%",
		reminder: "Voor deze factuur is een herinnering verzonden op %date%",
		summation: "Voor deze factuur is een aanmaning verzonden op %date%",
		collection: "Deze factuur wordt geïncasseerd",
		objection: "Tegen deze factuur is bezwaar gemaakt op %date%",		
		paused: "Deze factuur is gepauzeerd sinds %date%",		
		debited: "Deze factuur is gecrediteerd op %date%",
		redeemed: "De incassokosten zijn kwijtgescholden op %date%",
		payed: "Deze factuur is betaald op %date%",		
		stopped: "Deze factuur is via Facturen.net verzonden",
		credit: "Deze creditfactuur is verzonden op %date%",
				
		extraCosts: "Er zijn %extra_costs% incassokosten bijgekomen",
		daysUntilDue: "Deze factuur vervalt over %days% dag(en)",
		partialPayments: "Gedeeltelijk betaald (%paymentsTotal%)",		
		partialCredited: "Gedeeltelijk gecrediteerd (%creditInvoicesTotal%)",
		hasAttachment: "Debiteur heeft bijlage meegezonden",
		hasReaction: "U heeft op dit bezwaar gereageerd",

		// debtor view
		newDebtor: "Een nieuwe debiteur aanmaken",
		debtorDetails: "Gegevens debiteur bekijken",
		deleteDebtor: "Debiteur verwijderen",
		debtorActions: "Acties voor debiteur",
		debtorSettings: "Instellingen voor debiteur",
		debtorNewInvoice: "Een nieuwe factuur voor deze debiteur maken",		

		newPayment: "Een nieuwe betaling boeken",
		selectTimeunit: "Selecteer periode",		
		
		newArticle: "Een nieuw artikel aanmaken",
		newArticleGroup: "Een nieuwe artikelgroep aanmaken",
		deleteArticle: "Artikel verwijderen",

		// paymentView
		showDebtor: "Bekijk debiteur",
		paymentType: "Kies een betaalwijze",

		// objectionView
		reply: "Reageren op bezwaar",
		showInvoice: "Bekijk factuur",
		close: "Bezwaar sluiten",
		fileSelect: "Selecteer een bestand",		
		pageControls: "Blader door pagina\'s",
		
		back: "Terug",
		save: "Opslaan",
		cancel: "Annuleren",

		acceptPaymentPlan: "Betalingsregeling accepteren",
		rejectPaymentPlan: "Betalingsregeling afwijzen",

		// balance object

		// total_sent: " Aantal verzonden facturen",
		payments: "Aantal iDEAL betalingen",
		sent_postals: "Aantal per post verzonden facturen",
		invoices_redeemed: "Kwijtgescholden facturen",

		// superadmin 
		paidAccount: "Dit is een betalende account",
		freeAccount: "Dit is een gratis account",
		importedAccount: "Deze account is geïmporteerd",
		finalizedAccount: "Deze account is permanent gemigreerd",
		deleteAccount: "Verwijder deze account",
		showCosts: "Toon kosten account"

	},

	helptexts: {

		invoice_id: "U kunt een prefix opgeven dat aan het factuurnummer op uw facturen voorafgaat, bijvoorbeeld het huidige jaar.",
		invoice_id_continuous: "Als u voor doorlopende factuurnummering kiest, wordt het factuurnummer niet op 1 gezet aan het begin van het jaar.",
		invoice_id_next: "U kunt ook handmatig het factuurnummer van de volgende factuur hieronder aanpassen.",
		cc_emails: "U kunt een kopie van de e-mails die KasCo namens u verzendt, ontvangen op uw e-mailadres.",

		general_account_info: "Vul hier uw algemene gebruikers informatie in. Uw bedrijfsnaam verschijnt op de factuur zoals hier ingevuld.",

		invoices_sent: "Met een gratis account kunt u tot en met 3 facturen per maand gratis verzenden. Wilt u meer facturen per maand versturen, dan kunt u upgraden naar Volledig lidmaatschap.",

		payments: "U kunt de betalingen van uw facturen via KasCo of via uw eigen rekening laten lopen. Kiest u voor KasCo, dan worden de betalingen automatisch verwerkt en direct overgemaakt naar uw rekening.",
		payment_plans: "U kunt uw klant de mogelijkheid tot een betalingsregeling aanbieden. Stel zelf het maximaal aantal termijnen in."

	},

	accountWizard: {

		"1a": "Welkom bij KasCo. We zullen nu stap voor stap uw KasCo-account instellen. Hierna kunt u direct aan de slag.",
		"1b": "U kunt deze instellingen later aanpassen via het tabblad Account.",
		"2": "Voer de adresgegevens van uw bedrijf in. Deze verschijnen op uw facturen.",
		"3a": "Voer uw KvK-nummer en rekeningnummer in.",
		"3b": "Bent u btw-plichtig?",
		"3c": "Voer hier uw btw-nummer in.",
		"4": "Upload uw logo, deze zal linksboven op uw facturen verschijnen.",
		"5a": "Uw klanten kunnen via de rekening van KasCo of direct op uw eigen rekening betalen. Kies hoe u de betalingen wil laten verlopen.",
		"5b": "Klanten betalen via KasCo, KasCo maakt het bedrag direct naar u over en registreert automatisch de betaling.",
		"5c": "Klanten betalen aan u, u registreert zelf de betaling in uw KasCo-account.",		
		"6": "Uw account is nu gereed voor gebruik. Veel plezier bij het gebruiken van KasCo!"
	},

	keys: {

		debtor: {
			name: "Contactpersoon"
		},

		// article

		article_number: "Artikelnr.", 
		title: "Naam", 
		description: "Omschrijving",
		amount: "Aantal",
		price: "Prijs",
		vat: "Btw %",
		total: "Totaal",
		groupcode: "Groepscode",

		// user

		role: "Rol",
		name: "Naam", 

		// debtor 
		
		company_name: "(Bedrijfs)naam",
		email: "E-mail",
		address: "Straat",
		zipcode: "Postcode",				
		city: "Stad", 
		country: "Land",
		phone: "Telefoon",
		fax: "Fax",
		mobile: "Mobiel",

		// invoice

		date: "Datum",
		delivery_method: "Verzendmethode", 
		payment_term: "Betaaltermijn",
		reference: "Referentie",
		dueDate: "Vervaldatum",
		created: "Aangemaakt",
		period: "Periode",
		children: "Verzonden",
		pay_date: "Betaald",
		objectionDate: "Datum bezwaar",
		startDate: "Startdatum",
		parentInvoiceNumber: "Oorspr. factuur",	

		// quote

		accept_term: "Acceptatietermijn",

		// account settings

		invoice_id_continuous: "Doorlopende nummering",
		invoice_id_start: "Startnummer",
		invoice_id_prefix: "Prefix",
		invoice_id_next: "Volgend factuurnummer",
		default_invoice_content: "Standaard bijschrift",
		cc_emails: "Kopie ontvangen",


		// account

		contact_person: "Contactpersoon",
		kvk_number: "KvK-nummer",
		vat_number: "Btw-nummer",
		vat_short: "Btw-nr.",
		vat_liable: "Btw-plichtig",
		bank_bic: "BIC",
		bank_account: "Rekeningnummer",
		bank_account_iban: "IBAN",
		subscription_date: "Start abonnement",
		final_import_date: "Datum finalisatie",

		// payments 

		_amount: "Bedrag",
		payment_date: "Betaaldatum",
		payment_type: "Betaalwijze",
		invoice: "Factuur",
		payment_method: "Betaalmethode",

		// password

		oldPassword: "Oud wachtwoord",
		newPassword: "Nieuw wachtwoord",
		confirmPassword: "Bevestig wachtwoord",

		// balance / costs 

		nr_sent_normals: "Verzonden facturen",
		nr_sent_credits: "Verzonden creditfacturen",
		nr_sent_postals: "Verzonden per post",
		nr_sent_reminders: "Verzonden herinneringen",
		nr_sent_summations: "Verzonden aanmaningen",
		nr_invoices_redeemed: "Kwijtgescholden facturen",
		nr_sent_quotes: "Verzonden offertes",
		nr_sent_total: "Totaal verzonden",
		nr_payments_icepay: "Betalingen iDEAL",
		total_costs: "Totale kosten"
	},

	values : {

		delivery_method: {
			postal: "Per post",
			both: "Per e-mail en post",
			email: "Per e-mail"
		}

	},

	errors: { 

		// client side

		email: "Geen geldig e-mailadres",
		zipcode: "Geen geldige postcode",	
		digits: "Alleen cijfers toegestaan"	,
		bank_account: "Geen geldige bankrekening",
		required: "Veld is vereist",
		kvk: "Geen geldig KvK-nummer",
		btw: "Geen geldig btw-nummer",
		vat_liable: "Geef aan of u btw-plichtig bent",
		min: "De waarde dient minimaal %parameter% te zijn",
		max: "De waarde mag maximaal %parameter% zijn",
		minLength: "Minimaal aantal tekens",
		isValidJavascriptDate: "Geen geldige datum",
		differentPasswords: "Niet hetzelfde wachtwoord ingevoerd",
		password: "Wachtwoord is onjuist",
		emptyTextArea: "Veld mag niet leeg zijn",
		specialCharacters: "Geen speciale tekens toegestaan",
		totalInvoiceLines: "Voeg ten minste één factuurregel toe",
		uniqueArticleNumber: "Artikelnummer moet uniek zijn",
		incorrectLogin: "Onjuist e-mailadres of wachtwoord",
		notZero: "Prijs kan niet € 0 zijn",

		incorrectFileFormat: "Ongeldig bestandstype",

		// server side

		"Email address is already taken": "Dit e-mailadres is al in gebruik",
		"Not a valid email address": "Geen geldig e-mailadres",
		"Minimum 2 characters long": "Dit dient minimaal twee tekens te bevatten",
		"Minimum 3 characters long": "Dit dient minimaal drie tekens te bevatten",
		"Minimum 8 characters long": "Dit dient minimaal acht tekens te bevatten",
		"Field cannot be empty": "Veld mag niet leeg zijn",
		"No special characters": "Geen speciale tekens toegestaan",
		"Old password is not correct": "Oud wachtwoord is onjuist",
		"Only alphanumeric character": "Geen speciale tekens toegestaan",
		"Not a valid phonenumber": "Geen geldig telefoonnummer",
		"Not a valid country code (only nl)": "Geen geldig land - alleen Nederland toegestaan",
		"Not a valid price": "Geen geldige prijs",
		"Not a valid zipcode": "Geen geldige postcode",
		"Not a valid date (DD-MM-YYYY)": "Geen geldige datum",
		"Not a valid date (YYYY-MM-DD)": "Geen geldige datum",
		"Not a valid kvk number": "Geen geldig KvK-nummer",
		"Not a valid vat number": "Geen geldig btw-nummer",
		"Not a valid bic number": "Geen geldig BIC-nummer",
		"Not a valid iban number": "Geen geldig IBAN",
		"Not a valid bank account number": "Geen geldige bankrekening",
		"Not a valid invoice id (numbers only)": "Geen geldig factuurnummer (alleen cijfers)",
		"Not a valid term (between 0 and 90 days)": "Geen geldige betaaltermijn (dient tussen 10 en 90 dagen te zijn)",
		"No rights for this action": "U heeft geen rechten voor deze handeling"
	}


};



//------------------------------------



$(function () {

	myAPP.listenTo(myAPP, 'toast', showToast)

	var $toastHolder;

	function showToast (message, type) {

		var className, 
			charCode,
			self = this;

		if (!$toastHolder)
			$toastHolder = $("<div id='toast-holder'></div>").appendTo($("body #container"));

		if ($toastHolder && this.isShowingToast) {			
			$toastHolder.find(".toast").stop(true).animate({top: "+=50", opacity: 0}, {duration: 200, easing: "easeOutCubic"});			
		}

		this.isShowingToast = true;

		switch (type) {
			case "error":		className = "toast-error";
								charCode = myAPP.templateHelpers.charCodes.close;
								break;
			case "success":		className = "toast-success";
								charCode = myAPP.templateHelpers.charCodes.thumbsup;
								break;
		}
		var self = this;
		var $toast = $("<div class='toast " + className + "'><span class='entype'>" + charCode + "</span>" + message + "</div>")
			

		// *** HACK HACK HACK
		// add a little extra room to width and height of toaster
		$toast.css({display: "none"}).appendTo($("body"));
		var width = $toast.outerWidth() + 5, height = $toast.outerHeight() + 5;
		
		$toast										
			.appendTo($toastHolder)
			.css({top: - height, display: "block", opacity: 0})										
			.animate({top: "0px", opacity: 1},{ duration: 200, specialEasing:{ top: "easeOutCubic", opacity: "linear"}});


		$toastHolder.css({width: width, height: height})
		
		$toast.delay(5000).animate({opacity: 0}, { duration: 1000, complete: function () { $toast.remove(); self.isShowingToast = false; }});

	}

	// *** this doesn't work properly yet 

	$(window).on('scroll', function () { 
		
		var top = 100, documentScrollTop = $(window).scrollTop();
		
	})

})



//------------------------------------



	// global handlers for tooltip.

$(function (){

	var scrollTop = function () {
		return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	}

	var scrollLeft = function () { 
		return (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;
	}

	var $currentTooltip, $sourceElement;

	$("body").on('mouseenter', '.myAPP-tooltip', function (event) {		

		if ($currentTooltip)
			$currentTooltip.remove();		

		var $this = $(this);
			$sourceElement = $this;	

		mouseX = event.clientX;
		mouseY = event.clientY;
		
		// default to center of element if no mouse coordinates passed to function
		if (!mouseX)
			mouseX = $this.offset().left + ($this.width() / 2);

		if (!mouseY)
			mouseY = $this.offset().top + ($this.height() / 2);
	
		var x = mouseX + scrollLeft();
			y = mouseY + scrollTop();
			
		var $tooltip = $("<div class='tooltip-content'></div>")
			.appendTo("body")
			.html($this.attr("data-tooltip"))
			.css({opacity: 0, position: "absolute"})

		var width = $tooltip[0].offsetWidth,
			height = $tooltip[0].offsetHeight

		$tooltip.css({top: y - 24, left: x + 24})
			.addClass($this.attr('data-tooltip-class'))			

		$this.data({tooltip: $tooltip});

		$tooltip.stop(true).animate({opacity: 1}, {duration: 200})
		
		$this.on('mousemove', function (event) { 
			$tooltip.css({top: event.clientY + scrollTop() - 24, left: event.clientX + scrollLeft() + 24 })
		})

		$this.one('mouseleave', function () { 
			$this.off('mousemove')
			$tooltip.stop(true).animate({opacity: 0}, {duration: 200, complete: function () { $tooltip.remove(); }})

		})

		$currentTooltip = $tooltip;
		
	})

	var createCallback = function ($tooltip) {
			return function () { 
				$tooltip.remove();
			}
		}

	// myAPP.showTooltip = function (event) {

	// }

	myAPP.clearTooltips = function () { 

		if ($currentTooltip)			
			$currentTooltip.stop().animate({ opacity: 0}, { duration: 200, complete: createCallback($currentTooltip) })

	}

	myAPP.clearTooltipOnElement = function ($element) {
		if(!$sourceElement || !$element)
			return;
		
		if ($sourceElement[0] === $element[0])
			$currentTooltip.stop().animate({ opacity: 0}, { duration: 200, complete: createCallback($currentTooltip) })
	}

})



//------------------------------------




// this module uses code by Neal Stewart
// see: https://github.com/n-time/backbone.validations/blob/master/backbone.validations.js

myAPP.validationPattern = {

	// from: http://www.regular-expressions.info/email.html
	email: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/i,
	date: /(\d{4})-(\d{2})-(\d{2}).*/
	//email2: /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
};

myAPP.validationMethods = {

	required: function (value) {		
		if (!value || value === "")
			return "required";
	},

	digits: function ( value ) {
		if(!value || value === "")
			return;
		if (value.match(/\D/))	
			return "digits";
	},

	isValidEmail: function ( value ) {			
		if (!value)
			return;

		if (!(value.match( myAPP.validationPattern.email )))
			return "email";
	},

	isValidDate: function (value) {
		
		if (_.isString(value) && value.match(myAPP.validationPattern.date)) {
			return true;
		}
	},

	isValidJavascriptDate: function (value) {
		
		if (!value) 
			return;
		
		if (value instanceof Date && Object.prototype.toString.call(value) === "[object Date]") {
			return true;
		}
	},

	noSpecialCharacters: function ( value) {	
		if (!value)	
			return;
		if (value.match(/[^a-zA-Z0-9\s\.,-]+/))
			return "specialCharacters";
	},

	isValidZipcode: function ( value ) {
		if (!value)
			return;
		if (!(value.match(/^\d{4}\s[a-zA-Z]{2}$/)))
			return "zipcode";
	},

	notZero : function (value) {
		value = Number(value);		
		if (value === 0)
			return "notZero";
	},

	min: function(value, parameter) {		
		if (value < parameter) {
			return "min";
		}
	},

	max: function(value, parameter) {		
		if (value > parameter) {
			return "max";
		}
	},

	// for strings
	minLength: function(value, parameter) {
		if (!_.isString(value)) {
			return "minLength";
		}
		if (value.length < parameter) {
			return "minLength";
		}
	},

	maxLength: function(value, parameter) {
		if (!_.isString(value)) {
			return "maxLength";
		}
		if (value.length > parameter) {
			return "maxLength";
		}
	}
};




//------------------------------------



Backbone.View.collapseSidebar = function () {

	this.prototype.events = this.prototype.events || {};
	
	_.extend(this.prototype.events, {
	
		"click .sidebar-toggle": "collapseSidebar"		

	})
	
	_.extend(this.prototype, {

		setSelectors: function () { 
						this.$sidebar = this.$el.find(".sidebar");
						this.$pane = this.$el.find(".pane");
						this.sidebarWidth = parseInt(this.$sidebar.width(), 10);
						this.sidebarMargin = parseInt(this.$sidebar.css("marginRight"), 10);
						this.$sidebarToggle = this.$el.find(".sidebar-toggle");
						this.$sidebarToggleButtonContent = this.$el.find(".sidebar-toggle span.entype");

						this.selectorsSet = true;
		},

		collapseSidebar: function () { 
						var self = this;

						if (this.isAnimating)
							return;

						if (!this.selectorsSet)
							this.setSelectors();

						this.isAnimating = true;

						if (!this.sidebarCollapsed) {

							this.sidebarCollapsed = true;

							// collapse the sidebar

							this.$sidebar.css({overflow: "hidden"})
								.animate({marginRight: 0, width: 0, opacity: 0}, {specialEasing: {marginRight: "easeOutCubic", width: "easeOutCubic", opacity: "linear"}})

							this.$pane.animate({width: "+=" + (this.sidebarWidth + this.sidebarMargin)}, {easing: "easeOutCubic", complete: function () { 
								self.isAnimating = false; 
								self.sidebarCollapsed = true; 
								myAPP.animations.blink(self.$sidebarToggleButtonContent, myAPP.templateHelpers.charCodes.sidebarToggleOpposite);
								self.$sidebarToggleButtonContent.parent().attr({"data-tooltip" : "sidebar uitklappen"})

								self.$pane.addClass("void").removeClass("void");

							}});

							this.$sidebarToggle.animate({left: "-=" + (this.sidebarWidth + this.sidebarMargin) }, {easing: "easeOutCubic"})
						
						} else {						 

							// expand sidebar
						
							this.$sidebar.css({overflow: "visible"})
								.animate({marginRight: this.sidebarMargin, width: this.sidebarWidth, opacity: 1}, {specialEasing: { marginRight: "easeOutCubic", width: "easeOutCubic", opacity: "linear"}})								
							
							this.$pane.animate({width: "-=" + (this.sidebarWidth + this.sidebarMargin)}, {easing: "easeOutCubic", complete: function () { 
								self.isAnimating = false; 
								self.sidebarCollapsed = false;
								myAPP.animations.blink(self.$sidebarToggleButtonContent, myAPP.templateHelpers.charCodes.sidebarToggle);
								self.$sidebarToggleButtonContent.parent().attr({"data-tooltip" : "sidebar inklappen"})

								self.$pane.addClass("void").removeClass("void");

							}});
							
							this.$sidebarToggle.animate({left: "+=" + (this.sidebarWidth + this.sidebarMargin)}, {easing: "easeOutCubic"})

						}


		}

	})

	return this;

}



//------------------------------------



Backbone.View.datePicker = function () {

	this.prototype.events = this.prototype.events || {};

	// _.extend(this.prototype.events, {

	// 	"change #date-picker"	: "_setDate"		
		
	// })

	var _initialize = this.prototype.initialize;

	_.extend(this.prototype, { 

		initialize: function () { 

			_initialize.apply(this, arguments);
			this._setupDatePicker();

		},

		_setupDatePicker: function () {

			var $datePicker = this.$el.find("#date-picker");

			$datePicker.datepicker({
				showOn: "button", 
				constrainInput: false,
				dateFormat: "dd-mm-yy",
				dayNames: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
				dayNamesMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
				firstDay: 1,
				monthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
				monthNamesShort: ["jan", "feb", "maa", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
				nextText: "<span class='entype'>"+ myAPP.templateHelpers.charCodes.rightArrow + "</span>",
				prevText: "<span class='entype'>"+ myAPP.templateHelpers.charCodes.leftArrow + "</span>",
				buttonText: "<span class='entype'>"+ myAPP.templateHelpers.charCodes.calendar + "</span>"
			});

			this.$el.find("button")
				.addClass("myAPP-tooltip button button-icon")
				.attr({ "data-tooltip": myAPP.texts.tooltips.pickDate })

			var date = this.model.get("date");			
			$datePicker.datepicker("setDate", new Date(date))

			// if (!date)
			// 	this.model.set()
		},

		// _setDate: function (event) {
		// 	var $target = $(event.target), 
		// 		property = $target.closest(".list-item").attr("id");	

		// 	this.model.set(property, this.$datePicker.datepicker('getDate'));
		// }	

	});

	return this;

}



//------------------------------------



// extend a view prototype to make it kind of editable and backup the value of an input element prior to editing; 

Backbone.View.editable = function () {

	this.prototype.events = this.prototype.events || {};
	
	_.extend(this.prototype.events, {

		'focusin input': '_focusHandler',
		'focusout input': '_focusHandler'	
		
	})

	// cache original methods;
	var _initialize = this.prototype.initialize,
		_remove = this.prototype.remove;

	_.extend(this.prototype, {

		initialize: function () { 								

								var self = this;
								_initialize.apply(this, arguments);

								if (!this.model) {
									console.warn("No model associated with this editable view")							
									return;
								}	

								if (!this.model.getAttributes)
									throw "Error: model doesn't implement getAttributes"							

								// _intialValues will contain a copy of the model's attributes at time of initialization of the view
								
								this._initialValues = this.model.getAttributes()								

								// if the model is saved, reset the _initialValues to the new attributes;		
								this.listenTo(this.model, 'sync', function () {									
									console.log(" model saved and refreshing old values on view", self.cid)
									self._initialValues = self.model.getAttributes()
									self._modelIsSaving = false;

								})								

								this.listenTo( this.model, 'request', function () {			
									self._modelIsSaving = true;
								})

		},				

		resetModel: function () { 
								var key;
								// also resets input element of the view!			

								console.log("##### RESETTING MODEL! by ", this.cid)

								// iteratie through _initialValues
								for (key in this._initialValues) {

									if (this._initialValues[key] !== this.model.get(key)) {

										// Date objects are not so easily compared;
										if (this._initialValues[key] instanceof Date) {
											if (this._initialValues[key].getTime() === (this.model.get(key) && this.model.get(key).getTime()))
												continue;
										}
										console.log(key,  this._initialValues[key])
										this.model.set(key, this._initialValues[key])

										var $input = this.$el.find("#" + key + " input")
										$input.removeClass("changed")
											.val(this._initialValues[key])

									}

									

								}
								 
								// iterate through model.attributes to detect new properties set on the model and remove them;
								for (key in this.model.attributes) {

									if (this._initialValues[key] !== this.model.get(key)) {
										console.log("*** This is new, were unsetting: ",  key);
										this.model.set(key, this._initialValues[key])
									}
								}


								this.trigger("noChangedValues")

		},

		_editHandler: function ($target, property, value) {			
								
								if (this.model) {
									var attrs;	

									// don't trigger validation, to make sure the model is in sync with the view;
									// otherwise, a validation error would prevent update to the model even though the view represents that (faulty) update
									// view and model would no longer be in - erroneous - sync
									if (property)
										this.model.set( property, value );									

								}

								// *** CHANGE THIS
								// a view should bind to a change event, not an edithandler, because one edit can trigger multiple changes.
								// otherwise the view's edithandler keeps polling changedValues to figure out what changed on the model;

								if (typeof this.editHandler === "function") {
									this.editHandler($target, property, value)
								}
		},

		_focusHandler: function (event) {								
								var $targetElement = $(event.target);
								switch (event.type) {

									case "focusin":		this.startEdit($targetElement);
														break;
									case "focusout":	this.stopEdit($targetElement);													
														break; 
								}	

		},

		startEdit: function ($targetElement) { 
								var value = $targetElement.val();								
								this.undoValue = value;

		},

		stopEdit: function ($target, cancelEdit) {

								var value = cancelEdit ? this.undoValue : $target.val(),
									property = $target.attr("name");								

								if (!property) {
									
									property = $target.attr("id");

									if (!property)
										console.warn("*** input element has no name or id that identifies property it represents")
									
								}

								//if (cancelEdit) {
								$target.val(value);
								//}

								if(!cancelEdit) {

									this._editHandler($target, property, value)		
									
								}							
								
								_findChangedValues.call(this);

		},

		remove: function () {		
								var self = this;	

								console.log("remove firing on view ", this.cid )

								this.stopListening( this.model );

								// if the model is still saving, skip model reset
								if (this._modelIsSaving) {										
									console.log(" the model is being saved; skipping reset-model")										

									return;
								}
					
								this.resetModel();	

								// If another view has meanwhile registerd to this model, have it set its initialvalues to the reverted values
								// otherwise that view would be out of sync if the call to this remove method is delayed (because of animation.
								this.model.trigger('sync')
								
								_remove.call(this);

	}

	});

	function _findChangedValues() { 
								var changedValues = [];
								
								for (var key in this._initialValues) {	
									
									var $input = this.$el.find("#" + key + " input");
									
									if ($input.length > 0) {										
										$input.removeClass('changed');
										var value = $input.val();
										
										// check to see if the value from input field has changed from the initial value of the model;
										if (value !== this._initialValues[key]) {
												// check that both values are truthy;
												// otherwise a null value would be different from empty string "", and would be considered
												// to have changed, though this is only a type conversion due to templating, etc.
												if (value || this._initialValues[key]) {
												changedValues.push(key);												
												$input.addClass('changed')
											}
										}
									}

								}

								if (changedValues.length > 0 )
									this.trigger("changedValues");
								else
									this.trigger("noChangedValues");
	}

	return this;
}



//------------------------------------



Backbone.View.invoicePreview =  function () {

	this.prototype.events = this.prototype.events || {};

	_.extend(this.prototype.events, {

		'click #preview': 'showPreview'
		
	})

	var _render = this.prototype.render;

	_.extend(this.prototype, {

		render: function () {	
								var hash = Backbone.history.getFragment();
								if (hash.match(/preview/)) {
									this.showPreview();
								} else if (this.isPreview) {
									this.hidePreview();
								}
								_render.apply(this, arguments)
		},

		showPreview: function () { 
								if (this.validateModel && !this.validateModel())
									return;

								if (this.isPreview === true) {
									window.history.back()								
									this.hidePreview()
									return;
								}
								this.isPreview = true;

								// animate toggle button;
								var $button = this.$el.find("#preview")
								myAPP.animations.blink($button, "<span class='entype'>&#x1F519;</span>Terug");
								$button.attr("data-tooltip", myAPP.texts.tooltips.back)

								var hash = Backbone.history.getFragment();
								if (!hash.match(/preview/))
								myAPP.router.navigate(hash + "/preview")
								
								var self = this;
								var debtor = myAPP.debtors.findWhere({id: this.model.get("account_debtor_id")})
								
								var $oldElement = this.$el.find(".animation-wrapper");
										
								var $newElement = $(JST["templates/invoices/invoice-preview.html"]({
									invoice: this.model.getAttributes(), 
									debtor: debtor.getAttributes(), 
									account: myAPP.currentAccount.getAttributes() 
								}));

								//var invoiceLines = myAPP.invoiceLines.where({ invoice_id: this.model.get( "id" ) || this.model.cid })

								var $invoiceLines = $(JST["templates/invoices/invoice-lines-preview.html"]({ 
									invoiceLines: this.model.invoiceLines,
									account: myAPP.currentAccount.getAttributes()
								}))
								
								$newElement.find(".invoice-lines").append($invoiceLines)
								myAPP.animations.drop({oldElement: $oldElement, newElement: $newElement , callback: function () { self.isPreview = true} })

								myAPP.loadImage(this.$el.find(".logo-container"), myAPP.accountSettings.get("logoUrl"), 350, 130)
		},

		hidePreview: function () { 
			
								if (this.isPreview === false)
									return;
								this.isPreview = false;

								var self = this;
								var $oldElement = this.$el.find(".invoice-preview");
								var $newElement = this.$el.find(".animation-wrapper");

								var $button = this.$el.find("#preview")
								myAPP.animations.blink($button, "<span class='entype'>&#xE70A;</span>Voorbeeld");
								$button.attr( "data-tooltip", myAPP.texts.tooltips.viewInvoice )
								myAPP.animations.lift({
									oldElement: $oldElement, 
									newElement: $newElement, 
									remove: true , 
									callback: function () { self.isPreview = false }
								});
		}
	});

	return this;

}



//------------------------------------



Backbone.View.paginated =  function (parameters) {

	this.prototype.events = this.prototype.events || {};

	_.extend(this.prototype.events, {
		"click #previous-page": "previousPage",
		"click #next-page" : "nextPage"

	});

	parameters = parameters || {};

	var _initialize = this.prototype.initialize;

	this.prototype.initialize = function () {	

									_initialize.apply(this, arguments);

									var self = this, 
										renderContent;	

									this.pageLength = parameters.pageLength || 20;
									this.currentPage = 0;

									myAPP.listenTo(this.collection, 'add remove sync', function () {										
										self.resetCurrentPage();
										self.showCurrentPage();

									});

									myAPP.listenTo(myAPP, 'resourcesLoaded', function () {	
										self.resetCurrentPage();
										self.showCurrentPage();
									});

									renderContent = this.renderTemplate();
									this.$el.html(renderContent);																					

	};

	var _render = this.prototype.render;

	this.prototype.render = function () { 
									_render.apply(this, arguments);									
									this.showCurrentPage();									
	};

	_.extend(this.prototype, {

		renderTemplate: function () {
									var self = this;

									return this.template({
										collection: this.createCollection(), 
										hasMultiplePages: this.hasMultiplePages(),
										view: self
									});
		},

		resetCurrentPage: function () { 
									if (this.currentPage > this.totalPages() - 1) 
										this.currentPage = this.totalPages() - 1;
		},

		totalPages: function () {															
									return Math.ceil(this.collection.models.length / this.pageLength) || 1;
		},

		hasMultiplePages: function () { 
									return this.totalPages() > 1;
		},

		hasNextPage: function () {
									
									return (this.currentPage < this.totalPages() - 1);
		},
		
		hasPreviousPage: function () {
									
									return (this.currentPage > 0); 
		},

		getPage: function (/*pageNumber*/) {									
									// pass a parameter or default to currentPage;
									pageNumber = this.currentPage || 0;
									var array = [];		
									
									var offset = pageNumber * this.pageLength;
									for (var i = offset; i < offset + this.pageLength; i++) {
										
										if (i < this.collection.models.length) {					
											array.push(this.collection.models[i]);
										}
									}
									return array;
		},

		getNextPage: function () {
									if (this.hasNextPage()) {
										this.currentPage++;
										return this.getPage();
									}
		},

		getPreviousPage: function () {
									if (this.hasPreviousPage()) {
										this.currentPage--;
										return this.getPage();
									}
		},

		previousPage: function () {									
									
									var renderContent, 
										oldElement, 
										newElement;

									if (!this.hasPreviousPage())
										return;							
									
									this.currentPage--;									

									renderContent = this.renderTemplate();

									oldElement = this.$el.find(".paginate-page");
									newElement = $(renderContent).find(".paginate-page");
									myAPP.animations.slideRight({
										oldElement: oldElement, 
										newElement: newElement, 
										remove: true
									});
									this.updatePageNumbers();
									this.animateTableHeight( newElement );

									return false;
		},

		nextPage: function () {							
									var renderContent, 
										oldElement, 
										newElement;
		
									if (!this.hasNextPage())
										return;

									this.currentPage++;

									renderContent = this.renderTemplate(); 

									oldElement = this.$el.find(".paginate-page");
									newElement = $(renderContent).find(".paginate-page");
									myAPP.animations.slideLeft({ 
										oldElement: oldElement, 
										newElement: newElement, 
										remove: true
									});
									this.updatePageNumbers();
									this.animateTableHeight( newElement );
									return false;
		},

		showCurrentPage: function () {									
									var oldElement, 
										newElement,									
										renderContent;

									renderContent = this.renderTemplate();									
									oldElement = this.$el.find(".paginate-page");
									newElement = $(renderContent).find(".paginate-page");

									oldElement
										.css({ 
											position: "absolute", 
											width: oldElement.parent().width(), 
											opacity: 0 
										});

									newElement
										.appendTo(oldElement.parent())
										.css({ opacity: 0 })
										.animate({ opacity: 1 });
									
									oldElement.remove();
									this.trigger('showPage');
									
									var self = this;
									setTimeout(function () { self.setTableHeight( newElement); }, 0);

		},

		createCollection: function () {
									var collection = new Backbone.Collection(); 
									var models = this.getPage();
										
									collection.models = models; 
									collection.length = models.length;
									collection.currentPage = this.currentPage; 
									collection.totalPages = this.totalPages();								

									for (var key in this.collection) {
										if (!collection[key])
											collection[key] = this.collection[key];
									}

									return collection;

		},

		updatePageNumbers: function () {										

									this.$el.find("span#total-pages").html(this.totalPages());
									var $oldElement = this.$el.find("span#current-page");
									var lastPage = Number($oldElement.html());

									if (lastPage === this.currentPage + 1)
										return;
									
									var height = $oldElement.css("height");
									var $parent = $oldElement.parent();
									var $newElement = $("<span id='current-page'></span>").html(this.currentPage + 1).appendTo($parent);
									
									if (lastPage < this.currentPage + 1) {												
										
										$newElement
											.css({position: "absolute", top: -20}).stop( true ).animate({top: 0}, {easing: "easeOutCubic"});
										$oldElement.css({position: "absolute"})
											.stop( true )
											.animate({ top: height }, { easing: "easeOutCubic", complete: function () { $oldElement.remove(); }});
										

									} else {

										$newElement
											.css({position: "absolute", top: 20}).stop( true ).animate({top: 0}, {easing: "easeOutCubic"});
										$oldElement.css({position: "absolute"})
											.stop( true )
											.animate({ top: -20 }, { easing: "easeOutCubic", complete: function () { $oldElement.remove(); }});

									}						

		},

		getTableHeight: function (newElement) {
									return newElement.height() + this.$el.find('.table-header').height() + 7;
		},

		setTableHeight: function (newElement) {
									this.$el.find(".table").css({ height: this.getTableHeight(newElement) })
		},

		animateTableHeight: function (newElement) {
									
									this.$el.find(".table").stop().animate({ height: this.getTableHeight(newElement) }, { easing: "easeOutCubic", duration: 1000 });
		}

	});	

	return this;

};



//------------------------------------



// this extension is (only) responsible for displaying changes in the view relating to saving (and failing to save) a Backbone model;

Backbone.View.saveable = function () {
	
	var _initialize = this.prototype.initialize;

	this.prototype.initialize = function () {

		_initialize.apply(this, arguments);

		if (!this.model)
			throw "This view doesn't have a model assigned to it!"

		var self = this;
		this.listenTo(this.model, 'invalid', function () { self.$el.stopSpinner(); self.isSaving = false; })
		
	}

	_.extend(this.prototype, {

		saveModel: function (options) {				

			var self = this,
				attributes = (options && options.attributes) || this.model.attributes;		

				if (options && options.attributes && _.isEmpty( options.attributes )) {
					console.warn("*** WARN: - saveable.js - attributes object passed to saveable but object is empty")
				}

			if (this.isSaving)	
				return;

			this.isSaving = true;			
			
			// showing spinning animation
			this.$el.startSpinner();		
			
			// mark all elements that have changed for a possible animation on save; 
			this.$el.find(".changed").addClass("saving");

			this.model.save(attributes, {	
				// if attributes were passed to saveModel, save only those attributes; otherwise save whole model;
				patch: _.isEmpty(attributes) ? false : true,

				success: function () {
					
					self.isSaving = false;
				
					if (self.toastOnSave)
						myAPP.trigger('toast', self.toastOnSave, 'success')
					self.$el.stopSpinner();				
					
					self.$el.find(".success").removeClass("success");
					self.$el.find(".saving").removeClass("changed saving").each (function () { myAPP.animations.flashElement($(this), 'success'); })
					// trigger callback;
					if (options && options.success) 
						options.success();					
				}, 
				
				error: function (model, xhr, fail) {
					self.isSaving = false;

					if (self.toastOnError) 
						myAPP.trigger('toast', self.toastOnError, 'error')	
					
					self.$el.find(".saving").removeClass("saving");
					self.$el.stopSpinner();
					
					// trigger callback					
					if (options && options.error) options.error(model, xhr, fail);
				}
				
			})

		}
		
	});

	return this;

}



//------------------------------------




Backbone.View.sortable = function (comparators) {

	var _initialize = this.prototype.initialize;

	this.prototype._comparators = comparators;
	this.prototype.events = this.prototype.events || {};
	this.prototype.initialize = function () {
		var self = this;

		_initialize.apply(this, arguments);

		if (!this.collection)
			throw "*** ERROR: can't sort without a collection";

		this.listenTo(this, 'filter', function () { 
			self._sortedBy = null; 
			self._sortDirection = null; 
			self.$el.find(".caret").remove();
		});		

	};

	_.extend(this.prototype.events, {

		'click .sort-handle': '_sortHandler'
		
	});

	_.extend(this.prototype, {

		_sortHandler: function (event) { 
			
			var self = this;

			var $target = $(event.currentTarget);
			var attribute = $target.attr("id");			

			var defaultComparator = function (a, b, attribute) { 
				var valueA = a.get(attribute),
					valueB = b.get(attribute);
				return (valueA - valueB);
			};

			if (!this.collection.models)
				throw "*** can't sort this view because no models are associated with it";

			// reverse sort direction
			if (this._sortedBy === attribute) {
				this.collection.models.reverse();
				this._sortDirection = !this._sortDirection;

			} else {						
				
				this._sortedBy = attribute;
				this._sortDirection = false;

				this.collection.models.sort(function (a, b) {					
					var result;
					if (self._comparators && self._comparators[attribute]) {
						result = self._comparators[attribute](a, b);					
						if (result[0] > result[1])
							return -1;
						else if (result[0] < result[1])
							return 1;
						return 0;
					} else {
						return defaultComparator(a, b, attribute);
					}
				});

			}

			// if a method renderCurrentpage is called, assume we can call it;
			if (!this.showCurrentPage)
				console.warn("*** WARN: showCurrentPage is not implemented on this view;");
			else
				this.showCurrentPage();

			// draw a caret to indicate sorting direction
			var carets = $target.parent().find(".caret").remove();
			var caretClass = (this._sortDirection === true) ? "caret-up" : "caret-down";
			$target.append("<div class='caret caret-small " + caretClass + "'></div>");

			$target.siblings().removeClass("selected");
			$target.addClass("selected");
		}

	});

	return this;
};	



//------------------------------------



// this interface should be fully responsible for error markup and removal on the view 
// *** rename this to showErrors or something?

// *** THINK OF A SMARTER WAY TO SET AND REMOVE ERROR MARKINGS, PARTICULARLY TOOLTIPS!

// features 
// - validates will autorun the validateAll function on a model on a model change;
// - validate checks changed attributes and removes error markings for attributes that changed 
// - fires modelValidates and modelHasErrors events;
// - will mark errors on DOM elements with IDs matching error keys;


Backbone.View.validates = function () {

	var _initialize = this.prototype.initialize;

	_.extend(this.prototype, {

		initialize: function () { 
										var self = this;
										_initialize.apply(this, arguments)
										
										
										// error fires when server-side validation fails;
										this.listenTo(this.model, 'error', this._errorHandler)

										// invalid fires when client-side validation fails;
										this.listenTo(this.model, 'invalid', this._invalidHandler)

										// it's convenient to trigger valdation on change to the model, so bind to the change
										// NB Backbone change, not jQuery change!!
										this.listenTo(this.model, 'change', this._changeHandler)

										// clear all errors on a sync-event ( = save to server)
										this.listenTo(this.model, 'sync', function () { self.clearErrors(); })
		},

		_changeHandler: function () {																
										
										var errors, changedValues;
										// the _changehandler fires when an attribute on the model changes;

										if (!this.model.getChangedValues) {
											throw "*** Model does not implement ChangedValues interface: " + this.model											
										}

										changedValues = this.model.getChangedValues();																

										// clear errors on attributes that changed
										if (!_.isEmpty(changedValues)) {											
											this.clearErrors(changedValues)
										}
									
										// run validation on full model;
										if(this.model.validateAll) {
											errors = this.model.validateAll();
										} else {
											console.warn("*** WARN: This model doesn't implement validateAll method: ", this.model)
										}
										 
										if (!errors) {
											this.trigger("modelValidates");	
											if (this.changeHandler)
												this.changeHandler(changedValues);																				
											return true

										} else {
											this.trigger("modelHasErrors")
											
											if (changedValues) {
												var erz = _.pick(errors, _.keys(changedValues))												
												if (!_.isEmpty(erz)) {
													this.markErrors(erz);
												}
											}
										}

										if (this.changeHandler)
											this.changeHandler(changedValues);

										// reset the changed values on the model										
										this.model.resetChangedValues();

										
		},

		_invalidHandler: function (model, errors /*, options */) {	
										this.trigger("modelHasErrors");									
										this.markErrors(errors);

		},

		_errorHandler: function (model, xhr /*, options*/) {
										var responseObject = myAPP.parseErrorResponse(xhr)										
										
										for (var key in responseObject) {
											responseObject[key] = myAPP.texts.errors[ responseObject[key] ];
										}

										this.markErrors(responseObject); 

		},

		markErrors: function (errors) {										

										// look for element with the same ID as the error key, and marks it erroneous;
										
										for (var key in errors) {											
											var $element = this.$el.find("#" + key);										

											// remove a possible errorMarker
											myAPP.animations.removeErrorMarkup($element);
			
											var error = errors[key]
											if (error instanceof Array) 
												// if the error is an array of messages, grab first message
												error = error[0]									

											myAPP.animations.addErrorMarkup($element, error );
											
										}
		},

		clearErrors: function (attributes) {

										if (attributes) {
											for (var key in attributes) {

												var $element = this.$el.find("#" + key);												
												myAPP.animations.removeErrorMarkup($element);
											}
										} else  {
											var $errors = this.$el.find(".error");
											myAPP.animations.removeErrorMarkup($errors)

										}
							
		},

		validateModel: function () { 
										
										// manually trigger validation; useful when creating a view and needing immediate validation for appropriate markup;
										var errors = this.model.validateAll();
										
										if (!errors)
											return true;
																				
										this.markErrors(errors);

		}
	});
	
	return this;


}



//------------------------------------



myAPP.collections.Accounts = Backbone.Collection.extend({

	namespace: "accounts",

	url: function () {
			return "accounts/"
	},

	initialize: function () { 
			this.model = myAPP.models.Account;
	},

	// *** override Backbone's default fetch method to deal with server data format;
	fetch: function (options) {

			options = options || {};

			var self = this,				
				success = options.success;
			
			options.success = function (collection, response, options) { 
				if (response.accounts)
					self.update(response.accounts.account)
				if (success) success();
			}		
			
			Backbone.Collection.prototype.fetch.apply(this, [options]);			
	}
	
});



//------------------------------------



myAPP.collections.ArticleGroups = Backbone.Collection.extend({

	url: function () { 
		return "/accounts/" + myAPP.currentAccount.get("id") + "/article_groups/";
	},

	namespace: "article_groups",

	initialize: function () {
		this.model = myAPP.models.ArticleGroup;
	},

	// *** override Backbone's default fetch method to deal with server data format;
	fetch: function (options) {
		var self = this,
			options = options || {},
			success = options.success;
		
		options.success = function (collection, response, options) { 
			if (response.article_groups)
				self.update(response.article_groups.article_group)			
			if (success) success();
		}		
		
		Backbone.Collection.prototype.fetch.apply(this, [options]);			
	}
	
})





//------------------------------------



myAPP.collections.Articles = Backbone.Collection.extend({

	url: function () { 
		return "/accounts/" + myAPP.currentAccount.get("id") + "/articles/";
	},

	namespace: "articles",
	
	initialize: function () { 
		this.model = myAPP.models.Article;
	},

	// *** override Backbone's default fetch method to deal with server data format;
	fetch: function (options) {
		options = options || {};

		var self = this,			
			success = options.success;
		
		options.success = function (collection, response, options) { 
			if (response.articles)
				self.update(response.articles.article)

			if (success) success();
		}		
		
		Backbone.Collection.prototype.fetch.apply(this, [options]);			
	},

	createAutoCompleteEntries: function () {
		var entries = []
		this.each(function (article) {

			// filter deleted articles;
			if (article.get("deleted"))
				return;

			var string = "%% " + article.get("article_number") + " - " + article.get("title") + " - %% " + myAPP.templateHelpers.parseNumber( article.get( "price" ) )+ "%%";
			var html = ["<span class='entype'>" + myAPP.templateHelpers.charCodes.article + "</span>", " <strong>" + myAPP.constants.currencyMarker +  " <span>",  "</span></strong>"]
			var id = "article/" + article.get( "id" );
			entries.push({ string: string, html: html, id: id});

		})
		
		return entries;
	}

})



//------------------------------------



myAPP.collections.Balances = Backbone.Collection.extend({

	url: function () { 
		return "accounts/" + myAPP.currentAccount.get("id") + "/balances/";
	},

	namespace: "balances",
	
	initialize: function () { 
		this.model = myAPP.models.Balance;
	},

	// *** override Backbone's default fetch method to deal with server data format;
	fetch: function (options) {
		var self = this,
			options = options || {},
			success = options.success;
		
		options.success = function (collection, response, options) { 
			if (response.balances)
				self.update(response.balances.balance)

			if (success) success();
		}		
		
		Backbone.Collection.prototype.fetch.apply(this, [options]);			
	}

})



//------------------------------------



myAPP.collections.Debtors = Backbone.Collection.extend({	

	url: function () {
			return "accounts/" + myAPP.currentAccount.get("id") + "/debtors/"
	},

	namespace: 'debtors',

	initialize: function () { 
			this.model = myAPP.models.Debtor;
	},

	// *** override Backbone's default fetch method to deal with server data format;
	fetch: function (options) {

			options = options || {};
			
			var self = this,		
				success = options.success;
			
			options.success = function (collection, response, options) { 
				if (response.account_debtors)
					self.update(response.account_debtors.account_debtor)
				if (success) success();
			}		
			
			Backbone.Collection.prototype.fetch.apply(this, [options]);			
	},

	createAutoCompleteEntries: function () {
		var entries = []
		this.each(function (debtor) {

			// filter deleted debtors;
			if (debtor.get("deleted"))
				return;

			var string = "%% " + debtor.get("company_name") + " %% - " + debtor.get("email") + " - " + debtor.get("address") + ", " + debtor.get("city");
			var html = ["<span class='entype'>" + myAPP.templateHelpers.charCodes.debtor + "</span><strong>", "</strong>"]
			var id = "debtor/" + debtor.get( "id" );
			entries.push({ string: string, html: html, id: id});

		})
		
		return entries;
	}

});



//------------------------------------



myAPP.collections.InvoiceLines = Backbone.Collection.extend({

	url: function () { 
		return "accounts/" + (myAPP.currentAccount && myAPP.currentAccount.get("id")) + "/invoices/" + this.invoice_id + "/lines"; 
	},
	
	namespace: 'invoiceLines',
		
	initialize: function() {
		this.model = myAPP.models.InvoiceLine;	

	},

	total_inc_vat: function () {	
		return _.reduce(this.models, function (memo, invoiceLine) { return memo + Number(invoiceLine.get('total')); }, 0);
	},

	total_vat: function () {
		return _.reduce(this.models, function (memo, invoiceLine) { return memo + Number(invoiceLine.get('vat_total')); }, 0);
	},

	clearVat: function () {

		for (var i = 0; i < this.models.length; i++) {
			var invoiceLine = this.models[i];
			invoiceLine.set({ vat: 0 });
			invoiceLine.resetChangedValues();
		}
	},

	// *** override Backbone's default fetch method to deal with server data format;
	fetch: function (options) {
			if (!this.invoice_id)
				throw "Cant fetch invoicelines without invoice_id on invoicelines collection";

			options = options || {};
			
			var self = this,								
				success = options.success;
			
			options.success = function (collection, response, options) { 
				if (response.invoice_lines)					
					self.update(response.invoice_lines.invoice_line)
				if (success) success();			
			}				
			
			Backbone.Collection.prototype.fetch.apply(this, [options]);			
	},

	save: function (options) {

		this._saveIndex = 0;
		this.saveNextInvoiceLine(options);
	},

	saveNextInvoiceLine: function (options) {
		var invoiceLine,
			self = this;

		
		if (this._saveIndex > this.models.length - 1) {
			console.log("succesfully save all invoicelines, calling success callbacy"); 
			if (options && options.success)
				options.success();
			return;
		}
		console.log("saving invoiceline", this._saveIndexz);

		invoiceLine = this.models[this._saveIndex];
		invoiceLine.save({}, {
			success: function () {
				console.log('succesfully saved invoiceline', invoiceLine.toJSON()); 
				self._saveIndex++;
				self.saveNextInvoiceLine(options);
				
			},
			error: function () {
				console.error('Error saving invoiceline!');
				if (options && options.error) {
					options.error();
				}
			}

		});

	}

});



//------------------------------------



myAPP.collections.Invoices = Backbone.Collection.extend({
	
	url: function () { 
		return "accounts/" + myAPP.currentAccount.get("id") + "/invoices/";
	},

	namespace: 'invoices',
		
	initialize: function() {
		
		this.model = myAPP.models.Invoice;
		
		this.totals = {
			sent: 0,
			notPaid: 0,
			paidInTime: 0,
			paidAfterReminder: 0,
			paidAfterSummation: 0
		};
	},		

	getPayableInvoices: function () {

		var invoice,
			payableInvoices = [];

		for (var i = 0; i < this.models.length; i++) {
			invoice = this.models[i];
			if (invoice.get( "canBookPayment" ))
				payableInvoices.push( invoice );
		}

		return payableInvoices;

	},
	getInvoiceNumbers: function () {

		return this.pluck("invoice_number");
	},
	
	createAutoCompleteEntries: function () { 
		var entries = [];

		this.each( function (invoice) {

			var debtor = myAPP.debtors.findWhere({ id: invoice.get( "account_debtor_id" ) }),
				debtorName = debtor && debtor.get("company_name") || "onbekend";

			var type = invoice.get("type");
			if (!type)
				type = "invoice";

			var string = "%% " + invoice.get("invoice_number") + " - " + debtorName + " - %% " + myAPP.templateHelpers.parseNumber(invoice.get( "total_inc_vat" )) + " %%";
			var html =  ["<span class='entype'>" + myAPP.templateHelpers.charCodes.invoice + "</span>", " <strong>" + myAPP.constants.currencyMarker +  " <span>",  "</span></strong>"];
			var id = "invoice/" + invoice.get( "id" );
			entries.push({ string: string, html: html, id: id });
		});

		return entries;
	},

	calculateStatistics: function () {

		this.sortByDate();
		//this.calculateMonthlyStatistics();

	},

	// creates two-dimensional array [year][month], sorted by date, dueDate, etc.
	sortByDate: function () {

		if (this.isSorted) {			
			return;
		}

		this.sortedByDate = []; 
		this.sortedByDueDate = [];	

		for (var i = 0; i < this.models.length; i++ ) {

			var invoice = this.models[i],
				status = invoice.get( "status" );

			if (status === "draft" || status === "ready" || status === "approved")
				continue;

			// sorted by invoice date
			var date = invoice.get( "date" ),
				month = date.getMonth(),
				year = date.getFullYear(),
				total = Number(invoice.get( "turnover" ));
			
			if (!this.sortedByDate[year]) {
				this.sortedByDate[year] = [];
			}
			if (!this.sortedByDate[year][month]) {
				this.sortedByDate[year][month] = [];
				this.sortedByDate[year][month].total = 0;				
				this.sortedByDate[year][month].sent = 0;				
				this.sortedByDate[year][month].paidInTime = 0;				
				this.sortedByDate[year][month].paidAfterReminder = 0;				
				this.sortedByDate[year][month].paidAfterSummation = 0;				
			}

			var paymentStatus = invoice.get( "paymentStatus" );

			this.sortedByDate[year][month].push( invoice );
			this.sortedByDate[year][month].total += total;
			this.sortedByDate[year][month].sent++;
			this.sortedByDate[year][month][ paymentStatus ]++;

			this.totals.sent++;
			this.totals[ paymentStatus ]++;

 
			// sorted by due date;
			date = invoice.get( "dueDate" );
				
			if (!this.sortedByDueDate[year]) {
				this.sortedByDueDate[year] = [];
			}
			if (!this.sortedByDueDate[year][month])
				this.sortedByDueDate[year][month] = [];

			this.sortedByDueDate[year][month].push( invoice );


		}

		this.isSorted = true;

	},

	getStatistics: function (year, statistic) {

		// if (!this[statistic])
		//	throw " - invoices.js - unknown statistic: " + statistic;

		var data = [];

		for (var i = 0; i < 12; i++) {
			var value = this.sortedByDate[ year ] && this.sortedByDate[ year ][ i ] && this.sortedByDate[ year ][ i ][ statistic ]  || 0;
			data[i] = value;
		}

		return data;

	},

	calculateTotalDue: function ( date ) { 

	
		if (!date)
			date = new Date();

		var totalDue = 0;

		// filter invoices, only consider invoices sent;
		
		for (var i = 0; i < this.models.length; i++ ) {

			var invoice = this.models[i],
				status = invoice.get( "status" ),
				deleted = invoice.get( "deleted" ),
				isCreditInvoice = invoice.get( "isCreditInvoice" );

			// ingore deleted invoices;
			if (deleted || isCreditInvoice)
				continue;

			if (invoice.get( "isFullyCredited" ))
				continue;

			// ignore imported invoices;
			if (invoice.get("imported") === "1")
				continue;

			// skip invoices that haven't been sent yet or have been payed;
			if (status === "draft" || status === "ready" || status === "approved" || status === "payed" || status === "stopped" || status === "redeemed")
				continue;

			// calculate part of invoice still due
			// N.B. creditInvoicesTotal is a negative number!
			var sumDue = Number( invoice.get( "total_inc_vat" ) ) + Number(invoice.get( "creditInvoicesTotal" )) - Number(invoice.get( "paymentsTotal" ));
			totalDue += sumDue;			

			// subtract payments;			

		}

	

		return totalDue;

		

	},

	calculateVatDue: function ( quarter, year ) { 

	
		var vatDue = 0;

		// quarter expected to be between 0 and 3;
		if (quarter > 3)
			throw " - invoices.js - incorrect quarter parameter for calculateVatDue: " + quarter;

		year = year || new Date().getFullYear();
		quarter = quarter || Math.floor( new Date().getMonth() / 3 );

		var startMonth = quarter * 3;

		var startDate = new Date( year, startMonth, 1 ),
			endDate = new Date( year, startMonth + 3, 0 );		

		for (var i = 0; i < this.models.length; i++) {
			var invoice = this.models[i],			
				status = invoice.get( "status" ),
				deleted = invoice.get( "deleted" ),
				isCreditInvoice = invoice.get( "isCreditInvoice" );
			
			// ingore deleted invoices and credit invoices;
			if (deleted || isCreditInvoice)
				continue;

			// ignore invoices that haven't been sent;
			if (status === "draft" || status === "ready" || status === "approved" || status === "stopped")
				continue;

			var date = invoice.get( "date" );
			if (date >= startDate && date <= endDate) {		
				
				vatDue += Number(invoice.get( "total_vat" )) + Number(invoice.get( "creditInvoicesTotalVat" ));
			
			}
		}

		

		return vatDue;


	},

	calculateTurnover: function ( quarter, year ) {

		var turnover = 0;

		// quarter expected to be between 0 and 3;
		if (quarter > 3)
			throw " - invoices.js - incorrect quarter parameter for calculateturnover: " + quarter;

		year = year || new Date().getFullYear();
		quarter = quarter || Math.floor( new Date().getMonth() / 3 );

		var startMonth = quarter * 3;

		var startDate = new Date( year, startMonth, 1 ),
			endDate = new Date( year, startMonth + 3, 0 );	

		for (var i = 0; i < this.models.length; i++) {
			var invoice = this.models[i];			

			var date = invoice.get( "date" );
			if (date >= startDate && date <= endDate) {						
				turnover += Number( invoice.get( "turnover" ));
			}
		}

		return turnover;	

	},

	getPaymentStatusPercentages: function ( ) { 

		var pIT = this.totals.paidInTime / this.totals.sent * 100;
		if (pIT > 100) pIT = 100;
		var pAR = (this.totals.paidInTime + this.totals.paidAfterReminder) / this.totals.sent * 100;
		if (pAR > 100) pAR = 100;
		var pAS = (this.totals.paidInTime + this.totals.paidAfterReminder + this.totals.paidAfterSummation) / this.totals.sent * 100;
		if (pAS > 100) pAS = 100;	

		return { 
			paidInTime: pIT, 
			paidAfterReminder: pAR,
			paidAfterSummation: pAS
		};


	}

	
});





//------------------------------------



myAPP.collections.Notifications = Backbone.Collection.extend({

	initialize: function () { 
		this.model = myAPP.models.notification
	},

	fetch: function ( options ) {	
		myAPP.notifications.models = [];

		var invoice, status, debtor, text, date, notification, status;

		for (var i = 0; i < myAPP.invoices.models.length; i++) {

			invoice = myAPP.invoices.models[i];
			status = invoice.get( "status" );
			debtor = myAPP.debtors.findWhere({ id: invoice.get( "account_debtor_id" ) }) || new myAPP.models.Debtor();					

			switch (status) {

				case "payed": 			notification = new myAPP.models.Notification({ 
											label: "success", 
											text:  "Factuur " + invoice.get( "invoice_number" ) + " is door " + debtor.get("company_name") + " voldaan.", 
											date: invoice.get( "lastPaymentDate" ), 
											labelText: "Betaald", 
											invoice_id: invoice.get( "id"), 
											type: "invoice" 
										});

										myAPP.notifications.add( notification );
										break;

				case "objection":		var objection;
										for (var j = 0; j < myAPP.objections.models.length; j++)  {
											objection =  myAPP.objections.models[j];
											var invoiceId = objection.get( "invoice_id" );
											if (invoiceId === invoice.get( "id" )) {
												text = debtor.get("company_name") + " heeft bezwaar gemaakt op factuur " + invoice.get("invoice_number") + "."; 
												date = objection.get("created");
												notification = new myAPP.models.Notification({
													label: "error", 
													text: text, 
													date: date, 
													labelText: "Bezwaar", 
													invoice_id: invoice.get( "id" ), 
													type: "objection" 
												})
												myAPP.notifications.add( notification );																							
											}
										}
										break;
										

				case "payment_plan": 	var paymentPlan;
										for (var j = 0; j < myAPP.paymentPlans.models.length; j++) {
											paymentPlan = myAPP.paymentPlans.models[j];
											var invoiceId = paymentPlan.get( "invoice_id" )
											if (invoiceId === invoice.get( "id" )) {
												var paymentPlanStatus = paymentPlan.get("status")

												if (paymentPlanStatus === "requested") {
													
													// create created notification;
													text = debtor.get("company_name") + " heeft een betalingsregeling aangevraagd voor factuur " + invoice.get("invoice_number") + ".";
													date = paymentPlan.get("created");
													notification = new myAPP.models.Notification({ 
														label: "info", 
														text: text, 
														date: date, 
														labelText: "Betalingsregeling", 
														invoice_id: invoice.get( "id"), 
														type: "paymentPlan" });
													myAPP.notifications.add( notification );
												
												} else if (paymentPlanStatus === "approved") {
													// create accepted notification;
													text = "U heeft een betalingsregeling met " + debtor.get("company_name") + " voor factuur " + invoice.get("invoice_number") + " goedgekeurd.";
													date = myAPP.modelHelpers.parseDate(paymentPlan.get("modified"));
													notification = new myAPP.models.Notification({ 
														label: "info", 
														text: text, 
														date: date, 
														labelText: "Betalingsregeling", 
														invoice_id: invoice.get( "id" ),
														type: "paymentPlan" });
													myAPP.notifications.add( notification )
												
												} else if (paymentPlanStatus === "rejected") {
													// create rejected notification;
													text = "U heeft een betalingsregeling met " + debtor.get("company_name") + " voor factuur " + invoice.get("invoice_number") + " afgewezen.";
													date = myAPP.modelHelpers.parseDate(paymentPlan.get("modified"));
													notification = new myAPP.models.Notification({ 
														label: "info", 
														text: text, 
														date: date, 
														labelText: "Betalingsregeling", 
														invoice_id: invoice.get( "id" ), 
														type: "paymentPlan" });
													myAPP.notifications.add( notification );												

												}												

											}
										}
										break;

				case "reminder": 		// create reminder notification;
										text = "Factuur " + invoice.get("invoice_number") + " aan " + debtor.get("company_name") + " is vervallen; herinnering verstuurd.";
										date = invoice.get("modified");
										notification = new myAPP.models.Notification({ 
											label: "warning", 
											text: text, 
											date: date, 
											labelText: "Herinnering", 
											invoice_id: invoice.get( "id" ),
											type: "invoice" 
										});
										myAPP.notifications.add( notification );
										break;

				case "summation": 		// create summation notification;
										text = "Factuur " + invoice.get("invoice_number") + " aan " + debtor.get("company_name") + " is ook na herinnering onbetaald; aanmaning verstuurd.";
										date = invoice.get("modified");
										notification = new myAPP.models.Notification({ 
											label: "warning", 
											text: text, 
											date: date, 
											labelText: "Aanmaning", 
											invoice_id: invoice.get( "id" ), 
											type: "invoice" 
										});
										myAPP.notifications.add( notification );
										break;

				case "collection":		// create summation notification;
										text = "Factuur " + invoice.get("invoice_number") + " aan " + debtor.get("company_name") + " is ook na aanmaning onbetaald gebleven en wordt geincasseerd.";
										date = invoice.get("modified");
										notification = new myAPP.models.Notification({ 
											label: "error", 
											text: text, 
											date: date, 
											labelText: "Incasso", 
											invoice_id: invoice.get( "id" ), 
											type: "invoice" 
										});
										myAPP.notifications.add( notification );
										break;

				case "paused": 			// create summation notification;
										text = "Factuur " + invoice.get("invoice_number") + " aan " + debtor.get("company_name") + " is gepauzeerd.";
										date = invoice.get("modified");
										notification = new myAPP.models.Notification({ 
											label: "info", 
											text: text, 
											date: date, 
											labelText: "Gepauzeerd", 
											invoice_id: invoice.get( "id" ), 
											type: "invoice"});
										myAPP.notifications.add( notification );
										break;

				case "send":			// create summation notification;
										if (invoice.get( "lastPaymentDate" )) {										
											for (var k = 0; k < invoice.payments.models.length; k++) {
												var payment = invoice.payments.models[k];
												notification = new myAPP.models.Notification({ 
													label: "info", 
													text: "Er is een deelbetaling van " + myAPP.constants.currencyMarker + myAPP.templateHelpers.parseNumber( payment.get("amount") ) + " gedaan voor factuur " + invoice.get("invoice_number") + " door " + debtor.get("company_name"), 
													date: payment.get("payment_date"), 
													labelText: "Gedeeltelijk betaald", 
													invoice_id: invoice.get( "id" ),
													type: "payment"
												}) 

												myAPP.notifications.add( notification );
											}
										} else {
											text = "Factuur " + invoice.get("invoice_number") + " aan " + debtor.get("company_name") + " is verstuurd.";
											date = invoice.get("modified");
											notification = new myAPP.models.Notification({ 
												label: "", 
												text: text, 
												date: date, 
												labelText: "Verzonden", 
												invoice_id: invoice.get( "id" ), 
												type: "invoice"
											});
											myAPP.notifications.add( notification );
										}
										
										break;

			}		

		}

		this.models = this.sortBy( function (notification) { var date = notification.get("date") || new Date(0); return -date.getTime() })
		
		if  (options && options.success)
			options.success();
	}

})



//------------------------------------



myAPP.collections.Objections = Backbone.Collection.extend({

	namespace: "objections",

	url: function () {
			return "accounts/" + myAPP.currentAccount.get("id") + "/objections/"
	},

	initialize: function () { 
			this.model = myAPP.models.Objection;
	},

	// *** override Backbone's default fetch method to deal with server data format;
	fetch: function (options) {
			var self = this,
				options = options || {},
				success = options.success;
			
			options.success = function (collection, response, options) { 
				if (response.objections)
					self.update(response.objections.objection)
				if (success) success();
			}		
			
			Backbone.Collection.prototype.fetch.apply(this, [options]);			
	}
	
});



//------------------------------------



myAPP.collections.PaymentPlans = Backbone.Collection.extend({

	namespace: "payment_plans",

	url: function () {
			return "accounts/" + myAPP.currentAccount.get("id") + "/payment_plans/"
	},

	initialize: function () { 
			this.model = myAPP.models.PaymentPlan;
	},

	// *** override Backbone's default fetch method to deal with server data format;
	fetch: function (options) {
			var self = this,
				options = options || {},
				success = options.success;
			
			options.success = function (collection, response, options) { 
				if (response.payment_plans)
					self.update(response.payment_plans.payment_plan)
				if (success) success();
			}		
			
			Backbone.Collection.prototype.fetch.apply(this, [options]);			
	}
	
});



//------------------------------------



myAPP.collections.Payments = Backbone.Collection.extend({

	url: function () { 
		return "/accounts/" + myAPP.currentAccount.get("id") + "/payments/";
	},

	namespace: "payments",
	
	initialize: function () { 
		this.model = myAPP.models.Payment;
	},

	// // *** override Backbone's default fetch method to deal with server data format;
	// fetch: function (options) {
	// 	options = options || {};

	// 	var self = this,			
	// 		success = options && options.success;
		
	// 	options.success = function (collection, response, options) { 
	// 		if (response.payments) {
	// 			for (var i = 0; i < response.payments.length; i++) {
	// 				console.log('adding payment ', i);
	// 				self.models.push( new myAPP.models.Payment( response.payments[i] ));
	// 			}
				
	// 		}
				
	// 		if (success) success();
	// 	}		
		
	// 	Backbone.Collection.prototype.fetch.apply(this, [options]);			
	// },

	calculateStatistics: function () {

		this.sortByDate();
		

	},

	// creates two-dimensional array [year][month], sorted by date, dueDate, etc.
	sortByDate: function () {


		if (this.isSorted) {			
			return;
		}

		this.sortedByDate = [];
		this.sortedByDueDate = [];	

		for (var i = 0; i < this.models.length; i++ ) {

			var payment = myAPP.payments.models[i],
				date = payment.get( "payment_date" ),
				month = date.getMonth(),
				year = date.getFullYear(),
				total = Number(payment.get( "amount" ));
				
			if (!this.sortedByDate[year]) {
				this.sortedByDate[year] = [];
			}

			if (!this.sortedByDate[year][month]) {
				this.sortedByDate[year][month] = []
				this.sortedByDate[year][month].total = 0;				
				this.sortedByDate[year][month].sent = 0;				
			}

			this.sortedByDate[year][month].push( payment );
			this.sortedByDate[year][month].total += total;
			this.sortedByDate[year][month].sent++;			

		}

		this.isSorted = true;

	},
	
	getStatistics: function (year, statistic) {
			
		var data = [];

		for (var i = 0; i < 12; i++) {
			var value = this.sortedByDate[ year ] && this.sortedByDate[ year ][ i ] && this.sortedByDate[ year ][ i ][ statistic ]  || 0;
			data[i] = value;
		}

		return data;

	}
		
})



//------------------------------------



myAPP.collections.Periodicals = Backbone.Collection.extend({

	namespace: "periodicals",

	url: function () {
			return "accounts/" + myAPP.currentAccount.get("id") + "/periodicals/"
	},

	initialize: function () { 
			this.model = myAPP.models.Periodical;
	},

	// *** override Backbone's default fetch method to deal with server data format;
	fetch: function (options) {
			var self = this,
				options = options || {},
				success = options.success;
			
			options.success = function (collection, response, options) { 
				if (response.periodicals)
					self.update(response.periodicals.periodical)
				if (success) success();
			}		
			
			Backbone.Collection.prototype.fetch.apply(this, [options]);			
	}
	
});



//------------------------------------



myAPP.collections.Quotes = myAPP.collections.Invoices.extend({
	
	url: function () { 
		return "accounts/" + myAPP.currentAccount.get("id") + "/invoices/";
	},

	createAutoCompleteEntries: function () { 
		var entries = [];
		//var invoices = this.filter(function (invoice) { var status = invoice.get("status"); if (status === "send" || status === "due" || status === "paused") return true; })

		this.each( function (invoice) {

			var debtor = myAPP.debtors.findWhere({ id: invoice.get( "account_debtor_id" ) }),
				debtorName = debtor && debtor.get("company_name") || "onbekend";			

			var string = "%% " + " Offerte - " + debtorName + " - %% " + myAPP.templateHelpers.parseNumber(invoice.get( "total_inc_vat" )) + " %%";
			var html =  ["<span class='entype'>" + myAPP.templateHelpers.charCodes.quote + "</span>", " <strong>" + myAPP.constants.currencyMarker +  " <span>",  "</span></strong>"];
			var id = "quote/" + invoice.get( "id" );
			entries.push({ string: string, html: html, id: id });
		});

		return entries;
	}
});




//------------------------------------



myAPP.collections.Templates = Backbone.Collection.extend({

	url: function () {
			return "/accounts/" + myAPP.currentAccount.get("id") + "/templates/";
	},

	initialize: function () { 
			this.model = myAPP.models.Template;
	},

	hasMultipleTemplates: function () {
		return this.models.length > 0;
	}
	
});



//------------------------------------



myAPP.collections.Users = Backbone.Collection.extend({
	
	namespace: 'users',
	
	initialize: function() {
								var self = this;
								// we do this here because myAPP.models.User may not be defined at the time of execution of Backbone's extend method;
								this.model = myAPP.models.User		

								this.listenTo(this, 'add', this.updateCollection)
								this.listenTo(this, 'remove', this.updateCollection)
								this.listenTo(this, 'reset', this.updateCollection)
								//his.listenTo(this, 'change', function () { alert("change on colelction!")})

	},

	// determineCurrentUser: function () {
								
	// 							_.each(this.models, function (model) {
								
	// 								if (model.get("user_id") === myAPP.currentUser.get("id")) {										
	// 									model.set({ isCurrentUser: true });
	// 								}
	// 							});
	// },

	updateCollection: function () {
								// *** HACK: this is the hack: we update the parent object of this collection manually; 
								var usersData = this.toJSON();								
								
								// *** because of the way the server returns userData, we need to nest the JSON like so: 
								var users = {user: usersData}

								myAPP.currentAccount.set({users: users})
	}

});





//------------------------------------



myAPP.models.Account = Backbone.Model.extend({

	urlRoot: 'accounts/',	

	namespace: "account",

	requiredForSend: ['title', 'address', 'city', 'zipcode', 'email', 'kvk_number', 'bank_account'],

	defaults: {	
		country: "nl",	
		maxMonthlyInvoices: 3,

		address: null,
		bank_account: null,
		bank_account_iban: null,
		bank_bic: null,
		city: null,
		contact_person: null,
		kvk_number: null,
		zipcode: null,
		phone: null,
		mobile: null,
		vat_number: null,
		monthlyInvoicesSent: null,		
		isImported: null,
		isFinalized: null

	},

	validation: { 

		title: { 
			required: true			
		},

		email: {
			required: true, 
			isValidEmail: true
		},

		kvk_number: {
			required: true		
		},

		address: { 
			required: true,
			noSpecialCharacters: true			
		},
		zipcode: {
			required: true
			//isValidZipcode: true
		},	
		city: {
			required: true,
			noSpecialCharacters: true			
		},
		contact_person: {
			minLength: 3,
			noSpecialCharacters: true
		},

		vat_number: function ( value ) {			
			if (this.attributes.vat_liable === 0)
				return; 
			if (!value)
				return "btw"	

		},

		bank_account: {
			required: true		
		}

	},

	// ## Getters

	getters: {

		country: function () {
			var country = _.findWhere(myAPP.constants.countries, { countryCode: this.attributes.country })
			if (country)
				return country.country			
			console.warn("*** Incorrect countrycode: " + this.attributes.country);
			return "geen";

		},

		// ### vat_liable ()
		// returns whether account is <code>vat_liable</code>
		// <p><span class="small">returns</span><code>"ja", "nee"</code></p>

		vat_liable: function () {			
			return (Number(this.attributes.vat_liable) === 1) ? "ja" : "nee";
		},

		monthlyInvoicesSent: function () { 

			var invoicesSent = 0,
				approvedInvoices = 0,
				balance,
				year = "" + new Date().getFullYear(), 
				month = "" + (new Date().getMonth() + 1);

			// add leading zero
			//month =  ((month < 10) ? "0" : "") + month;
			
			console.log("looking for ", month, year )

			balance = myAPP.balances.findWhere({ year: year, month: month });
			console.log("found balance: ", balance);
			
			if (balance)
				invoicesSent = Number(balance.get("nr_sent_normals"));
			approvedInvoices = myAPP.invoices && myAPP.invoices.where({ status: "approved" }).length;		
			
			return invoicesSent + approvedInvoices;		
		},

		canFinalize: function () {		

			// if this account doesn't have an import attribute, we can't finalize;
			if (this.get("subscription_extra") === "")
				return; 
	

			if (this.get("final_import_date") && this.get("final_import_date").toString().match(/0000-00-00/))
				return true;

			return false;
		},

		hasSentInvoices: function () {

			for (var i = 0; i < myAPP.invoices.models.length; i++) {

				var invoice = myAPP.invoices.models[i],
					status = invoice.get( "status" );

				if (status === "draft" || status === "ready" )
					continue;

				else 
					return true;
			}
		},

		created: function () {

			return myAPP.modelHelpers.parseDate( this.attributes.created )
			
		},

		subscription_date: function () {

			return myAPP.modelHelpers.parseDate( this.attributes.subscription_date )

		},

		// ### isImported	(<span class="parameter"></span>)
		// returns true if account was imported. Values that will return true : <code>import || import_discount</code>
		// <span class="small">accepts</span><span class="type">{  }</span><code></code>
		// <span class="small">returns</span><span class="type">{ boolean }</span>

		isImported: function () {
			var values = ["import", "import_discount"];

			var imported = this.get("subscription_extra")

			return values.indexOf( imported) !== -1;

		},


		// ### isFinalized	()
		// determines if the import of this account has been finalized
		//

		isFinalized: function () {		

			var importDate = this.attributes.final_import_date;

			if (!importDate)
				return;

			if (importDate.toString().match(/0000-00-00/)) 
				return;

			return true;
		}


	},

	// ## Getters

	setters: {

		country: function (value) { 
			var countryCode;

			if (!value)
				return;
			
			value = value.toLowerCase();

			var countryCodes = _.pluck(myAPP.constants.countries, "countryCode");			
			// if value is a country code, allow
			if (_.indexOf(countryCodes, value) > -1 )
				return value;
			
			// otherwise, look up country code for value
			for (var i = 0; i < myAPP.constants.countries.length; i++) {
				if (myAPP.constants.countries[i].country.toLowerCase() === value) {
					countryCode = myAPP.constants.countries[i].countryCode
				}

			}

			if (countryCode) {
				return countryCode;
			}

			console.warn("No country code for: %s, defaulting to 'nl'", value)
			return "nl"
		},

		vat_liable: function (value) {			
			return (value === "ja" || Number(value) === 1) ? 1 : 0;
			//return value;
		},

		// zipcode: function (value) {
		// return myAPP.modelHelpers.parseZipcode(value);
		// },

		send_nr_invoices: function ( value ) {			
			var year = new Date().getFullYear(), month = new Date().getMonth() + 1;
			var currentMonth = year + "-" + ((month < 10) ? "0" : "") + month;
			var sendMonth = this.attributes.send_month;
			if (sendMonth !== currentMonth)
				this.attributes.send_month = currentMonth;
			return (value);
		}

	},

	initialize: function (attributes) {	

		if (attributes && attributes.account_id)
			this.set({ id: attributes.account_id });

	},

	// *** TODO:
	// move methods to getters!!!
	
	isComplete: function () {

		var attributes = _.pick(this.attributes, this.requiredForSend)

		if (this.get("vat_liable") === "ja")
			attributes.vat_number = this.get("vat_number");

		var errors = this.validate(attributes)

		return (!errors)

	},

	maxInvoicesSent: function () { 
		// unlimited invoices if paid member
		if (this.get("subscription") === "payed")
			return;

		var monthlyInvoicesSent =  this.get("monthlyInvoicesSent"), maxMonthlyInvoices = this.get("maxMonthlyInvoices")		
		return (monthlyInvoicesSent >= maxMonthlyInvoices);
	},

	upgrade: function (options) {

		var url =  this.url() + "/upgrade", 
			self = this;

		// naked ajax post to /upgrade to upgrade account
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			data: null,
			success: function (data, textStatus, jqXHR) {
				// update currentAccount with data from server;
				self.set(data.account)
				// trigger sync to keep editable interface in sycn
				self.trigger('sync');

				if (options && options.success) {
					options.success();
				}

			},
			error: function () {				

				if (options && options.error) {
					options.error();
				}

			}
		})
	},

	downgrade: function (options) {

		var url = this.url() + "/downgrade", 
			self = this;

		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			data: null,
			success: function (data, textStatus, jqXHR) { 
				self.set(data.account);
				self.trigger('sync');

				if (options && options.success)
					options.success();
			},
			error: function () {
				if (options && options.error)
					options.error();
			}
		})
	},

	finalize: function (options) {

		var url =  this.url() + "/finalize"

		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			data: null,			
			success: function () {
				myAPP.currentAccount.fetch({
					successs: function () {},
					error: function () { alert( "Synchronizeren van account mislukt" ) } 
				})			

				if (options && options.success) {
					options.success();
				}

			},
			error: function () {
				

				if (options && options.error) {
					options.error();
				}
			}
		})
	},

	fetchBalances: function () {

		var id = this.get( "id" )

		this.balances = new myAPP.collections.Balances();
		this.balances.url = function () { return "accounts/" +  id + "/balances/" };

		this.balances.fetch();
	},

	// ### createDebtorFromAccount	(<span class="parameter"></span>)
	// creates a debtor model from account info	// 
	// <span class="small">returns</span><span class="type">{ Debtor }</span><code></code>

	createDebtorFromAccount: function () {

		var debtor = new myAPP.models.Debtor()
			debtor.set({ 
				company_name: this.get("title"), 
				email: this.get("email"),
				address: this.get("address"),
				zipcode: this.get("zipcode"),
				city: this.get("city"),
				country: this.get("country")
			})

			return debtor;
	}


}) .setGettersSetters() .setChangedValues() .validates();
				



//------------------------------------



myAPP.models.AccountSettings = Backbone.Model.extend({

	urlRoot: function () {
		return "accounts/" + myAPP.currentAccount.get("id") + "/settings/"
	}, 

	namespace: "account_setting",

	defaults: {

		//invoice_id_continuous: null
		
	},

	validation: {

		invoice_id_next: {
			digits: true
		},

		cc_emails: {
			isValidEmail: true	
		}

	},

	getters: {

		logoUrl: function () { 
			return myAPP.apiUrl + "accounts/" + myAPP.currentAccount.get("id") + "/settings/logo?auth=" + myAPP.session.authorizationString + "&" + _.random(100000);
		},

		postLogoUrl: function () {
			return "accounts/" + myAPP.currentAccount.get("id") + "/settings/logo?auth=" + myAPP.session.authorizationString;

		},

		canStartFromReminder: function () {
			return (Number(this.attributes.can_start_from_reminder) === 1);
		},

		canSendNoAutocycle: function () {
			return (Number(this.attributes.can_send_noautocycle) === 1);
		}
		
	},

	setters: {

		// legacy stuff.... should be removed
		invoice_id_continuous: function (value) {		
			if (!value || value === "nee")
			return 0;
			return 1;
		},

		kasco_payment: function (value) {			
			return (value === "yes" || Number(value) === 1) ? 1 : 0;
			//return value;
		}
				
	},

	// overwrite Backbone save && sync methods to unset id on object; accountSettings is not instantiated and can't be saved to /settings/:id

	fetch: function ( options) {
						this.unset("id"); 
						Backbone.Model.prototype.fetch.call(this, options);

	},

	save: function (attributes, options ) { 
						// unset id on models, to force POST to /settings instead of PUT to /setting/:id
						this.unset("id");

						if (!_.isEmpty(attributes))			
							this.attributes = attributes;

						for (var key in this.attributes) {										
							if (this.attributes[key] === null || this.attributes[key] === undefined /* || this.attributes[key] === "" */) {								
								delete this.attributes[key];
							}
						}
									
						Backbone.Model.prototype.save.call(this, this.attributes, options);
	}



}) .setGettersSetters() .setChangedValues() .validates();



//------------------------------------



myAPP.models.Article = Backbone.Model.extend({

	urlRoot: function () {
		return "accounts/" + myAPP.currentAccount.get("id") + "/articles/"
	}, 

	namespace: "article",

	validation: {

		

		article_number: function (value) {
			if (!value)
				return;

			
			var articleNumbers = myAPP.articles.pluck("article_number");

			if (articleNumbers.length === 0)
				return;

			var index = _.indexOf( articleNumbers, value ); 			
			if ((index !== -1))  {
				// if the model is already in the collection, its article Number will never appear to be unique, 
				// because we're testing against itself;				
				if (this.collection && _.lastIndexOf(articleNumbers, value) === index)
					return;
									
				return "uniqueArticleNumber"
			}

		},

		price: {
			notZero: true
		}
	},

	defaults: {
		articleGroupName: "",
		//article_group_id: "0",
		// ### lasdkfjaslkfjaslfkj
		title: "Nieuw artikel",
		description: "",
		article_number: "",
		vat: "21",
		price: 0
	},

	// # getters

	getters: {

		// #### articleGroupName
		articleGroupName: function () {
			var articleGroup = myAPP.articleGroups.findWhere({id: this.get("article_group_id")})			
			return articleGroup && articleGroup.get("title")
		},

		// #### vat
		vat: function () {
			return this.attributes.vat + "%"
		},

	},

	setters: {
		vat: function (value) {
			return parseFloat(value, 10) + ""
		},
		price: function (value) {
			return myAPP.modelHelpers.parseAmount(value);
		}

		
	},

	save: function () {		
		// make sure we don't try to save an article to a non-existing articlegroup.
		var articleGroup = myAPP.articleGroups.findWhere({id: String(this.get("article_group_id"))})
		if (!articleGroup) {
			this.set({article_group_id: null})
			console.warn("*** article_group_id pointed to non existing group; reset to null")			
		}

		Backbone.Model.prototype.save.apply(this, arguments)

	}	


	
}) .setGettersSetters() .setChangedValues() .validates();



//------------------------------------



myAPP.models.ArticleGroup = Backbone.Model.extend({

	urlRoot: function () {
		return "accounts/" + myAPP.currentAccount.get("id") + "/article_groups/"
	}, 

	namespace: "article_group",

	defaults: {
		title: "Nieuwe artikelgroep",
		groupcode: "",
		totalArticles: 0

	},

	getters: { 

		title: function () { 
			if (!this.attributes.title)
				return;
			//strip accidental spaces, so they don't mess up the hash
			return this.attributes.title.replace(/\s+$/g, "")
		},

		totalArticles: function () { 
			var articles = myAPP.articles.where({ article_group_id: this.get("id") })			
			return articles.length;
		}

	},

	initialize: function (attributes) { 

									//this.collection = new Backbone.Collection();
									//this.collection.title = this.attributes.title;
									
	}

	// add: function (model) {
									
	// 								this.collection.add(model)
									

	// }
	
}) .setGettersSetters() .setChangedValues()



//------------------------------------



myAPP.models.Balance = Backbone.Model.extend({

	urlRoot: function () {
		return "balances/accounts/" + myAPP.currentAccount.get( "id" ) + "/balances/"
	}, 

	namespace: "balance",

	defaults: {
		date: null,
		total_costs: 0
	},
	
	getters: { 

		date: function () {
			return myAPP.templateHelpers.fullMonth( this.attributes.month - 1 ) + " " + this.attributes.year;
		},

		total_costs: function () { 
			var total = 0;

			for (var key in myAPP.constants.costs) {
				var cost = myAPP.constants.costs[key] || 0;
				total += cost * ( Number( this.get( key ) ) || 0 );
			}
			return total;
		}
		
	},

	createInvoiceLines: function () {
									var invoiceLines = [];

									for (var key in myAPP.constants.costs) {
										var amount = Number(this.get( key ))

										if (amount !== 0) {

											var invoiceLine = new myAPP.models.InvoiceLine({ 
												price: myAPP.constants.costs[key], 
												amount: amount,
												title: myAPP.texts.keys[key]
											});
											
											invoiceLines.push( invoiceLine )
										}

									}

									return invoiceLines;

	}

	
	
}) .setGettersSetters() .setChangedValues()



//------------------------------------



myAPP.models.Debtor = Backbone.Model.extend({

	defaults: {
		email: "",
		company_name: "",	
		name: "",
		address: "",
		zipcode: "",
		city: "",
		country: "",
		phone: "",
		fax: "",
		mobile: "",
		bank_account: "",		
		salutation: "Mr.",
		delivery_method: "email",
		kvk_number: null,
		vat_number: null,

		openInvoices: null,
		totalInvoices: null,
		dueInvoices: null, 
		collections: null,
		objections: null,
		paymentPlans: null,
		balance: null,
		totalExtraCosts: null
	},

	validation: {

		company_name: {
			required: true
		},

		email: {
			//required: true,
			isValidEmail: true
		},

		address: {
			required: true
			//,
			//noSpecialCharacters: true
		},

		zipcode: {
			required: true
		},

		city: {
			required: true,
			noSpecialCharacters: true
		}


	},

	urlRoot: function () { 
		return "accounts/" + (myAPP.currentAccount && myAPP.currentAccount.get( "id" )) + "/debtors/";
	},

	namespace: "account_debtor",

	// ## Getters

	getters: {

									country: function () {
										var country = _.findWhere(myAPP.constants.countries, { countryCode: this.attributes.country });
										if (country)
											return country.country;
										// throw an warning 
										console.warn("*** Incorrect countrycode: " + this.attributes.country);
										return "geen";

									},
									
									balance: function () {	

										var balance = 0, total = 0;

										for (var i = 0; i < this.invoices.models.length; i++) {
											var invoice = this.invoices.models[i];
											var totalDue = invoice.get( "totalDue" );
											balance += totalDue; 
										}

										return balance;
									},	

									totalExtraCosts: function () {

										var extraCosts = 0;

										for (var i = 0; i < this.invoices.models.length; i++) {
											var invoice = this.invoices.models[i];
											
											if (!invoice.get( "isOpen"))
												continue;

											if (invoice.get( "isCreditInvoice" ))
												continue;

											if (invoice.get( "isFullyCredited"))
												continue;

											// should extra costs be included in this calculation?			
											extraCosts += invoice.get( "extra_costs");
											
										}

										return extraCosts;

									},		

									totalInvoices: function () {
										
										return this.invoices.length || 0;
									},

									// ### openInvoices	(<span class="parameter"></span>)
									// test invoices in debtor collection on invoice.get( "isOpen" )
									// <span class="small">returns</span><span class="type">{ number }<code>openInvoices</code>

									openInvoices: function () {
										var total = 0;

										for (var i = 0; i < this.invoices.models.length; i++) {
											var invoice = this.invoices.models[i];
											if (invoice.get( "isOpen" ))
												total++;

										}
										return total;
									},

									dueInvoices: function () {
										var total = 0;

										for (var i = 0; i < this.invoices.models.length; i++) {
											var invoice = this.invoices.models[i];
											if (invoice.get( "isDue" ))
												total++;

										}
										return total;

									},

									collections: function () {
										var total = 0;

										for (var i = 0; i < this.invoices.models.length; i++) {
											var invoice = this.invoices.models[i];
											if (invoice.get( "status" ) === "collection")
												total++;

										}
										return total;
									},		

									objections: function () {
										if (myAPP.objections) {											
											var objections = myAPP.objections.where({ account_debtor_id: String(this.get( "id" )) });
											return objections.length;
										}
									},

									paymentPlans: function () {
										if (myAPP.paymentPlans) {
											var paymentPlans = myAPP.paymentPlans.where({ account_debtor_id : String(this.get( "id" )) });
											return paymentPlans.length;
										}
									}
		
	},

	// ## Setters

	setters: {
									country: function (value) { 
										var countryCodes = _.pluck(myAPP.constants.countries, "countryCode");			
										// if value is a country code, allow
										if (_.indexOf(countryCodes, value) > -1 )
											return value;
										
										// otherwise, look up country code for value
										var country = _.findWhere(myAPP.constants.countries, {country: value});
										if (country) {
											return country.countryCode;
										}
										
										return "nl";
									},

									zipcode: function (value) {
										value =  myAPP.modelHelpers.parseZipcode(value);
										if (!value)
											return "";
										return value;
									},

									deleted: function (value) {
										return value ? 1 : 0;

									}
	},

	initialize: function () {

									this.invoices = new myAPP.collections.Invoices();
									this.quotes = new myAPP.collections.Quotes();						

									this.listenTo(this.invoices, 'destroy', function (args) {
										console.log('invoice removed from debtor collection.');
										console.log(args);
									});

	},

	addInvoice: function (invoice) {									
									
									if (invoice.get( "isQuote" )) {										
										this.quotes.add( invoice);
									} else {
										this.invoices.add(invoice);
									}
									
	},

	// this shit is awful
	// it gets uglier and uglier

	save: function (attributes, options) {
									var self = this, _attributes;	

									options = options || {};											

									// clone object, to not affect properties of original model!
									
									if (_.isEmpty(attributes))
										// if the attributes object is empty, save all attributes;
										_attributes = jQuery.extend({}, this.attributes);
									else
										//we use the attributes passed along as parameter
										_attributes = jQuery.extend({}, attributes);

									for (var key in _attributes) {										
										if ( (_attributes[key] === null || _attributes[key] === undefined) && !(this.validation[key] && this.validation[key]["required"]) ) {							
											delete _attributes[key];
										}
										if (( _attributes[key] === "") && key !== "email") {
											delete _attributes[key];
										}
									}																
									// save only parts of the model being sent;
									options.patch = true;
									Backbone.Model.prototype.save.call(this, _attributes, options);
									
	}

}) .setGettersSetters() .setChangedValues() .validates();



//------------------------------------



myAPP.models.ImportObject = Backbone.Model.extend({

	urlRoot: 'imports/',

	namespace: "import",

	save: function (attributes, options) {
		options.url = this.get("mode") === "final" ? "imports/final" : "imports/test";

		Backbone.Model.prototype.save.call( this, attributes, options );

	},

	fetch: function (options) {
		options.url = "imports/" + this.get("id") + "/" + this.get("hash");
		Backbone.Model.prototype.fetch.call( this, options );
	}

}) .setGettersSetters();



//------------------------------------



myAPP.models.Invoice = Backbone.Model.extend({

	// the invoice model is one of the main models of the program.

	urlRoot: function () {
		var accountId = myAPP.currentAccount && myAPP.currentAccount.get("id");

		return "accounts/" + accountId + "/invoices/";
	}, 
	
	namespace: "invoice",

	defaults: {
		payment_term: 14,
		invoice_template_id: 0,
		delivery_method: "email",
		currency: "EUR",				
		status: "draft",
		type: "invoice",
		invoice_number: null,
		total_exc_vat: 0,
		total_inc_vat: 0,
		total_vat: 0,
		//extra_costs: 0,
		total_invoiceLines: 0,	
		period: "",
		
		dueDate: null,
		payDate: null,
		daysOld: null,
		daysUntilSend: null,
		daysUntilDue: null,
		//objectionDate: null,
		repetitions: 999999,
		totalDue: null,
		
		// server related
		created: null,
		deleted: 0,

		canSendCreditInvoice: null,
		canPauseInvoice: null,
		canChangeDeliveryMethod: null,
		isPeriodicalChild: null,

		isCreditInvoice: null,
		isFullyCredited: null,
		parentIsFullyCredited: null,
		parentInvoiceNumber: null,		

		canBookPayment: null,
		canDeleteInvoice: null,
		hasActions: null,
		isAccepted: null,
		isDue: null,
		isOpen: null,
		reminderSent: null,

		vatTotals: null,
		paymentsTotal: null,
		creditInvoicesTotal: null
		
	},

	computedValues: [
		'total_inc_vat', 'total_vat', 'total_invoiceLines'
	],	

	validation: {	
		total_invoiceLines: function (value) {			
			if (value < 1)
				return { errorMessage: "Voeg minimaal één factuurregel toe" };
		},
		account_debtor_id: function (value) {			
			if (!value)
				return { errorMessage: "Voeg een debiteur toe aan de factuur" };
		},
		date: {			
			isValidJavascriptDate: true
		}	
			
	},

	// ## setters

	setters: {	

		/**
		 *		converts a Javascript <code>Date</code> object into a <code>YYYY-MM-DD</code> format
		 */		
		
		date: function (value) {			
			return myAPP.modelHelpers.parseToServerDate(value);
		},
		
		delivery_method: function (method) {			
			if (method === myAPP.constants.deliveryMethods[0] || method === "email") 
				return "email";
			else if (method === myAPP.constants.deliveryMethods[1] || method === "both")
				return "both";
			else if (method === myAPP.constants.deliveryMethods[2] || method === "postal")
				return "postal";
		},

		/**
		 *		parses payment_term values
		 */				
				 
		payment_term: function (value) {			
			return parseInt(value, 10);
		},

		/**
		 *		converts values for period type into string accepted by the server. preserves value for period length	
		 */

		periodType: function (value) {
			var period, type;

			switch (value) {
				case "dagen":	type = "day"; 
								break;
				case "weken" :	type = "week";
								break;
				case "maanden":	type = "month"; 
								break;
				case "jaren":	type = "year"; 
								break;
			}

			var match = String(this.get( "period" )).match(/(\d+)\s?(\w+)?/);
			if (match && match[1])
				period = match[1];

			if (type) 
				period += " " + type;

			// we want to be able to save null to the server, so set this to null rather than undefined
			if (!period)
				period = "";


			this.set({ period: period });
			return value;
			
		},

		periodLength: function (value) {
			var period;			
			
			var match =  String(this.get( "period" )).match(/(\d+)\s?(\w+)?/);
			period = value;

			if (match && match[2])
				period += " " + match[2];

			// we want to be able to save null to the server, so set this to null rather than undefined
			if (!period)
				period = "";
			
			this.set({ period: period });
			return value;

		},
		
		// hook into type to set defaults for invoice types.

		type: function (value) {	

			if (value !== "reminder") {
				this.set({ status_internal: "", invoice_number: "" });
			}
			if (value !== "periodical") {
				this.set({ periodLength: undefined, periodType: undefined });
			}
			
			switch (value) {			
				case "reminder":	this.set({ status_internal: "reminder" });
									break;				
				case "periodical":	this.set({ periodLength: 1, periodType: "maanden" });
									break;
			}

			return value;
			
		},

		status_internal: function (value) {
			if (value !== "reminder") {
				this.set({ invoice_number: ""});				
			}
			return value;
		},

		// we need to create an objection date if an objection was registered 
		objection: function (value) {
			if (value) {
				this.attributes.objectionDate = true;
				return value;
			}			

		},

		deleted: function (value) {
			return value ? 1 : 0;
		},

		// status: function (value) {
		//	if (value === "reminder") {				
		//		//this.set({ payment_term: 0 })
		//		return "reminder"; 
		//	}
		//	return value;
		// },

		content: function (value) {
			if (!value) 
				return "";

			value = value.replace(/r\n|\r|\n/g, "<br/>");
			return value;

		}

	},

	// ## getters

	getters: {

		created: function () {

			return myAPP.modelHelpers.parseDate( this.attributes.created );
		},

		date: function () {	

			var match, date;			
			if (this.attributes.date) {

				return myAPP.modelHelpers.parseDate( this.attributes.date );
	
			}		

		},

		imported: function () {
			return Number(this.attributes.imported) === 1 ? true : false;
		},

		/**
		 *		get the invoice number for the parent invoice of a credit-invoice
		 */

		parentInvoiceNumber: function () {
			var parentInvoice;

			if (!this.get("isCreditInvoice")) {
				return;
			}

			parentInvoice = myAPP.invoices.get( this.get( "parent_credit_id" ));
			if (parentInvoice) {
				return parentInvoice.get("invoice_number");
			}

		},

		dueDate: function () {	
			var date = this.get("date"),
				dueDate = new Date(date.getTime() + (1000 * 60 * 60 * 24) * this.get("payment_term"));	

			return dueDate;
					

		},


		total_invoiceLines: function () {
			return this.invoiceLines.length;			
				
		},

		total_vat: function () { 

			if(this._hasInvoiceLinesFetched) {
				var total = 0;

				for (var i = 0; i < this.invoiceLines.models.length; i++) {
					var invoiceLine = this.invoiceLines.models[i];
					var vat_total = invoiceLine.get( "vat_total" );
					total += Number(vat_total);
				}

				return total;
			}
			
			return Number(this.attributes.total_inc_vat) - Number(this.attributes.total_exc_vat);

		},

		// ### total_inc_vat ()
		// returns the total including vat;
		// <span class="small">accepts</span><code></code>
		// <span class="small">returns</span><span class="type">{ number }</span><code></code>

		total_inc_vat: function () { 

			if (this._hasInvoiceLinesFetched) {

				var total = 0; 

				for (var i = 0; i < this.invoiceLines.models.length; i++) {
					var invoiceLine = this.invoiceLines.models[i];						
					var _total = invoiceLine.get( "total" );				
					total += Number(_total);

				}		

			return total;

			}
			
			return Number(this.attributes.total_inc_vat);
			
		},

		total_exc_vat: function () {			
				
			if(!this._hasInvoiceLinesFetched)
				return Number(this.attributes.total_exc_vat);
			
			if (this._hasInvoiceLinesFetched) {

				var total = 0;	

				for (var i = 0; i < this.invoiceLines.models.length; i++) {
					var invoiceLine = this.invoiceLines.models[i];						
					var _total = invoiceLine.get( "total_exc_vat" );					
					total += Number(_total);

				}		

				return total;
			}

			return Number(this.attributes.total_exc_vat);

		},

		totalDue: function () {
				var statuses = ["draft", "ready", "approved", "payed", "debited", "redeemed"],
					status = this.get( "status" );

				if (statuses.indexOf(status) !== -1)
					return 0;

				if (this.get( "isQuote" ))
					return 0;

				if (this.get( "isCreditInvoice" ))
					return 0;

				if (this.get( "isFullyCredited" ))
					return 0;

				var total = Number(this.get( "total_inc_vat" )),
					totalPaid = Number(this.get( "paymentsTotal" )),
					totalCredited = Number(this.get("creditInvoicesTotal"));							

				// NB totalCredited will be a negative number.
				return total - totalPaid + totalCredited;

		},

		vatTotals: function () {
			var totals = {},
				vat,
				invoiceLine,
				vat_total,
				i;
			
			for (i = 0; i < this.invoiceLines.models.length; i++) {
				invoiceLine = this.invoiceLines.models[i];
				vat = invoiceLine.get( "vat" );
				vat_total = Number( invoiceLine.get( "vat_total" ) );
				if (!_.has( totals, vat)) {
					totals[vat] = 0;
				}
				totals[vat] += vat_total;
			}

			for (vat in totals) {
				if (totals[vat] === 0) {					
					delete totals[vat];
				}
			}

			
			return totals;

		},

		// ### extra_costs()
		// returns extra costs on the invoice
		//		
		// <span class="small">returns:</span><span class="type">{ number }</span>		

		extra_costs: function () {
			// if (this.get("status") === "redeemed")
			//	return 0
			return Number(this.attributes.extra_costs || 0);
		},

		daysOld: function () { 
				var daysOld = Math.floor((new Date() - this.get("date")) / (1000 * 60 * 60 * 24));				
				return daysOld;
		},

		daysUntilSend: function () {
				if (this.get("status") === "approved")
					return Math.floor((this.get("date")- new Date()) / (1000 * 60 * 60 * 24)) + 1;		
		},


		daysUntilDue: function () { 
				var status = this.get("status");
				if (status === "send") 
					return Number(this.get("payment_term") - this.get("daysOld"));
		},

		// ### isOpen	(<span class="parameter"></span>)
		// returns whether the invoice is considered open		
		// 
		// <span class="small">returns:</span><span class="type">{ true, undefined }</span>

		isOpen: function () {
				var statuses = ["send", "reminder", "summation", "collection", "paused", "objection", "payment_plan"],
					status = this.get( "status" );

				if (this.get( "isQuote" ))
					return;

				if (this.get("deleted") === true)
					return;

				if (this.get( "isFullyCredited" ))
					return;

				if (this.get( "isCreditInvoice"))
					return;

				if (statuses.indexOf(status) !== -1)
					return true;
		},

		// ### isDue	(<span class="parameter"></span>)
		// returns whether invoice is considered dueDate		
		// <span class="small">returns</span><span class="type">{  true, undefined }</span><code></code>

		isDue: function () {
				var statuses = ["reminder", "summation", "collection", "objection", "payment_plan"],
					status = this.get( "status" );

				if (statuses.indexOf(status) !== -1)				
					return true;

		},

		isArchived: function () {

				if (Number(this.attributes.archived) === 1)
					return true;
		},

		status: function () {	
				var _status = this.attributes.status;

				// certain statuses take precedence over others
				if (_status === "redeemed") 
					return "redeemed";
				 
				if (_status === "payed")
					return "payed";

				if (_status === "paused")
					return "paused";

				if (_status === "debited")
					return "debited";

				if (_status === "approved") {
					if (this.get("date") > new Date()) {
						return "approved";
					} else {
						return "send";
					}
				}

				if (_status === "draft")
					return "draft";

				if (_status === "ready")
					return "ready";
				
				_status = this.attributes.status_external;
				
				if (_status) {
					if (_status === "objection") {
						var objection = myAPP.objections.findWhere({ invoice_id: this.attributes.id }),
							objectionStatus = objection && objection.get("status");
						if (objectionStatus === "active")
							return "objection";

					} else if ( _status === "payment_plan" )
						return _status;
				}
				// @todo: Due to a spelling error in the database, the front-end uses the word 'send' instead of 'sent' as a status. 
				// This should be changed in all the javascript, but for now we can have the getter function return 'send' instead of 'sent'

				if (this.attributes.status_internal === '' || this.attributes.status_internal === ' ' || this.attributes.status_internal === 'sent')
					return 'send'
									
				// reminder, summation, collection;
				return this.attributes.status_internal;

		},

		// this gets the most recent pdf, regardless of invoice status
		pdfUrl: function () {
				var hash = this.get("view_hash");
				if (hash)
					return myAPP.apiUrl + "/accounts/" + (myAPP.currentAccount && myAPP.currentAccount.get("id")) + "/invoices/" + this.get("id") + "/pdf/" + hash;				
		},

		// the following three methods return the pdf url pertaining to a specific invoice status.
		originalPdfUrl: function () {
				var hash = this.get("view_hash");
				if (hash)
					return myAPP.apiUrl + "/accounts/" + (myAPP.currentAccount && myAPP.currentAccount.get("id")) + "/invoices/" + this.get("id") + "/pdf/original/" + hash;				
		},

		reminderPdfUrl: function () {
				var hash = this.get("view_hash");
				if (hash)
					return myAPP.apiUrl + "/accounts/" + (myAPP.currentAccount && myAPP.currentAccount.get("id")) + "/invoices/" + this.get("id") + "/pdf/reminder/" + hash;				
		},

		summationPdfUrl: function () {
				var hash = this.get("view_hash");
				if (hash)
					return myAPP.apiUrl + "/accounts/" + (myAPP.currentAccount && myAPP.currentAccount.get("id")) + "/invoices/" + this.get("id") + "/pdf/summation/" + hash;				
		},

		modified: function () {
				var modified = this.attributes.modified;
				return myAPP.modelHelpers.parseDate(modified);
		},

		periodType: function () {			

			var match = String(this.get( "period" )).match(/(\d+)\s?(\w+)?/);
			if (match && match[2]) {				

				switch (match[2]) {
					case "day": return "dagen";
					case "week": return "weken";
					case "month": return "maanden";
					case "year": return "jaren";
				}	
				
			}			
			
		},

		periodLength: function () {			
			var match =  String(this.get( "period" )).match(/(\d+)\s?(\w+)?/);

			if (match && match[1])
				return match[1];

		},

		canPauseInvoice: function () {
			var statuses = ["send", "reminder", "summation","collection", "objection"],
				status = this.get("status");

			if (this.get("isCreditInvoice")) {
				return;
			}

			if (this.get("isQuote"))
				return;

			if (statuses.indexOf(status) !== -1) {
				return true;
			}

		},

		canUnpauseInvoice: function () {

			if (this.get("isCreditInvoice"))
				return;

			if (this.get("isQuote"))
				return;

			if (this.get("status") === "paused") {
				return true;			

			}
		},

		canChangeDeliveryMethod: function () {
			var statuses = ["send", "reminder", "paused", "objection", "payment_plan"],
				status = this.get("status");

			if (this.get('isCreditInvoice'))
				return;

			if (this.get( "isQuote"))
				return;

			if (statuses.indexOf(status) !== -1)
				return true;
		},

		canSendCreditInvoice: function () {			
			var statuses = ["send", "reminder", "summation","collection", "paused", "objection", "payment_plan", "payed", "redeemed"],
				status = this.get("status");

			if (this.get("isCreditInvoice"))
				return;

			if(this.get( "isQuote"))
				return;

			if (statuses.indexOf(status) !== -1)
				return true;

			if (status === "stopped" && this.get("imported") === "1")
				return true;			

		},

		canSendInvoiceFromQuote: function () {

			var statuses = ["send"],
				status = this.get( "status" );

			if (!this.get( "isQuote"))
				return;

			if (statuses.indexOf(status) !== -1)
				return true;

		},

		canSendReminder: function () {

			return false;

			// if (this.get("isQuote"))
			// 	return;

			// if (this.get("isCreditInvoice"))
			// 	return;

			// if (this.attributes.status_internal === "" || this.attributes.status_internal === "sent") {
			// 	if (this.attributes.no_automatic_reminder === 1 && !myAPP.accountSettings.get("automatic_reminders")) {
			// 		return true;
			// 	}
			// }
		},

		canSendSummation: function () {

			return false;

			// if (this.get("isQuote"))
			// 	return;

			// if (this.get("isCreditInvoice"))
			// 	return;

			// if (this.attributes.status_internal === "reminder") {
			// 	if (this.attributes.no_automatic_summation === 1 && !myAPP.accountSettings.get("automatic_summations")) {
			// 		return true;
			// 	}
			// }
		},

		canStartCycle: function () {

			if (this.get("isNoAutocycle") && this.get("status_internal") === "sent")
				return true;
		},

		canRedeemInvoice: function () {

			var statuses = ["summation", "collection"],
				status = this.get("status");

			// superfluous? 
			if (this.get("isQoute"))
				return;

			if (this.get("isCreditInvoice"))
				return;

			if (statuses.indexOf(status) !== -1)
				return true;

		},

		canArchiveInvoice: function () {

			
			// Tijdelijk uitgeschakeld tot Archive functie goed werkt
			return false;

			/*var statuses = ["payed", "debited", "stopped", "redeemed"],
				status = this.get("status");

			if (this.get( "isArchived" ))
				return;

			if(this.get( "isCreditInvoice" )) {
				var parentInvoice = myAPP.invoices.get( this.get( "parent_credit_id" ));
				if (!parentInvoice || parentInvoice.get( "canArchiveInvoice" ))
				return true;
			}

			if (statuses.indexOf(status) !== -1)
				return true;			*/

		},

		canDeleteInvoice: function () {

			if (this.get( "isQuote" )) {
				return;
			}

			// don't allow deleting invoices for which extra costs have been charged
			if (this.get("extra_costs")) {
				return
			}

			// var statuses = ["draft", "ready", "approved"],
			// 	status = this.get("status");

			// if (statuses.indexOf(status) !== -1)
			// 	return true;

			// if (this.get( "isQuote" )) {
			// 	return true;
			// }
			
			// changed to allow all invoices to be deleted.

			return true;

		},

		canResendInvoice: function () {

			var statuses = ["send", "reminder", "summation", "collection", "stopped", "paused"],
				status = this.get("status");

			if (this.get("isCreditInvoice"))
				return false;

			if (statuses.indexOf(status) !== -1)
				return true;

		},

		isCreditInvoice: function () {

			var statuses =["draft", "ready"],
				status = this.get("status");

			if (!this.attributes.parent_credit_id || Number(this.attributes.parent_credit_id) === 0) {
				return false;
			}

			if (statuses.indexOf(status) !== -1) {				
				return false;
			}
			
			return true;
		},

		hasCreditInvoices: function () {

			if (this.creditInvoices && this.creditInvoices.length > 0)
				return true;

		},

		// reminderSent: function () {
		//	var statuses = ["reminder", "summation", "collection"]

		//	var statusInternal = this.attributes.status_internal,
		//		status = this.get("status");

		//	// ignore draft invoices with internal status set to reminder
		//	if (status === "ready" || status === "draft")
		//		return;

		//	if (statuses.indexOf(statusInternal) !== -1)
		//		return true;

		// },

		isFullyCredited: function () {
			if (!this.creditInvoices)
				return;

			if (this.get( "creditInvoicesTotal" ) <= (this.get( "total_inc_vat") + this.get( "extra_costs" ))* -1)
				return true;
		},

		parentIsFullyCredited: function () {

			if (!this.get( "isCreditInvoice" ))
				return;

			var parentInvoice = myAPP.invoices.get( this.get( "parent_credit_id" ) );
			if (parentInvoice)
				return parentInvoice.get( "isFullyCredited" );

			console.warn("*** WARN: no parent invoice found for creditInvoice");
		},

		creditInvoicesTotal: function () {
			var total = 0;

			if (!this.creditInvoices)
				return total;

			for (var i = 0; i < this.creditInvoices.models.length; i++) {
				var creditInvoice = this.creditInvoices.models[i];
				var _total = creditInvoice.get( "total_inc_vat" );

				total += Number( _total );
			}

			return total;
		},

		creditInvoicesTotalVat: function () {			
			var total = 0;

			if (!this.creditInvoices)
				return total;

			for (var i = 0; i < this.creditInvoices.models.length; i++) {
				var creditInvoice = this.creditInvoices.models[i];
				var _total = creditInvoice.get( "total_vat" );

				total += Number( _total );
			}

			return total;
		},
		
		paymentsTotal: function () {
			var total = 0;

			if (!this.payments)
				return total;

			for (var i = 0; i < this.payments.models.length; i++) {
				var payment = this.payments.models[i];
				var _total = Number( payment.get( "amount" ) );

				total += _total;
			}

			return total;

		},

		canBookPayment: function () {

			var statuses = ["send", "paused", "reminder", "summation", "collection", "objection", "redeemed", "stopped", "debited"],
				status = this.get("status");			

			if (this.get( "deleted") || this.get( "isCreditInvoice") )
				return;

			if(this.get( "isQuote" ))
				return;

			if (this.get("total_inc_vat") <= 0)
				return;

			if (statuses.indexOf(status) !== -1)
				return true;			

			// if (status === "stopped" && this.get("imported") === "1")
			// return true;

		},

		// calculate the amount to which this invoice contributes towards turnover;
		turnover: function () {

			// ignore deleted invoices, credit invoices, and invoices that have been debited;
			if (this.get( "deleted" ) || this.get( "isCreditInvoice" ) || this.get( "isFullyCredited" ))
				return 0;

			if (this.get( "isQuote" ))
				return 0;

			var status = this.get( "status" );

			// ignore invoices that haven't been sent yet
			if (status === "draft" || status === "ready" || status === "approved")
				return 0;

			// return total minus total credited;
			return Number( this.get( "total_inc_vat" ) ) + Number(this.get( "creditInvoicesTotal" ));

		},

		isPeriodical: function () {
			if (this.get("period"))
				return true;
		},

		isPeriodicalChild: function () {
			if (this.get("periodical_id"))
				return true;
		}, 

		paymentStatus: function () {		

			if (!this.payments)
				return "notPaid";

			// fetch last payment date
			var paymentDate = this.get( "lastPaymentDate" );

			var dueDate = this.get( "dueDate" );

			if (paymentDate <= dueDate) {
				return "paidInTime";
			}

			// was the invoicepaid after dueDate but before summation date?
			var summationDate = new Date (dueDate.getTime() + (1000 * 60 * 60 * 24) * 14);				
			if (paymentDate <= summationDate) {
				return "paidAfterReminder";
					
			}

			// was the invoice paid after summation but before collection ?
			var collectionDate = new Date (dueDate.getTime() + (1000 * 60 * 60 * 24) * 28);			
			if (paymentDate <= collectionDate) {
				return "paidAfterSummation";
			}

		},

		lastPaymentDate: function () {

			var paymentDate; 

			if (!this.payments)
				return;

			for (var i = 0; i < this.payments.models.length; i++ ) {
				var payment = this.payments.models[i],
					_paymentDate = payment.get( "payment_date" );

				if (!paymentDate) {
					paymentDate = _paymentDate;
				} else {
					if (_paymentDate > paymentDate)
						paymentDate = _paymentDate;
				}
			}			

			return paymentDate;
		},

		isQuote: function () {

			var type = this.attributes.type;
			if (type === "quote" || status === "quote")
				return true;

		},

		isNoAutocycle: function () {
			return (this.attributes.type === "noautocycle");
		},

		isAccepted: function () {

			if (!this.get( "isQuote" ))
				return;

			if (this.attributes.accepted === "1")
				return true;

		},

		deleted: function () {

			if (this.attributes.deleted === "1")
				return true;
		},

		hasActions: function () {

			if (this.get( "canSendCreditInvoice" ))
				return true;

			if(this.get( "canSendInvoiceFromQuote" ))
				return true;

			if (this.get( "canBookPayment" ))
				return true;

			if (this.get( "canResendInvoice" ))
				return true;

			if (this.get( "canRedeemInvoice" ))
				return true;

			if (this.get( "canPauseInvoice" ))
				return true;

			if (this.get( "canUnpauseInvoice" ))
				return true;

			if (this.get( "canArchiveInvoice" ))
				return true;

			if (this.get( "canDeleteInvoice" ))
				return true;

		}

	},		

	initialize: function (attributes) {					
										
										attributes = attributes || {};

										var self = this;

										// create a collection for the invoicelines;
										this.invoiceLines = new myAPP.collections.InvoiceLines();
										this.invoiceLines.invoice_id = this.get( "id" ) || this.cid;

										// if this is a new model (i.e., not loaded from server), initialize with correct values;
										if (this.isNew()) {
											this.onNewInvoice(attributes)											
										}


										
										// listen to changes on the invoiceLines collection										
										this.listenTo( this.invoiceLines, 'change add remove', function (model, value, options) {																	
											self.calculateComputedValues();											
										});										

										
										// if the status of this invoice is approved, start polling 
										if (attributes.status === "approved" ) {											
											if ( new Date() > myAPP.modelHelpers.parseDate(attributes.date)) {		
												this.pollUntilSent();
											}
										}

										// set and fire change handler, which functions as a computed value manager;
										this.calculateComputedValues();										

	}, 

	onNewInvoice: function (attributes) {
										var defaultContent, defaultTemplate

										// invoielines can be considered fetched on a new model
										this._hasInvoiceLinesFetched = true;
										
										// if the invoice is not a creditInvoice and no content was passed to the construcetor, 
										// set default content.
										defaultContent = myAPP.accountSettings && myAPP.accountSettings.get( "default_invoice_content" );
										if (!attributes.parent_credit_id && !attributes.content) {
											this.attributes.content = defaultContent;
										}

										// see if we should set a default template
										defaultTemplate = myAPP.accountSettings && myAPP.accountSettings.get("default_invoice_template");
										if (myAPP.templates.get(defaultTemplate)) {
											this.attributes.invoice_template_id = defaultTemplate;
										} else {
											console.warn('default template does not exist!');
										}

										// // if the invoice doesn't have a date, set today as the date;
										if (!attributes.date)
											this.set("date", new Date());

										// automatic reminders, summations?										
										if (myAPP.accountSettings.get("no_automatic_reminders"))
											this.attributes.no_automatic_reminder = 1; 
										if (myAPP.accountSettings.get("no_automatic_summations"))
											this.attributes.no_automatic_summation = 1;
	},


	// ## relations to other models;

	addCreditInvoice: function (creditInvoice) {

										if (!this.creditInvoices)
											this.creditInvoices = new myAPP.collections.Invoices();
										
										if (Number(creditInvoice.get("parent_credit_id")) !== Number(this.get( "id" )) ) {
											console.warn("*** WARN: Adding creditinvoice with parent_credit_id  different from parent's invoice id");
										}

										this.creditInvoices.add( creditInvoice );
	},

	addPayment: function (payment) {

										if (!this.payments)
											this.payments = new myAPP.collections.Payments();

										this.payments.add( payment );
	},

	// ### addDebtor(<span class="parameter">debtor</span>)
	// adds the debtor to the invoice
	// <span class="small">accepts</span><span class="type">{ Debtor }</span><code></code>

	addDebtor: function (debtor) {

										this.debtor = debtor;
										var id = debtor.get( "id" ) || debtor.cid;
										this.set({ account_debtor_id: id });

	},

	// ### removeDebtor	()
	// removes the debtor attached to this invoice	

	removeDebtor: function () {
										this.debtor = null;
										this.set({ account_debtor_id: null });
	},

	// ### fetchInvoiceLiens	(<span class="parameter">options</span>)
	// fetches the invoiceLines for this invoice;
	// <span class="small">accepts</span><code></code>

	fetchInvoiceLines: function (options) { 
										var self = this;

										if (this.isNew()) {
											console.log("is new; exiting fetchInvoiceLines");
											this._hasInvoiceLinesFetched = true;
											if (options && options.success) {
												options.success();
											}	
											return;
										}										

										if (this._hasInvoiceLinesFetched) {		
											console.log("invoicelines already fetched");									
											if (options && options.success) {
												options.success();
											}
											return;
										}									

										this.invoiceLines.fetch({ 
											success: function () {
												console.log("invoicelines fetched");									 
												self._hasInvoiceLinesFetched = true;
												if (options && options.success) {
													options.success();
												}
											},
											error: function () {
												//myAPP.trigger('toast', 'Fout bij ophalen factuurregels', 'error');											
												if (options && options.error)	{
													options.error();
												}																					
											}
										});

										return;
	},

	saveInvoiceLines: function (options) { 
										// var self = this;
										// var savedLines = 0;
										
										this.invoiceLines.save({
											success: options && options.success,
											error: function (model, xhr) {																					
												myAPP.trigger('toast', 'Opslaan factuurregel mislukt', 'error');
												if (options && options.error) {
													options.error(model, xhr, "invoiceLines");
												}
											}
										});

										// for (var i = 0; i < this.invoiceLines.models.length; i++) {
										//	var invoiceLine = this.invoiceLines.models[i];
										//	invoiceLine.save({}, {
										//		success: function () {
										//		savedLines++;													
										//		if (savedLines === self.invoiceLines.length) {														
										//				if (options && options.success) {
										//					options.success();
										//				}
										//			}
										//		},
											
										//	});
										// }
	},

	// ## Methods
	
	calculateComputedValues: function () {									
																																							
										for (var i = 0; i < this.computedValues.length; i++) {
											var key = this.computedValues[i];
											this.set(key, this.get(key));
										}

	},

	toPeriodical: function () {

										var _periodical = new myAPP.models.Periodical( this.toJSON() );
										_periodical.invoice = this;

										// store the invoice_id, if we need to modify this periodical we can't use the periodical object
										_periodical.set({ temp_invoice_id: this.get( "id" ) });

										return _periodical;
	},

	toCreditInvoice: function () {

										var creditInvoice = new myAPP.models.Invoice({ 
											parent_credit_id: this.get( "id" ), 
											payment_term: 0,
											delivery_method: this.get( "delivery_method" ),
											type: 'credit'											
										});
										creditInvoice.addDebtor( this.debtor );

										// create credit invoiceLines; simply copy the invoiceLines and negate amount;
										this.invoiceLines.each(function(invoiceLine) {											
											var _creditInvoiceLine = new myAPP.models.InvoiceLine( invoiceLine.toJSON() );
											_creditInvoiceLine.set({
												// overwrite ID property or backbone won't add to collection;
												id: null,
												invoice_id: creditInvoice.cid,
												amount: invoiceLine.get( "amount" ) * -1
											});
											
											creditInvoice.invoiceLines.add( _creditInvoiceLine );
										});	

										return creditInvoice;

	},

	//	
	//	approve consists of saving the invoice, then "sending" the invoice;

	approve: function (options) {		

										var self = this;

										// set status to ready; if status === "reminder", don't set to ready;
										if (this.attributes.status !== "reminder")
											this.set({ status: "ready" });

										// save the invoice before approving;
										this.save({}, {
											success: function () {

												self.send(options);	

											},
											error: function (model, xhr, fail) {												
												if (options && options.error) options.error(model, xhr, fail);
											}
										});

																				
	},

	send: function (options) {
										var url =  this.url() + "/send",
											self = this;

										// make an empty ajax call to /send, to send the invoice;
										jQuery.ajax({
											url: url,
											type: "POST",
											dataType: "json",
											data: null,
											success: function (data, textStatus, jqXHR) {
												self.onSendSuccess( data, textStatus, jqXHR );
												if (options && options.success) {
													options.success();
												}
												
											},
											error: function (jqXHR, textStatus, errorThrown) { 
												var fail;												
												if (jqXHR.responseText.match(/Missing\saccount\sinfo/))
													fail = "incompleteAccount"
													//alert("We kunnen deze factuur niet versturen, omdat je account-gegevens niet volledig zijn");
												else {			
													fail = "unknown";												
													//alert("We konden de factuur niet opslaan. Neem alstublieft contact op met info@kascooperatie.nl. Dit is de foutmelding: " + jqXHR.responseText);
												}
												
												if (options && options.error) {
													options.error(self, jqXHR, fail);
												}
											}
										});

	},

	pause: function (options) {
										var url = this.url() + "/pause",
											self = this;

										jQuery.ajax({
											url: url,
											type: "POST",
											dataType: "json",
											data: null,
											success: function (data, textStatus, jqXHR) {
												self.trigger("sync");
												self.set(data.invoice.Invoice);
												if (options && options.success) options.success();
											},
											error: options && options.error
										});

	},

	unpause: function (options) {
										
										var url = this.url() + "/unpause",
											self = this;

										jQuery.ajax({
											url: url,
											type: "POST",
											dataType: "json",
											data: null,
											success: function (data, textStatus, jqXHR) {
												self.trigger("sync");
												self.set(data.invoice.Invoice);
												if (options && options.success) options.success();
											},
											error: options && options.error
										});

	},

	save: function (attributes, options) {
										var self = this;											

										Backbone.Model.prototype.save.call(this, attributes, {
											success: function () {	
												
												if (self.get( "status" ) === "draft" || self.get( "status" ) === "ready" || self.get( "status") === "reminder") {
													self.onSaveSuccess( options );
												} else {												
													if (options && options.success)
														options.success();
												}

											},
											error: function (model, xhr) {
												//myAPP.trigger('toast', 'opslaan factuur mislukt', 'error')
												if (options && options.error) {
													options.error(model, xhr, "invoice");
												}
											},
											patch: options && options.patch
										});

	},

	redeem: function (options) {

										var self = this;

										if (!this.get( "canRedeemInvoice" ))
											return;

										var url = this.url() + "/redeem";

										jQuery.ajax({
											url: url,
											type: "POST",
											dataType: "json",
											data: null,
											success: function (data, textStatus, jqXHR) {
												self.trigger( "sync" );
												self.set( data.invoice.Invoice );
												if (options && options.success) {
													options.success();
												}
											},
											error: options && options.error
										});
	},

	archive: function (options) {

										var self = this;

										if (!this.get( "canArchiveInvoice" ))
											return;

										this.save({ archived: 1 }, { 
											success: function () { 
												self.onArchiveSuccess();

												// archive creditInvoices if necessary;
												if (self.get( "hasCreditInvoices" )) {
													self.archiveCreditInvoices(options);
													return;
												}
												
												if (options && options.success)
													options.success();
											},
											error: function () {
												if (options && options.error)
													options.error();
											},
											patch: true 
										});
	},

	resend: function (options) {

										var self = this;

										if (!this.get( "canResendInvoice" ))
											return;

										var url = this.url() + "/resend";

										jQuery.ajax({
											url: url,
											type: "POST",
											dataType: "json",
											data: null,
											success: function (data, textStatus, jqXHR) {
												self.trigger( "sync" );												
												if (options && options.success) {
													options.success();
												}
											},
											error: options && options.error
										});
	},

	startCycle: function (options) {


										var self = this;

										var url = this.url() + "/startcycle";




										jQuery.ajax({
											url: url,
											type: "POST",
											dataType: "json",
											data: null,
											success: function (data, textStatus, jqXHR) {

												if (data) {
													self.set( data.invoice );
													self.trigger( "update" );
												}
												if (options && options.success) {
													options.success();
												}
											},
											error: options && options.error
										});
	},

	sendReminder: function (options) {

										var self = this;

										if (!this.get( "canSendReminder" ))
											return;

										this.save({ no_automatic_reminder: 0 }, { 	
											success: function () {											
												if (options && options.success)
													options.success();
											},
											error: function () {
												if (options && options.error)
													options.error();
											},
											patch: true 
										});
	},

	sendSummation: function (options) {

										var self = this;

										if (!this.get( "canSendSummation" ))
											return;

										this.save({ no_automatic_summation: 0 }, { 
											success: function () { 											
												if (options && options.success)
													options.success();
											},
											error: function () {
												if (options && options.error)
													options.error();
											},
											patch: true 
										});
	},			

	archiveCreditInvoices: function (options) {

										var self = this,
											creditInvoice,
											i,
											archivedCreditInvoices = 0;
											totalCreditInvoices = this.creditInvoices.models.length;

										for (i = 0; i < totalCreditInvoices; i++) {
											creditInvoice = this.creditInvoices.models[i];
											creditInvoice.archive({
												success: function () {
													console.log("Credit invoice archived, we're at: ", archivedCreditInvoices, " of ", totalCreditInvoices);
													archivedCreditInvoices++;
													if (archivedCreditInvoices === totalCreditInvoices) {
														console.log("Done, all credit invoices archived.");
														if (options && options.success) {
															options.success();
														}
													}
												}
											})
										}

	},

	// ## Callbacks;

	onSaveSuccess: function  (options) {

									// add to collection and update invoicelines id;	
									// NB Backbone won't re-add an invoice already in the collection;									 
									myAPP.invoices.add( this );																																					
									this.invoiceLines.invoice_id = this.get( "id" );	
									console.log('the invoice id is now: ' + this.get("id"))								

									// if invoice is a creditInvoice, add to parent invoice;
									if (this.get( "isCreditInvoice" )) {
										
										var parentInvoice = myAPP.invoices.findWhere({ id: this.get( "parent_credit_id" ) });
										if (!parentInvoice)
											throw "Could not find parent invoice";
										parentInvoice.addCreditInvoice( this );
										
									}

									// add to debtor's invoices collection
									this.debtor.addInvoice( this );
																				
									// save invoiceLines
									this.saveInvoiceLines( options );

	},

	onSendSuccess: function (data) {

									// *************************************
									//
									//      the invoice was succesfully sent. perform whatever additional logic is required 
									//
									// *************************************

									// refresh the invoice with data from the server
									// @@unclear when is this necessary?
									if (data.invoice && data.invoice.Invoice) {
										this.set(data.invoice.Invoice);		
									}

									// if the invoice approved has a period, convert to periodical and move it over to the periodical collection;
									if (this.get( "isPeriodical" )) {															
										myAPP.invoices.remove( this );
										var _periodical = this.toPeriodical();
										myAPP.periodicals.add( _periodical );		

										_periodical.trigger( 'update' );

										if (_periodical.get( "startDate" ) < new Date() ) {

											_periodical.pollUntilSent();
											_periodical.set({ isSending: true });
										}	
													
										return;
									} 

									// if the invoice has a parent_credit_id, add it to the parent's credit invoices collection;
									if (this.get( "isCreditInvoice" )) {															

										var parentCreditInvoice = myAPP.invoices.findWhere({ id: this.get( "parent_credit_id" ) });
										if (parentCreditInvoice) {
											parentCreditInvoice.addCreditInvoice( this );
										} else {
											console.warn("*** Could not find parentCreditInvoice of invoice after approving");
										}
									}

									// fetch account settings so we have the correct invoice_number_next
									// maybe a bit superfluous, as we know it's just +1 from last value?
									myAPP.accountSettings.fetch({
										success: function () { console.log("successfully syned account settings"); },
										error: function () { console.error("Error syncing account settings"); }
									});

									// fetch balances														
									myAPP.balances.fetch({
										success: function () { console.log("successfully synced account balances"); },
										error: function () { console.error("Error syncing account balances "); }
									});
									
									// check if we need to update other invoices;

									if (this.get( "isCreditInvoice" )) {
										console.log("creditInvoice sent, fetching parent;");
										var parentInvoice = myAPP.invoices.findWhere({ id: this.get( "parent_credit_id" ) });
										parentInvoice.update();															
									}
									
									this.trigger('update');

	},

	onArchiveSuccess: function () {

									myAPP.invoices.remove ( this );
									this.trigger('destroy', this);
									
	},

	update: function () {

		var self = this;

		this.fetch({
			success: function () {
				self.trigger('update');
			},
			error: function () {
				alert("error updating invoice: ", self.get( "id" ));
			}
		});

	},
	
})

.setChangedValues()

.setGettersSetters() 

.validates();





//------------------------------------



myAPP.models.InvoiceLine = Backbone.Model.extend({	

	namespace: "invoice_line",

	defaults: {		
		amount: 0, 
		article_number: "",
		title: "",
		description: "",
		price: 0,		
		vat: 0,				
		total: 0,
		vat_total: 0	
	},

	computedValues: [
		'vat_total', 'total', 'total_exc_vat' 
	],

	setters: { 
		amount: function (value) {			
			return myAPP.modelHelpers.parseAmount(value);
		},
		vat: function (value) {
			return parseFloat(value, 10);
		},
		price: function (value) {
			return myAPP.modelHelpers.parseAmount(value);
		}

	},

	getters: {
		vat: function (value) {
			return value + "%";
		},

		vat_total: function () { 
			var vat_total = ((
				Number(this.attributes.price) * 
				Number(this.attributes.amount) *
				Number(this.attributes.vat)
				) / 100); 
			return Number(vat_total);		
		},
		total: function () {
			var total = ((
				Number(this.attributes.price) * 
				Number(this.attributes.amount) *
				Number(this.attributes.vat + 100)
				) / 100); 
			return Number(total);
		},
		total_exc_vat: function () {
			var total_exc_vat = (
				Number( this.attributes.price ) * 
				Number( this.attributes.amount ));
			return Number(total_exc_vat)
		}
	},

	calculateComputedValues: function () {

		var self = this;

		_.each(this.computedValues, function (key) {			
			self.set( key, self.get( key ) )
		});

	},

	initialize: function () {

		this.listenTo(this, 'change', this.calculateComputedValues)
		this.calculateComputedValues();
		
	},

	/*
	 *		isEmpty
	 *		function that determines if an invoice line can be considered 'empty';
	 *		we compare the current values of the model to the defaults.
	 *		
	 */

	isEmpty: function (){
		var fields = ['amount',  'article_number', 'title', 'description', 'price'],
			i;		
		
		for (i = 0; i < fields.length; i++)	{	
			if (this.defaults[fields[i]] !== this.attributes[fields[i]]) {
				return;
			}
		}

		return true;
	}

})	.setChangedValues() .setGettersSetters()



//------------------------------------



myAPP.models.Notification = Backbone.Model.extend({

initialize: function (attributes) {

				if (!attributes.date)
					this.set({ date: new Date("1970-01-01") })
},

getters: {
	// date: function () { 
	// 	var date = this.attributes.date;
	// 	return date.getDate() + " " + myAPP.templateHelpers.month(date.getMonth());
	// }

}

// setters: {
// 	date: function (value) {
// 		//if (!(value instanceof Date))
			
// 		return value;
// 	}
// }


	
}) . setGettersSetters();



//------------------------------------



myAPP.models.Objection = Backbone.Model.extend({

	urlRoot: function () {
		return "accounts/" + myAPP.currentAccount.get("id") + "/objections/"
	}, 

	namespace: "objection",

	defaults: {
		debtorName: "",
		created: null,
		fileUrl: ""
	},
	

	getters: {		 

		created: function () {		
			return myAPP.modelHelpers.parseDate(this.attributes.created);

		},

		fileUrl: function () { 
			if (this.attributes.file)
				return myAPP.apiUrl + "/accounts/" + myAPP.currentAccount.get("id") + "/objections/" + this.get("id") + "/file?auth=" + myAPP.session.authorizationString;
		},

		modified: function () {
				var modified = this.attributes.modified
				return myAPP.modelHelpers.parseDate(modified);
		},


		
	},

	setters: {	

		
	}

	


	
}) .setGettersSetters() .setChangedValues();



//------------------------------------



myAPP.models.Payment = Backbone.Model.extend({

	urlRoot: function () {
		return "accounts/" + myAPP.currentAccount.get("id") + "/payments/";
	}, 

	namespace: "Payment",

	defaults: {

		invoice_number: null,		
		payment_date:  "",		
		created: "",
		type: "Transfer"

	},

	validation: {

		amount: function (value) {
			if (!value || value < 0.01)
				return { errorMessage: "Minimale bedrag is € 0,01" };
		},
		invoice_id: {
			required: true
		},
		payment_date: {
			isValidJavascriptDate: true
		}
	},

	getters:  {
		payment_date: function () {		
			var date = this.attributes.payment_date;			

			if (!date || !date.match || date.match(/0000-00-00/)) {
				date = this.attributes.modified;
			}
			
			return myAPP.modelHelpers.parseDate( date );

		},

		type: function () {

			var type = this.attributes.type,
				text = myAPP.texts.paymentTypes[type];

			if (text)
				return text;

			return this.attributes.type;
		},
		
		modified: function () {
			// @todo
			// What is this bug? 
			if (this.attributes.modified instanceof Date)
				return this.attributes.modified;
			
			var match = this.attributes.modified.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})\:(\d{2})\:(\d{2})/);
			if (match) {
				return new Date(match[1], Number(match[2]) - 1, match[3], match[4], match[5], match[6]);
			}	
		}	

	},

	setters: {

		payment_date: function (value) {		
			return myAPP.modelHelpers.parseToServerDate(value);
			
		},

		amount: function (value) {
			return myAPP.modelHelpers.parseAmount(value);
		}
	},

	addInvoice: function (invoice) {
		
		var debtor;		

		this.set({ 
			account_debtor_id: invoice.get( "account_debtor_id" ),
			invoice_id: invoice.get( "id" ),	
			amount: invoice.get("total_inc_vat") + invoice.get("extra_costs") - Math.abs(invoice.get("creditInvoicesTotal")) - invoice.get("paymentsTotal")
		});

		debtor = myAPP.debtors.get( invoice.get( "account_debtor_id"));

		this.debtor = debtor;
		this.invoice = invoice;		

	}

}) .setGettersSetters() .validates() .setChangedValues();



//------------------------------------



myAPP.models.PaymentPlan = Backbone.Model.extend({

	urlRoot: function () {
		return "accounts/" + myAPP.currentAccount.get("id") + "/payment_plans/"
	}, 

	namespace: "payment_plan",

	defaults: {
		debtorName: "",
		created: null,
		invoiceNumber: null,
		invoiceTotal: null,
		termAmount: null
	},
	

	getters: {

		created: function () {		
			return myAPP.modelHelpers.parseDate(this.attributes.created);

		},

		invoiceNumber: function () { 
			var invoice = myAPP.invoices.findWhere({ id: String(this.attributes.invoice_id) });
			return invoice.get("invoice_number")
		},

		invoiceTotal: function () { 
			var invoice = myAPP.invoices.findWhere({ id: String(this.attributes.invoice_id) });
			return invoice.get("total_inc_vat")
		},

		termAmount: function () { 
			var invoice = myAPP.invoices.findWhere({ id: String(this.attributes.invoice_id) });
			return ( invoice.get("total_inc_vat") / this.attributes.terms)
		}
		
	},

	setters: {	

		
	}

	


	
}) .setGettersSetters() .setChangedValues();



//------------------------------------



/**
 * A periodical object holds information for a periodical, an {@link Invoice} that is sent with a certain frequency;
 * @class  Periodical
 * 
 */

myAPP.models.Periodical = Backbone.Model.extend({

	urlRoot: function () {
		return "accounts/" + myAPP.currentAccount.get("id") + "/periodicals/"
	},

	namespace: "periodical",

	defaults: {
		total_inc_vat: null,
		debtorName: null,
		children: null, 
		startDate: null
		
	},

	getters: {

		created: function () {		
			var date = this.attributes.created;
			if (typeof date !== "string") {
				console.warn("*** WARN: date on periodical object is not a string: ", date);
				return;
			}
			var match = date.match(/(\d{4})-(\d{2})-(\d{2}).*/)
			
			if (!match) {
				console.warn("*** WARN: wrong date format on periodical object: ", date)
				return;
			}
			
			// months are numbered 0 - 11 in javascript Date class
			return new Date(match[1], Number(match[2]) - 1, match[3])

		},

		startDate: function () {
			var _startDate;
			if (this.attributes.date)
				_startDate = this.attributes.date;
			else if (this.invoice)
				_startDate = this.invoice.attributes.date;

			return myAPP.modelHelpers.parseDate(_startDate)

		},

		total_inc_vat: function () {			
			return this.invoice.get("total_inc_vat")
		},

		period: function () {
			var _period = this.attributes.period;

			if (!_period)
				return;

			return _period.replace(/(day|week|month|year)/, function (match, attr1) {
				
				switch (attr1) {
					case "day": return "dagen";
					case "week": return "weken";
					case "month": return "maanden";
					case "year": return "jaar";
				}
			})			
		},

		children: function () {
			
			return this.childInvoices.length; 
		}


	},

	initialize: function (attributes) {

									var self = this;	
												
									if (attributes && attributes.invoice) {										
										this.invoice = new myAPP.models.Invoice( attributes.invoice );											
										
										this.set({ account_debtor_id: this.invoice.get( "account_debtor_id" ) })																		

										// // grab invoiceLines from collection;
										// var id = this.invoice.get( "id" )
										// for (var i = 0; i < myAPP.invoiceLines.models.length; i++) {
										// 	var invoiceLine = myAPP.invoiceLines.models[i];
										// 	var invoice_id = invoiceLine.attributes.invoice_id;

										// 	if (invoice_id === id )
										// 		this.invoice.invoiceLines.add( invoiceLine )
										// }
										// 
										
										// this.invoice.invoiceLines.fetch();
									
									} else {
										// create empty new invoice;
										this.invoice = new myAPP.models.Invoice();

									}

									// create a childInvoices collection;
									this.childInvoices = new myAPP.collections.Invoices();

									// overwrite url function
									this.childInvoices.url = function () {

										return "accounts/" + myAPP.currentAccount.get("id") + "/periodicals/" + self.get("id") + "/invoices";
									}																		

	},

	stop: function (options) {			

		var self = this;

		// because of the strange way the server treats periodical objects, we need to pull this trick to stop periodicals that haven't lead to a periodical object yet.

		if (this.get("temp_invoice_id")) {			

			var model = new myAPP.models.Invoice({ id: this.get( "temp_invoice_id" ), status: "periodical" })
			Backbone.Model.prototype.save.call(model, { deleted: 1}, {
				patch: true,
				success: function () { 
					myAPP.periodicals.remove( self );
					if (options && options.success)  {
						options.success();
					}
				},
				error: function () {
					if (options && options.error)
						options.error();
				}

			});
			return

		} 

		this.save({ period: "stop" }, {
			success: function () { 
				myAPP.periodicals.remove( self );
				if (options && options.success)  {
					options.success();
				}
			},
			error: function () {
				if (options && options.error)
					options.error();
			}
		})

	},

	pollUntilSent: function () {

		// weird method to poll if periodical child has been sent: we poll the children collection.

		var timesPolled = 0	

		var self = this;
		var length = myAPP.periodicalChildren && myAPP.periodicalChildren.length;

		var poll = function () {

			myAPP.periodicalChildren.fetch({
				success: function() {

					timesPolled++;

					var _length = myAPP.periodicalChildren.length;

					if ( _length > length ) {
						
						// a new invoice has been created.					
						
						var invoice = myAPP.periodicalChildren.at( myAPP.periodicalChildren.length - 1)						
						
						invoice.invoiceLines = self.invoice.invoiceLines;
						
						// *** Superfluous?
						// invoice.invoiceLines.url = function () { return "accounts/" + myAPP.currentAccount.get("id") + "/invoices/" + invoice.get("id") + "/lines"; }
						// invoice.invoiceLines.fetch()


						myAPP.invoices.add ( invoice );

						// we now manually set the periodicalId, because on the server, the periodical object has only just 
						// now been created. We get the Id from the childinvoice
						var periodicalId = invoice.get( "periodical_id" );
						
						// update our periodical object.
						self.set({ id: periodicalId, isSending: false })
						self.childInvoices.add( invoice )
						self.trigger( 'update' )

						// fetch account settings so we have the correct invoice_number_next
						// maybe a bit superfluous, as we know it's just +1 from last value?
						myAPP.accountSettings.fetch({
							success: function () { console.log("successfully syned account settings")},
							error: function () { console.error("Error syncing account settings")}
						});

						// fetch current account  so we have the correct number of invoices sent
						// maybe a bit superfluous, as we know it's just +1 from last value?
						myAPP.currentAccount.fetch({
							success: function () { console.log("successfully synced current account")},
							error: function () { console.error("Error syncing current account ")}
						});

					} else {
						if (timesPolled < myAPP.constants.maxTimesPolled)
							setTimeout(poll, 10000)
					}

					console.log("polled and nr. children: ", length, _length)
				},
				error: function () { 
					alert("Onverwachte fout bij ophalen kindfacturen van periodiek. Neem contact op met info@kascooperatie.nl")
				}
			});

		}

		setTimeout(poll, 10000)

	}

}) .setGettersSetters()



//------------------------------------



myAPP.models.Session = Backbone.Model.extend({

	initialize: function() {		
					var self = this;					
					this.on("error", function() { self.set({isActive: false})})					
					this.userId = null;
					this.authorization = true;

					// set basic ajaxFilter for correct routing of API calls;
					jQuery.ajaxPrefilter(function(options, originalOptions, jqXHR) {
						if (!(options.url.match(/http/) ))						
							options.url = myAPP.apiUrl + options.url;					
					})
	},

	fetchUser: function (parameters, options) {
					
					this.setAuthorization( parameters.username, parameters.password )

					// try to fetch a user; create a vanilla model for that;
					myAPP.currentUser = new myAPP.models.User();	
					myAPP.currentUser.namespace = "user";
					myAPP.currentUser.urlRoot = "users/whoami";

					myAPP.currentUser.fetch({
						
						success: function(data) {		

								// set the id attribute;
								// ????
								myAPP.currentUser.id = myAPP.currentUser.get( "id" )	
								if (options && options.success) {
									options.success()
								}
								
						},

						// unsuccessful in fetching a user with the authorization string set;
						error: function(model, response) {					
	
							if (options && options.error) {
								options.error();	
							}
						}

					});

					// now overwrite urlRoot on currentUser so it points to the correct location for CRUD-ing the model;
					myAPP.currentUser.urlRoot = "users/";
	},

	setAuthorization: function (username, password) {
					var self = this;

					// base64 the credentials
					// from: http://stackoverflow.com/questions/5507234/how-to-use-basic-auth-and-jquery-and-ajax	
					this.authorizationString = myAPP.base64( username, password )
					
					// set an Authorization header for ajax requests
					jQuery.ajaxPrefilter(function(options, originalOptions, jqXHR) {												
						jqXHR.setRequestHeader('Authorization', "Basic " + self.authorizationString)												
					})	

	},

	updateAuthorization: function (username, password) {

					this.authorizationString = myAPP.base64 (username, password )
	},

	fetchAccounts: function ( options ) {			
					var self = this;

					myAPP.accounts = new myAPP.collections.Accounts();
					 
					switch (myAPP.getUserRole())  {

						case "superadmin":		myAPP.accounts.fetch({ 
													success: function () {
														if (myAPP.accounts.length > 1)
															self.set({ hasMultipleAccounts: true })
														if (options && options.success)  {
															options.success()
														}
													},
													error: function () { 
														if (options && options.error) {
															options.error();
														}
													}
												})
												break;

						default:				if (!myAPP.currentUser)
													throw "No currentUser set; session cannot fetch accounts";

												myAPP.accounts.add( myAPP.currentUser.get("account") )
												if (myAPP.accounts.length > 1) {													
													this.set({ hasMultipleAccounts: true })
												}
												if (myAPP.accounts.length === 0) {						
													//console.warn("*** WARN: This user doesn't appear to be assigned to any account: " + myAPP.currentUser);									
													throw "User not assigned to any account"
												}

												if (options && options.success) {
													options.success();
												}
												break;

					}														

	},

	loginAsSuperAdmin: function () {	
					myAPP.currentAccount = myAPP.accounts.findWhere({ id: myAPP.superAdminAccountId })
					this.set({ isActive: true, isSuperAdmin: true })

	},

	loginAsGuest: function () {
					myAPP.currentAccount = new myAPP.models.Account({ id: myAPP.guestUserAccountId, title: "Testaccount", vat_liable: "1" });
					myAPP.currentUser =  new myAPP.models.User({ name: "Testgebruiker Bob", user_id: "123", id: "123", role: "employee" });		
					this.setAuthorization( myAPP.guestUserEmail, myAPP.guestUserPassword )
					this.set({ isActive: true, isGuestUser: true })
	},

	login: function ( account ) {
					var self = this;

					if (!account) {						
						myAPP.currentAccount =  myAPP.accounts.at(0);						
					} else {
						myAPP.currentAccount = account;											
					}

					myAPP.currentAccount.fetch({					
						success: function (model, response) {
							self.set({ isActive: true })		
						},
						error: function () {
							alert("*** CRITICAL ERROR: we could not fetch your account!")								
						}
					})	

	},

	logout: function() {
					
					this.set({ isActive: null, isSuperAdmin: null, hasMultipleAccounts: null, isGuestUser: null })

					// unset authorization string;
					this.authorizationString = null;
					
					// unset currentAccount
					myAPP.currentAccount = null;
					
					// unset currentUser
					myAPP.currentUser = null;

					// clear accounts;
					myAPP.accounts = null;

					
	}
	
});       

 




//------------------------------------



myAPP.models.Template = Backbone.Model.extend({

	urlRoot: function () {
		return "accounts/" + myAPP.currentAccount.get("id") + "/templates/"
	}, 

	defaults: {
		// articleGroupName: "",
		// //article_group_id: "0",
		// // ### lasdkfjaslkfjaslfkj
		// title: "Nieuw artikel",
		// description: "",
		// article_number: "",
		// vat: "21",
		// price: 0
	},

	// # getters

	getters: {

		// // #### articleGroupName
		// articleGroupName: function () {
		//	var articleGroup = myAPP.articleGroups.findWhere({id: this.get("article_group_id")})			
		//	return articleGroup && articleGroup.get("title")
		// },

		// // #### vat
		// vat: function () {
		//	return this.attributes.vat + "%"
		// },

	},

	setters: {
		

		
	}
	
})



//------------------------------------



myAPP.models.User = Backbone.Model.extend({

	urlRoot: function () { 
		return "accounts/" + myAPP.currentAccount.get("id") + "/users/"
	},

	namespace: "user",

	idAttribute: "user_id",
	
	defaults: {

		email: "",
		role: "admin",
		salutation: "Mr.",
		isCurrentUser: null
	},

	validation: {
		name: { 
			required: true,
			minLength: 3,
			maxLength: 30
		},
		email: {
			required: true,
			isValidEmail: true
		}
	},

	getters: {

		last_login: function () {
			return myAPP.modelHelpers.parseDate(this.attributes.last_login);
		},

		isCurrentUser: function () {
			if (myAPP.currentUser) {
				return this.get( "user_id" ) === myAPP.currentUser.get( "id" )
			}
		}

	},

	setters: { 

		last_login: function (value) { 			
			return value;
		}

	}

}) .setChangedValues() .validates() .setGettersSetters();



//------------------------------------



myAPP.Router = Backbone.Router.extend({	

		routes: {
			"": 'home',
			"import": '_import',

			// off session
			"aanmelden": "signup",
			"password": "password",

			// on session
			"dashboard": "dashboard",			
			"facturen(/:section)(/:id)(/:extra)": "facturen",
			"debiteuren(/:section)(/:id)(/:info)": 'debiteuren',
			"betalingen(/:id)": "betalingen",
			"artikelen(/:group)(/:id)": "artikelen",			
			"account(/:section)(/:id)": "account",

			// super admin

			"_accounts(/:id)(/:kosten)(/:kosten_id)(/:factuur)": "accounts",
			
			// default route
			// see http://stackoverflow.com/questions/6088073/default-routes-in-a-backbone-js-controller
			"*path": 'defaultRoute'
		},

		initialize: function () {

		},		

		home:       function () {						
						myAPP.appView.render();			
		},

		_import: function () {				
						myAPP.appView.render();
		},

		password: function () { 
						
						myAPP.appView.render();
		},

		signup:	function () { 
						if (!myAPP.session.get('isActive')) {
							myAPP.appView.render();
						}

		},		
		
		defaultRoute:	function() {
						// navigates back to home; 
						
						myAPP.router.navigate("", {trigger: true});
		},

		dashboard: function () { 
						if (!myAPP.session.get('isActive')) {
							myAPP.router.navigate("", {trigger: true})
							return;
						}

						myAPP.appView.render()
		},

		facturen: function (parameter) {
						
						if (!myAPP.session.get('isActive')) {
							myAPP.router.navigate("", {trigger: true})
							return;
						}

						if (!parameter) {
							myAPP.router.navigate("facturen/facturen", { trigger: true })
							return;
						}

						

						myAPP.appView.render() 
						
		},

		account: function(parameter) {
						if (!myAPP.session.get('isActive')) {
							myAPP.router.navigate("", {trigger: true})
							return;
						}

						// auto-route to first subsection of view						
						if (!parameter) {
							myAPP.router.navigate("account/instellingen", { trigger: true });
							return;
						}				
										
						myAPP.appView.render()
						
		},

		debiteuren: function (parameter) {
						
						if (!myAPP.session.get('isActive')) {
							myAPP.router.navigate("", {trigger: true})
							return;
						}

						if (!parameter) {
							myAPP.router.navigate("debiteuren/debiteuren", {trigger: true})
							return
						}

						myAPP.appView.render();
		},

		betalingen: function () {			
						if (!myAPP.session.get('isActive')) {
							myAPP.router.navigate("", { trigger: true })
							return;
						}

						myAPP.appView.render() 

		},

		artikelen: function () { 
						if (!myAPP.session.get("isActive")) {
							myAPP.router.navigate("", { trigger: true })
							return;
						}

						myAPP.appView.render();
		},

		// superAdmin routes

		accounts: function () {
						
						if (!myAPP.session.get( "isActive") || !myAPP.session.get ("isSuperAdmin") ) {
							myAPP.router.navigate("", { trigger: true })
							return;
						}
											
						myAPP.appView.render();

		},
		
		 
		// ## other functions;
		// 

		appendHash: function ( parameter) {

						var currentHash = Backbone.history.getFragment();						
						this.navigate( currentHash + "/" + parameter )
		}

});	






//------------------------------------



$(function() {	


	myAPP.start();
	
})



//------------------------------------






var Tutorial = (function () { 

	var Tutorial = function ( tutorial ) {

		// copy the array, in case it needs to be manipulated;
		this.tutorial = tutorial.slice(0)		

	}

	Tutorial.prototype = {

		start: function () {

			var self = this;

			this.currentStep = 0;

			// see if this tutorial involves a start function
			// Note: this function needs to be separate from the onStep function, because sometimes logic needs to be performed on the models
			// before any DOM updates, etc. See creditInvoices tutorial.
			if (typeof this.tutorial[0] === "function" ) {
				var onStart = this.tutorial.splice(0, 1)[0];				
				onStart();
			}

			if (typeof this.tutorial[ this.tutorial.length -1 ] === "function" ) {				
				this.onStop = this.tutorial.splice( this.tutorial.length -1, 1)[0];
			}

			// run callback for this step;
			callback = this.tutorial[ this.currentStep ].onStep
			if (callback)
				callback();

			this.createDOMElements();

			if (this.tutorial[0].focusElement) {

				// animation for first step is different from other steps, 
				this.$element = $(this.tutorial[0].focusElement);
				this.$spotLight.css({
					opacity: 0,
					top: this.$element.offset().top + this.$element.outerHeight() / 2,
					left: this.$element.offset().left + this.$element.outerWidth() / 2			
				})	

			}

			this.$spotLight.animate({ opacity: 1 })	

			this.moveSpotLight();	
		
			this.setClickListeners();

			this.handler = function (event) { self.keyupHandler( event ) }

			$("body").on("keyup", this.handler);

		},

		createDOMElements: function () {
			var $body = $( "body" );

			// create opacity-screen
			this.$opacityScreen = $("<div class='background-screen'></div>")
				.appendTo( $body )
				.animate({ opacity: 0.7 })

			// create spotlight;
			this.$spotLight = $("<div class='spotlight'></div>" )
				.appendTo( $body )

			// create instructions tooltip
			this.$instructions = $("<div class='instructions'>"  +
				"<div class='entype close'>" + myAPP.templateHelpers.charCodes.close + "</div>" +
				"<div class='text'></div><div class='controls'>" +
				"<div class='control left'><span class='entype'>" + myAPP.templateHelpers.charCodes.leftArrow + "</span></div>" +				
				"<div class='control right'><span class='entype'>" + myAPP.templateHelpers.charCodes.rightArrow + "</span></div>" + 
				"</div><div class='arrow'>" + 
				"</div>")
				.appendTo( $body )

			this.$eventCatcher = $("<div class='event-catcher'></div>")
				.appendTo( $body )

		},

		next: function () {
			var callback;
			
			// run callback for moving to next step;
			callback = this.tutorial[ this.currentStep ].onNextStep;
			if (callback) {
				callback();
			}

			this.currentStep++;

			if (this.currentStep === this.tutorial.length) {
				this.stop();
				return;
			}

			// run callback for this step;
			callback = this.tutorial[ this.currentStep ].onStep
			if (callback)
				callback();

			this.moveSpotLight();

		},

		previous: function () {
			var callback;

			// // run callback for moving to next step;
			// callback = this.tutorial[ this.currentStep ].onNextStep;
			// if (callback) {
			// 	callback();
			// }

			callback = this.tutorial [ this.currentStep ].onPreviousStep;
			if (callback) {
				callback();
			}

			this.currentStep--;

			if (this.currentStep < 0) {
				this.stop();
				return;
			}

			// run callback for this step;
			callback = this.tutorial[ this.currentStep ].onStep;
			if (callback) {
				callback();
			}

			this.moveSpotLight();

		},

		stop: function () {

			$("body").off("keyup", this.handler)
			$(".instructions").off( "click" );

			if (this.$element)
				this.$element.css({ zIndex: this._zIndex })
			var self = this;

			$(".spotlight, .background-screen, .instructions, .event-catcher") 
				.animate({ opacity: 0 }, { complete: function () { 
					$(".spotlight, .background-screen, .instructions, .event-catcher").remove() 
			}} )

			if (this.onStop)
				this.onStop()

		},

		moveSpotLight: function () {
			var currentStep = this.tutorial[ this.currentStep ]

			if ( currentStep.focusElement === null) {
				if (this.$element)
					this.$element.css({ zIndex: this._zIndex })
				this.$spotLight.css({ opacity: 0 })
				this.showCentralScreen( currentStep.width, currentStep.height );
				return;
			}

			var self = this;

			this.$instructions.animate({ opacity: 0 }, { duration: 300 })

			// restore css on highlighted element;
			if (this.$element) {					
				this.$element.css({ zIndex: this._zIndex });
			}

			// now get new element;
			this.$element = $( currentStep.focusElement )
			this._zIndex = this.$element.css( "zIndex" );
			
			this.$element.each( function () {
				var position = $(this).css( "position" )
				if (position === "static" || position === "inherit")
					$(this).css({ position: "relative" });
			})
			
			this.$element.css({ zIndex: 1000000 })

			// animate spotlight to new element; the entire function can be delayed to allow for animations to finish			
			var delay = currentStep.spotLightDelay || 0;

			if (delay)
				this.$spotLight.animate({ opacity: 0 }, { duration: 200 })

			setTimeout( function () {

				var css =  {  
					left: self.$element.offset().left -5,
					top: self.$element.offset().top -5,
					width: self.$element.outerWidth(),
					height: self.$element.outerHeight(),
					opacity: 1
				}

				self.$eventCatcher.css( css );		

				self.$spotLight.stop().css({ opacity: 1 })
					.animate( css,
						{ easing: "easeOutCubic", duration: 300, complete: function () { self.animateInstructions() } 
					})
			}, delay)

		},

		animateInstructions: function () {	
			if (!this.tutorial[ this.currentStep ])
				return;	

			var left, top, arrowDirection, arrowTop = 0, arrowLeft = 0, deltaLeft = "+=0", deltaTop ="+=0";

			this.$instructions
				.css({ width: 200, height: "inherit" })
				.find( ".text" )
				.text( this.tutorial[ this.currentStep ].text )
				
			var offsetLeft = this.tutorial[ this.currentStep ].instructionsOffsetLeft || 0;

			switch (this.tutorial[ this.currentStep ].instructionsPosition) {

				case "left": 

					left = this.$spotLight.offset().left - this.$instructions.outerWidth() + offsetLeft - 50
						
					top = this.tutorial[ this.currentStep ].instructionsOffsetTop 
						? this.$spotLight.offset().top + this.tutorial[ this.currentStep ].instructionsOffsetTop
						: this.$spotLight.offset().top - (this.$instructions.outerHeight() - this.$spotLight.outerHeight()) * 0.5;
					deltaLeft = "+=30";
					direction = "right";
					arrowTop = this.$instructions.outerHeight() / 2 - 7;
					arrowLeft = this.$instructions.outerWidth();
					break;

				case "right":

					left = this.$spotLight.offset().left + this.$spotLight.outerWidth() + offsetLeft + 50
						
					top = this.tutorial[ this.currentStep ].instructionsOffsetTop 
						? this.$spotLight.offset().top + this.tutorial[ this.currentStep ].instructionsOffsetTop
						: this.$spotLight.offset().top - (this.$instructions.outerHeight() - this.$spotLight.outerHeight()) * 0.5;
					deltaLeft = "-=30";
					arrowTop = this.$instructions.outerHeight() / 2 - 7;
					arrowLeft = -14;
					direction = "left";
					break;

				case "top": 

					left = this.$spotLight.offset().left + 50 +  offsetLeft ;
					top = this.$spotLight.offset().top - this.$instructions.outerHeight() - 50;
					deltaTop = "+=30";
					direction = "bottom";
					arrowTop = this.$instructions.outerHeight();
					arrowLeft = this.$instructions.outerWidth() / 2;
					break;

			}

			// add the arrow point
			this.$instructions.find( ".arrow" )
				.removeClass( "top bottom right left" )
				.addClass( direction )
				.css({ top: arrowTop, left: arrowLeft, opacity: 1 })

			// animate instructions;
			this.$instructions.stop().css({ opacity: 0, left: left, top: top })
				.animate({ opacity: 1, left: deltaLeft, top: deltaTop }, 
					{ specialEasing: { opacity: "linear", left: "easeOutCubic" }, duration: 600 })

		},

		showCentralScreen: function (width, height) {

			var screenWidth = $(window).width();
			var screenHeight = $(window).height() - 100;

			width = width  || 400;
			height = height || 300		

			this.$spotLight.stop().css({ left: screenWidth / 2, top: screenHeight / 2, height: 0, width: 0, opacity: 0 })

			this.$instructions
				.css({ top: screenHeight / 2 , left: screenWidth / 2, opacity: 0 })
				.animate({ left: (screenWidth - width) / 2, top: (screenHeight) / 2 - 100, opacity: 1, width: width, height: height },
						{ easing: "easeOutCubic" })
				.find(".text").html( this.tutorial[ this.currentStep ].text )

			this.$instructions.find( ".arrow").css({ opacity: 0 })

			this.$eventCatcher.css( { width: 0, height: 0 })

		},

		setClickListeners: function () {			
			var self = this;

			this.$instructions.on("click", ".control.left", function () {
				self.previous();
			})

			this.$instructions.on("click" , ".control.right", function () {				
				self.next();
			})

			this.$instructions.on("click", ".close", function () {
				self.stop();
			})
		},

		keyupHandler: function (event) {
			var keycode = event.keyCode;
			
			//event.preventDefault();

			switch (keycode) {

				case 37: this.previous(); break;
				case 39: 
				case 13: 
				this.next(); break;
				case 27: this.stop(); break;
			}
		}
	}
	



	return Tutorial;

})()



//------------------------------------



myAPP.tutorials = {

	// *************************************
	//
	//      newInvoice
	//
	// *************************************

	newInvoice: [

		{ 
			focusElement: "#_facturen",
			text: "Om een nieuwe factuur te maken gaat u naar het tabblad Facturen.",
			instructionsPosition: "right",	
			onStep: function (){
				$("html, body").animate({ scrollTop: 0 }, { easing: "easeOutCubic"})
			},
			onNextStep: function () {
				myAPP.router.navigate("facturen/facturen", { trigger: true })
			}
			
		},		

		{ 
			focusElement: ".button#new",
			text: "Klik vervolgens op Nieuwe factuur.",
			instructionsPosition: "left",
			spotLightDelay: 400,
			onStep: function () {
				if (myAPP.appView.onSessionViewManager.currentView.sidebarCollapsed)
					myAPP.appView.onSessionViewManager.currentView.collapseSidebar();
			}
		},

		{
			focusElement: ".invoices-pane ",
			text: "Er verschijnt een scherm voor het invoeren van de gegevens van uw factuur.",
			instructionsPosition: "left",
			instructionsOffsetTop: 50,
			spotLightDelay: 800,
			onStep: function () {
				myAPP.router.navigate("facturen/facturen/nieuw", { trigger: true })				
			},
			onPreviousStep: function () {				
				myAPP.router.navigate( "facturen/facturen", {trigger: true})
			},

		},
		{
			focusElement: "#account_debtor_id input, #account_debtor_id .placeholder",
			text: "In deze zoekbalk kunt u naar een bestaande debiteur zoeken.",
			instructionsPosition: "left"		

		},

		{
			focusElement: "#debtor-details",
			text: "U kunt ook op een snelle manier een nieuwe debiteur aanmaken.",
			instructionsPosition: "left"
		},

		{
			focusElement: "#invoice-details",
			text: "Het type factuur, de factuurdatum, betaaltermijn, verzendmethode en eventuele referentie kunt u hier invoeren.",
			instructionsPosition: "right"
		},	

		{
			focusElement: ".invoice-lines",
			text: "U kunt hier factuurregels toevoegen. Dit kan op twee manieren.",
			instructionsPosition: "top",
			onStep: function () { 
				$("html, body").animate({ scrollTop: 500 }, { easing: "easeOutCubic"})
			}
		},

		{
			focusElement: "#add-invoice-line",
			text: "U kunt een lege factuurregel toevoegen en deze vervolgens invullen.",
			instructionsPosition: "right"
		},
		{
			focusElement: "#add-article",
			text: "Nog sneller is het om eerst een artikel aan te maken. Als u dit gedaan heeft, kunt u direct een complete factuurregel toevoegen.",
			instructionsPosition: "right"
		},
		{
			focusElement: ".totals",
			text: "De totaalbedragen en de btw worden hier weergegegeven.",
			instructionsPosition: "top",
			instructionsOffsetLeft: -80,
		},
		{
			focusElement: "#show-pdf",
			text: "Om te bekijken hoe uw factuur eruit komt te zien, klikt u op Bekijk pdf.",
			onStep: function () {
				$("html, body").animate({ scrollTop: 0}, { easing: "easeOutCubic"})
			},
			instructionsPosition: "left"
		},
		{
			focusElement: "#save",
			text: "U kunt uw factuur altijd opslaan, zodat u deze later kunt aanpassen of versturen.",
			instructionsPosition: "left",
			onStep: function () { $( "#save" ).removeClass( "button-disabled" ) },
			onNextStep: function () { $( "#save" ).addClass( "button-disabled" ) }
		},
		{
			focusElement: "#send",
			text: "U kunt hier uw factuur versturen. Let op: na verzending kunt u de factuur niet meer wijzigen.",
			instructionsPosition: "left",
			onStep: function () { $( "#approve" ).removeClass( "button-disabled" ) },
			onNextStep: function () { $( "#approve" ).addClass( "button-disabled" ) }
		},
		{
			focusElement: "#invoice-number",
			text: "Uw factuur krijgt pas een nummer bij verzending. Zo is de nummering van uw facturen altijd correct.",
			instructionsPosition: "right"
		},
		{
			focusElement: ".invoice-header #status",
			text: "Ten slotte kunt u hier u de status van de factuur bekijken. Deze kan bijvoorbeeld op Concept, Verzonden, Herinnering of Betaald staan.",
			instructionsPosition: "left"
		},

		function () { 
			myAPP.router.navigate( "facturen/facturen", { trigger: true })
			if (myAPP.appView.onSessionViewManager.currentView.sidebarCollapsed)
					myAPP.appView.onSessionViewManager.currentView.collapseSidebar();


		}

	],

	// *************************************
	//
	//      creditInvoice
	//
	// *************************************

	creditInvoice: [

		function () { 
			// create fake data;
			var invoice = new myAPP.models.Invoice({ id: "123456789", status: "send" , invoice_number: "TEST",  
				date: myAPP.modelHelpers.parseDate( new Date() ), modified: "2013-20-10" });

			invoice._hasInvoiceLinesFetched = true;

			var debtor = new myAPP.models.Debtor({ id: "123456789", company_name: "Verkeerde Debiteur" })

			invoice.addDebtor( debtor )
			myAPP.debtors.add( debtor );

			var invoiceLine = new myAPP.models.InvoiceLine({ title: "Kosten installatie gasplaat", amount: 1, price: "123.45" })
			invoice.invoiceLines.add (invoiceLine );		
					
			// now properly add for functionality
			myAPP.invoices.add( invoice )
			myAPP.invoices.trigger( 'update' )
			
			
			myAPP.router.navigate("facturen/facturen", { trigger: true })
			setTimeout(function () {
			var $row = $(".invoices-collection .table-row:eq(1)").attr({ id: "123456789" });
				$row.find("#invoice_number").text("TEST")
				$row.find("#debtor").text("Verkeerde Debiteur")
				$row.find("#date").text( myAPP.templateHelpers.parseDate( new Date() ))
				$row.find("#status").html('<span class="label myAPP-tooltip" data-tooltip="Kredietfactuur"><span class="entype">' + myAPP.templateHelpers.charCodes.sent + '</span>verzonden</span>')
				$row.find("#amount").text("€ 123,45")
			}, 0)
			
		},

		{
			focusElement: null,
			text: "<p>In deze rondleiding laten we zien hoe u een creditfactuur maakt. Een creditfactuur is een factuur waarmee je het bedrag van een eerdere factuur" +
			" (gedeeltelijk) kan terugdraaien. Uw klant hoeft dan dit deel van de factuur niet te betalen.</p> ",
			height: 180,
			width: 290,
			onStep: function (){
				$("html, body").animate({ scrollTop: 0 }, { easing: "easeOutCubic"})
			},
		},

		{ 
			focusElement: "#navigation li#_facturen",
			text: "Om een creditfactuur te maken gaat u eerst naar de lijst met facturen in Facturen.",
			instructionsPosition: "right",
			spotLightDelay: 400,
			onStep: function () { 
				myAPP.router.navigate( "facturen/facturen", { trigger: true })
			}
		},

		{			
			focusElement: ".invoices-collection .table-row#123456789 ",
			text: "Vervolgens klikt u op de oorspronkelijke factuur die u (gedeeltelijk) wilt crediteren.",
			instructionsPosition: "left",
			onStep: function () { 
				myAPP.router.navigate( "facturen/facturen", { trigger: true })
				var $row = $(".invoices-collection .table-row:eq(1)").attr({ id: "123456789" });
				$row.find("#invoice_number").text("TEST")
				$row.find("#debtor").text("Verkeerde Debiteur")
				$row.find("#date").text( myAPP.templateHelpers.parseDate( new Date() ))
				$row.find("#status").html('<span class="label myAPP-tooltip" data-tooltip="Kredietfactuur"><span class="entype">' + myAPP.templateHelpers.charCodes.sent + '</span>verzonden</span>')
				$row.find("#amount").text("€ 123,45")

			},			
			spotLightDelay: 400
		},

		{			
			focusElement: ".buttons #actions",
			text: "Door op de knop Acties te klikken kunt u voor de optie Creditfactuur kiezen.",
			instructionsPosition: "left",
			spotLightDelay: 400,			
			onStep: function () {
				// make sure we're on the right hash, view;
				// particulary if we stepped back into here;
				myAPP.router.navigate( "facturen/facturen/123456789", { trigger: true } )
				
				// use timeout to wait for animations to finsish?
				// 
				setTimeout(function () { 
					$("body #actions").trigger("click") 
					$(".dropdown-content #credit-invoice").css({ backgroundColor: "#ebf4ff" });
				}, 800);
				
				
			},
			onNextStep: function () { 
				$("#credit-invoice").trigger("click")
			}
		},
		
		{			
			focusElement: ".invoices-pane",
			text: "Er verschijnt een scherm met het concept van de creditfactuur. Dit is al grotendeels ingevuld.",
			instructionsPosition: "left",
			onStep: function () {				
				$(".dropdown-content").remove();
			},
			spotLightDelay: 400
	
		},

		{			
			focusElement: ".new-invoice .invoice-lines",
			text: "De bedragen van de oorspronkelijke factuur staan als negatief saldo in de factuur. U kunt deze aanpassen als u een ander bedrag wilt crediteren.",
			instructionsPosition: "left",			
			// onNextStep: function () { 
			//	var url = Backbone.history.getFragment() + "/kredietfactuur";
			//	myAPP.router.navigate(url, { trigger: true })
			// }
		},

		{			
			focusElement: ".buttons #send",
			text: "U kunt de creditfactuur versturen zoals u een gewone factuur verstuurt",
			instructionsPosition: "left",
			//spotLightDelay: 400
			// onNextStep: function () { 
			//	var url = Backbone.history.getFragment() + "/kredietfactuur";
			//	myAPP.router.navigate(url, { trigger: true })
			// }
		},

		function () {
			var invoice = myAPP.invoices.get("123456789");
			var debtor = myAPP.debtors.get("123456789")
			myAPP.debtors.remove( debtor );
			myAPP.invoices.remove( invoice );
			myAPP.invoices.trigger( 'update' )
			myAPP.router.navigate( "facturen/facturen", { trigger: true })
		}

	],

	// *************************************
	//
	//      newDebtor
	//
	// *************************************


	newDebtor: [

		{ 
			focusElement: "#_debiteuren",
			text: "U kunt een nieuwe debiteur invoeren door naar het tabblad Debiteuren te gaan.",
			instructionsPosition: "right",	
			onNextStep: function () {
				myAPP.router.navigate("debiteuren/debiteuren", { trigger: true })
			},
			onStep: function (){
				$("html, body").animate({ scrollTop: 0 }, { easing: "easeOutCubic"})
			},
			
		},

		{ 
			focusElement: ".button#new",
			text: "Klik vervolgens op Nieuwe debiteur.",
			instructionsPosition: "left",	
			spotLightDelay: 400,
		},
		{
			focusElement: ".debtors-pane ",
			text: "Er verschijnt een scherm voor het invoeren van de gegevens van uw debiteur.",
			instructionsPosition: "left",
			instructionsOffsetTop: 50,	
			onStep: function () {
				myAPP.router.navigate("debiteuren/debiteuren/nieuw", { trigger: true })				
			},		
			onPreviousStep: function () {
				myAPP.router.navigate("debiteuren/debiteuren", { trigger: true })				
			}

		},
		{
			focusElement: ".new-body-content .list:eq(0)",
			text: "Hier kunt u de bedrijfsgegevens en contactgegevens invullen.",
			instructionsPosition: "left",
			onNextStep: function () {
				myAPP.animations.blink($("input#_company_name"), "Mengvoeders United");
				myAPP.animations.blink($("input#_email"), "henkvdtillaart@mengvoeders-united.nl");
				myAPP.animations.blink($("#debtor .value"), "Mengvoeders United");
			}	

		},
		{
			focusElement: ".new-body-content .list:eq(1)",
			text: "Vul hier de adresgegevens in zoals ze op de factuur moeten verschijnen.",
			instructionsPosition: "left",
			onNextStep: function () {
				myAPP.animations.blink($("input#_address"), "Pastoor Klerkstraat 123");
				myAPP.animations.blink($("input#_zipcode"), "5244 AD");
				myAPP.animations.blink($("input#_city"), "Boekel");
				myAPP.animations.blink($("input#_country"), "Nederland");
			}
		},

		{
			focusElement: ".new-body-content #save",
			text: "Door op Opslaan te klikken is uw nieuwe debiteur een feit.",
			instructionsPosition: "right",
			onStep: function () {
				$("html, body").animate({ scrollTop: 500 }, { easing: "easeOutCubic"})
			},
			onNextStep: function () {
				myAPP.router.navigate("debiteuren/debiteuren", { trigger: true })
			},
			onPreviousStep: function () {
				$("html, body").animate({ scrollTop: 0 }, { easing: "easeOutCubic"})
			}
		},
		
		function () {			
			myAPP.router.navigate("debiteuren", { trigger: true })
			$("html, body").animate({ scrollTop: 0 }, { easing: "easeOutCubic"})

		}

	],

	// *************************************
	//
	//      newPayment
	//
	// *************************************

	newPayment: [

		{ 
			focusElement: "#_betalingen",
			text: "U kunt een betaling boeken via het tabblad Betalingen.",
			instructionsPosition: "right",	
			onNextStep: function () {
				myAPP.router.navigate("betalingen", { trigger: true })
			},
			onStep: function (){
				$("html, body").animate({ scrollTop: 0 }, { easing: "easeOutCubic"})
			},
			
		},

		{ 
			focusElement: ".button#new",
			text: "Klik op de knop Nieuwe betaling.",
			instructionsPosition: "right",
			spotLightDelay: 400				
		},
		{
			focusElement: ".new-payment-view ",
			text: "Er verschijnt een scherm voor het invoeren van een betaling.",
			instructionsPosition: "left",
			instructionsOffsetTop: 50,	
			spotLightDelay: 400,
			onStep: function () {
				myAPP.router.navigate("betalingen/nieuw", { trigger: true })				
			},	
			onPreviousStep: function () {
				myAPP.router.navigate("betalingen", { trigger: true })				
			}	

		},
		{
			focusElement: ".new-payment-view #invoice_id",
			text: "In deze zoekbalk kunt u zoeken naar de factuur waarvoor u een betaling wilt boeken.",
			instructionsPosition: "right",
			onNextStep: function () {
				myAPP.animations.blink( $("#invoice_id input"), "0001 - Mengvoeders United, € 26,18");
				myAPP.animations.blink( $(".head #debtor .value"), "Mengvoeders United")				
				myAPP.animations.blink( $("#invoice-details"), 
					'<div class="key">Factuurgegevens</div>' +
					'<div class="list list-nostyle"><div class="list-item"><div class="key">Nummer</div><div class="value">nr. 0001</div></div>' +
					'<div class="list-item"><div class="key">Datum</div><div class="value">13 jul 2013</div></div>' +
					'<div class="list-item"><div class="key">Bedrag</div><div class="value">€ 26,18</div></div>' + 
					'<div class="list-item" id="total"><div class="key">Totaal verschuldigd</div><div class="value">€ 26,18</div></div></div>'); 

				$(".placeholder").css({ opacity: 0 })
				
			}

		},
		{
			focusElement: ".new-payment-view #payment_date",
			text: "Hier kunt u de betaaldatum selecteren.",
			instructionsPosition: "right",
			
		},

		{
			focusElement: ".new-payment-view #payment_type",
			text: "En eventueel de betaalmethode.",
			instructionsPosition: "right",			
		},

		{
			focusElement: ".new-payment-view #amount input",
			text: "Vervolgens kunt u het bedrag van de betaling invoeren. Dit dient minimaal € 0,01 te zijn.",
			instructionsPosition: "right",
			onStep: function () { 
				myAPP.animations.blink( $("#amount input, .head #amount .text"), "€ 26,18");
			}			
		},

		{
			focusElement: "#invoice-details .list",
			text: "Ter controle verschijnen de details van de factuur waarvoor u een betaling gaat boeken.",
			instructionsPosition: "left",			
		},

		{
			focusElement: ".new-payment-view #save",
			text: "Klik op Opslaan om de betaling af te ronden.",
			instructionsPosition: "right",			
			onStep: function () {
				$("html, body").animate({ scrollTop: 500 }, { easing: "easeOutCubic"})
			}
		},
		
		function () {			
			myAPP.router.navigate("betalingen", { trigger: true })
			$("html, body").animate({ scrollTop: 0 }, { easing: "easeOutCubic"})
		}

	],

	// *************************************
	//
	//      sandbox
	//
	// *************************************

	sandbox: [

		{
			focusElement: null,
			text: "<h2>Welkom bij KasCo</h2><p>Welkom in de testomgeving van KasCo. Kijk gerust even rond en meld u daarna aan met de knop rechtsboven in uw scherm.</p>" +
				"<p>U kunt met behulp van de pijltjes of de pijltjes op uw toetsenbord tussen de verschillende stappen " +
				" schakelen. Als u de instructie wilt afsluiten, kunt u op het kruisje rechtsboven of op de Esc-toets drukken.</p>"
		},

		{
			focusElement: "#help",
			text: "Voor meer uitleg over ons programma kunt u een van de rondleidingen starten. U vindt de rondleidingen onder de Help-knop.",
			instructionsPosition: "right",
			// instructionsOffsetLeft: -100,
			onStep: function () {
				$("#help").addClass( "blue" );
				$("html, body").animate({ scrollTop: 500 }, { easing: "easeOutCubic"})
			
			}
		},

		function () {
				$("#help").removeClass( "blue" );
				$("html, body").animate({ scrollTop: 0 }, { easing: "easeOutCubic"})
		}

	],

	// *************************************
	//
	//      introduction
	//
	// *************************************

	introduction: [

		function () {
			$("body").on("click", "a.set-cookie", function () { 
				$("a.set-cookie").animate({ opacity: 0 });
				//document.cookie = "dont-show-tutorial" 
				$.cookie("dont-show-tutorial", true, { expires: 365 })
			})
		},

		{
			focusElement: null,
			text: "<h2>Welkom bij KasCo</h2><p>In deze rondleiding laten we u de functies van ons programma zien." +
			"</p><p>U kunt met behulp van de pijltjes of de pijltjes op uw toetsenbord tussen de verschillende stappen " +
			" schakelen. Als u de rondleiding wilt afsluiten, kunt u op het kruisje rechtsboven of op de Esc-toets drukken." +
			"<p><a style='margin-top: 20px' class='set-cookie'>Deze rondleiding niet meer weergeven</a></p>"
		},

		{
			focusElement: "#navigation",
			text: "Aan de linkerkant van het scherm vindt u tabbladen waarmee u makkelijk naar de verschillende schermen kunt navigeren.",
			instructionsPosition: "right"
		},

		{
			focusElement: "#_dashboard",
			text: "Het Dashboard toont een overzicht van de belangrijkste informatie uit uw account.",
			instructionsPosition: "right",
			onStep: function () {
				$(".navigate-item").removeClass( "selected" )
				$("#_dashboard").addClass( "selected" )
			}

		},
		{
			focusElement: "#_facturen",
			text: "Onder Facturen vindt u al uw facturen, offertes en herhaalfacturen.",
			instructionsPosition: "right",
			onStep: function () {
				$(".navigate-item").removeClass( "selected" )
				$("#_facturen").addClass( "selected" )
			}
		},
		{
			focusElement: "#_debiteuren",
			text: "In Debiteuren staan uw debiteuren en eventuele bezwaren of betalingsregelingen.",
			instructionsPosition: "right",
			onStep: function () {
				$(".navigate-item").removeClass( "selected" )
				$("#_debiteuren").addClass( "selected" )
			}
		},
		{
			focusElement: "#_betalingen",
			text: "Alle betalingen die door KasCo verwerkt zijn, vindt u in het tabblad Betalingen.",
			instructionsPosition: "right",
			onStep: function () {
				$(".navigate-item").removeClass( "selected" )
				$("#_betalingen").addClass( "selected" )
			}
		},
		{
			focusElement: "#_artikelen",
			text: "Uw artikelen en artikelgroepen kunt u via Artikelen bekijken.",
			instructionsPosition: "right",
			onStep: function () {
				$(".navigate-item").removeClass( "selected" )
				$("#_artikelen").addClass( "selected" )
			}
		},
		{
			focusElement: "#_account",
			text: "De instellingen van uw account kunt u bekijken en wijzigen door op Account te klikken.",
			instructionsPosition: "left",
			onStep: function () {
				$(".navigate-item").removeClass( "selected" )
				$("#_account").addClass( "selected" )
				$("#help-button").removeClass( "blue" )
				$("html, body").animate({ scrollTop: 0 }, { easing: "easeOutCubic"})
			}
		},
		{
			focusElement: "#navigation li#help",
			text: "Onder Help vindt u rondleidingen waarin u wordt uitgelegd hoe u KasCo kunt gebruiken.",
			instructionsPosition: "right",
			onStep: function () {
				$("#help-button").addClass( "blue" )
				$(".navigate-item").removeClass( "selected" )
				$("html, body").animate({ scrollTop: 500 }, { easing: "easeOutCubic"})
			}
		},
		{
			focusElement: ".dashboard-pane",
			text: "Het Dashboard geeft u snel een overzicht van uw account.",
			instructionsPosition: "top",
			onStep: function () {
				myAPP.router.navigate("dashboard", { trigger: true })
				$("#help-button").removeClass( "blue" )		
				$("html, body").animate({ scrollTop: 0 }, { easing: "easeOutCubic"})
			}
		},
		{
			focusElement: ".dashboard-pane .head li:eq(0)",
			text: "Het totaal aan openstaande facturen vindt u hier.",
			instructionsPosition: "right",
			
		},
		{
			focusElement: ".dashboard-pane .head li:eq(1)",
			text: "Daarnaast staat de omzet die u dit kwartaal gedraaid heeft.",
			instructionsPosition: "right",
			
		},
		{
			focusElement: ".dashboard-pane .head li:eq(2)",
			text: "En de btw die u dit kwartaal moet afdragen wordt hier weergegeven.",
			instructionsPosition: "right",
			
		},
		{
			focusElement: ".dashboard-pane .left",
			text: "Uw facturen en betalingen worden ook in een grafiek getoond.",
			instructionsPosition: "right",
			instructionsOffsetTop: 100
			
		},
		{
			focusElement: ".dashboard-pane .right",
			text: "Verder vindt u op het dashboard meldingen van de meest recente gebeurtenissen in uw account.",
			instructionsPosition: "left",
			instructionsOffsetTop: 100,
			onNextStep: function () { 
				myAPP.router.navigate( "facturen/facturen", { trigger: true })
			}
		},

		{
			focusElement: "#master-search",
			text: "Ten slotte kunt u via de zoekbalk makkelijk zoeken op factuur en debiteur.",
			instructionsPosition: "left",
			onPreviousStep: function () {
				myAPP.router.navigate( "dashboard", { trigger: true })
			},
			onStep: function () {
				myAPP.router.navigate( "facturen/facturen", { trigger: true })
			}
			
		},

		{
			focusElement: null,
			text: "<p>Dit is het einde van de rondleiding. We hopen dat u met veel plezier en gemak gebruik zult maken van onze software. Voor vragen kunt u" +
				" altijd contact met ons opnemen.</p>" + 
				"<p>Het KasCo team</p>",
			height: 170

		},

		function () {
			myAPP.router.navigate( "dashboard", { trigger: true })
		}

	]
	
}








//------------------------------------



myAPP.views.AccountView = Backbone.View.extend({

	events: {
		"click .sidebar li.tab": "clickHandler"
	},

	initialize: function() {
						var renderContent; 

						this.template = JST["templates/account/account.html"];
						//myAPP.currentAccount.fetch();
						renderContent = this.template({ account: myAPP.currentAccount.toJSON() });
						this.$el.html(renderContent)

						// soft fade-in
						this.$el.find(".account-pane").css({ opacity: 0 }).animate({ opacity: 1 })						

						this.accountViewManager = new myAPP.views.ViewManager({ el: this.$el.find( ".account-pane" ), parent: this });
						
						this.accountViewManager.determineView = function (parameters, lastParameters) { 

							if (parameters[1] === (lastParameters && lastParameters[1]))				
								return;

							switch(parameters[1]) {

								case "instellingen":	this.setCurrentView(new myAPP.views.SettingsView(), /* removeLastView */ true)
														break;								
								case "bedrijfsinfo":	this.setCurrentView(new myAPP.views.CompanyView(), /* removeLastView */ true)
														break;
								case "bankgegevens":	this.setCurrentView(new myAPP.views.FinanceSettingsView(), /* removeLastView */ true)
														break;
								case "facturen":		this.setCurrentView(new myAPP.views.InvoiceSettingsView(), /* removeLastView */ true)
														break;
								case "gebruikers":		this.setCurrentView(new myAPP.views.UsersView(), /* removeLastView */ true)
														break;
								case "kosten":			this.setCurrentView(new myAPP.views.BalancesView(), /* removeLastView */ true)
														break;
							}

							this.animation = myAPP.animations.drop;
							return true;

						}	
						
	},

	render: function () { 

						var parameters = Backbone.history.getParameters();
						//  set the correct sidebar tab to active
						this.$el.find(".sidebar li.tab").removeClass( "active" );
						this.$el.find(".sidebar li.tab#" + parameters[1]).addClass( "active" );

						this.accountViewManager.render();
	},

	clickHandler: function (event) {						
						
						var $target = $(event.currentTarget);
						var section =  $target.attr("id");
						myAPP.router.navigate("account/" + section, { trigger: true })

	}

})



//------------------------------------



myAPP.views.BalanceView = Backbone.View.extend({

	initialize: function () {
										var self = this;
																	
										this.template = JST["templates/account/balance.html"];	
										this.render();

										// we need to call the super method to activate the base class initialize method;
										Backbone.View.prototype.initialize.apply(this, arguments);

	},

	render: function () {
										var renderContent = this.template({ balance: this.model.getAttributes() })
										this.$el.html(renderContent)
	}

})



//------------------------------------



myAPP.views.BalancesCollectionView = Backbone.View.extend({

	events: {
		"click .list-item": "clickHandler"
	},

	initialize: function (attributes) {
					var self = this;
					
					this.listenTo( this.collection, 'sync', function () { self.render(); self.$el.find(".balances.collection").stopSpinner() })
					this.render();

					// fix for certain browsers;
					setTimeout(function () { 
						if (attributes.startSpinner) {
							self.$el.find(".balances-collection").startSpinner();
						}
					}, 0)	

					// we need to call the super method to activate the base class initialize method;
					Backbone.View.prototype.initialize.apply(this, arguments);			
				
	},

	render: function () {

					this.template = JST["templates/account/balances-collection.html"];
					var renderContent = this.template({ balances: this.collection })
					this.$el.html(renderContent)	
					
	},

	clickHandler : function (event) {

					var $target = $(event.currentTarget);
					if ($target.hasClass( "placeholder" ))
						return;

					var id = $target.attr("id");

					var fragment = Backbone.history.getFragment();
					myAPP.router.navigate(fragment + "/" + id, { trigger: true })
	},

	remove: function () {
					
	}
})



//------------------------------------



myAPP.views.BalancesView = Backbone.View.extend({

		events: {
			
		},

		initialize: function (attributes) {
										var self = this;
																			
										this.template = JST["templates/account/balances.html"];			

										this.collection = (attributes && attributes.collection) || myAPP.balances;

										var renderContent = this.template({ balances: myAPP.balances })
										this.$el.html(renderContent); 

										this.balancesViewManager = new myAPP.views.ViewManager({ el: this.$el.find(".costs-pane"), parent: this})

										this.balancesViewManager.determineView = function (parameters, lastParameters) { 

											var view;

											if (lastParameters && lastParameters[2] === parameters[2])
												return;

											if (parameters[2]) {
												
												var model = myAPP.balances.get( parameters[2] );
												this.setCurrentView(new myAPP.views.BalanceView({ model: model }))
												this.animation = myAPP.animations.slideLeft;
												return true;
												
											} else {

												if (this._collectionView )

													view = this._collectionView;

												else {

													view = new myAPP.views.BalancesCollectionView({ collection: self.collection })

												}

												this.setCurrentView (view, /* removeLastView */ true)					
												this._collectionView = view;
												this.animation = myAPP.animations.slideRight;
												return true;
											}
											
										}	

		},			

		render: function () {

										this.balancesViewManager.render();
		}				



		

}) 



//------------------------------------



myAPP.views.CompanyView = Backbone.View.extend({

		events: {
			"click #save" : "_saveModel",
			"click #cancel": "resetModel",

			"dropdown": "dropdownHandler"
		},

		initialize: function () {
										var self = this;
										this.model = myAPP.currentAccount;										
										
										this.render();								

										this.toastOnSave = "Account opgeslagen";
										this.toastOnError = "Opslaan account mislukt";

										// we need to call the super method to activate the base class initialize method;
										Backbone.View.prototype.initialize.apply(this, arguments);
		},

		render: function () { 
										this.template = JST["templates/account/company.html"];	

										var renderContent = this.template({
											company: this.model.getAttributes(),
											hasSentInvoices: myAPP.currentAccount.get( "hasSentInvoices" )
										})
										this.$el.html(renderContent);	
										
		},

		dropdownHandler: function (event, value) {

										var property = $(event.target).attr("id");		

										// if (property === "vat_liable")
										//	alert( myAPP.texts.vatChangeWarning )

										this.model.set(property, value)
		},

		_saveModel: function () { 
										if (myAPP.session.get( "isGuestUser" )) {								
											return;
										}

										var _attributes = ['address', 'zipcode', 'city', 'country', 'contact_person', 'phone', 'fax', 'mobile', 
												'kvk_number', 'vat_number', 'vat_liable'];

										var attributes = _.pick(this.model.attributes, _attributes);									

										for (var key in attributes) {
											if (attributes[key] === "" || attributes[key] === undefined || attributes[key] === null)
												delete attributes[key];
										}

										// *** FIX THIS!!! THIS IS POOR PROGRAMMING
										// *** find alternative for checking required but empty fields of object.

										// conditionally (re)add vat_number and kvk_number;
										if (this.model.get("vat_liable") === "ja")							
											attributes["vat_number"] = this.model.get("vat_number");

										if (this.model.get("country") === "Nederland") {											
											attributes["kvk_number"] = this.model.get("kvk_number")
										}

										this.saveModel({ attributes: attributes })
		}

}) .editable() .saveable() .validates();



//------------------------------------



myAPP.views.FinanceSettingsView = Backbone.View.extend({

		events: {
			'click #save' : '_saveModel',
			'click #cancel': 'resetModel'
		},

		initialize: function () {
										var self = this;
										this.model = myAPP.currentAccount;										
											

										this.toastOnSave = "Account opgeslagen";
										this.toastOnError = "Opslaan account mislukt";	

										// we need to call the super method to activate the base class initialize method;
										Backbone.View.prototype.initialize.apply(this, arguments);
		},							

		render: function () {
										this.template = JST["templates/account/finance-settings.html"];		
										var renderContent = this.template({ account: this.model.getAttributes() })
										this.$el.html(renderContent);
		},

		_saveModel: function () {

										if (myAPP.session.get( "isGuestUser" )) {								
											return;
										}

										var attributes = _.pick(this.model.getAttributes(), ['bank_bic', 'bank_account', 'bank_account_iban'])

										for (var key in attributes) {
											if (attributes[key] === undefined || attributes[key] === null || attributes[key] === "")
											delete attributes[key];
										}

										this.saveModel({attributes: attributes});

		}


}) .editable() .validates() .saveable();



//------------------------------------



myAPP.views.InvoiceSettingsView = Backbone.View.extend({

		events: {
			"click #save" : "_saveModel",
			"click #cancel": "resetModel",
			"dropdown": "dropdownHandler",

			"change textarea": "changeTextareaHandler"
		},

		initialize: function () {
										var self = this,
											email;

										if(!myAPP.accountSettings) 
											throw "Cannot create InvoiceSettingsView if myAPP.accountSettings does not exist";

										this.model = myAPP.accountSettings;										

										this.toastOnSave = "Account opgeslagen";
										this.toastOnError = "Opslaan account mislukt";		

										this.render();

										// we need to call the super method to activate the base class initialize method;
										Backbone.View.prototype.initialize.apply(this, arguments);
		},

		render: function () {
										this.template = JST["templates/account/invoice-settings.html"];	
										var renderContent = this.template({ settings: this.model.getAttributes() })
										this.$el.html(renderContent);

										email = myAPP.accountSettings.get("cc_emails");

										if ( email ) {
											this.$el.find(".email").css({ opacity: 1 })
											this.$el.find(".email input").val( email );
										}		
		},
		
		_saveModel: function () {
										if (myAPP.session.get( "isGuestUser" )) {								
											return;
										}

										var self = this;
										
										var changedValues = this.model.getChangedValues( true );


										var attributes = _.pick(this.model.getAttributes(), ['delivery_method', 'invoice_id_continuous', 
											'invoice_id_prefix', 'invoice_id_start', 'invoice_id_next', 'default_invoice_content', 'cc_emails']);

										
										this.saveModel({ 
											attributes: attributes, 
											success: function () { 
												if (changedValues && (changedValues.invoice_id_continuous || changedValues.invoice_id_continuous === 0))
													myAPP.animations.flashElement(self.$el.find("#invoice_id_continuous"), "success");

											}
										});

		},

		changeHandler: function (changedValues) {									
										
										if (changedValues && changedValues.invoice_id_prefix)
											myAPP.animations.blink(this.$el.find("#invoice_id_next .prefix"), changedValues.invoice_id_prefix);

		},

		changeTextareaHandler: function (event) {

										var $target = $(event.target),
										value = $target.val();										

										myAPP.animations.blink( $target, value );
										this.model.set({ default_invoice_content: value })		
		},
		
		dropdownHandler: function (event, value) {

										var property = $(event.target).attr("id");										
										console.log(property)

										switch(property) {

											case "invoice_id_continuous":	this.model.set(property, value); 
																			break;

											case "cc_emails":				this.animateEmailInput( value ); 
																			if (value === "no") {
																				myAPP.accountSettings.set({ cc_emails: "" })
																			} else {
																				var email = myAPP.currentAccount.get( "email" )
																				this.$el.find("input#_cc_emails").val( email )
																				myAPP.accountSettings.set({ cc_emails: email })
																			}
																			break;
										}										

		},

		animateEmailInput: function (value) {

										switch( value ) {

											case "yes":						this.$el.find(".email").animate({ opacity: 1 }); break;
											case "no":						this.$el.find(".email").animate({ opacity: 0 }); break;
										}

		}


}) .editable() .validates() .saveable();



//------------------------------------



myAPP.views.newUserView = Backbone.View.extend ({
	
	events: {
		"click #add-user": "addUser",
		"dropdown": "dropdownHandler"
	},


	initialize: function () { 
							var self = this;
							this.model = new myAPP.models.User();
							this.template = JST["templates/account/new-user.html"];											
							var html = this.template();
							this.$el.html(html);
							
							this.toastOnSave = "Nieuwe gebruiker aangemaakt";
							this.toastOnError = "Aanmaken gebruiker mislukt";

							//this.listenTo(this.model, 'change', this.changeHandler)

							myAPP.user = this.model;
	},

	addUser: function () {			
							var self = this;

							this.saveModel({
								success: function () {
									var	data = self.model.get("users").user
									myAPP.users.reset( data )
									window.history.back();

								}
							});
	},

	dropdownHandler: function (event, value) { 

							var property = $(event.target).attr("id");							
							this.model.set(property, value);
							
	},

	changeHandler: function (changedValues) { 

							//var changes = this.model.getChangedValues();
							
							for (var key in changedValues) {

								if (key === "name") {
									if (changedValues[key] === "") 
										changedValues[key] = "Nieuwe gebruiker"
									myAPP.animations.blink($(".new-user h2 .text"), changedValues[key]);
								}
							}
	}

}) .editable() .saveable() .validates();



//------------------------------------



myAPP.views.SettingsView = Backbone.View.extend({

	events: {
		"click .mouse-over, #upload": "openImageSelect",
		"click #save" : "_saveModel",
		"click #cancel": "resetModel",
		"click #upgrade": "upgradeAccount",

		"dropdown" : "dropdownHandler"
		
	},

	initialize: function () {
							var renderContent, 
								self = this;

							this.model = myAPP.currentAccount;

							this.render();

							this.toastOnSave = "Account opgeslagen";
							this.toastOnError = "Opslaan account mislukt";
							
							
							// *** HACK						
							this._initialAccountSettings = myAPP.accountSettings.getAttributes();
							this.listenTo( myAPP.accountSettings, 'sync', function () {
								this._initialAccountSettings = myAPP.accountSettings.getAttributes();
							}) 
							
							// we need to call the super method to activate the base class initialize method;
							Backbone.View.prototype.initialize.apply(this, arguments);					
	},

	render: function () {
							
							this.template = JST["templates/account/settings.html"];
							renderContent = this.template({ 
								account: myAPP.currentAccount.getAttributes(), 
								accountSettings: myAPP.accountSettings.getAttributes() 
							});

							this.$el.html(renderContent)

							// *************************************
							//
							//      setup logo upload, etc.
							//
							// *************************************

							var $logoContainer = this.$el.find(".logo-container")

							myAPP.loadImage($logoContainer, myAPP.accountSettings.get("logoUrl"), 350, 130)

							$logoContainer
								.on("mouseenter", function () { 
									$logoContainer.find("img").stop(true).animate({ opacity: 0.3 }, { duration: 400 })
									$logoContainer.find(".mouse-over").stop(true).animate({ opacity: 1 })
								})
								.on("mouseleave", function () { 
									$logoContainer.find("img").stop(true).animate({ opacity: 1 }, { duration: 400 })
									$logoContainer.find(".mouse-over").stop(true).animate({ opacity: 0 })
								})

							var indicatorWidth = 150;
							var width = Math.floor(this.model.get("monthlyInvoicesSent") / this.model.get("maxMonthlyInvoices") * indicatorWidth);
							if (width > indicatorWidth) {
								width = indicatorWidth
							}
							if (width === 0) {
								$(".invoices-bar .indicator").css({ opacity: 0 })
							}
							
							// *** HACK because the DOM being half-ready
							setTimeout(function () { 
								$(".invoices-bar .indicator").animate({width: width + "px"})
							}, 0)

							this.$el.find(".mouse-over")
								.on("mouseover", function () { $("img#logo").css({ opacity: 0.3 }) })
								.on("mouseout", function () { $("img#logo").css({ opacity: 1 }) })

							// *************************************
							//
							//      setup slider for payment plans
							//
							// *************************************

							var maxPaymentTerms = myAPP.accountSettings.get("max_payment_terms");

							this.$el.find("#slider").slider({
								range: "min",
								min: 2,
								max: 12,
								slide: function (event, ui) { 
									//$("#terms").html(ui.value)					
									myAPP.animations.blink($("#max-payment-terms.value"), ui.value);
									myAPP.accountSettings.set({ max_payment_terms: ui.value })
									
								},
								value: maxPaymentTerms > 1 ? maxPaymentTerms : 2
							});

							if (maxPaymentTerms > 1) { 
								this.$el.find(".number-slider").css({ opacity: 1, height: 67 })
								this.$el.find(".number-slider #max-payment-terms").html(maxPaymentTerms)
							}

	},

	_saveModel: function () {
							if (myAPP.session.get( "isGuestUser" )) {								
								return;
							}

							var self = this;

							var changedValues = myAPP.accountSettings.getChangedValues(true);
							
							var attributes = _.pick(this.model.getAttributes(), ['title', 'email'])

							this.$el.startSpinner();

							myAPP.accountSettings.save({}, { 

								// on success, save account model;
								success: function () { 
									self.saveModel({ attributes: attributes, 
										success: function () {												
											if (changedValues) {
												// separate animations for changes on payment-terms, kasco-payment
												if (changedValues.max_payment_terms || changedValues.max_payment_terms === 0)
													myAPP.animations.flashElement(self.$el.find("#payment-plans"), 'success');
												if (changedValues.kasco_payment || changedValues.kasco_payment === 0)
													myAPP.animations.flashElement(self.$el.find("#kasco-payment"), 'success');
											}
										},
										error: function () {
											alert("fout bij opslaan account");
										}	

									});

								},

								error: function () {
									myAPP.trigger('toast', self.toastOnError, 'error');
									self.$el.stopSpinner();
									alert( myAPP.texts.errorOnAccountSettingsSave);
								}
							})

							
	},

	openImageSelect: function () {		
							var self = this;
								
							if (myAPP.session.get( "isGuestUser" )) {								
								return;
							}						

							myAPP.animations.openPopup( JST["templates/popups/image-upload.html"]({ window: window }))

							// setup fileupload.js
							myAPP.setupImageUpload({
								element: $(".popup .upload-image"),
								url: myAPP.accountSettings.get("postLogoUrl"),
								success: function () {
									self.logoChanged = true;
									// *** Temporary hack: hide the cancel button, because uplods can't be canceled yet;
									var $cancelButton = $(".popup #cancel");
									myAPP.animations.blink($cancelButton, "<span class=\"entype\">" + myAPP.templateHelpers.charCodes.approve + "</span>Opslaan");
								},
								// force tooltip to show on error
								error: function () { $(".drop-area").trigger("mouseenter"); }
							})


							// set extra event handlers
							$(".close-button, #cancel").on("click", function () { self.closeImageSelect() })		

	},

	closeImageSelect: function () { 
							
							myAPP.animations.closePopup();
							
							if (this.logoChanged)
								this.updateLogo();
							

	},

	updateLogo: function () { 

							var $logoContainer = this.$el.find(".logo-container")

							var $img = $logoContainer.find("img")

							//remove the old image;
							$img.css({position: "absolute", top: 0}).animate({ opacity: 0 }, { complete: function () { $img.remove() } });

							var image = new Image();
							image.src = myAPP.accountSettings.get("logoUrl");

							$(image).on("load", function () {

								// resize image
								myAPP.resizeImage(image, 350, 130);
								var marginLeft = ((350 - image.width) / 2) | 0,
									marginTop = ((180 - image.height) / 2) | 0;
			
								// append to document
								var $img = $("<img>")
									.attr({ src: myAPP.accountSettings.get("logoUrl") })
									.css({ display: "block", opacity: 0, marginLeft: marginLeft, marginTop: marginTop })									
									.prependTo($logoContainer)			
									
								$img.on("load", function () { $img.animate({ opacity: 1 }) })	
							})

	},

	upgradeAccount: function () { 
							var self = this;

							confirm("Wilt u uw account upgraden naar lid? Let op: lidmaatschapskosten zijn € 17,50 per maand", function () {

								self.$el.startSpinner();

								myAPP.currentAccount.upgrade({
									success: function () {
										self.$el.stopSpinner()
										self.successOnUpgrade();
										myAPP.trigger("toast", "Account succesvol geupgraded", "success")
									},
									error: function () {
										self.$el.stopSpinner()
										self.errorOnUpgrade();
										myAPP.trigger("toast", "Upgraden account mislukt", "error")
									}
								});							
							})

	},

	successOnUpgrade: function () {

							myAPP.trigger('toast', "Account succesvol geupgraded", 'success');
							myAPP.animations.flashElement(this.$el, "success");		

							// does this work?
							this.initialize();
	},

	errorOnUpgrade: function () { 

							myAPP.trigger('toast', "Upgraden account mislukt", 'error')
	},

	dropdownHandler: function (event, value) {
							var self = this,
								$target = $(event.target),
								property = $target.attr("id");

							if (property === "kasco-payment") {								
								myAPP.accountSettings.set({ kasco_payment: value })

							} else if (property === "accept-payment-plans") {

								switch(value) {

									case "yes":			this.$el.find(".number-slider").css({ display: "block" }).animate({ opacity: 1, height: 37 });
																myAPP.accountSettings.set({ max_payment_terms: 2 })
																this.$el.find("#slider").slider({ value: 2 })
																this.$el.find(".number-slider #max-payment-terms").html(myAPP.accountSettings.get("max_payment_terms"))
																break;

									case "no":			this.$el.find(".number-slider").animate({ opacity: 0, height: 0 }, { complete: function () {
																	self.$el.find(".number-slider").css({ display: "none" });
																}})
																myAPP.accountSettings.set({ max_payment_terms: 0 })
																break
								}
							}

	},

	// ** HACK
	// this entire method is a terrible hack

	remove: function () {
							if (myAPP._initialAccountSettings)
								myAPP.accountSettings.attributes.kasco_payment = myAPP._initialAccountSettings.kasco_payment
							//console.log("resetting accountSettings: ", myAPP._initialAccountSettings.kasco_payment)
							

	}

}) .saveable() .editable() .validates();



//------------------------------------



myAPP.views.UserView = Backbone.View.extend({

	events: { 
		"click .change-password #cancel": "cancelSubView",			
		"click .change-password #save": "savePassword",
		"click #change-password": "changePassword",

		"click #delete": "deleteModel",
		
		"click #edit": "editUser",
		"click .edit-user #save": "saveUser",

		"dropdown": "dropdownHandler"
	},

	initialize: function() {
							var self = this;

							if (!this.model)
								throw "Can't create UserView without model";

							var userId = this.model.get("user_id");
							
							this.template = JST["templates/account/user.html"];	

							// the currentUser's role is required by the template, because certain buttons will only appear if the currentUser is admin											
							this.$el.html( this.renderTemplate() )

							this.toastOnSave = "Gebruiker succesvol opgeslagen";

							myAPP.user = this.model;	

							// we need to call the super method to activate the base class initialize method;
							Backbone.View.prototype.initialize.apply(this, arguments);					
							
	},

	renderTemplate: function () {

							return this.template({
								user: this.model.getAttributes(), 
								userRole: myAPP.getUserRole()
							})
	},

	render: function () { 

							var hash = Backbone.history.getFragment();
							if (!(hash.match(/bewerken/) || hash.match(/wachtwoord/))) {
								if (this.isEditingUser || this.isChangingPassword) {
									this.cancelSubView();
								}
							}

	},

	changePassword: function() {
							var self = this;

							if (this.isChangingPassword)
								return;
							
							// temp disable the edit buttons
							this.$el.find(".buttons.head").animate({opacity: 0}, { complete: function () { self.$el.find(".buttons.head").css({ visibility: "hidden" }) } })
							
							this.isChangingPassword = true;
							var oldElement = this.$el.find(".body-content").addClass("old");							
							var newElement = $(JST["templates/account/user-password.html"]());
							myAPP.animations.drop({oldElement: oldElement, newElement: newElement, top: 50});

							var hash = Backbone.history.getFragment();
							myAPP.router.navigate(hash + "/wachtwoord")

	},

	cancelSubView: function () {

							this.$el.find(".buttons.head").css({ visibility: "visible" }).animate({opacity: 1 })
							this.isChangingPassword = false; this.isEditingUser = false;
							var oldElement = this.$el.find(".body-content:not('.old')")
							var newElement = this.$el.find(".body-content.old");							
							myAPP.animations.lift({ oldElement: oldElement, newElement: newElement, remove: true, top: 50 });
							myAPP.clearTooltips();
	},

	// *************************************
	//
	//      new password
	//
	// *************************************

	savePassword: function() { 

							var self = this;

							var $oldPassword = this.$el.find("#old_password input"), oldPassword = $oldPassword.val(),
								$newPassword = this.$el.find("#password input"), newPassword = $newPassword.val(),
								$confirmNewPassword = this.$el.find("#confirm-password input"), confirmNewPassword = $confirmNewPassword.val();

							
							// *** ADD client-side validation of new password;

							if (newPassword !== confirmNewPassword) {
								myAPP.animations.addErrorMarkup($newPassword.parent(), myAPP.texts.errors.differentPasswords)
								myAPP.animations.addErrorMarkup($confirmNewPassword.parent(), myAPP.texts.errors.differentPasswords)								
								return;
							}

							// manually do all this stuff becauase we're saving on a differen model...
							this.$el.startSpinner();

							myAPP.currentUser.save({old_password: oldPassword, password: newPassword}, {
								success: function (model, response, options) {
									myAPP.trigger('toast', 'Wachtwoord gewijzigd', 'success');
									self.$el.stopSpinner();
									// remove the changePasswordView
									self.cancelSubView();

									// update session auth header
									myAPP.session.updateAuthorization(myAPP.currentUser.get("email"), newPassword);
								}, 
								error: function (model, xhr, options) {
									myAPP.trigger('toast', 'Wijzigen wachtwoord mislukt', 'error');
									// manually trigger validation errors markup, as we're saving on a different model than the view's!
									self.model.trigger('error', model, xhr, options);
									self.$el.stopSpinner();
								},
								patch: true
							})

							//}
						
	},

	saveUser: function () { 
							var properties, self = this;
							properties = _.pick(this.model.attributes, ['email', 'name'])

							if (this.isSaving)
								return

							this.isSaving = true;

							if (this.model.get( "isCurrentUser" )) {								
								// we need to save through the currentUser
								// and confirm password 

								var html = JST["templates/popups/confirm-password.html"]();
								myAPP.animations.openPopup(html);
	
								$(".popup #save").on("click", function () {

									properties.old_password = $(".popup input").val()								
									myAPP.currentUser.set(properties)

									$(".popup .wrapper").startSpinner()

									myAPP.currentUser.save({
										name: this.model.get("name"),
										email: this.model.get("email")
									}, {
										success: function (model, response, options) {
											myAPP.trigger('toast', 'Uw gegevens zijn gewijzigd', 'success');
											$(".popup .wrapper").stopSpinner()			
											myAPP.animations.closePopup();	

											// sync the users collection;
											//var userModel = myAPP.users.findWhere({ user_id: myAPP.currentUser.get("id") })											
											//userModel.set( properties)						
											
											self.isSaving = false;

											self.model.trigger('sync');
										}, 
										error: function (model, xhr, options) {
											myAPP.trigger('toast', 'Wijzigen gegevens mislukt', 'error');
											
											// var responseObject = myAPP.parseErrorResponse(xhr);
											// if (responseObject && responseObject["old_password"]) {
											myAPP.animations.addErrorMarkup($( ".popup #old_password" ), myAPP.texts.errors.password)
											// }

											$(".popup .wrapper").stopSpinner()
											self.isSaving = false;											
										},		
										patch: true
									})

								})
						

							} 

							// else {
							// 	this.saveModel(this.model.attributes);
							// }
	},	

	// ***************************
	//
	// 		edit user
	//
	// ***************************

	editUser: function () { 
						var self = this;
						
						if (this.isEditingUser)
							return;
						
						// temp disable the edit buttons
						this.$el.find(".buttons.head").animate({opacity: 0}, { complete: function () { self.$el.find(".buttons.head").css({ visibility: "hidden" }) } })
						
						this.isEditingUser = true;
						var oldElement = this.$el.find(".body-content").addClass("old");							
						var newElement = $(JST["templates/account/edit-user.html"]({ user: this.model.getAttributes() }) );
						myAPP.animations.drop({ oldElement: oldElement, newElement: newElement, top: 50 });

						var hash = Backbone.history.getFragment();
						myAPP.router.navigate(hash + "/bewerk")


	},

	deleteModel: function () {
							
						var self = this;							

						var username = this.model.get('name')
						confirm("Gebruiker "+ username + " verwijderen?", function () { 
						
							self.$el.startSpinner();
							self.model.destroy({
								success: function(model, response, options) {											
									self.$el.stopSpinner();
									myAPP.trigger('toast', "user " + username + " verwijderd", "success")						
									
									// navigate back to collection view											
									 myAPP.router.navigate("account/gebruikers", {trigger: true})
								},
								error: function() {
									self.$el.stopSpinner();
									myAPP.trigger('toast', "error on delete " + username, "error");
								}
							})
						});
	},


	// property would always be role
	dropdownHandler: function (event, value) {
						var self = this;

						confirm("Rol van gebruiker " + this.model.get("name") + " aanpassen?", function () {
						
							self.model.set({role: value });					

							self.saveModel({ 
								success: function () {
									var $span = self.$el.find("span.user-role");
									myAPP.animations.blink($span, role);
									myAPP.animations.flashElement($span.parent(), 'success');
								}
							});
						})
	},

	changeHandler: function (changedValues) { 
							
							

							if (!changedValues) {
								console.warn("*** no changes despite change event: indicates possible error")
								return;
							}

							if (changedValues.name) {
								myAPP.animations.blink(this.$el.find("h2 .text"), changedValues.name)
							}

							// if (changes.email) {
							// 	myAPP.animations.blink(this.$el.find(".email"), changes.email)	
							// }
	}



}) .saveable() .validates() .editable();



//------------------------------------



myAPP.views.UsersCollectionView = Backbone.View.extend({

	events: {
		"click li.list-item": "clickHandler"
	},

	initialize: function () {

					this.template = JST["templates/account/users-collection.html"];
					
					// we need to call the super method to activate the base class initialize method;
					Backbone.View.prototype.initialize.apply(this, arguments);
					

	},

	render: function () {
	
					var renderContent = this.template({collection: this.collection})
					this.$el.html(renderContent)
	},

	clickHandler : function (event) {
					var $target = $(event.currentTarget);
					var id = $target.attr("id");
					myAPP.router.navigate("account/gebruikers/" + id, {trigger: true})
	}
})



//------------------------------------



myAPP.views.UsersView = Backbone.View.extend({

	events: {
		"click li#add-user": "addUser"
	},

	initialize: function() {
							var self = this;
							this.template = JST["templates/account/users.html"];
							var html = this.template({ isSuperAdmin: myAPP.getUserRole() === "superadmin" });
							this.$el.html(html);
																				
							this.collection = myAPP.users; 
							
							this.usersViewManager = new myAPP.views.ViewManager({el: this.$el.find(".users-pane"), parent: this});

							this.usersViewManager.determineView = function (parameters, lastParameters) { 

								if (lastParameters && lastParameters[2] === parameters[2])
									return;

								if (parameters[2]) {

									if (!isNaN(Number(parameters[2]))) {
										var model = self.collection.findWhere({user_id: parameters[2]});
										this.setCurrentView(new myAPP.views.UserView({ collection: self.collection, model: model }))
										this.animation = myAPP.animations.slideLeft;
										return true;
									} else {
										this.setCurrentView(new myAPP.views.newUserView({ collection: self.collection }));
										this.animation = myAPP.animations.slideLeft;
										return true;
									}

								} else {

									this.setCurrentView(new myAPP.views.UsersCollectionView({ collection: self.collection }))
									this.animation = myAPP.animations.slideRight;
									return true;
								}
								
							}	

							// we need to call the super method to activate the base class initialize method;
							Backbone.View.prototype.initialize.apply(this, arguments);
	},

	render: function ()  {
							// this.createCollection();
							this.usersViewManager.render();
	},

	addUser: function () {
							myAPP.router.navigate("account/gebruikers/nieuw", {trigger: true})
	}

});



//------------------------------------



myAPP.views.AppView = Backbone.View.extend({

	events: {		
			
		"click .navigation": "navigate",
		"click .sub-menu .sub-link": "navigateSubmenu",
		"click #logout": "logout",
		"click #session-information #accountname": "showAccount",
		"click #session-information #username": "showUser",
		"click #signup-button": "showSignupPopup",
		
		"click a.tutorial": "clickTutorialHandler",
		"click #master-search .placeholder": "clickPlaceHolderHandler",
		
		"keydown #master-search input" : "keydownHandler", 
		"keyup #master-search input": "keyupHandler",

		"autocomplete #master-search input": "autoCompleteHandler", 

		"mouseenter #help-function": "showHelpLinks",
		"mouseleave #help-function": "hideHelpLinks"
		
	},

	initialize: function() {	

					var self = this, renderContent;

					renderContent = JST['templates/login/off-session.html']( /* a user from cookie? */ );
					this.$el.html(renderContent);

					this.offSessionViewManager = new myAPP.views.ViewManager({ el: this.$el.find(".off-session-pane"), parent: this });

					this.offSessionViewManager.determineView = function (parameters, lastParameters) {						
						
						if (!parameters[0]) {							
							this.setCurrentView(new myAPP.views.LoginView(), /* removelastview */ true);
							this.animation = lastParameters && lastParameters[0] ? myAPP.animations.slideRight: null;
							return true;
						}

						if (parameters[0] === "aanmelden") {
							this.setCurrentView(new myAPP.views.SignupView(), /* removelastview */ true);
							this.animation = myAPP.animations.slideLeft;
							return true;
						}

						if (parameters[0] === "password") {
							this.setCurrentView(new myAPP.views.VerifyView(), /* removelastview */ true);
							this.animation = myAPP.animations.slideRight;
							return true;
						}

						if (parameters[0] === "import") {
							var view = new myAPP.views.LoginView();
							this.setCurrentView(view, /* removelastview */ true);				
							view.showImportAccount();
							return true;
						}

					};
					
					// set focus on first input element
					setTimeout(function () {
						$("input#email").focus();					
					}, 0);
					
	},

	setNormalView: function () {
					var self = this;

					// listener for updating the username if it's changed
					this.listenTo( myAPP.currentUser, 'sync', function () { 
						myAPP.animations.blink( $("#session-information #username"), myAPP.currentUser.get("name"));
					});

					var renderContent = JST['templates/login/on-session.html']({ 
						user: myAPP.currentUser.getAttributes(),
						accountTitle: myAPP.currentAccount.get("title"),
						isGuestUser: myAPP.session.get( "isGuestUser")
					});			

					$(this.el).html( renderContent );	

					// retarded hack to disable automated browser scrolling;
					// see: http://stackoverflow.com/questions/8779657/priority-when-more-than-one-event-handler-is-bound-to-an-element
					// DavidLin's answer
					$("li#_facturen").on("click", function (event) { 
						myAPP.router.navigate("facturen/facturen", { trigger: true });					
					});					

					// reinitialize master search on changes to the invoices collection
					this.listenTo( myAPP.invoices, "add remove sync", function () { 
						if (myAPP.isFetchingResources)
							return;
						self.initializeMasterSearch();
					});

					this.listenTo( myAPP, "resourcesLoaded", function () {						
						self.initializeMasterSearch();	
					});
					 
					this.onSessionViewManager = new myAPP.views.ViewManager({ el: this.$el.find( "#mainpane" ), parent: this });
						
					this.onSessionViewManager.determineView = function (parameters, lastParameters) {

						// show submenu if appicable
						self.updateNavigation(parameters);	

						// does not affect this view; return;
						if (lastParameters && lastParameters[0] === parameters[0]) {						
							return;
						}

						// show and hide search field;
						if (parameters[0] !== "dashboard") {
							$("body #master-search").animate({ opacity: 1 });

						} else
							$("body #master-search").animate({ opacity: 0 });										
						
						switch( parameters[0] ) {

							case "account":		this.setCurrentView(new myAPP.views.AccountView(), /* removeLastView */ true);																			
												return true;	
							case "dashboard":	this.setCurrentView(new myAPP.views.DashboardView(), /* removeLastView */ true);
												return true;
							case "facturen":	this.setCurrentView(new myAPP.views.InvoicesView(), /* removeLastView */ true);		
												return true;							
							case "debiteuren":  this.setCurrentView(new myAPP.views.DebtorsView(), /* removeLastView */ true);
												return true;
							case "betalingen":	this.setCurrentView(new myAPP.views.PaymentsView(), /* removeLastView */ true);
												return true;
							case "artikelen":	this.setCurrentView(new myAPP.views.ArticlesView(), /* removeLastView */ true);
												return true;
							// default to dashboard					
							default:			this.setCurrentView(new myAPP.views.DashboardView(), /* removeLastView */ true);																									
												return true;
						}						

					};				
					
	},

	updateNavigation: function (parameters) {						

						// remove previous markup
						$(".navigation").removeClass("selected");
						$(".navigation#_" + parameters[0]).addClass("selected");

						$("#navigation .sub-link").removeClass("selected");

						$("#navigation .sub-menu").animate({ height: 0 });
						$("#navigation .sub-menu#_" + parameters[0]).stop().animate({ height: 80});

						// markup sublink
						if (parameters[1]) {							
							$("#navigation .sub-menu#_" + parameters[0] + " .sub-link#_" + parameters[1]).addClass("selected");
						}
	},

	setSuperAdminView: function () {

					var self = this;

					var renderContent = JST['templates/login/on-session-superadmin.html']({ user: myAPP.currentUser.getAttributes() });															
					$(this.el).html( renderContent );	
					 
					// these collections are required by the program
					myAPP.debtors = new myAPP.collections.Debtors();					
					myAPP.invoices = new myAPP.collections.Invoices();
					myAPP.objections = new myAPP.collections.Objections();
					myAPP.paymentPlans = new myAPP.collections.PaymentPlans();
					myAPP.debtors.fetch();
					 
					 
					this.onSessionViewManager = new myAPP.views.ViewManager({ el: this.$el.find( "#mainpane" ), parent: this });
						
					this.onSessionViewManager.determineView = function (parameters, lastParameters) {

						if (lastParameters && lastParameters[0] === parameters[0]) {						
							return;
						}

						switch( parameters[0] ) {


							case "dashboard":	this.setCurrentView(new myAPP.views.DashboardView(), /* removeLastView */ true);
												return true;
							case "_accounts":	this.setCurrentView(new myAPP.views.AccountsView(), /* removeLastView */ true);
												return true;	
							
							
						}						

					};
	},

	render: function() {											
					// determine which view to render: on- or off-session
					if (myAPP.session.get('isActive')) {						
						this.onSessionViewManager.render();
					} else {						
						this.offSessionViewManager.render();				
					}					
					
	},

	newAccount: function () {
					var html = JST["templates/login/signup.html"]();					
					myAPP.animations.slideLeft({ oldElement: this.$el.find("#animationWrapper"), newElement: html });
					// overwrite the automatic width setting by the animation method
					this.$el.find("#signup-screen").width(360);
					myAPP.router.navigate("aanmelden");

	},

	navigate: function (event) {				

					var hash,
						$target;					

					if (myAPP.isFetchingResources)
						return;
										
					$target = $(event.currentTarget);
					// hackery to try to disable scrolling on click
					hash = $target.attr("id").replace(/_/, "");

					myAPP.router.navigate(hash, { trigger: true });
					return false;
	},

	navigateSubmenu: function (event) {
					
					var $target,
						id,
						parent;

					$(".sub-link").removeClass("selected");

					$target = $(event.target);
					$target.addClass("selected");
					// hackery to try to disable scrolling on click
					hash = $target.attr("id").replace(/_/, "");
					parentHash = $target.parent().attr("id").replace(/_/, "");

					console.log(hash, parentHash);

					myAPP.router.navigate(parentHash + "/" + hash, { trigger: true });

	},

	login: function () {

					this.offSessionViewManager.remove();
						
					if (myAPP.session.get( "superAdmin")) 
						this.initOnSuperAdminLogin();
					else
						this.initOnLogin();
	},

	logout: function ( event ) {
				
					var self = this;	

					confirm("Wilt u uitloggen?", function () {

						self.onSessionViewManager.remove();
						myAPP.logout();	
					});
					
	},

	keydownHandler: function (event) {
					this.$el.find("#master-search .placeholder").css({ display: "none" });
	},

	keyupHandler: function (event) {
					var $target = $( event.target );
					if (!$target.val())
						this.$el.find("#master-search .placeholder").css({ display: "block" });

	},

	autoCompleteHandler: function (event, $element) {					

					var id = $element.attr("data-autocomplete-value");
					var match = id.match(/(\w+)\/(\d+)/);

					switch (match[1]) {
						case "invoice":		myAPP.router.navigate("facturen/facturen/" + match[2], { trigger: true }); break;
						case "quote":		myAPP.router.navigate("facturen/offertes/" + match[2], { trigger: true }); break;
						case "debtor":		myAPP.router.navigate("debiteuren/debiteuren/" + match[2], { trigger: true }); break;
					}

	},

	showHelpLinks: function () {

					var $links = $("#help-function a");
					$links.each(function (index) {
						var offsetTop = index * 20 + 80;
						$(this).stop().css({ top: 60 }).animate({ opacity: 1, top: offsetTop }, { easing: "easeOutCubic" });

					});
					
	},

	hideHelpLinks: function () {

					var $links = $("#help-function a");
					$links.each(function (index) {
						$(this).stop().animate({ opacity: 0, top: 60 }, { easing: "easeOutCubic" });

					});
	},

	clickTutorialHandler: function (event) {

					var $target = $(event.target),
						tutorialName = $target.attr("data-tutorial"),
						tutorial = new Tutorial( myAPP.tutorials[ tutorialName ]);
					
					tutorial.start();

					event.preventDefault();

	},

	clickPlaceHolderHandler: function () {
					var hasFocus = $("#master-search input").is(":focus");					
					if (!hasFocus)
						$("#master-search input").focus();
	},

	showUser: function () {

					var id = myAPP.currentUser.get("id");
					myAPP.router.navigate("account/gebruikers/" + id, { trigger: true });

	},

	showAccount: function () {

					myAPP.router.navigate("account/instellingen", { trigger: true });

	},

	initializeMasterSearch: function () {
					var entries;

					// setup master search box
					entries = myAPP.debtors.createAutoCompleteEntries();					
					entries = entries.concat( myAPP.invoices.createAutoCompleteEntries());			
					entries = entries.concat( myAPP.quotes.createAutoCompleteEntries());			
					myAPP.AutoComplete.initialize( $("#master-search input"), entries);	
	},

	showSignupPopup: function () {

					// first, open up a popup
					myAPP.animations.openPopup( JST["templates/popups/signup-form.html"]({ }), function () {
						self.signupFormView.remove();						
					});

					// push Google Analytics event
					if (typeof _gaq != "undefined") {
						console.log("pushing open event to _gaq");
						_gaq.push(['_trackEvent', 'Aanmeldformulier', 'Open in de zandbak']);
					}

					// now, setup a signupFormView					
					this.signupFormView = new myAPP.views.SignupFormView({ model: new myAPP.models.Account() });
					this.signupFormView.setElement( $(".popup"));
	}

});



//------------------------------------



myAPP.views.ArticleView = Backbone.View.extend({

	events: {

		"click #delete.button": "deleteModel",		
		"click #save.button": "_saveModel",
		"click #cancel": "resetModel",
		"dropdown" : "dropdownHandler"		
	},

	initialize: function () { 
								var self = this;
								
								this.template = JST["templates/articles/article.html"];
								
								this.render();

								this.toastOnSave = "Artikel succesvol opgeslagen";
								this.toastOnError = "Artikel opslaan mislukt";

								// we need this additional update, to reinitialize the model used by this view
								// because of javascript closure?
								this.listenTo(myAPP, 'resourcesLoaded', function () {
									self.model = myAPP.articles.get(self.model.get("id"));
								});

								// we need to call the super method to activate the base class initialize method;
								Backbone.View.prototype.initialize.apply(this, arguments);


	},

	render: function () {
								var renderContent;

								renderContent = this.template({article: this.model.getAttributes()})
								this.$el.html(renderContent);
	},

	deleteModel: function () {
								var self = this;							

								var articleTitle = this.model.get('title');								
								
								confirm("artikel "+ articleTitle + " verwijderen?", function () {
								
									self.$el.startSpinner();
									self.model.destroy({
										success: function(model, response, options) {											
											self.$el.stopSpinner();						
											window.history.back();
										},
										error: function() {
											self.$el.stopSpinner();
											myAPP.trigger('toast', "verwijderen " + articleTitle + " mislukt", "error");
										}
									})

								})

								 
	},

	_saveModel: function () { 
								var self = this;

								var articleGroup;

								// get the articlegroup to which the article belongs, see if it changed

								var articleGroupId = this.model.get("article_group_id")
								if (articleGroupId) {
									articleGroup = myAPP.articleGroups.findWhere({id: articleGroupId})
								}
								
								var changedValues = this.model.getChangedValues();

								// confirm if user wants to move article to a different group;
								if (changedValues && _.has(changedValues, "article_group_id")) {							
									
									confirm("artikel " + this.model.get("title") + " verplaatsen naar groep " + articleGroup.get("title") + " ?", function () {
										self.saveModel({ success: function () { myAPP.animations.flashElement (self.$el, 'success' )}});
									})
									return;								
								}

								this.saveModel({
									success: function() {
										myAPP.animations.flashElement( self.$el, 'success')
									}, 
									error: function () { 
									}
								})

								

	},

	dropdownHandler: function (event, value) {

								var $target = $(event.target)
								var property = $target.attr("id")								

								if ($target.hasClass( "caret" )) {
									if (value !== "anders") {
										this.removeVariableVatField( event, value );
									}
									return;
								}

								if (property === "vat" && value === "anders") {
									this.setVariableVatField( event )
									return;
								}

								if (property === "article_group_id") {

									//var articleGroup = myAPP.articleGroups.findWhere({ id: value });								
									this.model.set({ article_group_id: value })
									return;

								} 

								this.model.set(property, value)
											
	},

	changeHandler: function (changedValues) {									
								
								for (var key in changedValues) { 

									if (key === "price")
										myAPP.animations.blink(this.$el.find("#price input"), myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(this.model.get(key)));


									else if (key === "title") {
										myAPP.animations.blink(this.$el.find("h2 .text"), this.model.get("title"))
									}

									else if (key === "article_number") {
										myAPP.animations.blink(this.$el.find(".number"), this.model.get("article_number"))
									}

									else if (key === "article_group_id") {
										myAPP.animations.blink(this.$el.find(".articleGroupName"), this.model.get("articleGroupName"))
									}	

									else if (key === "vat") {										
										myAPP.animations.blink(this.$el.find("#vat input"), this.model.get( key ))
									}

								}								
	},

	setVariableVatField: function ( event) {
								var self = this;

								var html = "<input type='text' name='vat'><div class='entype caret'>▾</div>";
								
								myAPP.animations.blink($(event.target), html, function () {
									self.$el.find( "#vat input" ) .val( "0%" ) .focus()	.select();
									self.$el.find(" #vat .caret") .addClass("myAPP-dropdown") .attr({ "data-dropdown": "vat" }) .css({ marginTop: 11 })
								});								

								this.$el.find("#vat").removeClass("button myAPP-dropdown")
										
 
	},

	removeVariableVatField: function (event, value) {

		//alert(" is this even called")

								var $cell = $(event.target).closest( "#vat" );

								$cell.find( ".caret" ).remove();

								$cell.find("input").remove();
								var $dropdown = $("<div class='button button-small myAPP-dropdown myAPP-dropdown-autoupdate' data-dropdown='vat' id='vat'>" +
									"<span class='value'>" + value + " %</span><span class='caret caret-small caret-down'></span> </div>")
									.text( value )
								$cell.prepend( $dropdown );	

								this.model.set({ vat: value })							
								
	},

}) .editable()  .validates() .saveable() 



//------------------------------------



myAPP.views.ArticlesCollectionView = Backbone.View.extend({

	events: {
		"click .table-body .table-row": "clickHandler",
		"click #delete.button": "deleteGroup",
		"click #new-article.button": "newArticle",
		"click #new-group.button": "newGroup"
	},

	initialize: function () { 
								this.template = JST["templates/articles/articles-collection.html"];
	},

	clickHandler: function (event) {
								var $target = $(event.currentTarget),
									id = $target.attr("id"),
									groupname;

								if ($target.hasClass("placeholder"))
									return;

								if ($target.hasClass("group")) {
									groupname = id; //$target.find("#title span").html();
								} else {									
									groupname = (this.collection && this.collection.get("id")) || "losse artikelen";
									groupname += "/" + id;
								}

								myAPP.router.navigate("artikelen/" + groupname, {trigger: true})

								// we need to call the super method to activate the base class initialize method;
								Backbone.View.prototype.initialize.apply(this, arguments);
	},

	deleteGroup: function () { 
								var self = this;

								if (!this.collection.title) 
									return;
								
								confirm("De artikelengroep "+ this.collection.title + " verwijderen?", function () {
		
									var articleGroup = myAPP.articleGroups.findWhere({ title: this.collection.title} );

									articleGroup.destroy({ success: function () { 
										myAPP.trigger('toast', 'groep ' + self.collection.title + " successvol verwijderd", "success")
										window.history.back();
									} })

									// find articles in the group; 
									var articles = myAPP.articles.where({ article_group_id: articleGroup.get("id")})
									if (articles.length > 0) {

										confirm("De artikelengroep " + this.collection.title + " bevat nog artikelen. Wilt u deze artikelen ook verwijderen?",
											function () {

												_.each(articles, function (article) { article.destroy() });				
											}, 
											function () {
												_.each(articles, function (article) { article.set({ article_group_id: null }); article.save(); })
											})
											
									}
								});								
								
								
	},

	newGroup: function () {
								myAPP.router.navigate( "artikelen/nieuwe-groep", { trigger: true })
	},

	newArticle: function () { 
								
								// pass group with le secret parameter
								
								if (this.collection.title) {									
									myAPP._articleGroupTitle = this.collection.title;
								}
								
								var articleGroupName = this.collection.title || "losse artikelen"

								myAPP.router.navigate("artikelen/" + articleGroupName + "/nieuw", {trigger: true})
	}
	
}) 

.paginated() 

.sortable()



//------------------------------------



myAPP.views.ArticlesView = Backbone.View.extend({

	events: {		
		"click .sidebar #new-article": "newArticle",
		"click .sidebar #all": "allArticles"
	},


	initialize: function () {		
								var renderContent,
									self = this;

								this.template = JST["templates/articles/articles.html"];
								renderContent = this.template();
								this.$el.html(renderContent);								

								// soft fade-in
								this.$el.find(".articles-pane").css({ opacity: 0 }).animate({ opacity: 1 })


								this.articlesViewManager = new myAPP.views.ViewManager({ el: this.$el.find(".articles-pane"), parent: this});

								this.collection = this.createCollection();

								this.articlesViewManager.collectionView = new myAPP.views.ArticlesCollectionView({ collection: this.collection})

								this.articlesViewManager.determineView = function (parameters, lastParameters) {

									// no parameters; show top level view
									if (!parameters[1]) {					

										this.collectionView.collection = self.createCollection();

										this.setCurrentView(this.collectionView, /* removeLastView */ true)
										this.animation = myAPP.animations.slideRight;
										return true;
									}
							
									if (parameters[1] === "nieuwe-groep") {
										this.setCurrentView(new myAPP.views.NewArticleGroupView())	
										this.animation = myAPP.animations.slideLeft;
										return true;
									}

									// group parameter set: show article-group;
									if (parameters[1] && !parameters[2]) {										

										var articleGroup = myAPP.articleGroups.findWhere({ id: String( parameters[1] ) })
										var articles = myAPP.articles.where({article_group_id: articleGroup.get("id")}),
											collection = new Backbone.Collection(articles)
											collection.title = articleGroup.get("title");
											collection.id = articleGroup.get("id");

										// coming back from article-view
										if (lastParameters && lastParameters[2]) {
											this.setCurrentView(new myAPP.views.ArticlesCollectionView({ collection: collection }), /* removeLastView */ true)
											this.animation = myAPP.animations.slideRight;

										} else {
											// coming from top level view; 
											this.setCurrentView(new myAPP.views.ArticlesCollectionView({collection: collection}));
											this.animation = myAPP.animations.slideLeft;
										}
										return true;

									}

									// article-parameter set: show article;
									if (parameters[2]) {

										this.animation = myAPP.animations.slideLeft

										if (parameters[2] === "nieuw") {

											this.setCurrentView(new myAPP.views.NewArticleView())											

										} else {

											var article = myAPP.articles.findWhere({id: parameters[2]})											
											// retain the oldView if we're coming from the top-level view; 
											this.setCurrentView(new myAPP.views.ArticleView({ model: article }));
										}
										
										return true;

									}

								}
	},

	render: function () {

								this.articlesViewManager.render();
	},

	createCollection: function () {
								// create a collection all articleGroups
								var collection = new Backbone.Collection(myAPP.articleGroups.models);								
								
								// overwrite Backbone's Add method to allow for models with similar IDs
								// as we won't use this 
								collection.add = function (model) { this.models.push(model) }

								// add groupless articles	
								var articles = myAPP.articles.each(function (article) {
									if  (Number(article.get("article_group_id")) === 0)  {
										collection.add(article)									
									}
								})
								
								_.extend(collection, {
									title: "Alle artikelen", 
									isRootLevel: true
								});
								
								return collection;

	},

	newArticle: function () {
								myAPP.router.navigate("artikelen/losse producten/nieuw", { trigger: true })

	},

	allArticles: function () { 
								myAPP.router.navigate("artikelen", { trigger: true })
	}






}) .collapseSidebar();



//------------------------------------



myAPP.views.NewArticleGroupView = Backbone.View.extend({

	events: {

		'click #save' : "clickHandler"
	},

	initialize: function () { 
								
								this.model = new myAPP.models.ArticleGroup();
								this.template = JST["templates/articles/new-article-group.html"];
								renderContent = this.template({articleGroup: this.model.getAttributes()})
								this.$el.html(renderContent);
								this.toastOnSave = "Artikelgroep succesvol aangemaakt"
								this.toastOnError = "Aanmaken artikelgroep mislukt"

								//this.listenTo(this.model, "change", this.changeHandler)
	},	

	clickHandler: function () { 
								var self = this;

								this.saveModel({
									success: function () {
										myAPP.articleGroups.add(self.model);
										window.history.back();
									}
								});
	},

	changeHandler: function (changedValues) {

								if (changedValues.title) {
									myAPP.animations.blink(this.$el.find("h2 .text"), changedValues.title)
								}								

	}

}) .editable() .saveable() .validates();



//------------------------------------



myAPP.views.NewArticleView = myAPP.views.ArticleView.extend({


	events: {

		'click #save.button' : '_saveModel',
		'dropdown' : 'dropdownHandler'

	},

	initialize: function () { 
								this.model = new myAPP.models.Article();

								// set articlegroup on model if passed 
								if (myAPP._articleGroupTitle) {										
									var articleGroup = myAPP.articleGroups.findWhere({title: myAPP._articleGroupTitle})									
									if (articleGroup)
										this.model.set({article_group_id: articleGroup.get("id") });
									myAPP._articleGroupTitle = null;
								}

								// render template
								this.template = JST["templates/articles/new-article.html"];
								renderContent = this.template({article: this.model.getAttributes()})
								this.$el.html(renderContent);		
								
								this.toastOnSave = "Artikel " + this.model.get("title") + " succesvol opgeslagen;"	
								this.toastOnError = "Aanmaken artikel mislukt"				

								myAPP.model = this.model;
								myAPP.view = this.view;
	},

	_saveModel: function () { 
								var self = this;	
								
								this.saveModel({success: function () {
									
									window.history.back();
									myAPP.articles.add(self.model)									

								}});
	},

	dropdownHandler: function (event, value) {								

								this.model.set({ article_group_id: value })

	}

}) .editable() .saveable() .validates();



//------------------------------------



myAPP.createChart = function (type, dataSets, $element ) {

	if ($element.length === 0)
		return;

	var maxValue = 0, _maxValue = 0;

	for (var i = 0; i < dataSets.length; i++)  {

		_maxValue = _.max(dataSets[i].data, function (value) { return Number(value); });
		if (_maxValue > maxValue)
			maxValue = _maxValue
	}

	//default options
	var options = {
		animation: true,
		scaleOverride: true,
		scaleSteps: 3,
		scaleStepWidth: Math.ceil(maxValue / 3),								
		scaleFontColor: "#ccc",
		barValueSpacing: 2
	};	

	// data properties
	var _data = {
		labels: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
		datasets : dataSets		
	}	

	var context = $element[0]; 
	
	// lack of canvas support? No animations;
	if(!Modernizr.canvas) {

		G_vmlCanvasManager.initElement(context);
		options.animation = false;
	}
	context = context.getContext("2d");
	var chart = new Chart(context);

	switch (type) {

		case "bar":		chart.Bar(_data, options); break;
		case "line":	chart.Line(_data, options); break;
	}
		
}

myAPP.createDoughnutChart = function (data, $element) {

	if ($element.length === 0)
		return;

	var context = $element[0];

	//default options
	var options = {
		animation: true,
		animationEasing: "easeOutCubic"
		
	}; 
	
	// lack of canvas support? No animations;
	if(!Modernizr.canvas) {

		G_vmlCanvasManager.initElement(context);
		options.animation = false;
	}
	context = context.getContext("2d");
	var chart = new Chart(context);
	chart.Doughnut(data, options)
}



//------------------------------------



myAPP.views.DashboardView = Backbone.View.extend({

	events: {

		"click ul.notifications li": "notificationsHandler",
		"click #finalize-account": "finalizeAccount",
		"click #new-invoice": "newInvoice"
	},

	initialize: function() {
						

						this.render();

						// we need to call the super method to activate the base class initialize method;
						Backbone.View.prototype.initialize.apply(this, arguments);
						
	},

	render: function () {
						console.log('rendaring');

						var renderContent; 

						this.template = JST["templates/dashboard/dashboard.html"];					

						// myAPP.invoices.calculateStatistics();
						// myAPP.payments.calculateStatistics();						
							
						renderContent = this.template({ 
							totalDue: myAPP.invoices.calculateTotalDue(),
							vatDue: myAPP.invoices.calculateVatDue(),
							turnover: myAPP.invoices.calculateTurnover(),
							percentages: myAPP.invoices.getPaymentStatusPercentages(),
							notifications: myAPP.notifications,
							account: myAPP.currentAccount.getAttributes()
						});
						
						this.$el.html(renderContent)

						var self = this;

						this.$el.css({ opacity: 0 }).animate({ opacity: 1 })
			
						setTimeout(function() { self.initializeCharts() }, 0)

						myAPP.loadImage(this.$el.find(".logo-container"), myAPP.accountSettings.get("logoUrl"), 190, 130)
	},

	initializeCharts: function () { 
	
						var  randomData = function (max) {
							max = max || 50; 
							var array = [];
							for (var i = 0; i < 12; i++)
								array.push(_.random(max))
							return array
						}

						var currentYear = function() {
 							return new Date().getFullYear();
						}

						// invoices

						// number

						var $canvas = this.$el.find("#invoices-number");
						myAPP.createChart("bar", 
							[								
								{ fillColor: "rgba(128, 128, 128, .1)", strokeColor: "rgba(128, 128, 128, 1)", 
									data: myAPP.invoices.getStatistics( currentYear(), "sent" ) }
							], $canvas)

						$canvas = this.$el.find("#invoices-value");
						myAPP.createChart("bar",
							[
								{ fillColor: "rgba(128, 128, 128, .1)", strokeColor: "rgba(128, 128, 128, 1)", 
									data: myAPP.invoices.getStatistics( currentYear(), "total" ) }
						], $canvas)						

						$canvas = this.$el.find("#payments");
						myAPP.createChart("bar",
							[								
								{ fillColor: "rgba(128, 128, 128, .1)", strokeColor: "rgba(128, 128, 128, 1)", 
									data: myAPP.payments.getStatistics( currentYear(), "total" ) }								
							], $canvas)	

						$canvas = this.$el.find("#payments-on-time");
						myAPP.createChart("line",
							[
								
								// invoices due;
								{  fillColor: "rgba(128, 128, 128, .1)", strokeColor: "rgba(128, 128, 128, 1)", 
									pointColor: "rgba(128, 128, 128, 1)", pointStrokeColor: "rgba(255, 255, 255, 1)", 
									data: myAPP.invoices.getStatistics( currentYear(), "sent" ) },

								// paid in time
								{ fillColor: "rgba(124, 197, 95, .1)", strokeColor: "rgba(124, 197, 95, 1)", 
									pointColor: "rgba(124, 197, 95, 1)", pointStrokeColor: "rgba(255, 255, 255, 1)", 
									data: myAPP.invoices.getStatistics( currentYear(), "paidInTime" ) }

							], $canvas)

						var percentages = myAPP.invoices.getPaymentStatusPercentages();

						$canvas = this.$el.find("#pie-payments-on-time");
						myAPP.createDoughnutChart([
							{ value: percentages.paidInTime, color: "#4080be" },
							{ value: 100 - percentages.paidInTime, color: "#84b3e0" }							
							], $canvas)

						$canvas = this.$el.find("#pie-reminder");
						myAPP.createDoughnutChart([
							{ value: percentages.paidAfterReminder, color: "#4080be" },
							{ value: 100 - percentages.paidAfterReminder, color: "#84b3e0" }
							
							], $canvas)

						$canvas = this.$el.find("#pie-summation");
						myAPP.createDoughnutChart([
							{ value: percentages.paidAfterSummation, color: "#4080be" },
							{ value: 100 - percentages.paidAfterSummation, color: "#84b3e0" }
							
							], $canvas)

	},

	notificationsHandler: function ( event ) { 

						var id = $(event.currentTarget).attr("id"),
							notification = myAPP.notifications.get(id);
							invoice = myAPP.invoices.get(notification.get("invoice_id"));

						switch (notification.get("type")) {

							case "invoice":
							myAPP.router.navigate("facturen/facturen/" + invoice.get("id"), { trigger: true })
							break;

							case "objection": 
							var objection = myAPP.objections.findWhere({ invoice_id: invoice.get("id") });
							myAPP.router.navigate("debiteuren/bezwaren/" + objection.get("id"), { trigger: true });
							break;

							// case "payment": 
							// var payment = myAPP.payments.findWhere({ invoice_id: invoice.get("id") });
							// console.log(payment, invoice, invoice.get("id"))
							// myAPP.router.navigate("betalingen/" + payment.get("id"), { trigger: true });
							// break;

							case "paymentPlan": 
							var paymentPlan = myAPP.paymentPlans.findWhere({ invoice_id: invoice.get("id") });
							myAPP.router.navigate("debiteuren/betalingsregelingen/" + paymentPlan.get("id"), { trigger: true });
							break;						

						} 

	},

	finalizeAccount: function () {
						var self = this;

						// this shouldn't be necessary.
						if ( !myAPP.currentAccount.get( "canFinalize" )) {
							alert("Uw account is al definitief overgezet naar KasCo.")
							return;
						}

						var importDate = myAPP.templateHelpers.parseDate( myAPP.modelHelpers.parseDate( myAPP.currentAccount.get( "created")))

						var html = JST["templates/popups/finalize-account.html"]({ importDate: importDate });

						myAPP.animations.openPopup(html);

						$(".popup #finalize").on("click", function () { 
							var value = $("input#agree")[0].checked;
							if (!value) {
								alert("U dient de Algemene Voorwaarden van KasCo te aanvaarden als u definitief wil overstappen.")
								return;
							}
							myAPP.animations.closePopup();
							finalize();
						})

						$(".popup #cancel").on("click", function () { myAPP.animations.closePopup() })

						var finalize =	function () {

							self.$el.startSpinner(); 
							myAPP.currentAccount.finalize({
								success: function () {
									self.$el.stopSpinner();
									// remove button
									self.$el.find("#finalize-account").remove();

									myAPP.trigger("toast", "Uw account is overgezet", "success");
									alert("Uw account is definitief overgezet naar KasCo. Uw facturen.net account is geblokkeerd. U kunt nu facturen versturen via KasCo.")
								},
								error: function () {

									self.$el.stopSpinner();
									myAPP.trigger('toast', "Fout bij overzetten", "error");
									alert("Er zijn uitzonderingen gevonden in uw account. Om de veiligheid van uw gegevens te garanderen kan KasCo uw account niet volledig automatisch overzetten. Wanneer u een e-mail stuurt aan <strong><a href='mailto:info@kascooperatie.nl?subject=" + escape("Definitief overzetten account") + "' target='_blank'>info@kascooperatie.nl</a></Strong> wordt u snel gebeld om uw account definitief over te zetten. U kunt ons ook zelf bellen op 020-8200120.");										
		
								}
							});


						}
	},

	newInvoice: function () {

				myAPP.router.navigate("facturen/facturen/nieuw", { trigger: true });
	}

})



//------------------------------------



myAPP.views.DebtorView = Backbone.View.extend({

	events: {
		//"click .table-body .table-row": "clickInvoiceHandler",
		"click #debtor-details, #debtor-settings": "showSubScreen",		
		"click #save.button" : "saveModel",
		"click #cancel.button": "resetModel",
		"click #delete.button": "deleteModel",
		"click #new-invoice.button" : "newInvoice",

		"dropdown": "dropdownHandler"

	},
	
	initialize: function () { 
									var currentYear = function() {
 										return new Date().getFullYear();
									}

									var self = this,
										renderContent;

									this.template = JST["templates/debtors/debtor.html"];

									// no debtor was found for this hash;
									if(!this.model) {	
										this.model = new myAPP.models.Debtor();
										this.template = JST["templates/debtors/debtor-not-found.html"];										
									}

									var id = this.model.get("id");

									renderContent = this.template({ debtor: this.model.getAttributes()  });
									this.$el.html(renderContent);

									var invoices = new myAPP.collections.Invoices ( this.model.invoices.models );

									this.invoicesCollectionView = new myAPP.views.InvoicesCollectionView({ collection: invoices, el: this.$el.find(".invoices") });
									this.invoicesCollectionView.render();								

									this.listenTo(this, 'changedValues', function () { self.showButtons(); });

									myAPP.debtor = this.model;

									this.toastOnError = "Opslaan debiteur mislukt!";
									this.toastOnSave = "Debiteur succesvol opgeslagen";


									// create statistics charts;

									invoices.calculateStatistics();

									var $canvas = this.$el.find('#invoices-value');
									myAPP.createChart("bar",
										[
											{ fillColor: "rgba(128, 128, 128, .1)", strokeColor: "rgba(128, 128, 128, 1)", 
													data: invoices.getStatistics( currentYear(), "monthlyTotals" ) }


										], $canvas);

									var percentages = invoices.getPaymentStatusPercentages();

									$canvas = this.$el.find("#pie-payments-on-time");
									myAPP.createDoughnutChart([
											{ value: percentages.paidInTime, color: "#4080be" },
											{ value: 100 - percentages.paidInTime, color: "#84b3e0" }							
										], $canvas);

									myAPP.animations.blink($canvas.siblings(".number"), percentages.paidInTime.toFixed(1) + " %");

									$canvas = this.$el.find("#pie-reminder");
									myAPP.createDoughnutChart([
											{ value: percentages.paidAfterReminder, color: "#4080be" },
											{ value: 100 - percentages.paidAfterReminder, color: "#84b3e0" }										
										], $canvas);
									myAPP.animations.blink($canvas.siblings(".number"), percentages.paidAfterReminder.toFixed(1) + " %");


									$canvas = this.$el.find("#pie-summation");
									myAPP.createDoughnutChart([
											{ value: percentages.paidAfterSummation, color: "#4080be" },
											{ value: 100 - percentages.paidAfterSummation, color: "#84b3e0" }											
										], $canvas);
									myAPP.animations.blink($canvas.siblings(".number"), percentages.paidAfterSummation.toFixed(1) + " %");

									// we need this additional update, to reinitialize the model used by this view
									// because of javascript closure?
									this.listenTo(myAPP, 'resourcesLoaded', function () {
										self.model = myAPP.debtors.get(self.model.get("id"));
									});

									// we need to call the super method to activate the base class initialize method;
									Backbone.View.prototype.initialize.apply(this, arguments);

	},

	render: function () { 
					
									if (this.isShowingSubscreen)
										this.hideSubscreen();
									
	},

	clickInvoiceHandler: function (event) {									
									var id = $(event.currentTarget).attr("id");
									myAPP.router.navigate("facturen/facturen/" + id, { trigger: true });

	},

	showSubScreen : function (screen) {	
									var html;

									// var screen = $(event.currentTarget).attr("id");

									if (this.isShowingSubscreen === screen)
										return;

									this.isShowingSubscreen = screen;

									var parameters = Backbone.history.getParameters();									
									if (!parameters[3])
										myAPP.router.navigate(parameters[0] + "/" + parameters[1] + "/" + parameters[2] + "/debiteur");

									if (screen === "debtor-details")
										html = JST["templates/debtors/new-debtor.html"]({ debtor: this.model.getAttributes() });

									var $oldElement = this.$el.find(".body-content, .subscreen"), $newElement = $(html).find(".new-body-content");									

									myAPP.animations.drop({ oldElement: $oldElement, newElement: $newElement });

									$(".debtor").css({ minHeight: 500 });
	},

	hideSubscreen: function () {
									var self = this;
									this.resetModel();
									myAPP.animations.lift({ oldElement: this.$el.find(".new-body-content"), newElement: this.$el.find(".body-content"), remove: true, 
										callback: function () { self.isShowingSubscreen = false; $(".debtor").css({ minHeight: 0 }); } });									

	},

	showButtons: function () { 
									this.$el.find(".buttons").stop().animate({ opacity: 1});
	},

	resetModel: function () { 
									this.resetModel();
	},

	deleteModel: function () {
									var self = this;							

									var debtorname = this.model.get('company_name');
									confirm("Debiteur "+ debtorname + " verwijderen?", function () {									
									
										self.$el.startSpinner();
										self.model.destroy({
											success: function(model, response, options) {											
												self.$el.stopSpinner();
												myAPP.trigger('toast', "debiteur " + debtorname + " verwijderd", "success");					
												
												// navigate back to collection view											
												myAPP.router.navigate("debiteuren/debiteuren", { trigger: true });
											},
											error: function() {
												self.$el.stopSpinner();
												myAPP.trigger('toast', "verwijderen " + debtorname + " mislukt", "error");
											}
										});
									});

	},

	newInvoice: function () { 

									myAPP._debtor_id = this.model.get("id");
									myAPP.clearTooltips();
									myAPP.router.navigate("facturen/facturen/nieuw", {trigger: true});

	},

	dropdownHandler: function (event, value) {

									
									var property = $(event.target).attr("id");
									console.log(property, value);

									if (property === "settings") {

										switch( value ) {
											case "debtorInfo": this.showSubScreen("debtor-details"); break;
										}

										return;

									}

									if (property === "actions") {

										switch( value ) {
											case "newInvoice": this.newInvoice(); break;
											case "delete": this.deleteModel(); break;

										}

										return;
									}
									
									this.model.set(property, value);
	},

	remove: function () {

									this.invoicesCollectionView.remove();
									Backbone.View.prototype.remove.apply(this, arguments);
	},

	changeHandler: function (changedValues) {

									if (!changedValues)
										return;

									if (changedValues.company_name) {
										myAPP.animations.blink(this.$el.find("#debtor .value"), changedValues.company_name);
									}							


	}



}) .editable() .saveable() .validates();



//------------------------------------



myAPP.views.DebtorsCollectionView = Backbone.View.extend({

	events: {
		"click .table-body .table-row": "clickHandler",
		"click #previous-page": "previousPage",
		"click #next-page" : "nextPage"
	},

	initialize: function () {
						var self = this;						
						
						this.template = JST["templates/debtors/debtors-collection.html"];
						this.listenTo(this, 'showPage previousPage nextPage', this.updatePageNumbers);

						this.collection = new myAPP.collections.Debtors( myAPP.debtors.where({ deleted: 0 }) );
				
						this.listenTo ( myAPP.debtors, 'add remove ', function () {							
							this.collection = new myAPP.collections.Debtors(myAPP.debtors.where({ deleted: 0 }) );
						});

						// we need to call the super method to activate the base class initialize method;
						Backbone.View.prototype.initialize.apply(this, arguments);

	},

	clickHandler : function (event) {
						var $target = $(event.currentTarget);

						if ($target.hasClass("placeholder"))
							return;
						
						var id = $target.attr("id");
						myAPP.router.navigate("debiteuren/debiteuren/" + id, {trigger: true});
	}
	
}) 

.paginated() 

.sortable({
	company_name: function (a, b) {
		var valueA = (a.get( "company_name" ) || "").toLowerCase(),
			valueB = (b.get( "company_name" ) || "").toLowerCase();
		
		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [Number(a.get("balance")), Number(b.get("balance"))];
		}

	},
	balance: function (a, b) {
		var valueA = Number(a.get("balance")), 
			valueB = Number(b.get("balance"));

		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [(a.get( "company_name" ) || "").toLowerCase(), (b.get( "company_name" ) || "").toLowerCase()];
		}
	}
});



//------------------------------------



myAPP.views.DebtorsView = Backbone.View.extend({

	events: {		
		"click .button#new": "newDebtor"
	},

	initialize: function() {
						var renderContent; 
						this.template = JST["templates/debtors/debtors.html"];
						//myAPP.currentAccount.fetch();
						renderContent = this.template({ debtors: myAPP.debtors.toJSON() });
						this.$el.html(renderContent)

						// soft fade-in
						this.$el.find(".debtors-pane").css({ opacity: 0 }).animate({ opacity: 1 })

						this.debtorsViewManager = new myAPP.views.ViewManager({el: this.$el.find(".debtors-pane"), parent: this});
					
						this.debtorsViewManager.determineView = function (parameters, lastParameters) { 

							var view;

							// filter out changes that don't affect this view;
							if (lastParameters && lastParameters[1] === parameters[1] && lastParameters[2] === parameters[2])								
								return;

							if (parameters[2]) {

								switch( parameters[1] ) {

									case "debiteuren":	if (parameters[2] === "nieuw") {
														view = new myAPP.views.NewDebtorView({ model: new myAPP.models.Debtor() })
														} else {
															var debtor = myAPP.debtors.get( parameters[2] );
															view = new myAPP.views.DebtorView({ model: debtor });
														}
														break;

									case "bezwaren":	var objection = myAPP.objections.findWhere({ id: parameters[2] });
														view = new myAPP.views.ObjectionView({ model: objection });
														break;

									case "betalingsregelingen":

														var paymentPlan = myAPP.paymentPlans.findWhere({ id: parameters[2] });
														view = new myAPP.views.PaymentPlanView({ model: paymentPlan });
														break;

								}

								this.setCurrentView( view, /* removeLastView */ lastParameters && lastParameters[1] !== parameters[1]);
								this.animation = myAPP.animations.slideLeft;
								return true;
							
							} else {

								if (this._collectionView && lastParameters && lastParameters[1] === parameters[1]) {

									view = this._collectionView;
									this.animation = myAPP.animations.slideRight;

								} else {

									switch( parameters[1] ) {
										
										case "debiteuren":				view = new myAPP.views.DebtorsCollectionView(); break;
										case "bezwaren":				view = new myAPP.views.ObjectionsCollectionView(); break;																		
										case "betalingsregelingen":		view = new myAPP.views.PaymentPlansCollectionView(); break;
									}

									this._collectionView = view;
									this.animation = myAPP.animations.drop;
									
								}

								this.setCurrentView( view, /* removeLastView */ true );								
								return true;						
							}				

						}
												
	},

	render: function (parameters, lastParameters) { 

						//var parameters = Backbone.history.getParameters();						

						//  set the correct sidebar tab to active
						this.$el.find(".sidebar li.tab").removeClass("active");
						if (parameters && parameters[1])
							this.$el.find(".sidebar li.tab#" + parameters[1]).addClass("active");

						this.debtorsViewManager.render();
	},

	clickHandler: function (event) {						
						if (this.debtorsViewManager.isAnimating)
							return;
						var $target = $(event.currentTarget);
						var section =  $target.attr("id");
						myAPP.router.navigate("debiteuren/" + section, {trigger: true})

	},

	newDebtor: function () {
						myAPP.router.navigate("debiteuren/debiteuren/nieuw", {trigger: true})

	}




}) .collapseSidebar();



//------------------------------------



myAPP.views.NewDebtorView = Backbone.View.extend({

	events: {
			
		"click #save" : "clickHandler",
		"dropdown": "dropdownHandler"
	},

	initialize: function () {
		
							if (!this.model)								
								this.model = new myAPP.models.Debtor();							

							this.template = JST["templates/debtors/new-debtor.html"];
							var renderContent = this.template({ debtor: this.model.getAttributes() })
							this.$el.html(renderContent);


							this.toastOnError = myAPP.texts.toasts.errorOnCreate;
							this.toastOnSave = myAPP.texts.toasts.successOnDebtorCreate.replace(/%name%/, this.model.get("company_name"))
							
							// debugging
							myAPP.view = this;
	},

	clickHandler: function () {
							var self = this;

							this.saveModel({ 
								success: function () { self.success() } 
							})

	},

	success: function () {

							myAPP.animations.flashElement(this.$el, 'success');									
							// add debtor to collection
							myAPP.debtors.add( this.model );									
							window.history.back();

	},

	dropdownHandler: function (event, value) { 
							var property = $(event.target).attr("id");
							this.model.set(property, value)
	},

	changeHandler: function (changedValues) { 
							

							if (!changedValues) {
								console.warn("*** no changedValues despite change event: indicates possible error")
								return;
							}
							
							if (changedValues.company_name) {
								myAPP.animations.blink(this.$el.find(".head h2 .text, .head #debtor .value"), changedValues.company_name)
							}

							if (changedValues.email) {
								myAPP.animations.blink(this.$el.find(".head .email"), changedValues.email)	
							}
	}

}) .editable() .saveable() .validates();



//------------------------------------



myAPP.views.ObjectionView = Backbone.View.extend({

	events: {
		"click .invoice-details": "showInvoice",
		"click #debtor .value": "showDebtor",

		"click #reply.button" : "reply",
		"click #close.button": "close"	

	},
	
	initialize: function () { 
									var self = this,
										renderContent;

									this.template = JST["templates/debtors/objection.html"];

									this.invoice = myAPP.invoices.findWhere({ id: this.model.get( "invoice_id" ) });
									this.debtor = myAPP.debtors.findWhere({ id: this.model.get( "account_debtor_id" ) })

									this.render();

									this.listenTo(this.model, 'sync', function () { self.render(); });

									if (!this.debtor)
										this.debtor = new myAPP.models.Debtor();

									if (!this.invoice) {		
										// if the invoice is archived, fetch it from server
										this.invoice = new myAPP.models.Invoice({ id: this.model.get("invoice_id") });

										this.$el.find(".invoice-details").startSpinner();										
										this.invoice.fetch({ success: function () {
											self.$el.find(".invoice-details").stopSpinner();
											myAPP.animations.blink(self.$el.find(".invoice-details"), 
												$(self.renderTemplate()).find(".invoice-details").children());
											self.invoiceIsArchived = true;
										}})
									}
									
									// we need this additional update, to reinitialize the model used by this view
									// because of javascript closure?
									this.listenTo(myAPP, 'resourcesLoaded', function () {
										self.model = myAPP.objections.get(self.model.get("id"));
										self.invoice = myAPP.invoices.get(self.model.get("invoice_id"));
										self.debtor = myAPP.debtors.get(self.model.get("account_debtor_id"));

									});

									// we need to call the super method to activate the base class initialize method;
									Backbone.View.prototype.initialize.apply(this, arguments);

	},

	render: function () {
									this.$el.html( this.renderTemplate());	
	},

	renderTemplate: function () {

									return this.template({ 
										objection: this.model.getAttributes(), 
										invoice: (this.invoice && this.invoice.getAttributes()) || {}, 
										debtor: this.debtor && this.debtor.getAttributes() || {},
										isSuperUser: myAPP.currentUser.get("role") === "superadmin" ? true : false
									})

	},

	showInvoice: function () {
									if (this.invoiceIsArchived) {
										alert("Deze factuur is gearchiveerd")
										return;
									}

									var invoice_id = this.model.get("invoice_id");
									myAPP.router.navigate("facturen/facturen/" + invoice_id, { trigger: true })

	},

	reply: function () {
									var self = this;

									var $html = $(JST["templates/popups/objection-reply.html"]());
									myAPP.animations.openPopup($html);

									$("#send").on("click", function () {

										var reaction = $("textarea#reply").val();
										if (!reaction) {
											myAPP.animations.addErrorMarkup($("textarea"), myAPP.texts.errors.emptyTextArea)
											return;
										}

										$(".popup .wrapper").startSpinner();

										self.model.save({ reaction: reaction }, {
											success: function () {
												$(".popup .wrapper").stopSpinner();
												//myAPP.animations.closePopup();

												myAPP.animations.blink(self.$el.find(".right"), "<span class=\"description\">Uw reactie</span><div class=\"content\">" + reaction + "</div>");

												myAPP.animations.blink($(".popup .body"),  $("<div>" + myAPP.texts.replySent + "</div>"));

												myAPP.animations.blink($("#send"), "<span class=\"entype\">" + myAPP.templateHelpers.charCodes.close +  "</span>Sluiten");
												$("#send").attr({ id: "close"})
													.addClass("close-button")
													.on("click", function () { myAPP.animations.closePopup() })

											},
											patch: true
										})

									})
		
	},

	close: function () { 
									var self = this;

									confirm("Bezwaar sluiten?", function () {

										self.$el.startSpinner();

										self.model.set({ status: "inactive" });
										self.model.save({ status: "inactive" }, {
											patch: true,
											success: function () { 
												myAPP.trigger('toast', 'Bezwaar gesloten', 'success')
												self.$el.stopSpinner();
											},
											error: function () {
												myAPP.trigger('toast', 'Bezwaar sluiten mislukt', 'error')
												self.$el.stopSpinner();
											}
										})
									})
	},

	showDebtor: function () {

							myAPP.router.navigate("debiteuren/debiteuren/" + this.model.get( "account_debtor_id" ), { trigger: true })
	}

})



//------------------------------------



myAPP.views.ObjectionsCollectionView = Backbone.View.extend({

	events: {
		"click .list-item": "clickHandler"		
	},

	initialize: function () {						
						var self = this;

						this.template = JST["templates/debtors/objections-collection.html"];
						this.listenTo(this, 'showPage previousPage nextPage', this.updatePageNumbers)
				
						this.collection = myAPP.objections;

						this.render();

						this.listenTo(myAPP, 'resourcesLoaded', function () {
							// get pointer to the correct (new) collection
							self.collection = myAPP.objections;
							self.render();
						})

						// we need to call the super method to activate the base class initialize method;
						Backbone.View.prototype.initialize.apply(this, arguments);
	},

	render: function () {

						this.$el.html(this.template({
							collection: this.collection
						}));
	},

	clickHandler : function (event) {
						var $target = $(event.currentTarget);

						if ($target.hasClass("placeholder"))
							return
						
						var id = $target.attr("id");
						myAPP.router.navigate("debiteuren/bezwaren/" + id, {trigger: true})
	}
	
}) 



//------------------------------------



myAPP.views.PaymentPlanView = Backbone.View.extend({

	events: {
		"click .invoice-details": "showInvoice",
		// "click #debtor-details, #debtor-settings": "showSubScreen",		
		// "click #save.button" : "saveModel",
		// "click #cancel.button": "resetModel",
		// "click #delete.button": "deleteModel",
		"click #accept.button": "acceptPaymentPlan",
		"click #reject.button": "rejectPaymentPlan"
		// "dropdown": "dropdownHandler"

	},
	
	initialize: function () { 
									this.template = JST["templates/debtors/payment-plan.html"];

									var invoice = myAPP.invoices.findWhere({ id: String(this.model.get("invoice_id")) }),
										debtor = myAPP.debtors.get( this.model.get( "account_debtor_id" ))

									this.render();

									// we need to call the super method to activate the base class initialize method;
									Backbone.View.prototype.initialize.apply(this, arguments);

	},

	render: function () {
									var renderContent;
									renderContent = this.template({ 
										paymentPlan: this.model.getAttributes(), 
										invoice: invoice.getAttributes(),
										debtor: debtor.getAttributes()
									})
									this.$el.html(renderContent);
	},

	showInvoice: function () {

									var invoice_id = this.model.get("invoice_id");
									myAPP.router.navigate("facturen/facturen/" + invoice_id, { trigger: true })

	},

	acceptPaymentPlan: function () {
									var self = this;

									// var $html = $(JST["templates/popups/objection-reply.html"]());
									// myAPP.animations.openPopup($html);

									confirm("Betalingsplan accepteren?", function () {
									
										self.saveModel({ 
											attributes: { status: "approved" },
											success: function () { 
												myAPP.animations.blink($("#status .value"), "<div class=\"entype\">" + myAPP.templateHelpers.charCodes.active
												 + "</div><div class=\"text\">lopend");
												$("#status .value").addClass("success")
												myAPP.animations.blink($("#plan"), "Betalingsregeling");

												var $buttons = self.$el.find(".buttons");
												$buttons.animate({ opacity: 0 }, { complete: function () { $buttons.remove() } })
					
											}

										})
									});
		
	},

	rejectPaymentPlan: function () {
									var self = this;

									confirm("Betalingsplan afwijzen?", function () {
										self.saveModel({ 
											attributes: { status: "rejected" },
											success: function () { 
												myAPP.animations.blink($("#status .value"), "<div class=\"entype\">" + myAPP.templateHelpers.charCodes.rejected
												 + "</div><div class=\"text\">afgewezen");
												$("#status .value").addClass("error");
												

												var $buttons = self.$el.find(".buttons");
												$buttons.animate({ opacity: 0 }, { complete: function () { $buttons.remove() } })
					
											}

										})
									});
		
	}



}) .saveable(); 



//------------------------------------



myAPP.views.PaymentPlansCollectionView = Backbone.View.extend({

	events: {
		"click .list-item": "clickHandler",
		"click #previous-page": "previousPage",
		"click #next-page" : "nextPage"
	},

	initialize: function () {					
						var self = this;

						this.template = JST["templates/debtors/payment-plans-collection.html"];
						this.listenTo(this, 'showPage previousPage nextPage', this.updatePageNumbers)

						this.collection = myAPP.paymentPlans;

						// we need to call the super method to activate the base class initialize method;
						Backbone.View.prototype.initialize.apply(this, arguments);
				
	},

	clickHandler : function (event) {
						var $target = $(event.currentTarget);

						if ($target.hasClass("placeholder"))
							return
						
						var id = $target.attr("id");
						myAPP.router.navigate("debiteuren/betalingsregelingen/" + id, {trigger: true})
	}
	
}) .paginated() .sortable({
							
						});



//------------------------------------



// myAPP.views.PaymentPlansView = Backbone.View.extend({

// 	events: {

// 	},

// 	initialize: function() {
// 							var self = this;
// 							this.template = JST["templates/debtors/payment-plans.html"];
// 							var renderContent = this.template();
// 							this.$el.html(renderContent);
							
// 							this.collection = myAPP.paymentPlans;
// 							if (!myAPP.paymentPlans)
// 								throw "Error: myAPP.paymentPlans is empty!";	

// 							this.paymentplansPane = new myAPP.views.PaneView({el: this.$el.find(".payment-plans-collection-pane"), parent: this});

// 							this.paymentplansPane.collectionView = new myAPP.views.PaymentPlansCollectionView({collection: self.collection})

// 							this.paymentplansPane.determineView = function (parameters, lastParameters) { 

// 								if (lastParameters && lastParameters[2] === parameters[2])
// 									return;

// 								if (parameters[2]) {

// 									// if param 2 is a number
// 									if (!isNaN(Number(parameters[2]))) {										
// 										var paymentPlan = self.collection.findWhere({id: parameters[2] });																	
// 										this.setCurrentView(new myAPP.views.PaymentPlanView({ model: paymentPlan }))
// 										this.animation = myAPP.animations.slideLeft;
// 										return true;
// 									} 

// 								} 

// 								this.setCurrentView(this.collectionView, /* removeOldView*/ true);
// 								this.animation = myAPP.animations.slideRight;
// 								return true;
							
// 							}
// 	},

// 	render: function ()  {
// 							// this.createCollection();
// 							this.paymentplansPane.render();
// 	}


// });






//------------------------------------



myAPP.views.EditInvoiceView = Backbone.View.extend({

	events: {
		
		"dropdown": "dropdownHandler",
		
		"keydown input": "keydownHandler",
		"keyup input": "keyupHandler",

		// click events
		"click": "clickHandler",

		// keup
		"keyup #account_debtor_id input": "focusHandler",

		// change events for input fields; don't use editable on this view!
		"change #periodLength": "changePeriodLengthHandler",
		"change #paymentTerm": "changePaymentTermHandler",

		// change event for reference input
		"change #reference input": "changeReferenceHandler",
		"change #invoice_number input": "changeInvoiceNumberHandler",

		// change event for textarea
		"change textarea": "changeTextareaHandler",

		// change event for datepicker
		"change #date-picker": "changeDatepickerHandler",

		"autocomplete #account_debtor_id input": "autoCompleteHandler"		
		
	},

	clickEvents: {
		"#save":			"saveInvoice",
		"#delete":			"deleteInvoice",
		"#send":			"approveInvoice",
		"#debtor-details":	"openDebtorPopup",
		"#show-pdf":		"showPDF",
		"#vat-to-debtor":	"transferVatToDebtor",
		"#remove-debtor":	"removeDebtor"		
		
	},

	initialize: function (options) {
							var self = this;								

							if (!this.model)
								throw "Can't create EditInvoiceView without invoice";

							if (this.model.debtor) {								
								this.debtor = this.model.debtor;
							}
																	
							// render content;
							this.template = JST["templates/invoices/edit-invoice.html"];							
							var renderContent = this.renderTemplate();							
							this.$el.html(renderContent);

							// create view for invoicelines							
							this.invoiceLinesView = new myAPP.views.InvoiceLinesView({ 
								invoice: this.model,
								el: this.$el.find( ".invoice-lines" ),								
								editable: true
							});
							
							if (!this.model.isNew()) {			
								// otherwise, fetch invoicelines from server							
								setTimeout(function () { self.$el.find(".invoice-lines").startSpinner(); }, 0);
								this.model.fetchInvoiceLines({ 
									success: function () {									
										setTimeout(function () { self.$el.find(".invoice-lines").stopSpinner(); }, 0);
										self.invoiceLinesView.render();
									}
								});
							}

							// listening for model changes
							this.setModelListeners();
			

							// set listeners on the view itself
							// @todo: this is incorrect: the view should listen to the model, not to itself

							this.listenTo(this, "modelValidates", function () {															
								self.onModelValidates();										
							});

							this.listenTo(this, "modelHasErrors", function () {
								self.onModelHasErrors();								
							});
							
							// bypass auto error-markup by calling validateAll manually;
							// validateAll() returns error if validation fails.
							if (this.model.validateAll()) {
								this.onModelHasErrors();
							} else {
								this.onModelValidates();
							}

							// disable the placeholder for input field if the input for debtor has a value;
							if (this.$el.find("#account_debtor_id input").val())
								this.$el.find("#account_debtor_id .placeholder").css({ opacity: 0 });							
							
							// call all the update functions
							this.updateTotals();
							this.updateBigButtonText();
							this.updateViewType();
							this.updateInvoiceNumber();
							

							// setup autocomplete on debtor input
							if (myAPP.debtors) {
								var entries = myAPP.debtors.createAutoCompleteEntries();
								myAPP.AutoComplete.initialize( this.$el.find("#account_debtor_id input"), entries);	
							}

							// for debugging
							myAPP.view = this;							
							myAPP.invoice = this.model;	

	},

	setModelListeners: function () {
							var self = this;

							// listeners for totals section
							this.listenTo(this.model, "change:total_inc_vat", function () { self.updateTotals() })						
							this.listenTo(this.model, "change:total_vat", function () { self.updateTotals() })			
							this.listenTo(this.model, "change:total_exc_vat", function () { self.updateTotals() })	
							
							// listeners for big button text
							this.listenTo(this.model, "change:status_internal", function () { self.updateBigButtonText() });
							this.listenTo(this.model, "change:type", function () { self.updateBigButtonText() });

							// listeners for general changes to view based on type
							this.listenTo(this.model, "change:type", function () { self.updateViewType() })

							// listener for updating the invoice number
							this.listenTo(this.model, "change:invoice_number", function () { self.updateInvoiceNumber() });

	},

	renderTemplate: function () { 

							return this.template({ 
								invoice: this.model.getAttributes(), 
								debtor: this.debtor ? this.debtor.getAttributes() : null,
								vatLiable: myAPP.currentAccount && myAPP.currentAccount.get( "vat_liable" ),
								userRole: myAPP.getUserRole(),
								paidAccount: myAPP.isPaidAccount(),
								canStartFromReminder: myAPP.accountSettings.get( "canStartFromReminder" ),
								hasMultipleTemplates: myAPP.templates.hasMultipleTemplates()
							});

	},

	// ## event handlers
	 
	clickHandler: function (event) {				

							var $targets = $(event.target).parents().andSelf();
							if ($targets.is(".button-disabled"))
								return "disabled";

							if ($targets.is("#account_debtor_id .placeholder")) {
								this.$el.find("#account_debtor_id input").focus();
								return "focus accountInput";	
							}
			
							for (var selector in this.clickEvents) {

								if ($targets.is(selector)) {																		
									this[ this.clickEvents[selector] ]();												
								}
							}
	},

	focusHandler: function () { 
							var $input = this.$el.find("#account_debtor_id input");
							if ($input.val())
								this.$el.find("#account_debtor_id .placeholder").css({opacity: 0});
							else
								this.$el.find("#account_debtor_id .placeholder").css({opacity: 1})
	},

	keydownHandler: function (event) {
							var $target = $( event.target );
							if ($target.parent().attr( "id" ) === "account_debtor_id") {
								this.$el.find("#account_debtor_id .placeholder").css({ opacity: 0 });
							}
							
	},

	keyupHandler: function (event) {
							var $target = $( event.target );

							if ($target.parent().attr( "id" ) === "account_debtor_id") {
								if (!$target.val()) 
									this.$el.find("#account_debtor_id .placeholder").css({ opacity: 1 });	
								return;
							}
							
							var keyCode = event.keyCode;
							// if enter, and popup, trigger clickHandler;
							if (keyCode === 13 && this.debtorPopupView) {
								$target.parent().next().find("input").focus();
								
							}							

	},

	onModelValidates: function () {
							
							this.$el.find('#save, #send, #show-pdf, #vat-to-debtor').removeClass("button-disabled");
							this.$el.find("#send, #send").each(function () { $(this).attr("data-tooltip", myAPP.texts.tooltips.sendInvoice); });
	},

	onModelHasErrors: function () {							
							// disable buttons
							this.$el.find("#save, #send, #show-pdf, #vat-to-debtor").addClass("button-disabled");	
							if(!this.debtor) {						
								this.$el.find("#send, #send").each(function () { $(this).attr("data-tooltip", myAPP.texts.tooltips.addDebtorBeforeSend); });
							}

	},

	autoCompleteHandler: function (event, $element) {											
							
							var id = $element.attr("data-autocomplete-value");
							var match = id.match(/(\w+)\/(\d+)/);
							var debtor = myAPP.debtors.get( match[2] )
							this.addDebtor( debtor );

							// display debtor's name in the input element;
							this.$el.find("input.myAPP-autocomplete").val( debtor.get( "company_name" ) );

	},

	dropdownHandler: function (event, value) {
							// note: this handler will be triggered by ALL dropdown events on this.$el, including events
							// that should be handled by invoiceLinesView as it's a nested view; therefore, we filter $target 

							var $target = $(event.target),
								property = $target.attr("id")								

							console.log(property, value);

							if (jQuery.contains(this.invoiceLinesView.$el[0], $target[0]))
								return;

							// get value and property;														
							if (!property) {
								property = $target.parent().attr("id")						
							}
		
							if (property === "payment_term") {
								this.updatePaymentTermField(value);								
								return;
							}

							if (property === "delivery_method" && (value === myAPP.constants.deliveryMethods[1] || value === myAPP.constants.deliveryMethods[2])) {
								alert(myAPP.texts.extraCostsDeliveryMethod.replace(/%costs%/, myAPP.templateHelpers.parseNumber(myAPP.constants.costs["nr_sent_postals"])));
							}
							
							// unfiltered
							this.model.set(property, value);

							},
	
	openDebtorPopup: function () {

							var self = this, 
								_handler, 
								debtor = this.debtor || new myAPP.models.Debtor();

							// strictly for debugging
							this.debtor = debtor;

							var $html = $(JST[ "templates/popups/edit-debtor.html" ]({ 
								debtor: debtor.getAttributes() 
							}));

							myAPP.animations.openPopup($html, function () {								
								$("body").off( "keyup", _handler)
								self.debtorPopupView.remove();								
							});

							// now, setup a newDebtorView;
							this.debtorPopupView = new myAPP.views.NewDebtorView({ model: debtor });
							self.debtorPopupView.setElement( $html.find( ".wrapper" ) );
							
							// overwrite save callback
							self.debtorPopupView.success = function () {
								self.addDebtor( self.debtorPopupView.model );								
								myAPP.debtors.add( self.debtorPopupView.model );
								$("body").off( "keyup", _handler)

								myAPP.animations.closePopup();
							}								

							_handler = function (event) { self.keyupHandler(event); } 
							$("body").on("keyup", _handler)				

	},

	addDebtor: function (debtor) {
					
							this.debtor = debtor;
							this.model.addDebtor( debtor );

							// clear a possible error on debtor select element;
							this.clearErrors({ account_debtor_id: true })

							var $debtorDetails = this.$el.find("#debtor-details");
							var renderContent = this.renderTemplate();

							myAPP.animations.blink($debtorDetails, $(renderContent).find("#debtor-details").children());						
							myAPP.animations.blink(this.$el.find("#account_debtor_id input"), debtor.get("company_name"))
							this.$el.find("#account_debtor_id .placeholder").css({ opacity: 0 })
							
							// turn on button
							this.$el.find(".button#remove-debtor").removeClass("button-disabled").animate({ opacity:  1 })

	},

	// remove the current debtor from invoice and create a new one
	removeDebtor: function () {
							
							this.model.removeDebtor();
							this.debtor = null;

							var $debtorDetails = this.$el.find("#debtor-details");
							var renderContent = this.renderTemplate()

							// disable remove button
							this.$el.find(".button#remove-debtor").addClass("button-disabled").animate({ opacity: 0 })
							this.$el.find(".button#vat-to-debtor").addClass("button-disabled", 400)

							myAPP.animations.blink($debtorDetails, $(renderContent).find("#debtor-details").children());	

							this.$el.find("#account_debtor_id input").val( null )
							this.$el.find("#account_debtor_id .placeholder").css({ opacity: 1 })

							// remove text from content textarea;			
							myAPP.animations.blink(this.$el.find("textarea"), "")
							this.model.set({ content: "" })

							this.trigger("modelHasErrors");
							
	},
	
	updatePaymentTermField: function (value) {	
							var $paymentTermField = this.$el.find( "#payment_term .manual" );

							switch (value) {

								case "other":		$paymentTermField.animate({ visibility: "visible", opacity: 1});
													$paymentTermField.find("input").val(14);
													value = 14;
													break;
								default:			$paymentTermField.animate({ visibility: "hidden", opacity: 0 });
													break;
							}
							console.log(value);
							this.model.set('payment_term', value);

	},

	updateTotals: function () {

							var $totalsHtml = $(this.renderTemplate()).find(".totals").children();

							myAPP.animations.blink(this.$el.find(".totals"), $totalsHtml);
	},	

	updateBigButtonText: function () {
							var text;

							if (this.model.get("type") === "quote") {
								text = "Offerte versturen";
							} else if (this.model.get("status_internal") === "reminder") {
								text = "Herinnering versturen";
							} else {
								text = "Factuur versturen";
							}

							myAPP.animations.blink(this.$el.find(".button-big#send .text"), text);
	},

	updateInvoiceNumber: function () {

							var invoiceNumber = this.model.get("invoice_number");

							if (invoiceNumber) {
								myAPP.animations.blink(this.$el.find(".invoice-header #invoice-number .value"), invoiceNumber); 
							} else {
								myAPP.animations.blink(this.$el.find(".invoice-header #invoice-number .value"), "Nader bepaald"); 
								this.$el.find("#invoice-details .list-item#invoice_number input").val("");
							}

	},

	updateViewType: function () {
							
							var $period = this.$el.find(".list-item#period")

							var type = this.model.get("type");

							switch (type) {

								case "invoice":		$period.animate({ opacity: 0 }, { complete: function () { $period.css({ display: "none" }) } });
													this.$el.find(".list-item#payment_term .button").attr({"data-dropdown": "payment-terms"})
													myAPP.animations.blink(this.$el.find("#payment_term label"), "Betaaltermijn");		
													
													// change labels
													myAPP.animations.blink(this.$el.find("#date label"), "Factuurdatum");

													break;

								case "reminder":	this.$el.find(".list-item#invoice_number").animate({ opacity: 1, visibility: "visible"});
													myAPP.animations.blink(this.$el.find("#payment_term label"), "Oorspr. termijn");		
													break;

								case "quote":		
													//this.$el.find(".list-item#payment_term .button").attr({"data-dropdown": "quote-terms"})
													this.$el.find(".invoice-header #invoice-number").animate({ opacity: 0, width: 0 }, { easing: "easeOutCubic" })
													
													// change labels
													myAPP.animations.blink(this.$el.find("#payment_term label"), "Accepteren binnen");
													myAPP.animations.blink(this.$el.find("#date label"), "Offertedatum");
													
													break;
							}

							if (type !== "reminder") {
													this.$el.find(".list-item#invoice_number").animate({ opacity: 0, visibility: "hidden"});

							}

							if (type !== "quote") {
													//this.$el.find(".list-item#payment_term .button").attr({"data-dropdown": "quote-terms"})
													this.$el.find("#invoice-number").animate({ opacity: 1, width: "11%" }, { easing: "easeOutCubic" })
													myAPP.animations.blink(this.$el.find("#date label"), "Factuurdatum");
							}
	},
	
	changePeriodLengthHandler: function ( event ) {
							var $target = $(event.target),
								value = $target.val();								
							
							var periodLength = Number(Math.floor(value));							
							if (isNaN(periodLength))
								periodLength = 1;

							myAPP.animations.blink($target, periodLength)
							this.model.set({ periodLength: periodLength })

	},

	changePaymentTermHandler: function ( event ) {

							var $target = $(event.target),
								value = $target.val();
							
							var paymentTerm = Number( Math.floor( value ));							
							if (isNaN( paymentTerm ))
								paymentTerm = 1

							if (paymentTerm < 14 && this.model.get("type") !== "quote") {
								alert( myAPP.texts.inappropriatePaymentTerm);
							}

							myAPP.animations.blink( $target, paymentTerm )
							this.model.set({ payment_term: paymentTerm })

	},

	changeReferenceHandler: function (event) {

							var $target = $(event.target),
								value = $target.val();								

							myAPP.animations.blink( $target, String(value) );
							this.model.set({ reference: value })


	},

	changeInvoiceNumberHandler: function (event) {

							var $target = $(event.target),
								value = $target.val();								

							myAPP.animations.blink( $target, String(value) );
							this.model.set({ invoice_number: value })
	},

	changeTextareaHandler: function (event) {

							var $target = $(event.target),
								value = $target.val();

							myAPP.animations.blink( $target, value );
							this.model.set({ content: value })							
	},

	changeDatepickerHandler: function (event) {
							var $target = $(event.target),
								date = $target.datepicker('getDate'),
								text;
							
							if (( myAPP.templateHelpers.parseDate( date ) !== myAPP.templateHelpers.parseDate( new Date() )) && this.model.get("status_internal") !== 'reminder') {

								if (date < new Date()) {
									// invoice date is in the past
									text = this.model.get( "type" ) === "quote" ? myAPP.texts.quoteDatePast : myAPP.texts.invoiceDatePast;
								} else {
									// invoice date is in the future;
									text = this.model.get( "type" ) === "quote" ? myAPP.texts.quoteDateFuture : myAPP.texts.invoiceDateFuture;
								}

								alert(text);						

							}

							this.model.set("date", $target.datepicker('getDate'));
	},

	transferVatToDebtor: function () {
							
							var self = this;

							confirm(myAPP.texts.transferVat, function () {								

								var callback = function () {

									self.model.set({ vatToDebtor: true })

									self.model.invoiceLines.clearVat();
									self.invoiceLinesView.render();
									var content = self.model.get( "content" ) || "";

									if (content.match(/BTW\sverlegd\snaar\sdebiteur,\sBTW-nummer/)) 
										return;

									var _content = "Btw verlegd naar debiteur, btw-nummer: "	
										+ debtor.get( "vat_number" ) + "\n\n" + content.replace(/<br\/>/g, "\n");									

									self.model.set({ content: _content })
									myAPP.animations.blink($("textarea"),  _content );
								}

								var debtor = myAPP.debtors.findWhere({ id: self.model.get( "account_debtor_id" )})

								if(!debtor.get("vat_number")) {
									var html = JST["templates/popups/debtor-vat.html"]()
									myAPP.animations.openPopup( html );

									$(".popup #save").on("click", function () {										

										var vat_number = $(".popup input").val();
										if (!vat_number) {											
											myAPP.animations.addErrorMarkup( $(".popup .list-item#vat_number"), myAPP.texts.errors.btw);
											return;
										}

										// we have a vat number
										
										$(".popup").startSpinner();

										debtor.save({ vat_number: vat_number }, {
											success: function () {
												myAPP.trigger("toast", "Debiteur succesvol opgeslagen", "success")
												$(".popup").stopSpinner();
												myAPP.animations.closePopup();
												callback();
											},
											error: function () { 
												myAPP.trigger("toast", "Opslaan debiteur mislukt", "error")
												$(".popup").stopSpinner();
											}
										})
									})

									return;								
								}

								callback();

							});			

	},

	saveInvoice: function ( options ) {							
							var self = this;
							
							if (!this.validateModel()) {								
								return;					
							}		

							if (this.debtor.isNew()) {								
								this.saveDebtor({ 
									success: function () {										
										self.saveInvoice();
									},
									error: function () {										
										if (options && options.error)
											options.error()
									}
								})
								return;
							}
							
							this.saveModel({ 
								success: function () { 
									myAPP.trigger('toast', 'Factuur ' + self.model.get('invoice_number') + ' succesvol opgeslagen', 'success')
									myAPP.animations.flashElement(self.$el, 'success');
									
									// update the view;									
									var $html = $(self.renderTemplate()).filter(".buttons.head");								
									self.$el.find(".buttons.head").html( $html.html() )
										.css({ opacity: 0 })										
										.animate({ opacity: 1 })																	

									// update hash
									myAPP.router.navigate("facturen/facturen/" + self.model.get("id"), { replace: true })

									// update PDF
									// if (pdfWindow)
									//	self.showPDF();

									if (options && options.success)
										options.success();
								}, 
								error: function (model, xhr, fail) {
									// the error occurred when saving the invoice
									if (fail === "invoice") {
										// do nothing; saveModel will  have marked errors, etc.
										return;
									}
									// the error occurred when saving invoicelines
									if (fail === "invoiceLines") {										
										self.invoiceLinesView.markErrors(model, xhr);
									}

									if (options && options.success)
										options.success();
								}
							});

	},

	saveDebtor: function (options) {
							var self = this;							
							
							this.debtor.save({}, { 
								success: function () {
									self.model.addDebtor( self.debtor)
									if (options && options.success) {
										options.success();
									}
								},

								error: function () {									
									if (options && options.error) {
										options.error();
									}

								}
							})

	},

	deleteInvoice: function () {

							var self = this;

							confirm("factuur verwijderen?", function () {

								self.$el.startSpinner();
								
								self.model.destroy({ 
									success: function () {																
										self.$el.stopSpinner()
										myAPP.trigger("toast", "factuur verwijderd", "success")
										window.history.back();
										 
									},

									error: function () { 
										myAPP.trigger("toast",  "verwijderen factuur mislukt", "error");
										self.$el.stopSpinner()
									}

								})
							});

	},

	approveInvoice: function () {						
							var text,
								self = this;

							// don't send invoices without a positive total
							var total = this.model.get( "total_inc_vat" )

							if (total === 0 ) {
								alert( myAPP.texts.noZeroTotalInvoice )
								return;
							}

							// hack for account "Winters", id = 846
							if (myAPP.currentAccount && (myAPP.currentAccount.get("id") !== "846")) {

								if (total < 0) {
									alert( myAPP.texts.noNegativeTotalInvoice )
									return;
								}
							}

							if (this.model.get( "type" ) === "quote") {
								text = "Offerte versturen?";
							} else if (this.model.get("status_internal") === "reminder") {
								text = "Herinnnering versturen?";
							} else {
								text = "Factuur versturen?";
							}

							confirm(text, function () {								
								self.verifyUser();
							});

	},

	verifyUser: function () {


							if (myAPP.session.get( "isGuestUser")) {
								alert ("Als gastgebruiker kunt u geen facturen versturen. Maak een KasCo account aan als u een factuur wilt versturen.")
								return;
							}

							this.verifyAccount();

	},

	verifyAccount: function () {
							var self = this;
							
							if (myAPP.currentAccount.get( "status" ) === "0") {
								alert(myAPP.texts.accountInactive);
								return;
							}

							if (!myAPP.currentAccount.isComplete()) {
								if (!myAPP.currentAccount.get("kvk")) {
									confirm( myAPP.texts.noKvkNumber, 
										function () {
											self.verifyDeliveryMethod();
										});
									return;
								} else {
									this.onIncompleteAccount();								
									return;
								}
							}

							this.verifyDeliveryMethod();

	},

	// verifyInvoiceDate: function () {
	// 						var date = this.model.get( "date" ),
	// 							self = this,
	// 							text;

	// 						// check if send date is today;
	// 						if (( myAPP.templateHelpers.parseDate( date ) !== myAPP.templateHelpers.parseDate( new Date() )) && this.model.get("status_internal") !== 'reminder') {

	// 							if (date < new Date()) {
	// 								// invoice date is in the past
	// 								text = this.model.get( "type" ) === "quote" ? myAPP.texts.quoteDatePast : myAPP.texts.invoiceDatePast;
	// 							} else {
	// 								// invoice date is in the future;
	// 								text = this.model.get( "type" ) === "quote" ? myAPP.texts.quoteDateFuture : myAPP.texts.invoiceDateFuture;
	// 							}

	// 							confirm( text, function () {									
	// 								self.verifyMaxInvoicesSent();
	// 							})
	// 							return;								

	// 						}

	// 						this.verifyDeliveryMethod();

	// },

	verifyDeliveryMethod: function () {

							var deliveryMethod = this.model.get("delivery_method")							
						
							if (deliveryMethod === "email" || deliveryMethod === "both") {

								var debtor = myAPP.debtors.findWhere({ id: this.model.get( "account_debtor_id" ) })
								var email = debtor.get( "email" );
								
								if (!email || email === "") {
									alert( myAPP.texts.noDebtorEmail.replace(/%debtor%/, "<strong>" + debtor.get( "company_name" ) + "</strong>"))
									return
								}
							}
							
							this.verifyInvoiceNumber();
	},

	verifyInvoiceNumber: function () {

							if (this.model.get("type") === "reminder" && !this.model.get("invoice_number")) {
								alert(myAPP.texts.noInvoiceNumber);
								return;
							}

							this.verifyMaxInvoicesSent();
	},

	verifyMaxInvoicesSent: function () {
							
							var self = this;

							if (myAPP.currentAccount.maxInvoicesSent()) {
								confirm( myAPP.texts.maxInvoicesSent, function () {
									myAPP.currentAccount.upgrade({
										success: function () {
											myAPP.trigger("toast", "Account succesvol geupgraded", "success")
											alert("Uw account is geupgraded.")
										},
										error: function () {
											myAPP.trigger('toast', 'Upgraden account mislukt', 'error')
											alert("Er ging iets fout: het upgraden van uw account is mislukt. Neem contact op met info@kascooperatie.nl")
										}
									});
								})
								return;
							}

							this.sendInvoice();
	},

	sendInvoice: function () {							

							var self = this,
								type;

							this.$el.startSpinner();

							this.model.approve({
								success: function () {

									// update and animate view;									
									self.$el.stopSpinner();
									
									// little animation magic;
									myAPP.animations.flashElement(self.$el.find(".animation-wrapper"), "success")

									type = self.model.get("type") === "quote" ? 'Offerte' : 'Factuur' 
									myAPP.trigger('toast', myAPP.texts.toasts.onInvoiceCreateSuccess.replace(/%type%/, type), 'success');								
									
									// update hash;
									self.updateHashOnApprove();

									// removes the view and creates a new view;
									self.updateViewOnApprove();

								},
								error: function (model, xhr, fail) {
									myAPP.trigger('toast',  'goedkeuren factuur mislukt', 'error');
									self.$el.stopSpinner();

									if (fail === "invoiceLines") {
										self.invoiceLinesView.markErrors(model, xhr);
										return;
									}

									if (fail === "incompleteAccount") {
										self.onIncompleteAccount();
										return;
									}
									if (fail === "unknown") {
										alert(myAPP.texts.unknownError);
										return;
									}

								}
							})
	},

	onIncompleteAccount: function () {
							confirm( myAPP.texts.incompleteAccount, function () { 
									myAPP.accountWizard.start();
							});

	},
						
	updateViewOnApprove: function () { 
							var view;

							myAPP.clearTooltips();
							myAPP.animations.closePopup();

							var $parent = this.$el.parent();
							var viewManager = this.viewManager;

							//remove view: 
							this.remove();

							// create a new element to replace the one removed with the old view;
							var $child = $("<div></div>")
								.appendTo( $parent )

							if (this.model.get( "isPeriodical" )) {

								// get the periodical object created by invoice class;								
								this.model = myAPP.periodicals.findWhere({ temp_invoice_id: this.model.get( "id" ) })								
								view = new myAPP.views.PeriodicalView({ model: this.model, el: $child })							

							} else  if (this.model.get( "type" ) === "quote" ){

								view = new myAPP.views.QuoteView({ model: this.model, el: $child })
								myAPP.invoices.remove( this.model )
								myAPP.quotes.add( this.model )

							} else {

								view = new myAPP.views.InvoiceView({ model: this.model, el: $child })				
							}

							view.$el.css({ opacity: 0 })
								.animate({ opacity: 1 })

							viewManager.currentView = view;						

							this.$el = null;
							this.remove();

	},

	updateHashOnApprove: function () {

							// update hash;
							if (this.model.get( "isPeriodical" )) {
								myAPP.router.navigate("facturen/periodieken/" + this.model.get("id"), { replace: true })
							} else if (this.model.get( "type" ) === "quote" ) {
								myAPP.router.navigate("facturen/offertes/" + this.model.get("id"), { replace: true })
							} else
								myAPP.router.navigate("facturen/facturen/" + this.model.get("id"), { replace: true })

							setTimeout( function () {										
								// trigger history event, which will have viewmanagers refresh their lastParameters variable;
								myAPP.trigger("history");
							}, 0);

	},



	remove: function ()	{							
							if (this.model.attributes.status === "reminder") {								
								this.model.attributes.status = "draft"
								this.model.trigger("update")
							}

							this.invoiceLinesView.remove();							
							Backbone.View.prototype.remove.apply(this, arguments)
	},

	showPDF: function () {
							var self = this;

							if(pdfWindow)
								pdfWindow.close();
															
							pdfWindow = window.open("loader.html", null, "menubar=0, width=640px, height=800px");

							this.saveInvoice({ 
								success: function () {

									if (pdfWindow) {
										var url = self.model.get("pdfUrl")	
										pdfWindow.location = url;
									}
										
								},
								error: function () {

								}
								
							})
							
	}
							
// don't make this view editable! it won't work well with invoiceLinesView

}) .invoicePreview() .saveable() .validates() .datePicker() 

var pdfWindow;




//------------------------------------



myAPP.views.CreditInvoiceView = myAPP.views.EditInvoiceView.extend({

	initialize: function () {
		myAPP.views.EditInvoiceView.prototype.initialize.apply( this, arguments )

		// modifications to the template
		this.$el.find( "#payment_term, #_invoice_type, #_status, #save" ).remove();
		this.$el.find( "#account_debtor_id input" ).attr({ disabled: true })

		this.$el.find("h2.description").text("Concept creditfactuur");

		
		// we need to call the super method to activate the base class initialize method;
		Backbone.View.prototype.initialize.apply(this, arguments);
	},

	approveInvoice: function () { 		

		var self = this;
		
		var total = this.model.get( "total_inc_vat" )

		// check if total on 
		if (total >= 0 ) {
		alert( myAPP.texts.noPositiveTotalCreditInvoice )
			return;
		}

		this.parentInvoice = myAPP.invoices.findWhere({ id: this.model.get( "parent_credit_id" ) });				

		// start the string of callbacks;		
		this.verifyExceedsTotal();

	},	

	verifyExceedsTotal: function () {
		var self = this;

		var creditTotal = this.model.get( "total_inc_vat" ) + this.parentInvoice.get( "creditInvoicesTotal" ),
			parentTotal = (this.parentInvoice.get( "total_inc_vat" ) + Number(this.parentInvoice.get("extra_costs"))) * -1;

		if ( creditTotal < parentTotal) {
			confirm( myAPP.texts.creditInvoicesTotalExceedsParent, function () { 
				self.verifyExtraCosts();
			})
		} else {
			this.verifyExtraCosts();
		}

	},

	verifyExtraCosts: function () {
		var self = this;

		var extraCosts = Number(this.parentInvoice.get( "extra_costs" )),
			creditTotal = this.model.get( "total_inc_vat" ) + this.parentInvoice.get( "creditInvoicesTotal" ),
			parentTotal = (this.parentInvoice.get( "total_inc_vat" ) + extraCosts) * -1;		
	
		if ( extraCosts && (creditTotal > parentTotal))  {				
			var string = myAPP.texts.extraCosts.replace(/%extra_costs%/, "EUR " + this.parentInvoice.get( "extra_costs" ))
			confirm(string, function () {
				self.addExtraCosts();				
			},
			function () {
				self.verifyPartialInvoice();
			});
		} else {
			this.verifyPartialInvoice();
		}
	},

	verifyPartialInvoice: function () {
		var self = this;		

		var creditTotal = this.model.get( "total_inc_vat" ),
			parentTotal = (this.parentInvoice.get( "total_inc_vat" ) + Number(this.parentInvoice.get( "extra_costs" ))) * - 1		

		if ( creditTotal > parentTotal ) {
			confirm( myAPP.texts.partialTotalCreditInvoice, function () {				
				myAPP.views.EditInvoiceView.prototype.verifyUser.apply( self, arguments )
			});			
		} else {			
			myAPP.views.EditInvoiceView.prototype.verifyUser.apply( this, arguments )
		}

	},	

	addExtraCosts: function () {

		this.invoiceLinesView.addInvoiceLine( new myAPP.models.InvoiceLine({ 
			amount: -1,
			invoice_id: this.invoiceLinesView.invoiceId,
			title: "Afboeking extra kosten",
			price: Number(this.parentInvoice.get("extra_costs"))
		}));


	},

	updateViewOnApprove: function () {

		var viewManager = this._oldView.viewManager;

		// remove the old view for the invoice for which we created a credit invoice;		
		this._oldView.remove();

		// // stop listening to router events	
		this.stopListening( myAPP.router )

		// console.log("this is where we update the view;")
		var view = new myAPP.views.InvoiceView({ model: this.model, el: this.$el })

		// @@SHIT
		if (viewManager) {
			viewManager.setCurrentView( view );
		}
		
	},

	updateHashOnApprove: function () {
		var self = this;
		
		this.listenToOnce( myAPP.router, "route", function () { 			
			myAPP.router.navigate("facturen/facturen/" + self.model.get( "id" ), { replace: true })
		})

		window.history.back();
	}

})



//------------------------------------



myAPP.views.InvoiceLinesView = Backbone.View.extend ({

	events: {
		
		"click #add-invoice-line": "clickHandler",
		"click .table-body .placeholder": "clickHandler",
		"click .delete-button": "deleteInvoiceLine",

		"dropdown #add-article": "addArticle",
		"dropdown .table-cell": "dropdownHandler",

		"focusout": "focusOutHandler",

		"keyup": "keyupHandler",

		"autocomplete .table-row #article_number": "autoCompleteHandler"
		
	},
	
	initialize : function (attributes) {		
								var self = this;	

								if (!(attributes && attributes.invoice))
									throw "Can't create invoiceLinesView without invoice"						

								this.editable = attributes && attributes.editable;							
								this.template = JST["templates/invoices/invoice-lines.html"]							
								this.invoice = attributes.invoice;								
								this.invoiceId = this.invoice.get( "id" ) || this.invoice.cid;																	

								// add one start line if collection is empty
								if (this.invoice.invoiceLines.length === 0) {									
									this.addInvoiceLine();															
								}

								this.render();	

								// set event handlers
								this.$el.on("click", "input[type=text]", function () {
									$(this).select();
								})

								this.listenTo(this.invoice.invoiceLines, "change", this.changeHandler, this)
															
	},	

	render: function () {

								var renderContent = this.template({ 
									invoiceLines: this.invoice.invoiceLines,								
									account: myAPP.currentAccount || new myAPP.models.Account(),
									editable: this.editable 
								})
								
								this.$el.html(renderContent);

								var entries = myAPP.articles.createAutoCompleteEntries();
								this.$el.find(".table-row input#article_number").each(function (){									
									myAPP.AutoComplete.initialize($(this), entries);
								})

	},

	renderNewLine: function (invoiceLine) {
								var $table = this.$el.find("#invoice-lines");

								// fixate table height; 
								$table.height($table.height())
								
								$table.find('.placeholder').remove();								

								var html = JST['templates/invoices/invoice-line.html']({ 
									invoiceLine: invoiceLine, 
									editable: true, 
									account: myAPP.currentAccount || new myAPP.models.Account()
								});								
								
								$(html).appendTo($table.find(".table-body")).css({ opacity: 0 }); 

								var $row = $table.find(".table-body").find(".table-row:last-child");								

								$row.animate({ opacity: 1 })

								entries = myAPP.articles.createAutoCompleteEntries();
								myAPP.AutoComplete.initialize( this.$el.find(".table-row#" + invoiceLine.cid + " input#article_number"), entries)	
								
								this.resizeTable();
	},

	changeHandler: function (model) {
								//  ** BUG: how is it possible that changeHandler would be triggered without a model?S
								if (!model || !model.getChangedValues)
									return;

								// get all the values that have changed because of last set on model;
								var changedValues = model.getChangedValues(/* resetChangedValues */ true),
									$parentElement = this.$el.find(".table-row#" + model.cid),
									$element,
									value;

								for (var key in changedValues) {

									if (key === "total" ) {		
										$element = $parentElement.find("input#total");
										value = myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(model.get(key));										
									}
									else if (key === "price") {										
										$element = $parentElement.find("input#price");
										value = myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(model.get(key));										
									}									
									else if (key === "vat") {																

										// the vat cell is a little complex; does it contain an input element or not?
										$element = $parentElement.find("#vat");										
										if ($element.children("input").length > 0)
											$element = $element.find("input");										
										else 
											$element = $element.find(".content-wrapper");

										value = model.get("vat");

									}
									else {
										$element = $parentElement.find("input#" + key);
										value = model.get(key);										
									}
									myAPP.animations.blink($element, value);
									
									//myAPP.animations.flashElement($element, 'change');
								}
	},							

	editHandler: function ($target, property, value) {													
							
								var	$parentElement = $target.closest(".table-row"),
									modelId = $parentElement.attr('id');

								var model = this.invoice.invoiceLines.get( modelId );

								model.set( property, value )

								this.changeHandler(model);								
															
	},

	setVariableVatField: function ($invoiceLine) {

								var $input = $("<input id='vat' type='text'>")
									.css({ width: 30 })
									.val( "0%" ),
									$cell = $invoiceLine.find( "#vat" );

								// append input element to table cell and remove dropdown attribute from cell itself.
								$cell.removeClass( "myAPP-dropdown")
									.prepend( $input )
								$cell.find( ".content-wrapper" ).remove();
								
								// set dropdown attribute on the caret;
								$cell.find( ".caret" ).addClass( "myAPP-dropdown")
									.attr({ "data-dropdown": "vat" })
									.css({ marginLeft: 0 })

								$input.focus().select();
 
	},

	removeVariableVatField: function ($invoiceLine, event, value) {		

								var $cell = $invoiceLine.find( "#vat" );

								$cell.find("input").remove();
								var $contentWrapper = $("<div class='content-wrapper'></div>")
									.text( value )
								$cell.prepend( $contentWrapper );

								$cell.find( ".caret" ).removeClass( "myAPP-dropdown")
									.attr({ "data-dropdown": null })
									.css({marginLeft: 2 })

								$cell.addClass( "myAPP-dropdown" )

								this.editHandler( $cell, "vat", value)
	},

	addInvoiceLine: function ( line ) {	
								// if the view is not editable, this function should not even been called in the first place.
								if (!this.editable)							
									return;
								
								var invoiceLine = line || new myAPP.models.InvoiceLine({ 									
									vat: myAPP.currentAccount.get("vat_liable") === "ja" ? 21 : 0,
								});			
								this.invoice.invoiceLines.add( invoiceLine );								
								this.renderNewLine( invoiceLine )

								var entries = myAPP.articles.createAutoCompleteEntries();
								myAPP.AutoComplete.initialize( this.$el.find(".table-row#" + invoiceLine.cid + " input#article_number"), entries)
	},

	deleteInvoiceLine: function (event) {
								if (!this.editable)							
									return;

								var self = this;							
								
								var $target = $(event.target);
								var $row = $target.closest(".table-row");																		
								
									

								// model logic
								var modelId = $row.attr('id');

								var model = this.invoice.invoiceLines.get( modelId );

								model.destroy({
									success: function () { 
										myAPP.trigger('toast', 'factuurregel verwijderd', 'success')	

										$row
											.animate({opacity: 0, height: 0}, { duration: 300, complete: function () { $row.remove() } })										

										if (self.invoice.invoiceLines.length === 0)
											self.$el.find("#invoice-lines .table-body")
												.prepend($("<div class=\"placeholder table-row\"><h2>Voeg factuurregel toe</h2></div>"))

										//setTimeout(function () { 
											self.resizeTable(); 
										//}, 0)
									},
									error: function () {
										myAPP.trigger('toast', 'verwijderen regel mislukt', 'error')
									}
								});
	},

	addArticle: function (event, value) {
								var invoiceLine, 
									lastInvoiceline,
									article,
									entries;

								if (!this.editable)							
									return;								

								if (value instanceof $) {

									confirm( "Nieuw artikel aanmaken? U verlaat deze pagina", function () {
										myAPP.router.navigate( "artikelen/losse producten/nieuw", { trigger: true })
									});
									return;
								}									

								article = myAPP.articles.findWhere({ id: value });	
								lastInvoiceLine  = this.invoice.invoiceLines.at( this.invoice.invoiceLines.length - 1);							
								
								if (!article) {									
									console.warn("No article found on dropdown event; returning");
									return;
								}

								if (lastInvoiceLine && lastInvoiceLine.isEmpty()) {									
									this.setInvoiceLineToArticle( lastInvoiceLine, article )
								} else {
									invoiceLine = new myAPP.models.InvoiceLine()	
									this.invoice.invoiceLines.add( invoiceLine );								
									this.setInvoiceLineToArticle( invoiceLine, article )
									this.renderNewLine( invoiceLine );		
								}										
								
	},
		
	setInvoiceLineToArticle: function( invoiceLine, article) {

								var addVat = (myAPP.currentAccount && myAPP.currentAccount.get( "vat_liable" ) === "ja" && !this.invoice.get( "vatToDebtor"))
								
								invoiceLine.set({ 
									article_number: article.get( "article_number" ), 
									amount: 1, 
									title: article.get("title"), 
									description: article.get( "description" ), 
									price: article.get( "price" ), 
									vat: addVat ? article.get("vat") : 0,
									// invoice_id: this.invoiceId
								})

	},

	// ## event handlers

	clickHandler: function (event) {
								var $target = $(event.currentTarget);
								
								if ($target.is( "#add-invoice-line" ) || $target.is( ".table-body .placeholder" )) {
									this.addInvoiceLine();
								}
								if ($target.is(".delete-button")) {
									this.deleteInvoiceline( event )
								}

	},

	dropdownHandler: function (event, value) {						
								var $parentElement,
									$target = $(event.target),						
									property = $target.attr( "id" ),
									modelId = $(event.target).closest(".table-row").attr("id");									

								if ($target.hasClass( "caret" )) {

									if (value !== "anders") {
										$parentElement = $target.closest(".table-row");
										this.removeVariableVatField( $parentElement, event, value)
									}
									return;
								}

								if (property === "vat" && value === "anders") {
													
									$parentElement = $target.closest(".table-row");
									this.setVariableVatField( $parentElement)									
									return;
								}							
								
								this.editHandler($target, property, value);							

	},

	autoCompleteHandler: function (event, $element) {

								var $row = $(event.target).parent();
									invoiceLine = this.invoice.invoiceLines.get( $row.attr( "id") );

								var id = $element.attr("data-autocomplete-value");
								var match = id.match(/(\w+)\/(\d+)/)
								var article = myAPP.articles.get( match[2] );								

								this.setInvoiceLineToArticle( invoiceLine, article)

								var attributes = invoiceLine.getAttributes();

								for (var key in attributes) {
									if (key === "price" || key === "total")
										attributes[key] = myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber( attributes[key] )
									myAPP.animations.blink($row.find("#" + key), attributes[key])
								}				
	
	},

	keyupHandler: function (event) {

								var keyCode = event.keyCode;
								if (keyCode === 13) {
									var $focusElement = this.$el.find(":focus");									
									$focusElement.blur();
								}
	},

	focusOutHandler: function (event) {
			
								var $target = $(event.target),
									value = $target.val(),
									property = $target.attr( "id" );	

								this.editHandler( $target, property, value )

	},

	resizeTable: function () {
								var $table = this.$el.find(".table"), 
									$tableHeader = $table.find(".table-header"), 
									$row = $table.find(".table-body .table-row").eq(0);

								var tableHeight = $tableHeader.outerHeight(),
									rowHeight = $row.outerHeight();

								
																


								$table.animate({ height: tableHeight + (this.invoice.invoiceLines.length * rowHeight || rowHeight ) })	
	},

	// this method is called by the EditInvoiceView to which this InvoiceLinesView belongs;
	markErrors: function (model, xhr) {								
								var responseObject = myAPP.parseErrorResponse(xhr)																								
								var $element = this.$el.find("#" + model.cid);
								myAPP.animations.addErrorMarker($element);

								for (var key in responseObject) {
									myAPP.animations.addErrorMarkup($element.find("#" + key), myAPP.texts.errors[responseObject[key][0]])
								}

	},

	
	
}) //.editable();



//------------------------------------



myAPP.views.InvoiceView = Backbone.View.extend({

	// NB: the "#showPdf button works as both a dropdown and a regular button, depending on the number of pdfs associated with an invoice"

	events: {

		"click": "clickHandler",
		"dropdown": "dropdownHandler"
	},

	clickEvents: {

		"#pause":				"pauseInvoice",
		"#unpause":				"unpauseInvoice",		
		"#credit-invoice":		"createCreditInvoice",
		"#status":				"showDetails",
		"#debtor-details, .invoice-header #debtor .value":		"showDebtor",
		"#book-payment":		"bookPayment",
		"#show-pdf":			"showPdf",

		"#delivery_method #edit": "changeDeliveryMethod"

	},

	initialize: function () {
							var self = this;

							if (!this.model)
								throw "Can't create invoiceView without invoice";
														
							this.debtor = this.model.debtor || new myAPP.models.Debtor();
							this.template = JST["templates/invoices/invoice.html"];

							this.render();
							
							this.listenTo(this.model, 'update', function () { self.update(); });

							myAPP._dropdownObject = this.model;

							// make objects available for debugging through console;
							myAPP.invoice = this.model;
							myAPP.view = this;

							// we need this additional update, to reinitialize the model used by this view
							// because of javascript closure?
							this.listenTo(myAPP, 'resourcesLoaded', function () {
								self.model = myAPP.invoices.get(self.model.get("id"));
								self.debtor = myAPP.debtors.get(self.debtor.get("id"));
							});

							// we need to call the super method to activate the base class initialize method;
							Backbone.View.prototype.initialize.apply(this, arguments);

	},

	render: function () {
							var self = this;
							
							// render content;
							this.$el.html( this.renderTemplate() );

							this.invoiceLinesView = new myAPP.views.InvoiceLinesView({ 
								el: this.$el.find(".invoice-lines"),
								invoice: this.model, 
								editable: false
							});
							this.invoiceLinesView.render();						

							setTimeout(function () { self.$el.find(".invoice-lines").startSpinner(); }, 0);
							this.model.fetchInvoiceLines({ 
								success: function () {									
									setTimeout(function () { self.$el.find(".invoice-lines").stopSpinner(); }, 0);
									self.invoiceLinesView.render();
									self.update();
								}
							});

	},

	update: function () { 
							
							var $renderContent = $( this.renderTemplate() );

							/* TODO: improve */
							var $buttons = $renderContent.filter( ".buttons" );
							var $statusHtml = $renderContent.find( "#status" );
							var $totals = $renderContent.find(".totals");
							
							myAPP.animations.blink(this.$el.find("#invoice-number .value"), this.model.get("invoice_number"));
							myAPP.animations.blink(this.$el.find("#status"), $statusHtml.children() );

							myAPP.animations.blink(this.$el.find(".totals"), $totals.children() );

							if ($buttons.html() !== this.$el.find(".buttons").html())
								myAPP.animations.blink(this.$el.find(".buttons"), $buttons.children());
	},

	renderTemplate: function () {
							var self = this;

							return this.template({ 
								invoice: this.model.getAttributes(), 
								debtor: this.debtor.getAttributes(),
								vatLiable: myAPP.currentAccount && myAPP.currentAccount.get( "vat_liable" ),
								view: self
							});


	},

	// called inside the template
	// 
	// NB invoice is not a model, but the array returned by invoice.getAttributes()
	renderStatus: function (invoice) {

							var labelClass, charCode, tooltip, html,labelText, htmlSuffix;

							var status = invoice.status;
							if (invoice.isCreditInvoice && status === "send") {
								status = "credit";
							}

							switch (status) {
								case "draft": case "ready": case "approved": case "send": case "stopped": case "sending":
									labelClass = ""; break;
								
								case "reminder": case "summation":	
									labelClass = "warning"; break;

								case "collection": case "objection":	
									labelClass = "error"; break;

								case "redeemed": case "debited": case "payment_plan": case "paused": 
									labelClass = "info"; break;
								
								case "payed":	
									labelClass = "success"; break;
							}									

							labelText = myAPP.texts.labels[status];
							charCode = myAPP.templateHelpers.charCodes[status];
							tooltip = (myAPP.texts.tooltips[status] || "").replace(/%date%/, myAPP.templateHelpers.parseDate(invoice.modified));
							
							if (status === "approved") {
								tooltip = tooltip.replace(/%days%/, invoice.daysUntilSend)
							}

							if (status === "send") {				
								if (invoice.daysUntilDue > 0) {
									tooltip = tooltip.replace(/%days%/, invoice.daysUntilDue);				
									if (invoice.daysUntilDue === 1)			
										tooltip = tooltip.replace("dagen", "dag");
									htmlSuffix = "<span class=\"daysUntilDue myAPP-tooltip\" data-tooltip=\"" + tooltip + "\">" + invoice.daysUntilDue + " d</span>";
								} else {
									tooltip = myAPP.texts.tooltips.sendDue.replace(/%date%/, myAPP.templateHelpers.parseDate(invoice.dueDate));
								}
							}

							html = "<div class=\"value myAPP-tooltip " + labelClass + "\" data-tooltip=\"" + tooltip + "\">" + 
									"<span class='entype'>" + charCode + "</span><div class=\"text\">" + labelText + "</div></div>";

							if (htmlSuffix) {
								html += htmlSuffix;
							}

							return html;
	},

	clickHandler: function (event) {				

							var $targets = $(event.target).parents().andSelf();
							if ($targets.is(".button-disabled"))
								return "disabled";

							if ($targets.is("#account_debtor_id .placeholder")) {
								this.$el.find("#account_debtor_id input").focus();
								return "focus accountInput";	
							}
			
							for (var selector in this.clickEvents) {

								if ($targets.is(selector)) {																		

									this[ this.clickEvents[selector] ]();
								}

							}
	},	

	dropdownHandler: function (event, value) {
							
							switch( value ) {

								// actions
								case "pause":					this.pauseInvoice(); break;
								case "unpause":					this.unpauseInvoice(); break;
								case "bookPayment":				this.bookPayment(); break;						
								case "creditInvoice":			this.createCreditInvoice(); break;	
								case "redeem":					this.redeemInvoice(); break;
								case "archive":					this.archiveInvoice(); break;
								case "resend":					this.resendInvoice(); break;
								case "startCycle":				this.startCycle(); break;
								case "sendReminder":			this.sendReminder(); break;
								case "sendSummation":			this.sendSummation(); break;
								case "delete":					this.deleteInvoice(); break;
								case "changeDeliveryMethod":	this.changeDeliveryMethod(); break;

								// pdfs								 
								case "showOriginal":			this.showOriginalPdf(); break;
								case "showReminder":			this.showReminderPdf(); break;
								case "showSummation":			this.showSummationPdf(); break;

							}
	},

	pauseInvoice: function () {
							var self = this;

							if (!this.model.get("canPauseInvoice")) {
								alert("Kan deze factuur niet pauzeren");
								return;
							}

							confirm("Invordering factuur pauzeren?", function () {
							
								self.$el.startSpinner();
								self.model.pause({
									success: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', "Factuur gepauzeerd", 'success');		
									self.onPauseSuccess();							
									},
									error: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', "Pauzeren factuur mislukt", 'error');
									}

								});

							});

	},

	unpauseInvoice: function () { 

							var self = this;

							if (!this.model.get("canUnpauseInvoice")) {
								alert("Kan deze factuur niet herstarten");
								return;
							}

							confirm("Invordering factuur hervatten?", function () {
							
								self.$el.startSpinner();
								self.model.unpause({
									success: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', "Factuur herstart", 'success');
										self.onUnpauseSuccess();

										// update status
									},
									error: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', "Herstarten factuur mislukt", 'error');

									}

								});
							});

	},

	redeemInvoice: function () {

							var self = this;

							if (!this.model.get("canRedeemInvoice")) {
								alert("Kan deze factuur niet kwijtschelden");
								return;
							}

							confirm( myAPP.texts.redeemInvoice, function () {

								self.$el.startSpinner();
								self.model.redeem({ 
									success: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Factuur kwijtgescholden', 'success');
										self.onRedeemSuccess();
									},
									error: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Kwijtschelden mislukt', 'error');
									}

								});
							});

	},

	resendInvoice: function () {

							var self = this;

							if (!this.model.get("canResendInvoice")) {
								alert("Kan deze factuur niet opnieuw verzenden.");
								return;
							}

							confirm("Factuur opnieuw verzenden?", function () {

								self.$el.startSpinner();
								self.model.resend({ 
									success: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Factuur opnieuw verzonden', 'success');
										//self.onResendSuccess();
									},
									error: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Opnieuw versturen factuur mislukt', 'error');
									}

								});
							});
	},

	startCycle: function () {

							var self = this;

							if (!this.model.get("canStartCycle")) {
								alert("Kan geen invordering voor deze factuur starten.");
								return;
							}

							confirm("Invordering starten? Let op: er wordt direct een herinnering verzonden", function () {

								self.$el.startSpinner();
								self.model.startCycle({ 
									success: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Invordering gestart', 'success');
									},
									error: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Starten invordering mislukt', 'error');
									}

								});
							});
	},

	sendReminder: function () {

							var self = this;

							if (!this.model.get("canSendReminder")) {
								alert("Kan geen herinnering voor deze factuur verzenden.");
								return;
							}

							confirm("Herinnering verzenden?", function () {

								self.$el.startSpinner();
								self.model.sendReminder({ 
									success: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Herinnering verzonden', 'success');
									},
									error: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Verzenden herinnering factuur mislukt', 'error');
									}

								});
							});
	},

	sendSummation: function () {

							var self = this;

							if (!this.model.get("canSendSummation")) {
								alert("Kan geen aanmaning voor deze factuur verzenden.");
								return;
							}

							confirm("Aanmaning verzenden?", function () {

								self.$el.startSpinner();
								self.model.sendSummation({ 
									success: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Aanmaning verzonden', 'success');
									},
									error: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Verzenden aanmaning factuur mislukt', 'error');
									}

								});
							});
	},

	archiveInvoice: function () {

							var self = this;

							var callback = function () {
								
								self.$el.startSpinner();
								self.model.archive({ 
									success: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Factuur gearchiveerd', 'success');		
										window.history.back();								
									},
									error: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Archiveren mislukt', 'error');
									}

								});
							};


							if (!this.model.get("canArchiveInvoice")) {
								alert("Kan deze factuur niet archiveren");
								return;
							}

							confirm("Factuur archiveren?", function () { 

								if (self.model.get("hasCreditInvoices")) {

									confirm("Voor deze factuur zijn creditfacturen verzonden. Deze zullen ook automatisch gearchiveerd worden als u deze factuur archiveert. Doorgaan?",
										callback);
								} else {
									callback();
								}
							
							});

	},

	onPauseSuccess: function () {
							// var $html = $(this.renderTemplate());
							// var $status = this.$el.find("#status")
							// //$status.addClass("info");
							// myAPP.animations.blink($status, $html.find("#status").children());														
							// 
							this.update();

	},

	onUnpauseSuccess: function () {
							// var $html = $(this.renderTemplate());

							// var $status = this.$el.find("#status")
							// myAPP.animations.blink($status, $html.find("#status").children());							
							// 
							this.update();
							

	},

	onRedeemSuccess: function () {
							this.update();
	},
	
	showPdf: function () {
							
							var url = this.model.get("pdfUrl");
							var pdfWindow = window.open("loader.html", null, "menubar=0, width=640px, height=800px");

							// force browser to first display loader.html by setting a small timeout
							setTimeout(function () { 
								pdfWindow.location = url;
							}, 100);

	},

	showOriginalPdf: function () {

							var url = this.model.get("originalPdfUrl");
							var pdfWindow = window.open("loader.html", null, "menubar=0, width=640px, height=800px");

							// force browser to first display loader.html by setting a small timeout
							setTimeout(function () { 
								pdfWindow.location = url;
							}, 100);
	},

	showReminderPdf: function () {

							var url = this.model.get("reminderPdfUrl");
							var pdfWindow = window.open("loader.html", null, "menubar=0, width=640px, height=800px");

							// force browser to first display loader.html by setting a small timeout
							setTimeout(function () { 
								pdfWindow.location = url;
							}, 100);


	},

	showSummationPdf: function () {

							var url = this.model.get("summationPdfUrl");
							var pdfWindow = window.open("loader.html", null, "menubar=0, width=640px, height=800px");

							// force browser to first display loader.html by setting a small timeout
							setTimeout(function () { 
								pdfWindow.location = url;
							}, 100);

	},

	showDetails: function () {
							var status = this.model.get("status");

							if (status === "payed") {
								var payment = myAPP.payments.findWhere({ invoice_id : this.model.get("id") });
								if (payment) {
									myAPP.router.navigate("betalingen/" + payment.get("id"), { trigger: true });
								}
								return;
							}
							
							if (status === "objection") {
								var objection = myAPP.objections.findWhere({ invoice_id : this.model.get("id") });
								if (objection) {
									myAPP.router.navigate("debiteuren/bezwaren/" + objection.get("id"), { trigger: true });
								}
								return;
							}

							if (status === "debited") {
								var creditInvoice = this.model.creditInvoices.at(0);
								if (creditInvoice) {
									myAPP.router.navigate("facturen/facturen/" + creditInvoice.get("id"), { trigger: true });
								}
								return;
							}
							
							if (this.model.get("isCreditInvoice")) {
								var parentInvoice = myAPP.invoices.get( this.model.get("parent_credit_id"));
								if (parentInvoice) {
									myAPP.router.navigate("facturen/facturen/" + parentInvoice.get("id"), { trigger: true });	
								}
							}
							
	},

	showDebtor: function () { 
							var debtorId = this.model.debtor.get( "id" );
							myAPP.router.navigate("debiteuren/debiteuren/" + debtorId, { trigger: true });
	},
	
	createCreditInvoice: function (confirmed) {	
							var self = this;
							
							// this crazy structure is because I replaced browser confirm boxes with my own boxes late in the game.
							if (this.model.get( "hasCreditInvoices" ) && !confirmed) {
								confirm( myAPP.texts.alreadyHasCreditInvoice, function () {
									self.createCreditInvoice( /* confirmed */ true);
								});
								return;
							}

							var creditInvoice = this.model.toCreditInvoice();

							// create a new view for the credit invoice
							var view = new myAPP.views.CreditInvoiceView({ model: creditInvoice });
							myAPP.animations.slideLeft({ oldElement: this.$el, newElement: view.$el });

							myAPP.clearTooltips();

							// update hash;
							myAPP.router.appendHash('creditfactuur');

							var _oldView = this;
							view._oldView = _oldView;

							view.listenToOnce( myAPP.router, "route", function () { 

								myAPP.animations.slideRight({ oldElement: view.$el, newElement: _oldView.$el, callback: function () { 
									view.remove();
								} });

							});

							// debugging
							myAPP.view = view;

	},

	deleteInvoice: function () {
							var self = this;

							confirm(myAPP.texts.deleteInvoice, function () {

								self.$el.startSpinner();

								self.model.destroy({
									success: function () {																	
										self.$el.stopSpinner();
										myAPP.trigger("toast", "factuur verwijderd", "success");
										window.history.back();
										 
									},

									error: function () { 
										myAPP.trigger("toast",  "verwijderen factuur mislukt", "error");
										self.$el.stopSpinner();
									}

								});


							});
	},

	changeDeliveryMethod: function () {
							myAPP.invoice = this.model;

							var self = this;
							myAPP.animations.openPopup( JST["templates/popups/change-delivery-method.html"]({ invoice: this.model.getAttributes() }))

							var $popup = $("#change-delivery-method");

							// set handlers
							$popup.on("dropdown", function (event, value) { 
								self.model.set({ delivery_method: value });
							})

							$popup.find("#save").on("click", function () {

								$popup.find(".wrapper").startSpinner();

								self.model.save({ delivery_method: self.model.attributes.delivery_method 
								},
								{									
									success: function () { 
										$popup.find(".wrapper").stopSpinner()
										myAPP.animations.closePopup();
										myAPP.animations.blink($("#invoice-details #delivery_method .value"), 
											myAPP.texts.values.delivery_method[self.model.get("delivery_method")]);
										myAPP.animations.flashElement($("#invoice-details"), 'success')
									},
									error: function () { 
										$popup.find(".wrapper").stopSpinner()
									},
									patch: true
								});

							})

	},


	bookPayment: function () {

							myAPP._invoice_id = this.model.get( "id" );
							myAPP.clearTooltips();
							myAPP.router.navigate( "betalingen/nieuw", { trigger: true });
	},

	remove: function ()	{
							
							this.invoiceLinesView.remove();	
							myAPP.clearDropdowns();						
							myAPP.clearTooltips();
							Backbone.View.prototype.remove.apply(this, arguments);
	}

});



//------------------------------------



myAPP.views.InvoicesCollectionView = Backbone.View.extend({

	events: {
		"click .table-body .table-row": "clickHandler"

	},

	initialize: function () {
						var self = this;

						this.template = JST["templates/invoices/invoices-collection.html"];

						// default to invoices collection if no collection was passed.
						if (!this.collection) {							
							this.collection = new Backbone.Collection( myAPP.invoices );
						}	
						

						this.listenTo(myAPP.invoices, 'add remove', function () {																		
							this.collection = new Backbone.Collection( myAPP.invoices.models );
						});

						this.listenTo(myAPP.invoices, 'update', function () {							
							self.render();						
						});

						// sort collection on invoice date;						
						this.collection.comparator = function (model) { return -1 * (model.get("date") && model.get("date").getTime()); };
						this.collection.sort();

						// we need to call the super method to activate the base class initialize method;
						Backbone.View.prototype.initialize.apply(this, arguments);

	},

	// called inside the template
	renderStatus: function (invoice) {

						var labelClass, charCode, tooltip, html,labelText, htmlSuffix;

						var status = invoice.status;
						if (invoice.isCreditInvoice && status === "send") {
							status = "credit";
						}

						switch (status) {
							case "draft": case "ready": case "approved": case "send": case "stopped": case "sending": case "credit":
								labelClass = ""; break;
							
							case "reminder": case "summation":	
								labelClass = "warning"; break;

							case "collection": case "objection":	
								labelClass = "error"; break;

							case "redeemed": case "debited": case "payment_plan": case "paused": 
								labelClass = "info"; break;
							
							case "payed":	
								labelClass = "success"; break;
						}	

						labelText = myAPP.texts.labels[status];
						charCode = myAPP.templateHelpers.charCodes[status];
						tooltip = (myAPP.texts.tooltips[status] || "").replace(/%date%/, myAPP.templateHelpers.parseDate(invoice.modified));
						
						if (status === "approved") {
							tooltip = tooltip.replace(/%days%/, invoice.daysUntilSend)
						}
						
						if (status === "send") {				
							if (invoice.daysUntilDue > 0) {
								tooltip = tooltip.replace(/%days%/, invoice.daysUntilDue);	
								if (invoice.daysUntilDue === 1)			
									tooltip = tooltip.replace("dagen", "dag");
								htmlSuffix = "<span class=\"daysUntilDue myAPP-tooltip\" data-tooltip=\"" + tooltip + "\">" + invoice.daysUntilDue + " d</span>";
							} else {
								tooltip = myAPP.texts.tooltips.sendDue.replace(/%date%/, myAPP.templateHelpers.parseDate(invoice.dueDate));
							}
						}

						html = "<span class=\"label label-" + labelClass + " myAPP-tooltip\" data-tooltip=\"" + tooltip + "\">" + 
								"<span class='entype'>" + charCode + "</span><span class=\"text\">" + labelText + "</span></span>";

						if (htmlSuffix) {
							html += htmlSuffix;
						}

						return html;
	},

	clickHandler: function (event) {
						var parameters = Backbone.history.getParameters();

						var $target = $(event.currentTarget);					

						if ($target.hasClass("placeholder"))
							return;
						
						var id = $target.attr("id");
						myAPP.router.navigate("facturen/facturen/" + id, { trigger: true });
	}	

}) 

.paginated() 

.sortable({ 
	debtor: function (a, b) {
		var debtorA = myAPP.debtors.get( a.get("account_debtor_id")),
			debtorB = myAPP.debtors.get( b.get("account_debtor_id")),
			valueA = (debtorA && debtorA.get("company_name").toLowerCase()) || "",
			valueB = (debtorB && debtorB.get("company_name").toLowerCase()) || "";

		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [a.get("date").getTime(), b.get("date").getTime()];
		}
			
	},

	total_inc_vat: function (a, b) {
		var valueA = Number(a.get("total_inc_vat")),
			valueB = Number(b.get("total_inc_vat"));
		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [a.get("date").getTime(), b.get("date").getTime()];
		}
		
	},

	invoice_number: function (a, b) {
		var valueA = Number(a.get("invoice_number")),
			valueB = Number(b.get("invoice_number"));

		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [a.get("date").getTime(), b.get("date").getTime()];
		}
		
	},

	status: function (a, b) {
		
		var statuses = ["approved", "collection", "summation", "reminder", "objection", "paused", "redeemed", "stopped", "payed", "credit", "debited", 
			"send", "draft", "ready"];

		var valueA = statuses.indexOf(a.get("status")),
			valueB = statuses.indexOf(b.get("status"));

		if (a.get("isCreditInvoice"))
			valueA = statuses.indexOf("credit");		
		if (b.get("isCreditInvoice"))
			valueB = statuses.indexOf("credit");		

		// if statuses, different, sort based on status
		if (valueA !== valueB) {
			return [valueA, valueB];
		}
		
		// otherwise, compar days until due;
		valueA = a.get("daysUntilDue"); 
		valueB = b.get("daysUntilDue");
		
		if (valueA !== valueB) {
			return [valueA, valueB];
		}

		// otherwise, look at invoice date
		return [a.get("date").getTime(), b.get("date").getTime()];		
		
	}

});


	






//------------------------------------



myAPP.views.InvoicesView = Backbone.View.extend({

	events: {		
		"click .button#new": "newInvoice",		
	},

	initialize: function() {

						var self = this,
							renderContent;

						this.template = JST["templates/invoices/invoices.html"];													
						renderContent = this.template();
						this.$el.html(renderContent)

						// soft fade-in
						this.$el.find(".invoices-pane").css({ opacity: 0 }).animate({ opacity: 1 })
						
						this.invoicesViewManager = new myAPP.views.ViewManager({ el: this.$el.find(".invoices-pane"), parent: this });

						this.invoicesViewManager.determineView = function (parameters, lastParameters) {							

							var view, 
								collection,
								invoice,
								periodical,
								quote;
							
							// filter out changes that don't affect this view;
							if ( lastParameters && lastParameters[1] === parameters[1] && lastParameters[2] === parameters[2] )
								return;

							// instance-view
							if (parameters[2]) {

								switch( parameters[1] ) {

									case "facturen": case "facturen-net": 

										// @todo: improve how global parameters are set and passed to editInvoiceView
										if (parameters[2] === "nieuw") {											
											invoice = new myAPP.models.Invoice();

											if (myAPP._debtor_id) {
												invoice.addDebtor( myAPP.debtors.get( myAPP._debtor_id ));
												myAPP._debtor_id = null;
											}

											if (myAPP._invoice_type) {
												switch(myAPP._invoice_type) { 
													case "quote": invoice.set({ type: myAPP._invoice_type }); break;
													case "periodical": invoice.set({ period: "1 month" }); break;
												}
												
												myAPP._invoice_type = null;
											}
											view = new myAPP.views.EditInvoiceView({ model: invoice });											
											

										} else {
											invoice = myAPP.invoices.get( parameters[2] );
											if (invoice.get( "status" ) === "draft" || invoice.get( "status") === "ready" ) {
												view = new myAPP.views.EditInvoiceView({ model: invoice }) ;
											} else {
												view = new myAPP.views.InvoiceView({ model: invoice });
											}

										}

										break;

									case "periodieken": 

										periodical = myAPP.periodicals.get( parameters[2] );
										view = new myAPP.views.PeriodicalView({ model: periodical });
										break;

									case "offertes":

										quote = myAPP.quotes.get( parameters[2] );
										view = new myAPP.views.QuoteView({ model: quote });
										break;

								}

								this.setCurrentView( view, /* removeLastView */ lastParameters && lastParameters[1] !== parameters[1] );
								this.animation = (lastParameters && lastParameters[2] === "nieuw") ?  myAPP.animations.slideRight: myAPP.animations.slideLeft;

								return true;

							} else {

								
							// collection-view 

								if (this._collectionView && lastParameters && lastParameters[1] === parameters[1]) {
									
									view = this._collectionView;
									this.animation = myAPP.animations.slideRight;

								} else {


									switch (parameters[1]) {
										case "facturen":		collection = myAPP.invoices;
																view = new myAPP.views.InvoicesCollectionView({ collection: collection }); break;
										case "periodieken":		view = new myAPP.views.PeriodicalsCollectionView(); break;
										case "offertes":		view = new myAPP.views.QuotesCollectionView(); break;

										case "facturen-net":	collection = new myAPP.collections.Invoices( myAPP.invoices.where({ imported: "1", status: "stopped" }) )	
																view = new myAPP.views.InvoicesCollectionView({ collection: collection }); break;
									}

									this._collectionView = view;	
									this.animation = myAPP.animations.drop;

								}
								
								this.setCurrentView( view, /* removeLastView */ true );									
								return true;

							}
							
						}							
						
	},
	
	render: function () {
						var parameters = Backbone.history.getParameters();

						//  set the correct sidebar tab to active
						this.$el.find(".sidebar li.tab").removeClass( "active" );
						this.$el.find(".sidebar li.tab#" + parameters[1]).addClass( "active" );


						this.invoicesViewManager.render();
	},	

	newInvoice: function (event) { 
						event.preventDefault();
						
						if ($(event.target).text().match(/offerte/i))
							myAPP._invoice_type = "quote";

						if ($(event.target).text().match(/periodiek/i))
							myAPP._invoice_type = "periodical"



						myAPP.router.navigate("facturen/facturen/nieuw", { trigger: true });
	},

	
}) 




//------------------------------------



myAPP.views.PeriodicalView = Backbone.View.extend({

	events: {
		//"click #pause": "pauseInvoice",
		//"click #unpause": "unpauseInvoice",

		"click #delete": "deletePeriodical",
		"click #debtor .value": "showDebtor",

		"click #viewInstances": "showInstances",
		"click .periodical-instances .table-body .table-row": "showPDF"
	},


	initialize: function () {
							var self = this;
							
							this.template = JST["templates/invoices/periodical.html"];

							// fetch debtor if one exists for this periodical
							this.debtor = myAPP.debtors.get(this.model.get( "account_debtor_id" ))


							if (this.model.get("account_debtor_id") && !this.debtor)
								throw "No debtor found to match this invoice, account_debtor_id: " + this.model.get("account_debtor_id")

							var renderContent = this.template({ periodical: this.model.getAttributes(), 
																invoice: this.model.invoice.getAttributes(), 
																debtor: this.debtor.getAttributes(),
																account: myAPP.currentAccount.getAttributes()
															});
							this.$el.html(renderContent);
							
							this.invoiceLinesView = new myAPP.views.InvoiceLinesView({ 
								el: this.$el.find(".invoice-lines"), 
								invoice: this.model.invoice, 
								editable: false
							})
							this.invoiceLinesView.render();		

							if (!this.model.hasInvoiceLinesFetched) {
								setTimeout(function () { self.$el.find(".invoice-lines").startSpinner(); }, 0)
								this.model.invoice.invoiceLines.fetch({
									success: function () {
										self.$el.find(".invoice-lines").stopSpinner();								
										self.invoiceLinesView.render();
										self.model.hasInvoiceLinesFetched = true;
									},

									error: function () {
										alert("Kon de factuurregels niet ophalen voor deze periodiek")
									}
								})
							}				
							
							myAPP.periodical = this.model;
							
							this.listenTo(this.model, 'update', function () { self.update() })

							// we need to call the super method to activate the base class initialize method;
							Backbone.View.prototype.initialize.apply(this, arguments);
							
	},

	update: function () {
							//this.$el.css({ opacity: 0 })
							var renderContent = this.template({ periodical: this.model.getAttributes(), 
																invoice: this.model.invoice.getAttributes(), 
																debtor: this.debtor.getAttributes(),
																account: myAPP.currentAccount.getAttributes()
															});

							var $statusHtml = $(renderContent).find( "#status" );

							myAPP.animations.blink(this.$el.find("#status"), $statusHtml)
							myAPP.animations.blink(this.$el.find("#children .value"), this.model.get("children"))

	},

	render: function () {
							var hash = Backbone.history.getFragment();
							if (hash.match(/exemplaren/)) {
								this.showInstances();
							} else if (this.isShowingInstances) {
								this.hideInstances();
							}

	},

	remove: function ()	{
							this.invoiceLinesView.remove();							

							Backbone.View.prototype.remove.apply(this, arguments)
	},

	deletePeriodical: function () {

							var self = this;

							confirm("Periodiek verwijderen?", function () {
							
								self.$el.startSpinner();

								self.model.stop({ 

									success: function () {
										self.$el.stopSpinner();									
										myAPP.trigger("toast", "periodiek verwijderd", "success")
										window.history.back();
									},
									
									error: function () {
										self.$el.stopSpinner();
										myAPP.trigger("toast",  "verwijderen periodiek mislukt", "error");
									}
									
								})
							})

	},

	showInstances: function () {
					
							if (this.isShowingInstances) {
								window.history.back();
								this.hideInstances();
								return;
							}

							var hash = Backbone.history.getFragment();
							if (!hash.match(/exemplaren/))
								myAPP.router.navigate(hash + "/exemplaren")

							this.isShowingInstances = true;

							// fixate wrapper element's height
							var height = this.$el.find(".periodical-body").height()
							this.$el.find(".periodical-body").height(height);

							var html = JST["templates/invoices/periodical-instances.html"]({ collection: this.model.childInvoices })							
							myAPP.animations.drop({ oldElement: this.$el.find(".periodical-body .animation-wrapper"), newElement: $(html) })

							// animate toggle;
							var $button = this.$el.find("#viewInstances");
							myAPP.animations.blink($button, "<span class='entype'>" + myAPP.templateHelpers.charCodes.back + "</span>Terug")
							$button.attr("data-tooltip", myAPP.texts.tooltips.back)

	},

	hideInstances: function () {
							var self = this;

							myAPP.animations.lift({ oldElement: this.$el.find(".periodical-instances"), newElement: this.$el.find(".periodical-body .animation-wrapper"),
								callback: function () { self.isShowingInstances = false }, remove: true })

							// restore original button state;
							var $button = this.$el.find("#viewInstances");
							myAPP.animations.blink($button, "<span class='entype'>" + myAPP.templateHelpers.charCodes.invoices + "</span>Verzonden exemplaren")
							$button.attr("data-tooltip", myAPP.texts.tooltips.viewPeriodicalInstances)

	},

	showPDF: function (event) { 
							var invoiceId = $(event.currentTarget).attr("id");

							var invoice = this.model.childInvoices.get(invoiceId);

							var url = myAPP.apiUrl + "accounts/" + myAPP.currentAccount.get("id") + "/invoices/" + invoiceId + "/pdf/" + invoice.get("view_hash");

							var pdfWindow = window.open(url, null, "menubar=0, width=640px, height=800px");

	},

	showDebtor: function () { 
							var debtorId = this.debtor.get( "id" );
							myAPP.router.navigate("debiteuren/debiteuren/" + debtorId, { trigger: true });
	},



}) .saveable();



//------------------------------------



myAPP.views.PeriodicalsCollectionView = Backbone.View.extend({

	events: {
		"click .table-body .table-row": "clickHandler"
	},

	initialize: function () {
							var self = this;

							this.template = JST["templates/invoices/periodicals-collection.html"];
							this.collection = myAPP.periodicals;

							this.listenTo( myAPP.periodicals, 'update', function () {
								self.render();								
							})
							
							// we need to call the super method to activate the base class initialize method;
							Backbone.View.prototype.initialize.apply(this, arguments);

	}, 

	updatePageNumbers: function () {			
						this.$el.find("span#total-pages").html(this.totalPages());
						var $oldElement = this.$el.find("span#current-page");
						var lastPage = Number($oldElement.html());

						if (lastPage === this.currentPage + 1)
							return;

						var height = $oldElement.css("height")
						var $parent = $oldElement.parent();
						var $newElement = $("<span id='current-page'></span>").html(this.currentPage + 1).appendTo($parent)
						
						if (lastPage < this.currentPage + 1) {												
							
							$newElement
								.css({position: "absolute", top: -20}).animate({top: 0}, {easing: "easeOutCubic"});
							$oldElement.css({position: "absolute"}).animate({top: height}, {easing: "easeOutCubic", complete: function () { $oldElement.remove() }})							

						} else {

							$newElement
								.css({position: "absolute", top: 20}).animate({top: 0}, {easing: "easeOutCubic"});
							$oldElement.css({position: "absolute"}).animate({top: -20}, {easing: "easeOutCubic", complete: function () { $oldElement.remove() }})

						}						

	},

	clickHandler: function (event) {	

						var $target = $(event.currentTarget);					

						if ($target.hasClass("placeholder"))
							return;
						
						var id = $target.attr("id");
						myAPP.router.navigate("facturen/periodieken/"+ id, {trigger: true})
	}

}) .paginated() .sortable({ 
							
						// comparators
							})



//------------------------------------



myAPP.views.QuoteView = Backbone.View.extend({

	events: {

		"click #show-pdf":		"showPDF",		
		"click #delete":		"deleteInvoice",
		"click #debtor .value": "showDebtor",

		"dropdown":				"dropdownHandler"

	},

	initialize: function () {
						var self = this;

						if (!this.model)
								throw "Can't create quoteView without invoice";

						this.debtor = this.model.debtor || new myAPP.models.Debtor();
						this.template = JST["templates/invoices/quote.html"];

						this.render();

						this.listenTo(this.model, 'sync', function () { self.update(); });

						myAPP._dropdownObject = this.model;	

						// we need this additional update, to reinitialize the model used by this view
						// because of javascript closure?
						this.listenTo(myAPP, 'resourcesLoaded', function () {
							self.model = myAPP.quotes.get(self.model.get("id"));
							self.debtor = myAPP.debtors.get(self.debtor.get("id"));
						});

						// we need to call the super method to activate the base class initialize method;
						Backbone.View.prototype.initialize.apply(this, arguments);
						
	},

	showDebtor: function () { 
							var debtorId = this.model.debtor.get( "id" );
							myAPP.router.navigate("debiteuren/debiteuren/" + debtorId, { trigger: true });
	},

	render: function () {
							var self = this;

							// render template						
							this.$el.html( this.renderTemplate() );

							this.invoiceLinesView = new myAPP.views.InvoiceLinesView({ 
								el: this.$el.find(".invoice-lines"), 
								invoice: this.model, 
								editable: false							

							});
							this.invoiceLinesView.render();	

							this.$el.find(".invoice-lines").startSpinner();
							this.model.fetchInvoiceLines({
								success: function () { 
										self.$el.find(".invoice-lines").stopSpinner();
										self.invoiceLinesView.render();
									}
							});
	},

	renderTemplate: function () {

						return this.template({ 
							quote: this.model.getAttributes(), 
							debtor: this.debtor.getAttributes(),
							vatLiable: myAPP.currentAccount && myAPP.currentAccount.get( "vat_liable" )							
						});

	},

	update: function () { 
							
						var $renderContent = $( this.renderTemplate() ),
							$buttons = $renderContent.filter( ".buttons" ),
							$statusHtml = $renderContent.find( "#status" );

						myAPP.animations.blink(this.$el.find("#invoice-number .value"), this.model.get("invoice_number"));
						myAPP.animations.blink(this.$el.find("#status"), $statusHtml);

						if ($buttons.html() !== this.$el.find(".buttons").html())
							myAPP.animations.blink(this.$el.find(".buttons"), $buttons.children());
	},

	showPDF: function () {

						var url = this.model.get("pdfUrl");
						var pdfWindow = window.open("loader.html", null, "menubar=0, width=640px, height=800px");

						// force browser to first display loader.html by setting a small timeout
						setTimeout(function () { 
							pdfWindow.location = url;
						}, 100);

	},

	dropdownHandler: function (event, value) {

						switch( value ) {

							case "resend":				this.resendInvoice(); break;
							case "createInvoice":		this.createInvoice(); break;							

						}

	},

	deleteInvoice: function () {
		
						var self = this;

						confirm("Offerte verwijderen?", function () {

							self.$el.startSpinner();

							self.model.destroy({
								success: function () {																	
									self.$el.stopSpinner();
									myAPP.trigger("toast", "factuur verwijderd", "success");
									window.history.back();										 
								},
								error: function () { 
									myAPP.trigger("toast",  "verwijderen factuur mislukt", "error");
									self.$el.stopSpinner();
								}

							});

						});

	},


	resendInvoice: function () {

							var self = this;

							if (!this.model.get("canResendInvoice")) {
								alert("Kan deze offerte niet opnieuw verzenden.");
								return;
							}

							confirm("Offerte opnieuw verzenden?", function () {

								self.$el.startSpinner();
								self.model.resend({ 
									success: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Offerte opnieuw verzonden', 'success');
										//self.onResendSuccess();
									},
									error: function () {
										self.$el.stopSpinner();
										myAPP.trigger('toast', 'Opnieuw versturen offerte mislukt', 'error');
									}

								});
							});
	},

	createInvoice: function () {

						var invoice = new myAPP.models.Invoice({ 
							delivery_method: this.model.get( "delivery_method" ),							
						});

						invoice.addDebtor( this.model.debtor );

						// copy the invoiceLines;

						this.model.invoiceLines.each(function(invoiceLine) {											
								var _quoteInvoiceLine = new myAPP.models.InvoiceLine( invoiceLine.toJSON() );
								_quoteInvoiceLine.set({
									// overwrite ID property or backbone won't add to collection;
									id: null,
									invoice_id: invoice.cid,									
								});
								
								invoice.invoiceLines.add( _quoteInvoiceLine );											
							});	

						var view = new myAPP.views.EditInvoiceView({ model: invoice });

						view.$el.find( "#_invoice_type" ).remove();

						// override update on approve functions;

						view.updateViewOnApprove = function () {

							var viewManager = this._oldView.viewManager;

							// remove the old view for the invoice for which we created a credit invoice;							
							this._oldView.remove();

							// // stop listening to router events	
							this.stopListening( myAPP.router );

							var view = new myAPP.views.InvoiceView({ model: this.model, el: this.$el });

							// @@SHIT
							if (viewManager) {
								viewManager.setCurrentView( view );
							}
							
						};

						view.updateHashOnApprove = function () {
							var self = this;
		
							this.listenToOnce( myAPP.router, "route", function () {								
								myAPP.router.navigate("facturen/facturen/" + self.model.get( "id" ), { replace: true });
							});

							window.history.back();
						};


						myAPP.animations.slideLeft({ oldElement: this.$el, newElement: view.$el });						

						// setup navigation properly
						var currentHash = Backbone.history.getFragment();
						myAPP.router.navigate( currentHash + "/factuur", { trigger: true });

						var _oldView = this;
						view._oldView = _oldView;

						view.listenToOnce( myAPP.router, "route", function () { 

								myAPP.animations.slideRight({ oldElement: view.$el, newElement: _oldView.$el, callback: function () { 
									view.remove();									
								} });

						});

						// debugging;
						myAPP.view = view;						 

	}


});





//------------------------------------



myAPP.views.QuotesCollectionView = Backbone.View.extend({

	events: {
		"click .table-body .table-row": "clickHandler",	

	},

	initialize: function () {
						var self = this;

						this.template = JST["templates/invoices/quotes-collection.html"];

						// default to invoices collection if no collection was passed.
						if (!this.collection)
							this.collection = new Backbone.Collection(myAPP.quotes.models);
																
						this.listenTo(myAPP.invoices, 'add remove', function () { 
							// sync collection after new model was added;							
							self.collection = new Backbone.Collection(myAPP.quotes.models);
						});

						this.listenTo(myAPP, 'resourcesLoaded', function () {
							// get pointer to the (new) collection
							self.collection = myAPP.quotes;
						})

						// we need to call the super method to activate the base class initialize method;
						Backbone.View.prototype.initialize.apply(this, arguments);
	},

	clickHandler: function (event) {	

						var $target = $(event.currentTarget);					

						if ($target.hasClass("placeholder"))
							return;
						
						var id = $target.attr("id");
						myAPP.router.navigate("facturen/offertes/"+ id, {trigger: true});
	}

})

.paginated() 

.sortable({ 
	debtor: function (a, b) {
		var debtorA = myAPP.debtors.get( a.get("account_debtor_id")),
			debtorB = myAPP.debtors.get( b.get("account_debtor_id")),
			valueA = (debtorA && debtorA.get("company_name").toLowerCase()) || "",
			valueB = (debtorB && debtorB.get("company_name").toLowerCase()) || "";

		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [a.get("date").getTime(), b.get("date").getTime()];
		}
			
	},

	total_inc_vat: function (a, b) {
		var valueA = Number(a.get("total_inc_vat")),
			valueB = Number(b.get("total_inc_vat"));
		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [a.get("date").getTime(), b.get("date").getTime()];
		}
		
	},
	
	status: function (a, b) {
		
		var statuses = ["approved", "collection", "summation", "objection", "reminder", "paused", "stopped", "redeemed", "debited", 
			"send", "payed", "draft", "ready"];
		
		var valueA = statuses.indexOf(a.get("status")),
			valueB = statuses.indexOf(b.get("status"));
		
		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [a.get("date").getTime(), b.get("date").getTime()];		
		}
	}

});


	






//------------------------------------



myAPP.views.ImportAccountView = Backbone.View.extend({ 

	events: {

		"click #import": "importAccount"

	},

	initialize: function () {


	},

	showErrorMessage: function (message) {
								
								this.$el.find( "#error-message" ).stop().css({display: "block", opacity: 0}).text(message).animate({opacity: 1});

	},

	removeErrorMessage: function () {
								var self = this;
								this.$el.find( "#error-message" )
									.stop()
									.animate({opacity: 0}, {complete: function () { 
										self.$el.find( "#error-message" ).css({display: "none"});
									}});
	},

	importAccount: function () {	
								var self = this;

								this.removeErrorMessage();

								this.username = this.$el.find("input#username").val();								
								
								if (!this.username) {
									this.showErrorMessage("Vul een gebruikersnaam of email in");
									return;
								}

								var password = this.$el.find("input#password").val();

								if (!password) {
									this.showErrorMessage("Vul uw wachtwoord in");
									return;
								}							

								this.$el.startSpinner();

								var importObject = new myAPP.models.ImportObject({ username: this.username, password: password, mode: "test" });
								importObject.save({}, {
									success: function () {
										self.$el.stopSpinner();																				
										var html = JST["templates/popups/import-account.html"]({ importObject : importObject, user: self.username });
										myAPP.animations.blink( self.$el.find(".inputs"), $(html).find(".progress") );
										self.pollUntilFinished( importObject );
									},
									error: function ( model, response, options) {
										self.$el.stopSpinner();										
										if (response.responseText.match(/Invalid\suser/))
											self.showErrorMessage("Geen facturen.net account gevonden");
										else if (response.responseText.match(/already\simported\sas\sfinal/))
											self.showErrorMessage("Deze account is al definitief geimporteerd uit facturen.net");
										else if (response.responseText.match(/Current\simport\sis\snot\syet\sfinished/))
											self.showErrorMessage("De import voor deze account is nog niet afgerond.");
									}
								});	

								myAPP.importObject = importObject;

	},

	pollUntilFinished: function ( importObject ) {

								var self = this;								

								importObject.fetch( {									
									success: function () {										
										var callback;

										if (importObject.get("status") !== "finished") {
											setTimeout( function () { self.pollUntilFinished(importObject); }, 1000);
										} else {
											callback = function () { self.updateOnFinish(); };
										}

										self.updateView( importObject, callback );

									},
									error: function () { }
								});
	},

	updateView: function (importObject, callback)  {

								var percentage = importObject.get("percentage"),
									totalJobs = importObject.get("total_jobs");

								this.$el.find(".number").html(percentage);

								var html = JST["templates/popups/import-account.html"]({ importObject : importObject.getAttributes(), user: this.username });
								this.$el.find(".progress ul.totals").replaceWith( $(html).find(".progress-content ul.totals") );

								this.$el.find(".progress-bar .indicator")
									.stop(true)
									.animate({ width: percentage + "%" }, { complete: function () { if (callback) callback (); } });

	},

	updateOnFinish: function () { 
								var $progressContent = this.$el.find( ".progress-content" ), 
									$button = this.$el.find( ".button" );
									// height = $("body").find(".popup .content").height();

								myAPP.animations.flashElement( $( ".content" ), "success" );
								$(".content").animate({ height: 250 }, { easing: "easeOutCubic", queue: false });


								$progressContent.animate({ opacity: 0 }, { complete: function () { $progressContent.remove(); } });
								myAPP.animations.blink(this.$el.find( ".head h2 .text" ), "Import voltooid");
								myAPP.animations.blink(this.$el.find( ".body p" ), "De import van uw account is voltooid. U kunt nu inloggen met de gegevens van uw facturen.net account.");
								myAPP.animations.blink($button, "<span class='entype'>" + myAPP.templateHelpers.charCodes.close + "</span>Sluiten");
								$button.addClass( "close-button" );

	}


});



//------------------------------------



myAPP.views.LoginView = Backbone.View.extend({ 

	events: {		
		"click #sign-in": "login",
		"click #new-account": "newAccount",
		"click span#forgot-password": "forgotPassword",		
		"click #reset-password": "resetPassword",
		"click #login-with-account": "selectAccount",
		"dropdown": "dropdownHandler",

		"keyup": "keyupHandler"
	},

	initialize: function () { 
								var renderContent; 
								this.template = JST['templates/login/login.html'];
								renderContent = this.template();
								this.$el.html(renderContent);
						

								this.model = new Backbone.Model();
								this.model.namespace = "user";
								this.model.url = "users/lost_password";																				
	},

	login: function(event) {		
								if (this.isLoggingIn)			
									return;

								this.isLoggingIn = true;

								var self = this;					
						
								var formValues = {
									username: $("input#email").val(),
									password: $("input#password").val()
								}

								this.removeErrorMessage();
								this.$el.startSpinner();

								myAPP.session.fetchUser(formValues, { 
									success: function () {										
										self.$el.stopSpinner();										
										self.fetchAccounts();
										self.isLoggingIn = false;
									},

									error: function ( error ) {
										self.$el.stopSpinner();
										self.showErrorMessage( myAPP.texts.errors.incorrectLogin );
										self.isLoggingIn = false;
									}
								});						

	},

	fetchAccounts: function () {
								var self = this;

								this.$el.startSpinner()

								myAPP.session.fetchAccounts({ 
									success: function () {											

										if (myAPP.session.get( "hasMultipleAccounts" )) {
											self.$el.stopSpinner()
											self.showAccountSelect();
										} else {
											myAPP.session.login();
										}
									},
									error: function () {
										self.$el.stopSpinner()

										self.showErrorMessage( "Kon accounts niet ophalen" );	
									}

								})

	},

	newAccount: function () { 
								myAPP.router.navigate("aanmelden", {trigger: true})
	},

	forgotPassword: function () { 
								var renderContent;
								myAPP.router.navigate("verzend-wachtwoord")
								renderContent = JST["templates/login/forgot-password.html"]();
								myAPP.animations.drop({oldElement: this.$el.find(".body-content"), newElement: $(renderContent), top: 50, remove: true} );
	},

	resetPassword: function () { 
								var self = this;

								this.removeErrorMessage();
								var email = this.$el.find("input#reset-email").val();
								var match = email.match(myAPP.validationPattern.email);
								if (!match) {
									this.showErrorMessage(myAPP.texts.invalidEmail.replace(/%email%/, email));
									return;
								}
								
								// model refers to user trying to login; make a post with user email to url to reset password
								//this.model.set({ email: email })
								this.$el.startSpinner();

								this.model.save({
										email: email
									},
									{ 
										success: function () { 
											self.$el.stopSpinner();
											self.resetComplete(email);
										},
										error: function () { 
											self.$el.stopSpinner();
											self.showErrorMessage( myAPP.texts.emailNotFound )
										}
								});
	},

	resetComplete: function (email) { 
								var html = "<p>" + myAPP.texts.passwordResetSent.replace(/%email%/, "<br/><br/><span class=\"label label-info label-large email\">" + email + "</span><br/><br/>") + "</p>";
										myAPP.animations.drop({oldElement: this.$el.find(".body-content"), newElement: $(html), top: 50, remove: true})
	},

	showErrorMessage: function (message) {
								
								this.$el.find("#error-message").stop().css({display: "block", visibility: "visible", opacity: 0}).text(message).animate({opacity: 1});

	},

	removeErrorMessage: function () {
								var self = this;
								this.$el.find("#error-message").stop().animate({opacity: 0}, {complete: function () { self.$el.find("#error-message").css({visibility: "hidden"})}})
	},

	showAccountSelect: function () {
								var renderContent;
								var self = this;								

								renderContent = JST["templates/login/multiple-accounts.html"]({
									isSuperAdmin: myAPP.getUserRole() === "superadmin"
								});
						
								myAPP.animations.drop({ oldElement: this.$el.find(".body-content"), newElement: $(renderContent), top: 50, remove: true })
								this.hasAccountSelect = true;
							
								// we need a new keyhandler for the view because of the changes in the DOM;
								this._keyHandler = function (event) {
									
									// if on multiple account select, try to log on
									if (self.hasAccountSelect && event.keyCode === 13) {										
										self.selectAccount();
										return;
									}
								}

								$("body").on(" keyup", this._keyHandler)

								$("body").one("click", "#superadmin", function () {
									myAPP.session.loginAsSuperAdmin();
								})
							
	},


	dropdownHandler: function (event, value) {
								// store value from dropdown for when user clicks login button;
								this.accountId = value;
								
	},

	selectAccount: function () {
								if (!this.accountId) {									
									this.showErrorMessage(myAPP.texts.chooseAccount);
									return;
								} 

								var account = myAPP.accounts.findWhere({ id: this.accountId })

								this.$el.startSpinner();
								
								myAPP.session.login( account );
	},

	showImportAccount: function () { 
								var self = this;

								if (this.isImportingAccount) return;
								this.isImportingAccount = true;

								var html = JST["templates/popups/import-account.html"]({ importObject: false });

								myAPP.animations.openPopup(html, function () { self.isImportingAccount = false })

								var importAccountView = new myAPP.views.ImportAccountView();								
								importAccountView.setElement( $("body").find(".popup .content") )

	},

	keyupHandler: function (event)	{

								var $target = $(event.target),
									keyCode = event.keyCode						

								// enter
								if (keyCode === 13) {									

									// if enter on email input, jump to next input
									if ($target.attr("id") === "email" && $target.val()) {
										$target.blur();
										this.$el.find("input#password").focus();
										return;
									}

									// if enter on password field, check if both fields are filled and submit
									if ($target.attr("id") === "password") {
										if ($target.val() && this.$el.find("input#email").val())
											this.login();
										return;
									}

									if ($target.attr("id") === "reset-email" && $target.val()) {
										this.resetPassword();
										return;
									}

								}								

	}, 

	remove: function () {								
								$("body").off("keyup", this._keyHandler)
								myAPP.loginView = null;
								Backbone.View.prototype.remove.call(this, arguments)
	}

}) .saveable()



//------------------------------------



/**
 * 
 *		this view is for the signup screen that appears when clickign on the signup button under the login screen
 *		
 */

myAPP.views.SignupView = Backbone.View.extend({

	events: {
		"click #signup" : "signup",
		"click .forgot-password" : "forgotPassword",
		"click #reset-password": "resetPassword",

		"keyup input": "keyupHandler"
	},

	initialize: function() {
										var renderContent; 
										this.template = JST['templates/login/signup.html'];
										renderContent = this.template();
										this.$el.html(renderContent);
										
										this.model = new myAPP.models.Account();
										//this.listenTo(this.model, 'sync', this.syncHandler)
										
										// debugging										
										myAPP.view = this;
	},

	signup: function () {
										if (this._isSigningUp)
											return;

										var self = this;

										var accountTitle = this.$el.find("input#account-title").val();

										if (!accountTitle) {
											this.showErrorMessage(myAPP.texts.accountTitleRequired);			
											return;										
										}

										if (accountTitle.length < 2) {
											this.showErrorMessage(myAPP.texts.accountTitleLength)
											return;
										}
										// check email address
										var email = this.$el.find("input#email").val()
										if (!email) {
											this.showErrorMessage(myAPP.texts.emailRequired)
											return 
										}

										if (!email.match(myAPP.validationPattern.email)) {
											this.showErrorMessage( myAPP.texts.invalidEmail.replace(/%email%/, email) );
											return;
										}										
										
										// store email to display on success and error;
										this.email = email;
										
										this._isSigningUp = true

										this.$el.startSpinner();											

										this.model.save({
												title: accountTitle,
												vat_liable: 1,
												email: email,
												country: "nl",
												user: { name: "gebruiker", email: email, salutation: "Mr." }											
											},
											{ 
												success: function () {	
													self._isSigningUp = false;
													self.$el.stopSpinner();
													self.syncHandler();

												},
												error: function () {
													self._isSigningUp = false;
													self.$el.stopSpinner();								
													self.showErrorMessage("Dit email adres is al in gebruik. <a class=\"forgot-password\">Wachtwoord kwijt?</a>");												
												},
												patch: true
										});

	},

	syncHandler: function () { 
										
										var html = "<p>" + myAPP.texts.confirmationEmailSent.replace(/%email%/, "<br/><br/><span class=\"label label-large label-info email\">" + this.email + "</span><br/><br/>") + "</p>";

										this.$el.stopSpinner();
										myAPP.animations.drop({oldElement: this.$el.find(".body-content"), newElement: $(html), top: 50, remove: true})
	},

	showErrorMessage: function (message) {
										if (!this.$errorMessage)
											this.$errorMessage = this.$el.find("#error-message");
										
										this.$el.stopSpinner();

										this.$errorMessage.stop().css({display: "block", opacity: 0}).html(message).animate({opacity: 1});

	},

	forgotPassword: function () { 
										var renderContent;
										myAPP.router.navigate("verzend-wachtwoord")
										renderContent = JST["templates/login/forgot-password.html"]();
										myAPP.animations.drop({oldElement: this.$el.find(".body-content"), newElement: $(renderContent), top: 50, remove: true} );
										this.$el.find("#reset-email").val(this.email)
	},

	resetPassword: function () { 
										var self = this;

										//userthis.removeErrorMessage();
										var email = this.$el.find("input#reset-email").val();
										var match = email.match(myAPP.validationPattern.email);
										if (!match) {
											this.showErrorMessage( myAPP.texts.invalidEmail.replace(/%email%/, email) );
											return;
										}

										
										this.model = new Backbone.Model({ email: email });
										this.model.url = "users/lost_password";
										this.model.namespace = "user";
										this.saveModel({ success: function () { self.resetComplete(email) }});
	},

	resetComplete: function (email) { 
										var html = "<p>" + myAPP.texts.passwordResetSent.replace(/%email%/, "<br/><br/><span class=\"label label-large label-info email\">" + email + "</span><br/><br/>") + "</p>";
										myAPP.animations.drop({oldElement: this.$el.find(".body-content"), newElement: $(html), top: 50, remove: true})
	},

	keyupHandler: function (event)	{

								var $target = $(event.target),
									keyCode = event.keyCode
									
								// enter
								if (keyCode === 13) {

									// if enter on account-title, jump to next
									if ($target.attr("id") === "account-title" && $target.val())	{
										$target.blur();
										this.$el.find("input#email").focus();
										return;
									}

									// if enter on email, jump to next
									if ($target.attr("id") === "email" && $target.val()) {
										$target.blur();
										this.$el.find("input#confirm-email").focus();											
										return;
									}

									// if confirm email, sign up !
									if ($target.attr("id") === "confirm-email" && $target.val()) {
										if (this.$el.find("input#email").val() && this.$el.find("input#account-title").val())
											this.signup();
									}

								}

								

	}

});



//------------------------------------



myAPP.views.VerifyView = Backbone.View.extend({

	events: {
		"click #verify" : "verify",
		"click #sign-in": "login",

		"keyup input": "keyupHandler"
	},

	initialize: function() {
										
										var renderContent; 
										this.template = JST['templates/login/verify.html'];
										renderContent = this.template();
										this.$el.html(renderContent);

										this.model = new Backbone.Model();
										this.model.urlRoot = "users/" + myAPP._userId + "/password/" + myAPP._hash;
										this.model.namespace = "user";

										this.listenTo(this.model, 'error', this.errorHandler);

										myAPP.model = this.model;

	},

	verify: function (event) {
										var self = this;

										var password = this.$el.find("#password").val();

										if (password.length < 8) {
											this.showErrorMessage(myAPP.texts.passwordLength)
											return
										}

										var confirmPassword = this.$el.find("#confirm-password").val();

										if (password !== confirmPassword) {
											this.showErrorMessage(myAPP.texts.confirmPassword)
											return;
										}

										this.model.set({ password: confirmPassword });
										this.saveModel({ success: function () { self.passwordSaved() }}); 

	},

	login: function () { 
										myAPP.router.navigate("", {trigger: true})
	},

	passwordSaved: function() {
										var self = this;

										var $html = $(JST["templates/login/reset-complete.html"]());

										myAPP.animations.drop({oldElement: this.$el.find(".body-content"), newElement: $html, top: 50, remove: true });
										
										//$html.find("#login").css({ opacity: 0, display: "inline-block" });
										

	},

	showErrorMessage: function(message) {

										this.$el.find("#error-message").stop().css({display: "block", opacity: 0}).text(message).animate({opacity: 1})
	},

	errorHandler: function(model, xhr, options) {		
										var text = ""; 

										var responseObject = myAPP.parseErrorResponse(xhr)

										for (var key in responseObject) {
											text += key + ": " + responseObject[key] + " ";
										}

										if (text.match(/Incorrect\sdata\surl/) || text.match(/Invalid\sobject\sid\surl/))
											text = myAPP.texts.incorrectDataFromUrl.replace(/%email%/, 
												"<a class=\"email\" target=\"_blank\" href=\"mailto:info@kascooperatie.nl\">info@kascooperatie.nl</a>");										

										this.$el.find("#error-message")
											.css({display: "block", opacity: 0})
											.animate({opacity: 1})
											.html(text);
	},

	keyupHandler: function (event) {

										var $target = $(event.target),
											keyCode = event.keyCode;
											
										if (keyCode === 13) {

											if ($target.attr( "id" ) === "password" && $target.val()) {
												$target.blur();
												this.$el.find("input#confirm-password").focus();
												return;
											}

											if ($target.attr( "id" ) === "confirm-password" && $target.val()) {
												if (this.$el.find( "input#password" ).val())
													this.verify();
											}

										}

	}

})

myAPP.views.VerifyView.saveable(['password'])



//------------------------------------



myAPP.views.NewPaymentView = Backbone.View.extend({

	events: {
		"click #save.button" : "clickHandler",
		"autocomplete #invoice_id input": "autocompleteHandler",
		//"dropdown": "dropdownHandler",
		
		// placeholder tricks for auto complete input
		"click .placeholder": "clickPlaceholder",
		"keyup input": "focusHandler",

		"change #date-picker": "changeDatepickerHandler",

		"dropdown": "dropdownHandler"
	},

	initialize: function () {	
							var entries,
								self = this;	

							this.model = new myAPP.models.Payment({ payment_date: new Date() });
							this.template = JST["templates/payments/new-payment.html"];

							this.$el.html ( this.renderTemplate() );

							if (myAPP._invoice_id) {
								this.invoice = myAPP.invoices.get( myAPP._invoice_id );
								this.debtor = myAPP.debtors.get( this.invoice.get("account_debtor_id") )

								this.model.addInvoice( this.invoice )

								setTimeout(function () { self.model.trigger("change") }, 0)
								
								myAPP._invoice_id = null;

							} 

							//else {

								//this.debtor = new myAPP.models.Debtor();

							//}								

							this.toastOnError = "Aanmaken betaling mislukt!";
							this.toastOnSave = "Betaling aangemaakt";						

							this.listenTo(this, "modelValidates", function () {								
								this.$el.find("#save.button").removeClass("button-disabled", 400);
							})

							this.listenTo(this, "modelHasErrors", function () {								
								this.$el.find("#save.button").addClass("button-disabled", 400);
							})

							
							entries = new myAPP.collections.Invoices( myAPP.invoices.getPayableInvoices() ).createAutoCompleteEntries();

							//var entries = collection.createAutoCompleteEntries();
							myAPP.AutoComplete.initialize( this.$el.find( "#invoice_id input" ), entries )

							// debugging
							myAPP.payment = this.model;

	},

	renderTemplate: function () {

							return this.template({
								payment: this.model.getAttributes(),
								invoice:(this.invoice && this.invoice.getAttributes()) || {},								
								debtor: (this.debtor && this.debtor.getAttributes()) || {}
							})

	},

	// *************************************
	//
	//      DOM events
	//
	// *************************************

	clickHandler: function (event) {
							var self = this,				
								$target = $(event.target);

							if ($target.hasClass("button-disabled")) {								
								return;
							}

							if (!this.validateModel())
								return;
							
							if (this.invoice.get( "extra_costs" ) > 0)	{
								confirm(myAPP.texts.warnExtraCosts, function () { 
									self.savePayment();
								})
							} else {
								this.savePayment();
							}
							
	},

	dropdownHandler: function (event, value) { 
							var $target = $(event.target);							

							console.log(value);

							if ($target.attr("id") === "type") {
								this.model.set({ type: value })
							}

	},

	// on the payment model, setting the invoice should also set account_debtor_id which is required by the server;
	autocompleteHandler: function (event, $element) {
							
							var id = $element.attr("data-autocomplete-value");
							var match = id.match(/(\w+)\/(\d+)/);						
							
							this.addInvoice( myAPP.invoices.findWhere({ id: match [2] }))
							//this.validateModel();

	},

	focusHandler: function (event) { 
							var $input = $(event.target)
							
							if ($input.val())
								$input.siblings(".placeholder").css({ opacity: 0 }, { duration: 200 });
							else
								$input.siblings(".placeholder").css({ opacity: 1 }, { duration: 200 })
	},

	clickPlaceholder: function (event) { 
							var $placeHolder = $(event.target);							
							$placeHolder.siblings( "input" ).focus();
	},

	changeDatepickerHandler: function (event) {
							var $target = $(event.target)
							this.model.set("payment_date", $target.datepicker( 'getDate' ));

	},


	// *************************************
	//
	//		model logic;
	//
	// *************************************

	addInvoice: function (invoice) {

							this.invoice = invoice;
							this.debtor = myAPP.debtors.get( invoice.get( "account_debtor_id") );
							this.model.addInvoice( invoice )
							this.model.set({ amount: this.invoice.get('total_inc_vat') - this.invoice.get('creditInvoicesTotal') - this.invoice.get('paymentsTotal') })
	},

	savePayment: function () {
							var self = this;

							this.saveModel({ 
								success: function () {
									myAPP.animations.flashElement(self.$el, 'success');									
									myAPP.payments.add( self.model );	
									
									self.invoice.addPayment( self.model )

									// update invoice;																
									self.invoice.fetch({ 
										success: function () { 
											self.invoice.trigger( "update" )
										},
										error: function () { console.log("ERROR refreshing invoice after payment"); }
									});

									window.history.back();

								},
								error: function () { 
									alert("Er is iets fout gegaan bij het boeken van de betaling. Neem contact op met info@kascooperatie.nl");
								}
							})
	},

	changeHandler: function (changedValues) {
							var key, $html;												

							for (key in changedValues) {


								if (key === "amount") {
									myAPP.animations.blink(this.$el.find(".body #amount input, .head #amount .text"), myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber( changedValues[ key ]));
								}

								if (key === "payment_date") {									
									myAPP.animations.blink(this.$el.find(".head #date .value"), myAPP.templateHelpers.parseDate( changedValues[ key ] ))
								}

								if (key === "account_debtor_id") {
									myAPP.animations.blink( this.$el.find("#debtor .value"), this.debtor.get("company_name") )
								}

								if (key === "invoice_id") {
									this.$el.find("#invoice_id .placeholder").css({ opacity: 0 })
									this.$el.find("#invoice_id input")
										.val(this.invoice.get( "invoice_number" ) + " - " + this.debtor.get("company_name") + ", " + 
											myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber( this.invoice.get( "total_inc_vat" ) ))		
									$html = $( this.renderTemplate() );
									myAPP.animations.blink( this.$el.find( "#invoice-details .list" ), $html.find( "#invoice-details .list" ).children() );


								}

							}
	}

}) 

.editable()
.saveable() 
.validates() 
.datePicker();



//------------------------------------



myAPP.views.PaymentView = Backbone.View.extend({

	events: {

		"click #invoice-details": "invoiceClickHandler",
		"click #debtor": "debtorClickHandler"
	},

	initialize: function () {						
								var self = this;

								if (!this.model)
									throw "Cannot create paymentview without model";

								this.template = JST[ "templates/payments/payment.html" ];

								this.invoice = this.model.invoice || new myAPP.models.Invoice();
								this.debtor = this.model.debtor || new myAPP.models.Debtor();								

								
								this.render();

								// debugging
								myAPP.payment = this.model;
							
								// we need this additional update, to reinitialize the model used by this view
								// because of javascript closure?
								this.listenTo(myAPP, 'resourcesLoaded', function () {
									self.model = myAPP.payments.get(self.model.get("id"));
								});

								// we need to call the super method to activate the base class initialize method;
								Backbone.View.prototype.initialize.apply(this, arguments);

	},

	render: function () {
								this.$el.html( this.template({
									payment: this.model.getAttributes(), 
									invoice: this.invoice.getAttributes(), 
									debtor: this.debtor.getAttributes() 
								}) );	
	},

	

	invoiceClickHandler: function () {								
								if (!this.invoice || !this.invoice.get( "id" ))
									return;

								myAPP.router.navigate("facturen/facturen/" + this.invoice.get( "id" ), { trigger: true })

	},

	debtorClickHandler: function () {							
								if (!this.debtor || !this.debtor.get( "id" ))
									return;

								myAPP.router.navigate("debiteuren/debiteuren/" + this.debtor.get( "id" ), { trigger: true })

	}




})



//------------------------------------



myAPP.views.PaymentsCollectionView = Backbone.View.extend({

	events: {
		"click .table-body .table-row": "clickHandler"
	},

	initialize: function () {
								
							var self = this;
							this.template = JST["templates/payments/payments-collection.html"];

							this.collection = myAPP.payments;		

							// we need to call the super method to activate the base class initialize method;
							Backbone.View.prototype.initialize.apply(this, arguments);							
									
	},

	clickHandler: function (event) {

						var $target = $(event.currentTarget);					

						if ($target.hasClass("placeholder"))
							return;
						
						var id = $target.attr("id");
						myAPP.router.navigate("betalingen/"+ id, { trigger: true });

	}



}) 

.paginated()  

.sortable({

	debtor_name: function (a, b) {
		var debtorA = myAPP.debtors.get( a.get("account_debtor_id")),
			debtorB = myAPP.debtors.get( b.get("account_debtor_id")),
			valueA = (debtorA && debtorA.get("company_name").toLowerCase()) || "",
			valueB = (debtorB && debtorB.get("company_name").toLowerCase()) || "";

		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [a.get("payment_date").getTime(), b.get("payment_date").getTime()];
		}
			
	},

	amount: function (a, b) {
		var valueA = Number(a.get("amount")),
			valueB = Number(b.get("amount"));
		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [a.get("payment_date").getTime(), b.get("payment_date").getTime()];
		}
	},

	invoice_number: function (a, b) {
		var invoiceA = myAPP.invoices.get(a.get("invoice_id"));
		var	invoiceB = myAPP.invoices.get(b.get("invoice_id"));
		var valueA = Number(invoiceA && invoiceA.get("invoice_number"));
		var	valueB = Number(invoiceB && invoiceB.get("invoice_number"));


		if (valueA !== valueB) {
			return [valueA, valueB];
		} else {
			return [a.get("payment_date").getTime(), b.get("payment_date").getTime()];
		}
	},

	payment_date: function (a, b) {		
		var valueA = a.get("payment_date").getTime();
			valueB = b.get("payment_date").getTime();
		
		if (valueA !== valueB) {
			return [valueA, valueB];
		// if payment dates are equal, look up time of payment
		} else {		
			return [a.get("modified").getTime(), b.get("modified").getTime()];
		}

	}

});



//------------------------------------



myAPP.views.PaymentsView = Backbone.View.extend({

	events: {
		"click .button#new": "newPayment",		
	},

	initialize: function() {
						var renderContent, self = this; 

						this.template = JST["templates/payments/payments.html"];
						//this.collection = myAPP.invoices;
							
						renderContent = this.template();
						this.$el.html(renderContent)

						// soft fade-in
						this.$el.find(".payments-pane").css({ opacity: 0 }).animate({ opacity: 1 })
											
						this.paymentsViewManager = new myAPP.views.ViewManager({ el: this.$el.find(".payments-pane"), parent: this });

						//this._collectionView = null;

						this.paymentsViewManager.determineView = function (parameters, lastParameters) {
							
							var payment, view;

							if (parameters[1]) {

								payment = myAPP.payments.get( parameters[1] );
								if (payment) {
									view = new myAPP.views.PaymentView({ model: payment })
								} else {
									payment = new myAPP.models.Payment();
									view = new myAPP.views.NewPaymentView({ model: payment });
								}

								this.setCurrentView( view );
								this.animation = myAPP.animations.slideLeft;
								return true;

							} else {

								if (this._collectionView) {
									view = this._collectionView;									
									this.animation = myAPP.animations.slideRight;
								} else {
									view = new myAPP.views.PaymentsCollectionView();
									this.animation = myAPP.animations.slideRight;
									this._collectionView = view;
								}

								this.setCurrentView( view, /* removeLastView */ true );
								return true;

							}
		
						}				
						
	},

	newPayment: function () { 

							myAPP.router.navigate("betalingen/nieuw", { trigger: true })

	},

	allPayments: function () { 

							myAPP.router.navigate("betalingen", { trigger: true })

	},

	render: function () { 

						this.paymentsViewManager.render();
	}

})



//------------------------------------



myAPP.accountWizard = {

	step: 0,	

	start: function () {
		this.step = 0;
		myAPP.animations.openPopup(JST[ "templates/popups/account-wizard.html" ]({ account: myAPP.currentAccount.getAttributes() }));
		var html = $(JST["templates/popups/account-wizard-content-0.html"]({ account: myAPP.currentAccount.getAttributes() }));
		$(".popup .body").replaceWith($(html));	

		var self = this;		
		$(".popup #next").on("click", function () { self.next(); });		
		$(".popup #previous").on("click", function () { self.previous(); });		
		$(".popup a#skip").on("click", function () { self.skip(); });
		
		// disable ESC key for now
		//$("body").off("keyup");

		this.onSetupStep[0]();

	},

	next: function () {
		var self = this, onNextStep;			

		if (this.step > 4)
			return;			
		
		// if nextStep is succesful, call next action
		onNextStep = this.onNextStep[this.step];
		if (onNextStep) {
			onNextStep.apply(this, [{ success: function () { self.onStepSuccess("next") }  }]);
			return;
		}

		this.onStepSuccess("next");
	},

	previous: function () {
		var self = this, onNextStep;

		if (this.step < 1)
			return;	
		
		// if onNextStep is succesful, call next action
		onNextStep = this.onNextStep[this.step];
		if (onNextStep) {
			onNextStep.apply(this, [{ success: function () { self.onStepSuccess("previous"); }  }]);
			return;
		}

		this.onStepSuccess("previous");
	},

	skip: function () {		

		// skip nextStep callback, move straight to teardown / stepSuccess
		this.onStepSuccess("next");
	},

	onStepSuccess: function (direction) {
	
		var teardown = this.onTeardownStep[this.step];
		if (teardown) {
			teardown.apply(this);
		}

		switch (direction) {
			case "next": this.step++; break;
			case "previous": this.step--; break;
		}

		myAPP.clearTooltips();

		var html = $(JST["templates/popups/account-wizard-content-" + this.step + ".html"]({ account: myAPP.currentAccount.getAttributes() }));
		$(".popup .body").replaceWith($(html));	
		$(".popup a#skip").animate({ opacity: 0, visibility: "hidden" });

		$(".popup .navigation #total").html(this.step + 1);
		
		setup = this.onSetupStep[this.step]

		if (setup) {
			setup.apply(this);
		}
		
	},	

	close: function () {
		myAPP.animations.closePopup();
	},

	// function to run on setting up a step
	onSetupStep: {
		0: function () {
			$(".popup .navigation#previous").animate({ opacity: 0 });
			$(".popup a#dont-show-wizard").on("click", function () { 
				myAPP.setDontShowWizardCookie()
				myAPP.accountWizard.close() 
			})
		},
		1: function () {
			$(".popup .navigation .button#previous").animate({ opacity: 1 });
			this.setupAccountViewStep1();
		},

		2: function () {
			this.setupAccountViewStep2();
		},
		3: function () {
			myAPP.setupImageUpload({
				element: $(".popup .upload-image"),
				url: myAPP.accountSettings.get("postLogoUrl"),
				error: function () { $(".drop-area").trigger("mouseenter"); }
			})

			var url = myAPP.accountSettings.get("logoUrl");		
			myAPP.loadImage($(".popup .image-holder"), url, 300, 130);
			setTimeout(function ()  { 
				var $img = $(".popup .image-holder img")
				if ($img[0] && $img[0].height > 30) {
				$(".popup .placeholder").html("");
			}}, 1000);			
			
		},
		4: function () {
			this.setupAccountSettingsView();
		},
		5: function () {
			$(".body .button").on("click", function () {
				myAPP.setDontShowWizardCookie()
				myAPP.accountWizard.close(); 
				
			});
			$(".navigation #next").animate({ opacity: 0 }, { complete: function () { $(".navigation #next").css({ visibility: "hidden "})}});
		}

	},

	// function to run when switching to another step
	// can be used to prevent switching by not running options.success callback;
	onNextStep: {		 
		1: function (options) {
			var self = this;
			var attributes = _.pick(this.view.model.attributes, 'title', 'email', 'address', 'zipcode', 'city', 'country');
			this.view.saveModel({ attributes: attributes, success: function () {  options.success();  }});			
		},

		2: function (options) {
			var self = this;
			var attributes = _.pick(this.view.model.attributes, 'kvk_number', 'bank_account', 'vat_liable', 'vat_number');
			this.view.saveModel({ attributes: attributes, success: function () { options.success(); }});
		},

		4: function (options) {
			var self = this;
			var attributes = _.pick(this.view.model.attributes, 'kasco_payment');
			this.view.saveModel({ attributes: attributes, success: function () { options.success(); }});

		}

	},

	// callback that should clean up 
	onTeardownStep: {
		1: function () {			
			this.view.remove();
		},
		2: function () {
			this.view.remove();
		},
		4: function () {
			this.view.remove();
		},
		5: function () {
			$(".body .button").off("click");
			$(".navigation #next").css({ visibility: "visible"}).animate({ opacity: 1 });
		}
	},

	setupAccountViewStep1: function () {
												this.view = new (Backbone.View.extend({
														
														events: {
															"dropdown": "dropdownHandler"
														},

														dropdownHandler: function (event, value) {															
															this.model.set("country", value);
														},

														// override default remove callback
														remove: function () {}

												}) .editable() .saveable() .validates())({ model: myAPP.currentAccount }); 
												this.view.setElement($(".popup .body"));
												
												// debug
												myAPP._view = this.view;

												this.view.listenTo(this.view, 'modelHasErrors', function () { 
													$(".popup a#skip").css({ opacity: 1, visibility: "visible" });
												})

	},

	setupAccountViewStep2: function () {
												var self = this, _saveModel;

												this.view = new (Backbone.View.extend({
														
														events: {
															"change #vat_liable input": "changeHandler"
														},				

														changeHandler: function (event) {					
															var $target = $(event.target),
																id = $target.attr("id");

															switch (id) {
																case "yes": $(".popup .vat_number").animate({ opacity: 1}); break;
																case "no": $(".popup .vat_number").animate({ opacity: 0}); break;
															}
														},

														// override default remove callback
														remove: function () {}

												}) .editable() .saveable() .validates())({ model: myAPP.currentAccount }); 
												this.view.setElement($(".popup .body"));

												// set an extra check on save to make sure a radio button for vat_liable was selected.
												_saveModel = this.view.saveModel;

												this.view.saveModel = function (options) {
													if ($('input[type=radio]:checked').length === 0) {
														self.view.trigger('modelHasErrors');
														self.view.markErrors({ vat_liable:  "Geef aan of u btw-plichtig bent" });
														return;
													}

													_saveModel.apply(this, [options]);
												};

												this.view.listenTo(this.view, 'modelHasErrors', function () { 
													$(".popup a#skip").stop().css({ opacity: 1, visibility: "visible" });
												})
												
												// debug
												myAPP._view = this.view;
	},

	setupAccountSettingsView: function () {
												var self = this, _saveModel;

												this.view = new (Backbone.View.extend({
													
													// override default remove callback
													remove: function () {}

												}) .editable() .saveable() .validates())({ model: myAPP.accountSettings });
												this.view.setElement($(".popup .body"));

												// set an extra check on save to make sure a radio button for vat_liable was selected.
												_saveModel = this.view.saveModel;

												this.view.saveModel = function (options) {
													if ($('input[type=radio]:checked').length === 0) {
														self.view.trigger('modelHasErrors');
														self.view.markErrors({ kasco_payment:  "Selecteer hoe u de betalingen wilt regelen" });
														return;
													}

													_saveModel.apply(this, [options]);
												};

												// this.view.listenTo(this.view, 'modelHasErrors', function () { 
												//	$(".popup a#skip").css({ opacity: 1, visibility: "visible" });
												// })

	}	

};






//------------------------------------



/**
 * 
 *		this view is for the signup popup that appears when a guest user clicks the signup button
 *		
 */

myAPP.views.SignupFormView = Backbone.View.extend({

	events: {
		"click #signup-button": "signup"
	},

	initialize: function () {

	},

	setErrorMessage: function (message) {
	
		this.$el.find("#error-message").stop().css({ display: "block", opacity: 0 }).text(message).animate({ opacity: 1 })
	
	},

	signup: function () {
		var self = this;

		// check company name
		this.companyName = this.$el.find("input#company-name").val().trim();
		if (!this.companyName) {
			this.setErrorMessage("Vul een bedrijfsnaam in.");			
			return;
		}
		if (this.companyName.length < 2) {
			this.setErrorMessage("De bedrijfsnaam moet uit minstens 2 letters bestaan.")
			return;
		}
		// check email address
		this.email = this.$el.find("input#email").val().trim();
		
		if (!this.email) {
			this.setErrorMessage("Vul een e-mailadres in.")
			return 
		}
		if (!this.email.match(myAPP.validationPattern.email)) {
			this.setErrorMessage(this.email + " is geen geldig e-mailadres.");
			return;
		}

		this.$el.find(".animation-wrapper").startSpinner();		

		this.model.save({ 
			title: this.companyName,
			vat_liable: 1,
			email: this.email,
			country: "nl",
			user: { name: "gebruiker", email: this.email, salutation: "Mr."},

		}, {
			success: function () { self.onSuccess() },
			error: function (model, response, options) { self.onError(model, response,options) },
			patch: true
		})
	},

	onSuccess: function () {
		var html, 
			$animationWrapper,
			self = this;

		// push Google Analytics event
		if (typeof _gaq != "undefined") {
			_gaq.push(['_trackEvent', 'Aanmeldformulier', 'Success', this.companyName + ' | ' + this.email +  ' from Sandbox']);
		}

		// stop spinner
		$animationWrapper = this.$el.find(".animation-wrapper")				
		$animationWrapper.stopSpinner();				
		
		html = JST["templates/popups/signup-form-success.html"]({ email: this.model.get("email") });
				
		// blink
		$animationWrapper.animate({ opacity: 0 }, { duration: 200, 
			complete: function () { 
				$animationWrapper.html( html ).animate({ opacity: 1 }, { duration: 200, complete: function () {
					self.$el.find(".button#close-popup, #close-button").on("click", function () {
						self.close();
					})
				
			}});
		}})

		// resize popup window
		//this.$el.find(".content").animate({ width: 620, height: 420 }, { duration: 800, easing: "easeOutCubic" });
		
		this.$el.find(".button#close-popup, #close-button").on("click", function () {
			console.log('close-button clicked');
			self.remove();
			myAPP.animationsclosePopup();
		})
	},

	onError: function (model, response, options) { 
		var errorMessage = "Uw e-mailadres bevat ongeldige speciale tekens."; 

		console.log(response);

		// stop spinner
		this.$el.find(".animation-wrapper").stopSpinner();
		if (response.responseText.match(/Email\saddress\sis\salready\staken/))
			errorMessage = "Het opgegeven e-mailadres is al in gebruik.";
		this.setErrorMessage(errorMessage);

	},

	close: function () {
		
			myAPP.animations.closePopup();
			this.remove();
	}



});



//------------------------------------



myAPP.views._AccountView = Backbone.View.extend({

	events: {
		"click #show-costs": "clickHandler",
		"click #delete-account": "clickHandler",
		"click #create-invoice": "clickHandler"		

	},
	
	initialize: function () {

						if (!this.model)
							throw "Can't create _AccountView without a model";

						var self = this;

						this.template = JST["templates/superadmin/account.html"];

						var renderContent = this.template({
							account: this.model.getAttributes()
						})

						this.$el.html( renderContent )

						myAPP.account = this.model;
	},

	clickHandler: function (event) {

						var $target = $(event.currentTarget);

						if ($target.is("#show-costs")) {							
							myAPP.router.appendHash("kosten");
							this.render();
							return;
						}
						if ($target.is("#delete-account")) {
							this.deleteAccount();
							return;							
						}
						if ($target.is("#create-invoice")) {
							this.createInvoice();
							return;
						}

	},

	render: function () {
						
						var parameters = Backbone.history.getParameters();

						// show invoice;
						if (parameters[4]) {
							this.isShowingInvoice = true;
							this.showCreateInvoice()
							return;
						}

						// show balance instance
						if (parameters[3]) {
							if (this.isShowingInvoice) {
								this.hideCreateInvoice();
								return;
							}
							this.isShowingInstance = true;
							this.showBalanceInstance();
							return;
						}

						// show balanceCollection
						if (parameters[2]) {
							if (this.isShowingInstance) {	
								this.isShowingInstance = false;
								this.hideBalanceInstance();
								return;
							}
							this.isShowingBalances = true;
							this.showBalances();
							return;
						}				

						// show account info	
						if (this.isShowingBalances) {
							this.hideBalances();
						}
	},


	deleteAccount: function () {
						var self = this;

						confirm(myAPP.texts.deleteAccount, function () {
								
							self.$el.startSpinner();
							self.model.destroy({ 
								success: function () { 
									self.$el.stopSpinner();
									myAPP.trigger("toast", "Account verwijderd", "success")
									myAPP.router.navigate("_accounts", { trigger: true })
								},
								error: function () { 
									self.$el.stopSpinner();
									alert("Het verwijderen van de account is mislukt")
									myAPP.trigger("toast", "Verwijderen account mislukt", "error")
								}
							});
						})
	},

	showBalances: function () {
						var startSpinner,
							self = this,
							parameters = Backbone.history.getParameters();		

						// var hash = Backbone.history.getFragment();
						// if (!hash.match(/kosten/))
						// 	myAPP.router.navigate(hash + "/kosten")

						// this.isShowingBalances = true;

						var id = this.model.get( "id" )			

						if (!this.model.balances) {
							startSpinner = true;
							this.model.fetchBalances();
						}

						this.showBalancesCollection( startSpinner, myAPP.animations.drop, ".account-body" );

						// update button
						var $button = this.$el.find("#show-costs");
						myAPP.animations.blink( $button, "<span class='entype'>" + myAPP.templateHelpers.charCodes.back + "</span>Terug")
						$button.attr("data-tooltip", myAPP.texts.tooltips.back)

	},

	showBalancesCollection: function ( startSpinner, animation ) {

						this.balancesCollectionView = new myAPP.views.BalancesCollectionView({ collection: this.model.balances, startSpinner: startSpinner })
						this.balancesCollectionView.render();


						var $element = $( "<div class='balances-collection-view'></div>" ).appendTo( this.$el.find( ".animation-wrapper" ) )
						
						animation({ oldElement: this.$el.find(".account-body"), newElement: $element.append( this.balancesCollectionView.$el ) })							
						

	},

	hideBalances: function () {

						var self = this;

						myAPP.animations.lift({ oldElement: this.$el.find( ".balances-collection-view" ), newElement: this.$el.find( ".account-body" ), 
							callback: function () { self.isShowingBalances = false; self.balancesCollectionView.remove() },  })

						// restore button
						var $button = this.$el.find("#show-costs");
							myAPP.animations.blink($button, "€ Bekijk kosten")
							$button.attr("data-tooltip", myAPP.texts.tooltips.showCosts)
	},

	showBalanceInstance: function () {

						var parameters = Backbone.history.getParameters(),
							model = this.model.balances.get( parameters[3] );

						this.balanceView = new myAPP.views.BalanceView({ model: model })
						this.balanceView.$el.prepend("<div class='buttons'><div class='button' id='create-invoice'>" + 
							"<span class='entype'>"+ myAPP.templateHelpers.charCodes.invoice + "</span>Creëer factuur</button></div></div><div style='clear: both'>");
						myAPP.animations.slideLeft({ oldElement: this.balancesCollectionView.$el, newElement: this.balanceView.$el })
						
	},

	hideBalanceInstance: function () { 

						myAPP.animations.slideRight({ oldElement: this.balanceView.$el , newElement: this.balancesCollectionView.$el })

	},

	createInvoice: function () {

						myAPP.router.appendHash("factuur");
						this.render();

	},

	showCreateInvoice: function () {	
						var invoice, 
							debtor, 
							view, 
							_oldView,
							self = this,
							balance,
							invoiceLines;

						invoice = new myAPP.models.Invoice();
						debtor = myAPP.debtors.findWhere({ email: this.model.get( "email") });

						if (!debtor) {
							debtor = this.model.createDebtorFromAccount();
						}

						balance = this.balanceView.model;
						invoiceLines = balance.createInvoiceLines();
						invoice.addDebtor( debtor );
						invoice.invoiceLines.add( invoiceLines );

						view = new myAPP.views.EditInvoiceView({ model: invoice });

						// remove unnecessary buttons
						view.$el.find("#approve.button, #preview.button").remove();
						myAPP.animations.slideLeft({ oldElement: $(".accounts-pane").children(), newElement: view.$el })						

						// cache views;
						this._view = view;
						this._oldView = this;
						
						// debug
						this._editInvoiceView = view;

						myAPP.invoice = invoice;
	},

	hideCreateInvoice: function () {

						var self = this;

						myAPP.animations.slideRight({ 
							oldElement: this._view.$el,
							newElement: this._oldView.$el,
							callback: function () { 
								self._view.remove();
								self.isShowingInvoice = false;								
							}
						})	
	}

})



//------------------------------------



myAPP.views.AccountsCollectionView = Backbone.View.extend({

	events: {
		"click .table-body .table-row": "clickHandler"

	},

	initialize: function () {
						var self = this;

						this.template = JST["templates/superadmin/accounts-collection.html"];

						this.collection = myAPP.accounts;
						

						this.listenTo(myAPP.accounts, 'add remove', function () {
						
							// render?

						})		

						// sort collection on creation date;						
						this.collection.comparator = function (model) { return -1 * model.get("created").getTime() };
						this.collection.sort();

	},

	clickHandler: function (event) {


						var parameters = Backbone.history.getParameters();

						var $target = $(event.currentTarget);					

						if ($target.hasClass("placeholder"))
							return;
						
						var id = $target.attr( "id" );
						myAPP.router.navigate("_accounts/" + id, { trigger: true })
	}	

}) 

.paginated() 

.sortable({ 

						title: function (model) {
							return model.get( "title" ).toLowerCase();
						},

						id: function (model) {
							return Number(model.get( "id" ));
						},

						// created: function (model) {
						// 	return model.get( "created" ).
						// }
						// 
						
						imported: function (model) {
							return model.get( "isImported")
						},
						finalized: function (model) {
							return model.get( "isFinalized" )
						}
						

})



//------------------------------------



myAPP.views.AccountsView = Backbone.View.extend({

	events: {
		"click #accounts": "viewCollection"
	},

	initialize: function () {
								var self = this, renderContent;

								this.template = JST["templates/superadmin/accounts.html"];
								renderContent = this.template();
								this.$el.html( renderContent );

								// soft fade-in
								this.$el.find(".invoices-pane").css({ opacity: 0 }).animate({ opacity: 1 })
						
								this.accountsViewManager = new myAPP.views.ViewManager({ el: this.$el.find(".accounts-pane"), parent: this });								

								this.accountsViewManager.determineView = function (parameters, lastParameters) {	

									var view, account;

									if (parameters[1] && lastParameters && lastParameters[1] === parameters[1])
										return;

									if (parameters[1]) {

										account = myAPP.accounts.get( parameters[1] );
																				
										if (account) {
											view = new myAPP.views._AccountView({ model: account })
										} 

										this.setCurrentView( view );
										this.animation = myAPP.animations.slideLeft;
										return true;

									} else {

										if (this._collectionView) {
											view = this._collectionView;									
											this.animation = myAPP.animations.slideRight;
										} else {
											view = new myAPP.views.AccountsCollectionView();
											this.animation = myAPP.animations.slideRight;
											this._collectionView = view;
										}

										this.setCurrentView( view, /* removeLastView */ true );
										return true;

									}		

								}		
	},

	render: function () { 

						this.accountsViewManager.render();
	},	

	viewCollection: function () {
						console.log("asldkfjasdlkfjasdljfk")
						myAPP.router.navigate( "_accounts", { trigger: true })
	}


}) .collapseSidebar();



//------------------------------------



// features: 
// - will trigger removal of registered current/last view automatically when removing "parent" view;

myAPP.views.ViewManager = Backbone.View.extend({

	initialize: function () {
					// setup removal of views so we properly clean up after ourselves.
					var self = this,
						parent = this.options.parent;
					
					if (!parent)
						throw "failed to register a parent with a viewmanager: " + this;

					var _remove = parent.remove;

					parent.remove = function () { 

						_remove.apply( this,arguments )

						self.remove()
					}

					this.listenTo(myAPP, "history", function () {	
						self.lastParameters = Backbone.history.getParameters();
					})

	},

	render: function () {					
										
					var	parameters = Backbone.history.getParameters();

					if (parameters !== this.lastParameters /*|| !this.hasRendered || this.forceRender*/) {
						
						// *** we need the change in the router to cascade to all subviews;
						if (this.determineView(parameters, this.lastParameters)) {
							this.changeViews();
						} else {
							if (!this.currentView)		{
								console.warn("no currentView set for this viewManager!")
								return;
							}
							// we pass the parameters to the render method, in case it needs them
							this.currentView.render(parameters, this.lastParameters);
						}

						this.lastParameters = parameters;

					}
					
	},

	determineView: function (parameters, lastParameters) {

					// determine and set view based on parameters passed to the render/update method;
					// paneView wil only render if determineView returns true!

					// should be overwritten by subclass;

	},

	changeViews: function () {
					var oldElement, newElement, self = this;

					var createCallback = function ( removeLastView, lastView ) {
						return function () {
							if (removeLastView) {
								lastView.remove(); 
								self.lastView = null;
							}
						}
					}

					if(!this.currentView)
						throw "No currentView set;"


					if (this.lastView === this.currentView) {
						console.warn("*** WARN: lastView is currentView!");
						// return;
						this.lastView = null;
					}						
					
					if (this.lastView) {
				
						oldElement = this.lastView.$el
					}

				
								
					newElement = this.currentView.$el;
					this.currentView.render();					

					if (this.animation && oldElement) {	
											
						this.animation({oldElement: oldElement, newElement: newElement, remove: this.removeLastView, 
							callback: createCallback( this.removeLastView, this.lastView )
						});
						
					} else {
						this.$el.empty().append(newElement)
						// there's not necessarily a lastView
						if (this.lastView)
							this.lastView.remove();
					}
					
	},

	setCurrentView: function (view, removeLastView) {

					// set new View;
					
					this.removeLastView = removeLastView;					
					this.lastView = this.currentView;
					this.currentView = view; 		

					this.currentView.viewManager = this;
	},

	remove: function () { 
					if (this.currentView)
						this.currentView.remove();
					if (this.lastView)
						this.lastView.remove();
					
					Backbone.View.prototype.remove.call(this);
	}

})
