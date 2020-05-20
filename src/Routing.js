import React from 'react';
import Login from './Login';
import Register from './Register';
import Nav from './Navbar';
import Subreddit from './Subreddit';
import User from './User';
import Home from './Home';
import CreateSub from './CreateSubreddit';
import Profile from './Profile';
import CreatePost from './CreatePost';
import SinglePost from './SinglePost';
import { BrowserRouter, Switch, Route } from 'react-router-dom';



// history.push("/viewStream");


function Routing(props) {
    return (
        <BrowserRouter>
            <Nav
                route={props.route}
                posts={props.posts}
                subreddits = {props.subreddits}
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
                <Route exact path='/post/create'>
                    <CreatePost
                        isLoggedIn={props.isLoggedIn}
                        handleLogging={props.handleLogging}
                        setBearToken={props.setBearToken}
                        user={props.user}
                        token = {props.token}
                        subreddits={props.subreddits}
                        setPosts = {props.setPosts}
                    />

                </Route>
                <Route path='/post/:postId'>
                    <SinglePost
                        posts = {props.posts}
                        users = {props.users}
                        user={props.user}
                        isLoggedIn={props.isLoggedIn}
                        token = {props.token}
                        setPosts={props.setPosts}
                    />
                </Route>
                <Route path='/user'>
                    <User 
                        posts={props.posts}
                        users={props.users}
                        
                    />
                </Route>
                <Route path='/profile'>
                    <Profile 
                        user={props.user}
                    />
                </Route>

                <Route path='/subreddit/create'>
                    <CreateSub
                        isLoggedIn={props.isLoggedIn}
                        handleLogging={props.handleLogging}
                        setBearToken={props.setBearToken}
                        user={props.user}
                        token = {props.token}
                        setSubreddits = {props.setSubreddits}
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