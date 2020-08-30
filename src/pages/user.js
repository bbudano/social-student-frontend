import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';
// MUI
import Grid from '@material-ui/core/Grid';
// Redux
import { connect } from 'react-redux';
import { getUser } from '../redux/actions/dataActions';

class user extends Component {

    state = {
        profile: null,
        isAdmin: null
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.props.getUser(username);
        axios.get(`/api/user/${username}`)
            .then(response => {
                this.setState({
                    profile: response.data.user,
                    isAdmin: response.data.isAdmin
                });
            })
            .catch(error => console.log(error));
    }

    updateUserAdminPermissions = () => {
        const username = this.props.match.params.username;
        axios.post(`/api/auth/${username}/admin`)
            .then(response => {
                this.setState({
                    isAdmin: response.data.isAdmin
                });
            })
            .catch(error => console.log(error));
    }

    render() {

        const { posts, isLoading } = this.props.data;

        const postsMarkup = isLoading ? (
            <p>Loading data...</p>
        ) : posts === null ? (
            <p>This user has no posts</p>
        ) : (
            posts.map(post => <Post key={post.id} post={post} />)
        )

        return (
            <Grid container spacing={8}>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <p>Loading profile...</p>
                    ) : (
                            <StaticProfile isAdmin={this.state.isAdmin} profile={this.state.profile} updateUserAdminPermissions={this.updateUserAdminPermissions} />
                        )}
                </Grid>
                <Grid item sm={8} xs={12}>
                    {postsMarkup}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getUser })(user);
