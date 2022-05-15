import { React, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(2),
  },
}));
export default function Login() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  const classes = useStyles();
  const handleChange = (func, value) => {
    func(value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const checkUser = event => {
    event.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then((data) => {
        if (data) {
          const exist = check(data);
          if (!exist) {
            handleClickOpen();
            setName('');
            setPassword('')
          }
        }
      }
      ).catch(() => { console.log("error") })
  }
  const check = data => {
    let isExist = false;
    data.forEach(user => {
      if (user.username === name && password === user.address.geo.lat.split('.')[1]) {
        localStorage.setItem('user', JSON.stringify(user))
        history.push('/application');
        isExist = true;
      }
    })
    return isExist;
  }
  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Incorrect name or password </DialogContentText>
          <DialogContentText id="alert-dialog-description">please try again </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>ok</Button>
        </DialogActions>
      </Dialog>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">hello please log in first</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Box my={35} mx={56}>
          <Grid item xs={12}>
            <Card >
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  <form onSubmit={(event) => checkUser(event)}>
                    <FormControl className={classes.margin} >
                      <Input type="text" placeholder="user name" value={name} onChange={(event) => handleChange(setName, event.target.value)}
                        id="input-with-icon-adornment"
                        startAdornment=
                         { <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>}
                        className={classes.input}
                      />
                      <Input type="password" placeholder="Password" value={password} onChange={(event) => handleChange(setPassword, event.target.value)}
                        id="input-with-icon-adornment"
                        startAdornment={
                          <InputAdornment position="start">
                            <LockOpenIcon />
                          </InputAdornment>
                        }
                        className={classes.input}
                      />
                      <Button variant="contained" color="primary" type='submit' className={classes.input}> Log in</Button>
                    </FormControl>
                  </form>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}