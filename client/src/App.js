import { SignalCellularConnectedNoInternet1BarSharp } from '@material-ui/icons'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateAlert from './Components/Alerts/CreateAlert'
import Header from './Components/Navigation/Header'
import Menu from './Components/Navigation/Menu';
import Home from './Components/Pages/Home'
import AlertList from './Components/Alerts/AlertList'
import Auth from './Components/Auth/Auth'
import UpdateAlert from './Components/Alerts/UpdateAlert'
import Footer from './Components/Navigation/Footer'
import Login from "./Components/Auth/Login";

const App = () => {
  return (
    <Router>
      <Header />
      <Menu />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/alerts" exact>
            <AlertList />
          </Route>
          <Route path="/create-alert">
            <CreateAlert />
          </Route>
          <Route path="/login">
            <Login />
            </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/alerts/update/:id">
            <UpdateAlert />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
