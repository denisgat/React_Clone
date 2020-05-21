import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faArrowUp, faArrowDown, faSync } from '@fortawesome/free-solid-svg-icons';
const axios = require('axios');

class SinglePost extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            body: '',
            post_id: parseInt(window.location.pathname.split('/')[2]),
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBody = this.handleBody.bind(this)
    }


    handleBody(event) {
        this.setState({
            body: event.target.value
        })
    }


    async handleSubmit(e) {
        e.preventDefault()


        console.log(this.props, this.state)

        const data = {
            body: this.state.body,
            post_id: this.state.post_id,
            user_id: this.props.user.id
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + this.props.token
            }
        }

        await axios.post('http://127.0.0.1:8000/api/comment/create', data, config)
            .then(response => {
                // console.log(response.data.data);
                // return response.data
                this.props.setPosts(response.data.data)
                this.props.history.push('/post/' + this.state.post_id)
            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({
            body: ''
        })
    }

    render() {
        // const postId = parseInt(window.location.pathname.split('/')[2])
        // console.log(postId)
        if (this.props.posts.length > 0) {
            const thepost = this.props.posts.filter(item => item.id === this.state.post_id).map((item, index) => {
                let commentCount = item.comment.length
                let postTime = item.created_at
                let postComments = item.comment.map((item, index) => {
                    let commenterId = parseInt(item.user_id)
                    let commenterName = this.props.users.find(item => item.id === commenterId).name
                    let commentTime = new Date(item.created_at)
                    return (
                        <div key={index} className='container'>
                            <div className='my-2 row' >
                                <div className='col-12'>
                                    <h6><Link to={'/user/' + commenterId}>{commenterName} </Link>   {this.props.timeChange(commentTime)}</h6>
                                    <h6>{item.body}</h6>
                                </div>
                            </div>
                        </div>
                    )
                })
                return (
                    <div key={index} className='mt-3 border-dark rounded container bg-white text-dark'>
                        <div className='row' style={{ minHeight: '50vh' }} >
                            <div className="bg-light col-1 pt-3">
                                <FontAwesomeIcon icon={faArrowUp} />
                                <br></br>
                                <p className='mb-1'>49k</p>
                                <FontAwesomeIcon className='mb-3' icon={faArrowDown} />
                                <br></br>
                            </div>
                            <div className='pl-5 col-10'>
                                <div className='row mt-1'>
                                    <h6 className='ml-3'><Link to={'/subreddit/' + item.subreddit.subredditname}>r/{item.subreddit.subredditname}</Link></h6>
                                    <h6 className='ml-5 text-muted'>posted by <Link to={'/user/' + item.user.id}>u/{item.user.name}</Link></h6>
                                    <h6 className='text-muted'>{this.props.timeChange(postTime)}</h6>
                                </div>
                                <div className='p-3  row'>
                                    <h5><strong>{item.title}</strong></h5>
                                </div>
                                <div className='pl-3 text-left row'>
                                    <h6>{item.body} </h6>
                                </div>
                                <hr></hr>
                                <div className='pl-3 row text-muted position-bottom'>
                                    <FontAwesomeIcon className='ml-1 mt-1' icon={faCommentAlt} /><span className='ml-2'>{commentCount} Comment(s)</span>
                                </div>
                                <hr></hr>
                                {this.props.isLoggedIn ?
                                    <div>
                                        <br></br>
                                        <form id='commentForm' onSubmit={this.handleSubmit}>
                                            <div className='form-group'>
                                                <h6 className='text-left'>comment as <Link to={'/user/' + item.user.id}>{item.user.name}</Link></h6>
                                                <textarea rows='3' onChange={this.handleBody} value={this.state.body} type="text" className="form-control" id="exampleInputDesc" aria-describedby="emailHelp2" placeholder="What are your thoughts?" />
                                            </div>
                                            <input className='mt-0 mb-5 btn btn-block btn-primary' type="submit" value="Comment" />
                                            <hr className='mb-3'></hr>
                                        </form>
                                    </div>
                                    :
                                    <div></div>
                                }
                                <div className='row text-left'>
                                    {postComments}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })

            return (
                <div className='pt-4' style={{ height: '100vh', backgroundColor: ' #e1e1ea' }}>
                    <span className=''>
                        {thepost}
                    </span>
                </div>
            )
        }

        else {
            return (
                <div className='fa-3x'>
                    <FontAwesomeIcon icon={faSync} spin />
                    <h1>In Progress</h1>

                </div>
            )
        }

    }
}

export default withRouter(SinglePost)