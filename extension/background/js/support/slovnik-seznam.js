import get from '../libs/lodash/get.js'
import set from '../libs/lodash/set.js'

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
                const list = get(dictionary, [resource, lang, today])

                if (list === undefined) {
                    set(dictionary, [resource, lang, today], [word])
                } else {
                    list.push(word)
                }
                
                chrome.storage.local.set(dictionary, () => console.log(`Updated: ${JSON.stringify(dictionary)}`))
            })
        }
        return true
    }
    return false
}

export {
    slovnikSeznam
}

