import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import CustomButton from '../../util/CustomButton';
import CreatePost from '../post/CreatePost';

// Redux
import { connect } from 'react-redux';

// MUI
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';

class Navbar extends Component {
    render() {

        const { authenticated } = this.props

        return (
            <AppBar>
                <Typography className="app-name-typography" variant="h5">
                    <SchoolIcon style={{ marginRight: '10px' }} />
                    socialStudent
                    </Typography>
                <ToolBar className="nav-container">

                    {authenticated ? (
                        <Fragment>
                            <CreatePost />
                            <Link to="/">
                                <CustomButton tip="Home">
                                    <HomeIcon />
                                </CustomButton>
                            </Link>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                            </Fragment>
                        )}
                </ToolBar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
