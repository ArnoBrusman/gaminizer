this["JST"] = this["JST"] || {};

this["JST"]["templates/account/account.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="mainPaneWrapper">\r\n\r\n<div class="account-view">\r\n\r\n\t<div class="header">\r\n\t\t<h2>Account</h2>\r\n\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.settings )) == null ? '' : __t) +
'</span>\r\n\r\n\t</div>\r\n\r\n\t<div class="sidebar">\r\n\t\t\r\n\t\t<div class="tabs-vertical">\r\n\r\n\t\t\t<ul>\r\n\t\t\t\t\t<li class="tab selected" id="instellingen"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.settings )) == null ? '' : __t) +
'</span>Instellingen</li>\r\n\t\t\t\t\t<li class="tab" id="bedrijfsinfo"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.company )) == null ? '' : __t) +
'</span>Bedrijfsinfo</li>\r\n\t\t\t\t\t<li class="tab" id="bankgegevens"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.building )) == null ? '' : __t) +
'</span>Bankgegevens</li>\r\n\t\t\t\t\t<li class="tab" id="facturen"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>Facturen </li>\t\t\t\t\r\n\t\t\t\t\t<li class="tab" id="gebruikers"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.users )) == null ? '' : __t) +
'</span>Gebruikers </li>\t\t\t\t\r\n\t\t\t\t\t<li class="tab" id="kosten"><span class="entype">â‚¬</span>Kosten </li>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t</ul>\r\n\r\n\t\t</div>\r\n\t\r\n\t</div>\r\n\r\n\t<div class="pane account-pane">\r\n\r\n\t\r\n\t</div>\r\n\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/account/balance.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="balance-view">\r\n\t\r\n\t<h2 class="description"><span class="entype">â‚¬</span>' +
((__t = ( balance.date )) == null ? '' : __t) +
'</h2>\r\n\r\n\t';


		var icons = {
			"nr_sent_normals": "invoice",
			"nr_sent_credits":	"invoice",
			"nr_sent_postals":	"email",
			"nr_sent_reminders": "warning",
			"nr_sent_summations": "warning",
			"nr_invoices_redeemed": "redeemed",
			"nr_sent_quotes": "quote",
			"nr_sent_total": "invoice",
			"nr_payments_icepay": "payment"
		}

	;
__p += '\r\n\t\r\n\t<div class="body">\r\n\t\t<div class="body-content">\r\n\t\t\t\r\n\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t';
 _.each( ["nr_payments_icepay", "nr_sent_postals", "nr_invoices_redeemed"], function (key) { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="list-item">\r\n\r\n\t\t\t\t\t\t<div class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes [ icons[ key ] ] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t<div class="key">' +
((__t = ( myAPP.texts.keys[ key ] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( balance[key]  )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="multiply-sign">x</div>\r\n\t\t\t\t\t\t<div class="cost">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = (  myAPP.templateHelpers.parseNumber( myAPP.constants.costs[key] ) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t<div class="equals-sign">=</div>\r\n\t\t\t\t\t\t<div class="total-cost">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( myAPP.constants.costs[key] * balance[key] ) )) == null ? '' : __t) +
'</div>\r\n\r\n\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t<div class="list-item total">\r\n\t\t\t\t\t\t<div class="text">Totale kosten</div>\r\n\t\t\t\t\t\t<div class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( balance.total_costs ) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t</div>\r\n\t\t\t\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/account/balances-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="balances-collection">\r\n\r\n\t<div class="list">\r\n\r\n\t\t<div class="list-header">Overzicht</div>\r\n\t\t\r\n\t\t';
 balances.each(function (balance) { balance = balance.getAttributes() ;
__p += '\r\n\r\n\t\t\t<div class="list-item" id="' +
((__t = ( balance.id )) == null ? '' : __t) +
'">\r\n\t\t\t\t<div class="month">' +
((__t = ( balance.date )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\r\n\t\t\t\t<div class="myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.payments )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span><span class="number">' +
((__t = ( balance.nr_payments_icepay )) == null ? '' : __t) +
'</span></div>\r\n\t\t\t\t<div class="myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sent_postals )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.email )) == null ? '' : __t) +
'</span><span class="number">' +
((__t = ( balance.nr_sent_postals )) == null ? '' : __t) +
'</span></div>\r\n\t\t\t\t<div class="myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.invoices_redeemed )) == null ? '' : __t) +
'"><span class="entype">';
 if (balance.nr_sent_total) print(myAPP.templateHelpers.charCodes.redeemed) ;
__p += '</span><span class="number">' +
((__t = ( balance.nr_invoices_redeemed || "" )) == null ? '' : __t) +
'</span></div>\r\n\r\n\r\n\t\t\t\t<div class="total-costs">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(balance.total_costs) )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\r\n\r\n\t\t';
 }) ;
__p += '\r\n\r\n\t\t';
 if (balances.length === 0) { ;
__p += '\r\n\r\n\t\t\t<div class="list-item placeholder"> \r\n\t\t\t\t<h2>Geen kosten</h2>\r\n\t\t\t</div>\r\n\t\r\n\t\t';
 } ;
__p += '\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/account/balances.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="costs">\r\n\t\r\n\t<div class="title">\r\n\t\t<h2><span class="entype">â‚¬</span>Kosten</h2>\r\n\t</div>\r\n\r\n\t<div class="costs-pane">\t\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/account/company.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="company">\r\n\t\r\n\t<div class="title">\r\n\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.company )) == null ? '' : __t) +
'</span>Bedrijfsinfo</h2>\r\n\t</div>\r\n\r\n\t<div class="company-pane">\r\n\t\r\n\t<div class="list list-nostyle list-small">\r\n\r\n\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.address )) == null ? '' : __t) +
'</span>Adresgegevens</div>\r\n\r\n\t\t';
 _.each(_.pick(company, ['address', 'zipcode', 'city', 'country']), function (value, key) { ;
__p += '\r\n\t\r\n\t\t\t';
 if (key !== "country") { ;
__p += '\r\n\r\n\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t<label class="key" for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\r\n\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" class="' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\t\t\t\r\n\t\t\t\t</div>\t\r\n\r\n\t\t\t';
 } else { ;
__p += '\r\n\t\t\t\t\r\n\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="countries" id="country">\r\n\t\t\t\t\t\t<span class="value">' +
((__t = ( value )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\t\t';
 }) ;
__p += '\r\n\r\n\t</div>\r\n\r\n\t<div class="list list-nostyle list-small">\r\n\t\t\r\n\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.contact )) == null ? '' : __t) +
'</span>Contactgegevens</div>\r\n\r\n\t\t';
 _.each(_.pick(company, ['contact_person', 'phone', 'fax', 'mobile']), function (value, key) { ;
__p += '\r\n\r\n\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t<label class="key" for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\r\n\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\r\n\t\t</div>\r\n\r\n\t\t';
 }) ;
__p += '\r\n\t</div>\r\n\r\n\t<div class="list list-nostyle list-small">\r\n\t\t\t\r\n\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.suitcase )) == null ? '' : __t) +
'</span>Zakelijke gegevens</div>\r\n\r\n\t\t\t';
 _.each(_.pick(company, ['kvk_number', 'vat_number', 'vat_liable']), function (value, key) { ;
__p += '\r\n\r\n\t\t\t\t';
 if (key !== "vat_liable") { ;
__p += '\t\t\r\n\t\t\r\n\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t<label class="key" for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } else if (!hasSentInvoices ) { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="vat_liable" id="vat_liable">\r\n\t\t\t\t\t\t\t<span class="value">' +
((__t = ( value )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span></div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t';
 }) ;
__p += '\r\n\r\n\t</div>\r\n\r\n\t<div class="buttons buttons-small">\r\n\t\t<div class="button myAPP-tooltip" id="save" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.save )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\t\t<div class="button myAPP-tooltip" id="cancel" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.cancel )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.cancel )) == null ? '' : __t) +
'</span>Annuleer</div>\r\n\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/account/edit-user.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="edit-user body-content">\r\n\r\n\t<div class="list list-nostyle">\r\n\r\n\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.user )) == null ? '' : __t) +
'</span>Gebruikersgegevens</div>\r\n\r\n\t\t';
 _.each(['name', 'email'], function (key) { ;
__p += '\r\n\t\t\r\n\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\r\n\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="' +
((__t = ( user[key] )) == null ? '' : __t) +
'"></div>\r\n\t\t\t</div>\t\r\n\r\n\t\t';
 }) ;
__p += '\r\n\r\n\t\t<!-- <div class="list-item">\r\n\r\n\t\t\t<label class="key" id="user-role" for="role">role</label>\r\n\t\t\t\r\n\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="user-roles" id="role">\r\n\t\t\t\t<span class="value">' +
((__t = ( user.role )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span> </div>\r\n\r\n\t\t</div> -->\r\n\r\n\t</div>\r\n\r\n\t<div class="buttons">\r\n\t\t<div class="button" id="save"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\t</div>\r\n\r\n\t\r\n</div>';

}
return __p
};

this["JST"]["templates/account/finance-settings.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="finance">\n\t\n\t<div class="title">\n\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.building )) == null ? '' : __t) +
'</span>Bankgegevens</h2>\n\n\t</div>\n\n\t<div class="company-pane">\n\t\n\t\t<div class="list list-nostyle list-small">\n\n\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.building )) == null ? '' : __t) +
'</span>Bankgegevens</div>\n\n\t\t\t';
 _.each(_.pick(account, ['bank_bic', 'bank_account', 'bank_account_iban']), function (value, key) { ;
__p += '\n\t\t\n\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\n\t\t\t\t<label class="key" for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\n\t\t\t\t\t\t\n\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\n\t\t\t\t\t\n\t\t\t</div>\t\n\t\t\t';
 }) ;
__p += '\n\n\t\t</div>\n\n\t\t<div class="buttons buttons-small">\n\t\t\t<div class="button myAPP-tooltip" id="save" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.save )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\n\t\t\t<div class="button myAPP-tooltip" id="cancel" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.cancel )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.cancel )) == null ? '' : __t) +
'</span>Annuleer</div>\n\t\t</div>\n\n\t</div>\n\n</div>';

}
return __p
};

this["JST"]["templates/account/finance.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- <div class="finance">\r\n\t\r\n\t<div class="title">\r\n\t\t<h2><span class="entype">&#x1f4b3;</span>Bankgegevens</h2>\r\n\r\n\t</div>\r\n\r\n\t<div class="company-pane">\r\n\t\r\n\t\t<div class="list list-nostyle list-small">\r\n\r\n\t\t\t<div class="list-header"><span class="entype">&#xF0F7;</span>Bankgegevens</div>\r\n\r\n\t\t\t';
 _.each(_.pick(company, ['bank_bic', 'bank_account', 'bank_account_iban']), function (value, key) { ;
__p += '\r\n\t\t\r\n\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t<label class="key" for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\r\n\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\r\n\t\t\t\t\t\r\n\t\t\t</div>\t\r\n\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="buttons buttons-small">\r\n\t\t\t<div class="button myAPP-tooltip" id="save" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.save )) == null ? '' : __t) +
'"><span class="entype">&#x1f4be;</span>Opslaan</div>\r\n\t\t\t<div class="button myAPP-tooltip" id="cancel" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.cancel )) == null ? '' : __t) +
'"><span class="entype">&#x27f2;</span>Annuleer</div>\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div> -->';

}
return __p
};

this["JST"]["templates/account/invoice-settings.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="invoice-settings">\r\n\t\r\n\t<div class="title">\r\n\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>Factuurinstellingen</h2>\r\n\r\n\t</div>\r\n\r\n\t<div class="invoice-settings-pane">\r\n\t\r\n\t\t<div class="list list-nostyle" id="invoice-settings">\r\n\r\n\t\t\t<div class="list-body">\r\n\r\n\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>Factuurinhoud</div>\r\n\r\n\t\t\t\t<div class="list-item" id="default_invoice_content">\r\n\t\t\t\t\t\t<label class="key"  for="_default_invoice_content">' +
((__t = ( myAPP.texts.keys["default_invoice_content"] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\r\n\t\t\t\t\t\t<textarea type="text" name="default_invoice_content" id="_invoice_id_next" placeholder="Voer een tekst in">';
 if (settings.default_invoice_content) print(settings.default_invoice_content) ;
__p += '</textarea>\r\n\t\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.email )) == null ? '' : __t) +
'</span>Kopie ontvangen</div>\r\n\t\t\t\t\r\n\t\t\t\t<p class="description">' +
((__t = ( myAPP.texts.helptexts.cc_emails )) == null ? '' : __t) +
'</p>\r\n\t\t\t\t<div class="list-item" id="cc_emails">\r\n\t\t\t\t\t\t<label class="key"  for="_default_invoice_content">' +
((__t = ( myAPP.texts.keys["cc_emails"] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="invoice-cc_emails" id="cc_emails">\r\n\t\t\t\t\t\t<span class="value">' +
((__t = ( settings.cc_emails ? "Ja" : "Nee" )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span></div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="email">\r\n\t\t\t\t\t\t\t<label class="key" for="_cc_emails">E-mailadres</label>\r\n\t\t\t\t\t\t\t<input type="text" name="cc_emails" id="_cc_emails">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\r\n\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoices )) == null ? '' : __t) +
'</span>Factuurnummering</div>\r\n\r\n\t\t\t\t<p class="description">' +
((__t = ( myAPP.texts.helptexts.invoice_id )) == null ? '' : __t) +
'</p>\r\n\r\n\t\t\t\t';
 _.each(_.pick(settings, ['invoice_id_prefix', 'invoice_id_next']), function (value, key) { ;
__p += '\r\n\t\t\t\t\r\n\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t<label class="key" for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t<input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '">\t\t\t\t\t\t\r\n\t\t\t\t\t</div>\t\r\n\r\n\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t<!--<p class="description">' +
((__t = ( myAPP.texts.helptexts.invoice_id_continuous )) == null ? '' : __t) +
'</p>\r\n\t\t\t\t<div class="list-item" id="invoice_id_continuous">\r\n\t\t\t\t\t<label class="key"  for="invoice_id_continuous">' +
((__t = ( myAPP.texts.keys["invoice-id_continuous"] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="invoice-invoice_id_continuous" id="invoice_id_continuous">\r\n\t\t\t\t\t\t<span class="value">' +
((__t = ( settings.invoice_id_continuous ? "Ja" : "Nee" )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span></div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<p class="description">' +
((__t = ( myAPP.texts.helptexts.invoice_id_next )) == null ? '' : __t) +
'</p>\r\n\t\t\t\t<div class="list-item" id="invoice_id_next">\r\n\t\t\t\t\t<label class="key"  for="_invoice_id_next">' +
((__t = ( myAPP.texts.keys["invoice_id_next"] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t<div class="prefix">';
 if (settings.invoice_id_prefix) print (settings.invoice_id_prefix) ;
__p += '</div>\r\n\t\t\t\t\t<input type="text" name="invoice_id_next" id="_invoice_id_next" value="';
 if (settings.invoice_id_next) print(settings.invoice_id_next) ;
__p += '" >\r\n\t\t\t\t\t\r\n\t\t\t\t</div>-->\r\n\r\n\t\t\t</div>\t\t\t\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="buttons buttons-small">\r\n\t\t\t<div class="button myAPP-tooltip" id="save" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.save )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\t\t\t<!-- <div class="button myAPP-tooltip" id="cancel" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.cancel )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.cancel )) == null ? '' : __t) +
'</span>Annuleer</div> -->\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/account/new-user.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="new-user user-view">\r\n\t\r\n\t<h2 class="description"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.addUser )) == null ? '' : __t) +
'</span><span class="text">Nieuwe gebruiker</span></h2>\r\n\r\n\t<div class="user">\r\n\t\r\n\t\t<div class="body">\r\n\r\n\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.account )) == null ? '' : __t) +
'</span>Gebruikersgegevens</div>\r\n\r\n\t\t\t\t';
 _.each(['name', 'email'], function (key) { ;
__p += '\r\n\t\t\t\t\r\n\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'"></div>\r\n\t\t\t\t\t</div>\t\r\n\r\n\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t<div class="list-item input-holder">\r\n\r\n\t\t\t\t\t<label class="key" id="user-role" for="role">' +
((__t = ( myAPP.texts.keys["role"] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="user-roles" id="role">\r\n\t\t\t\t\t\t<span class="value">admin</span><span class="caret caret-small caret-down"></span> </div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="buttons buttons-conditional">\r\n\t\t\t\t<div class="button" id="add-user"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.addUser )) == null ? '' : __t) +
'</span><span class="text">' +
((__t = ( myAPP.texts.createUser )) == null ? '' : __t) +
'</span></div>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n</div>';

}
return __p
};

this["JST"]["templates/account/settings.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="settings">\r\n\r\n\t<div class="title">\r\n\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.settings )) == null ? '' : __t) +
'</span>Instellingen</h2>\t\r\n\r\n\t</div>\r\n\r\n\t<div class="body">\r\n\r\n\t\t<div class="list list-nostyle list-small" id="settings-general">\r\n\t\t\t<p class="description"></p>\r\n\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.account )) == null ? '' : __t) +
'</span>Algemeen</div>\r\n\t\t\r\n\t\t\t<div class="list-item" id="title">\r\n\t\t\t\t\r\n\t\t\t\t<label class="key">' +
((__t = ( myAPP.texts.keys.company_name )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t<div class="background-wrapper"><input type="text" name="title" value="' +
((__t = ( account.title )) == null ? '' : __t) +
'"></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="list-item" id="email">\r\n\t\t\t\t\r\n\t\t\t\t<label class="key">' +
((__t = ( myAPP.texts.keys.email )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t<div class="background-wrapper"><input type="text" name="email" value="' +
((__t = ( account.email || "" )) == null ? '' : __t) +
'"></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="list-item" id="logo">\r\n\t\t\t\t\r\n\t\t\t\t<label class="key">Logo</label>\r\n\t\t\t\t\r\n\t\t\t\t<div class="logo-container">\t\t\t\t\r\n\t\t\t\t\t<div class="mouse-over"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.logo )) == null ? '' : __t) +
'</span></div>\r\n\t\t\t\t\t<div class="button" id="upload"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.upload )) == null ? '' : __t) +
'</span>Logo uploaden</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="list list-nostyle" id="settings-subscription">\r\n\r\n\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.subscription )) == null ? '' : __t) +
'</span>Abonnement</div>\r\n\r\n\t\t\t<p class="description">' +
((__t = ( myAPP.texts.helptexts.invoices_sent )) == null ? '' : __t) +
'</p>\r\n\t\t\t<div class="list-item" id="subscription">\r\n\t\t\t\t<label class="key">Abonnement</label>\r\n\t\t\t\t';
 if (account.subscription === "free") { ;
__p += '\r\n\t\t\t\t\t<div class="subscription">Gratis gebruiker</div>\r\n\t\t\t\t\t<div class="button" id="upgrade"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.subscription )) == null ? '' : __t) +
'</span>Upgraden</div>\r\n\r\n\r\n\t\t\t\t\t<div class="invoices-marker">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="invoices-bar">\r\n\t\t\t\t\t\t\t<div class="indicator"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="numbers"><span class="sent">' +
((__t = ( account.monthlyInvoicesSent )) == null ? '' : __t) +
'</span> van <span class="total">' +
((__t = ( account.maxMonthlyInvoices )) == null ? '' : __t) +
'</span></div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } else if (account.subscription === "payed") { ;
__p += ' \r\n\r\n\t\t\t\t\t<div class="subscription">' +
((__t = ( myAPP.texts.fullMembership )) == null ? '' : __t) +
'</div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="list list-nostyle" id="payment-options">\r\n\r\n\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>Betalingen</div>\r\n\r\n\t\t\t<p class="description">' +
((__t = ( myAPP.texts.helptexts.payments )) == null ? '' : __t) +
'</p>\r\n\t\t\t<div class="list-item" id="kasco-payment">\r\n\t\t\t\t\r\n\t\t\t\t<label class="key">Betalingen via</label>\r\n\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="kasco-payment" id="kasco-payment">\r\n\t\t\t\t\t<span class="value">' +
((__t = ( accountSettings.kasco_payment !== 0 ? "Via KasCo" : "Via uzelf" )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<p class="description">' +
((__t = ( myAPP.texts.helptexts.payment_plans )) == null ? '' : __t) +
'</p>\r\n\t\t\t<div class="list-item" id="payment-plans">\r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t<label class="key">Betalingsregelingen</label>\r\n\r\n\t\t\t\t';
 if (account.subscription === "payed") { ;
__p += ' \r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="accept-paymentplans" id="accept-payment-plans">\r\n\t\t\t\t\t\t<span class="value">' +
((__t = ( accountSettings.max_payment_terms > 1 ? "Accepteren" : "Weigeren"  )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span></div>\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="number-slider ' +
((__t = ( accountSettings.max_payment_terms > 1 ? "show" : "hide" )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t<p>Maximaal aantal termijnen</p>\r\n\t\t\t\t\t\t<div id="slider"></div><span id="max-payment-terms" class="value">' +
((__t = ( accountSettings.max_payment_terms )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="disabled">' +
((__t = ( myAPP.texts.notApplicable )) == null ? '' : __t) +
'</div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\r\n\t\t\t</div>\t\t\t\r\n\t\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n\t<div class="buttons buttons-small">\r\n\t\t<div class="button myAPP-tooltip" id="save" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.save )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\t\t<div class="button myAPP-tooltip" id="cancel" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.cancel )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.cancel )) == null ? '' : __t) +
'</span>Annuleer</div>\r\n\t</div>\t\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/account/user-password.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="change-password body-content">\r\n\t\t\t\r\n\t<div class="list list-nostyle">\r\n\r\n\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.password )) == null ? '' : __t) +
'</span>Wachtwoord wijzigen</div>\r\n\r\n\t\t<div class="list-item" id="old_password">\r\n\t\t\t<label class="key" for="_old_password">' +
((__t = ( myAPP.texts.keys.oldPassword )) == null ? '' : __t) +
'</label>\r\n\t\t\t<div class="background-wrapper"><input type="password" name="old_password" id="_old_password"></div>\r\n\t\t\r\n\t\t</div>\r\n\t\t<div class="list-item" id="password">\r\n\t\t\t<label class="key" for="_password">' +
((__t = ( myAPP.texts.keys.newPassword )) == null ? '' : __t) +
'</label>\t\r\n\t\t\t<div class="background-wrapper"><input type="password" name="password" id="_password"></div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div class="list-item" id="confirm-password">\r\n\t\t\t<label class="key" for="_confirm-password">' +
((__t = ( myAPP.texts.keys.confirmPassword )) == null ? '' : __t) +
'</label>\r\n\t\t\t<div class="background-wrapper"><input type="password" name="confirm-password" id="_confirm-password"></div>\r\n\t\t</div>\r\n\t\r\n\t</div>\r\n\t\r\n\t<div class="buttons buttons-small">\r\n\t\t<div class="button myAPP-tooltip" id="save" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.save )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\t\t<div class="button myAPP-tooltip" id="cancel" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.cancel )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.cancel )) == null ? '' : __t) +
'</span>Annuleer</div>\r\n\t</div>\r\n\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["templates/account/user.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="user-view">\r\n\r\n\t<h2 class="description"><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.user )) == null ? '' : __t) +
'</span><span class="text">' +
((__t = ( user.name )) == null ? '' : __t) +
'</span></h2>\r\n\t\r\n\t\t<ul class="buttons head">\r\n\t\t\t';
 if (user.isCurrentUser && userRole !== "guestUser")  { ;
__p += '\r\n\t\t\t\r\n\t\t\t\t<li id="change-password" class="button button-icon myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.changePassword )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.password )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t<li id="edit" class="button button-icon myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.editUser )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.edit )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\r\n\t\t\t';
 } else if ( userRole === "admin" || userRole === "superadmin") { ;
__p += '\r\n\t\t\t\t\r\n\t\t\t\t<!-- <li id="edit-role" class="button button-icon myAPP-tooltip myAPP-dropdown myAPP-dropdown-autoupdate" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.editUserRole )) == null ? '' : __t) +
'" data-dropdown="user-roles"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.edit )) == null ? '' : __t) +
'</span></li>  -->\r\n\t\t\t\t<li id="delete" class="button button-icon myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.removeUser )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.ddelete )) == null ? '' : __t) +
'</span></li>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t\r\n\t\t</ul>\r\n\r\n\t<div class="user">\r\n\r\n\t\t<div class="body">\r\n\r\n\t\t\t<div class="body-content">\r\n\r\n\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.list )) == null ? '' : __t) +
'</span>Gegevens</div>\r\n\r\n\t\t\t\t\t\t';
 _.each(_.pick(user, ['name', 'role', 'email']), function (value, key) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t<div class="key" id="' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.values[key] ? myAPP.texts.values[key][value] : value )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/account/users-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="users-collection">\r\n\r\n\t\t\t<ul class="list list-big">\r\n\t\t\t\r\n\t\t\t<li class="list-header">Alle gebruikers</li>\r\n\t\t\t\t\t\r\n\t\t\t';
 collection.each(function (user) { user = user.getAttributes() ;
__p += '\r\n\r\n\t\t\t\t\t\t<li class="list-item" id="' +
((__t = ( user.user_id )) == null ? '' : __t) +
'"> \r\n\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.user )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div>\r\n\r\n\t\t\t\t\t\t\t\t<span class="name">' +
((__t = ( user.name )) == null ? '' : __t) +
'</span>\r\n\r\n\t\t\t\t\t\t\t\t';
 if (user.last_login) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<span class="description">' +
((__t = ( myAPP.texts.lastLogin )) == null ? '' : __t) +
': ' +
((__t = ( myAPP.templateHelpers.parseDate(user.last_login) )) == null ? '' : __t) +
'</span>\r\n\r\n\t\t\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<span class="description"><em>' +
((__t = ( myAPP.texts.neverLoggedIn )) == null ? '' : __t) +
'</em></span>\r\n\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div>\r\n\r\n\t\t\t\t\t\t\t\t';
 if (user.isCurrentUser) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<span class="label label-info">' +
((__t = ( myAPP.texts.currentUser )) == null ? '' : __t) +
'</span>\r\n\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t';
 if (user.role === "superadmin" || user.role ==="admin") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<div data-tooltip="' +
((__t = ( myAPP.texts.tooltips.hasAdminRights )) == null ? '' : __t) +
'" class="myAPP-tooltip entype role">' +
((__t = ( myAPP.templateHelpers.charCodes.admin )) == null ? '' : __t) +
'</div>\r\n\r\n\t\t\t\t\t\t\t';
 }  ;
__p += '\r\n\r\n\t\t\t\t\t\t</li>\r\n\r\n\t\t\t';
 }); ;
__p += '\r\n\t\t\t\r\n\t\t</ul>\r\n\r\n\t\r\n\t\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/account/users.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="users">\r\n\t\r\n\t<div class="title">\r\n\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.users )) == null ? '' : __t) +
'</span>Gebruikers</h2>\r\n\r\n\t\t';
 if (isSuperAdmin) { ;
__p += '\r\n\t\r\n\t\t\t<ul class="buttons">\r\n\t\t\t\t<li class="button button-icon myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.newUser )) == null ? '' : __t) +
'" id="add-user"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.addUser )) == null ? '' : __t) +
'</span></li>\t\t\t\r\n\t\t\t</ul>\r\n\r\n\t\t';
 } ;
__p += '\r\n\r\n\t</div>\r\n\r\n\t<div class="pane users-pane"></div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/account/usersCollection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="usersCollection">\n\n\t\t\t<ul class="list">\n\t\t\t\n\t\t\t<li class="list-header">Alle gebruikers</li>\n\t\t\t\t\t\n\t\t\t';
 collection.each(function (user) { user = user.toJSON() ;
__p += '\n\n\t\t\t\t\t\t<li class="list-item" id="' +
((__t = ( user.id )) == null ? '' : __t) +
'"> \n\n\t\t\t\t\t\t\t';
 if (user.role === "superadmin" || user.role ==="admin") { ;
__p += '\n\n\t\t\t\t\t\t\t\t<span data-tooltip="deze gebruiker heeft admin-rechten" class="myAPP_tooltip right entype role">&#x1F511;</span>\n\n\t\t\t\t\t\t\t';
 }  ;
__p += '\n\n\t\t\t\t\t\t\t<span class="entype">&#x1F464;</span>\n\n\t\t\t\t\t\t\t<span class="title">' +
((__t = ( user.name )) == null ? '' : __t) +
'</span>\n\n\t\t\t\t\t\t\t';
 if (user.last_login) { var date = new Date(user.last_login); ;
__p += '\n\n\t\t\t\t\t\t\t\t<span class="description">Laatst ingelogd: ' +
((__t = ( date.getDate() + " " + myAPP.templateHelpers.month(date.getMonth()) + " " + date.getFullYear() )) == null ? '' : __t) +
'</span>\n\n\t\t\t\t\t\t\t';
 } else { ;
__p += '\n\n\t\t\t\t\t\t\t\t<span class="description"><em>niet eerder ingelogd</em></span>\n\n\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\n\t\t\t\t\t\t</li>\n\n\t\t\t';
 }); ;
__p += '\n\t\t\t\n\t\t</ul>\n\n\t\n\t\t\n</div>\n';

}
return __p
};

this["JST"]["templates/articles/article.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="article-view">\r\n\r\n\t<h2 class="description"><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span><span class="text">' +
((__t = ( article.title )) == null ? '' : __t) +
'<span class="separator"> | </span><span class="articleGroupName">' +
((__t = ( article.articleGroupName || "-" )) == null ? '' : __t) +
'</span></h2>\t\r\n\r\n\t<div class="buttons">\r\n\r\n\t\t<div class="button button-icon myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.deleteArticle )) == null ? '' : __t) +
'" id="delete"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.ddelete )) == null ? '' : __t) +
'</span></div>\r\n\r\n\t</div>\r\n\r\n\t<div class="article">\r\n\r\n\t\t<div class="body">\r\n\r\n\t\t\t<div class="body-content">\r\n\t\t\t\t\r\n\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.list )) == null ? '' : __t) +
'</span>Artikelgegevens</div>\r\n\r\n\t\t\t\t\t';
 _.each(_.pick(article, ['title', 'description', 'article_number', 'name', 'vat', 'price']), function (value, key) { ;
__p += '\r\n\t\t\t\r\n\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\r\n\t\t\t\t\t\t';
 if (key === 'vat') { ;
__p += ' \r\n\r\n\t\t\t\t\t\t\t<label class="key">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="vat" id="vat">\r\n\t\t\t\t\t\t\t\t<span class="value">' +
((__t = ( value )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span> </div>\r\n\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t';
 } else if (key === "price") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<label class="key"  for="' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" value="' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(value) )) == null ? '' : __t) +
'" ></div>\r\n\r\n\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<label class="key" for="' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t</div>\t\r\n\r\n\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t\t<div class="list-item" id="article_group_id">\r\n\t\t\t\t\t\t<label for="" class="key">Artikelgroep</label>\r\n\t\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="article-groups" id="article_group_id">\r\n\t\t\t\t\t\t\t\t<span class="value">' +
((__t = ( article.articleGroupName || "geen" )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span> </div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\t\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="button myAPP-tooltip" id="save" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.save )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/articles/articles-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="articles-collection">\r\n\r\n\t\t\t<h2 class="description"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.articleGroup )) == null ? '' : __t) +
'</span>' +
((__t = ( collection.title )) == null ? '' : __t) +
'</h2>\r\n\r\n\t\t\t<div class="table-controls">\r\n\r\n\t\t\t\t<ul class="controls page-controls button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pageControls )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t<li id="previous-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t<li><div class="animation-wrapper"><span id="current-page">' +
((__t = ( collection.currentPage + 1 )) == null ? '' : __t) +
'</span></div><span>/</span><span id="total-pages">' +
((__t = ( collection.totalPages )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t<li id="next-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t</ul>\t\r\n\r\n\t\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t\t</div> \t\t\t\r\n \r\n\t\t\t';
 if (collection.isRootLevel) { ;
__p += '\r\n\t\t\r\n\t\t\t\t\t<div class="buttons">\r\n\t\t\t\t\t\t<div class="button button-blue myAPP-tooltip" id="new-group" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.newArticleGroup )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.articleGroup )) == null ? '' : __t) +
'</span>Nieuwe groep</div>\r\n\t\t\t\t\t\t<div class="button button-blue myAPP-tooltip" id="new-article" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.newArticle )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span>Nieuw artikel</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="buttons">\r\n\t\t\t\t\t\t<div class="button button-blue myAPP-tooltip" id="new-article" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.newArticle )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span>Nieuw artikel</div>\r\n\t\t\t\t\t\t<div class="button button-icon myAPP-tooltip" id="delete" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.deleteArticle )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.ddelete )) == null ? '' : __t) +
'</span></div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t<div class="body">\r\n\r\n\t\t\t\t<div class="table">\r\n\t\t\t\r\n\t\t\t\t\t<div class="table-header table-row">\r\n\t\t\t\t\t\t<div id="icon" class="table-cell"></div>\r\n\t\t\t\t\t\t<div id="title" class="table-cell sort-handle"><span>Artikel</span></div>\r\n\t\t\t\t\t\t<div id="number" class="table-cell sort-handle"><span>Artikelnummer</span></div>\r\n\t\t\t\t\t\t<div id="vat" class="table-cell sort-handle"><span>Btw</span></div>\r\n\t\t\t\t\t\t<div id="price" class="table-cell sort-handle"><span>Prijs</span></div>\r\n\r\n\t\t\t\t\t\t<!-- <div id="total_invoices" class="table-cell sort-handle"><span>Gefactureerd</span></div> -->\r\n\t\t\t\t\t\t<!-- <div id="balance" class="table-cell sort-handle"><span>saldo</span></div> -->\r\n\t\t\t\t\t</div>\r\n\t\r\n\t\t\t\t\t<div class="table-body paginate-page">\r\n\r\n\t\t\t\t';
 if (collection.length > 0) { ;
__p += '\t\t\t\t\t\r\n\r\n\t\t\t\t\t';
 _.each(collection.models, function (articleGroup) {
						var isGroup = articleGroup instanceof myAPP.models.ArticleGroup; articleGroup = articleGroup.getAttributes() 
					;
__p += '\r\n\r\n\t\t\t\t\t\t<div class="table-row ';
 if (isGroup) print("group") ;
__p += '" id="' +
((__t = ( articleGroup.id )) == null ? '' : __t) +
'"> \r\n\t\t\t\t\t\r\n\t\t\t\t\t\t\t';
 if (isGroup) { ;
__p += ' \r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div id="icon" class="table-cell">\t\r\n\t\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.articleGroup )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div id="title" class="table-cell">\r\n\t\t\t\t\t\t\t\t\t<span class="title">' +
((__t = ( articleGroup.title )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t<span class="totalArticles">' +
((__t = ( articleGroup.totalArticles )) == null ? '' : __t) +
' artikelen</span>\r\n\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<div id="icon" class="table-cell">\r\n\t\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div id="title" class="table-cell">\r\n\t\t\t\t\t\t\t\t\t<span class="title">' +
((__t = ( articleGroup.title )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div id="number" class="table-cell">\r\n\t\t\t\t\t\t\t\t\t<span class="number">' +
((__t = ( articleGroup.article_number )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div id="vat" class="table-cell">\r\n\t\t\t\t\t\t\t\t\t<span class="vat">' +
((__t = ( articleGroup.vat )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div id="price" class="table-cell">\r\n\t\t\t\t\t\t\t\t\t<span class="price">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(articleGroup.price) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\t\t\t\t\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t';
 }); ;
__p += '\r\n\r\n\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="table-row placeholder">\r\n\r\n\t\t\t\t\t\t\t<h2>Geen artikelen</h2>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\r\n\r\n\t\t\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\r\n\t\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/articles/articles.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="mainPaneWrapper articles-view">\r\n\t\r\n\t<div class="header">\r\n\t\t<h2>Artikelen</h2>\r\n\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span>\r\n\r\n\t</div>\r\n\r\n\t<!-- <div class="sidebar">\r\n\r\n\t\t\t<div class="button button-big myAPP-tooltip" id="new-article" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.newArticle )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span><span class="text">Nieuw artikel</span></div>\t\r\n\r\n\t\t\t<div class="tabs-vertical">\t\t\r\n\r\n\t\t\t\t<ul>\r\n\r\n\t\t\t\t\t<li class="tab selected" id="all"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span>Alle artikelen</li>\r\n\t\t\t\t\t\r\n\t\t\t\t</ul>\r\n\r\n\t\t\t</div>\r\n\t\r\n\t</div> -->\r\n\r\n\t<!-- <div class="sidebar-toggle"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.sidebarToggle )) == null ? '' : __t) +
'</span></div> -->\r\n\r\n\t<div class="pane articles-pane">\t\r\n\r\n\t</div>\t\r\n\t\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["templates/articles/new-article-group.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="article-view">\r\n\t\r\n\t<h2 class="description"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.articleGroup )) == null ? '' : __t) +
'</span><span class="text">' +
((__t = ( articleGroup.title )) == null ? '' : __t) +
'</span></h2>\r\n\r\n\t<div class="article">\r\n\r\n\t\t<div class="body">\r\n\r\n\t\t\t<div class="body-content">\r\n\t\t\t\t\t\r\n\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.list )) == null ? '' : __t) +
'</span>Artikelgegevens</div>\r\n\r\n\t\t\t\t\t';
 _.each(_.pick(articleGroup, ['title']), function (value, key) { ;
__p += '\r\n\t\t\t\r\n\t\t\t\t\t\t<div class="list-item">\r\n\r\n\t\t\t\t\t\t\t<label class="key"  for="' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\r\n\r\n\t\t\t\t\t\t</div>\t\r\n\r\n\t\t\t\t\t';
 }) ;
__p += '\t\t\t\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="button myAPP-tooltip" id="save" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.save )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\r\n\t</div>\r\n\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/articles/new-article.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="article-view">\r\n\r\n\t<h2 class="description"><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span><span class="text">' +
((__t = ( article.title )) == null ? '' : __t) +
'</span></h2>\t\r\n\t\r\n\t<div class="article">\r\n\r\n\t\t<div class="body">\r\n\r\n\t\t\t<div class="body-content">\r\n\t\t\t\t\t\r\n\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.list )) == null ? '' : __t) +
'</span>Artikelgegevens</div>\r\n\r\n\t\t\t\t\t';
 _.each(_.pick(article, ['title', 'description', 'article_number', 'vat', 'price']), function (value, key) { ;
__p += '\r\n\t\t\t\r\n\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\r\n\t\t\t\t\t\t';
 if (key === 'vat') { ;
__p += ' \r\n\r\n\t\t\t\t\t\t\t<label class="key">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="vat" id="vat">\r\n\t\t\t\t\t\t\t\t<span class="value">' +
((__t = ( value )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span></div>\r\n\r\n\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<label class="key"  for="' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t</div>\t\r\n\r\n\t\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t\t<div class="list-item" id="article_group_id">\r\n\t\t\t\t\t\t<label for="" class="key">Artikelgroep</label>\r\n\t\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="article-groups" id="article_group_id">\r\n\t\t\t\t\t\t\t\t<span class="value">' +
((__t = ( article.articleGroupName || "geen" )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span> </div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="button myAPP-tooltip" id="save" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.save )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/dashboard/dashboard.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\r\n<div class="mainPaneWrapper dashboard">\r\n\t\r\n\t<div class="header">\r\n\t\t<h2>Dashboard</h2>\r\n\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.dashboard )) == null ? '' : __t) +
'</span>\r\n\r\n\r\n\t\t<div class="logo-container"></div>\r\n\r\n\t</div>\r\n\r\n\t<div class="dashboard-pane">\r\n\r\n\t\t<div class="head">\r\n\t\t\t\t\r\n\t\t\t<ul>\r\n\t\t\t\t<li class="margin-right"><div class="description">Openstaand</div><div class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(totalDue) )) == null ? '' : __t) +
'</div></li>\r\n\t\t\t\t<li class="margin-right"><div class="description">Omzet dit kwartaal</div><div class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(turnover) )) == null ? '' : __t) +
'</div></li>\t\t\t\t\t\t\t\t\r\n\t\t\t\t<li><div class="description">Btw dit kwartaal</div><div class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(vatDue) )) == null ? '' : __t) +
'</div></li>\r\n\t\t\t</ul>\r\n\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="left">\r\n\r\n\t\t\t<div class="row invoices">\r\n\t\t\t\t\r\n\t\t\t\t<div class="list list-nostyle">\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoices )) == null ? '' : __t) +
'</span>Facturen</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="chart margin-right">\r\n\t\t\t\t\t<div class="description">Aantal</div>\r\n\t\t\t\t\t<canvas id="invoices-number" width="250" height="130"></canvas>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t\r\n\t\t\t\t<div class="chart">\r\n\t\t\t\t\t<div class="description">Omzet</div>\r\n\t\t\t\t\t<canvas id="invoices-value" width="250" height="130"></canvas>\r\n\t\t\t\t</div>\r\n\t\t\t\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="row payments">\r\n\t\t\t\t\r\n\t\t\t\t<div class="list list-nostyle">\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>Betalingen</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="chart margin-right">\r\n\t\t\t\t\t<div class="description">Waarde</div>\r\n\t\t\t\t\t<canvas id="payments" width="250" height="130"></canvas>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t\r\n\t\t\t\t<div class="chart">\r\n\t\t\t\t\t<div class="description">Op tijd</div>\r\n\t\t\t\t\t<canvas id="payments-on-time" width="250" height="130"></canvas>\r\n\t\t\t\t</div>\t\t\t\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<!-- <div class="row statistics">\r\n\t\t\t\t\r\n\t\t\t\t<div class="list list-nostyle">\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.piechart )) == null ? '' : __t) +
'</span>Statistieken</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="chart">\r\n\t\t\t\t\t<div class="description">Op tijd betaald</div>\r\n\t\t\t\t\t<canvas id="pie-payments-on-time" width="70" height="70"></canvas>\r\n\t\t\t\t\t<div class="number">' +
((__t = ( isNaN(percentages.paidInTime) ? "-" : percentages.paidInTime.toFixed(1)  )) == null ? '' : __t) +
' %</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t\r\n\t\t\t\t<div class="chart">\r\n\t\t\t\t\t<div class="description">Na herinnering</div>\r\n\t\t\t\t\t<canvas id="pie-reminder" width="70" height="70"></canvas>\r\n\t\t\t\t\t<div class="number">' +
((__t = ( isNaN(percentages.paidAfterReminder) ? "-" : percentages.paidAfterReminder.toFixed(1) )) == null ? '' : __t) +
' %</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="chart">\r\n\t\t\t\t\t<div class="description">Na aanmaning</div>\r\n\t\t\t\t\t<canvas id="pie-summation" width="70" height="70"></canvas>\r\n\t\t\t\t\t<div class="number">' +
((__t = ( isNaN(percentages.paidAfterSummation) ? "-" : percentages.paidAfterSummation.toFixed(1) )) == null ? '' : __t) +
' %</div>\r\n\t\t\t\t</div>\r\n\t\t\t\r\n\r\n\t\t\t</div> -->\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="right">\r\n\r\n\t\t\t';
 if (myAPP.currentAccount.get( "canFinalize" )) { ;
__p += '\r\n\r\n\t\t\t\t<div class="button button-big button-blue" id="finalize-account"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.login )) == null ? '' : __t) +
'</span>Definitief overstappen</div>\r\n\r\n\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t<div class="button button-big button-blue" id="new-invoice"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.newInvoice )) == null ? '' : __t) +
'</span>Nieuwe factuur</div>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t\r\n\t\t\t<div class="row">\r\n\t\t\t\t<div class="list list-nostyle">\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.notification )) == null ? '' : __t) +
'</span>Meldingen</div>\r\n\t\t\t\t</div>\r\n\r\n\r\n\t\t\t\t<ul class="notifications">\r\n\r\n\t\t\t\t\t';
 if (notifications.length > 0) { ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 notifications = notifications.slice(0, 7); ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 _.each(notifications, function (notification) { var cid = notification.cid; notification = notification.getAttributes(); ;
__p += '\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<li id="' +
((__t = ( cid )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t<div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.notification )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t<div class="label-holder"><span class="label label-' +
((__t = ( notification.label )) == null ? '' : __t) +
'">' +
((__t = ( notification.labelText )) == null ? '' : __t) +
'</span></div>\r\n\t\t\t\t\t\t\t<div class="date">' +
((__t = ( notification.date.getDate() + " " + myAPP.templateHelpers.month(notification.date.getMonth()) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t<div class="text">' +
((__t = ( notification.text )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t</li>\r\n\r\n\t\t\t\t\t\t';
 }); ;
__p += '\r\n\r\n\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t<li class="placeholder">\r\n\t\t\t\t\t\t\t<div>Geen meldingen</div>\r\n\t\t\t\t\t\t</li>\r\n\r\n\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/debtors/all-debtors-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="debtors-collection">\n\n\t<div class="list-controls">\n\n\t\t<ul class="controls page-controls button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pageControls )) == null ? '' : __t) +
'">\n\t\t\t<li id="previous-page"><span class="entype">&#x2b05;</span></li>\n\t\t\t<li><div class="animation-wrapper"><span id="current-page">' +
((__t = ( collection.currentPage + 1 )) == null ? '' : __t) +
'</span></div><span>/</span><span id="total-pages">' +
((__t = ( collection.totalPages )) == null ? '' : __t) +
'</span></li>\n\t\t\t<li id="next-page"><span class="entype">&#x27a1;</span></li>\n\t\t</ul>\n\n\n\t\t<div style="clear: both"></div>\n\n\t</div>\n\n\t<div class="table">\n\t\n\t\t<div class="table-header table-row">\n\t\t\t<div id="icon" class="table-cell"></div>\n\t\t\t<div id="name" class="table-cell sort-handle"><span>Debiteur</span></div>\n\t\t\t<div id="totalInvoices" class="table-cell sort-handle"><span>Facturen</span></div>\n\t\t\t<div id="balance" class="table-cell sort-handle"><span>Saldo</span></div>\n\t\t</div>\n\t\t\n\t\t<div class="table-body paginate-page">\n\n\t\t\t';
 if (collection.length > 0) {  ;
__p += '\t\t\t\t\n\n\t\t\t\t';
 collection.each(function (debtor) { debtor = debtor.getAttributes(); ;
__p += '\n\n\t\t\t\t\t<div class="table-row" id="' +
((__t = ( debtor.id )) == null ? '' : __t) +
'"> \n\t\t\t\t\n\t\t\t\t\t\t<div id="icon" class="table-cell">\n\t\t\t\t\t\t\t<span class="entype">&#x1F464;</span>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div id="name" class="table-cell">\n\t\t\t\t\t\t\t<span class="name">' +
((__t = ( debtor.name )) == null ? '' : __t) +
'</span>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div id="total_invoices" class="table-cell">\n\t\t\t\t\t\t\t';
 if (debtor.totalInvoices > 0) { ;
__p += '\n\t\t\t\t\t\t\t\t<span class="facturen"><span class="number">' +
((__t = ( debtor.totalInvoices )) == null ? '' : __t) +
'</span> facturen</span>\n\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div id="balance" class="table-cell">\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<span class="amount">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(debtor.balance) )) == null ? '' : __t) +
'</span>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\n\n\t\t\t\t\t</div>\n\n\t\t\t\t';
 }); ;
__p += '\n\n\t\t\t';
 } else { ;
__p += '\n\n\t\t\t\t<div class="table-row placeholder">\n\n\t\t\t\t\t<h2>Geen debiteuren</h2>\n\n\t\t\t\t</div>\n\n\t\t\t';
 } ;
__p += '\n\n\n\t\t</div>\n\t\n\t</div>\n\t\t\n</div>\n';

}
return __p
};

this["JST"]["templates/debtors/all-debtors.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="debtors">\n\n\t<div class="debtors-collection-pane"></div>\t\n\n</div>\t';

}
return __p
};

this["JST"]["templates/debtors/debtor-not-found.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="debtor-view">\n\n\t<div class="debtor">\n\n\t\t<div class="head">\n\n\t\t\t<div class="item" id="debtor">\n\t\t\t\t<div class="description">Debiteur</div>\n\t\t\t\t<div class="value">Debiteur niet gevonden</div>\n\t\t\t</div>\n\n\n\t\t\t<div class="item" id="balance">\n\t\t\t\t<div class="description">Saldo</div>n.v.t.</div></div>\n\t\t\t</div>\n\n\t\t</div>\n\n\t\t<div class="body">\n\n\t\t</div>\n\n\t</div>\n\n</div>';

}
return __p
};

this["JST"]["templates/debtors/debtor-settings.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="debtor-settings subscreen">\n\t\n\t<div class="list">\n\n\t\t<div class="list-header">\n\t\t\t<span class="entype">&#x2692;</span>factuurinstellingen\n\t\t</div>\n\n\t\t<div class="list-item list-item-big">\n\t\t\t<div class="key">vervaltermijn</div>\n\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="payment-terms" id="payment-term">\n\t\t\t\t<span class="value">14 dagen</span><span class="caret caret-small caret-down"></span> </div>\n\t\t</div>\n\n\t\t<div class="list-item list-item-big">\n\t\t\t<div class="key">verzendmethode</div>\n\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="delivery-methods" id="delivery-method">\n\t\t\t\t<span class="value">post</span><span class="caret caret-small caret-down"></span> </div>\n\t\t</div>\n\n\t\t<div class="list-item list-item-big">\n\t\t\t<div class="key">betalingsregelingen</div>\n\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="delivery-methods" id="delivery-method">\n\t\t\t\t<span class="value">accepteer</span><span class="caret caret-small caret-down"></span> </div>\n\t\t</div>\n\t\t\n\n\t</div>\n\n\t\t\n\t<div class="buttons buttons-small">\n\t\t<div class="button" id="save-button"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\n\t\t<div class="button" id="cancel-button"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.cancel )) == null ? '' : __t) +
'</span>Annuleren</div>\n\t</div>\n\n</div>';

}
return __p
};

this["JST"]["templates/debtors/debtor.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="debtor-view">\r\n\r\n\t<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</div>Debiteur</h2>\r\n\t\r\n\t<div class="buttons right">\r\n\r\n\t\t<div class="button myAPP-tooltip myAPP-dropdown"\r\n\t\t\tid="settings" \t\t\t\t\r\n\t\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.viewInvoicePDF )) == null ? '' : __t) +
'" \r\n\t\t\tdata-dropdown="debtor-settings">\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</span>\r\n\t\t\tInstellingen\r\n\t\t\t<span class="caret caret-small caret-down"></span>\r\n\t\t</div>\r\n\r\n\t\t<div class="button myAPP-tooltip myAPP-dropdown" \t\t\t\t\r\n\t\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.debtorActions )) == null ? '' : __t) +
'"\r\n\t\t\tid="actions" \r\n\t\t\tdata-dropdown="debtor-actions">\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.settings )) == null ? '' : __t) +
'</span>\r\n\t\t\tActies\r\n\t\t\t<span class="caret caret-small caret-down"></span>\r\n\t\t</div>                \r\n\t\t\r\n\t</div>\r\n\r\n\t<div class="debtor">\r\n\r\n\t\t<div class="head"> \r\n\r\n\t\t\t<div class="item" id="debtor">\r\n\t\t\t\t<div class="description">Debiteur</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\t\r\n\t\r\n\r\n\t\t\t<div class="item" id="balance">\r\n\t\t\t\t<div class="description">Saldo</div>\r\n\t\t\t\t<div class="value"><div class="text">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(debtor.balance) )) == null ? '' : __t) +
'</div></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t\r\n\t\t\t';
 if (debtor.totalExtraCosts) { ;
__p += '\r\n\r\n\t\t\t\t<div class="item" id="extra-costs">\r\n\t\t\t\t\t<div class="description">Extra kosten</div>\r\n\t\t\t\t\t<div class="value"><div class="text">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(debtor.totalExtraCosts) )) == null ? '' : __t) +
'</div></div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } ;
__p += '\t\r\n\r\n\t\t\t\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="body">\r\n\r\n\t\t\t<div class="body-content">\r\n\r\n\t\t\t\t<div class="stats">\r\n\t\t\t\t\t\r\n\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t<li class="item"><span class="description">Facturen</span>\r\n\t\t\t\t\t\t\t<span class="label entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoices )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t<span class="number">' +
((__t = ( debtor.totalInvoices )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t\t<li class="item"><span class="description">Openstaand</span>\r\n\t\t\t\t\t\t\t';
 if (debtor.openInvoices > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t\t<span class="label entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t<span class="number">' +
((__t = ( debtor.openInvoices )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t<li class="item"><span class="description">Vervallen</span>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t';
 if (debtor.dueInvoices > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t\t<span class="label label-warning warning entype">' +
((__t = ( myAPP.templateHelpers.charCodes.warning )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t<span class="number warning">' +
((__t = ( debtor.dueInvoices )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\t\r\n\t\t\t\t\t\t<li class="item"><span class="description">Bezwaren</span>\r\n\t\t\t\t\t\t\t';
 if (debtor.objections > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t\t<span class="label label-error error entype">' +
((__t = ( myAPP.templateHelpers.charCodes.objection )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t<span class="number error">' +
((__t = ( debtor.objections )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\t\r\n\t\t\t\t\t\t<li class="item"><span class="description">Betaalplan</span>\r\n\t\t\t\t\t\t\t';
 if (debtor.paymentPlans > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t\t<span class="entype label label-info info">' +
((__t = ( myAPP.templateHelpers.charCodes.paymentPlan )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t<span class="number info">' +
((__t = ( debtor.paymentPlans )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\t\r\n\t\t\t\t\t\t<li class="item"><span class="description">Invordering</span>\r\n\t\t\t\t\t\t\t';
 if (debtor.collections > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t\t<span class="entype label label-error error">' +
((__t = ( myAPP.templateHelpers.charCodes.collection )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t<span class="number error">' +
((__t = ( debtor.collections )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t</ul>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="charts">\r\n\r\n\t\t\t\t\t<div class="chart bar">\r\n\t\t\t\t\t\t<div class="description">Omzet</div>\r\n\t\t\t\t\t\t<canvas id="invoices-value" width="200" height="100"></canvas>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="chart donut">\r\n\t\t\t\t\t\t<div class="description">Op tijd betaald</div>\r\n\t\t\t\t\t\t<canvas id="pie-payments-on-time" width="50" height="50"></canvas>\r\n\t\t\t\t\t\t<div class="number"></div>\r\n\t\t\t\t\t</div>\t\t\t\t\r\n\r\n\t\t\t\t\t<div class="chart donut">\r\n\t\t\t\t\t\t<div class="description">Na herinnering</div>\r\n\t\t\t\t\t\t<canvas id="pie-reminder" width="50" height="50"></canvas>\r\n\t\t\t\t\t\t<div class="number"></div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="chart donut">\r\n\t\t\t\t\t\t<div class="description">Na aanmaning</div>\r\n\t\t\t\t\t\t<canvas id="pie-summation" width="50" height="50"></canvas>\r\n\t\t\t\t\t\t<div class="number"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t</div>\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n\t<div class="invoices"></div>\r\n\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["templates/debtors/debtors-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="debtors-collection">\r\n\r\n\t<h2 class="description"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</span>Debiteuren</h2>\r\n\r\n\t<div class="table-controls">\r\n\r\n\t\t<ul class="controls page-controls button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pageControls )) == null ? '' : __t) +
'">\r\n\t\t\t<li id="previous-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t<li><div class="animation-wrapper"><span id="current-page">' +
((__t = ( collection.currentPage + 1 )) == null ? '' : __t) +
'</span></div><span>/</span><span id="total-pages">' +
((__t = ( collection.totalPages )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t<li id="next-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t</ul>\r\n\r\n\r\n\t\t<div style="clear: both"></div>\r\n\r\n\t</div>\r\n\r\n\t<div class="button button-blue myAPP-tooltip" id="new" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.newDebtor )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</span><span class="text">Nieuwe debiteur</span></div>\t\r\n\r\n\t<div class="table">\r\n\t\r\n\t\t<div class="table-header table-row">\r\n\t\t\t<div id="icon" class="table-cell"></div>\r\n\t\t\t<div id="company_name" class="table-cell sort-handle"><span>Debiteur</span></div>\r\n\t\t\t<div id="totalInvoices" class="table-cell sort-handle"><span>Facturen</span></div>\r\n\t\t\t<div id="balance" class="table-cell sort-handle"><span>Saldo</span></div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div class="table-body paginate-page">\r\n\r\n\t\t\t';
 if (collection.length > 0) {  ;
__p += '\t\t\t\t\r\n\r\n\t\t\t\t';
 collection.each(function (debtor) { debtor = debtor.getAttributes(); ;
__p += '\r\n\r\n\t\t\t\t\t<div class="table-row" id="' +
((__t = ( debtor.id )) == null ? '' : __t) +
'"> \r\n\t\t\t\t\r\n\t\t\t\t\t\t<div id="icon" class="table-cell">\r\n\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div id="company_name" class="table-cell">\r\n\t\t\t\t\t\t\t<span class="name">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div id="total_invoices" class="table-cell">\r\n\t\t\t\t\t\t\t';
 if (debtor.totalInvoices > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t\t<span class="facturen"><span class="number">' +
((__t = ( debtor.totalInvoices )) == null ? '' : __t) +
'</span> facturen</span>\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div id="openInvoices" class="table-cell myAPP-tooltip" data-tooltip="' +
((__t = ( debtor.openInvoices )) == null ? '' : __t) +
' openstaande facturen">\r\n\t\t\t\t\t\t\t';
 if (debtor.openInvoices > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t\t<span class="label entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span><span class="number">' +
((__t = ( debtor.openInvoices )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 if (debtor.dueInvoices > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t<div id="dueInvoices" class="table-cell myAPP-tooltip" data-tooltip="' +
((__t = ( debtor.dueInvoices )) == null ? '' : __t) +
' vervallen facturen">\r\n\t\t\t\t\t\t\t\t<span class="entype label label-warning">' +
((__t = ( myAPP.templateHelpers.charCodes.warning )) == null ? '' : __t) +
'</span><span class="number">' +
((__t = ( debtor.dueInvoices )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\t\r\n\t\t\t\t\t\t';
 } ;
__p += '\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t';
 if (debtor.objections > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t<div id="objections" class="table-cell myAPP-tooltip" data-tooltip="' +
((__t = ( debtor.objections )) == null ? '' : __t) +
' bezwaren">\r\n\t\t\t\t\t\t\t\t<span class="entype label label-error">' +
((__t = ( myAPP.templateHelpers.charCodes.objection )) == null ? '' : __t) +
'</span><span class="number">' +
((__t = ( debtor.objections )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 if (debtor.paymentPlans > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t<div id="paymentPlans" class="table-cell myAPP-tooltip" data-tooltip="' +
((__t = ( debtor.paymentPlans )) == null ? '' : __t) +
' betalingsregelingen">\r\n\t\t\t\t\t\t\t\t<span class="entype label label-info">' +
((__t = ( myAPP.templateHelpers.charCodes.paymentPlan )) == null ? '' : __t) +
'</span><span class="number">' +
((__t = ( debtor.paymentPlans )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 if (debtor.collections > 0) { ;
__p += '\r\n\t\t\t\t\t\t\t<div id="collections" class="table-cell myAPP-tooltip" data-tooltip="' +
((__t = ( debtor.collections )) == null ? '' : __t) +
' invorderingen">\r\n\t\t\t\t\t\t\t\t<span class="entype label label-error">' +
((__t = ( myAPP.templateHelpers.charCodes.collection )) == null ? '' : __t) +
'</span><span class="number">' +
((__t = ( debtor.collections )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\r\n\t\t\t\t\t\t<div id="balance" class="table-cell">\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<span class="amount">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(debtor.balance) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 }); ;
__p += '\r\n\r\n\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t<div class="table-row placeholder">\r\n\r\n\t\t\t\t\t<h2>Geen debiteuren</h2>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\r\n\t\t</div>\r\n\t\r\n\t</div>\r\n\t\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/debtors/debtors.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="mainPaneWrapper">\r\n\r\n<div class="debtors-view">\r\n\r\n\t<div class="header">\r\n\t\t\r\n\t\t<h2>Debiteuren</h2>\r\n\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</span>\r\n\r\n\t</div>\r\n\t\r\n\t<div class="pane debtors-pane"></div>\r\n\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/debtors/new-debtor.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="new-debtor-view">\r\n\t\r\n\t<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</div>Nieuwe debiteur</h2>\r\n\r\n\t<div class="debtor">\r\n\r\n\t\t<div class="head">\r\n\r\n\t\t\t<div class="item" id="debtor">\r\n\t\t\t\t<div class="description">Debiteur</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\t\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="body new-body-content">\r\n\r\n\t\t<div class="left-column">\r\n\t\r\n\t\t\t\t<div class="list list-nostyle list-small">\r\n\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.company )) == null ? '' : __t) +
'</span>Bedrijfsgegevens</div>\r\n\r\n\t\t\t\t\t';
 _.each(_.pick(debtor, ['company_name', 'email', 'name', 'phone', 'fax', 'mobile', 'kvk_number', 'vat_number', 'bank_account']), function (value, key) { ;
__p += '\r\n\t\t\t\t\r\n\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys.debtor[key] || myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\t\r\n\t\t\t\t\t\r\n\t\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t</div>\t\t\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t<div class="right-column">\r\n\r\n\t\t\t\t<div class="list list-nostyle list-small">\r\n\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.address )) == null ? '' : __t) +
'</span>Adresgegevens</div>\r\n\r\n\t\t\t\t\t';
 _.each(_.pick(debtor, ['address', 'zipcode', 'city', 'country']), function (value, key) { ;
__p += '\r\n\t\t\t\t\r\n\t\t\t\t\t\t';
 if (key !== "country") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\t\r\n\r\n\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="countries" id="country">\r\n\t\t\t\t\t\t\t\t\t<span class="value">' +
((__t = ( value )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span></div>\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\t\t\t\r\n\r\n\t\t\t<div class="button" id="save"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\t\t\t\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n</div>';

}
return __p
};

this["JST"]["templates/debtors/objection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\r\n\r\n<div class="objection-view">\r\n\t\r\n\t<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.objection )) == null ? '' : __t) +
'</div>Bezwaar</h2>\r\n\r\n\t<div class="buttons">\r\n\r\n\t\t';
 if (isSuperUser && objection.status === "active") { ;
__p += '\r\n\r\n\t\t\t<div class="button myAPP-tooltip" id="close" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.close )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</span>Sluiten</div> \r\n\r\n\t\t';
 } ;
__p += '\r\n\r\n\t\t';
 if (objection.status === "active") { ;
__p += '\r\n\r\n\t\t<div class="button myAPP-tooltip" id="reply" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.reply )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.reply )) == null ? '' : __t) +
'</span>Reageren</div> \r\n\r\n\t\t';
 } ;
__p += '\r\n\r\n\r\n\t</div>\r\n\r\n\t<div style="clear: both"></div>\r\n\r\n\t<div class="objection">\r\n\r\n\t\t<div class="head">\r\n\t\t\t\r\n\t\t\t<div class="item" id="date">\r\n\t\t\t\t<div class="description">Datum</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( myAPP.templateHelpers.parseDate(objection.created) )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="item" id="debtor">\r\n\t\t\t\t<div class="description">Debiteur</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t\r\n\r\n\r\n\t\t\t<div class="item" id="status">\r\n\t\t\t\t<div class="description">Status</div>\r\n\r\n\t\t\t';
 if (objection.status === "active") { ;
__p += '\r\n\r\n\t\t\t\t<div class="value">\r\n\t\t\t\t\t<div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.open )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t<div class="text">open</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t<div class="value myAPP-tooltip" data-tooltip="Dit bezwaar is op ' +
((__t = ( myAPP.templateHelpers.parseDate( objection.modified ) )) == null ? '' : __t) +
' gesloten">\r\n\t\t\t\t\t<div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.password )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t<div class="text">gesloten</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="description">Factuur</div>\r\n\r\n\t\t<div class="invoice-details myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.showInvoice )) == null ? '' : __t) +
'">\r\n\t\t\t\r\n\t\t\t<ul>\r\n\t\t\t\t<li><span class="key">No.</span><span class="value">' +
((__t = ( invoice.invoice_number )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t<li><span class="key">Datum</span><span class="value">' +
((__t = ( myAPP.templateHelpers.parseDate(invoice.date) )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t<li><span class="key">Bedrag</span><span class="value bold">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.total_inc_vat) )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\r\n\t\t<div class="left">\r\n\t\t\t<span class="description">Inhoud</span>\r\n\t\t\t<div class="content">' +
((__t = ( objection.content )) == null ? '' : __t) +
'</div>\r\n\t\t</div>\r\n\r\n\t\t\r\n\r\n\t\t<div class="right">\r\n\r\n\t\t\t';
 if (objection.reaction) { ;
__p += '\r\n\t\t\t\t<span class="description">Uw reactie</span>\r\n\t\t\t\t<div class="content">' +
((__t = ( objection.reaction )) == null ? '' : __t) +
'</div>\t\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</div>\t\r\n\r\n\t\t\r\n\r\n\t\t<div style="clear: both"></div>\r\n\r\n\t\t<span class="description">Attachment</span>\r\n\r\n\r\n\t\t<div class="attachment">\r\n\r\n\t\t\t';
 if (objection.file) { ;
__p += ' \r\n\r\n\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.attachment )) == null ? '' : __t) +
'</span><a href="' +
((__t = ( objection.fileUrl )) == null ? '' : __t) +
'" target="_blank">' +
((__t = ( objection.file )) == null ? '' : __t) +
'</a>\r\n\r\n\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t<div class="placeholder">geen attachment</div>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\t\t</div>\r\n\t\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/debtors/objections-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="objections-collection">\r\n\r\n\t<h2 class="description"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.objection )) == null ? '' : __t) +
'</span>Bezwaren</h2>\r\n\r\n\t<div class="table-controls">\r\n\r\n\t\t<ul class="controls page-controls button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pageControls )) == null ? '' : __t) +
'">\r\n\t\t\t<li id="previous-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t<li><div class="animation-wrapper"><span id="current-page">' +
((__t = ( collection.currentPage + 1 )) == null ? '' : __t) +
'</span></div><span>/</span><span id="total-pages">' +
((__t = ( collection.totalPages )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t<li id="next-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t</ul>\r\n\r\n\t\t<div style="clear: both"></div>\r\n\r\n\t</div>\r\n\r\n\r\n\t<div class="list list-big">\r\n\t\t\t\r\n\t\t<div class="list-header">Bezwaren</div>\r\n\t\t\t\t\t\r\n\t\t';
 if (collection.length > 0) { ;
__p += '\r\n\r\n\t\t\t';
 collection.each(function (objection) { 

				var debtor = myAPP.debtors.findWhere({ id: objection.get( "account_debtor_id") }) || new myAPP.models.Debtor();
				objection = objection.getAttributes() ;
__p += '\r\n\r\n\t\t\t\t<div class="list-item" id="' +
((__t = ( objection.id )) == null ? '' : __t) +
'"> \r\n\t\t\t\r\n\t\t\t\t\t<div>\r\n\r\n\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.objection )) == null ? '' : __t) +
'</span>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div>\r\n\r\n\t\t\t\t\t\t<span class="name">' +
((__t = ( debtor.get("company_name") )) == null ? '' : __t) +
'</span>\r\n\r\n\t\t\t\t\t\t<span class="created">Ingediend: ' +
((__t = ( myAPP.templateHelpers.parseDate(objection.created) )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\r\n\t\t\t\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div>\r\n\r\n\t\t\t\t\t\t';
 if (objection.status === "active") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<span class="label label-info">open</span>\r\n\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t';
 if (objection.file) { ;
__p += '\r\n\r\n\t\t\t\t\t\t<div data-tooltip="' +
((__t = ( myAPP.texts.tooltips.hasAttachment )) == null ? '' : __t) +
'" class="myAPP-tooltip entype attachment">' +
((__t = ( myAPP.templateHelpers.charCodes.attachment )) == null ? '' : __t) +
'</div>\r\n\r\n\t\t\t\t\t';
 }  ;
__p += '\r\n\r\n\t\t\t\t\t';
 if (objection.reaction) { ;
__p += '\r\n\r\n\t\t\t\t\t\t<div data-tooltip="' +
((__t = ( myAPP.texts.tooltips.hasReaction )) == null ? '' : __t) +
'" class="myAPP-tooltip entype reaction">' +
((__t = ( myAPP.templateHelpers.charCodes.reply )) == null ? '' : __t) +
'</div>\r\n\r\n\t\t\t\t\t';
 }  ;
__p += '\r\n\r\n\t\t\t\t\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 }); ;
__p += '\r\n\r\n\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t<div class="list-item placeholder">\r\n\t\t\t\t<h2>Geen bezwaren</h2>\r\n\t\t\t</div>\r\n\r\n\t\t';
 } ;
__p += '\r\n\t\t\t\r\n\t</div>\r\n\r\n\t\r\n\t\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/debtors/objections.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="objections">\n\n\t<div class="objections-collection-pane"></div>\t\n\n</div>\t';

}
return __p
};

this["JST"]["templates/debtors/payment-plan.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="payment-plan-view">\r\n\t\r\n\t<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.paymentPlan )) == null ? '' : __t) +
'</div>Betalingsplan</h2>\r\n\r\n\t<!-- <div class="buttons">\r\n\t\t<div class="button myAPP-tooltip" id="reply" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.reply )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.reply )) == null ? '' : __t) +
'</span>Reageren</div> \r\n\t</div> -->\r\n\r\n\t<div style="clear: both"></div>\r\n\r\n\t<div class="payment-plan">\r\n\r\n\t\t<div class="payment-plan-header">\r\n\t\t\t\r\n\t\t\t<div class="item" id="debtor">\r\n\t\t\t\t<div class="description">Debiteur</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="item" id="date">\r\n\t\t\t\t<div class="description">Datum</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( myAPP.templateHelpers.parseDate(paymentPlan.created) )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\r\n\r\n\r\n\t\t\t<div class="item" id="status">\r\n\t\t\t\t<div class="description">Status</div>\t\t\t\t\r\n\r\n\t\t\t\t\t';
 if (paymentPlan.status === "requested") { ;
__p += '\r\n\t\t\t\t\t\t<div class="info value">\r\n\t\t\t\t\t\t\t<div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.reply )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t<div class="text">aangevraagd</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t\t';
 } else if (paymentPlan.status === "approved") { ;
__p += '\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="success value">\r\n\t\t\t\t\t\t\t<div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.start )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t<div class="text">actief</div>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t';
 } else if (paymentPlan.status === "rejected") { ;
__p += '\r\n\r\n\t\t\t\t\t\t<div class="error value">\r\n\t\t\t\t\t\t\t<div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rejected )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t<div class="text">afgewezen</div>\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="description">Factuur</div>\r\n\r\n\t\t\t<div class="invoice-details myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.showInvoice )) == null ? '' : __t) +
'">\r\n\t\t\t\t\r\n\t\t\t\t<ul>\r\n\t\t\t\t\t<li><span class="key">No.</span><span class="value">' +
((__t = ( invoice.invoice_number )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t<li><span class="key">Datum</span><span class="value">' +
((__t = ( myAPP.templateHelpers.parseDate(invoice.date) )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t<li><span class="key">Bedrag</span><span class="value bold">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.total_inc_vat) )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\r\n\t\t\t';
 if (paymentPlan.status === "requested" || paymentPlan.status === "rejected") { ;
__p += '\r\n\r\n\t\t\t\t<div class="left" id="plan">\r\n\t\t\t\t<span class="description">Voorstel Debiteur</span>\r\n\t\t\t\t\t<div class="content">\r\n\t\t\t\t\t\t<span class="number">' +
((__t = ( paymentPlan.terms )) == null ? '' : __t) +
'</span> termijnen van <span class="number">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(paymentPlan.termAmount) )) == null ? '' : __t) +
'</span> </div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } else if (paymentPlan.status === "approved") { ;
__p += '\r\n\r\n\t\t\t\t<div class="left" id="plan">\r\n\t\t\t\t<span class="description">Betalingsregeling</span>\r\n\t\t\t\t\t<div class="content">\r\n\t\t\t\t\t\t<span class="number">' +
((__t = ( paymentPlan.terms )) == null ? '' : __t) +
'</span> termijnen van <span class="number">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(paymentPlan.termAmount) )) == null ? '' : __t) +
'</span> </div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\r\n\r\n\t\t\t<div style="clear: both"></div>\r\n\r\n\t</div>\r\n\t\r\n\t\r\n\t';
 if (paymentPlan.status === "requested") { ;
__p += '\r\n\r\n\t\t<div class="buttons">\r\n\t\t\t<div class="button myAPP-tooltip" id="accept" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.acceptPaymentPlan )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.approve )) == null ? '' : __t) +
'</span>Accepteren</div>\r\n\t\t\t<div class="button myAPP-tooltip" id="reject" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.rejectPaymentPlan )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.reject )) == null ? '' : __t) +
'</span>Afwijzen</div>\t\r\n\t\t</div>\r\n\r\n\t';
 } ;
__p += '\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/debtors/payment-plans-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="payment-plans-collection">\r\n\r\n\t<h2 class="description"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.paymentPlan )) == null ? '' : __t) +
'</span>Betalingsregelingen</h2>\r\n\r\n\t<div class="table-controls">\r\n\r\n\t\t<ul class="controls page-controls button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pageControls )) == null ? '' : __t) +
'">\r\n\t\t\t<li id="previous-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t<li><div class="animation-wrapper"><span id="current-page">' +
((__t = ( collection.currentPage + 1 )) == null ? '' : __t) +
'</span></div><span>/</span><span id="total-pages">' +
((__t = ( collection.totalPages )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t<li id="next-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t</ul>\r\n\r\n\r\n\t\t<div style="clear: both"></div>\r\n\r\n\t</div>\r\n\r\n\r\n\t<div class="list list-big">\r\n\t\t\t\r\n\t\t<div class="list-header">Betalingsregelingen</div>\r\n\t\t\t\t\t\r\n\t\t';
 if (collection.length > 0) { ;
__p += '\r\n\r\n\t\t\t';
 collection.each(function (paymentPlan) { paymentPlan = paymentPlan.getAttributes() ;
__p += '\r\n\r\n\t\t\t\t';
 var debtor = myAPP.debtors.get( paymentPlan.account_debtor_id ).getAttributes(); ;
__p += '\r\n\r\n\t\t\t\t<div class="list-item" id="' +
((__t = ( paymentPlan.id )) == null ? '' : __t) +
'"> \r\n\t\t\t\r\n\t\t\t\t\t<div>\r\n\t\t\t\t\t\t<div>\r\n\r\n\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.paymentPlan )) == null ? '' : __t) +
'</span>\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class="debtor">\r\n\r\n\t\t\t\t\t\t\t<span class="name">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</span>\r\n\r\n\t\t\t\t\t\t\t<span class="created">Aangevraagd: ' +
((__t = ( myAPP.templateHelpers.parseDate(paymentPlan.created) )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class="status">\r\n\r\n\t\t\t\t\t\t\t';
 if (paymentPlan.status === "requested") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<span class="label label-info">aangevraagd</span>\r\n\r\n\t\t\t\t\t\t\t';
 } else if (paymentPlan.status === "approved") { ;
__p += ' \r\n\r\n\t\t\t\t\t\t\t\t<span class="label label-success">goedgekeurd</span>\r\n\r\n\t\t\t\t\t\t\t';
 } else if (paymentPlan.status === "rejected") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<span class="label label-error">afgewezen</span>\r\n\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class="invoice-number">Factuur: ' +
((__t = ( paymentPlan.invoiceNumber )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t<div class="invoice-total">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(paymentPlan.invoiceTotal) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="plan">\r\n\t\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t<li><span class="description">Termijnen: </span><span class="amount">' +
((__t = ( paymentPlan.terms )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t\t<li><span class="description">Termijnbedrag: </span><span class="amount">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(paymentPlan.termAmount) )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 }); ;
__p += '\r\n\r\n\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t<div class="list-item placeholder">\r\n\t\t\t\t<h2>Geen regelingen</h2>\r\n\t\t\t</div>\r\n\r\n\t\t';
 } ;
__p += '\r\n\t\t\t\r\n\t</div>\r\n\r\n\t\r\n\t\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/debtors/payment-plans.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="payment-plans">\n\n\t<div class="payment-plans-collection-pane"></div>\t\n\n</div>\t';

}
return __p
};

this["JST"]["templates/dropdowns/accept-paymentplans.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="list" id="yesno">\n\n\t<div class="list-item" data-dropdown-value="yes"><span class="value">Accepteren</span></div>\n\t<div class="list-item" data-dropdown-value="no"><span class="value">Weigeren</span></div>\n\t\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/accounts.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="account">\n\n\t';
 myAPP.accounts.each( function (account) { ;
__p += ' \n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( account.get( "id" ) )) == null ? '' : __t) +
'">\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.account )) == null ? '' : __t) +
'</span><span class="value">' +
((__t = ( account.get( "title" ) )) == null ? '' : __t) +
'</span>\n\t\t</div>\n\t';
 }) ;
__p += '\n\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/article-group.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="article-group">\r\n\r\n\t';
 	
		var articleGroup = myAPP.articleGroups.at(parameter); 
		var articles = myAPP.articles.where({article_group_id: articleGroup.get("id")})
	;
__p += '\r\n\r\n\t';
 _.each(articles, function (article, index) { ;
__p += ' \r\n\t\t<div class="list-item article" data-dropdown-value="' +
((__t = ( article.get( "id" ) )) == null ? '' : __t) +
'">\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span><span class="value">' +
((__t = ( article.get("title") )) == null ? '' : __t) +
'</span>\r\n\t\t</div>\r\n\t';
 }) ;
__p += '\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/article-groups.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="article-groups">\n\n\t';
 myAPP.articleGroups.each(function (articleGroup) { ;
__p += ' \n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( articleGroup.get( "id" ) )) == null ? '' : __t) +
'">\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.articleGroup )) == null ? '' : __t) +
'</span><span class="value">' +
((__t = ( articleGroup.get("title") )) == null ? '' : __t) +
'</span>\n\t\t</div>\n\t';
 }) ;
__p += '\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/articles.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list has-submenus" id="articles">\n\n\t';
 var isEmpty = true; ;
__p += '\n\n\t';
 var collection = new Backbone.Collection(myAPP.articleGroups.models); ;
__p += '\n\n\t';
 if (collection.length > 0 ) isEmpty = false ;
__p += '\n\n\t';
 collection.each(function (articleGroup, index) { ;
__p += ' \n\n\t\t<div class="list-item show-submenu" data-dropdown-submenu="article-group" data-dropdown-submenu-parameter="' +
((__t = ( index )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.articleGroup )) == null ? '' : __t) +
'</span>' +
((__t = ( articleGroup.get("title") )) == null ? '' : __t) +
'<span class="caret caret-right"></span></div>\n\t';
 }) ;
__p += '\n\n\t';
 var collection = new Backbone.Collection(myAPP.articles.filter(function (article) { return Number(article.get("article_group_id")) === 0})) ;
__p += '\n\n\t';
 if (collection.length > 0 ) isEmpty = false ;
__p += '\n\n\t';
 collection.each(function (article) { ;
__p += '\n\n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( article.get("id") )) == null ? '' : __t) +
'"><span class="entype">\n\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span><span class="value">' +
((__t = ( article.get("title") )) == null ? '' : __t) +
'</span>\n\t\t</div>\n\n\t';
 }) ;
__p += ' \n\n\t';
 if (isEmpty) {  ;
__p += '\n\t\t<div class="placeholder">\n\t\t\t<h2>Geen artikelen</h2>\n\t\t\t<p>Klik om een artikel aan te maken</p>\n\t\t</div>\n\t';
 } ;
__p += '\n\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/autocomplete.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list">\r\n\r\n\t';
 if (matches) { ;
__p += '\r\n\r\n\t\t';
 _.each(matches, function (match) {  ;
__p += '\t\t\r\n\t\t\t<div class="list-item';
 if (!match.id) print(" selected") ;
__p += '" data-autocomplete-value="' +
((__t = ( match.id )) == null ? '' : __t) +
'">' +
((__t = ( match.html )) == null ? '' : __t) +
'</div>\r\n\t\t';
 }); ;
__p += '\r\n\t\r\n\t';
 } else { ;
__p += '\r\n\r\n\t\t<div class="list-item placeholder"><h3>Geen resultaten gevonden</h3></div>\r\n\t\r\n\t';
 } ;
__p += '\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/countries.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="countries">\n\n\t';
 var countries = _.pluck(myAPP.constants.countries, "country"); ;
__p += '\n\n\t';
 for (var i = 0 ; i < countries.length; i++) { ;
__p += ' \n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( countries[i] )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( countries[i] )) == null ? '' : __t) +
'</span></div>\n\t';
 } ;
__p += '\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/debtor-actions.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="list">\r\n\t<div class="list-item myAPP-tooltip" \r\n\t\tid="pause" \r\n\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.debtorNewInvoice )) == null ? '' : __t) +
'" \r\n\t\tdata-dropdown-value="newInvoice">\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.newInvoice )) == null ? '' : __t) +
'</span>Nieuwe factuur\r\n\t</div> \r\n\r\n\t<div class="list-item myAPP-tooltip" \r\n\t\tid="pause" \r\n\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.deleteDebtor )) == null ? '' : __t) +
'" \r\n\t\tdata-dropdown-value="delete">\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.ddelete )) == null ? '' : __t) +
'</span>Debiteur verwijderen\r\n\t</div> \r\n\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/dropdowns/debtor-settings.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="list">\r\n\r\n\t<div class="list-item myAPP-tooltip" \t\t\r\n\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.debtorDetails )) == null ? '' : __t) +
'" \r\n\t\tdata-dropdown-value="debtorInfo">\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.address )) == null ? '' : __t) +
'</span>Gegevens\r\n\t</div> \r\n\r\n\t<!-- <div class="list-item myAPP-tooltip" \t\t\r\n\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.debtorSettings )) == null ? '' : __t) +
'" \r\n\t\tdata-dropdown-value="settings">\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.company )) == null ? '' : __t) +
'</span>Voorkeursinstellingen\r\n\t</div> -->\r\n\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/dropdowns/delivery-methods.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="delivery-methods">\n\n\t';
 for (var i = 0 ; i < myAPP.constants.deliveryMethods.length; i++) { ;
__p += ' \n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( myAPP.constants.deliveryMethods[i] )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.constants.deliveryMethods[i] )) == null ? '' : __t) +
'</span></div>\n\t';
 } ;
__p += '\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/invoice-actions.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list">\r\n';
 if (dropdownObject.get("canPauseInvoice")) { ;
__p += '\r\n\r\n\t<div class="list-item myAPP-tooltip" id="pause" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pauseInvoice )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="pause"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.pause )) == null ? '' : __t) +
'</span>Pauzeren</div> \r\n\r\n';
 } else if (dropdownObject.get("canUnpauseInvoice"))  { ;
__p += '\r\n\r\n\t<div class="list-item myAPP-tooltip" id="unpause" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.unpauseInvoice )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="unpause"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.start )) == null ? '' : __t) +
'</span>Herstarten</div> \r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canArchiveInvoice")) { ;
__p += ' \r\n\r\n\t<div class="list-item myAPP-tooltip" id="book-payment" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.archive )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="archive"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.archive )) == null ? '' : __t) +
'</span>Archiveren</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canSendCreditInvoice")) { ;
__p += '\r\n\t\r\n\t<div class="list-item myAPP-tooltip" id="credit-invoice" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.creditInvoice )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="creditInvoice"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>Creditfactuur</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canResendInvoice")) { ;
__p += '\r\n\r\n\t<div class="list-item myAPP-tooltip" id="resend" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.resend )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="resend"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.resend )) == null ? '' : __t) +
'</span>Opnieuw verzenden</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canStartCycle")) { ;
__p += '\r\n\r\n\t<div class="list-item myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.startCycle )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="startCycle"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.reminder )) == null ? '' : __t) +
'</span>Start invordering</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canSendReminder")) { ;
__p += '\r\n\r\n\t<div class="list-item myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sendReminder )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="sendReminder"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.reminder )) == null ? '' : __t) +
'</span>Herinnering versturen</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canSendSummation")) { ;
__p += '\r\n\r\n\t<div class="list-item myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sendSummation )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="sendSummation"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.summation )) == null ? '' : __t) +
'</span>Aanmaning versturen</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canBookPayment")) { ;
__p += ' \r\n\r\n\t<div class="list-item myAPP-tooltip" id="book-payment" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.bookPayment )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="bookPayment"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>Boek betaling</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canRedeemInvoice")) { ;
__p += ' \r\n\r\n\t<div class="list-item myAPP-tooltip" id="book-payment" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.redeem )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="redeem"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.redeemed )) == null ? '' : __t) +
'</span>Kwijtschelden</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canChangeDeliveryMethod")) { ;
__p += ' \r\n\r\n\t<div class="list-item myAPP-tooltip" id="book-payment" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.changeDeliveryMethod )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="changeDeliveryMethod"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.address )) == null ? '' : __t) +
'</span>Wijzig verzendmethode</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canSendInvoiceFromQuote")) { ;
__p += ' \r\n\r\n\t<div class="list-item myAPP-tooltip" id="book-payment" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.createInvoiceFromQuote )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="createInvoice"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>Factuur maken</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if (dropdownObject.get("canDeleteInvoice")) { ;
__p += ' \r\n\r\n\t<div class="list-item myAPP-tooltip" \r\n\t\tid="delete" \r\n\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.deleteInvoice )) == null ? '' : __t) +
'" \r\n\t\tdata-dropdown-value="delete">\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.ddelete )) == null ? '' : __t) +
'</span>Factuur verwijderen</div>\r\n\r\n';
 } ;
__p += '\r\n\r\n\r\n</div>\r\n\r\n\r\n';

}
return __p
};

this["JST"]["templates/dropdowns/invoice-cc_emails.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="list" id="invoice_cc_emails">\r\n\r\n\t<div class="list-item" data-dropdown-value="yes"><span class="value">Ja</span></div>\r\n\t<div class="list-item" data-dropdown-value="no"><span class="value">Nee</span></div>\r\n\t\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/invoice-invoice_id_continuous.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="list" id="invoice_id_continuous">\r\n\r\n\t<div class="list-item" data-dropdown-value="yes"><span class="value">Ja</span></div>\r\n\t<div class="list-item" data-dropdown-value="no"><span class="value">Nee</span></div>\r\n\t\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/invoice-pdfs.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list">\r\n\r\n\t<div class="list-item myAPP-tooltip" id="showOriginal" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.originalInvoicePdf )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="showOriginal"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>Factuur</div> \r\n\r\n';
 if ( dropdownObject.get("status") === "reminder" || dropdownObject.get("status") === "summation" ) { ;
__p += '\r\n\r\n\t<div class="list-item myAPP-tooltip" id="showReminder" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.reminderPdf )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="showReminder"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.reminder )) == null ? '' : __t) +
'</span>Herinnering</div> \r\n\r\n';
 } ;
__p += '\r\n\r\n';
 if ( dropdownObject.get("status") === "summation" ) { ;
__p += '\r\n\r\n\t<div class="list-item myAPP-tooltip" id="showSummation" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.summationPdf )) == null ? '' : __t) +
'"\r\n\t\tdata-dropdown-value="showSummation"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.summation )) == null ? '' : __t) +
'</span>Aanmaning</div> \r\n\r\n';
 } ;
__p += '\r\n\r\n\r\n</div>\r\n\r\n\r\n';

}
return __p
};

this["JST"]["templates/dropdowns/invoice-period.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- <div class="list" id="invoice-types">\n\t<div class="list-item" data-dropdown-value="dagen"><span class="value">dagen</span></div>\t\n\t<div class="list-item" data-dropdown-value="weken"><span class="value">weken</span></div>\n\t<div class="list-item" data-dropdown-value="maanden"><span class="value">maanden</span></div>\n\t<div class="list-item" data-dropdown-value="kwartaal"><span class="value">kwartaal</span></div>\n\t<div class="list-item" data-dropdown-value="jaarlijks"><span class="value">jaarlijks</span></div>\n</div> -->';

}
return __p
};

this["JST"]["templates/dropdowns/invoice-periodical-periods.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="invoice-periodical-periods">\n\n\t';
 for (var i = 0 ; i < myAPP.constants.invoicePeriodicalPeriods.length; i++) { ;
__p += ' \n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( myAPP.constants.invoicePeriodicalPeriods[i] )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.constants.invoicePeriodicalPeriods[i] )) == null ? '' : __t) +
'</span></div>\n\t';
 } ;
__p += '\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/invoice-status.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="list" id="invoice-status">\r\n\t<div class="list-item" data-dropdown-value=""><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span><span class="value">Normaal</span></div>\t\r\n\t<div class="list-item" data-dropdown-value="reminder"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.hourglass )) == null ? '' : __t) +
'</span><span class="value">Herinnering</span></div>\r\n\t\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/invoice-templates.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="invoice-templates">\r\n\r\n\t<div class="list-item" data-dropdown-value="0">\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.template )) == null ? '' : __t) +
'</span><span class="value">Standaard KasCo</span>\r\n\t</div>\r\n\r\n\t';
 myAPP.templates.each(function (template) { ;
__p += ' \r\n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( template.get( "id" ) )) == null ? '' : __t) +
'">\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.template )) == null ? '' : __t) +
'</span><span class="value">' +
((__t = ( template.get("title") )) == null ? '' : __t) +
'</span>\r\n\t\t</div>\r\n\t';
 }) ;
__p += '\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/invoice-types.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="invoice-types">\r\n\r\n\t<div class="list-item" data-dropdown-value="invoice"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span><span class="value">Normaal</span></div>\t\r\n\t<!-- <div class="list-item" data-dropdown-value="periodical"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.periodical )) == null ? '' : __t) +
'</span><span class="value">Periodiek</span></div> -->\r\n\t<div class="list-item" data-dropdown-value="quote"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.quote )) == null ? '' : __t) +
'</span><span class="value">Offerte</span></div>\r\n\r\n\t';
 if (myAPP.accountSettings.get("canStartFromReminder")) { ;
__p += '\r\n\r\n\t\t<div class="list-item" data-dropdown-value="reminder"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.reminder )) == null ? '' : __t) +
'</span><span class="value">Herinnering</span></div>\r\n\t\r\n\t';
 } ;
__p += '\r\n\r\n\t';
 if (myAPP.accountSettings.get("canSendNoAutocycle")) { ;
__p += '\r\n\r\n\t\t<div class="list-item" data-dropdown-value="noautocycle"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span><span class="value">Autom. incasso</span></div>\r\n\t\r\n\t';
 } ;
__p += '\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/kasco-payment.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="list" id="kasco-payment">\r\n\r\n\t<div class="list-item" data-dropdown-value="yes"><span class="value">Via KasCo</span></div>\r\n\t<div class="list-item" data-dropdown-value="no"><span class="value">Via uzelf</span></div>\r\n\t\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/payment-methods.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="payment-methods">\r\n\r\n\t';
 for (var i = 0 ; i < myAPP.constants.paymentMethods.length; i++) { ;
__p += ' \r\n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( myAPP.constants.paymentMethods[i] )) == null ? '' : __t) +
'">\r\n\t\t\t<span class="value">' +
((__t = ( myAPP.constants.paymentMethods[i] )) == null ? '' : __t) +
'</span>\r\n\t\t</div>\r\n\t';
 } ;
__p += '\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/payment-terms.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="payment-terms">\n\n\t';
 for (var i = 0 ; i < myAPP.constants.paymentTerms.length; i++) { ;
__p += ' \n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( myAPP.constants.paymentTerms[i] )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.constants.paymentTerms[i] )) == null ? '' : __t) +
' dagen</span></div>\n\t';
 } ;
__p += '\n\n\t<div class="list-item" data-dropdown-value="other"><span class="value">anders...</span></div>\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/payment-types.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="payment-types">\r\n\t';
 for (var i = 0 ; i < myAPP.constants.paymentTypes.length; i++) { ;
__p += ' \r\n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( myAPP.constants.paymentTypes[i] )) == null ? '' : __t) +
'">\r\n\t\t\t<span class="value">' +
((__t = ( myAPP.texts.paymentTypes[ myAPP.constants.paymentTypes[i] ] )) == null ? '' : __t) +
'</span>\r\n\t\t</div>\r\n\t';
 } ;
__p += '\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/quote-terms.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="quote-terms">\r\n\r\n\t';
 for (var i = 0 ; i < myAPP.constants.quoteTerms.length; i++) { ;
__p += ' \r\n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( myAPP.constants.quoteTerms[i] )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.constants.quoteTerms[i] )) == null ? '' : __t) +
' dagen</span></div>\r\n\t';
 } ;
__p += '\r\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/time-period.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- <div class="list" id="time-periods">\n\n\t';
 for (var i = 0 ; i < myAPP.constants.timePeriods.length; i++) { ;
__p += ' \n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( myAPP.constants.timePeriods[i] )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.constants.timePeriods[i] )) == null ? '' : __t) +
'</span></div>\n\t';
 } ;
__p += '\n</div> -->';

}
return __p
};

this["JST"]["templates/dropdowns/time-periods-months.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- <div class="list" id="time-periods-months">\n\n\t';
 for (var i = 0 ; i < myAPP.constants.months.length; i++) { ;
__p += ' \n\t\t<div class="list-item" id="' +
((__t = ( myAPP.constants.months[i] )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.constants.months[i] )) == null ? '' : __t) +
'</span></div>\n\t';
 } ;
__p += '\n</div> -->';

}
return __p
};

this["JST"]["templates/dropdowns/time-periods-quarters.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- <div class="list" id="time-periods-quarters">\n\n\t';
 for (var i = 0 ; i < myAPP.constants.quarters.length; i++) { ;
__p += ' \n\t\t<div class="list-item" id="' +
((__t = ( myAPP.constants.quarters[i] )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.constants.quarters[i] )) == null ? '' : __t) +
'</span></div>\n\t';
 } ;
__p += '\n</div> -->';

}
return __p
};

this["JST"]["templates/dropdowns/time-periods-years.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- <div class="list" id="time-periods-years">\n\n\t';
 for (var i = 0 ; i < myAPP.constants.years.length; i++) { ;
__p += ' \n\t\t<div class="list-item" id="' +
((__t = ( myAPP.constants.years[i] )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.constants.years[i] )) == null ? '' : __t) +
'</span></div>\n\t';
 } ;
__p += '\n</div> -->';

}
return __p
};

this["JST"]["templates/dropdowns/user-roles.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="list" id="user-roles">\n\t<div class="list-item" data-dropdown-value="admin"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.admin )) == null ? '' : __t) +
'</span><span class="value">admin</span></div>\n\t<div class="list-item" data-dropdown-value="employee"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.employee )) == null ? '' : __t) +
'</span><span class="value">employee</span></div>\n\t<div class="list-item" data-dropdown-value="viewer"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.viewer )) == null ? '' : __t) +
'</span><span class="value">viewer</span></div>\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/vat.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="list" id="vat">\n\n\t';
 for (var i = 0 ; i < myAPP.constants.vats.length; i++) { ;
__p += ' \n\t\t<div class="list-item" data-dropdown-value="' +
((__t = ( myAPP.constants.vats[i] )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.constants.vats[i] )) == null ? '' : __t) +
'</span></div>\n\t';
 } ;
__p += '\n\t\n</div>';

}
return __p
};

this["JST"]["templates/dropdowns/vat_liable.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="list" id="vat_liable">\n\n\t<div class="list-item" data-dropdown-value="yes"><span class="value">ja</span></div>\n\t<div class="list-item" data-dropdown-value="no"><span class="value">nee</span></div>\n\t\n</div>';

}
return __p
};

this["JST"]["templates/invoices/credit-invoice.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="buttons">\n\n\t';
 if (myAPP.currentUser.get("account")[0].role === "admin") { ;
__p += '\n\t\n\t\t<div class="button button-disabled myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sendInvoice )) == null ? '' : __t) +
'" id="approve"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.sent )) == null ? '' : __t) +
'</span>Versturen</div>\n\t';
 } ;
__p += '\n\t\n\t<div class="button button-disabled myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.saveInvoice )) == null ? '' : __t) +
'" id="save"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\n\t<div class="button myAPP-tooltip" id="preview" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.viewInvoice )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.preview )) == null ? '' : __t) +
'</span>Voorbeeld</div>\n\n\t';
 if (!invoice.isNew) { ;
__p += '\n\t<div class="button myAPP-tooltip" id="delete" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.deletInvoice )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.ddelete )) == null ? '' : __t) +
'</span>Verwijderen</div>\n\n\t';
 } ;
__p += '\n\n</div>\n\n<div class="new-invoice">\n\n\t<div class="invoice-content">\n\n\t\t<div class="animation-wrapper">\n\n\t\t\t<div class="invoice-header">\n\t\t\t\t\n\t\t\t\t<div class="item" id="invoice-number">\n\t\t\t\t\t<div class="description">Factuurnr.</div>\n\t\t\t\t\t<div class="value"> ' +
((__t = ( invoice.invoice_number || "" )) == null ? '' : __t) +
'</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="item" id="account_debtor_id">\n\t\t\t\t\t<div class="description">Debiteur</div>\n\t\t\t\t\t<!-- <div class="value"></div> -->\n\t\t\t\t\t<input type="text" class="myAPP-autocomplete" data-autocomplete="debtors" data-autocomplete-template="debtors-autocomplete" ';
 if (debtor)  { ;
__p += ' value="' +
((__t = ( debtor.name )) == null ? '' : __t) +
'" ';
 } ;
__p += '>\n\t\t\t\t\t<div class="placeholder"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.search )) == null ? '' : __t) +
'</div>zoek een debiteur</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="item ' +
((__t = ( invoice.status )) == null ? '' : __t) +
'" id="status">\n\t\t\t\t\t<div class="description">Status</div>\n\n\t\t\t\t\t\t<div class="value"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.edit )) == null ? '' : __t) +
'</span><div class="text">Concept</div></div>\n\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class="boxes">\n\n\t\t\t\t<div class="box">\n\n\t\t\t\t\t<h4 class="title"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>Factuur</h4>\n\n\t\t\t\t\t<div class="list list-nostyle" id="invoice-details">\n\n\t\t\t\t\t\t<div class="list-item">\n\t\t\t\t\t\t\t<label class="key">Type factuur</label>\n\t\t\t\t\t\t\t<div class="button button-small myAPP-tooltip myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="invoice-types" id="type" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.setInvoiceType )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( invoice.type || "Normaal" )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span> </div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="list-item" id="date">\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<label class="key">Factuurdatum</label>\n\t\t\t\t\t\t\t<div class="value"><input type="text" id="date-picker"></div>\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\n\n\t\t\t\t\t\t<div class="list-item" id="delivery_method">\n\t\t\t\t\t\t\t<label class="key">Verzendmethode</label>\n\t\t\t\t\t\t\t<div class="button button-small myAPP-tooltip myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="delivery-methods" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.deliveryMethod )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( invoice.delivery_method )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span> </div>\n\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\n\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\n\t\t\t\t<div class="box box-right">\n\n\t\t\t\t<h4 class="title"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</span>Debiteur</h4>\n\t\t\t\n\t\t\t\t<div class="list" id="debtor-details">\n\n\t\t\t\t\t<!-- <div class="list-title">debiteurgegevens</div>\t -->\n\n\t\t\t\t\t';
 	if (debtor) { ;
__p += '\n\n\t\t\t\t\t\t';
 _.each(_.pick(debtor, ['name', 'address', 'debtors_email', 'city', 'country']), function (value, key) {  ;
__p += '\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t';
 });  ;
__p += '\n\n\t\t\t\t\t';
 } else { ;
__p += '\n\n\t\t\t\t\t\t<div class="list-item placeholder">\n\t\t\t\t\t\t\t<h4>Klik om nieuwe debiteur toe te voegen</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\n\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t</div>\t\n\t\t\t\n\t\t\t<div style="clear: both"></div>\n\n\t\t\t<div class="invoice-lines" id="total_invoiceLines"></div>\n\n\t\t\t<div class="totals">\n\t\t\t\t<h3 class="total_vat total">Totaal BTW: <span id="total_vat">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(invoice.total_vat) )) == null ? '' : __t) +
'<span> </h3>\n\t\t\t\t<h2 class="total_inc_vat total" class="header">Totaal : <span id="total_inc_vat">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(invoice.total_inc_vat) )) == null ? '' : __t) +
'</span></h2>\n\t\t\t</div>\n\n\t\t\t<div style="clear: both"></div>\n\n\t\t</div>\n\n\t</div>\n\n</div>\n\n';

}
return __p
};

this["JST"]["templates/invoices/edit-invoice.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\r\n<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.newInvoice )) == null ? '' : __t) +
'</div>Concept</h2>\r\n\r\n<div class="buttons head">\r\n\r\n\t';
 if (userRole === "admin" || userRole === "superadmin" || userRole === "guestUser") { ;
__p += '\t\r\n\t\t<div class="button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sendInvoice )) == null ? '' : __t) +
'" id="send"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.send )) == null ? '' : __t) +
'</span>Versturen</div>\r\n\t';
 } ;
__p += '\r\n\t\r\n\t<div class="button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.saveInvoice )) == null ? '' : __t) +
'" id="save"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\t<div class="button myAPP-tooltip" id="show-pdf" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.viewInvoicePDF )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.pdf )) == null ? '' : __t) +
'</span>Bekijk</div>\r\n\t\r\n\t';
 if (invoice.id) { ;
__p += '\t\r\n\t\t<div class="button myAPP-tooltip" id="delete" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.deleteInvoice )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.ddelete )) == null ? '' : __t) +
'</span></div>\r\n\t';
 } ;
__p += '\r\n\r\n</div>\r\n\r\n<div style="clear: both"></div>\r\n\r\n<div class="new-invoice">\r\n\r\n\t<div class="invoice-content">\r\n\r\n\t\t<div class="animation-wrapper">\r\n\r\n\t\t\t\t<div class="invoice-header">\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="item" id="invoice-number">\r\n\t\t\t\t\t\t<div class="description">Factuurnummer</div>\r\n\t\t\t\t\t\t<div class="value myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.invoiceNumberUndetermined )) == null ? '' : __t) +
'">Nader bepaald</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="item" id="account_debtor_id">\r\n\t\t\t\t\t\t<div class="description">Debiteur</div>\r\n\t\t\t\t\t\t<!-- <div class="value"></div> -->\r\n\t\t\t\t\t\t<input class="myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.searchDebtor )) == null ? '' : __t) +
'" type="text" ';
 if (debtor)  { ;
__p += ' value="' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'" ';
 } ;
__p += '>\r\n\t\t\t\t\t\t<div class="placeholder myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.searchDebtor )) == null ? '' : __t) +
'"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.search )) == null ? '' : __t) +
'</div>zoek een bestaande debiteur</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="item ' +
((__t = ( invoice.status )) == null ? '' : __t) +
'" id="status">\r\n\t\t\t\t\t\t<div class="description">Status</div>\r\n\t\t\t\t\t\t<div class="value"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.edit )) == null ? '' : __t) +
'</span><div class="text">Concept</div></div>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="boxes">\r\n\r\n\t\t\t\t\t<div class="box">\r\n\r\n\t\t\t\t\t\t<!--<div class="list list-nostyle nomargin">\r\n\t\t\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>Factuur</div>\r\n\t\t\t\t\t\t</div> -->\r\n\r\n\t\t\t\t\t\t<div class="list list-nostyle" id="invoice-details">\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="_invoice_type">\r\n\t\t\t\t\t\t\t\t<label class="key">Type factuur</label>\r\n\t\t\t\t\t\t\t\t<div class="button button-small myAPP-tooltip myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="invoice-types" id="type" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.setInvoiceType )) == null ? '' : __t) +
'"><span class="value">\r\n\r\n\t\t\t\t\t\t\t\t\t';
 if (invoice.type === "quote") { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( "Offerte" )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t\t\t\t';
 } else if (invoice.type === "reminder") { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( "Herinnering" )) == null ? '' : __t) +
' \r\n\t\t\t\t\t\t\t\t\t';
 } else { ;
__p += ' \r\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( "Normaal" )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t</span><span class="caret caret-small caret-down"></span> </div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="date">\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<label class="key">Factuurdatum</label>\r\n\t\t\t\t\t\t\t\t<div class="value"><input type="text" id="date-picker"></div>\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t';
 if (hasMultipleTemplates) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<div class="list-item" id="_invoice_template_id">\r\n\t\t\t\t\t\t\t\t\t<label class="key">Template</label>\r\n\t\t\t\t\t\t\t\t\t<div class="button button-small myAPP-tooltip myAPP-dropdown myAPP-dropdown-autoupdate" \r\n\t\t\t\t\t\t\t\t\t\tdata-dropdown="invoice-templates" \r\n\t\t\t\t\t\t\t\t\t\tid="invoice_template_id" \r\n\t\t\t\t\t\t\t\t\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.invoiceTemplate )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t\t<span class="value">\r\n\t\t\t\t\t\t\t\t\t\t\t';
 template = myAPP.templates.get(invoice.invoice_template_id); ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t\t' +
((__t = ( (template && template.get("title")) || "Standaard KasCo" )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t\t\t\t\t</span><span class="caret caret-small caret-down"></span> \r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="payment_term">\r\n\t\t\t\t\t\t\t\t<label class="key">Betaaltermijn</label>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<div class="button button-small myAPP-tooltip myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="payment-terms" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.paymentTerm )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t\t<span class="value">\r\n\t\t\t\t\t\t\t\t\t\t\t' +
((__t = ( invoice.payment_term )) == null ? '' : __t) +
' dagen\r\n\t\t\t\t\t\t\t\t\t\t</span><span class="caret caret-small caret-down"></span> \r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class="manual">\r\n\t\t\t\t\t\t\t\t\t<input type="text" id="paymentTerm">\r\n\t\t\t\t\t\t\t\t\t<span class="description">dagen</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="delivery_method">\r\n\t\t\t\t\t\t\t\t<label class="key">Verzendmethode</label>\r\n\t\t\t\t\t\t\t\t<div class="button button-small myAPP-tooltip myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="delivery-methods" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.deliveryMethod )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.texts.values.delivery_method[invoice.delivery_method] )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span> </div>\r\n\r\n\t\t\t\t\t\t\t</div>\t\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="reference">\r\n\t\t\t\t\t\t\t\t<label class="key">Referentie</label>\r\n\t\t\t\t\t\t\t\t<input type="text" name="reference" value="' +
((__t = ( invoice.reference || "" )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t';
 if (canStartFromReminder) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t<div class="list-item" id="invoice_number">\r\n\t\t\t\t\t\t\t\t\t<label class="key">Oorspr. factuurnr.</label>\r\n\t\t\t\t\t\t\t\t\t<input class="myAPP-tooltip" \r\n\t\t\t\t\t\t\t\t\t\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.originalInvoiceNumber )) == null ? '' : __t) +
'"\r\n\t\t\t\t\t\t\t\t\t\t\ttype="text" \r\n\t\t\t\t\t\t\t\t\t\t\tname="invoice_number" \r\n\t\t\t\t\t\t\t\t\t\t\tvalue="' +
((__t = ( invoice.invoice_number || "" )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t\r\n\r\n\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="period">\r\n\t\t\t\t\t\t\t\t<label class="key">Periode</label>\r\n\t\t\t\t\t\t\t\t<input class="period-length" id="periodLength" value="1">\r\n\t\t\t\t\t\t\t\t<div class="button button-small myAPP-tooltip myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="invoice-periodical-periods"  data-tooltip="' +
((__t = ( myAPP.texts.tooltips.invoicePeriod )) == null ? '' : __t) +
'" id="periodType"><span class="value">kies periode</span><span class="caret caret-small caret-down"></span></div>\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="box box-right">\r\n\r\n\t\t\t\t\t\t<!-- <div class="list list-nostyle nomargin">\r\n\t\t\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</span>Debiteur</div>\r\n\t\t\t\t\t\t</div> -->\r\n\r\n\t\t\t\t\t\t<div class="buttons">\r\n\t\t\t\t\t\t\t<div class="button button-small button-disabled myAPP-tooltip" id="remove-debtor" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.removeDebtorFromInvoice )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.cancel )) == null ? '' : __t) +
'</span></div>\r\n\t\t\t\t\t\t\t<div class="button button-small button-disabled myAPP-tooltip" id="vat-to-debtor" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.transferVatToDebtor )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.swapVat )) == null ? '' : __t) +
'</span>Verleg btw</div>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t\t\t\t\t<div class="list list-nostyle" id="debtor-details">\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t';
 	if (debtor) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t';
 _.each(_.pick(debtor, ['email', 'address', 'zipcode',  'city', 'country']), function (value, key) {  ;
__p += '\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t';
 });  ;
__p += '\r\n\r\n\t\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<div class="list-item placeholder  myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.clickToCreateDebtor )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t<div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.addUser )) == null ? '' : __t) +
'</div><h4>Nieuwe debiteur maken</h4>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t</div>\t\r\n\t\t\t\r\n\t\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t\t\t<div class="invoice-lines" id="total_invoiceLines"></div>\r\n\r\n\t\t\t\t<div class="caption">\t\t\t\t\t\r\n\t\t\t\t\t<div class="description">Bijschrift</div>\t\t\t\t\t\r\n\r\n\t\t\t\t\t<textarea cols="50" rows="4" placeholder="Voer een bijschrift in">' +
((__t = ( invoice.content && invoice.content.replace(/<br\/>/g, '\n') )) == null ? '' : __t) +
'</textarea>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="right-column">\r\n\t\r\n\t\t\t\t\t<div class="totals">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t';
 if (vatLiable === "ja") {  ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="sub-total">\r\n\t\t\t\t\t\t\t\t<span class="text">Totaal excl. btw ' +
((__t = ( vat )) == null ? '' : __t) +
'</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_exc_vat ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t                    \r\n\t\t                    ';
 for (var vat in invoice.vatTotals) { ;
__p += '                    \r\n\t\t                    \t<div class="sub-total">\r\n\t\t                    \t\t<span class="text">Btw ' +
((__t = ( vat )) == null ? '' : __t) +
'</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.vatTotals[vat] ) )) == null ? '' : __t) +
'</span>\r\n\t\t                    \t</div>\r\n\t\t                    ';
 } ;
__p += '\r\n\r\n\t\t                    <div class="sub-total total" id="total_inc_vat">\r\n\t\t                    \t<span class="text">Totaal incl. btw</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span>\r\n\t\t                    </div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t<div class="sub-total" id="due"><span class="text">Totaal</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span></div>\t\t\t\t\r\n\r\n\t\t\t\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="button button-big button-blue button-disabled myAPP-tooltip" id="send" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.addDebtorBeforeSend )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.send )) == null ? '' : __t) +
'</span><span class="text">Factuur versturen</span></div>\t\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/invoices/invoice-line.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var dropdowns = ['vat']; ;
__p += '\r\n';
 var editables =['article_number', 'amount', 'title', 'description', 'price']; ;
__p += '\r\n\r\n<div class="table-row" id="' +
((__t = ( invoiceLine.cid )) == null ? '' : __t) +
'">\r\n\r\n\t';
 _.each(_.pick(invoiceLine.getAttributes(), ['article_number', 'title', 'description', 'amount', 'price', 'vat']), function (value, key) { ;
__p += '\t\r\n\r\n\t\t\t';
 if (key === "price") {
				
				value = myAPP.constants.currencyMarker + " " +  myAPP.templateHelpers.parseNumber(value);
				
			} ;
__p += '\r\n\r\n\t\t\t';
 if (editable && _.indexOf(editables, key) !== -1)  { ;
__p += '\r\n\r\n\t\t\t\t<input class="table-cell" id="' +
((__t = ( key )) == null ? '' : __t) +
'" type="text" value="' +
((__t = ( value )) == null ? '' : __t) +
'" placeholder="' +
((__t = ( myAPP.texts.placeholders.invoiceLine[key] )) == null ? '' : __t) +
'">\t\t\t\t\r\n\t\t\t\r\n\t\t\t';
 } else if (key === "vat") { ;
__p += '\r\n\r\n\t\t\t\t';
 if (account.get("vat_liable") === "nee") return ;
__p += '\r\n\t\t\r\n\t\t\t\t';
 if (editable) { ;
__p += '\r\n\r\n\t\t\t\t\t<div id="' +
((__t = ( key )) == null ? '' : __t) +
'" class="table-cell myAPP-dropdown" data-dropdown="vat">\r\n\t\t\t\t\t\t<div class="content-wrapper">' +
((__t = ( value )) == null ? '' : __t) +
'</div><div class="entype caret caret-small caret-down">' +
((__t = ( myAPP.templateHelpers.charCodes.arrowDown )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t</div>\t\r\n\r\n\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t<div id="' +
((__t = ( key )) == null ? '' : __t) +
'" class="table-cell">\r\n\t\t\t\t\t\t<input class="table-cell" id="' +
((__t = ( key )) == null ? '' : __t) +
'" type="text" value="' +
((__t = ( value )) == null ? '' : __t) +
'" readonly>\r\n\t\t\t\t\t</div>\r\n\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t';
 } else { ;
__p += ' \r\n\r\n\t\t\t\t<div id="' +
((__t = ( key )) == null ? '' : __t) +
'" class="table-cell">\r\n\t\t\t\t\t<div class="content-wrapper">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } ;
__p += '\t\t\t\t\t\r\n\t\t\r\n\t\t';
 }) ;
__p += '\t\t\r\n\r\n\t\t';
 var total = account.get("vat_liable") === "ja" ? invoiceLine.get( "total" ) : invoiceLine.get( "total_exc_vat" ); ;
__p += '\r\n\r\n\t\t\r\n\t\t\t<input class="table-cell" id="total" readonly value="' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoiceLine.get( "total" ) ) )) == null ? '' : __t) +
'">\r\n\t\t\r\n\r\n\t\t';
 if (editable) { ;
__p += ' \r\n\r\n\t\t\t<div class="table-cell delete-button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.deleteInvoiceLine )) == null ? '' : __t) +
'"><div class="content-wrapper"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.ddelete )) == null ? '' : __t) +
'</div></div></div>\r\n\r\n\t\t';
 } ;
__p += '\r\n\r\n</div>\t';

}
return __p
};

this["JST"]["templates/invoices/invoice-lines.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div>\r\n\r\n\t\t<!-- <div class="list list-nostyle nomargin">\r\n\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoiceLines )) == null ? '' : __t) +
'</span>Factuurregels</div>\r\n\t\t</div> -->\r\n\r\n\t\t<!--  CONTROLS -->\r\n\r\n\t\t';
 if (editable) { ;
__p += '\r\n\r\n\t\t\t<div class="buttons">\r\n\t\t\t\t<div id="add-invoice-line" class="button button-small myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.addLine )) == null ? '' : __t) +
'"><span class="text"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.edit )) == null ? '' : __t) +
'</span>Regel toevoegen</span></div>\r\n\t\t\t\t<div id="add-article" class="button button-small myAPP-tooltip myAPP-dropdown" data-dropdown="articles" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.addProduct )) == null ? '' : __t) +
'">\t\t\t\t\r\n\t\t\t\t\t<!-- <span class="entype">&#x229e;</span> --><span class="text"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span>Artikel toevoegen</span>\r\n\t\t\t\t\t<span class="caret caret-small caret-down"></span>\t\t\r\n\t\t\t\t</div>\t\t\r\n\t\t\t</div>\t\t\t\r\n\r\n\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t';
 } ;
__p += '\r\n\r\n\t\t<!--  INVOICE LINES -->\r\n\r\n\t\t<div class="table" id="invoice-lines">\r\n\r\n\t\t\t<!-- table header -->\r\n\r\n\t\t\t<div class="table-header table-row">\r\n\r\n\t\t\t\t';
 _.each(['article_number', 'title', 'description', 'amount', 'price', 'vat', 'total'], function (key, index) { ;
__p += '\r\n\t\t\t\t\t\r\n\t\t\t\t\t';
 if (account.get("vat_liable") === "nee" && key === "vat") return; ;
__p += '\r\n\r\n\t\t\t\t\t<div class="table-cell" id="' +
((__t = ( key )) == null ? '' : __t) +
'"><div class=\'content-wrapper\'>' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div></div>\r\n\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t';
 if (editable) { ;
__p += '\t\r\n\t\t\t\t\t<div class="table-cell delete-button"></div>\r\n\t\t\t\t';
 } ;
__p += '\t\t\t\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<!-- table body -->\r\n\r\n\t\t\t<div class="table-body">\r\n\r\n\t\t\t';
 if (invoiceLines.length > 0 ) { ;
__p += ' \r\n\r\n\t\t\t\t';
 invoiceLines.each(function (invoiceLine, index) {  ;
__p += '\t\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t' +
((__t = ( JST['templates/invoices/invoice-line.html']({ invoiceLine: invoiceLine, editable: editable, account: account }) )) == null ? '' : __t) +
'\r\n\r\n\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t';
 } else { ;
__p += '\r\n\t\t\t\t\r\n\t\t\t\t';
 if (editable) { ;
__p += '\r\n\t\t\t\t\t<div class="table-row placeholder">\r\n\t\t\t\t\t\t<h2 class="editable">Voeg factuurregel toe</h2>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } else { ;
__p += '\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="table-row placeholder">\r\n\t\t\t\t\t\t<h2>factuur heeft geen factuurregels</h2>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/invoices/invoice.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</div>' +
((__t = ( invoice.isCreditInvoice ? "Creditfactuur" : "Factuur" )) == null ? '' : __t) +
'</h2>\r\n\r\n<div class="buttons head">\r\n\r\n\t';
 if (invoice.view_hash) { ;
__p += '\t\r\n\t\t\r\n\t\t';
 if ((invoice.created > myAPP._finalizeInvoicesStartDate) && !invoice.imported) { ;
__p += '\r\n\r\n\t\t\t<div class="button myAPP-tooltip myAPP-dropdown" \t\t\t\t\r\n\t\t\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.viewInvoicePDF )) == null ? '' : __t) +
'" \r\n\t\t\t\tdata-dropdown="invoice-pdfs">\r\n\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.view )) == null ? '' : __t) +
'</span>\r\n\t\t\t\tBekijk\r\n\t\t\t\t<span class="caret caret-small caret-down"></span>\r\n\t\t\t</div>\r\n\r\n\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t<div class="button myAPP-tooltip" \r\n\t\t\t\tid="show-pdf" \r\n\t\t\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.viewInvoicePDF )) == null ? '' : __t) +
'">\r\n\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.view )) == null ? '' : __t) +
'</span>\r\n\t\t\t\tBekijk\r\n\t\t\t</div>\r\n\r\n\t\t';
 } ;
__p += '\r\n\r\n\t';
 } ;
__p += '\r\n\r\n\t';
 if (invoice.hasActions) { ;
__p += '\r\n\r\n\t\t<div class="button myAPP-tooltip myAPP-dropdown" \r\n\t\t\tid="actions" \r\n\t\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.actions )) == null ? '' : __t) +
'" \r\n\t\t\tdata-dropdown="invoice-actions">\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.settings )) == null ? '' : __t) +
'</span>\r\n\t\t\tActies\r\n\t\t\t<span class="caret caret-small caret-down"></span>\r\n\t\t</div>\r\n\r\n\t';
 } ;
__p += '\r\n\r\n</div>\r\n\r\n<div style="clear: both"></div>\r\n\r\n<div class="invoice">\r\n\r\n\t<div class="invoice-content">\r\n\r\n\t\t<div class="animation-wrapper">\t\t\t\r\n\t\t\r\n\t\t\t<div class="invoice-header">\r\n\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="item" id="invoice-number">\r\n\t\t\t\t\t\t\t\t<div class="description">Factuurnr.</div>\r\n\t\t\t\t\t\t\t\t<div class="value"> ' +
((__t = ( invoice.invoice_number || "n.t.b." )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="item" id="debtor">\r\n\t\t\t\t\t\t\t\t<div class="description">Debiteur</div>\r\n\t\t\t\t\t\t\t\t<div class="value">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="item" id="status">\r\n\t\t\t\t\t\t\t\t<div class="description">Status</div>\t\r\n\t\t\t\t\t\t\t\t' +
((__t = ( view.renderStatus(invoice) )) == null ? '' : __t) +
'\t\t\t\t\t\t\t \t\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div class="boxes">\r\n\r\n\t\t\t\t<div class="box">\r\n\t\t\t\t\r\n\t\t\t\t\t<div class="list list-nostyle" id="invoice-details">\r\n\r\n\t\t\t\t\t\t';
 attributes = invoice.isCreditInvoice ? ['date', 'delivery_method', 'parentInvoiceNumber'] : ['date', 'delivery_method', 'payment_term', 'dueDate']; ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 _.each(_.pick(invoice, attributes), function (value, key) {  ;
__p += '\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t';
 if (key === "date" || key === "dueDate") value = myAPP.templateHelpers.parseDate(value); ;
__p += '\r\n\t\t\t\t\t\t\t';
 if (key === "payment_term") value = value + " dagen"; ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t<div class="key" id="' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.values[key] ? myAPP.texts.values[key][value] : value )) == null ? '' : __t) +
'</div>\r\n\r\n\t\t\t\t\t\t\t\t';
 if (key === 'delivery_method' && invoice.canChangeDeliveryMethod) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<div class="button myAPP-tooltip" id="edit" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.changeDeliveryMethod )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.edit )) == null ? '' : __t) +
'</span></div>\r\n\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t';
 });  ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 if (invoice.reference) { ;
__p += '\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<div class="key">' +
((__t = ( myAPP.texts.keys["reference"] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t<div class="value reference">' +
((__t = ( invoice.reference )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 if (invoice.status === "payed") { ;
__p += '\r\n\t\t\t\t\t\t\t<div class="list-item" id="pay_date">\r\n\t\t\t\t\t\t\t\t<div class="key" id="pay_date">' +
((__t = ( myAPP.texts.keys["pay_date"] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t<div class="value pay_date">' +
((__t = ( myAPP.templateHelpers.parseDate(invoice.modified) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t';
 } else if (invoice.status === "objection") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t';
 var objection = myAPP.objections.findWhere({ invoice_id: invoice.id }); ;
__p += '\r\n\t\t\t\t\t\t\t<div class="list-item" id="objectionDate">\r\n\t\t\t\t\t\t\t\t<div class="key" id="objectionDate">' +
((__t = ( myAPP.texts.keys["objectionDate"] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t<div class="value objectionDate">' +
((__t = ( myAPP.templateHelpers.parseDate(objection.get( "created" )) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\t\t\t\t\r\n\r\n\t\t\t\t<div class="box box-right" id="debtor-details">\t\t\t\t\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t<div class="list list-nostyle">\t\t\t\t\r\n\r\n\t\t\t\t\t\t';
 	if (debtor) { ;
__p += '\r\n\t\t\t\t\t\t\t';
 _.each(_.pick(debtor, ['email', 'address', 'zipcode',  'city', 'country']), function (value, key) {  ;
__p += '\r\n\t\t\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t';
 });  ;
__p += '\r\n\t\t\t\t\t\t';
 } else {  ;
__p += '\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.warning )) == null ? '' : __t) +
'</span>ERROR!</h2>\r\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t</div>\t\r\n\t\r\n\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t\t<div class="invoice-lines"></div>\r\n\r\n\t\t\t';
 if (invoice.content) { ;
__p += '\r\n\r\n\t\t\t\t<div class="caption">\r\n\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t<div class="textarea">' +
((__t = ( invoice.content )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t<div class="totals">\r\n\t\t\t\t\r\n\t\t\t\t';
 if (vatLiable === "ja") {  ;
__p += '\r\n\t\t\t\t\t<div class="sub-total">\r\n\t\t\t\t\t\t<span class="text">Totaal excl. btw ' +
((__t = ( vat )) == null ? '' : __t) +
'</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_exc_vat ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n                    \r\n                    ';
 for (var vat in invoice.vatTotals) { ;
__p += '                    \r\n                    \t<div class="sub-total">\r\n                    \t\t<span class="text">Btw ' +
((__t = ( vat )) == null ? '' : __t) +
'</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.vatTotals[vat] ) )) == null ? '' : __t) +
'</span>\r\n                    \t</div>\r\n                    ';
 } ;
__p += '\r\n                    <div class="sub-total total" id="total_inc_vat">\r\n                    \t<span class="text">Totaal incl. btw</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span>\r\n                    </div>\r\n\t\t\t\t\r\n\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="sub-total total" id="total_inc_vat">\r\n                    \t<span class="text">Totaal</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span>\r\n                    </div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t';
 if (invoice.extra_costs) { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="sub-total" id="extra_costs">\r\n\t\t\t\t\t\t<span class="text">Incassokosten</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.extra_costs ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="sub-total total" id="total_with_extra_costs">\r\n\t\t\t\t\t\t<span class="text">Totaal</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat + invoice.extra_costs ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t';
 if (invoice.paymentsTotal) { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="sub-total" id="paymentsTotal">\r\n\t\t\t\t\t\t<span class="text">Reeds betaald</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.paymentsTotal ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t';
 if (invoice.creditInvoicesTotal) { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="sub-total" id="creditInvoicesTotal">\r\n\t\t\t\t\t\t<span class="text">Gecrediteerd</span> <span class="number">- ' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.creditInvoicesTotal * -1 ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\t\r\n\r\n\t\t\t\t';
 if (invoice.isCreditInvoice) { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="sub-total" id="due">\r\n\t\t\t\t\t\t<span class="text">Totaal</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } else if (invoice.status === "debited" || invoice.status === "redeemed") { ;
__p += ' \r\n\r\n\t\t\t\t\t<div class="sub-total" id="due">\r\n\t\t\t\t\t\t<span class="text">Openstaand</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( 0 ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } else { ;
__p += ' \r\n\r\n\t\t\t\t\t<div class="sub-total" id="due">\r\n\t\t\t\t\t\t<span class="text">Openstaand</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( 
							myAPP.templateHelpers.roundUp(invoice.total_inc_vat, 2) + myAPP.templateHelpers.roundUp(invoice.extra_costs, 2) + myAPP.templateHelpers.roundUp(invoice.creditInvoicesTotal, 2) - myAPP.templateHelpers.roundUp(invoice.paymentsTotal, 2) ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\r\n\t\t\t\t<div style="clear: both"></div>\r\n\t\t\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>\r\n\r\n\r\n\t\r\n';

}
return __p
};

this["JST"]["templates/invoices/invoiceDetails.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="invoices">\n\n\t<div class="invoiceDetails">\n\n\n\t';
 
		var age = invoice.age();
		invoice = invoice.toJSON(); 

	;
__p += '\n\n\t\t<!--  QUICK OVERVIEW OF THE INVOICE -->\n\n\t\t<div class="quick-view">\n\n\t\t<div class="meta-data">Invoice no.: <span class="id"> ' +
((__t = ( invoice.id )) == null ? '' : __t) +
'  </span>\n\t\t\t<span class="date"><em> d.d. ' +
((__t = ( invoice.date.getDate() + " " + myAPP.templateHelpers.month(invoice.date.getMonth()) + " " + invoice.date.getFullYear() )) == null ? '' : __t) +
' </em> </span>\n\n\t\t\t\t<!-- <div class="list-page-controls">\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li id="previous-page"><span class="entype">â¬…</span> </li>\n\t\t\t\t\t\t<span id="current-page">1</span>/<span id="total-pages">4</span>\n\t\t\t\t\t\t<li id="next-page"><span class="entype">âž¡</span></li>\n\t\t\t\t\t</ul>\t\n\n\t\t\t\t</div> -->\n\t\t</div>\n\n\t\t<div class="status ' +
((__t = ( invoice.status )) == null ? '' : __t) +
'">\n\n\t\t';
 switch (invoice.status) { 
								
			case "paid": ;
__p += ' <span class=\'entype\'>&#x2713</span>voldaan';
 break; 
			case "due" : ;
__p += ' <span class=\'entype\'>&#x26a0</span>over termijn';
 break;

			default: ;
__p += '<span class=\'entype\'>&#x1f554</span> ' +
((__t = ( age )) == null ? '' : __t) +
'oud';
 break;

	 	} ;
__p += '\n\n\t\t</div>\n\n\t\t\t</div>\n\n\t\t<!-- small boxes -->\n\n   \t\t<div class="small-boxes">\n\n\t\t\t<div class="wrapper">\n\n\t\t\t<h2 class="header"><span class="entype">&#x1f4c4;</span>factuur</h2>\n\n\t\t\t<ul class="list">\n\n\t\t\t\t<li class="list-header">factuurgegevens</li>\t\n\n\t\t\t\t';
 _.each(_.pick(invoice, ['status', 'delivery_method', 'payment_term', 'reference']), function (value, key) {  ;
__p += '\n\t\t\t\t\n\t\t\t\t<li class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\n\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( key )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\n\t\t\t\t</li>\n\t\t\t\t\n\n\t\t\t\t';
 });  ;
__p += '\n\n\t\t\t</ul>\n\n\t\t\t</div>\n\n\t\t\t<div class="wrapper">\n\n\t\t\t<h2 class="header"><span class="entype">&#x1f464;</span>debiteur</h2>\n\t\t\n\t\t\t<ul class="list">\n\n\t\t\t\t<li class="list-header">debiteurgegevens</li>\t\n\n\t\t\t\t';
 _.each(_.pick(debtor, ['name', 'contact_person', 'debtors_email', 'city', 'country']), function (value, key) {  ;
__p += '\n\t\t\t\t\n\t\t\t\t<li class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\n\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( key )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\n\t\t\t\t</li>\n\n\t\t\t\t';
 });  ;
__p += '\n\n\t\t\t</ul>\n\n\t\t\t</div>\n\t\t\t\n\t\t</div>\t\n\t\t\n\t\t<div style="clear: both"></div>\n\n\t\t<div class="invoiceLines"></div>\n\n\t\t<div class="totals">\n\t\t\t<h3 class="total_vat">totaal BTW: <span id="total_vat">' +
((__t = ( invoice.total_vat )) == null ? '' : __t) +
'<span> </h3>\n\t\t\t<h2 class="total" class="header">Totaal : <span id="total_incl_vat">' +
((__t = ( invoice.total_incl_vat )) == null ? '' : __t) +
'</span></h2>\n\t\t</div>\n\n\t</div>\n\t\n\n\t\n\n\n\t<div class="column-main">\n\n\t\n\t</div>\n\n</div>';

}
return __p
};

this["JST"]["templates/invoices/invoiceLine.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '';

}
return __p
};

this["JST"]["templates/invoices/invoices-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="invoices-collection">\r\n\r\n\t<div>\r\n\r\n\t\t<h2 class="description"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoices )) == null ? '' : __t) +
'</span>Facturen</h2>\r\n\r\n\t\t<div class="table-controls">\t\t\t\t\t\r\n\t\t\t<ul class="controls page-controls button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pageControls )) == null ? '' : __t) +
'">\r\n\t\t\t\t<li id="previous-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t<li><div class="animation-wrapper"><span id="current-page">' +
((__t = ( collection.currentPage + 1 )) == null ? '' : __t) +
'</span></div><span>/</span><span id="total-pages">' +
((__t = ( collection.totalPages )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t<li id="next-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t</ul>\t\t\t\t\t\t\t\r\n\r\n\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t</div> \t\r\n\r\n\t\t<div class="button button-blue myAPP-tooltip" id="new" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.newInvoice )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.newInvoice )) == null ? '' : __t) +
'</span><span class="text">Nieuwe factuur</span></div>\t\r\n\r\n\t\t<div class="table table-invoices">\r\n\t\t\r\n\t\t\t<div class="table-header table-row">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<!-- ids should match the sortable attributes on the models -->\r\n\t\t\t\t\t\t<div class="table-cell" id="icon">\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div id="invoice_number" class="table-cell sort-handle myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sortable.replace(/%attribute%/ , "factuurnummer") )) == null ? '' : __t) +
'">\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<span>Nr.</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div id="debtor" class="table-cell sort-handle myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sortable.replace(/%attribute%/ , "debiteur ") )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t<span>Debiteur</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div id="date" class="table-cell sort-handle myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sortable.replace(/%attribute%/ , "factuurdatum ") )) == null ? '' : __t) +
'">\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<span>Datum</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div id="status" class="table-cell sort-handle myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sortable.replace(/%attribute%/ , "factuurstatus ") )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t<span>Status</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div id="total_inc_vat" class="table-cell sort-handle last-child myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sortable.replace(/%attribute%/ , "factuurbedrag ") )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t<span>Bedrag</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="table-body paginate-page">\r\n\r\n\t\t\t';
 if (collection.length > 0) { ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 

							collection.each(function (invoice, index) { 
								var debtor = invoice.debtor || new myAPP.models.Debtor();
								debtor = debtor.getAttributes(); 								
								invoice = invoice.getAttributes();  

						;
__p += '\r\n\r\n\t\t\t\t\t\t<div class="table-row" id="' +
((__t = ( invoice.id )) == null ? '' : __t) +
'">\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell" id="icon">\r\n\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell" id="invoice_number">\r\n\t\t\t\t\t\t\t\t<span>' +
((__t = ( invoice.invoice_number )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="table-cell" id="debtor">\r\n\t\t\t\t\t\t\t\t<span class="title">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="table-cell" id="date">\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t';
 if (invoice.isPeriodicalChild) { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t';
 
										var periodical = myAPP.periodicals.findWhere({ id: String( invoice.periodical_id ) }) 
										var tooltip = periodical ? "Deze herhaalfactuur wordt elke " + periodical.get("period") + " verzonden" 
											: "Deze herhaalfactuur wordt niet meer verstuurd"

									;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<span class="entype myAPP-tooltip label ';
 if(!periodical) print("inactive") ;
__p += '" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.templateHelpers.charCodes.periodical )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<span class="date myAPP-tooltip" data-tooltip="Deze factuur is ' +
((__t = ( invoice.daysOld )) == null ? '' : __t) +
' dagen oud">' +
((__t = ( myAPP.templateHelpers.parseDate(invoice.date) )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell" id="status">\t\r\n\r\n\t\t\t\t\t\t\t\t';
 if (invoice.type === "reminder" ) { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<span class="entype label label-info myAPP-tooltip extra-icon"\r\n\t\t\t\t\t\t\t\t\t\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.startedFromReminder )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.startedFromReminder )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t\t\t\t</span>\r\n\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t';
 if (invoice.type === "noautocycle" ) { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<span class="entype label label-info myAPP-tooltip extra-icon"\r\n\t\t\t\t\t\t\t\t\t\t\tdata-tooltip="' +
((__t = ( myAPP.texts.tooltips.noAutocycle )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t\t\t\t</span>\r\n\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t' +
((__t = ( view.renderStatus(invoice) )) == null ? '' : __t) +
'\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell" id="delivery_method">\r\n\r\n\t\t\t\t\t\t\t\t';
 if ((invoice.delivery_method === "postal" ||  invoice.delivery_method === "both") && invoice.status !== "draft" && invoice.status !== "ready") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t';
 var tooltip = (invoice.delivery_method === "both") ? "deliveryMethodBoth" : "deliveryMethodPostal"; ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<span class="entype label myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips[tooltip] )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.postal )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell" id="internal-status">\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t';
 if (invoice.status_internal === "reminder") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t';
 var tooltip = (invoice.isOpen) ? myAPP.texts.tooltips.reminderOpen : myAPP.texts.tooltips.reminderClosed; ;
__p += '\r\n\t\t\t\t\t\t\t\t\t<span class="entype label myAPP-tooltip" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.reminder )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status_internal === "summation") { ;
__p += '\t\r\n\r\n\t\t\t\t\t\t\t\t\t';
 	var tooltip = (invoice.isOpen) ? myAPP.texts.tooltips.summationOpen : myAPP.texts.tooltips.summationClosed; 
										tooltip = tooltip.replace(/%extra_costs%/, 
										myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.extra_costs)); 
									;
__p += '\t\r\n\t\t\t\t\t\t\t\t\t<span class="entype label myAPP-tooltip" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.warning )) == null ? '' : __t) +
'</span>\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status_internal === "collection") { ;
__p += ' \r\n\r\n\t\t\t\t\t\t\t\t\t';
 	var tooltip = (invoice.isOpen) ? myAPP.texts.tooltips.collectionOpen : myAPP.texts.tooltips.collectionClosed; 
										tooltip = tooltip.replace(/%extra_costs%/, 
										myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.extra_costs)); 
									;
__p += '\t\r\n\t\t\t\t\t\t\t\t\t<span class="entype label myAPP-tooltip" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.templateHelpers.charCodes.collection )) == null ? '' : __t) +
'</span>\r\n\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell" id="payment-status">\r\n\r\n\t\t\t\t\t\t\t\t';
 if (invoice.status !== "payed" && invoice.paymentsTotal) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t';
 var tooltip = myAPP.texts.tooltips.partialPayments.replace(/%paymentsTotal%/, 
										myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.paymentsTotal)); ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<span class="entype label label-success myAPP-tooltip" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell" id="credit-invoices">\r\n\r\n\t\t\t\t\t\t\t\t';
 if (invoice.status !== "debited" && (invoice.creditInvoicesTotal < 0)) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t';
 var tooltip = myAPP.texts.tooltips.partialCredited.replace(/%creditInvoicesTotal%/, 
										myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.creditInvoicesTotal)); ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<span class="entype label label-info myAPP-tooltip" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.templateHelpers.charCodes.credit )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell last-child ';
 if (invoice.status === "debited" || invoice.isFullyCredited || invoice.parentIsFullyCredited || invoice.isCreditInvoice) print("debited "); 			;
__p += '"  id="amount">\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t';
 if (invoice.extra_costs && invoice.isOpen) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t';
 var tooltip = myAPP.texts.tooltips.extraCosts.replace(/%extra_costs%/, 
										myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.extra_costs)); ;
__p += ' \t\t\t\t\t\t\t\t\t\r\n\t\r\n\t\t\t\t\t\t\t\t\t<span class="amount myAPP-tooltip label label-error" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span>\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<span class="amount">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span>\t\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t</div>\t\t\t\t\t\r\n\r\n\t\t\t\t';
 }); ;
__p += '\r\n\r\n\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t<div class="table-row placeholder">\r\n\r\n\t\t\t\t\t<h2>Geen facturen</h2>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\t\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/invoices/invoices.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="mainPaneWrapper invoices-view">\r\n\t\r\n\t<div class="header">\r\n\t\t<h2>Facturen</h2>\r\n\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>\r\n\r\n\t</div>\r\n\t\r\n\t<div class="pane invoices-pane"></div>\r\n\t\r\n</div>';

}
return __p
};

this["JST"]["templates/invoices/invoicesLines.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\t<h2 class="header"><span class="entype">&#xe005;</span>factuurregels</h2>\n\n\n\t\t<!--  CONTROLS -->\n\n\t\t<ul class="btn-group">\n\t\t\t<li id="add_invoiceline" class="btn"><span class="entype">&#x2795;</span><span class="description">lege regel</span></li>\n\t\t\t<li id="add_article" class="btn dropdown-toggle" data-toggle="dropdown">\n\t\t\t\t\n\t\t\t\t<span class="entype">&#x229e;</span><span class="description">artikel</span>\n\t\t\t\t<span class="caret"></span>\n\t\t\t\t\n\t\t\t</li>\n\n\t\t\t<ul class="dropdown-menu products">\n\n\t\t\t';
 _.each(productGroups, function (productGroup) { ;
__p += '\n\n\t\t\t\t<!-- create a submenu for each productGroup -->\n\n\t\t\t\t<li class="dropdown-submenu">\n\n\t\t\t\t\t<a href="#">' +
((__t = ( productGroup.get('name') )) == null ? '' : __t) +
'</a>\n\t\t\t\t\t<ul class="dropdown-menu">\n\n\t\t\t\t\t\t';
 _.each(productGroup.products.toJSON(), function (product) {  ;
__p += '\n\n\t\t\t\t\t\t<li><a class="product" href="#">' +
((__t = ( product.name )) == null ? '' : __t) +
'</a></li>\n\n\t\t\t\t\t\t';
 }) ;
__p += '\n\n\t\t\t\t\t</ul>\n\t\t\t\t</li>\n\n\n\t\t\t';
	}) ;
__p += '\n\t\t\t\n\t\t\t</ul>\n\n\t\t</ul>\n\n\n\t\t<!--  INVOICE LINES -->\n\n\t\t<ul class="list" id="invoice_lines">\n\n\n\t\t\t<!-- list header -->\n\n\t\t\t<div class="list-header">\n\n\t\t\t\t';
 _.each(_.omit(invoiceLines[0], ['id', 'vat_total', 'article_number']), function (value, key) { ;
__p += '\n\n\t\t\t\t\t<div id="' +
((__t = ( key )) == null ? '' : __t) +
'"><span class=\'contentWrapper\'>' +
((__t = ( key )) == null ? '' : __t) +
'</span></div>\n\n\t\t\t\t';
 }) ;
__p += '\n\n\t\t\t</div>\n\n\t\t\t<!-- list body -->\n\n\t\t\t';
 _.each(invoiceLines, function (invoiceLine, index) {  ;
__p += '\n\n\t\t\t\t' +
((__t = ( JST["templates/invoices/invoiceLine.html"]({invoiceLine: invoiceLine, editables: editables}) )) == null ? '' : __t) +
'\n\n\t\t\t';
 }) ;
__p += '\n\n\t\t</ul>';

}
return __p
};

this["JST"]["templates/invoices/invoicesList.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="new renderContent invoicesList">\n\n\t<div class="list">\n\n\t\t<div class="list-header">All Invoices</div>\n\n\t\t\t<ul>\n\t\t\t\n\t\t\t';
 _.each(collection, function (invoice) { invoice = invoice.toJSON() ;
__p += '\n\n\t\t\t\t\t\t<li class="list-item" id="' +
((__t = ( invoice.id )) == null ? '' : __t) +
'">\n\n\t\t\t\t\t\t\t';
 if (invoice.role === "superadmin") { ;
__p += '\n\n\t\t\t\t\t\t\t\t<span class="right entype">&#xE722;</span>\n\n\t\t\t\t\t\t\t';
 }  ;
__p += '\n\n\t\t\t\t\t\t\t<div class="left">\n\t\t\t\t\t\t\t\t<span class="entype">&#x1f4c4;</span>\n\t\t\t\t\t\t\t\t<span class="title">' +
((__t = ( invoice.debtor )) == null ? '' : __t) +
'</span>\n\t\t\t\t\t\t\t\t<span class="description">Crazy amount:  <em>(ex. VAT)</em></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t\t\t<div class="right">\n\t\t\t\t\t\t\t\t<span class="amount">' +
((__t = ( invoice.total_incl_vat )) == null ? '' : __t) +
'</span>\n\t\t\t\t\t\t\t\t<span class="vat">' +
((__t = ( (invoice.total_incl_vat - invoice.total_exc_vat).toFixed(2) )) == null ? '' : __t) +
'</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\n\t\t\t';
 }); ;
__p += '\n\n\t\t</ul>\n\n\t</div>\n\t\t\n</div>\n';

}
return __p
};

this["JST"]["templates/invoices/new-invoice.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (invoice.debtor && invoice.debtor.toJSON) var debtor = invoice.debtor.toJSON() ;
__p += '\n\n<div class="buttons">\n\t<div class="button button-disabled" id="save"><span class="entype">&#x1F4BE;</span>opslaan</div>\n\t<div class="button" id="preview"><span class="entype">&#xE70A;</span>preview</div>\n</div>\n\n<div class="new-invoice">\n\n\t<div class="invoice-content">\n\n\t\t<div class="animation-wrapper">\n\n\t\t\t<div class="invoice-header">\n\t\t\t\t\n\t\t\t\t<div class="item" id="invoice-number">\n\t\t\t\t\t<div class="description">factuur</div>\n\t\t\t\t\t<div class="value"> ' +
((__t = ( invoice.id )) == null ? '' : __t) +
'</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="item" id="debtor">\n\t\t\t\t\t<div class="description">debiteur</div>\n\t\t\t\t\t<!-- <div class="value"></div> -->\n\t\t\t\t\t<input type="text" class="myAPP-autocomplete" data-autocomplete="myAPP.debtors" ';
 if (debtor)  { ;
__p += ' value="' +
((__t = ( debtor.name )) == null ? '' : __t) +
'" ';
 } ;
__p += '>\n\t\t\t\t</div>\n\n\t\t\t\t\n\n\t\t\t\t<div class="item ' +
((__t = ( invoice.status )) == null ? '' : __t) +
'" id="status">\n\t\t\t\t\t<div class="description">status</div>\n\n\t\t\t\t\t\t<div class="value"><span class=\'entype\'>&#x2712;</span>concept</div>\n\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class="boxes">\n\n\t\t\t\t<div class="box">\n\n\t\t\t\t\t<h4 class="header"><span class="entype">&#x1f4c4;</span>factuur</h4>\n\n\t\t\t\t\t<div class="list list-nostyle" id="invoice-details">\n\n\t\t\t\t\t\t<div class="list-item">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class="key">factuurdatum</div>\n\t\t\t\t\t\t\t<div class="value"><input type="text" id="date-picker" value="';
 if (invoice.date) print(myAPP.templateHelpers.parseDate(invoice.date)) ;
__p += '">\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\t\t\t\t\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="list-item">\n\t\t\t\t\t\t\t<div class="key">vervaltermijn</div>\n\t\t\t\t\t\t\t<div class="button button-small myAPP-dropdown" data-dropdown="payment-terms" id="payment-term" >\n\t\t\t\t\t\t\t\t<span class="content-wrapper">' +
((__t = ( invoice.payment_term )) == null ? '' : __t) +
' dagen</span><span class="caret caret-small caret-down"></span> </div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<!-- <div class="list-header">factuurgegevens</div>\t -->\n\n\t\t\t\t<!-- \t\t';
 _.each(_.pick(invoice, ['status', 'delivery_method', 'payment_term', 'reference']), function (value, key) {  ;
__p += '\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( key )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\n\t\t\t\t\t\t';
 });  ;
__p += ' -->\n\n\t\t\t\t\t\t\n\n\t\t\t\t\t\t<!-- </div> -->\n\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\n\t\t\t\t<div class="box">\n\n\t\t\t\t<h4 class="header"><span class="entype">&#x1f464;</span>debiteur</h4>\n\t\t\t\n\t\t\t\t<div class="list" id="debtor-details">\n\n\t\t\t\t\t<!-- <div class="list-header">debiteurgegevens</div>\t -->\n\n\t\t\t\t\t';
 	if (debtor) { ;
__p += '\n\n\t\t\t\t\t\t';
 _.each(_.pick(debtor, ['name', 'contact_person', 'debtors_email', 'city', 'country']), function (value, key) {  ;
__p += '\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( key )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t';
 });  ;
__p += '\n\n\t\t\t\t\t';
 } else { ;
__p += '\n\n\t\t\t\t\t\t<div class="list-item">\n\t\t\t\t\t\t\t<h4>Voeg debiteur toe</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t';
 } ;
__p += '\n\n\n\n\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t</div>\t\n\t\t\t\n\t\t\t<div style="clear: both"></div>\n\n\t\t\t<div class="invoice-lines"></div>\n\n\t\t\t<div class="totals">\n\t\t\t\t<h3 class="total_vat total">totaal BTW: <span id="total_vat">' +
((__t = ( invoice.total_vat )) == null ? '' : __t) +
'<span> </h3>\n\t\t\t\t<h2 class="total_incl_vat total" class="header">Totaal : <span id="total_incl_vat">' +
((__t = ( invoice.total_incl_vat )) == null ? '' : __t) +
'</span></h2>\n\t\t\t</div>\n\n\t\t\t<div style="clear: both"></div>\n\n\t\t</div>\n\n\t</div>\n\n</div>\n\n';

}
return __p
};

this["JST"]["templates/invoices/periodical-instances.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="periodical-instances">\n\n\t\t<div class="list list-nostyle nomargin">\n\t\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoices )) == null ? '' : __t) +
'</span>Verzonden exemplaren</div>\n\t\t\t\t\t</div>\n\t\n\t\t<div class="table table-periodical-instances">\n\t\t\t\n\t\t\t<div class="table-header table-row">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<!-- ids should match the sortable attributes on the models -->\n\t\t\t\t\t\t\t<div class="table-cell" id="icon">\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div id="invoice_number" class="table-cell sort-handle">\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<span>#</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div id="date" class="table-cell sort-handle">\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<span>Datum</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div id="status" class="table-cell sort-handle">\n\t\t\t\t\t\t\t\t<span>Status</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div id="total_inc_vat" class="table-cell sort-handle last-child">\n\t\t\t\t\t\t\t\t<span>Bedrag</span>  \n\t\t\t\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class="table-body paginate-page">\n\n\t\t\t\t';
 if (collection.length > 0) { ;
__p += '\n\n\t\t\t\t\t';
 collection.each(function (invoice, index) { invoice = invoice.getAttributes();  ;
__p += '\n\n\t\t\t\t\t\t\t<div class="table-row" id="' +
((__t = ( invoice.id )) == null ? '' : __t) +
'">\n\n\t\t\t\t\t\t\t\t<div class="table-cell" id="icon">\n\t\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class="table-cell" id="invoice_number">\n\t\t\t\t\t\t\t\t\t<span>' +
((__t = ( invoice.invoice_number )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</div>\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class="table-cell" id="date">\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<span class="date">' +
((__t = ( myAPP.templateHelpers.parseDate(invoice.date) )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class="table-cell" id="status">\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\t';
 if (invoice.status === "payment_plan") { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t<span class=\'label label-info\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.hasPaymentPlan )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.paymentPlan )) == null ? '' : __t) +
'</span><span class="text">Betalingsregeling</span></span>\t\n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "collection") { ;
__p += '\t\n\n\t\t\t\t\t\t\t\t\t<span class=\'label label-error\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.collection )) == null ? '' : __t) +
'">\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.collection )) == null ? '' : __t) +
'</span><span><span class="text">Incasso</span></span>\n\t\t\t\t\t\t\t\t\t</span> \n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "summation") { ;
__p += '\t\n\n\t\t\t\t\t\t\t\t\t<span class=\'label label-warning\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.summation )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.warning )) == null ? '' : __t) +
'</span><span class="text">Aanmaning</span></span>\t\n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "debited") { ;
__p += '\t\n\n\t\t\t\t\t\t\t\t\t<span class=\'label label-info\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.debited )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.debited )) == null ? '' : __t) +
'</span><span class="text">Afgeboekt</span></span>\t\n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "redeemed") { ;
__p += '\t\n\n\t\t\t\t\t\t\t\t\t<span class=\'label label-info\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.redeemed )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.redeemed )) == null ? '' : __t) +
'</span><span class="text">Kwijtgescholden</span></span>\t\n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "reminder") { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t<span class=\'label label-warning\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.reminder )) == null ? '' : __t) +
'" ><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.reminder )) == null ? '' : __t) +
'</span><span class="text">Herinnering</span></span>\t\n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "objection") { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t<span class=\'label label-error\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.objection )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.objection )) == null ? '' : __t) +
'</span><span class="text">Bezwaar gemaakt</span></span>\n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "payed") { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t<span class=\'label label-success\' data-tooltip="Deze factuur is betaald ';
 if (invoice.payDate) print("op " + myAPP.templateHelpers.parseDate(invoice.payDate)) ;
__p += '"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.approved )) == null ? '' : __t) +
'</span>Betaald</span>\n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.isCreditInvoice && invoice.status !== "approved") { ;
__p += ' \t\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\t<span class=\'label\' data-tooltip="creditfactuur"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.creditInvoice )) == null ? '' : __t) +
'</span>Credit</span>\n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "send") { ;
__p += ' \t\n\n\t\t\t\t\t\t\t\t\t<span class=\'label\' data-tooltip="Deze factuur vervalt over ' +
((__t = ( invoice.daysUntilDue )) == null ? '' : __t) +
' dagen"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.sent )) == null ? '' : __t) +
'</span>Verzonden</span><span class="daysOld" data-tooltip="Deze factuur vervalt over ' +
((__t = ( invoice.daysUntilDue )) == null ? '' : __t) +
' dagen">' +
((__t = ( invoice.daysUntilDue )) == null ? '' : __t) +
' d</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "stopped") { ;
__p += ' \t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<span class=\'label\' data-tooltip="Deze factuur loopt nog in facturen.net"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.external )) == null ? '' : __t) +
'</span><span class="text">Facturen.net</span></span>\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "approved") { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t';
 if (invoice.daysUntilSend > 0) { ;
__p += ' \n\n\t\t\t\t\t\t\t\t\t\t<span class=\'label label-no-label\' data-tooltip="Deze factuur wordt verstuurd over ' +
((__t = ( invoice.daysUntilSend )) == null ? '' : __t) +
' dagen"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.time )) == null ? '' : __t) +
'</span></span>\n\n\t\t\t\t\t\t\t\t\t';
 } else {  ;
__p += '\n\n\t\t\t\t\t\t\t\t\t\t<span class=\'label label-no-label\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sending )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.hourglass )) == null ? '' : __t) +
'</span>Verzenden...</span>\t\n\n\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "paused") { ;
__p += '\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<span class="label label-info" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.paused )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.pause )) == null ? '' : __t) +
'</span>Gepauzeerd</span>\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "draft" || invoice.status === "ready") { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t<span class="label label-disabled" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.draft )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.edit )) == null ? '' : __t) +
'</span></span>\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class="table-cell" id="internal-status">\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t';
 if (!invoice.isOpen) { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t';
 if (invoice.last_status_internal === "reminder") { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t\t';
 var tooltip = (invoice.isOpen) ? myAPP.texts.tooltips.reminderOpen : myAPP.texts.tooltips.reminderClosed; ;
__p += '\n\t\t\t\t\t\t\t\t\t\t<span class="entype label myAPP-tooltip" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.reminder )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\t';
 } else if (invoice.last_status_internal === "summation") { ;
__p += '\t\n\n\t\t\t\t\t\t\t\t\t\t';
 	var tooltip = (invoice.isOpen) ? myAPP.texts.tooltips.summationOpen : myAPP.texts.tooltips.summationClosed; 
											tooltip = tooltip.replace(/%extra_costs%/, 
											myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.extra_costs)); 
										;
__p += '\t\n\t\t\t\t\t\t\t\t\t\t<span class="entype label myAPP-tooltip" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.warning )) == null ? '' : __t) +
'</span>\t\t\t\n\n\t\t\t\t\t\t\t\t\t';
 } else if (invoice.last_status_internal === "collection") { ;
__p += ' \n\n\t\t\t\t\t\t\t\t\t\t';
 	var tooltip = (invoice.isOpen) ? myAPP.texts.tooltips.collectionOpen : myAPP.texts.tooltips.collectionClosed; 
											tooltip = tooltip.replace(/%extra_costs%/, 
											myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.extra_costs)); 
										;
__p += '\t\n\t\t\t\t\t\t\t\t\t\t<span class="entype label myAPP-tooltip" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.templateHelpers.charCodes.collection )) == null ? '' : __t) +
'</span>\n\n\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="table-cell ';
 if (!invoice.isOpen) print("opaque") ;
__p += '" id="payment-status">\n\n\t\t\t\t\t\t\t\t';
 if (invoice.status !== "payed" && invoice.paymentsTotal) { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t';
 var tooltip = myAPP.texts.tooltips.partialPayments.replace(/%partial_payments%/, 
										myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.paymentsTotal)); ;
__p += '\n\n\t\t\t\t\t\t\t\t\t<span class="entype label label-success myAPP-tooltip" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t<div class="table-cell last-child ';
 if (invoice.status === "debited" || invoice.isFullyCredited || invoice.parentIsFullyCredited || invoice.isCreditInvoice) print("debited "); 			;
__p += '"  id="amount">\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t';
 if (invoice.extra_costs && invoice.isOpen) { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t';
 var tooltip = myAPP.texts.tooltips.extraCosts.replace(/%extra_costs%/, 
										myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.extra_costs)); ;
__p += ' \t\t\t\t\t\t\t\t\t\n\t\n\t\t\t\t\t\t\t\t\t<span class="amount myAPP-tooltip label label-error" data-tooltip="' +
((__t = ( tooltip )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t';
 } else { ;
__p += '\n\n\t\t\t\t\t\t\t\t\t<span class="amount">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span>\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\n\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div style="clear: both"></div> \n\n\t\t\t\t\t';
 }); ;
__p += '\n\n\t\t\t\t';
 } else { ;
__p += '\n\n\t\t\t\t\t<div class="table-row placeholder">\n\n\t\t\t\t\t\t<h2>Geen facturen</h2>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t';
 } ;
__p += '\n\t\t\t\n\t\t\t</div>\n\n\t</div>\t\n\n</div>';

}
return __p
};

this["JST"]["templates/invoices/periodical.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.periodical )) == null ? '' : __t) +
'</div>Periodiek</h2>\r\n\r\n<div class="buttons head">\r\n\r\n<!-- ';
 if (periodical.status === "send") { ;
__p += '\r\n\t<div class="button myAPP-tooltip" id="pause" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pauseInvoice )) == null ? '' : __t) +
'"><span class="entype">&#x2389;</span>Pauzeren</div> \r\n';
 } else  if (periodical.status === "paused") { ;
__p += '\r\n\t<div class="button myAPP-tooltip" id="unpause" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.unpauseInvoice )) == null ? '' : __t) +
'"><span class="entype">&#x25B6;</span>Herstarten</div> \r\n';
 } ;
__p += ' -->\r\n\r\n<div class="button myAPP-tooltip" id="viewInstances" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.viewPeriodicalInstances )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoices )) == null ? '' : __t) +
'</span>Verstuurde exemplaren</div>\r\n<div class="button myAPP-tooltip" id="delete" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.deletePeriodical )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.ddelete )) == null ? '' : __t) +
'</span></div>\r\n\r\n</div>\r\n\r\n<div style="clear: both"></div>\r\n\r\n<div class="periodical"\t>\r\n\r\n\r\n\r\n\t<div class="periodical-view">\r\n\r\n\t\t<div class="invoice-content">\r\n\r\n\t\t\t<div class="animation-wrapper">\t\t\t\r\n\t\t\t\r\n\t\t\t\t<div class="invoice-header">\r\n\t\t\t\t\t\r\n\t\t\t\t\t<!-- <div class="item" id="invoice-number">\r\n\t\t\t\t\t\t<div class="description">Periodieknr.</div>\r\n\t\t\t\t\t\t\t<div class="value">' +
((__t = ( periodical.id )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t</div> -->\r\n\r\n\t\t\t\t\t<div class="item" id="debtor">\r\n\t\t\t\t\t\t<div class="description">Debiteur</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="item" id="status">\r\n\t\t\t\t\t\t<div class="description">Status</div>\r\n\r\n\t\t\t\t\t\t';
 if (periodical.isSending) { ;
__p += '\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="value"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.hourglass )) == null ? '' : __t) +
'</span><div class="text">verzenden...</div></div>\r\n\r\n\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="value"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.periodical )) == null ? '' : __t) +
'</span><div class="text">periodiek</div></div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t';
 } ;
__p += '\t\t\t \t\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="periodical-body">\r\n\r\n\t\t\t\t\t<div class="animation-wrapper">\r\n\r\n\t\t\t\t\t\t<div class="boxes">\r\n\r\n\t\t\t\t\t\t\t<div class="box">\r\n\r\n\t\t\t\t\t\t\t\t<div class="list list-nostyle nomargin">\r\n\t\t\t\t\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.periodical )) == null ? '' : __t) +
'</span>Periodiek</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div class="list list-nostyle" id="invoice-details">\r\n\r\n\t\t\t\t\t\t\t\t\t<!-- invoice info\t -->\r\n\r\n\t\t\t\t\t\t\t\t\t';
 _.each(_.pick(invoice, ['delivery_method', 'payment_term', 'reference']), function (value, key) {  ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t';
 if (key === "payment_term") value = value + " dagen"; ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.values[key] ? myAPP.texts.values[key][value] : value )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t\t';
 });  ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<!-- periodical info -->\r\n\r\n\t\t\t\t\t\t\t\t\t';
 _.each(_.pick(periodical, ['created', 'startDate', 'period', 'children']), function (value, key) {  ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t';
 if (key === "created" || key === "startDate") value = myAPP.templateHelpers.parseDate(value); ;
__p += '\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t\t';
 });  ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="box box-right">\r\n\r\n\t\t\t\t\t\t\t\t<div class="list list-nostyle nomargin">\r\n\t\t\t\t\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</span>Debiteur</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t\t\t\t\t<!-- <li class="list-header">debiteurgegevens</li>\t -->\r\n\r\n\t\t\t\t\t\t\t\t\t';
 	if (debtor) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t\t';
 _.each(_.pick(debtor, ['company_name', 'contact_person', 'debtors_email', 'city', 'country']), function (value, key) {  ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t\t\t';
 });  ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t';
 } else {  ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t\t\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.due )) == null ? '' : __t) +
'</span>ERROR!</h2>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="box">\r\n\r\n\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\t\r\n\t\t\t\t\r\n\t\t\t\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t\t\t\t\t<div class="invoice-lines"></div>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="totals">\r\n\t\t\t\t\t\r\n\t\t\t\t';
 if (account.vat_liable === "ja") {  ;
__p += '\r\n\r\n\t\t\t\t\t<div class="sub-total">\r\n\t\t\t\t\t\t<span class="text">Totaal excl. btw ' +
((__t = ( vat )) == null ? '' : __t) +
'</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_exc_vat ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n                    \r\n                    ';
 for (var vat in invoice.vatTotals) { ;
__p += '                    \r\n                    \t<div class="sub-total">\r\n                    \t\t<span class="text">Btw ' +
((__t = ( vat )) == null ? '' : __t) +
'</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.vatTotals[vat] ) )) == null ? '' : __t) +
'</span>\r\n                    \t</div>\r\n                    ';
 } ;
__p += '\r\n                    <div class="sub-total total" id="total_inc_vat">\r\n                    \t<span class="text">Totaal incl. btw</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span>\r\n                    </div>\r\n\t\t\t\t\r\n\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="sub-total total" id="total_inc_vat">\r\n                    \t<span class="text">Totaal</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( invoice.total_inc_vat ) )) == null ? '' : __t) +
'</span>\r\n                    </div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="sub-total" id="due">\r\n\t\t\t\t\t\t<span class="text">Totaal</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( 
							myAPP.templateHelpers.parseNumber(myAPP.templateHelpers.roundUp( invoice.total_inc_vat, 2)) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div style="clear: both"></div>\r\n\t\t\t\r\n\t\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>\r\n\t\r\n';

}
return __p
};

this["JST"]["templates/invoices/periodicals-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="periodicals-collection">\r\n\r\n\t<h2 class="description"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.periodical )) == null ? '' : __t) +
'</span>Periodieken</h2>\r\n\r\n\t<div class="table-controls">\r\n\r\n\t\t<ul class="controls page-controls button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pageControls )) == null ? '' : __t) +
'">\r\n\t\t\t<li id="previous-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t<li><div class="animation-wrapper"><span id="current-page">' +
((__t = ( collection.currentPage + 1 )) == null ? '' : __t) +
'</span></div><span>/</span><span id="total-pages">' +
((__t = ( collection.totalPages )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t<li id="next-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t</ul>\r\n\r\n\t\t<div style="clear: both"></div>\r\n\r\n\t</div>\r\n\r\n\t<!-- <div class="button button-blue myAPP-tooltip" id="new" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.newInvoice )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.periodical )) == null ? '' : __t) +
'</span><span class="text">Nieuwe periodiek</span></div>\r\n -->\r\n\t<div class="table table-periodicals">\r\n\t\t\t\r\n\t\t<div class="table-header table-row">\r\n\t\t\t<div class="table-cell" id="icon">\r\n\t\t\t</div>\r\n\r\n\t\t\t<!-- <div id="id" class="table-cell sort-handle">\t\t\t\t\t\t\t\t\r\n\t\t\t\t<span>#</span>\r\n\t\t\t</div> -->\r\n\r\n\t\t\t<div id="debtorName" class="table-cell sort-handle">\r\n\t\t\t\t<span>Debiteur</span>\r\n\t\t\t</div>\r\n\t\t\t<div id="period" class="table-cell sort-handle">\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t<span>Periode</span>\r\n\t\t\t</div>\r\n\t\t\t<div id="startDate" class="table-cell sort-handle">\r\n\t\t\t\t<span>Startdatum</span>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div id="children" class="table-cell sort-handle">\r\n\t\t\t\t<span>Verstuurd</span>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div id="total_inc_vat" class="table-cell sort-handle last-child">\r\n\t\t\t\t<span>Bedrag</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="table-body paginate-page">\r\n\r\n\t\t\t';
 if (collection.length > 0) {  ;
__p += '\r\n\r\n\t\t\t\t\t';
 

						collection.each(function (periodical) { 							
							var debtor = myAPP.debtors.findWhere({ id: periodical.get( "account_debtor_id" ) }) || new myAPP.models.Debtor();
							debtor = debtor.getAttributes();
							periodical = periodical.getAttributes(); 

					;
__p += '\r\n\r\n\t\t\t\t\t<div class="table-row" id="' +
((__t = ( periodical.id )) == null ? '' : __t) +
'"> \r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="table-cell" id="icon">\r\n\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.periodical )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<!-- <div class="table-cell" id="id">\r\n\t\t\t\t\t\t\t<span>' +
((__t = ( periodical.id )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div> -->\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="table-cell" id="debtorName">\r\n\t\t\t\t\t\t\t<span class="title">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="table-cell" id="period">\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<span class="period">' +
((__t = ( periodical.period )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class="table-cell" id="startDate">\r\n\t\t\t\t\t\t\t<span class="date">' +
((__t = ( myAPP.templateHelpers.parseDate(periodical.startDate) )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class="table-cell" id="children">\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t';
 if (periodical.isSending) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<span class="children"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.hourglass )) == null ? '' : __t) +
'</span>verzenden...</span>\r\n\r\n\t\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<span class="children">' +
((__t = ( periodical.children )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class="table-cell last-child" id="amount">\r\n\t\t\t\t\t\t\t<span class="amount">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(periodical.total_inc_vat) )) == null ? '' : __t) +
'</span>\t\t\t\r\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 }); ;
__p += '\r\n\r\n\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t<div class="table-row placeholder">\r\n\r\n\t\t\t\t\t<h2>Geen periodieken</h2>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\t\t</div>\t\t\r\n\r\n\t</div>\t\r\n\t\t\r\n</div>';

}
return __p
};

this["JST"]["templates/invoices/quote.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\r\n<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.quote )) == null ? '' : __t) +
'</div>Offerte</h2>\r\n\r\n<div class="buttons head">\t\r\n\r\n\t';
 if (quote.view_hash) { ;
__p += '\r\n\t\t<div class="button myAPP-tooltip" id="show-pdf" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.viewInvoicePDF )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.pdf )) == null ? '' : __t) +
'</span>Bekijk PDF</div>\t\r\n\t\r\n\t';
 } ;
__p += '\r\n\r\n\t';
 if (quote.hasActions) { ;
__p += '\r\n\r\n\t<div class="button myAPP-tooltip myAPP-dropdown" id="actions" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.actions )) == null ? '' : __t) +
'" data-dropdown="invoice-actions"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.settings )) == null ? '' : __t) +
'</span>Acties</div>\r\n\r\n\t';
 } ;
__p += '\r\n\r\n</div>\r\n\r\n<div style="clear: both"></div>\r\n\r\n<div class="invoice">\r\n\r\n\t<div class="invoice-content">\r\n\r\n\t\t<div class="animation-wrapper">\t\t\t\r\n\t\t\r\n\t\t\t<div class="invoice-header">\r\n\t\t\t\t\r\n\t\t\t\t\t\t\t<!-- <div class="item" id="invoice-number">\r\n\t\t\t\t\t\t\t\t<div class="description">Factuurnr.</div>\r\n\t\t\t\t\t\t\t\t<div class="value"> ' +
((__t = ( quote.invoice_number || "n.t.b." )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div> -->\r\n\r\n\t\t\t\t\t\t\t<div class="item" id="debtor">\r\n\t\t\t\t\t\t\t\t<div class="description">Debiteur</div>\r\n\t\t\t\t\t\t\t\t<div class="value">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<!-- status field -->\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t';
 if (quote.isAccepted === true) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<div class="item" id="status"><div class="description">Status</div>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="value myAPP-tooltip info" data-tooltip="Deze offerte is geaccepteerd op ' +
((__t = ( myAPP.templateHelpers.parseDate(quote.modified) )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.thumbsup )) == null ? '' : __t) +
'</span><div class="text">geaccepteerd</div></div>\t\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t';
 } else if (quote.status === "send") { ;
__p += '\r\n\t\t\t\t\t\t\t\t<div class="item" id="status"><div class="description">Status</div>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="value myAPP-tooltip" data-tooltip="Deze offerte is verzonden op ' +
((__t = ( myAPP.templateHelpers.parseDate(quote.modified) )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.sent )) == null ? '' : __t) +
'</span><div class="text">verzonden</div></div>\t\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t';
 } else if (quote.status === "approved" || quote.status === "sending") { ;
__p += '\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t';
 if (quote.daysUntilSend > 0) { ;
__p += ' \r\n\t\t\t\t\t\t\t\t<div class="item" id="status"><div class="description">Status</div>\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<div class="value myAPP-tooltip" data-tooltip="Deze factuur wordt verstuurd over ' +
((__t = ( quote.daysUntilSend )) == null ? '' : __t) +
' dagen"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.time )) == null ? '' : __t) +
'</span><div class="text">' +
((__t = ( quote.daysUntilSend )) == null ? '' : __t) +
' dagen</div></div>\t\r\n\t\t\t\t\t\t\t\t\t</div>\t\t\r\n\t\t\t\t\t\t\t\t';
 } else {  ;
__p += '\r\n\t\t\t\t\t\t\t\t<div class="item" id="status"><div class="description">Status</div>\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<div class="value"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.hourglass )) == null ? '' : __t) +
'</span><div class="text">verzenden...</div></div>\t\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\t\r\n\t\t\t\t\t\t \t';
 } ;
__p += '\r\n\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div class="boxes">\r\n\r\n\t\t\t\t<div class="box">\t\t\t\t\r\n\r\n\t\t\t\t\t<div class="list list-nostyle" id="invoice-details">\r\n\r\n\t\t\t\t\t\t<!-- <li class="list-header">factuurgegevens</li>\t -->\r\n\r\n\t\t\t\t\t\t';
 _.each(_.pick(quote, ['date', 'delivery_method', 'payment_term', 'dueDate']), function (value, key) {  ;
__p += '\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t';
 if (key === "date" || key === "dueDate") value = myAPP.templateHelpers.parseDate(value); ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 if (key === "payment_term") { key = "accept_term"; value = value + " dagen"; } ;
__p += '\r\n\r\n\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t<div class="key" id="' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t';
 });  ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 if (quote.reference) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<div class="key">' +
((__t = ( myAPP.texts.keys["reference"] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t<div class="value reference"%>' +
((__t = ( quote.reference )) == null ? '' : __t) +
'</div>\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 if (quote.status === "payed" && payment) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="pay_date">\r\n\t\t\t\t\t\t\t\t<div class="key" id="pay_date">' +
((__t = ( myAPP.texts.keys["pay_date"] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t<div class="value pay_date">' +
((__t = ( payment && myAPP.templateHelpers.parseDate(payment.get("created")) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 } else if (quote.status === "objection") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t';
 var objection = myAPP.objections.findWhere({ invoice_id: quote.id }); ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="objectionDate">\r\n\t\t\t\t\t\t\t\t<div class="key" id="objectionDate">' +
((__t = ( myAPP.texts.keys["objectionDate"] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t<div class="value objectionDate">' +
((__t = ( myAPP.templateHelpers.parseDate(objection.get( "created" )) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="box box-right" id="debtor-details">\r\n\t\t\t\r\n\t\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t\t<!-- <li class="list-header">debiteurgegevens</li>\t -->\r\n\r\n\t\t\t\t\t\t';
 	if (debtor) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t';
 _.each(_.pick(debtor, ['company_name', 'address', 'debtors_email', 'city', 'country']), function (value, key) {  ;
__p += '\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t<div class="key" id="<' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t<div class="value ' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t';
 });  ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 } else {  ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.warning )) == null ? '' : __t) +
'</span>ERROR!</h2>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t</div>\t\r\n\t\r\n\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t\t<div class="invoice-lines"></div>\r\n\r\n\t\t\t';
 if (quote.content) { ;
__p += '\r\n\r\n\t\t\t\t<div class="caption">\t\t\t\t\t\r\n\r\n\t\t\t\t\t<div class="textarea">' +
((__t = ( quote.content )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t<div class="totals">\r\n\t\t\t\t\t\r\n\t\t\t\t';
 if (vatLiable === "ja") {  ;
__p += '\r\n\r\n\t\t\t\t\t<div class="sub-total">\r\n\t\t\t\t\t\t<span class="text">Totaal excl. btw ' +
((__t = ( vat )) == null ? '' : __t) +
'</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( quote.total_exc_vat ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n                    \r\n                    ';
 for (var vat in quote.vatTotals) { ;
__p += '                    \r\n                    \t<div class="sub-total">\r\n                    \t\t<span class="text">Btw ' +
((__t = ( vat )) == null ? '' : __t) +
'</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( quote.vatTotals[vat] ) )) == null ? '' : __t) +
'</span>\r\n                    \t</div>\r\n                    ';
 } ;
__p += '\r\n                    <div class="sub-total total" id="total_inc_vat">\r\n                    \t<span class="text">Totaal incl. btw</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( quote.total_inc_vat ) )) == null ? '' : __t) +
'</span>\r\n                    </div>\r\n\t\t\t\t\r\n\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="sub-total total" id="total_inc_vat">\r\n                    \t<span class="text">Totaal</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber( quote.total_inc_vat ) )) == null ? '' : __t) +
'</span>\r\n                    </div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="sub-total" id="due">\r\n\t\t\t\t\t\t<span class="text">Totaal</span> <span class="number">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(myAPP.templateHelpers.roundUp( quote.total_inc_vat, 2)) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div style="clear: both"></div>\r\n\t\t\t\r\n\t\t\t\t</div>\r\n\r\n\t\r\n\r\n</div>\r\n\r\n\r\n\t\r\n';

}
return __p
};

this["JST"]["templates/invoices/quotes-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="invoices-collection">\r\n\r\n\t<div>\r\n\t\t\r\n\t\t<h2 class="description"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.quote )) == null ? '' : __t) +
'</span>Offertes</h2>\r\n\r\n\t\t<div class="table-controls">\r\n\t\t\t\t\t\r\n\t\t\t\t<ul class="controls page-controls button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pageControls )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t<li id="previous-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t<li><div class="animation-wrapper"><span id="current-page">' +
((__t = ( collection.currentPage + 1 )) == null ? '' : __t) +
'</span></div><span>/</span><span id="total-pages">' +
((__t = ( collection.totalPages )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t\t<li id="next-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t</ul>\t\t\t\t\r\n\t\r\n\t\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t</div> \r\n\r\n\t\t<div class="button button-blue myAPP-tooltip" id="new" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.newInvoice )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.quote )) == null ? '' : __t) +
'</span><span class="text">Nieuwe offerte</span></div>\r\n\r\n\t\t<div class="table table-invoices">\r\n\t\t\t\r\n\t\t\t\t<div class="table-header table-row">\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<!-- ids should match the sortable attributes on the models -->\r\n\t\t\t\t\t\t\t<div class="table-cell" id="icon">\r\n\t\t\t\t\t\t\t</div>\r\n<!-- \r\n\t\t\t\t\t\t\t<div id="invoice_number" class="table-cell sort-handle">\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<span>#</span>\r\n\t\t\t\t\t\t\t</div> -->\r\n\r\n\t\t\t\t\t\t\t<div id="debtor" class="table-cell sort-handle">\r\n\t\t\t\t\t\t\t\t<span>Debiteur</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div id="date" class="table-cell sort-handle">\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<span>Datum</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div id="status" class="table-cell sort-handle">\r\n\t\t\t\t\t\t\t\t<span>Status</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div id="total_inc_vat" class="table-cell sort-handle last-child">\r\n\t\t\t\t\t\t\t\t<span>Bedrag</span>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="table-body paginate-page">\r\n\r\n\t\t\t\t';
 if (collection.length > 0) { ;
__p += '\r\n\r\n\t\t\t\t\t';
 collection.each(function (invoice) { 
						var debtor = myAPP.debtors.findWhere({ id: invoice.get( "account_debtor_id" ) }).getAttributes();
						invoice = invoice.getAttributes(); 						

					;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="table-row" id="' +
((__t = ( invoice.id )) == null ? '' : __t) +
'">\r\n\r\n\t\t\t\t\t\t\t\t<div class="table-cell" id="icon">\r\n\t\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.quote )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<!-- <div class="table-cell" id="invoice_number">\r\n\t\t\t\t\t\t\t\t\t<span>' +
((__t = ( invoice.invoice_number )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t</div> -->\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="table-cell" id="debtor">\r\n\t\t\t\t\t\t\t\t\t<span class="title">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="table-cell" id="date">\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<span class="date">' +
((__t = ( myAPP.templateHelpers.parseDate(invoice.date) )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div class="table-cell" id="status">\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t';
 if (invoice.isAccepted === true) { ;
__p += '\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<span class=\'label label-info\'><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.thumbsup )) == null ? '' : __t) +
'</span>Geaccepteerd</span> \r\n\t\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "due") { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t<span class=\'label label-warning\'><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.due )) == null ? '' : __t) +
'</span>over termijn</span>\r\n\t\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "send") { ;
__p += ' \t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t<span class=\'label\'><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.sent )) == null ? '' : __t) +
'</span>verzonden</span>\r\n\t\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "approved" || invoice.status === "sending") { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t';
 if (invoice.daysUntilSend > 0) { ;
__p += ' \r\n\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\'label label-no-label myAPP-tooltip\' data-tooltip="Deze factuur wordt verstuurd over ' +
((__t = ( invoice.daysUntilSend )) == null ? '' : __t) +
' dagen"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.time )) == null ? '' : __t) +
'</span></span>\r\n\r\n\t\t\t\t\t\t\t\t\t\t\t';
 } else {  ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\'label label-no-label myAPP-tooltip\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.sending )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.hourglass )) == null ? '' : __t) +
'</span>verzenden...</span>\t\r\n\r\n\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "paused") { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t<span class="label label-info"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.pause )) == null ? '' : __t) +
'</span>gepauzeerd</span>\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t\t';
 } else if (invoice.status === "draft" || invoice.status === "ready") { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t<span class="label label-disabled"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.edit )) == null ? '' : __t) +
'</span></span>\r\n\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="table-cell last-child" id="amount">\r\n\t\t\t\t\t\t\t\t\t<span class="amount">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(invoice.total_inc_vat) )) == null ? '' : __t) +
'</span>\t\t\t\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div style="clear: both"></div> \r\n\r\n\t\t\t\t\t';
 }); ;
__p += '\r\n\r\n\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="table-row placeholder">\r\n\r\n\t\t\t\t\t\t<h2>Geen offertes</h2>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t</div>\r\n\t\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/login/forgot-password.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="body-content">\r\n\r\n\t<div id="error-message" class="label label-large label-error"></div>\r\n\r\n\t<div id="forgot-password">\r\n\r\n\t\t<div class="text">' +
((__t = ( myAPP.texts.forgotPassword )) == null ? '' : __t) +
'</div>\r\n\r\n\t\t<div class="input-item">\r\n\t\t\t<label for="email">E-mail</label>\r\n\t\t\t<div class="input-prepend">\r\n\t\t\t\t<span class="input-icon entype">\r\n\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.email )) == null ? '' : __t) +
'\r\n\t\t\t\t</span>\r\n\t\t\t\t<input type="text" id="reset-email" placeholder="E-mail" value="">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class="button" id="reset-password"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.reset )) == null ? '' : __t) +
'</span><strong>Herstel wachtwoord</strong></div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/login/login.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="screen" id="login-screen">\r\n\t\t\t\t\t\r\n\t<div class="header"><h2>Login</h2></div>\r\n\r\n\t<div class="body">\r\n\r\n\t\t<div class="body-content">\r\n\r\n\t\t<div id="error-message" class="label label-large label-error"></div>\r\n\t\t\r\n\t\t\t<div id="login">\r\n\t\t\t\t\t\t\t\t\t\t\t\t \r\n\t\t\t\t<div class="input-item">\r\n\t\t\t\t\t<label for="email">E-mail</label>\r\n\t\t\t\t\t<div class="input-prepend">\r\n\t\t\t\t\t\t<span class="input-icon entype">\r\n\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.user )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t<input type="text" id="email" placeholder="E-mailadres">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="input-item">\r\n\t\t\t\t\t<label for="password">Wachtwoord</label>\r\n\t\t\t\t\t<div class="input-prepend">\r\n\t\t\t\t\t\t<span class="input-icon entype">\r\n\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.password )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t<input type="password" id="password" placeholder="Wachtwoord"><br>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<span id="forgot-password" class="link">Wachtwoord vergeten?</span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="button" id="sign-in"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.login )) == null ? '' : __t) +
'</div>Inloggen</div>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n<div class="footer">\r\n\t\t<span>Nog geen gebruiker van KasCo?</span> <div class="button" id="new-account"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.account )) == null ? '' : __t) +
'</div>Aanmelden</div>\r\n</div>\r\n\r\n\t\t';

}
return __p
};

this["JST"]["templates/login/multiple-accounts.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="body-content">\r\n\r\n\t<div id="error-message" class="label label-large label-error"></div>\r\n\r\n\t<div id="select-account">\r\n\r\n\t\t<div class="text">' +
((__t = ( myAPP.texts.multipleAccounts )) == null ? '' : __t) +
'</div>\r\n\r\n\t\t<div class="select">\r\n\r\n\t\t\t<div class="button myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="accounts" id="account">\r\n\t\t\t\t<span class="value">Kies account</span><span class="caret caret-small caret-down"></span></div>\r\n\r\n\r\n\t\t\t';
 if (isSuperAdmin) { ;
__p += '\r\n\t\t\t\t<div class="button" id="superadmin"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.user )) == null ? '' : __t) +
'</span>Superadmin</div>\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="button" id="login-with-account"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.login )) == null ? '' : __t) +
'</div>Inloggen</div>\t\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/login/off-session.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n\r\n<a href="https://kascooperatie.nl"><img src="/frontpage/images/logoklein.jpg" id="kasco-logo"></a>\r\n\r\n\t<div class="row">\r\n\t\t\r\n\t\t<div class="off-session-pane span6 offset3 "></div>\t\t\t\r\n\r\n\t</div>\r\n\t\r\n\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/login/on-session-superadmin.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="container" class="container">\r\n\r\n\t<div id="container-header">\r\n\r\n\t\t<a href="https://kascooperatie.nl/" target="_blank"><img src="/frontpage/images/logoklein.jpg" id="kasco-logo"></a>\r\n\t\t\t\t\r\n\t\t<div id="session-information">\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.user )) == null ? '' : __t) +
'</span>\r\n\t\t\t<span class="link" id="username">' +
((__t = ( user.name )) == null ? '' : __t) +
'</span>\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.logout )) == null ? '' : __t) +
'</span>\r\n\t\t\t<span class="link" id="logout"> Logout</span>\r\n\t\t</div>\r\n\t\t\t\r\n\t\t<div id="_account" class="navigation account" ><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.settings )) == null ? '' : __t) +
'</span> Account</div>\r\n\r\n\t\t<div id="toastview"></div>\r\n\r\n\t</div>\r\n\t\r\n\t<div id="container-body">\t\r\n\r\n\t\t<div id="navigation">\r\n\t\t\t\t\r\n\t\t\t\t<ul>\r\n\t\t\t\t\t<li id="__dashboard" class="navigation dashboard selected"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.dashboard )) == null ? '' : __t) +
'</span> Dashboard</li>\r\n\t\t\t\t\t<li id="__accounts" class="navigation facturen"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.account )) == null ? '' : __t) +
'</span> Accounts</li>\r\n\t\t\t\t\t<li id="__search" class="navigation debiteuren"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.search )) == null ? '' : __t) +
'</span> Zoeken</li>\r\n\t\t\t\t\t\r\n\t\t\t\t</ul>\r\n\t\t</div>\t\r\n\t\t\r\n\t\t<div id="mainpane"></div>\r\n\r\n\t</div>\r\n\r\n</div>\r\n\r\n\r\n';

}
return __p
};

this["JST"]["templates/login/on-session.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="container" class="container">\r\n\t\r\n\t<div id="container-header">\r\n\r\n\t\t<a href="https://kascooperatie.nl/" target="_blank"><img src="/frontpage/images/logoklein.jpg" id="kasco-logo"></a>\r\n\t\t\t\t\r\n\t\t<div id="session-information">\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.company )) == null ? '' : __t) +
'</span>\r\n\t\t\t<span class="link" id="accountname">' +
((__t = ( accountTitle )) == null ? '' : __t) +
'</span>\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.user )) == null ? '' : __t) +
'</span>\r\n\t\t\t<span class="link" id="username">' +
((__t = ( user.name )) == null ? '' : __t) +
'</span>\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.logout )) == null ? '' : __t) +
'</span>\r\n\t\t\t<span class="link" id="logout"> Logout</span>\r\n\t\t</div>\r\n\t\t\t\r\n\t\t<div id="_account" class="navigation" ><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.settings )) == null ? '' : __t) +
'</span> Account</div>\r\n\r\n\t\t';
 if (isGuestUser) { ;
__p += '\r\n\t\t\r\n\t\t\t<div id="signup-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.account )) == null ? '' : __t) +
'</div>Meld je nu direct aan</div>\r\n\r\n\t\t';
 } ;
__p += '\r\n\r\n\t</div>\r\n\r\n\t<div id="container-body">\r\n\r\n\t\t<div id="navigation">\r\n\t\t\t\t\r\n\t\t\t\t<ul>\r\n\t\t\t\t\t<!-- to prevent autoscroll, ids need to have a name different from the hash they navigate to -->\r\n\t\t\t\t\t<li id="_dashboard" class="navigation selected"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.dashboard )) == null ? '' : __t) +
'</span>Dashboard</li>\r\n\t\t\t\t\t<li id="_facturen" class="navigation"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoices )) == null ? '' : __t) +
'</span>Facturen</li>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="sub-menu" id="_facturen">\r\n\t\t\t\t\t\t<span class="sub-link" id="_facturen">Facturen</span >\r\n\t\t\t\t\t\t<span class="sub-link" id="_periodieken">Periodieken</span >\r\n\t\t\t\t\t\t<span class="sub-link" id="_offertes">Offertes</a>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<li id="_debiteuren" class="navigation"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</span>Debiteuren</li>\r\n\r\n\t\t\t\t\t<div class="sub-menu" id="_debiteuren">\r\n\t\t\t\t\t\t<span class="sub-link" id="_debiteuren">Debiteuren</span>\r\n\t\t\t\t\t\t<span class="sub-link" id="_bezwaren">Bezwaren</span>\r\n\t\t\t\t\t\t<span class="sub-link" id="_betalingsregelingen">Betalingsregelingen</span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<li id="_betalingen" class="navigation"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>Betalingen</li>\r\n\t\t\t\t\t<li id="_artikelen" class="navigation"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span>Artikelen</li>\r\n\r\n\t\t\t\t\t<div id="help-function">\t\r\n\r\n\t\t\t\t\t<li id="help"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.help )) == null ? '' : __t) +
'</span>Help</li>\r\n\t\t\t\t\t\t<a class=\'tutorial\' data-tutorial=\'introduction\'>Rondleiding</a> \r\n\t\t\t\t\t\t<a class=\'tutorial\' data-tutorial=\'newInvoice\'>Hoe maak ik een factuur?</a> \r\n\t\t\t\t\t\t<a class=\'tutorial\' data-tutorial=\'creditInvoice\'>Hoe maak ik een creditfactuur?</a>\r\n\t\t\t\t\t\t<a class=\'tutorial\' data-tutorial=\'newDebtor\'>Hoe voer ik een nieuwe debiteur in?</a>\r\n\t\t\t\t\t\t<a class=\'tutorial\' data-tutorial=\'newPayment\'>Hoe boek ik een betaling?</a>\r\n\t\t\t\t\t</div>\t\r\n\t\t\t\t\t\r\n\t\t\t\t</ul>\r\n\t\t</div>\r\n\r\n\t\t<div id="mainpane">\r\n\t\t\t\t\r\n\t\t</div>\r\n\r\n\t\t<div id="master-search">\r\n\t\t\t\t<input type="text">\t\t\r\n\t\t\t\t<div class="placeholder"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.search )) == null ? '' : __t) +
'</div>zoek op factuur, debiteur...</div>\r\n\t\t\t</div>\r\n\t\t\r\n\t\t\r\n\r\n\t</div>\r\n\r\n</div>\r\n\r\n\r\n';

}
return __p
};

this["JST"]["templates/login/reset-complete.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="body-content">\r\n\r\n\t<div id="error-message" class="label label-large label-error"></div>\r\n\r\n\t<div id="forgot-password">\r\n\r\n\t\t<div class="text">' +
((__t = ( myAPP.texts.passwordComplete )) == null ? '' : __t) +
'</div>\r\n\t\r\n\t\t<div class="button" id="sign-in"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.login )) == null ? '' : __t) +
'</div>Inloggen</div>\t\t\t\t\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/login/signup.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="screen" id="signup-screen">\r\n\t\t\t\r\n\t<div class="header"><h2>Aanmelden</h2></div>\r\n\t<div class="body">\r\n\r\n\t<div class="body-content">\r\n\r\n\t\t<div class="text">' +
((__t = ( myAPP.texts.signup )) == null ? '' : __t) +
'</div>\r\n\t\t<div id="error-message" class="label label-large label-error"></div>\r\n\r\n\t\t<div class="input-item">\r\n\t\t\t<label for="inputEmail">Bedrijfsnaam</label>\r\n\t\t\t<div class="input-prepend">\r\n\t\t\t\t<span class="input-icon entype">\r\n\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.suitcase )) == null ? '' : __t) +
'\r\n\t\t\t\t</span>\r\n\t\t\t\t<input type="text" id="account-title" placeholder="Bedrijfsnaam" value="">\r\n\t\t\t</div>\r\n\t\t</div>\t\r\n\t\t\t\t\t\t\t\t \r\n\t\t<div class="input-item">\r\n\t\t\t<label for="inputEmail">E-mail</label>\r\n\t\t\t<div class="input-prepend">\r\n\t\t\t\t<span class="input-icon entype">\r\n\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.sent )) == null ? '' : __t) +
'\r\n\t\t\t\t</span>\r\n\t\t\t\t<input type="text" id="email" placeholder="E-mailadres" value="">\r\n\t\t\t</div>\r\n\t\t</div>\t\t\t\t\t\t\r\n\r\n\t\t<!-- <div class="input-item">\r\n\t\t\t<label for="inputEmail">Bevestig e-mail</label>\r\n\t\t\t<div class="input-prepend">\r\n\t\t\t\t<span class="input-icon entype">\r\n\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.sent )) == null ? '' : __t) +
'\r\n\t\t\t\t</span>\r\n\t\t\t\t<input type="text" id="confirm-email" placeholder="Bevestig e-mailadres" value="">\r\n\t\t\t</div>\r\n\t\t</div>\t -->\r\n\t\t\r\n\t\t<div class="button" id="signup"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.thumbsup )) == null ? '' : __t) +
'</span>Meld aan</div>\r\n\t\r\n\t</div>\r\n\r\n\t</div>\r\n\r\n</div>\r\n\r\n\r\n\t\t\t\t\r\n\r\n\t\t';

}
return __p
};

this["JST"]["templates/login/verify.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="screen" id="verify-screen">\r\n\t\t\t\r\n\t<div class="header"><h2>Wachtwoord</h2></div>\r\n\r\n\t<div class="body">\r\n\r\n\t<div class="body-content">\r\n\r\n\t\t\t<div class="text"> ' +
((__t = ( myAPP.texts.choosePassword )) == null ? '' : __t) +
'\r\n\t\t\t\t<div class="google-tip label label-large label-info"><a href="https://www.youtube.com/watch?feature=player_embedded&v=0RCsHJfHL_4" target="_blank">Klik hier voor tips van Google voor een veilig wachtwoord.</a> </div>\r\n\t\t\t\r\n\t\t\t\t\r\n\t\t\t</div>\r\n\r\n\t\t\t<div id="error-message" class="label label-large label-error"></div>\r\n\t\t\t\t\t\t\t\t \r\n\t\t\t<div class="input-item">\r\n\t\t\t\t<label for="password">Wachtwoord</label>\r\n\t\t\t\t<div class="input-prepend">\r\n\t\t\t\t\t<span class="input-icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.password )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t<input type="password" id="password" placeholder="' +
((__t = ( myAPP.texts.yourPassword )) == null ? '' : __t) +
'" value="">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="input-item">\r\n\t\t\t\t<label for="confirm-password">Herhaal</label>\r\n\t\t\t\t<div class="input-prepend">\r\n\t\t\t\t\t<span class="input-icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.password )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t<input type="password" id="confirm-password" placeholder="' +
((__t = ( myAPP.texts._confirmPassword )) == null ? '' : __t) +
'" value="">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\r\n\t\t\t<div class="button" id="verify"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.thumbsup )) == null ? '' : __t) +
'</span><strong>Bevestig</strong></div>\r\n\r\n\t\t</div>\r\n\t\r\n\t</div>\r\n</div>\r\n\r\n\r\n\t\t\t\t\r\n\r\n\t\t';

}
return __p
};

this["JST"]["templates/payments/new-payment.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="new-payment-view">\r\n\r\n\t<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</div>Betaling</h2>\r\n\r\n\t<div class="payment">\r\n\t\t\t\r\n\t\t<div class="head">\r\n\r\n\t\t\t<div class="item" id="date">\r\n\t\t\t\t<div class="description">Datum</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( myAPP.templateHelpers.parseDate(payment.payment_date) )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div class="item" id="debtor">\r\n\t\t\t\t<div class="description">Debiteur</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\r\n\r\n\r\n\t\t\t<div class="item" id="amount">\r\n\t\t\t\t<div class="description">Bedrag</div>\r\n\t\t\t\t<div class="value"><div class="text">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(0) )) == null ? '' : __t) +
'</div></div>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\r\n\t\t<div class="body">\r\n\r\n\t\t\t<div class="left-column">\r\n\r\n\t\t\t\t<div class="list list-nostyle">\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>Betaling</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="list list-nostyle">\t\t\t\t\r\n\r\n\t\t\t\t\t<div class="list-item" id="invoice_id">\r\n\r\n\t\t\t\t\t\t<label class="key">' +
((__t = ( myAPP.texts.keys["invoice"] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t<input type="text">\t\t\t\t\r\n\t\t\t\t\t\t<div class="placeholder"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.search )) == null ? '' : __t) +
'</div>zoek een factuur</div>\r\n\r\n\t\t\t\t\t</div>\t\r\n\t\t\t\t\r\n\t\t\t\t\t<div class="list-item" id="payment_date">\r\n\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t<label class="key">' +
((__t = ( myAPP.texts.keys["payment_date"] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t<div class="value"><input type="text" id="date-picker" value=""></div>\t\t\t\t\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="list-item" id="payment_type">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<label class="key">' +
((__t = ( myAPP.texts.keys["payment_type"] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t<div class="button button-small myAPP-tooltip myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="payment-types" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.paymentType )) == null ? '' : __t) +
'" id="type">\t\r\n\t\t\t\t\t\t\t<span class="value">' +
((__t = ( payment.payment_type || "Overboeking" )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span> \r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="list-item" id="amount">\r\n\r\n\t\t\t\t\t\t<label class="key">' +
((__t = ( myAPP.texts.keys["_amount"] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t<input type="text" name="amount" value="' +
((__t = ( myAPP.constants.currencyMarker + " " + 
							myAPP.templateHelpers.parseNumber(0) )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t</div>\t\t\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="right-column">\r\n\t\r\n\t\t\t\t<div class="list list-nostyle">\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>Factuur</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div id="invoice-details">\t\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t\t';
 if (invoice) { ;
__p += '\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<div class="key">Nummer</div>\r\n\t\t\t\t\t\t\t\t<div class="value">' +
((__t = ( invoice.invoice_number )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<div class="key">Datum</div>\r\n\t\t\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.templateHelpers.parseDate(invoice.date) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<div class="key">Bedrag</div>\r\n\t\t\t\t\t\t\t\t<div class="value bold">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.total_inc_vat || 0) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t';
 if (invoice.paymentsTotal) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="payments-total">\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="key">Reeds betaald</div>\r\n\t\t\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.paymentsTotal) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t';
 if (invoice.creditInvoicesTotal) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="total-credited">\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="key">Gecrediteerd</div>\r\n\t\t\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.creditInvoicesTotal) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t';
 if (invoice.extra_costs) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="extra-costs">\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="key">Incassokosten</div>\r\n\t\t\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.extra_costs) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item" id="total">\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="key">Totaal verschuldigd</div>\r\n\t\t\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber((invoice.totalDue + invoice.extra_costs) || 0) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item placeholder">\r\n\t\t\t\t\t\t\t\t<h4>Geen factuur gekozen</h4>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 } ;
__p += '\t\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t\t</div>\t\t\t\t\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="buttons buttons-small">\r\n\t\t\t\t<div class="button button-disabled myAPP-tooltip" data-tooltip="Betaling opslaan" id="save"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\t\t\t\t\r\n\t\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/payments/payment.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="payment-view">\r\n\r\n\t<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</div>Betaling</h2>\r\n\r\n\t<div class="payment">\r\n\t\r\n\t\t<div class="head">\r\n\r\n\t\t\t<div class="item" id="date">\r\n\t\t\t\t<div class="description">Betaaldatum</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( myAPP.templateHelpers.parseDate(payment.payment_date) )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div class="item myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.showDebtor)) == null ? '' : __t) +
'" id="debtor">\r\n\t\t\t\t<div class="description">Debiteur</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( debtor.company_name )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\r\n\r\n\r\n\t\t\t<div class="item" id="amount">\r\n\t\t\t\t<div class="description">Bedrag</div>\r\n\t\t\t\t<div class="value"><div class="text">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(payment.amount) )) == null ? '' : __t) +
'</div></div>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="body">\t\t\t\r\n\t\t\t\r\n\t\t\t<div class="left-column">\r\n\r\n\t\t\t\t<div class="list list-nostyle">\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoice )) == null ? '' : __t) +
'</span>Factuur</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="list list-nostyle myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.showInvoice )) == null ? '' : __t) +
'" id="invoice-details">\r\n\t\t\t\t\t\r\n\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t<div class="key">Nummer</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( invoice.invoice_number || "&nbsp;" )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t<div class="key">Datum</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.templateHelpers.parseDate(invoice.date) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t</div>\t\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t<div class="key">Bedrag</div>\r\n\t\t\t\t\t\t<div class="value bold">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.total_inc_vat) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t';
 if (invoice.paymentsTotal) { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="key">Reeds betaald</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.paymentsTotal) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t';
 if (invoice.creditInvoicesTotal) { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="key">Gecrediteerd</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.creditInvoicesTotal) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t';
 if (invoice.extra_costs) { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="key">Incassokosten</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.constants.currencyMarker + " " + myAPP.templateHelpers.parseNumber(invoice.extra_costs) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="right-column">\r\n\r\n\t\t\t\t<div class="list list-nostyle">\r\n\t\t\t\t\t<div class="list-header"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.list )) == null ? '' : __t) +
'</span>Gegevens betaling</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t<div class="list list-nostyle" id="payment-details">\r\n\t\t\r\n\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t<div class="key">Datum</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.templateHelpers.parseDate(payment.payment_date) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t</div>\t\r\n\t\t\t\t\t\r\n\r\n\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t<div class="key">Tijdstip</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( myAPP.templateHelpers.parseTime(payment.modified) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t</div>\t\r\n\r\n\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t<div class="key">Type</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( payment.type )) == null ? '' : __t) +
'</div>\t\t\t\t\t\r\n\t\t\t\t\t</div>\t\t\t\t\t\r\n\t\t\r\n\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t<div class="key">Beschrijving</div>\r\n\t\t\t\t\t\t<div class="value">' +
((__t = ( payment.description )) == null ? '' : __t) +
'</div>\t\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/payments/payments-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="payments-collection">\r\n\r\n\t<div>\r\n\r\n\r\n\r\n\t\t<h2 class="description"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>Betalingen</h2>\r\n\r\n\t\t<div class="table-controls">\r\n\t\t\t\t\t\r\n\t\t\t<ul class="controls page-controls button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pageControls )) == null ? '' : __t) +
'">\r\n\t\t\t\t<li id="previous-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t<li><div class="animation-wrapper"><span id="current-page">' +
((__t = ( collection.currentPage + 1 )) == null ? '' : __t) +
'</span></div><span>/</span><span id="total-pages">' +
((__t = ( collection.totalPages )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t<li id="next-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t</ul>\r\n\r\n\t\t\t<div style="clear: both"></div>\t\t\t\t\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="button button-blue myAPP-tooltip" id="new" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.newPayment )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span><span class="text">Nieuwe betaling</span></div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div>\r\n\r\n\t\t\t<div class="table table-payments">\r\n\t\t\t\r\n\t\t\t\t<div class="table-header table-row">\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<!-- ids should match the sortable attributes on the models -->\r\n\t\t\t\t\t\t\t<div class="table-cell" id="icon">\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div id="debtor_name" class="table-cell sort-handle">\r\n\t\t\t\t\t\t\t\t<span>Debiteur</span>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div id="invoice_number" class="table-cell sort-handle">\r\n\t\t\t\t\t\t\t\t<span>Nr.</span>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div id="payment_date" class="table-cell sort-handle">\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<span>Betaaldatum</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div id="type" class="table-cell sort-handle">\r\n\t\t\t\t\t\t\t\t<span>Betaalwijze</span>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div id="amount" class="table-cell sort-handle">\r\n\t\t\t\t\t\t\t\t<span>Bedrag</span>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="table-body paginate-page">\r\n\r\n\t\t\t\t';
 if (collection.length > 0) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t';
 collection.each(function (payment, index) { 								

								var debtor = (payment.debtor || new myAPP.models.Debtor()).getAttributes(),							
									invoice = (payment.invoice || new myAPP.models.Invoice()).getAttributes();

								payment = payment.getAttributes(); 

							;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="table-row" id="' +
((__t = ( payment.id )) == null ? '' : __t) +
'">\r\n\r\n\t\t\t\t\t\t\t\t<div class="table-cell" id="icon">\r\n\t\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t<div class="table-cell" id="debtor_name">\r\n\t\t\t\t\t\t\t\t\t<span class="name">' +
((__t = ( debtor.company_name || "" )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div class="table-cell" id="invoice_number">\r\n\t\t\t\t\t\t\t\t\t<span class="invoice_number">' +
((__t = ( invoice.invoice_number )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="table-cell" id="payment_date">\r\n\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<span class="created">' +
((__t = ( myAPP.templateHelpers.parseDate(payment.payment_date) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<!-- <div class="table-cell" id="status">\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t';
 if (payment.status === "ready") { ;
__p += '\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<span class=\'label label-success\'><span class=\'entype\'>&#x2713</span>voldaan</span> \r\n\t\t\t\t\t\t\t\t\t';
 } else if (payment.status === "overtime") { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t<span class=\'label label-warning\'><span class=\'entype\'>&#x26a0</span>over termijn</span>\r\n\t\t\t\t\t\t\t\t\t';
 } else if (payment.status === "draft") { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t<span class="label label-disabled"><span class="entype">&#x270E;</span>concept</span>\r\n\t\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t</div> -->\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class="table-cell" id="type">\r\n\t\t\t\t\t\t\t\t\t<span class="type">' +
((__t = ( payment.type )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div class="table-cell" id="amount_payed">\r\n\r\n\t\t\t\t\t\t\t\t\t<span class="amount">' +
((__t = ( myAPP.constants.currencyMarker )) == null ? '' : __t) +
' ' +
((__t = ( myAPP.templateHelpers.parseNumber(payment.amount) )) == null ? '' : __t) +
'</span>\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<!-- <div style="clear: both"></div> -->\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t';
 }); ;
__p += '\r\n\r\n\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t<div class="table-row placeholder">\r\n\r\n\t\t\t\t\t\t<h2>Geen betalingen</h2>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t</div>\r\n\t\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/payments/payments.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n<div class="mainPaneWrapper payments-view">\r\n\t\r\n\t<div class="header">\r\n\t\t<h2>Betalingen</h2>\r\n\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>\r\n\r\n\t</div>\r\n\r\n\t<div class="pane payments-pane">\r\n\r\n\t</div>\t\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/account-wizard-content-0.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="body account-wizard-content-0">\r\n\r\n\t<div class="left-column">\t\t\t\t\t\t\r\n\t\t<p>' +
((__t = ( myAPP.texts.accountWizard["1a"] )) == null ? '' : __t) +
'</p>\r\n\t\t<p>' +
((__t = ( myAPP.texts.accountWizard["1b"] )) == null ? '' : __t) +
'</p>\t\r\n\r\n\t\t<a id="dont-show-wizard">Klik om deze stappen niet meer weer te geven</a>\r\n\t</div>\r\n\r\n\t<div class="right-column">\t\t\t\t\t\t\r\n\t\t<img src="img/wizard-content-0.jpg">\r\n\t</div>\t\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/account-wizard-content-1.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="body account-wizard-content-1">\r\n\r\n\t<div class="left-column">\r\n\r\n\t\t<p>' +
((__t = ( myAPP.texts.accountWizard["2"] )) == null ? '' : __t) +
'</p>\r\n\r\n\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t';
 _.each(_.pick(account, ['title', 'email', 'address', 'zipcode', 'city', 'country']), function (value, key) { ;
__p += '\r\n\r\n\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\r\n\t\t\t\t';
 if (key === "country") { ;
__p += '\r\n\r\n\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="countries" id="country">\r\n\t\t\t\t\t\t<span class="value">' +
((__t = ( value )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span></div>\t\r\n\r\n\t\t\t\t';
  } else { ;
__p += ' \r\n\t\t\t\t\t\r\n\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( key === "vat_number" ? myAPP.texts.keys["vat_short"] : myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\r\n\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\r\n\r\n\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t</div>\t\r\n\r\n\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n\t<div class="right-column">\r\n\t\t<img src="img/wizard-content-1.jpg">\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/account-wizard-content-2.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="body account-wizard-content-2">\r\n\r\n\t<div class="left-column">\r\n\r\n\t\t<p>' +
((__t = ( myAPP.texts.accountWizard["3a"] )) == null ? '' : __t) +
'</p>\r\n\t\t\r\n\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t';
 _.each(_.pick(account, ['kvk_number', 'bank_account']), function (value, key) { ;
__p += '\r\n\r\n\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\r\n\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( key === "vat_number" ? myAPP.texts.keys["vat_short"] : myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\r\n\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" ></div>\r\n\r\n\t\t\t</div>\t\r\n\r\n\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t</div>\r\n\t\t\r\n\t\t<p>' +
((__t = ( myAPP.texts.accountWizard["3b"] )) == null ? '' : __t) +
'</p>\r\n\r\n\t\t<div id="vat_liable">\r\n\r\n\t\t\t<div class="option"><input type="radio" value="1" name="vat_liable" id="yes"><label class="radio" for="yes" >Ja</label></div>\r\n\t\t\t<div class="option"><input type="radio" value="0" name="vat_liable" id="no"><label class="radio" for="no">Nee</label></div>\r\n\t\t\r\n\t\t</div>\r\n\r\n\t\t<div class="vat_number">\r\n\t\t\t<p>' +
((__t = ( myAPP.texts.accountWizard["3c"] )) == null ? '' : __t) +
'</p>\r\n\r\n\t\t\t<div class="list list-nostyle">\r\n\t\t\t\t<div class="list-item" id="vat_number">\r\n\r\n\t\t\t\t\t<label class="key"  for="_vat_number">' +
((__t = ( myAPP.texts.keys["vat_number"] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\r\n\t\t\t\t\t<div class="background-wrapper"><input type="text" name="vat_number" id="_vat_number" value="';
 if (account.vat_number) print(account.vat_number) ;
__p += '" ></div>\r\n\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n\t<div class="right-column">\r\n\t\t<img src="img/wizard-content-3.jpg">\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/account-wizard-content-3.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="body account-wizard-content-3">\r\n\r\n\t<div class="left-column">\r\n\r\n\t\t<div class="upload-image">\r\n\r\n\t\t\t<div class="drop-area">\r\n\r\n\t\t\t\t<div class="image-holder"></div>\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t<div class="placeholder">\r\n\t\t\t\t\t';
 if (window.FileReader && window.Modernizr.draganddrop) { ;
__p += '\r\n\t\t\t\t\t<div class="text">Sleep afbeelding hier</div>\r\n\t\t\t\t\t<div class="text margin-top">of</div>\t\t\t\r\n\t\t\t\t\t';
 } ;
__p += ' \r\n\t\t\t\t</div>\t\t\t\t\t\t\r\n\t\t\t\t\t\r\n\t\t\t\t<div class="button button-small myAPP-tooltip" id="select-file" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.fileSelect )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.upload )) == null ? '' : __t) +
'</span>' +
((__t = ( myAPP.texts.selectFile )) == null ? '' : __t) +
'\r\n\t\t\t\t\t<input type="file" name="files[]" multiple>\r\n\t\t\t\t</div>\t\t\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n\t<div class="right-column">\r\n\t\t<p>' +
((__t = ( myAPP.texts.accountWizard["4"] )) == null ? '' : __t) +
'</p>\r\n\t\t<img src="img/wizard-content-2.jpg">\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/account-wizard-content-4.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="body account-wizard-content-4">\r\n\r\n\t<p>' +
((__t = ( myAPP.texts.accountWizard["5a"] )) == null ? '' : __t) +
'</p>\r\n\r\n\t<div id="kasco_payment">\r\n\r\n\t\t<div class="left-column">\r\n\t\t\t\r\n\t\t\t<div>\r\n\t\t\t\t\r\n\t\t\t\t<div class="option">\r\n\t\t\t\t\t<img src="img/wizard-content-4a.jpg">\r\n\t\t\t\t\t<div class="checkbox">\r\n\t\t\t\t\t\t<input type="radio" name="kasco_payment" value="1">\r\n\t\t\t\t\t\t<label class="radio">Via KasCo</label>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<p class="small">' +
((__t = ( myAPP.texts.accountWizard["5b"] )) == null ? '' : __t) +
'</p>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="right-column">\r\n\r\n\t\t\t<div>\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t<div class="option">\r\n\t\t\t\t\t<img src="img/wizard-content-4b.jpg">\r\n\t\t\t\t\t<div class="checkbox">\r\n\t\t\t\t\t\t<input type="radio" name="kasco_payment" value="0">\r\n\t\t\t\t\t\t<label class="radio">Via uzelf</label>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<p class="small">' +
((__t = ( myAPP.texts.accountWizard["5c"] )) == null ? '' : __t) +
'</p>\r\n\t\t\t</div>\r\n\t\t\t\t\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/account-wizard-content-5.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="body account-wizard-content-6">\r\n\r\n\t<div class="left-column">\t\r\n\t\t<img src="img/wizard-content-5.jpg">\t\t\t\r\n\t\t\r\n\t</div>\r\n\r\n\t<div class="right-column">\t\t\t\t\t\t\t\t\r\n\t\t<p>' +
((__t = ( myAPP.texts.accountWizard["6"] )) == null ? '' : __t) +
'</p>\t\r\n\t\t\r\n\t\t<div class="button">\r\n\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.approve )) == null ? '' : __t) +
'</span>Aan de slag\r\n\t\t</div>\r\n\r\n\t</div>\t\t\t\t\t\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/account-wizard.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="account-wizard" class="popup">\r\n\r\n\t<div class="content">\r\n\r\n\t\t<div class="wrapper">\r\n\r\n\t\t\t<div class="animation-wrapper">\r\n\t\t\t\r\n\t\t\t\t<div class="head">\r\n\r\n\t\t\t\t\t<ul>\r\n\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t<h2><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.address )) == null ? '' : __t) +
'</span><span class="text">Welkom bij KasCo</span></h2>\t\t\t\t\t\r\n\t\t\t\t\t\t</li>\t\t\r\n\r\n\t\t\t\t\t</ul>\r\n\r\n\t\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\r\n\r\n\t\t\t\t</div>\t\t\t\t\r\n\r\n\t\t\t\t<div class="body account-wizard-content-0">\t\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="navigation">\r\n\t\t\t\t\t<div class="button" id="previous"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow )) == null ? '' : __t) +
'</span><span class="text">Terug</span></div>\r\n\t\t\t\t\t<span class="number" id="total">1</span> <span class="separator">van</span> <span class="number">6</span>\r\n\t\t\t\t\t<div class="button" id="next"><span class="text">Volgende</span><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow )) == null ? '' : __t) +
'</span></div>\r\n\t\t\t\t\t<a id="skip">Stap overslaan</a>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\t\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/alert.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="alert"  class="popup">\r\n\r\n\t<div class="content">\r\n\r\n\t\t<div class="wrapper">\r\n\r\n\t\t\t<div class="head">\r\n\r\n\t\t\t\t\t<ul>\r\n\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t<h2><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.warning )) == null ? '' : __t) +
'</span><span class="text">Waarschuwing</span></h2>\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t</ul>\r\n\r\n\t\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\r\n\t\t\t\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="message">\r\n\r\n\t\t\t\t<p>' +
((__t = ( message )) == null ? '' : __t) +
'</p>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="buttons">\r\n\r\n\t\t\t\t<div class="button" id="ok"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.approve )) == null ? '' : __t) +
'</span>OK</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/change-delivery-method.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="change-delivery-method" class="popup">\r\n\r\n\t<div class="content">\r\n\r\n\t\t<div class="wrapper">\r\n\t\t\t\r\n\t\t\t<div class="head">\r\n\r\n\t\t\t\t<ul>\r\n\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t\t<h2><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.address )) == null ? '' : __t) +
'</span><span class="text">Wijzig verzendmethode</span></h2>\t\t\t\t\t\r\n\t\t\t\t\t</li>\t\t\r\n\r\n\t\t\t\t</ul>\r\n\r\n\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="body">\r\n\r\n\t\t\t\t<p>Kies de verzendmethode</p>\r\n\r\n\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t\t<div class="list-item" id="delivery_method">\r\n\t\t\t\t\t\t\t<label class="key">Verzendmethode</label>\r\n\t\t\t\t\t\t\t\t<div class="button button-small myAPP-tooltip myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="delivery-methods" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.deliveryMethod )) == null ? '' : __t) +
'"><span class="value">' +
((__t = ( myAPP.texts.values.delivery_method[invoice.delivery_method] )) == null ? '' : __t) +
'</span><span class="caret caret-small caret-down"></span> </div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="buttons buttons-small">\r\n\t\t\t\t\t<div class="button" id="save"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t\r\n\r\n\t\t\t\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/confirm-password.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="confirm-password" class="popup">\r\n\r\n\t<div class="content">\r\n\r\n\t\t<div class="wrapper">\r\n\t\t\t\r\n\t\t\t<div class="head">\r\n\r\n\t\t\t\t<ul>\r\n\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t\t<h2><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.password )) == null ? '' : __t) +
'</span><span class="text">Voer wachtwoord in</span></h2>\t\t\t\t\t\r\n\t\t\t\t\t</li>\t\t\r\n\r\n\t\t\t\t</ul>\r\n\r\n\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="body">\r\n\r\n\t\t\t\t<p>Voor deze wijziging is herinvoering van uw wachtwoord vereist.</p>\r\n\r\n\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t\t<div class="list-item" id="old_password">\r\n\t\t\t\t\t\t\t<label class="key" for="_password">wachtwoord </label>\t\r\n\t\t\t\t\t\t\t<div class="background-wrapper"><input type="password" name="password" id="_password"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t\r\n\r\n\t\t\t<div class="buttons buttons-small">\r\n\t\t\t\t<div class="button" id="save"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\t\t\t\t<!-- <div class="button" id="cancel-button"><span class="entype">&#x27f2;</span>Annuleer</div> -->\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/confirm.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="alert"  class="popup">\r\n\r\n\t<div class="content">\r\n\r\n\t\t<div class="wrapper">\r\n\r\n\t\t\t<div class="head">\r\n\r\n\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t<h2><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.warning )) == null ? '' : __t) +
'</span><span class="text">Bevestig</span></h2>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\r\n\t\t\t\t\t</ul>\r\n\r\n\t\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\r\n\t\t\t\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="message">\r\n\r\n\t\t\t\t<p>' +
((__t = ( message )) == null ? '' : __t) +
'</p>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="buttons">\r\n\r\n\t\t\t\t<div class="button" id="confirm"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.approve )) == null ? '' : __t) +
'</span>OK</div>\r\n\t\t\t\t<div class="button" id="cancel"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.cancel )) == null ? '' : __t) +
'</span>Annuleren</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/debtor-vat.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="debtor-vat" class="popup">\r\n\r\n\t<div class="content">\r\n\r\n\t\t<div class="wrapper">\r\n\t\t\t\r\n\t\t\t<div class="head">\r\n\r\n\t\t\t\t<ul>\r\n\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t\t<h2><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.company )) == null ? '' : __t) +
'</span><span class="text">Voer btw-nummer in</span></h2>\t\t\t\t\t\r\n\t\t\t\t\t</li>\t\t\r\n\r\n\t\t\t\t</ul>\r\n\r\n\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="body">\r\n\r\n\t\t\t\t<p>Van deze debiteur is geen btw-nummer bekend. Voer een btw-nummer in om de btw te verleggen</p>\r\n\r\n\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t\t<div class="list-item" id="vat_number">\r\n\t\t\t\t\t\t\t<label class="key" for="_vat-number">BTW-nummer </label>\t\r\n\t\t\t\t\t\t\t<div class="background-wrapper"><input type="text" name="vat-number" id="_vat-number"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t\r\n\r\n\t\t\t<div class="buttons buttons-small">\r\n\t\t\t\t<div class="button" id="save"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\t\t\t\t<div class="button close-button"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</span>Annuleer</div>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/edit-debtor.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="edit-debtor" class="popup">\r\n\r\n\t<div class="content">\r\n\r\n\t\t<div class="wrapper">\r\n\r\n\t\t\t<div class="new-debtor-view">\t\t\t\r\n\t\t\t\r\n\t\t\t\t<div class="head">\r\n\r\n\t\t\t\t\t<ul>\r\n\r\n\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t<h2><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.user )) == null ? '' : __t) +
'</span><span class="text">' +
((__t = ( debtor.company_name || "Nieuwe debiteur" )) == null ? '' : __t) +
'</span></h2>\t\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</li>\t\t\r\n\r\n\t\t\t\t\t\t<li>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<span class="email">' +
((__t = ( debtor.email || "E-mail" )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t</li>\r\n\r\n\t\t\t\t\t</ul>\r\n\r\n\t\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\r\n\r\n\t\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\t<div class="list list-nostyle list-small">\r\n\r\n\t\t\t\t\t';
 _.each(_.pick(debtor, ['company_name', 'email', 'address', 'zipcode', 'city', 'country']), function (value, key) { ;
__p += '\r\n\t\t\t\t\r\n\t\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\r\n\t\t\t\t\t\t';
 if (key !== "country") { ;
__p += '\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="background-wrapper"><input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '"></div>\t\r\n\r\n\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="countries" id="country">\r\n\t\t\t\t\t\t\t\t<span class="value">Nederland</span><span class="caret caret-small caret-down"></span></div>\r\n\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\r\n\t\t\t\t\t</div>\t\r\n\r\n\t\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\t<div class="buttons buttons-small">\r\n\t\t\t\t\t<div class="button" id="save"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\r\n\t\t\t\t\t<!-- <div class="button" id="cancel-button"><span class="entype">&#x27f2;</span>Annuleer</div> -->\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/error.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="error" class="popup">\n\n\t<div class="content">\n\n\t\t<div class="wrapper">\n\t\t\t\n\t\t\t<div class="head">\n\n\t\t\t\t<ul>\n\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<h2><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.error )) == null ? '' : __t) +
'</span><span class="text">Error</span></h2>\t\t\t\t\t\n\t\t\t\t\t</li>\t\t\n\n\t\t\t\t</ul>\n\n\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\n\n\t\t\t</div>\n\n\t\t\t<div class="body">\n\n\t\t\t\t<p>' +
((__t = ( message )) == null ? '' : __t) +
'</p>\n\t\t\t\t\n\n\t\t\t</div>\n\t\t\n\n\t\t\t<div class="buttons buttons-small">\n\t\t\t\t<div class="button" id="save"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.save )) == null ? '' : __t) +
'</span>Opslaan</div>\n\t\t\t\t<!-- <div class="button" id="cancel-button"><span class="entype">&#x27f2;</span>Annuleer</div> -->\n\t\t\t</div>\n\n\t\t</div>\n\n\t</div>\n\n</div>';

}
return __p
};

this["JST"]["templates/popups/finalize-account.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup" id="finalize-account">\r\n\t\r\n\t<div class="content">\r\n\t\t\r\n\t\t<div class="wrapper">\r\n\r\n\t\t\t\t<div class="animation-wrapper">\t\t\t\t\t\r\n\r\n\t\t\t\t\t<div class="head">\r\n\t\t\t\t\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.download )) == null ? '' : __t) +
'</span><span class="text">Definitief overstappen</span></h2>\r\n\r\n\t\t\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="body">\r\n\r\n\t\t\t\t\t\t<div id="error-message" class="alert alert-error"></div>\r\n\r\n\r\n\t\t\t\t\t\t<p>Wilt u definitief overstappen van facturen.net naar KasCo? Let op: uw facturen.net account wordt bevroren wanneer u overstapt.</p> \r\n\t\t\t\t\t\t<p>Heeft u sinds <strong>' +
((__t = ( importDate )) == null ? '' : __t) +
'</strong> nog facturen verzonden via facturen.net? Vraag ons dan eerst uw account up to date te maken voor u overstapt via <strong><a target=\'blank\' href=\'mailto:info@kascooperatie.nl\'>info@kascooperatie.nl</a></strong> of bel met 020-8200120</p>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<p><input type=\'checkbox\' id="agree"><span class="algemene-voorwaarden">Ik ga akkoord met de <a href=\'https://kascooperatie.nl/algemene-voorwaarden\' target=\'_blank\'>Algemene Voorwaarden</a> van KasCo</p>\r\n\r\n\t\t\t\t\t\t<div class="buttons">\r\n\r\n\t\t\t\t\t\t\t<div class="button" id="finalize"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.approve )) == null ? '' : __t) +
'</span>Overstappen</div>\r\n\t\t\t\t\t\t\t<div class="button" id="cancel"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.cancel )) == null ? '' : __t) +
'</span>Annuleren</div>\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t\r\n\t\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/image-upload.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="image-select" class="popup">\r\n\r\n\t<div class="content">\r\n\r\n\t\t<div class="head">\r\n\t\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.logo )) == null ? '' : __t) +
'</span>Logo uploaden</h2>\r\n\t\t\t<div class="close-button"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</span></div>\r\n\t\t</div>\r\n\r\n\t\t<div style="clear: both;"></div>\r\n\r\n\t\t<div class="upload-image">\r\n\r\n\t\t\t<div class="drop-area">\r\n\r\n\t\t\t\t<div class="image-holder"></div>\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t<div class="placeholder">\r\n\t\t\t\t\t';
 if (window.FileReader && window.Modernizr.draganddrop) { ;
__p += '\r\n\t\t\t\t\t<div class="text">Sleep afbeelding hier</div>\r\n\t\t\t\t\t<div class="text margin-top">of</div>\t\t\t\r\n\t\t\t\t\t';
 } ;
__p += ' \r\n\t\t\t\t</div>\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t<div class="button button-small myAPP-tooltip" id="select-file" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.fileSelect )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.upload )) == null ? '' : __t) +
'</span>' +
((__t = ( myAPP.texts.selectFile )) == null ? '' : __t) +
'\r\n\t\t\t\t\t<input type="file" name="files[]" multiple>\r\n\t\t\t\t</div>\t\t\r\n\t\t\t\t\t\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="text-area">\r\n\t\t\t<h3>Logo uploaden</h3>\r\n\t\t\t' +
((__t = ( myAPP.texts.uploadFile )) == null ? '' : __t) +
'\r\n\r\n\t\t\t<div class="buttons">\r\n\t\t\t\t<!-- <div class="button" id="accept"><span class="entype">&#x2713;</span>Instellen</div> -->\r\n\t\t\t\t<div class="button myAPP-tooltip" id="cancel" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.cancel )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.cancel )) == null ? '' : __t) +
'</span>Annuleren</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t</div>\r\n\t\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/import-account.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="popup" id="import-account">\r\n\t\r\n\t<div class="content">\r\n\t\t\r\n\t\t<div class="wrapper">\r\n\r\n\t\t\t\t<div class="animation-wrapper">\t\t\t\t\t\r\n\r\n\t\t\t\t\t<div class="head">\r\n\t\t\t\t\t\t<h2><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.download )) == null ? '' : __t) +
'</span><span class="text">Account importeren</span></h2>\r\n\r\n\t\t\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="body">\r\n\t\t\t\t\t\t<p>Via deze popup kunt u uw account uit Facturen.net importeren. Vul uw gebruikersnaam en wachtwoord in zodat wij uw gegevens kunnen ophalen op de servers van facturen.net</p>\r\n\r\n\t\t\t\t\t\t<div id="error-message" class="label label-large label-error"></div>\r\n\r\n\t\t\t\t\t\t<div class="inputs">\r\n\r\n\t\t\t\t\t\t\t<div class="input-item">\r\n\t\t\t\t\t\t\t\t<label for="email">Gebruikersnaam</label>\r\n\t\t\t\t\t\t\t\t<div class="input-prepend">\r\n\t\t\t\t\t\t\t\t\t<span class="input-icon entype">\r\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.user )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t<input type="text" id="username" placeholder="Gebruikersnaam">\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="input-item">\r\n\t\t\t\t\t\t\t\t<label for="password">Wachtwoord</label>\r\n\t\t\t\t\t\t\t\t<div class="input-prepend">\r\n\t\t\t\t\t\t\t\t\t<span class="input-icon entype">\r\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( myAPP.templateHelpers.charCodes.password )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t<input type="password" id="password" placeholder="Wachtwoord"><br>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class="progress">\r\n\r\n\t\t\t\t\t\t\t<div class="progress-content">\r\n\r\n\t\t\t\t\t\t\t\t';
 if (importObject) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t<div class="user-name">Gebruiker: <strong>' +
((__t = ( user )) == null ? '' : __t) +
'</strong></div>\r\n\r\n\t\t\t\t\t\t\t\t<div class="progress-bar"><div class="indicator"></div></div><span class="percentage"><span class="number">' +
((__t = ( importObject.percentage || 0 )) == null ? '' : __t) +
'</span> %</span>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<ul class="totals">\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<li><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoices )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="description">Facturen:</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="done">' +
((__t = ( importObject.invoices_done ||0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span> van </span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="total">' +
((__t = ( importObject.invoices_total || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.invoiceLines )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="description">Factuurregels:</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="done">' +
((__t = ( importObject.invoice_lines_done || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span> van </span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="total">' +
((__t = ( importObject.invoice_lines_total || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.debtor )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="description">Debiteuren:</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="done">' +
((__t = ( importObject.debtors_done || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span> van </span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="total">' +
((__t = ( importObject.debtors_total || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="description">Betalingen:</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="done">' +
((__t = ( importObject.payments_done || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span> van </span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="total">' +
((__t = ( importObject.payments_total || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t\t\t<li>\r\n\t\t\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.article )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="description">Artikelen:</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="done">' +
((__t = ( (importObject.articles_done + importObject.article_groups_done) || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span> van </span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="total">' +
((__t = ( (importObject.articles_total + importObject.article_groups_total) || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t\t\t\t<li class="total_jobs">\r\n\t\t\t\t\t\t\t\t\t\t<span class="entype"></span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="description">Totaal jobs:</span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="done">' +
((__t = ( importObject.jobs_done || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t\t<span> van </span>\r\n\t\t\t\t\t\t\t\t\t\t<span class="total">' +
((__t = ( importObject.jobs_total || 0 )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t</li>\r\n\r\n\t\t\t\t\t\t\t\t</ul>\r\n\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\r\n\r\n\t\t\t\t\t\t<div class="button" id="import"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.download )) == null ? '' : __t) +
'</div>Importeren</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t\r\n\t\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/new-debtor.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="new-debtor-popup">\n\n\t<div class="content">\n\n\t\t<div class="debtor-view">\n\n\t\t\t<div class="wrapper">\n\t\t\t\n\t\t\t<div class="head">\n\n\t\t\t\t<ul>\n\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<h2><span class="icon entype">&#x1f464;</span><span class="text">' +
((__t = ( debtor.name || "Nieuwe debiteur" )) == null ? '' : __t) +
'</span></h2>\t\n\t\t\t\t\t\t<span class="email">' +
((__t = ( debtor.email || "E-mail" )) == null ? '' : __t) +
'</span>\n\t\t\t\t\t</li>\t\t\n\n\t\t\t\t</ul>\n\n\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\n\n\t\t\t</div>\n\t\t\n\t\t\t<div class="list list-nostyle">\n\n\t\t\t\t';
 _.each(_.pick(debtor, ['name', 'email', 'address', 'zipcode', 'city', 'country']), function (value, key) { ;
__p += '\n\t\t\t\n\t\t\t\t<div class="list-item" id="' +
((__t = ( key )) == null ? '' : __t) +
'">\n\n\t\t\t\t\t';
 if (key !== "country") { ;
__p += '\n\t\t\t\t\t\n\t\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\t\t\t\t\t\t\n\t\t\t\t\t\t<input type="text" name="' +
((__t = ( key )) == null ? '' : __t) +
'" id="_' +
((__t = ( key )) == null ? '' : __t) +
'" value="';
 if (value) print(value) ;
__p += '" >\t\t\n\n\t\t\t\t\t';
 } else { ;
__p += '\n\n\t\t\t\t\t\t<label class="key"  for="_' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\n\t\t\t\t\t\t<div class="button button-small myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="countries" id="country">\n\t\t\t\t\t\t\t<span class="value">Nederland</span><span class="caret caret-small caret-down"></span></div>\t\t\t\n\n\t\t\t\t\t';
 } ;
__p += '\n\t\t\t\t\n\t\t\t\t</div>\t\n\n\t\t\t\t';
 }) ;
__p += '\n\n\t\t\t</div>\n\t\t\n\t\t\t<div class="buttons buttons-small">\n\t\t\t\t<div class="button" id="save"><span class="entype">&#x1f4be;</span>Opslaan</div>\n\t\t\t\t<!-- <div class="button" id="cancel-button"><span class="entype">&#x27f2;</span>Annuleer</div> -->\n\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t</div>\n\n\t</div>\n\n</div>';

}
return __p
};

this["JST"]["templates/popups/objection-reply.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="objection-reply" class="popup">\n\n\t<div class="content">\n\n\t\t<div class="wrapper">\n\t\t\t\n\t\t\t<div class="head">\n\t\t\n\t\t\t\t<ul>\n\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<h2><span class="icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.reply )) == null ? '' : __t) +
'</span><span class="text">Reageren op bezwaar</span></h2>\t\t\t\t\t\n\t\t\t\t\t</li>\t\t\n\n\t\t\t\t</ul>\n\n\t\t\t\t<div class="close-button"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div></div>\n\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class="body-wrapper">\n\n\t\t\t\t<div class="body">\n\n\t\t\t\t\t<p>' +
((__t = ( myAPP.texts.objectionReply )) == null ? '' : __t) +
'</p>\n\t\t\t\t\t\n\t\t\t\t\t<textarea name="" id="reply" rows="5" placeholder="uw reactie"></textarea>\n\n\t\t\t\t</div>\n\n\t\t\t</div>\n\t\t\t\t\t\n\t\t\t<div class="buttons buttons-small">\n\t\t\t\t\t<div class="button" id="send"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.sent )) == null ? '' : __t) +
'</span>Versturen</div>\n\t\t\t\t\t<!-- <div class="button" id="cancel-button"><span class="entype">&#x27f2;</span>Annuleer</div> -->\n\t\t\t</div>\n\t\t\t\n\n\t\t\t</div>\n\n\t\t</div>\n\n\t</div>\n\n</div>';

}
return __p
};

this["JST"]["templates/popups/resource-loader.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="loader">\r\n\t\r\n\r\n\t\r\n\t<div class="details">\r\n\t\t<div class="text">Laden ...</div>\r\n\t\t<div class="resource">verzoek aan server...</div>\r\n\t\t<div class="counter">0 van 0</div>\r\n\t</div>\r\n\r\n\t<div class="gif">\r\n\r\n\t</div>\r\n\t\r\n\t<div class="progress-bar">\r\n\t\t<div class="indicator">\r\n\t\t\t<div class="animation"></div>\r\n\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/signup-form-success.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n<div class="head">\r\n\t<h2>Bedankt voor uw aanmelding!</h2>\r\n\t<span id="close-button" class="entype close-button">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</span>\t\t\t\r\n</div>\r\n\r\n<div style="clear: both"></div>\r\n\r\n<div class="column-left">\r\n\t<img class="success" src="/crediteuren/img/watkosthet.png">\t\t\t\r\n</div>\r\n\r\n<div class="column-right">\r\n\r\n\t<div class="success">\r\n\t\t\r\n\t\t<p>Hartelijk dank voor het aanmelden bij KasCo. We hebben een e-mail met een link naar het onderstaande e-mailadres verzonden. Via de link kunt u de aanmelding bevestigen.</p>\r\n\r\n\t\t<div><span id="email-message">' +
((__t = ( email )) == null ? '' : __t) +
'</span></div>\t\t\t\t\r\n\r\n\t\t<div><div class="button" id="close-popup"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</div>Sluit venster</div></div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/popups/signup-form.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="signup-form" class="popup">\r\n\r\n\t<div class="content">\r\n\t\t\r\n\t\t<div class="animation-wrapper">\r\n\t\t\t\r\n\t\t\t<div class="head">\r\n\t\t\t\t<h2>Meld u gratis aan bij KasCo!</h2>\t\t\t\r\n\t\t\t\t<span id="close-button" class="entype close-button">' +
((__t = ( myAPP.templateHelpers.charCodes.close )) == null ? '' : __t) +
'</span>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div style="clear: both"></div>\r\n\r\n\t\t\t<div class="column-left">\r\n\t\t\t\t<img src="/crediteuren/img/wizard-content-5.jpg" alt="Ontdek de voordelen met een gratis account">\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="column-right">\r\n\r\n\t\t\t\t<p>Tot en met 3 facturen per maand helemaal gratis. Betaalde lidmaatschappen zijn <strong>maandelijks opzegbaar</strong>, u loopt dus geen enkel risico</p>\r\n\t\t\t\r\n\t\t\t\r\n\t\t\t\t<div class="form">\r\n\r\n\t\t\t\t\t<div id="error-message" class="alert alert-error"></div>\r\n\r\n\t\t\t\t\t<div class="input-item">\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="input-prepend">\r\n\t\t\t\t\t\t\t<span class="input-icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.company )) == null ? '' : __t) +
'</span><input id="company-name" placeholder="Bedrijfsnaam">\r\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="input-item">\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="input-prepend">\r\n\t\t\t\t\t\t\t<span class="input-icon entype">' +
((__t = ( myAPP.templateHelpers.charCodes.email )) == null ? '' : __t) +
'</span><input id="email" placeholder="E-mailadres">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class="buttons">\r\n\t\t\t\t\t\t<div class="button button-blue" id="signup-button"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.approve )) == null ? '' : __t) +
'</span>Aanmelden</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["templates/superadmin/account.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h2 class="description"><div class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.account )) == null ? '' : __t) +
'</div>Account</h2>\r\n\r\n<div class="buttons">\r\n\r\n\t<div class="button myAPP-tooltip" id="show-costs" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.showCosts )) == null ? '' : __t) +
'"><span class="entype">â‚¬</span>Bekijk kosten</div>\r\n\t<div class="button myAPP-tooltip" id="delete-account" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.deleteAccount )) == null ? '' : __t) +
'"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.ddelete )) == null ? '' : __t) +
'</span>Verwijder account</div>\r\n\r\n\r\n</div>\r\n\r\n<div style="clear: both"></div>\r\n\r\n<div class="_account">\t\r\n\r\n\t<div class="account-header">\r\n\r\n\t\t\t<div id="title">\r\n\t\t\t\t<div class="description">Naam</div>\r\n\t\t\t\t<div class="value">' +
((__t = ( account.title )) == null ? '' : __t) +
'</div>\r\n\t\t\t</div>\t\t\r\n\r\n\t\t\t<div id="subscription">\r\n\t\t\t\t<div class="description">Abonnement</div>\r\n\r\n\t\t\t\t\t';
 if (account.subscription === "payed") { ;
__p += '\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div class="value success"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span><span class="text">Betalend</span> </div>\r\n\r\n\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t<div class="value"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.quote )) == null ? '' : __t) +
'</span><span class="text">Gratis</span></div>\r\n\r\n\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t\r\n\t</div>\r\n\r\n\t<div class="animation-wrapper">\r\n\r\n\t\t<div class="account-body">\r\n\r\n\t\t\t<div class="left">\r\n\r\n\t\t\t\t<div class="contact-information ">\r\n\r\n\t\t\t\t\t<h4><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.contact )) == null ? '' : __t) +
'</span>Contactgegevens</h4>\r\n\r\n\t\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t\t';
 _.each( _.pick(account, ['email', 'contact_person', 'phone']), function (value, key) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<label>' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t\t<input value="' +
((__t = ( value )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="address">\r\n\r\n\t\t\t\t\t<h4><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.address )) == null ? '' : __t) +
'</span>Adresgegevens</h4>\r\n\r\n\t\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t\t';
 _.each( _.pick(account, ['address', 'city', 'zipcode', 'country']), function (value, key) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<label>' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t\t<input value="' +
((__t = ( value )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class="financial">\r\n\t\t\t\t\t\r\n\t\t\t\t\t<h4><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>Financiele gegevens</h4>\r\n\r\n\t\t\t\t\t<div class="list list-nostyle">\r\n\r\n\t\t\t\t\t\t';
 _.each( _.pick(account, ['bank_account', 'bank_account_iban', 'bank_bic', 'kvk_number', 'vat_liable', 'vat_number']), function (value, key) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<label>' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t\t<input value="' +
((__t = ( value )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 }) ;
__p += '\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\r\n\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="right">\r\n\t\t\t\t\r\n\t\t\t\t<div class="account-details">\r\n\t\t\t\t\t\r\n\t\t\t\t\t<h4><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.account )) == null ? '' : __t) +
'</span>Accountdetails</h4>\r\n\r\n\t\t\t\t\t<div class="list list-nostyle">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t';
 _.each( _.pick(account, ['created', 'subscription_date', 'final_import_date']), function (value, key) { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t';
 value = myAPP.templateHelpers.parseDate( value) ;
__p += '\r\n\r\n\t\t\t\t\t\t\t<div class="list-item">\r\n\t\t\t\t\t\t\t\t<label>' +
((__t = ( myAPP.texts.keys[key] )) == null ? '' : __t) +
'</label>\r\n\t\t\t\t\t\t\t\t<input value="' +
((__t = ( value )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 }) ;
__p += '\r\n\r\n\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["templates/superadmin/accounts-collection.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="accounts-collection">\r\n\r\n\t<div>\r\n\r\n\t\t<div class="table-controls">\r\n\t\t\t\t\t\r\n\t\t\t<ul class="controls page-controls button myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.pageControls )) == null ? '' : __t) +
'">\r\n\t\t\t\t<li id="previous-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t<li><div class="animation-wrapper"><span id="current-page">' +
((__t = ( collection.currentPage + 1 )) == null ? '' : __t) +
'</span></div><span>/</span><span id="total-pages">' +
((__t = ( collection.totalPages )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t\t<li id="next-page"><span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow )) == null ? '' : __t) +
'</span></li>\r\n\t\t\t</ul>\t\t\t\t\r\n\r\n\t\t\t<!-- <div class="text">Toon facturen per</div>\r\n\r\n\t\t\t<div class="button myAPP-dropdown myAPP-dropdown-autoupdate myAPP-tooltip" id="select-timeperiod-length" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.selectTimeunit )) == null ? '' : __t) +
'" data-dropdown="time-period">\r\n\t\t\t\t<span class="value">alles</span>\r\n\t\t\t\t<span class="caret caret-small caret-down"></span>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="selects">\r\n\t\t\t\r\n\t\t\t\t<div class="text">voor</div>\r\n\r\n\t\t\t\t<div class="button" id="select-timeperiod"><div class="entype" id="previous">' +
((__t = ( myAPP.templateHelpers.charCodes.leftArrow2 )) == null ? '' : __t) +
'</div><div class="item myAPP-dropdown myAPP-dropdown-autoupdate" data-dropdown="time-periods-months" id="time-period"><span class="value"></span></div> <div class="entype" id="next">' +
((__t = ( myAPP.templateHelpers.charCodes.rightArrow2 )) == null ? '' : __t) +
'</div></div>\r\n\r\n\t\t\t\t<div class="button myAPP-dropdown myAPP-dropdown-autoupdate myAPP-tooltip" data-tooltip="selecteer een jaar" data-dropdown="time-periods-years" id="select-year">\r\n\t\t\t\t\t<span class="value">2013</span>\r\n\t\t\t\t\t<span class="caret caret-small caret-down"></span>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div> -->\r\n\r\n\t\t\t\r\n\r\n\t\t</div> \r\n\r\n\t\t<div style="clear: both"></div>\r\n\r\n\t\t<div class="table">\r\n\t\t\r\n\t\t\t<div class="table-header table-row">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<!-- ids should match the sortable attributes on the models -->\r\n\t\t\t\t\t\t<div class="table-cell" id="icon">\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div id="id" class="table-cell sort-handle">\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<span>ID</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div id="title" class="table-cell sort-handle">\r\n\t\t\t\t\t\t\t<span>Naam</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div id="created" class="table-cell sort-handle">\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<span>Aangemaakt</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div id="imported" class="table-cell sort-handle">\r\n\t\t\t\t\t\t\t<span class="entype label myAPP-tooltip" data-tooltip="geimporteerd">' +
((__t = ( myAPP.templateHelpers.charCodes.imported )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div id="finalized" class="table-cell sort-handle">\r\n\t\t\t\t\t\t\t<span class="entype label myAPP-tooltip" data-tooltip="overgestapt">' +
((__t = ( myAPP.templateHelpers.charCodes.approved )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div id="subscription" class="table-cell sort-handle">\r\n\t\t\t\t\t\t\t<span>Abonnement</span>\r\n\t\t\t\t\t\t</div>\t\t\t\t\t\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="table-body paginate-page">\r\n\r\n\t\t\t';
 if (collection.length > 0) { ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 

							collection.each(function (account) {  account = account.getAttributes();
								
						;
__p += '\r\n\r\n\t\t\t\t\t\t<div class="table-row" id="' +
((__t = ( account.id )) == null ? '' : __t) +
'">\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell" id="icon">\r\n\t\t\t\t\t\t\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.account )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell" id="account_id">\r\n\t\t\t\t\t\t\t\t<span>' +
((__t = ( account.id )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class="table-cell" id="title">\r\n\t\t\t\t\t\t\t\t<span>' +
((__t = ( account.title )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell"\tid="created">\r\n\t\t\t\t\t\t\t\t<span>' +
((__t = ( myAPP.templateHelpers.parseDate( account.created ) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell"\tid="imported">\r\n\t\t\t\t\t\t\t\t';
 if (account.isImported) { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t<span class="label entype myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.importedAccount )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.templateHelpers.charCodes.imported )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell"\tid="finalized">\r\n\t\t\t\t\t\t\t\t';
 if (account.isFinalized) { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t<span class="entype label label-success myAPP-tooltip" data-tooltip="' +
((__t = ( myAPP.texts.tooltips.finalizedAccount )) == null ? '' : __t) +
'">' +
((__t = ( myAPP.templateHelpers.charCodes.approved )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="table-cell" id="subscription">\r\n\r\n\t\t\t\t\t\t\t\t';
 if (account.subscription === "payed") { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<span class=\'label label-success myAPP-tooltip\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.paidAccount )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.payment )) == null ? '' : __t) +
'</span>Betalend</span>\t\r\n\r\n\t\t\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t\t\t\t\t\t<span class=\'label myAPP-tooltip\' data-tooltip="' +
((__t = ( myAPP.texts.tooltips.freeAccount )) == null ? '' : __t) +
'"><span class=\'entype\'>' +
((__t = ( myAPP.templateHelpers.charCodes.quote )) == null ? '' : __t) +
'</span>Gratis</span>\r\n\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t';
 }); ;
__p += '\r\n\r\n\t\t\t';
 } else { ;
__p += '\r\n\r\n\t\t\t\t<div class="table-row placeholder">\r\n\r\n\t\t\t\t\t<h2>Geen facturen</h2>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n\t\t\r\n</div>\r\n';

}
return __p
};

this["JST"]["templates/superadmin/accounts.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="mainPaneWrapper accounts-view">\r\n\t\r\n\t<div class="header">\r\n\t\t<h2>Accounts</h2>\r\n\r\n\t\t<span class="entype">' +
((__t = ( myAPP.templateHelpers.charCodes.account )) == null ? '' : __t) +
'</span>\r\n\r\n\t</div>\t\r\n\t\r\n\t<div class="pane accounts-pane"></div>\r\n\t\r\n</div>';

}
return __p
};