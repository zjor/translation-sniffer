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
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
        "2018-09-18": {
            "hello": { searchCount: 1, translation: "privet" },
            "word": { searchCount: 1, translation: "mir" }
        },
        "2018-09-20": {
            "allegedly": { searchCount: 1, translation: "privet" },
            "allegation": { searchCount: 1, translation: "mir" }
        }
    },
    "cz/ru": {
        "2018-09-18": {
            "hezky": { searchCount: 1, translation: "beautiful" },
            "cesky": { searchCount: 1, translation: "czech" }
        },
        "2018-09-21": {
            "malir": { searchCount: 1, translation: "painter" },
            "tesar": { searchCount: 1, translation: "carpenter" }
        }
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
            Object.keys(data[lang][date]).forEach((word) => {
                const words = get(result, [date], [])
                words.push(Object.assign({}, { word, lang }, data[lang][date][word]))
                set(result, [date], words)
            })
        })
    })
    return result
}

const SimpleCard = ({ date, words, deleteWord, classes }) => {
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
                              <TableCell>[{word.lang}]{word.word}</TableCell>
                              <TableCell>{word.translation}</TableCell>
                              <TableCell>{word.resource}</TableCell>
                              <TableCell>
                                <IconButton aria-label="Delete" onClick={() => deleteWord(word.word)}>
                                    <DeleteIcon />
                                </IconButton>
                              </TableCell>
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

class History extends Component {
    state = {
        history: flipData(data)
    }

    componentDidMount() {
        if (chrome && chrome.storage && chrome.storage.local) {
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
                  <StyledCard 
                    key={date} 
                    date={date} 
                    words={this.state.history[date]} 
                    deleteWord={(word) => console.log(`deleting ${word}`)}
                    />
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