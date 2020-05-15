import React from 'react';
import Routing from './Routing';
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
      token: '',
      posts: [],
      subreddits: []

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

    let postsCall = await axios.get('http://127.0.0.1:8000/api/allposts')
      .then(response => {
        // handle success
        return response.data
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

    let subredditCall= await axios.get('http://127.0.0.1:8000/api/subreddits')
    .then(response => {
          return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })


    this.setState({
      posts: postsCall.data,
      subreddits: subredditCall
    })

    // console.log(this.state.posts,this.state.subreddits)


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
        
      }

      const config = {
                headers : {
                    'content-type' : 'multipart/form-data',
                    'Authorization' : 'Bearer '+ this.state.token
                }
            }



      await axios.post('http://127.0.0.1:8000/api/logout', data, config)
        .then(response => {
          //handle success
          console.log('loggedout')
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }


    this.setState({
      route: '/home',
      isLoggedIn: logging
    })

    console.log('is logged in:', this.state.isLoggedIn)

  }

  handleRegister() {
    this.setState({
      route: '/register'
    })
  }

  handleSubscribedPosts() {

    this.setState({
      showposts: 'subscribedposts'
    })

  }

  handleAllPosts() {

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
    // console.log(this.state)
    if (this.state.subreddits.length > 0) {
      return (
        <div className="App">
            <Routing
              // parentstate = {this.state}
              token = {this.state.token}
              user={this.state.user}
              isLoggedIn={this.state.isLoggedIn}
              setBearToken={this.setBearToken}
              route={this.state.route}
              subreddits={this.state.subreddits}
              showposts={this.state.showposts}
              posts={this.state.posts}
              users={this.state.users}
              handleHome={this.handleHome}
              handleLogging={this.handleLogging}
              handleAllPosts={this.handleAllPosts}
              handleSubscribedPosts={this.handleSubscribedPosts}
            />
        </div>
      )
    }
    else{
      return(
      <h6>In progress</h6>
      )
    }

  }
}



export default App;
