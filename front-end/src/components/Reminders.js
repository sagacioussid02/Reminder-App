import React, {Component} from 'react'
import ReminderService from '../api/ReminderService'
import AuthenticationService from './AuthenticationService';

class Reminders extends Component{
    constructor(props){
        super(props)
        this.state={
            rems : [
/*                 {id: 1, description: 'Learn React', done:false, targetDate:new Date()},
                {id: 2, description: 'Become an expert', done:false, targetDate:new Date()},
                {id: 3, description: 'Travel World', done:false, targetDate:new Date()},
                {id: 4, description: 'Be rich', done:false, targetDate:new Date()} */

            ],
            message: null
        }
    }

    //component when loaded for the first time and shown in the browser
    componentDidMount = () => {
        this.refreshReminders()
    }

    refreshReminders = () => {
        let username = AuthenticationService.getLoggedInUsername();
        ReminderService.retrieveReminders(username)
        .then(
            response => {
                console.log(response)
                this.setState({
                    rems: response.data
                })
            }
        )
    }

    deleteReminder = (id) => {
        let username = AuthenticationService.getLoggedInUsername();
        console.log(id)
        ReminderService.deleteReminder(username, id)
        .then(
            respomse => {
                this.setState({
                    message: `Delete success id: ${id}` 
                })
                this.refreshReminders()
            }
        )
    }

    updateReminder = (id) => {
        console.log("update-->"+id)
        this.props.history.push(`reminders/${id}`)
    }

    addReminder = () => {
        this.props.history.push(`reminders/-1`)
    }

    render(){
    return <div>
            <h1>List of Reminders</h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th>
                        id
                    </th>
                    <th>
                        description
                    </th>
                    <th>
                        done
                    </th>
                    <th>
                        date
                    </th>
                    <th>
                        Update
                    </th>
                    <th>
                        Delete
                    </th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.state.rems.map(
                            rem => 
                        <tr>
                        <td>
                            {rem.id}
                        </td>
                        <td>
                            {rem.description}
                        </td>
                        <td>
                            {rem.done.toString()}
                        </td>
                        <td>
                            {rem.targetDate.toString()}
                        </td>
                        <td>
                            <button onClick={() => this.updateReminder(rem.id)} className="btn btn-success">Update</button>
                        </td>
                        <td>
                            <button onClick={() => this.deleteReminder(rem.id)} className="btn btn-warning">Delete</button>
                        </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="row">
                <button onClick={this.addReminder} className="btn btn-success">Add</button>
            </div>
            </div>
        </div>
    }

}

export default Reminders