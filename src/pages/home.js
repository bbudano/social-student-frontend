import React, { Component } from 'react'
import axios from 'axios';

// MUI
import Grid from '@material-ui/core/Grid'

import Post from '../components/Post';
import Profile from '../components/Profile';

class home extends Component {

    state = {
        posts: null
    }

    componentDidMount() {
        axios.get('/api/post')
        .then(response => {
            this.setState({
                posts: response.data.content
            })
        })
        .catch(error => console.log(error))
    }

    render() {

        let recentPostsMarkup =  this.state.posts ? (
            this.state.posts.map(post => <Post key={post.id} post={post} />)
        ) : <p>Loading...</p>

        return (
            <Grid container spacing={8}>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

export default home
