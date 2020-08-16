import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20
    },
    progress: {
        position: 'absolute'
    }
}

class signup extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            isLoading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.UI.errors });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({isLoading: true})
        const newUserData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        this.props.signupUser(newUserData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        
        const { classes, UI: { isLoading } } = this.props;
        //const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    {/* Icon */}
                    <Typography variant="h3" className={classes.pageTitle}>
                        Sign up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="username" name="username" type="text" label="Username" className={classes.textField}
                            value={this.state.username} onChange={this.handleChange} fullWidth />
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
                            value={this.state.email} onChange={this.handleChange} fullWidth />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                            value={this.state.password} onChange={this.handleChange} fullWidth />
                        <Button disabled={isLoading} type="submit" variant="contained" color="primary" className={classes.button}>
                            Sign up
                            {isLoading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <small>
                            Already have an account? <Link to="/login">Login here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
