import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import CustomButton from '../../util/CustomButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';
import defaultAvatar from '../../static/avatar.png';
// Redux
import { connect } from 'react-redux';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Post extends Component {

    render() {

        const {
            classes,
            post: {
                id,
                body,
                author,
                authorAvatar,
                postedOn,
                likeCount,
                commentCount },
            user: {
                authenticated,
                credentials: { username },
                roles
            }
        } = this.props;

        const isAdmin = (roles && (roles.includes('ROLE_ADMIN')))

        const deleteButton = ((authenticated && author === username) || isAdmin) ? (
            <DeletePost postId={id} />
        ) : null

        const avatar = authorAvatar === null ? defaultAvatar : authorAvatar;

        return (
            <Card className={classes.card}>
                <CardMedia
                className={classes.image}
                image={avatar}
                title="Profile image" />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={authenticated ? `/users/${author}` : '/login'}
                        color="primary"
                    >{author}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{moment(postedOn).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton postId={id} />
                    <span>{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
                    <CustomButton tip="Comments">
                        <ChatIcon color="primary" />
                    </CustomButton>
                    <span>{commentCount} {commentCount === 1 ? "Comment" : "Comments"}</span>
                    <PostDialog postId={id} username={username} />
                </CardContent>
            </Card>
        )
    }
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Post));
