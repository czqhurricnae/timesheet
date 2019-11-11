import React from 'react'
import { Card, Icon, Header } from 'semantic-ui-react'
import moment from 'moment'

const Entry = (props) => {
  const formID = props.formID ? props.formID : null

  const handleDelete = (event) => {
    event.preventDefault()
    if (props.onDelete) {
      props.onDelete(formID)
    }
  }

  const handleOpen = (event) => {
    event.preventDefault()
    if (props.onOpen) {
      props.onOpen(formID)
    }
  }

  return (
    <Card.Group centered>
      <Card>
        <Card.Content>
          <Header as='h5' textAlign='left'>
            {formID} #
          </Header>
          <Card.Header>
            {moment(new Date(Date.parse(props.datasheet.date))).format('YYYY-MM-DD')}
          </Card.Header>
          <Card.Header>
            {props.datasheet.selected}
          </Card.Header>
          {props.datasheet.inputs.map((item, index) => (
            <Card.Description key={index} textAlign='center'>
              <h2>{item.value}</h2>
            </Card.Description>
          ))}
        </Card.Content>
        <Card.Content extra>
          <span className='right floated'>
            <Icon name='edit' onClick={handleOpen} />
          </span>
          <span className='left floated'>
            <Icon name='trash' color='red' onClick={handleDelete} />
          </span>
        </Card.Content>
      </Card>
    </Card.Group>
  )
}

export default Entry
