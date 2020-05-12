import React from 'react';
import Nav from './Navbar';
import Main from './Main';
import './App.css';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: '/home',
      showposts: 'allposts',
      isLoggedIn: false,
      user: {},
      token: ''
      
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.setBearToken = this.setBearToken.bind(this);
    this.handleLogging = this.handleLogging.bind(this);
    this.handleSubscribedPosts = this.handleSubscribedPosts.bind(this);
    this.handleAllPosts = this.handleAllPosts.bind(this);
  }


  async componentDidMount() {
    // let data = {
    //   email: 'email@email.com',
    //   password: 'password'
    // }

    //  let result = await axios.get('http://127.0.0.1:8000/api/posts')
    //     .then(response => {
    //       // handle success
              // return response.data
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
            // this.setState({
            //   posts: result.posts
            // })

    //     console.log(this.state.users);

  }

  handleHome() {
    this.setState({
      route: '/home'
    })
  }

  handleLogin() {
    this.setState({
      route: '/login'
    })
  }

  async handleLogging() {

    let logging = ''

    if (this.state.isLoggedIn === false) {
      logging = true
    }
    else {
      logging = false

      const data = {
        headers: { Authorization: "Bearer " + this.state.token }
      }

      await axios.get('http://127.0.0.1:8000/api/logout', data)
        .then(response => {
          //handle success
          console.log('loggedout')
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }


    this.setState({
      route: '/home',
      isLoggedIn: logging
    })

    console.log('is logged in:' ,this.state.isLoggedIn)

  }

  handleRegister() {
    this.setState({
      route: '/register'
    })
  }

  handleSubscribedPosts(){

    this.setState({
      showposts: 'subscribedposts'
    })

  }

  handleAllPosts(){

      this.setState({
        showposts: 'allposts'
      })

  }

  setBearToken(token, user) {
    this.setState({
      token: token,
      user: user
    })
  }

  render() {
    if (this.state.route) {
      return (
        <div className="App">
          <Nav
            route={this.state.route}
            isLoggedIn={this.state.isLoggedIn}
            handleLogging={this.handleLogging}
            handleHome={this.handleHome}
            handleLogin={this.handleLogin}
            handleRegister={this.handleRegister} />
          <Main
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            setBearToken={this.setBearToken}
            route={this.state.route}
            showposts={this.state.showposts}
            users={this.state.users}
            handleHome={this.handleHome}
            handleLogging={this.handleLogging}
            handleAllPosts={this.handleAllPosts}
            handleSubscribedPosts={this.handleSubscribedPosts}
          />
        </div>
      )
    }

  }
}



export default App;
