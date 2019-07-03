import React from 'react'
import { List, InputItem, WhiteSpace, Button, WingBlank, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'

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
        }
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
    const { getFieldError, validateFields } = this.props.form
    e.preventDefault()
    validateFields((error, value) => {
      for (const field of Object.keys(this.state)) {
        const result = getFieldError(field)
        errors = result !== undefined ? errors.concat(result) : errors
      }
      if (errors.length > 0) {
        this._showToast(errors.join('\n'), 1)
      }
    })
  }

  _saveToLocalStorage (name, value) {
    if (value !== undefined) {
      localStorage.setItem(name, value)
    }
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
          {this.decoratorFactory(jobNumber.field, jobNumber.rule)
            (<InputItem
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
