import React from 'react';
import ReactDOM from 'react-dom';
import { formShape} from 'rc-form';
import createForm from 'rc-form/lib/createDOMForm'
import {Form, Input} from 'semantic-ui-react'

class MyForm extends React.Component {
  static propTypes = {
    form: formShape,
  };

  onSubmit = (event) => {
    event.preventDefault();
    console.log('Values of all fields');
    console.log(this.props.form.getFieldsValue());

    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        console.log('ok', values);
      } else {
        console.log('error', error, values);
      }
    });
  }

  setFields = (event) => {
    event.preventDefault()
    this.props.form.setFieldsValue({
      timesheet: {
        kind: '例行工作',
        task: '清洁散热器',
        time: '3'
      },
    });
  }

  resetFields = (event) => {
    event.preventDefault()
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <div className='ui centered cards'>
        <div className='ui card'>
          <div className='extra content'>
            <h5 className='ui left aligned header'>
              1 #
            </h5>
            <form className='ui form'>
              <div className='field'>
                <label>类型</label>
                <div className='ui input'>
                  {getFieldDecorator('timesheet.kind', {
                    initialValue: '',
                    rules: [{
                      required: true,
                      message: '请选择类型',
                    }],
                  })(
                    <input placeholder='Kind' type='text'/>
                  )}
                </div>
                <div style={{ color: 'red' }}>
                  {(getFieldError('timesheet.kind') || []).join(', ')}
                </div>
              </div>
              <div className='field'>
                <label>项目</label>
                <div className='ui input'>
                  {getFieldDecorator('timesheet.task', {
                    initialValue: '',
                    rules: [{
                      required: true,
                      message: '请选择任务',
                    }],
                  })(
                    <input placeholder='Task' type='text'/>
                  )}
                </div>
                <div style={{ color: 'red' }}>
                  {(getFieldError('timesheet.task') || []).join(', ')}
                </div>
              </div>
              <div className='field'>
                <label>工时</label>
                <div className='ui input'>
                  {getFieldDecorator('timesheet.time', {
                    initialValue: '',
                    rules: [{
                      required: true,
                      message: '请输入工时',
                    }],
                  })(
                    <input placeholder='Time' type='text' />
                  )}
                </div>
                <div style={{ color: 'red' }}>
                  {(getFieldError('timesheet.time') || []).join(', ')}
                </div>
              </div>
              <div className='ui grid'>
                <div className='center aligned column'>
                  <div className='ui buttons'>
                    <button className='ui button' onClick={this.resetFields}>重置</button>
                    <div className='or'></div>
                    <button className='ui button'>删除</button>
                    <div className='or'></div>
                    <button className='ui positive button' onClick={this.onSubmit}>保存</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const RcForm= createForm({
  onFieldsChange(_, changedFields, allFields) {
    console.log('onFieldsChange: ', changedFields, allFields);
  },
  onValuesChange(_, changedValues, allValues) {
    console.log('onValuesChange: ', changedValues, allValues);
  },
})(MyForm);

export default RcForm
