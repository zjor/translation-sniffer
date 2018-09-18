import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const data = {
    "en/ru": {
        "2018-09-18": [
            { word: "hello", resource: "multitran" },
            { word: "world", resource: "multitran" }
        ]
    },
    "cz/ru": {
        "2018-09-18": [
            { word: "hezky", resource: "slovnik" },
            { word: "cesky", resource: "slovnik" }
        ]
    }
}

const Word = ({ word, resource }) => (
    <div>
        <span>{word}</span>
        <span>[{resource}]</span>
    </div>
)

const Day = ({ date, words }) => (
    <div>
        <h5>{date}</h5>
        {words.map((word) => <Word key={word.word} word={word.word} resource={word.resource}/>)}
    </div>
)

const Language = ({ dates }) => {
    return (
        <div>
            {Object.keys(dates).map((date) => (
                <div key={date}>
                    <Day date={date} words={dates[date]}/>
                </div>
            ))}
        </div>
    )
}

class History extends Component {
    render() {
        return (
            <div>
                {Object.keys(data).map((lang) => (
                    <div key={lang}>
                        <h3>{lang}</h3>
                        <Language dates={data[lang]} />
                    </div>
                ))}
            </div>
        )
    }
}

const App = () => (
    <div>
        <h2>Translation history</h2>
        <History />
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))