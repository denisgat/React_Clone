import React from 'react';
const axios = require('axios');

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confpassword: '',
            token: '',
            user: ''
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfPasswordChange = this.handleConfPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(event) {
        this.setState({
            username: event.target.value,
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleConfPasswordChange(event) {
        this.setState({
            confpassword: event.target.value
        });
    }



    async handleSubmit(event) {
        event.preventDefault();

        const data = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.username === '' || this.state.email === '' || this.state.password === '' || this.state.confpassword === '') {
            alert('A field has been left empty, please fill out all fields')
        }
        if (this.state.password !== this.state.confpassword) {
            alert('Confirmation Password does not match')
            await this.setState({
                confpassword: '',
                password: ''
            })
        }

        else {
            let result = await axios.post('http://127.0.0.1:8000/api/register', data)
                .then(function (response) {
                    console.log(response.data);
                    return response.data
                })
                .catch(function (error) {
                    console.log(error);
                })

                console.log(result)

            this.props.setBearToken(result.token, result.user)
            this.props.handleLogging()
            
            console.log(this.state)
        }

    }

    render() {
        return (
            <div className='container px-5' >
                <h1 >Register</h1>
                <form onSubmit={this.handleSubmit} className='mt-5'>
                    <div className="form-group">
                        <label>UserName</label>
                        <input onChange={this.handleUserChange} value={this.state.username} type="text" className="form-control" id="exampleInputUserName" aria-describedby="emailHelp" placeholder="Enter UserName" />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input onChange={this.handleEmailChange} value={this.state.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={this.handlePasswordChange} value={this.state.password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input onChange={this.handleConfPasswordChange} value={this.state.confpassword} type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" />
                    </div>
                    <input className='btn btn-lg btn-primary' type="submit" value="Register" />
                </form>
            </div>
        )
    }
}

export default Register