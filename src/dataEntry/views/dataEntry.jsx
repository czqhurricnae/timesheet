import React, { Component } from 'react'
import {
  Grid,
  Segment,
  Button,
  Header,
  Icon
} from 'semantic-ui-react'
import Entry from './entry'
import EntryForm from './entryForm'

const datasheets = {}

const fields ={date: {field: 'date', label: '日期', placeholder: 'Date', message: '请选择日期'},
               inputs:
                [{field: 'inputs[0].value', label: '机号', placeholder: 'Aircraft', message: '请输入机号'},
                 {field: 'inputs[1].value', label: '工时', placeholder: 'Time', message: '请输入工时'}],
               selected: {field: 'selected', label: '项目', placeholder: 'Task', message: '请选择项目'}
}

class DataEntry extends Component {
  state = {
    listFormID: [],
    stashFormID: [],
    openFormID: []
  }

  componentDidMount() {
    const projectApi = 'http://182.61.145.178:3000/stage/api/projects/';
    fetch(projectApi)
      .then((response) => {
        if (response.status !== 200) {
              throw new Error('Fail to get response with status ' + response.status);
        }
        response.json()
          .then((responseJson) => {
            if (responseJson) {
              const source = responseJson.map((item, index, array) => {
                item.tabIndex = "0";
                return item;
              })
              this.setState({ source });
            }
          })
          .catch((error) => {
            this.setState({ source: null });
          })
          .catch((error) => {
            this.setState({ source: null });
          });
      });
  }

  handleAddEntryForm = () => {
    this.setState({
      listFormID: [...this.state.listFormID,
        Number(this.state.listFormID.slice(-1)) + 1
      ]
    })
  }

  handleDelete = (id) => {
    this._deleteFromDatasheets(id)
    this.setState({
      listFormID: this.state.listFormID.filter(t => t !== id),
      stashFormID: this.state.stashFormID.filter(t => t !== id),
      openFormID: this.state.openFormID.filter(t => t !== id)
    })
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
      this.setState({
        stashFormID: [...this.state.stashFormID, id],
        openFormID: [...this.state.openFormID.filter(t => t !== id)]
      })
    } else {
      this.state.stashFormID.forEach((item, index, array) => {
        if (this.state.stashFormID.indexOf(id) === -1) {
          this.setState({
            stashFormID: [...this.state.stashFormID, id],
            openFormID: [...this.state.openFormID.filter(t => t !== id)]
          })
        }
      })
    }
  }

  _openEditableEntry = (id) => {
    if (this.state.openFormID.length === 0) {
      this.setState({
        openFormID: [...this.state.openFormID, id],
        stashFormID: this.state.stashFormID.filter(t => t !== id)
      })
    } else {
      this.state.openFormID.forEach((item, index, array) => {
        if (this.state.openFormID.indexOf(id) === -1) {
          this.setState({
            openFormID: [...this.state.openFormID, id],
            stashFormID: this.state.stashFormID.filter(t => t !== id)
          })
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

  render() {
    const children = this.state.listFormID.reduce((prev, cur, index, array) => {
      if (this.state.stashFormID.length !== 0) {
        if (this.state.stashFormID.indexOf(cur) !== -1) {
          prev.push(<Entry
                          key={index}
                          formID={cur}
                          datasheet={datasheets[cur]}
                          onDelete={this.handleDelete}
                          onOpen={this.handleOpen}
                        />)
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
                      source={this.state.source}
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
                  source={this.state.source}
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
                <Icon name='keyboard'>工时录入</Icon>
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
