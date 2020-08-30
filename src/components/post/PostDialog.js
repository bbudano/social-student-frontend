import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import CustomButton from '../../util/CustomButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import avatarImage from '../../static/avatar.png';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { getPost } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadObject,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class PostDialog extends Component {
    state = {
        isOpen: false
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
        this.props.getPost(this.props.postId);
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    render() {
        const {
            classes,
            user: { authenticated },
            post: { id, author, body, postedOn, likeCount, comments, commentCount },
            UI: { isLoading }
        } = this.props;

        const expandButton = !authenticated ? (
            <Link to="/login">
                <CustomButton tip="Expand" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </CustomButton>
            </Link>
        ) : (
                <CustomButton tip="Expand" onClick={this.handleOpen} tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </CustomButton>
            );

        const dialogMarkup = isLoading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
                <Grid container spacing={16}>
                    <Grid item sm={5}>
                        <img src={avatarImage} alt="Avatar" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography
                            component={Link}
                            color="primary"
                            variant="h5"
                            to={`/users/${author}`}
                        >
                            @{author}
                        </Typography>
                        <hr className={classes.invisibleHorizontalRuler} />
                        <Typography variant="body2" color="textSecondary">
                            {moment(postedOn).fromNow()}
                        </Typography>
                        <hr className={classes.invisibleHorizontalRuler} />
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <LikeButton postId={id} />
                        <span>{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
                        <CustomButton tip="Comments">
                            <ChatIcon color="primary" />
                        </CustomButton>
                        <span>{commentCount} {commentCount === 1 ? "Comment" : "Comments"}</span>
                    </Grid>
                    <hr className={classes.visibleHorizontalRuler} />
                    <CommentForm postId={id} />
                    <Comments comments={comments} />
                </Grid>
            )

        return (
            <Fragment>
                {expandButton}
                <Dialog open={this.state.isOpen} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <CustomButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </CustomButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDialog.propTypes = {
    user: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    post: state.data.post,
    UI: state.UI
})

const mapActionToProps = {
    getPost
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostDialog));