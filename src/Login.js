import React from 'react';
const axios = require('axios');


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: '',
            user: '',
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password
        }


        let result = await axios.post('http://127.0.0.1:8000/api/login', data)
            .then(response => {
                // console.log(response.data);
                return response.data
                // history.push('/')
            })
            .catch(function (error) {
                console.log(error);
            })

        console.log(result)

        this.props.setBearToken(result.token, result.user)
        this.props.handleLogging()

        // console.log(this.state)

    }

    render() {
        return (
            <div className='' style={{ height: '100vh', backgroundColor: '#f0f0f5' }}>
                <div className='container px-5' >
                    <h1 className='p-3'>Login</h1>
                    <form onSubmit={this.handleSubmit} className='mt-5'>
                        <div className="form-group">
                            <label>Email address</label>
                            <input onChange={this.handleEmailChange} value={this.state.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input onChange={this.handlePasswordChange} value={this.state.password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <input className='btn btn-lg btn-primary' type="submit" value="Login"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;