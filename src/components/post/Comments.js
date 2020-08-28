import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    ...theme.spreadObject
})

class Comments extends Component {
    render() {
        const { comments, classes } = this.props;

        let noComments = <span>No comments to display!</span>;

        let commentList = comments.map((comment, index) => {
            const { id, body, postedOn, author, postId } = comment;
            return (
                <Fragment key={id}>
                    <Grid item sm={12}>
                        <Grid container>
                            {/* <Grid item sm={2}>
                                <img />
                            </Grid> */}
                            <Grid item sm={9}>
                                <div className={classes.commentData}>
                                    <Typography
                                        variant="h5"
                                        component={Link}
                                        to={`/user/${author}`}
                                        color="primary">
                                            {author}
                                        </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {moment(postedOn).fromNow()}
                                    </Typography>
                                    <hr className={classes.invisibleHorizontalRuler} />
                                    <Typography variant="body1">{body}</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    {index !== comments.length - 1 && (<hr className={classes.visibleHorizontalRuler} />)}
                </Fragment>
            )
        })

        return (
            <Grid container>
                {commentList.length === 0 ? noComments : commentList}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);