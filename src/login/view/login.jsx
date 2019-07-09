import React from 'react'
import { List, InputItem, WhiteSpace, Button, WingBlank, Toast, Flex } from 'antd-mobile'
import { createForm } from 'rc-form'
import { get, post, put } from '../../utils/request'

import './style.css'

const fields = {
  jobNumber: {
    field: 'jobNumber',
    rule: {
      required: true,
      message: '请输入工号!'
    }
  },
  password: {
    field: 'password',
    rule: {
      required: true,
      message: '请输入密码!'
    }
  }
}

const headers = {'User-Agent': 'PostmanRuntime/7.13.0',
                 'Accept':'*/*',
                 'mode': 'no-cors',
                 'Content-Type': 'application/json',
                 'Cache-Control': 'no-cache',
                 'Host': 'localhost:5000'}

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  componentWillMount () {
    this.decoratorFactory = (field, rule) => this.props.form.getFieldDecorator(field, {
      rules: [].concat(rule)
    })
  }

  handleOnBlur = () => {
    const fieldsValue = this.props.form.getFieldsValue()
    for (const [name, value] of Object.entries(fieldsValue)) {
      this._saveToLocalStorage(name, value)
    }
  }

  handleSubmit = (e) => {
    let errors = []
    let account = {}
    const { getFieldError, validateFields } = this.props.form
    e.preventDefault()
    validateFields((error, value) => {
      for (const field of Object.keys(fields)) {
        const result = getFieldError(field)
        errors = result !== undefined ? errors.concat(result) : errors
      }
      if (errors.length > 0) {
        this._showToast(errors.join('\n'), 1)
      } else if (!this.state.hasError) {
        for (const field of Object.keys(this.state)) {
          const value = this._loadFromLocalStorage(field)
          const result = {}
          result[field] = value
          account = {...account, ...result}
        }
        post('http://localhost:5000', headers, account)
      }
    })
  }

  handleErrorClick = () => {
    if (this.state.hasError) {
      this._showToast('Please enter 6 digits.', 1)
    }
  }

  handleChange = (value) => {
    if (value.replace(/\s/g, '').length !== 6) {
      this.setState({
        hasError: true
      })
    } else if (!(/^\d+$/.test(value))){
      this.setState({
        hasError: true
      })
    } else {
      this.setState({
        hasError: false
      })
    }
  }

  _saveToLocalStorage (name, value) {
    if (value !== undefined) {
      localStorage.setItem(name, value)
    }
  }

  _loadFromLocalStorage (name) {
    const value = localStorage.getItem(name)
    return value
  }

  _showToast (information, time) {
    Toast.info(information, time)
  }

  render () {
    const{ jobNumber, password} = fields
    return (
      <div className='flex-container'>
        <div className='column-side'></div>
        <WingBlank size='lg'>
          <div className='column-main'>
            <List renderHeader={() => '登录'}>
              <WhiteSpace size='lg' />
              {this.decoratorFactory(jobNumber.field, jobNumber.rule)(
                <InputItem
                  error={this.state.hasError}
                  onErrorClick={this.handleErrorClick}
                  onChange={this.handleChange}
                  placeholder='job number'
                  onBlur={this.handleOnBlur}
                >工号
                </InputItem>)}
              <WhiteSpace size='lg'/>
              {this.decoratorFactory(password.field, password.rule)(
                <InputItem
                  type='password'
                  placeholder='****'
                  onBlur={this.handleOnBlur}
                >密码
                </InputItem>)}
            </List>
            <WhiteSpace size='lg'/>
            <Button
              type='primary'
              onClick={this.handleSubmit}
            >登录</Button>
          </div>
        </WingBlank>
        <div className='column-side'></div>
      </div>
    )
  }
}

const LoginWrapper = createForm()(Login)

export default LoginWrapper
