import React from 'react'
import { formShape } from 'rc-form'
import createForm from 'rc-form/lib/createDOMForm'
import { Form, Grid } from 'semantic-ui-react'

import _ from 'lodash'

import DatePicker from './datepicker'
import Search from './search'

import './style.css'

class OriginForm extends React.Component {
  static propTypes = {
    form: formShape,
  };

  componentDidMount () {
    const datasheet = this.props.datasheet
    this.props.form.setFieldsValue(datasheet)
  }

  handleStash = (event) => {
    event.preventDefault();
    const formID = this.props.formID ? this.props.formID : null;
    const stashDatasheet = this.props.form.getFieldsValue();
    console.log('Values of all fields');
    console.log(stashDatasheet);

    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (this.props.onStash) {
          this.props.onStash(formID, stashDatasheet);
        }
      } else {
        console.log('error', error, values);
      }
    });
  }

  handleDelete = (event) => {
    event.preventDefault();
    const formID = this.props.formID ? this.props.formID : null;
    if (this.props.onDelete) {
      this.props.onDelete(formID);
    }
  }

  resetFields = () => {
    this.props.form.resetFields();
  }

  render() {
    const { onStash, onDelete, formID, isOpen , ...rest } = this.props;
    const { getFieldDecorator, getFieldError } = this.props.form;
    const fields = this.props.fields;
    const datasheet = this.props.datasheet;
    const value = datasheet && datasheet.date ? datasheet.date : null;
    const date = value ? new Date(Date.parse(String(value))) : new Date();

    return (
      <div className='ui centered cards'>
        <div className='ui card'>
          <div className='extra content'>
            <h5 className='ui left aligned header'>
              {formID} #
            </h5>
            <form className='ui form' onSubmit={this.handleStash}>
              <Form.Field>
                <label>{fields.date.label}</label>
                <Grid>
                  <Grid.Column>
                    {getFieldDecorator(fields.date.field, {
                        initialValue: date,
                      rulse: [{
                        required:true,
                        message: fields.date.message,
                      }],
                    })(<DatePicker
                    />)}
                    <div style={{ color: 'red' }}>
                      {(getFieldError('date') || []).join(', ')}
                    </div>
                  </Grid.Column>
                </Grid>
              </Form.Field>
              <Form.Field>
                <label>{fields.selected.label}</label>
                <Grid>
                  <Grid.Column>
                    {getFieldDecorator(fields.selected.field, {
                      initialValue: '',
                      rules: [{
                        required: true,
                        message: fields.selected.message,
                      }],
                    })(<Search
                         {...rest}
                    />)}
                    <div style={{ color: 'red' }}>
                      {(getFieldError('selected') || []).join(', ')}
                    </div>
                  </Grid.Column>
                </Grid>
              </Form.Field>
              {fields.inputs.map((item, index) => {
                return (
                  <div className='field' key={item.label}>
                    <label>{item.label}</label>
                    <div className='ui input'>{getFieldDecorator(item.field, {
                        initialValue: '',
                        rules: [{
                          required: true,
                          message: item.message,
                        }],
                    })(
                        <input placeholder={item.placeholder} type='text'/>
                      )}</div>
                    <div style={{ color: 'red' }}>
                      {(getFieldError(item.field) || []).join(', ')}
                    </div>
                  </div>
                )})}
              <div className='ui grid'>
                <div className='center aligned column'>
                  <div className='ui buttons'>
                    <button className='ui button' onClick={this.handleDelete}>删除</button>
                    <div className='or'></div>
                    <button className='ui button' onClick={this.resetFields}>重置</button>
                    <div className='or'></div>
                    <button className='ui positive button' onClick={this.handleStash}>暂存</button>
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

const EntryForm = createForm({
  onFieldsChange(_, changedFields, allFields) {
    console.log('onFieldsChange: ', changedFields, allFields)
  },
  onValuesChange(_, changedValues, allValues) {
    console.log('onValuesChange: ', changedValues, allValues)
  },
})(OriginForm)

export default EntryForm
