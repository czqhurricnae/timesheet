import React from 'react'
import { formShape } from 'rc-form'
import createForm from 'rc-form/lib/createDOMForm'
import { Form, Search, Label, Grid } from 'semantic-ui-react'

import PropTypes from 'prop-types'
import _ from 'lodash'

import DatePicker from './datepicker'

import './style.css'

const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

const initialState = { isLoading: false, results: [], value: '', open: false, segmentations: [] }

class OriginForm extends React.Component {
  static propTypes = {
    form: formShape,
  };

  state = initialState

  componentDidMount () {
    const datasheet = this.props.datasheet
    this.props.form.setFieldsValue(datasheet)
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title, open: false, })
    this.setSelected(result.title)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => this.handleSegment(this.state.value))

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const isMatch = result =>  this.state.segmentations.every((item, index, array) => {
          return new RegExp(item).test(result.title)
      })

      this.setState({
        isLoading: false,
        results: _.filter(this.props.source, isMatch)
      })

    }, 500)

    this.setSelected(value)
  }

  handleBlurSearch = (e) => {
    if (!e.relatedTarget) { var open = false}
    else if (e.relatedTarget && e.relatedTarget.classList) {
      open = _.includes(e.relatedTarget.classList, 'result');
    }
    this.setState({ open: open, focused: false, });
  }

  handleFocusSearch = (e) => {
    this.setState({ open: true, focused: true, });
  }

  handleSegment = (search) => {
  const segmentationApi = 'http://182.61.145.178:3000/stage/api/segmentations/';
  fetch(segmentationApi, {
    method: 'POST',
    headers: {
    'Content-type': 'application/json'
    },
    body: JSON.stringify({search})
  })
  .then((response) => (response.json())
    .then((responseJsonData) => {
        console.log(responseJsonData)
        this.setState({segmentations:responseJsonData.filter((item, index, array) => (item.length > 1))})
    })
    .catch((error) => {
        console.log(error);
    })
   )
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

  setSelected = (value) => {
    this.props.form.setFieldsValue({
      selected: value,
    })
  }

  render() {
    const { onStash, onDelete, formID, isOpen , ...rest } = this.props;
    const { getFieldDecorator, getFieldError } = this.props.form;
    const { isLoading, results } = this.state;
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
                         loading={isLoading}
                         onResultSelect={this.handleResultSelect}
                         onSearchChange={_.debounce(this.handleSearchChange, 500, {
                           leading: true
                         })}
                         results={results}
                         resultRenderer={resultRenderer}
                         placeholder={fields.selected.placeholder}
                         open={this.state.open}
                         onFocus={this.handleFocusSearch}
                         onBlur={this.handleBlurSearch}
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
