import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { cleanError } from '../actions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  dialogContent: {
    padding: theme.spacing.unit * 2,
  },
})

class ErrorDialog extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    const { dispatch } = this.props
    dispatch(cleanError())
  };

  errorHeaderMessage = () => {
    const { error } = this.props
    if (error == null ) { return (<div>No error to display.</div>)}
    const [ source, type ] = error.type.split('.')
    console.log("CANI CANI CANI", error, source, type)

    switch (source) {
        case "folder_request":
            return (
                <Typography variant="body1">
                La generazione della cartella <em>{error.request}</em> è fallita
                </Typography>)
        case "module_request":
            return (
                <Typography variant="body1">
                La generazione del modulo <em>{error.request}</em> è fallita
                </Typography>)
        default:
          return
    }
  }

  errorContentMessage = () => {
    const { error } = this.props
    if (error == null ) { return (<div>No error to display.</div>)}
    const [ source, type ] = error.type.split('.')
    console.log("CANI CANI CANI", error, source, type)

    switch (type) {
        case "key_error":
            return (
                <Typography variant="body1">
                Non è stato trovato un modulo con questo URN: <em>{error.missing_key}</em>
                </Typography>)
        case "template_not_found":
            return (
                <div>
                <Typography variant="body1">
                Non sono stati trovati template con questi nomi:
                </Typography>

                <ul>
                    {error.missing_templates.map(t => (<li>{t}</li>))}
                </ul>

                <Typography variant="body1">
                In genere sono nella prozione <em>extends</em> del modulo.
                </Typography>
                </div>)
        default:
          return
    }

  }

  render() {
    const { error, classes } = this.props

    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="error-dialog"
          open={error != null}

        >
            <Typography variant="h4" className={classes.dialogContent}>La generazione del modulo è fallita</Typography>
            <Divider variant="middle" />
            <div className={classes.dialogContent}>
            {this.errorHeaderMessage()}
            {this.errorContentMessage()}
            </div>
            <Typography variant="body1">
            </Typography>
            <Divider variant="middle" />
            <pre fontFamily="Monospace" m={1} className={classes.dialogContent}>
                {error && error.stacktrace.join('\n')}
            </pre>

            <Divider variant="middle" />
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>

        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
    if (state.currentDownloadStatus.lastError !== null) {
        return {
            error: state.currentDownloadStatus.lastError
        }
    }

    return { error: null }
}

export default connect(mapStateToProps)(withStyles(styles)(ErrorDialog));
