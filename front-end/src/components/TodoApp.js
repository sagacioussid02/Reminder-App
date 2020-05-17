import React, {Component} from 'react'
import Login from './Login'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Welcome from './Welcome'
import ErrorHandling from './ErrorHandling'
import Reminders from './Reminders'
import Header from './Header'
import Footer from './Footer'
import Logout from './Logout'
import AuthenticatedRoute from './AuthenticatedRoute'
import ReminderUpdate from './ReminderUpdate'

class TodoApp extends Component{
    render(){
        return(
            <div>
                <Router>
                    <>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/login" exact component={Login}/>
                        <AuthenticatedRoute path="/reminders/:id" exact component={ReminderUpdate}/>
                        <AuthenticatedRoute path="/welcome/:name" exact component={Welcome}/>
                        <AuthenticatedRoute path="/reminders" exact component={Reminders}/>
                        <AuthenticatedRoute path="/logout" exact component={Logout}/>
                        <Route path="/" component={ErrorHandling}/>
                    </Switch>
                    <Footer />
                    </>
                </Router>
           </div>
        )
    }
}
export default TodoApp