import React, { Component } from 'react'
import { Grid,
         Segment,
         Button,
         Header,
         Icon } from 'semantic-ui-react'
import EntryForm from './entryForm'
import Entry from './entry'

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
    updateFormID: []
  }

  handleAddEntryForm = () => {
    this.setState({listFormID: [...this.state.listFormID,
                                this.state.listFormID.length == 0 ?
                                this.state.listFormID.length + 1 :
                                Number(this.state.listFormID.slice(-1)) + 1]})
  }

  handleFormDelete = (id) => {
    this.setState({listFormID: this.state.listFormID.filter(t => t !== id)})
  }

  handleEntryDelete= (id) => {
    this.setState({listFormID: this.state.listFormID.filter(t => t !== id),
                   updateFormID: this.state.updateFormID.filter(t => t !== id)})
  }

  handleSave = (id) => {
    this._updateEditableEntry(id)
  }

  _updateEditableEntry = (id) => {
    if (this.state.updateFormID.length == 0) {
      this.setState({updateFormID: [...this.state.updateFormID, id]})
    } else {
      this.state.updateFormID.forEach((item, index, array) => {
        if (this.state.updateFormID.indexOf(id) == -1) {
          this.setState({updateFormID: [...this.state.updateFormID, id]})
        }
      })
    }
  }

  render () {
    const children = []
    this.state.listFormID.map((child, index) => {
      if (this.state.updateFormID.length !== 0) {
        if (this.state.updateFormID.indexOf(child) !== -1) {
          children.push(<Entry
                          formID={child}
                          onDelete={this.handleEntryDelete}
                        />)
        } else {
          children.push(<EntryForm
                          key={index}
                          formID={child}
                          fields={fields}
                          onDelete={this.handleFormDelete}
                          onSave={this.handleSave}/>)
        }
      } else {
          children.push(<EntryForm
                          key={index}
                          formID={child}
                          fields={fields}
                          onDelete={this.handleFormDelete}
                          onSave={this.handleSave}/>)
      }
    })

    console.log(children)
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
