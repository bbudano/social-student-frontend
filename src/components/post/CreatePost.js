import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import CustomButton from '../../util/CustomButton';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux
import { connect } from 'react-redux';
import { createPost, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadObject,
    submitButton: {
        position: 'relative',
        float: 'right'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '4%'
    }
})

class CreatePost extends Component {

    state = {
        isOpen: false,
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
        if (!nextProps.UI.errors && !nextProps.UI.isLoading) {
            this.setState({ body: '', isOpen: false, errors: {} });
        }
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ isOpen: false, errors: {} });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let newPost = {
            body: this.state.body
        }
        this.props.createPost(newPost);
    }

    render() {

        const { errors } = this.state;
        const { classes, UI: { isLoading } } = this.props;

        return (
            <Fragment>
                <CustomButton tip="Create new post" onClick={this.handleOpen}>
                    <AddIcon />
                </CustomButton>
                <Dialog open={this.state.isOpen} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <CustomButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </CustomButton>
                    <DialogTitle>Create a new post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Your new post"
                                multiline
                                rows="3"
                                helperText={errors.type === "POST_ERROR" && errors.message}
                                error={errors.type === "POST_ERROR" ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={isLoading}>
                                Post
                                {isLoading && (<CircularProgress size={30} className={classes.progressSpinner} />)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { createPost, clearErrors })(withStyles(styles)(CreatePost));
