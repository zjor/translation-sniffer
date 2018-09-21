import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import get from 'lodash/get'
import set from 'lodash/set'

const styles = {
    card: {
      minWidth: 275,
      marginBottom: '16px'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
  }

const data = {
    "en/ru": {
        "2018-09-18": [
            { word: "hello", resource: "multitran" },
            { word: "world", resource: "multitran" }
        ],
        "2018-09-20": [
            { word: "allegedly", resource: "multitran" },
            { word: "perplexity", resource: "multitran" }
        ]
    },
    "cz/ru": {
        "2018-09-18": [
            { word: "hezky", resource: "slovnik" },
            { word: "cesky", resource: "slovnik" }
        ],
        "2018-09-21": [
            { word: "malir", resource: "slovnik" },
            { word: "tesar", resource: "slovnik" }
        ]
    }
}

/**
 * Reorganizes data around dates in the following way:
 * date -> [{word, lang, resource}]
 * @param {*} data 
 */
const flipData = (data) => {
    const result = {}
    Object.keys(data).forEach((lang) => {
        Object.keys(data[lang]).forEach((date) => {
            data[lang][date].forEach((word) => {
                const words = get(result, [date], [])
                words.push(Object.assign({}, word, { lang }))
                set(result, [date], words)
            })
        })
    })
    return result
}

const SimpleCard = ({ date, words, classes }) => {
    const bull = <span className={classes.bullet}>•</span>;  
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="title">
            {date}
          </Typography>
          <Table>
              <TableBody>
                  {words.map((word) => {
                      return (
                          <TableRow hover key={word.word}>
                              <TableCell>{word.word}</TableCell>
                              <TableCell>{word.lang}</TableCell>
                              <TableCell>{word.resource}</TableCell>
                          </TableRow>
                      )
                  })}
              </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
const StyledCard = withStyles(styles)(SimpleCard)

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
    state = {
        history: flipData(data)
    }

    componentDidMount() {
        if (chrome.storage.local) {
            chrome.storage.local.get((data) => {
                this.setState({ history: flipData(data) })
            })
        } else {
            console.log("Running in UI development mode")
        }
    }

    render() {        
        return (
            <div>
                {Object.keys(this.state.history).map((date) => (
                  <StyledCard key={date} date={date} words={this.state.history[date]} />
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