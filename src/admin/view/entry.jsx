import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const Entry = (props) => {
  const formID = props.formID ? props.formID : null

  const handleDelete = (event) => {
    event.preventDefault()
    if (props.onDelete) {
      props.onDelete(formID)
    }
  }
  return (
    <Card.Group centered>
      <Card>
        <Card.Content>
          <Card.Header>
            例行工作
          </Card.Header>
          <Card.Description textAlign='center'>
            <h2>空调健康测试</h2>
          </Card.Description>
          <Card.Description textAlign='center'>
            <h2>3</h2>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <span className='right floated'>
            <Icon name='edit' />
          </span>
          <span className='right floated'>
            <Icon name='trash' color='red' onClick={handleDelete} />
          </span>
        </Card.Content>
      </Card>
    </Card.Group>

  )
}

export default Entry
