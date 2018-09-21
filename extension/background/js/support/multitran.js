import { storeWord } from './commons.js'

const resource = "multitran"
const regex = /.*?:\/\/.*?\.multitran\.ru\/.*/

const getLanguage = (req) => {
    //TODO: define language properly
    return "en/ru"
}

const multitran = (req) => {        
    if (req.type == "main_frame" && regex.test(req.url)) {
        const wordMatcher = /s=([\w\%]*)/.exec(req.url)
        if (wordMatcher) {
            //TODO: find out what kind of encoding is used            
            const word = decodeURIComponent(wordMatcher[1])
            const lang = getLanguage(req)
            const now = new Date()
            const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

            storeWord(lang, today, { word, resource })
        }
        return true
    }
    return false
}

export {
    multitran
}

