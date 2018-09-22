import { storeWord, translate } from './commons.js'

const resource = "slovnik-seznam"
const regex = /.*?:\/\/.*?\.?slovnik\.seznam\.cz\/.*/

const slovnikSeznam = (req) => {
    if (req.type == "main_frame" && regex.test(req.url)) {
        const wordMatcher = /q=([\w\%]*)/.exec(req.url)
        const langMatcher = /lang=(\w*)/.exec(req.url)
        if (wordMatcher && langMatcher) {
            const word = decodeURIComponent(wordMatcher[1])
            const lang = "cz/ru" //langMatcher[1]
            const now = new Date()
            const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

            storeWord(lang, today, word, { resource })
            translate(word, "czk", "eng").then((res) => {
                storeWord(lang, today, word, { translation: res.tuc[0].phrase.text }, false)                
            })

        }
        return true
    }
    return false
}

export {
    slovnikSeznam
}

