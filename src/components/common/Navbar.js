import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'
import axios from 'axios'


class Navbar extends React.Component {
  constructor() {
    super()

    this.state = {}
    this.state = { profile: null }
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  getCurrentUser() {
    axios.get('/api/profiles/')
      .then(res => {
        const currentUser = res.data.filter(profile => profile.user._id === Auth.getPayload().sub)[0]
        this.setState({ currentUser })
      })
      .catch(err => console.log(err))
  }

  isOwner() {
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.state.profile.user._id
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  logout() {
    Auth.logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setFontColor()
      this.getCurrentUser()
      this.setState({ navbarOpen: false })
    }
  }

  setFontColor() {
    let color
    const { pathname } = this.props.location
    switch (pathname) {
      case '/map':
        color = '#696969'
        break
      default:
        color = '#36B3D4'
    }
    this.props.setNavFontColor(color)
  }




  render() {

    const { currentUser } = this.state
    const { fontColor } = this.props

    return (
      <nav className="navbar is-fixed-top" style={ { color: fontColor } }>
        <div className="navbar-brand">
          <Link to="/" className="navbar-item pet-meet" >🐾 Meet Pups</Link>

          <a role="button" className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" onClick={this.toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link to="/map" className="navbar-item">Map</Link>

            {Auth.isAuthenticated() && <Link to="/friends" className="navbar-item">Friends</Link>}

            {Auth.isAuthenticated() && <Link to="/friends/new" className="navbar-item">New Profile</Link>}

            {Auth.isAuthenticated() && <Link to="/locations/new" className="navbar-item">Add location</Link>}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {!Auth.isAuthenticated() && <Link to="/register" className="button sign-up">
                  <strong>Sign up</strong>
                </Link>}
                {!Auth.isAuthenticated() && <Link to="/login" className="button log-in">
                  Log in
                </Link>}

                {currentUser && Auth.isAuthenticated() &&
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link is-arrowless">
                      <img className="" src={currentUser.image} alt={currentUser.firstName}/>
                    </a>

                    <div className="navbar-dropdown is-right">
                      <Link to="/msg" className="navbar-item">Chatroom</Link>
                      <a className="navbar-item">

                        Reviews & Ratings
                      </a>
                      <a className="navbar-item">
                        About Us
                      </a>
                      <hr className="navbar-divider"/>
                      <a className="navbar-item">
                        Report an issue
                      </a>
                      <hr className="navbar-divider"/>
                      <a className="navbar-item log-out" onClick={this.logout}>Logout</a>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)

// {Auth.isAuthenticated() && <a className="navbar-item log-out" onClick={this.logout}>Logout</a>}
