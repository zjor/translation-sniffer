import { storeWord } from './commons.js'

const resource = "slovnik-seznam"
const regex = /.*?:\/\/.*?\.?slovnik\.seznam\.cz\/.*/

const slovnikSeznam = (req) => {
    if (req.type == "main_frame" && regex.test(req.url)) {
        const wordMatcher = /q=([\w\%]*)/.exec(req.url)
        const langMatcher = /lang=(\w*)/.exec(req.url)
        if (wordMatcher && langMatcher) {
            const word = decodeURIComponent(wordMatcher[1])
            const lang = langMatcher[1]
            const now = new Date()
            const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

            storeWord(lang, today, { word, resource })
        }
        return true
    }
    return false
}

export {
    slovnikSeznam
}

