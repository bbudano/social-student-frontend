import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import avatarImage from '../../static/avatar.png';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// Icons
import LinkIcon from '@material-ui/icons/Link';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// Icons
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';
// Redux
import { connect } from 'react-redux';

const styles = theme => ({
    ...theme.spreadObject
})

const StaticProfile = (props) => {
    const {
        classes,
        profile: { username, bio, email, website, githubProfile, linkedinProfile, joinedOn },
        user,
        isAdmin
    } = props;

    const isAuthenticatedUserAdmin = (user.roles && (user.roles.includes('ROLE_ADMIN')))

    let adminButton = isAdmin ? (
        <Button className={classes.adminButton} variant="contained" color="primary">
            Take Admin Permissions{' '}<PersonIcon style={{ marginLeft: 10 }} />
        </Button>
    ) : (
            <Button className={classes.adminButton} variant="contained" color="secondary">
                Give Admin Permissions{' '}<SupervisorAccountIcon style={{ marginLeft: 10 }} />
            </Button>
        )

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={avatarImage} alt="avatar" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/user/${username}`} color="primary" variant="h5">
                        @{username}
                    </MuiLink>
                    <hr />
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
                    <hr />
                    {(username !== user.credentials.username && isAuthenticatedUserAdmin) && adminButton}
                </div>
            </div>
        </Paper>
    )
}

StaticProfile.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(StaticProfile));
