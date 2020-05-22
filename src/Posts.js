import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


function Posts(props) {

    const reversedPosts = []
    props.posts.map((item)=>{
        reversedPosts.unshift(item)
        return
    })
    // console.log(props.posts,reversedPosts)

    const allPosts = reversedPosts.map((item, index) => {
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
                            <h6 className='ml-5 mr-1 text-muted'>posted by <Link to={'/user/' + item.user.id}>u/{item.user.name}</Link></h6>
                            <h6 className='text-muted'> {props.timeChange(postTime)}</h6>
                        </div>
                        <div className='pl-2 py-3 row'>
                            <Link to={'/post/' + item.id}><h5>{item.title}</h5></Link>
                            { item.image !== null ? 
                            <img src={item.image} alt='post image'/>
                            :
                            <div></div>
                            }
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


    if (props.isLoggedIn) {
        if (props.showposts === 'allposts') {
            return (
                <div>
                    {allPosts}
                </div>
            )

        }
        else {
            return (
                <h1>Sub Posts</h1>
            )
        }
    }
    else {
        // console.log(props.posts)
        return (
            <div>
                {allPosts}
            </div>
        )
    }

}

export default Posts
