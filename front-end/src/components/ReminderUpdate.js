import React, {Component} from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ReminderService from '../api/ReminderService'
import AuthenticationService from './AuthenticationService'

class ReminderUpdate extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id
        }
    }

    onSubmit = (values) => {
        let username = AuthenticationService.getLoggedInUsername();
        
        if(this.state.id===-1){
            ReminderService.addReminder(username, {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(
                () => this.props.history.push('/reminders')
            )
        } else{
            ReminderService.updateReminder(username, this.state.id, {
              id: this.state.id,
              description: values.description,
              targetDate: values.targetDate
            }).then(
               () => this.props.history.push('/reminders')
          )
        }
    }

    validate = (values) => {
        let error = {}
        if(!values.description){
            error.description = 'Enter a Description'
        } else if(values.description.length<5){
            error.description = 'Enter atleast 5 characters'
        }

        if(!moment(values.targetDate).isValid()){
            error.targetDate = 'Enter correct target date'
        }
        return error
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUsername();
        ReminderService.retrieveReminder(username, this.state.id)
        .then(response => {
            this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            })
        })
    }

    render() {
        let {description, targetDate}= this.state
        return (
            <div>
                <h1>Reminder</h1>
                <div className="container">
                    <Formik initialValues={{ description, targetDate }}
                            onSubmit={this.onSubmit}
                            validate={this.validate}
                            enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default ReminderUpdate