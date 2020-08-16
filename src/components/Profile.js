import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import EditDetails from './EditDetails';

// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


const styles = (theme) => ({
    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#2196f3'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
})

class Profile extends Component {

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {

        const {
            classes,
            user: {
                credentials: { username, email, bio, joinedOn, website, githubProfile, linkedinProfile },
                isLoading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !isLoading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    {/* <div className="profile-image">
                        <img />
                    </div>
                    <hr /> */}
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/user/${username}`} color="primary" variant="h5">
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
                    <Tooltip title="Logout" placement="top">
                        <IconButton onClick={this.handleLogout}>
                            <KeyboardReturn color="secondary" />
                        </IconButton>
                    </Tooltip>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No user logged in.
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

const mapActionsToProps = { logoutUser };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
