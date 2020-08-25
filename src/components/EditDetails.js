import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

import CustomButton from '../util/CustomButton';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';

// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadObject,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {

    state = {
        bio: '',
        website: '',
        githubProfile: '',
        linkedinProfile: '',
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            githubProfile: credentials.githubProfile ? credentials.githubProfile : '',
            linkedinProfile: credentials.linkedinProfile ? credentials.linkedinProfile : ''
        })
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            githubProfile: this.state.githubProfile,
            linkedinProfile: this.state.linkedinProfile
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    render() {

        const { classes } = this.props;

        return (
            <Fragment>
                <CustomButton tip="Edit profile" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary" />
                </CustomButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Edit your profile details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="Say something about yourself!"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Your website"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="githubProfile"
                                type="text"
                                label="Github profile"
                                placeholder="Your Github profile"
                                className={classes.textField}
                                value={this.state.githubProfile}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="linkedinProfile"
                                type="text"
                                label="LinkedIn profile"
                                placeholder="Your LinkedIn profile"
                                className={classes.textField}
                                value={this.state.linkedinProfile}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">Cancel</Button>
                        <Button onClick={this.handleSubmit} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
