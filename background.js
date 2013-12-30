// chrome.runtime.onInstalled.addListener(function (details)
// {
	// //if(details.reason == 'update') window.open(chrome.extension.getURL('options.html'));
	// if(details.reason == 'install') window.open(chrome.extension.getURL('options.html'));
// });

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	if(request.type == 'saveStorage')
	{
		console.log(request.id + ": " + request.value);
		id = request.id;
		localStorage[id] = request.value;
		createMenu();
	}
	else if(request.type == 'getStorage')
	{
		id = request.id;
		sendResponse({id: id, value: localStorage[id]});
	}
	else if(request.type == 'clearStorage')
	{
		for(key in localStorage)  delete localStorage[key];
	}
});

function createMenu()
{

	var URL_PREFIX;
	var translate;
	var url;
	var i;
	
	var langs = {
	"af":"Afrikaans","sq":"Albanian","ar":"Arabic","hy":"Armenian","az":"Azerbaijani","eu":"Basque","be":"Belarusian","bg":"Bulgarian","ca":"Catalan","zh-CN":"Chinese (Simplified)","zh-TW":"Chinese (Traditional)","hr":"Croatian","cs":"Czech","da":"Danish","nl":"Dutch","en":"English","et":"Estonian","tl":"Filipino","fi":"Finnish","fr":"French","gl":"Galician","ka":"Georgian","de":"German","el":"Greek","ht":"Haitian Creole","iw":"Hebrew","hi":"Hindi","hu":"Hungarian","is":"Icelandic","id":"Indonesian","ga":"Irish","it":"Italian","ja":"Japanese","ko":"Korean","lv":"Latvian","lt":"Lithuanian","mk":"Macedonian","ms":"Malay","mt":"Maltese","no":"Norwegian","fa":"Persian","pl":"Polish","pt":"Portuguese","ro":"Romanian","ru":"Russian","sr":"Serbian","sk":"Slovak","sl":"Slovenian","es":"Spanish","sw":"Swahili","sv":"Swedish","th":"Thai","tr":"Turkish","uk":"Ukrainian","ur":"Urdu","vi":"Vietnamese","cy":"Welsh","yi":"Yiddish"
	};
	
	i = 1;
	//alert(localStorage.length);
	chrome.contextMenus.removeAll();
	while(i <= 5)
	{
		if(typeof localStorage['lang' + i] != 'undefined' && localStorage['lang' + i] != '')
		{
			lang = localStorage['lang' + i];
			URL_PREFIX = 'http://translate.google.com/?ie=UTF-8&sl=auto&tl=' + lang + '&text=';

			translate = function(string) {
			  url = URL_PREFIX + string.replace(/ /g, "+").replace('&','%26');
			  chrome.tabs.create({'url': url});
			}

			chrome.contextMenus.create({
			  'id': "lang" + i,
			  'title': "Translate '%s' to " + langs[lang],
			  'contexts': ['selection'],
			  'onclick': function(info, tab) {
				translate(info.selectionText);
			  }
			});
		}
		//else alert("lang " + i + " is undefined");
		i++;
	}
}
createMenu();