import get from '../libs/lodash/get.js'
import set from '../libs/lodash/set.js'

const storeWord = (lang, date, word, info, incrementSearch = true) => {
    chrome.storage.local.get([lang], (dictionary) => {
        const existingInfo = get(dictionary, [lang, date, word], { searchCount: 0 })
        if (incrementSearch) {
            existingInfo.searchCount += 1
        }    
        set(dictionary, [lang, date, word], Object.assign({}, existingInfo, info))
        chrome.storage.local.set(dictionary, () => console.log(`Updated: ${JSON.stringify(dictionary)}`))        
    })
}

/**
 * Translates with glosbe.com. Returns promise
 * @param {*} word 
 * @param {*} from 
 * @param {*} to 
 */
const translate = (word, from, to) => {
    const req = `https://glosbe.com/gapi/translate?from=${from}&dest=${to}&format=json&phrase=${word}&pretty=true`
    return fetch(req).then(res => res.json())
}

export {
    storeWord,
    translate
}