import { multitran } from './support/multitran.js'
import { slovnikSeznam } from './support/slovnik-seznam.js'
/*
Storage data model:
resource -> sl/tl -> date -> word
*/
const filter = {
	urls: [
		"*://www.macmillandictionary.com/*",
		"*://translate.google.com/*",
		"*://www.multitran.ru/*",
		"*://slovnik.seznam.cz/*",
		"*://glosbe.com/*"
	],
	types: [
		"main_frame",
		"xmlhttprequest"
	]
}

chrome.webRequest.onBeforeRequest.addListener(function(event) {
  console.log(event)
  multitran(event)
  slovnikSeznam(event)
}, filter);

chrome.browserAction.onClicked.addListener((event) => {
	chrome.tabs.create({ url: 'dist/index.html' })
})

