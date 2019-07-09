import React from 'react'
import { Card,
  Grid,
  Form,
  Header,
  Select,
  Input,
  Button } from 'semantic-ui-react'

const EntryForm = props => {
  const select = props.fields.select ? props.fields.select : {}
  const options = select.options ? select.options : {}
  const inputs = props.fields.inputs ? props.fields.inputs : {}
  const formID = props.formID ? props.formID : null

  const handleDelete = (event) => {
    event.preventDefault()
    if (props.onDelete) {
      props.onDelete(formID)
    }
  }

  const handleSave = (event) => {
    event.preventDefault()
    if (props.onSave) {
      props.onSave(formID)
    }
  }

  return (
    <Card.Group centered>
      <Card>
        <Card.Content extra>
          <Header as='h5' textAlign='left'>
            {formID} #
          </Header>
          <Form>
            <Form.Field
            >
              <label>{select.label}</label>
              <Select placeholder={select.placeholder} options={options} />
            </Form.Field>
            {inputs.map((input, index, array) =>
              (
                <Form.Field
                  key={input.label}
                  fluid
                >
                  <label>{input.label}</label>
                  <Input placeholder={input.placeholder} />
                </Form.Field>
              )
            )}
            <Grid>
              <Grid.Column textAlign='center'>
                <Button.Group>
                  <Button onClick={handleDelete}>删除</Button>
                  <Button.Or></Button.Or>
                  <Button positive onClick={handleSave}>保存</Button>
                </Button.Group>
              </Grid.Column>
            </Grid>
          </Form>
        </Card.Content>
      </Card>
    </Card.Group>)
}

export default EntryForm
