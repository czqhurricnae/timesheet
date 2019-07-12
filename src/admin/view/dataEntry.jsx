import React, { Component } from 'react'
import { Grid,
         Segment,
         Button,
         Header,
         Icon } from 'semantic-ui-react'
import Entry from './entry'
import EntryForm from './entryForm'

const datasheets = {}

const datasheet = {
  inputs: [
    {value: ''},
    {value: ''},
  ],
  selected: ''
}

const fields ={inputs:
                [{field: 'inputs[0].value', label: '机号', placeholder: 'Aircraft', message: '请输入机号'},
                 {field: 'inputs[1].value', label: '工时', placeholder: 'Time', message: '请输入工时'}],
               selected: {field: 'selected', label: '项目', placeholder: 'Task', message: '请选择项目'}
              }

const source = [
  {
    'title': 'Rempel, Smith and Hilll',
    'description': 'Pre-emptive heuristic software',
    'image': 'https://s3.amazonaws.com/uifaces/faces/twitter/funwatercat/128.jpg',
    'price': '$83.27'
  },
  {
    'title': 'Kuvalis and Sons',
    'description': 'Down-sized static middleware',
    'image': 'https://s3.amazonaws.com/uifaces/faces/twitter/rickyyean/128.jpg',
    'price': '$70.66'
  },
  {
    'title': 'Kunde and Sons',
    'description': 'Universal system-worthy capacity',
    'image': 'https://s3.amazonaws.com/uifaces/faces/twitter/eugeneeweb/128.jpg',
    'price': '$26.30'
  },
  {
    'title': 'White, Cronin and Ratke',
    'description': 'Assimilated static solution',
    'image': 'https://s3.amazonaws.com/uifaces/faces/twitter/dhilipsiva/128.jpg',
    'price': '$82.48'
  },
  {
    'title': 'Lemke, West and Brekke',
    'description': 'Extended bottom-line matrix',
    'image': 'https://s3.amazonaws.com/uifaces/faces/twitter/webtanya/128.jpg',
    'price': '$32.47'
  }
]

class DataEntry extends Component {
  state = {
    listFormID: [],
    stashFormID: [],
    openFormID: []
  }

  handleAddEntryForm = () => {
    this.setState({listFormID: [...this.state.listFormID,
                                Number(this.state.listFormID.slice(-1)) + 1]})
  }

  handleDelete = (id) => {
    this._deleteFromDatasheets(id)
    this.setState({listFormID: this.state.listFormID.filter(t => t !== id),
                   stashFormID: this.state.stashFormID.filter(t => t !== id),
                   openFormID: this.state.openFormID.filter(t => t !== id)})
  }

  handleStash = (id, stashDatasheet) => {
    this._stashToDatasheets(id, stashDatasheet)
    this._stashEditableEntry(id)
  }

  handleOpen = (id) => {
    this._openEditableEntry(id)
  }

  _stashEditableEntry = (id) => {
    if (this.state.stashFormID.length === 0) {
      this.setState({stashFormID: [...this.state.stashFormID, id],
                     openFormID: [...this.state.openFormID.filter(t => t !== id)]})
    } else {
      this.state.stashFormID.forEach((item, index, array) => {
        if (this.state.stashFormID.indexOf(id) === -1) {
          this.setState({stashFormID: [...this.state.stashFormID, id],
                         openFormID: [...this.state.openFormID.filter(t => t !== id)]})
        }
      })
    }
  }

  _openEditableEntry = (id) => {
    if (this.state.openFormID.length === 0) {
      this.setState({openFormID: [...this.state.openFormID, id],
                     stashFormID: this.state.stashFormID.filter(t => t !== id)})
    } else {
      this.state.openFormID.forEach((item, index, array) => {
        if (this.state.openFormID.indexOf(id) === -1) {
          this.setState({openFormID: [...this.state.openFormID, id],
                         stashFormID: this.state.stashFormID.filter(t => t !== id)})
        }
      })
    }
  }

  _stashToDatasheets = (id, datasheet) => {
    datasheets[id] = JSON.parse(JSON.stringify(datasheet))
  }

  _deleteFromDatasheets = (id) => {
    delete datasheets[id]
  }

  render () {
    const children = this.state.listFormID.reduce((prev, cur, index, array) => {
      if (this.state.stashFormID.length !== 0) {
        if (this.state.stashFormID.indexOf(cur) !== -1) {
          prev.push(<Entry
                          key={index}
                          formID={cur}
                          datasheet={datasheets[cur]}
                          onDelete={this.handleDelete}
                          onOpen={this.handleOpen}
                        />
          )
          return prev
        }
      }
      if (this.state.openFormID.length !== 0) {
        if (this.state.openFormID.indexOf(cur) !== -1) {
          prev.push(<EntryForm
                      key={index}
                      fields={fields}
                      formID={cur}
                      datasheet={datasheets[cur]}
                      source={source}
                      onDelete={this.handleDelete}
                      onStash={this.handleStash}
                      isOpen={true}
                    />)
          return prev
        }
      }
      prev.push(<EntryForm
                  key={index}
                  fields={fields}
                  formID={cur}
                  datasheet={datasheets}
                  source={source}
                  onDelete={this.handleDelete}
                  onStash={this.handleStash}
                  isOpen={false}
                />)
      return prev
    }, [])
    return (
      <Grid centered>
        <Grid.Column>
          <Segment.Group >
            <Segment inverted textAlign='center'>
              <Header as='h6' icon>
                <Icon name='keyboard'>工时管理</Icon>
              </Header>
            </Segment>
            <Segment>
              {children}
            </Segment>
            <Segment>
              <Grid>
                <Grid.Column textAlign='center'>
                  <Button
                    icon
                    circular
                    color='blue'
                    onClick={this.handleAddEntryForm}
                  >
                    <Icon name='plus' />
                  </Button>
                </Grid.Column>
              </Grid>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    )
  }
}

export default DataEntry
