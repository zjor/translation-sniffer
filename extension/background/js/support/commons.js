import get from '../libs/lodash/get.js'
import set from '../libs/lodash/set.js'

const storeWord = (lang, date, word) => {
    chrome.storage.local.get([lang], (dictionary) => {
        const list = get(dictionary, [lang, date], [])
        list.push(word)
        set(dictionary, [lang, date], list)
        
        chrome.storage.local.set(dictionary, () => console.log(`Updated: ${JSON.stringify(dictionary)}`))         
    })
}

export {
    storeWord
}