import React from 'react'
import { Grid, Segment, Table, Button, Icon } from 'semantic-ui-react'

const PersonnelTable = () => (
  <Grid centered>
    <Grid.Column>
      <Segment.Group>
        <Segment>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Registration Date</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Premiun Plan</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>September 14, 2013</Table.Cell>
                <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                <Table.Cell>No</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jamie Harington</Table.Cell>
                <Table.Cell>January 11, 2014</Table.Cell>
                <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                <Table.Cell>Yes</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jill Lewis</Table.Cell>
                <Table.Cell>May 11, 2014</Table.Cell>
                <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                <Table.Cell>Yes</Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colspan='4'>
                  <Button floated='right' icon labelPosition='left' primary size='small'>
                    <Icon name='user' />Add User
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </Segment.Group>
    </Grid.Column>
  </Grid>
)

export default PersonnelTable
