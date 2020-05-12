import React from 'react';

function Posts(props) {
    if (props.isLoggedIn) {
        if (props.showposts === 'allposts') {
            return (
                <h1>All Posts</h1>
            )
        }
        else {
            return (
                <h1>Sub Posts</h1>
            )
        }
    }
    else {
        return (
            <h1>All Post</h1>
        )
    }

}

export default Posts
