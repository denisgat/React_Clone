import React from 'react'
import Posts from './Posts';
import SubDropDown from './SubDropDown'
import { Link } from 'react-router-dom';

function Home(props) {
    if (props.isLoggedIn) {
        return (
            <div className='' style={{ height: '100vh', backgroundColor: ' #e1e1ea' }}>
                <h1>Welcome {props.user.name}</h1>
                <br></br>
                <div className='row'>
                    <div className='col-4'>
                        <SubDropDown subreddits={props.subreddits} posts={props.posts} />
                    </div>
                    <div className='col-4'>
                        <button onClick={props.handleAllPosts} className='btn btn-primary'>All Posts</button>
                    </div>
                    <div className='col-4'>
                        <button onClick={props.handleSubscribedPosts} className='btn btn-primary'>Subscribed Posts</button>
                    </div>
                    <br></br>
                    <br></br>
                    <div className='container'>
                        <Posts posts={props.posts} showposts={props.showposts} route={props.route} isLoggedIn={props.isLoggedIn} />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='' style={{ height: '100vh', backgroundColor: ' #e1e1ea'}}>
                <br></br>
                <div className='container'>
                    <SubDropDown subreddits={props.subreddits} posts={props.posts} />
                    <Posts posts={props.posts} showposts={props.showposts} route={props.route} isLoggedIn={props.isLoggedIn} />
                </div>
            </div>
        )
    }
}


export default Home