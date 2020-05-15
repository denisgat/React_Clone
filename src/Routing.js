import React from 'react';
import Login from './Login';
import Register from './Register';
import Nav from './Navbar';
import Subreddit from './Subreddit';
import User from './User';
import Home from './Home';
import Create from './CreateSubreddit';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';



function Posted() {
    return (
        <h1>In Post</h1>
    )
}

// history.push("/viewStream");


function Routing(props) {
    // console.log(props.subreddits)
    return (
        <BrowserRouter>
            <Nav
                route={props.route}
                isLoggedIn={props.isLoggedIn}
                handleLogging={props.handleLogging}
                handleHome={props.handleHome}
                handleLogin={props.handleLogin}
                handleRegister={props.handleRegister}
            />
            <Switch>
                <Route exact path='/'>
                    <Home
                        user={props.user}
                        isLoggedIn={props.isLoggedIn}
                        setBearToken={props.setBearToken}
                        route={props.route}
                        showposts={props.showposts}
                        posts={props.posts}
                        users={props.users}
                        handleHome={props.handleHome}
                        handleLogging={props.handleLogging}
                        handleAllPosts={props.handleAllPosts}
                        handleSubscribedPosts={props.handleSubscribedPosts}
                        subreddits={props.subreddits}
                    />
                </Route>
                <Route path='/login'>
                    <Login
                        handleLogging={props.handleLogging}
                        setBearToken={props.setBearToken}
                    />
                </Route>
                <Route path='/register'>
                    <Register
                        handleLogging={props.handleLogging}
                        setBearToken={props.setBearToken}
                    />
                </Route>
                <Route path='/posted'>
                    <Posted />
                </Route>
                <Route path='/user'>
                    <User />
                </Route>
                <Route path='/subreddit/create'>
                    <Create
                        isLoggedIn={props.isLoggedIn}
                        handleLogging={props.handleLogging}
                        setBearToken={props.setBearToken}
                        user={props.user}
                        token = {props.token}
                    />
                </Route>
                <Route exact path='/subreddit/:pageName'>
                    <Subreddit
                        subreddits={props.subreddits}
                        posts={props.posts}
                    />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routing