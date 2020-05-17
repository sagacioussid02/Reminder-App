import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService';

class Login extends Component{
    constructor(props){
        super(props)
        this.state= {
            username: 'username',
            password: 'password',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

    }

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loginClicked = () => {
        console.log("login clicked")
        if(this.state.username==='abc' && this.state.password==='abc'){
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
            this.setState({showSuccessMessage:true})
        }
        else{
            this.setState({hasLoginFailed:true})
        }
    }


    render(){
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
{/*                 <ShowLoginSuccess showSuccessMessage={this.state.showSuccessMessage} />
                <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} /> */}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials</div>}
                {this.state.showSuccessMessage && <div>Login SUcceessful</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button> 
                </div>
            </div>
        )
    }
}


function ShowInvalidCredentials(props){
    if(props.hasLoginFailed) return <div>Invalid credentials</div>
    return null
}

function ShowLoginSuccess(props){
    if(props.showSuccessMessage) return <div>Login SUcceessful</div>
    return null
}


export default Login