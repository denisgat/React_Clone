import React from 'react';
import Routing from './Routing';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

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
      subreddits: [],
      users: []
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.setBearToken = this.setBearToken.bind(this);
    this.handleLogging = this.handleLogging.bind(this);
    this.handleSubscribedPosts = this.handleSubscribedPosts.bind(this);
    this.handleAllPosts = this.handleAllPosts.bind(this);
    this.setPosts = this.setPosts.bind(this);
    this.setSubreddits = this.setSubreddits.bind(this);
    this.timeChange = this.timeChange.bind(this);
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

    let subredditsCall = await axios.get('http://127.0.0.1:8000/api/allsubreddits')
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

    let usersCall = await axios.get('http://127.0.0.1:8000/api/allusers')
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


    this.setState({
      posts: postsCall.data,
      subreddits: subredditsCall,
      users: usersCall
    })

    if (window.localStorage.token) {
      this.setState({
        token: JSON.parse(window.localStorage.token),
        user: JSON.parse(window.localStorage.user),
        isLoggedIn: JSON.parse(window.localStorage.isLoggedIn)
      })
    }

    console.log(this.state.posts, this.state.subreddits, this.state.users)
  }

  setSubreddits(newsubreddits) {
    this.setState({
      subreddits: newsubreddits,
    })

  }

  setPosts(newposts) {
    this.setState({
      posts: newposts,
    })
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
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + this.state.token
        }
      }



      await axios.post('http://127.0.0.1:8000/api/logout', data, config)
        .then(response => {
          window.localStorage.clear();
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

  timeChange(createdTime){
    let currentTime = new Date().getTime();
    let difference = currentTime - createdTime;
    let days = Math.floor(difference / 86400000);
    let hours = Math.floor(difference / 3600000);     //milliseconds per hour
    let minutes = Math.floor(difference / 60000);      //milliseconds per minute   
    if (minutes < 1) {
      return 'Just now';
    }
    if (minutes === 1) {
      return '1 minute ago';
    }
    if (minutes < 60) {
      return minutes + ' minutes ago'
    }
    if (hours === 1) {
      return hours + ' hour ago'
    }
    if (hours < 24) {
      return hours + ' hours ago'
    }
    if (days === 1) {
      return days + ' day ago'      }
    if (days > 1) {
      return days + ' days ago'      }
  }

  render() {
    // console.log(this.state.subreddits)

    if (this.state.subreddits.length > 0) {
      return (
        <div className="App">
          <Routing
            // parentstate = {this.state}
            token={this.state.token}
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
            setPosts={this.setPosts}
            setSubreddits={this.setSubreddits}
            timeChange={this.timeChange}
          />
        </div>
      )
    }

    else {
      return (
        <div className=' container text-center fa-3x'>
          <FontAwesomeIcon icon={faSync} spin />
          <h6>In progress</h6>
        </div>
      )
    }

  }
}



export default App;
