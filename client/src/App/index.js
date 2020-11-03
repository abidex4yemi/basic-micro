import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Container } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import useStyles from './styles';
import theme from '../themes';
import Home from '../pages/Home';
import Tasks from '../pages/Tasks';

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm" className={classes.container}>
          <Route exact path="/" component={Home} />
          <Route exact path="/tasks/user/:id" component={Tasks} />
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
