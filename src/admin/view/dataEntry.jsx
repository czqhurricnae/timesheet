import React, { Component } from 'react'
import { Grid,
         Segment,
         Button,
         Header,
         Icon } from 'semantic-ui-react'
import EntryForm from './entryForm'
import Entry from './entry'
import RcForm from './rcForm'

const fields = {
  select: {
    label: '类别',
    placeholder: 'Kind',
    options: [
      { key: 'm', text: '杂项', value: '杂项' },
      { key: 'r', text: '例行工作', value: '例行工作' },
      { key: 'u', text: '非例行工作', value: '非例行工作' },
      { key: 't', text: '排故', value: '排故' },
      { key: 'o', text: '其他', value: '其他' }
    ]
  },
  inputs: [
    { label: '项目', placeholder: 'Task' },
    { label: '工时', placeholder: 'Time' }
  ]
}

class DataEntry extends Component {
  state = {
    listFormID: [],
    stashFormID: [],
    openFormID: []
  }

  handleAddEntryForm = () => {
    this.setState({listFormID: [...this.state.listFormID,
                                this.state.listFormID.length == 0 ?
                                this.state.listFormID.length + 1 :
                                Number(this.state.listFormID.slice(-1)) + 1]})
  }

  handleDeleteForm = (id) => {
    this.setState({listFormID: this.state.listFormID.filter(t => t !== id)})
  }

  handleDeleteEntry= (id) => {
    this.setState({listFormID: this.state.listFormID.filter(t => t !== id),
                   stashFormID: this.state.stashFormID.filter(t => t !== id)})
  }

  handleSave = (id) => {
    this._stashEditableEntry(id)
  }

  handleOpen = (id) => {
    this._openEditableEntry(id)
  }

  _stashEditableEntry = (id) => {
    if (this.state.stashFormID.length == 0) {
      this.setState({stashFormID: [...this.state.stashFormID, id]})
    } else {
      this.state.stashFormID.forEach((item, index, array) => {
        if (this.state.stashFormID.indexOf(id) == -1) {
          this.setState({stashFormID: [...this.state.stashFormID, id]})
        }
      })
    }
  }

  _openEditableEntry = (id) => {
    if (this.state.openFormID.length == 0) {
      this.setState({openFormID: [...this.state.openFormID, id],
                     stashFormID: this.state.stashFormID.filter(t => t !== id)})
    } else {
      this.state.openFormID.forEach((item, index, array) => {
        if (this.state.openFormID.indexOf(id) == -1) {
          this.setState({openFormID: [...this.state.openFormID, id],
                         stashFormID: this.state.stashFormID.filter(t => t !== id)})
        }
      })
    }
  }

  render () {
    const children = this.state.listFormID.reduce((prev, cur, index, array) => {
      if (this.state.stashFormID.length !== 0) {
        if (this.state.stashFormID.indexOf(cur) !== -1) {
          prev.push(<Entry
                          formID={cur}
                          onDelete={this.handleDeleteEntry}
                          onOpen={this.handleOpen}
                        />
          )
          return prev
        }
      }
      if (this.state.openFormID.length !== 0) {
        if (this.state.openFormID.indexOf(cur) !== -1) {
          prev.push(<RcForm></RcForm>)
          return prev
        }
      }
      prev.push(<EntryForm
                      key={index}
                      formID={cur}
                      fields={fields}
                      onDelete={this.handleDeleteForm}
                      onSave={this.handleSave}/>)
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
