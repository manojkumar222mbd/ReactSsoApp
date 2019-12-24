import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import LoginAction from '../../redux/login/LoginAction';
import SnackbarAction from '../../redux/snackbar/SnackbarAction';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';



const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  left: {
    float: "left",
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2),
  }
});

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formErr: false,
      showPassword: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('AuthData')) {
      this.props.history.push("/admin");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.is_login !== this.props.is_login && this.props.is_login === true) {
      this.props.history.push("/admin");
    }
    if (prevProps.errMsg !== this.props.errMsg && this.props.is_login === false && this.props.errMsg !== '') {
      this.props.showSnack({ type: 'error', message: this.props.errMsg });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }))
  }
  handleEnterKeyPress = (e) => {
    const { username, password } = this.state;
    if (e.key === 'Enter' && username !== '' && password !== '') {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    this.setState({ formErr: true });
    const { username, password } = this.state;
    if (username !== '' && password != '') {
      this.props.submitCredentials({ username, password });
    }
  };

  render() {
    const { classes } = this.props;
    const { username, password, formErr } = this.state;

    const handleClickShowPassword = () => {
      this.setState({ showPassword: !this.state.showPassword })
    };

    const handleMouseDownPassword = event => {
      event.preventDefault();
    };
    return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SSO Login
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoFocus
              value={username}
              onChange={this.handleChange}
              error={!username && formErr}
              helperText={!username && formErr ? 'Username is required' : ''}
              onKeyPress={this.handleEnterKeyPress}
            />
            <FormControl className={classes.textField} variant="outlined">
              <InputLabel error={!password && formErr} htmlFor="outlined-adornment-password">Password*</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                name="password"
                required
                fullWidth
                onChange={this.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={80}
                error={!password && formErr}
                onKeyPress={this.handleEnterKeyPress}
              />
              {!password && formErr && <FormHelperText error={true} id="outlined-weight-helper-text">Password is required</FormHelperText>}
            </FormControl>
            <FormControlLabel className={classes.left}
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={this.props.loading}
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              {!this.props.loading && 'Sign In'}
              {this.props.loading && 'Please wait...'}
              {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" className={classes.left}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            Copyright © SSO 2019
          </Typography>
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loginView.loading,
    is_login: state.loginView.is_login,
    errMsg: state.loginView.errMsg
  }
};

const mapDispatchToProps = {
  submitCredentials: LoginAction.submitCredentials,
  showSnack: SnackbarAction.showSnack,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Login));