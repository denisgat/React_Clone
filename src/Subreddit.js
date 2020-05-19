import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faArrowUp, faArrowDown, faSync } from '@fortawesome/free-solid-svg-icons';
const axios = require('axios');


class Subreddit extends React.Component {
    constructor(props) {
        super(props)

        // const history = useHistory()

        this.state = {
            posts: [],
            subs: this.props.subreddits,
            subinfo: [],
            subname: window.location.pathname.split('/')[2]
        }



    }

    async componentDidMount() {
        const sub_id = this.props.subreddits.filter(item => (item.subredditname === this.state.subname))

        let subredditIdCall = await axios.get('http://127.0.0.1:8000/api/subreddits/' + sub_id[0].id)
            .then(response => {

                return response.data.data.posts
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        const subinfo = this.props.subreddits.filter(item => (item.subredditname === this.state.subname))

        this.setState({
            posts: subredditIdCall,
            subinfo: subinfo
        })
        // const subposts = this.props.posts.filter(item => (item.subreddit.subredditname == this.state.subname))

        // console.log(subposts)
        // console.log(subinfo)

    }

    render() {
        if (this.state.posts.length > 0 && this.state.subinfo.length > 0) {
            // console.log(this.props.posts)
            const posts = this.props.posts.filter(item => item.subreddit.subredditname === this.state.subname)
                .map((item, index) => {
                    return (
                        <div key={index} className='mt-3 border-dark rounded container bg-white text-dark'>
                            <div className='row ' style={{ minHeight: '20vh' }} >
                                <div className="bg-light col-1 pt-3">
                                    <FontAwesomeIcon icon={faArrowUp} />
                                    <br></br>
                                    <p className='mb-1'>49k</p>
                                    <FontAwesomeIcon className='mb-3' icon={faArrowDown} />
                                    <br></br>
                                </div>
                                <div className='col-10'>
                                    <div className='row mt-1'>
                                        <Link to={'/subreddit/' + item.subreddit.subredditname}><h5 className='ml-2'>r/{item.subreddit.subredditname}</h5></Link>
                                        <h6 className='ml-5 text-muted'>posted by <Link to={'/user/' + item.user.id}>u/{item.user.name}</Link></h6>
                                    </div>
                                    <div className='pl-3 py-3 row'>
                                        <Link to={'/post/' + item.id}><h5>{item.title}</h5></Link>
                                    </div>
                                    <hr className='pb-0'></hr>
                                    <div className='pl-3 pt-0 row text-muted position-bottom'>
                                        <Link to={'/post/' + item.id}><FontAwesomeIcon className='ml-1' icon={faCommentAlt} /><span className='ml-1'>Comments</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })

            return (
                <div className='' style={{ height: '100vh', backgroundColor: ' #e1e1ea' }}>
                    <div className='container mx-auto pt-4 row'>
                        <div className='col-12'>
                            <Link to='/post/create' className='btn btn-primary'>Create a post</Link>
                        </div>
                    </div>
                    <div className='container mx-auto pt-4 row'>
                        <div className='col-12 mx-auto'>
                            <h1>{this.state.subname} Subreddit</h1>
                            <h5 className='mx-auto'>Sub Description: {this.state.subinfo[0].subredditdesc}</h5>
                        </div>
                    </div>
                    {posts}

                </div>
            )
        }

        else {
            return (
                <div className='fa-3x'>
                    <h1>{this.state.subname} Subreddit</h1>
                    <FontAwesomeIcon icon={faSync} spin />
                    <h6>Oops Looks like there are no posts for this Subreddit</h6>
                    <h6>Would you like to create the first post?</h6>
                    <Link to='/post/create' className='btn btn-lg btn-primary'>Create a post</Link>
                </div>
            )
        }

    }
}


// function Postsss(props){
//     const posts = props.posts.map((item, index) => {
//         return (
//             <div key={index} className='mt-3 border-dark rounded container bg-white text-dark'>
//                 <div className='row ' style={{minheight: '35vh'}}>
//                     <div className="bg-light col-1 pt-3">
//                         <FontAwesomeIcon icon={faArrowUp}/>
//                         <br></br>
//                         <p className='mb-1'>49k</p>
//                         <FontAwesomeIcon className='mb-3' icon={faArrowDown}/>
//                         <br></br>
//                     </div>
//                     <div className='col-10'>
//                         <div className='row mt-1'>
//                             <Link to={'/subreddit/' + item.subreddit.subredditname}><h6 className='ml-2'>r/{item.subreddit.subredditname}</h6></Link>
//                             <h6 className='ml-5 text-muted'>posted by <Link to={'/user/' + item.user.id}>u/{item.user.name}</Link></h6>
//                         </div>
//                         <div className='row'>
//                             <Link to={'/post/' + item.id}><h6>{item.title}</h6></Link>
//                         </div>
//                         <div className='row text-muted position-bottom'>
//                             <Link to={'/post/' + item.id}><FontAwesomeIcon className='ml-1' icon={faCommentAlt}/><span className='ml-1'>Comments</span></Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         )
//     })
// }


export default Subreddit

