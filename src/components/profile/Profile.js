import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import defaultAvatar from '../../static/avatar.png';
import EditDetails from './EditDetails';
import CustomButton from '../../util/CustomButton';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// Icons
import LinkIcon from '@material-ui/icons/Link';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
// Redux
import { connect } from 'react-redux';
import { logoutUser, getUserData } from '../../redux/actions/userActions';
// Firebase
import { storage } from "../../firebase";


const styles = (theme) => ({
    ...theme.spreadObject
})

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        axios.patch('/api/user/updateAvatar', url)
                        .then(response => {
                            this.props.getUserData();
                        })
                        .catch(error => console.log(error));
                    })
            }
        )
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {

        const {
            classes,
            user: {
                credentials: { username, email, avatarUrl, bio, joinedOn, website, githubProfile, linkedinProfile },
                isLoading,
                authenticated
            }
        } = this.props;

        let avatar = avatarUrl === null ? defaultAvatar : avatarUrl

        let profileMarkup = !isLoading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={avatar} alt="avatar" className="profile-image" />
                        <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageChange}
                        />
                        <CustomButton
                            tip="Edit profile picture"
                            onClick={this.handleEditPicture}
                            btnClassName="button"
                        >
                            <EditIcon color="primary" />
                        </CustomButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${username}`} color="primary" variant="h5">
                            @{username}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        <AlternateEmailIcon color="primary" />{' '}
                        <span>{email}</span>
                        <hr />
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        {githubProfile && (
                            <Fragment>
                                <GitHubIcon color="primary" />
                                <a href={githubProfile} target="_blank" rel="noopener noreferrer">
                                    {' '}{githubProfile}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        {linkedinProfile && (
                            <Fragment>
                                <LinkedInIcon color="primary" />
                                <a href={linkedinProfile} target="_blank" rel="noopener noreferrer">
                                    {' '}{linkedinProfile}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        <CalendarTodayIcon color="primary" />{' '}
                        <span>Joined {moment(joinedOn).format('MMM YYYY.')}</span>
                    </div>
                    <CustomButton tip="Logout" onClick={this.handleLogout}>
                        <ExitToAppIcon color="secondary" />
                    </CustomButton>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        You are not logged in!
                </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">Sign up</Button>
                    </div>
                </Paper>
            )) : (<p>loading...</p>)

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, getUserData };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
