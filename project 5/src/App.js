import { React } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './component/Login'
import Application from './component/Application'
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const ourTheme = createTheme({
  palette: {
    primary: {
      light: '#00bcd4',
      main: '#0097a7',
      dark: '#006064',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff6e40',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={ourTheme}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/application">
                <Application />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}