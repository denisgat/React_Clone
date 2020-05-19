import React from 'react';
import Login from './Login';
import {withRouter} from 'react-router-dom';
const axios = require('axios');

class CreatePost extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            subreddit_name: '',
            user_id: '',
            title: '',
            body: '',
            img: '',
            token: ''

        }

        this.handleTitle = this.handleTitle.bind(this);
        this.handleBody = this.handleBody.bind(this);
        // this.handleImg = this.handleImg.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSub = this.handleSub.bind(this);
        // this.handleSubuser = this.handleSubUser.bind(this);
    }

    handleSub(event) {
        var sub = event.target.options[event.target.selectedIndex].text
        // console.log(sub)
        this.setState({
            subreddit_name: sub,
        })
    }


    handleTitle(event) {
        this.setState({
            title: event.target.value,
        })
    }

    handleBody(event) {
        this.setState({
            body: event.target.value,
        })
    }

    // handleImg(event){
    //     this.setState({
    //         img: event.target.value,
    //     })
    // }

    async handleSubmit(event) {
        event.preventDefault();
        // console.log(this.props.subreddits.filter(item => item.subredditname === this.state.subreddit_name)[0].id)
        
        const sub_id = this.props.subreddits.filter(item => item.subredditname === this.state.subreddit_name)[0].id

        // console.log(sub_id)
        
        await this.setState({
            user_id: this.props.user.id,
            token: this.props.token
        })
        
        // console.log(this.state)
        

        const data = {
            title: this.state.title,
            body: this.state.body,
            user_id: this.state.user_id,
            subreddit_id: sub_id
        }
        // console.log(data)

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + this.state.token
            }
        }


        await axios.post('http://127.0.0.1:8000/api/post/create', data, config)
            .then(response => {
                // console.log(response.data);
                // return response.data
                this.props.history.push('/subreddit/' + this.state.subreddit_name)
            })
            .catch(function (error) {
                console.log(error);
            })

        // console.log(result)

        // console.log(this.state)

    }



    render() {
        // console.log(this.props)
        const subreddits = this.props.subreddits.map((item, index) => {
            return (
                <option key={index}>{item.subredditname}</option>
            )
        })

        if (this.props.isLoggedIn) {
            return (
                <div className='' style={{ height: '100vh', backgroundColor: '#f0f0f5' }}>
                    <div className='container px-5' >
                        <h1 className='p-3'>Creating Post</h1>
                        <form onSubmit={this.handleSubmit} className='mt-5'>
                            <label>SubReddit</label>
                            <select onChange={this.handleSub} value={this.state.subreddit_name} className="form-control" id="exampleFormControlSelect1">
                                {subreddits}
                            </select>
                            <div className="form-group">
                                <label>Post Title</label>
                                <input onChange={this.handleTitle} value={this.state.title} type="text" className="form-control" id="exampleInputSubname" aria-describedby="emailHelp1" placeholder="Post Title" />
                            </div>
                            <div className="form-group">
                                <label>Post Body</label>
                                <textarea rows='5' onChange={this.handleBody} value={this.state.body} type="text" className="form-control" id="exampleInputDesc" aria-describedby="emailHelp2" placeholder="Post Body" />
                            </div>
                            <input className='btn btn-lg btn-primary' type="submit" value="Create" />
                        </form>
                    </div>
                </div>
            )
        }

        else {
            return (
                <div style={{ height: '100vh', backgroundColor: '#f0f0f5' }}>
                    <h1>Must be logged in to create a subreddit </h1>
                    <Login
                        handleLogging={this.props.handleLogging}
                        setBearToken={this.props.setBearToken}
                    />
                </div>

            )
        }




    }
}


export default withRouter(CreatePost);