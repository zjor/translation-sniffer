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

const storeMultitran = (req) => {
	const resource = "multitran"
	const regex = /.*?:\/\/.*?\.multitran\.ru\/.*/
	if (regex.test(req.url)) {
		const word = /s=(\w*)/.exec(req.url)
		if (word) {
			chrome.storage.local.get([resource], (dictionary) => {
				const now = new Date()
				const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
				const value = {
					"en/ru": {
						[today]: [word[1]]
					}
				}
				if (dictionary.hasOwnProperty(resource)) {
					if (dictionary[resource].hasOwnProperty("en/ru")) {
						if (dictionary[resource]["en/ru"].hasOwnProperty(today)) {
							dictionary[resource]["en/ru"][today].push(word[1])
						} else {
							dictionary[resource]["en/ru"][today] = [word[1]]
						}
					} else {
						dictionary[resource]["en/ru"] = {[today]: [word[1]]}
					}
					chrome.storage.local.set(dictionary, () => console.log(`Updated: ${JSON.stringify(dictionary)}`))
				} else {
					chrome.storage.local.set({
						[resource]: value
					}, () => console.log(`Saved: ${resource} -> ${JSON.stringify(value)}`))
				}
			})
		}
	}
}

chrome.webRequest.onBeforeRequest.addListener(function(event) {
  console.log(event)
  storeMultitran(event)
}, filter);

