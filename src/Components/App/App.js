import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { Admin } from '../Admin/Admin';
import { About } from '../About/About';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import News from '../News/News';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/about" component={About}/>
          <Route path="/news" component={News}/>
          <Redirect to="/"/>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App