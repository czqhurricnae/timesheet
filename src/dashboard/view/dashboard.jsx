import React from 'react'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'
import './style.css'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleOpenChange () {
    this.setState({ open: !this.state.open })
  }

  render () {
    // fix in codepen
    const sidebar = (<List>
      <List.Item></List.Item>
    </List>)

    return (
      <div>
        <NavBar
          icon={<Icon type='ellipsis' />}
          onLeftClick={this.handleOpenChange.bind(this)}
        >
          Basic
        </NavBar>
        <Drawer
          className='my-drawer'
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebar={sidebar}
          open={this.state.open}
          handleOpenChange={this.handleOpenChange.bind(this)}
        >
          用户面板
        </Drawer>
      </div>
    )
  }
}

export default Dashboard
