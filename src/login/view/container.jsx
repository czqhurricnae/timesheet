import React from 'react'
import { List, InputItem, WhiteSpace, Button, WingBlank, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import {get, post, put } from '../../utils/request'

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
        },
      hasError: false,
      }
    }
  }

  componentWillMount () {
    this.decoratorFactory = (field, rule) => this.props.form.getFieldDecorator(field, {
      rules: [].concat(rule)
    })
  }

  componentDidMount () {
    // this.autoFocusInst.focus();
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
      for (const field of Object.keys(this.state)) {
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
    if (value.replace(/\s/g, '').length != 6) {
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
    const{ jobNumber, password} = this.state
    return (
      <WingBlank>
        <WhiteSpace />
        <List renderHeader={() => '登录'}>
          {this.decoratorFactory(jobNumber.field, jobNumber.rule)(
            <InputItem
              error={this.state.hasError}
              onErrorClick={this.handleErrorClick}
              onChange={this.handleChange}
              placeholder='job number'
              onBlur={this.handleOnBlur}
            >工号
          </InputItem>)}
          <WhiteSpace />
          {this.decoratorFactory(password.field, password.rule)(
            <InputItem
              type='password'
              placeholder='****'
              onBlur={this.handleOnBlur}
              >密码
            </InputItem>)}
        </List>
        <WhiteSpace />
        <Button
          type='primary'
          onClick={this.handleSubmit}
        >登录</Button>
      </WingBlank>
    )
  }
}

const LoginWrapper = createForm()(Login)

export default LoginWrapper
