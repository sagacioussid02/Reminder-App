import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloService from '../api/HelloService'

class Welcome extends Component{

    constructor(props){
        super(props)
        this.state ={
            welcomeMessage: ''
        }
    }

    retrieveWelcomeMessage = () => {
        HelloService.executeHelloService()
        .then(response => this.handleSuccessfulResponse(response))
        //.catch()
    }

    handleSuccessfulResponse = (response) => {
        this.setState({welcomeMessage:response.data.message})
    }
    render(){
    return (<div>
        <h1>Welcome</h1>
        <div className="container">
            Welcome {this.props.match.params.name}. Reminders management console <Link to="/reminders">here</Link>
        </div>
        <div className="container">
            Click to get customized message:
            <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
        </div>
        <div className="container">
            {this.state.welcomeMessage}
        </div>
    </div>)
    }

}

export default Welcome