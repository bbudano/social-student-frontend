import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadObject
})

class CommentForm extends Component {

    state = {
        body: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let commentData = {
            body: this.state.body
        }
        this.props.submitComment(this.props.postId, commentData);
        this.setState({ body: '' });
    }

    render() {

        const { classes, authenticated } = this.props;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on post"
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleHorizontalRuler} />
            </Grid>
        ) : null

        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.number.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
