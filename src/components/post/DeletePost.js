import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import CustomButton from '../../util/CustomButton';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
    }
}

class DeletePost extends Component {

    state = {
        isOpen: false
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    deletePost = () => {
        this.props.deletePost(this.props.postId);
        this.setState({ isOpen: false });
    }

    render() {

        const { classes } = this.props;

        return (
            <Fragment>
                <CustomButton tip="Delete post" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary" />
                </CustomButton>
                <Dialog open={this.state.isOpen} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deletePost} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.number.isRequired
}

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
