import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function User(props) {
    const userId = parseInt(window.location.pathname.split('/')[2])
    // console.log(userId)
    if (props.posts.filter(item => item.user_id === userId).length > 0) {
        const username = props.posts.filter(item => item.user_id === userId)[0].user.name
        const userposts = props.posts.filter(item => item.user_id === userId).map((item, index) => {
            let commentCount = item.comment.length
            let postTime = new Date(item.created_at)
            return (
                <div key={index} className='mt-3 border-dark rounded container bg-white text-dark pb-2'>
                    <div className='row ' style={{ minHeight: '20vh' }} >
                        <div className="bg-light col-1 pt-3">
                            <FontAwesomeIcon icon={faArrowUp} />
                            <br></br>
                            <p className='mb-1'>{item.likes}</p>
                            <FontAwesomeIcon className='mb-3' icon={faArrowDown} />
                            <br></br>
                        </div>
                        <div className='col-10'>
                            <div className='row mt-1'>
                                <Link to={'/subreddit/' + item.subreddit.subredditname}><h5 className='ml-2'>r/{item.subreddit.subredditname}</h5></Link>
                                <h6 className='ml-5 mr-1 text-muted'>posted by u/{item.user.name}</h6>
                                <h6 className='text-muted'> {props.timeChange(postTime)}</h6>
                            </div>
                            <div className='pl-3 py-3 row'>
                                <Link to={'/post/' + item.id}><h5><strong>{item.title}</strong></h5></Link>
                            </div>
                            <hr className='pb-0'></hr>
                            <div className='pl-3 pt-0 row text-muted position-bottom'>
                                <Link to={'/post/' + item.id}><FontAwesomeIcon className='ml-1' icon={faCommentAlt} /><span className='ml-1'>{commentCount} Comment(s)</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className='' style={{ height: '100vh', backgroundColor: ' #e1e1ea' }}>

                <button className='m-3 btn btn-lg btn-primary'>Show comments by {username}</button>
                <h1>Posts by {username}</h1>
                <br></br>
                {userposts}
            </div>
        )
    }
    else {
        return (
            <div className='' style={{ height: '100vh', backgroundColor: ' #e1e1ea' }}>
                <h1>Posts by {props.users.filter(item => item.id === userId)[0].name}</h1>
                <h1>This user has no posts</h1>
            </div>
        )
    }

}

export default User