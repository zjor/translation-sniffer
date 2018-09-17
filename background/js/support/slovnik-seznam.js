const slovnikSeznam = (req) => {
    const resource = "slovnik-seznam"
    
    const regex = /.*?:\/\/.*?\.?slovnik\.seznam\.cz\/.*/
    if (req.type == "main_frame" && regex.test(req.url)) {
        const wordMatcher = /q=([\w\%]*)/.exec(req.url)
        const langMatcher = /lang=(\w*)/.exec(req.url)
        if (wordMatcher && langMatcher) {
            const word = decodeURIComponent(wordMatcher[1])
            const lang = langMatcher[1]
            chrome.storage.local.get([resource], (dictionary) => {
                const now = new Date()
                const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
                const value = {
                    [lang]: {
                        [today]: [word]
                    }
                }
                if (dictionary.hasOwnProperty(resource)) {
                    if (dictionary[resource].hasOwnProperty(lang)) {
                        if (dictionary[resource][lang].hasOwnProperty(today)) {
                            dictionary[resource][lang][today].push(word)
                        } else {
                            dictionary[resource][lang][today] = [word]
                        }
                    } else {
                        dictionary[resource][lang] = {[today]: [word]}
                    }
                    chrome.storage.local.set(dictionary, () => console.log(`Updated: ${JSON.stringify(dictionary)}`))
                } else {
                    chrome.storage.local.set({
                        [resource]: value
                    }, () => console.log(`Saved: ${resource} -> ${JSON.stringify(value)}`))
                }
            })
        }
        return true
    }
    return false
}

export {
    slovnikSeznam
}

