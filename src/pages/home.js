import React, { Component } from 'react'
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

// MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';

class home extends Component {

    constructor() {
        super();
        this.state = {
            page: 0,
            size: 5
        }
    }

    componentDidMount() {
        this.props.getPosts(this.state.page, this.state.size);
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.props.getPosts(this.state.page, this.state.size)
        })
    }

    render() {

        const { posts, isLoading } = this.props.data;

        let recentPostsMarkup = !isLoading ? (
            posts.map((post) => <Post key={post.id} post={post} />)
        ) : <p>Loading...</p>

        return (
            <Grid container spacing={8}>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                    <div className="load-more-button-wrapper">
                        <Button color="primary" onClick={this.handleLoadMore}>Load more posts</Button>
                    </div>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(
    mapStateToProps,
    { getPosts }
)(home);
