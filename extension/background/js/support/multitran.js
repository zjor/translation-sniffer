import get from '../libs/lodash/get.js'
import set from '../libs/lodash/set.js'

const multitran = (req) => {
    const resource = "multitran"
    const regex = /.*?:\/\/.*?\.multitran\.ru\/.*/
    if (req.type == "main_frame" && regex.test(req.url)) {
        const wordMatcher = /s=([\w\%]*)/.exec(req.url)
        if (wordMatcher) {
            //TODO: find out what kind of encoding is used            
            const word = decodeURIComponent(wordMatcher[1])
            const lang = "en/ru"
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
    multitran
}

