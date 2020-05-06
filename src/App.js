import React from 'react';
import Nav from './Navbar';
import Main from './Main';
import './App.css';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      route: '/home',
      isLoggedin: false,
      users: []
    })

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }


  async componentDidMount() {
    let data = {
      email: 'email@email.com',
      password: 'password'
    }

    await axios.get('http://127.0.0.1:8000/api/users', data)
      .then(response =>  {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

      // this.setState({
      //   users: response
      // })
  }

  handleHome(){
    this.setState({
      route: '/home'
    })
  }

  handleLogin() {
    this.setState({
      route: '/login'
    })
  }

  handleRegister() {
    this.setState({
      route: '/register'
    })
  }

  render() {
    if (this.state.route) {
      return (
        <div className="App">
          <Nav route={this.state.route} isLoggedin={this.state.isLoggedin} handleHome = {this.handleHome} handleLogin={this.handleLogin} handleRegister={this.handleRegister} />
          <Main route={this.state.route} />
        </div>
      )
    }

  }
}



export default App;
