import { useContext, useEffect, useState } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

function Home() {
  let { isLoggedIn } = useContext(UserContext)
  let [user, setUser] = useState()

  document.body.style = 'background: #99b89b';
  useEffect(() => {
    async function startUp() {
      let i = await isLoggedIn()
      if (i) {
        setUser(i)
      } else {
        setUser(null)
      }
    }
    startUp()
  }, [])
  if (user) {
    return (
      <div>
        <Navbar className="nav-color" expand="lg" variant="light">
          <Container>
            <Navbar.Brand href="/">GroupPost</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link" to="/">Posts</Link>
                <Link className="nav-link" to={`/account/` + user.userId}>Account</Link>
              </Nav>
              Hello {user.username}!
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </div>
    )
  } else {
    return (
      <div>
        <Navbar className="nav-color" expand="lg" variant="light">
          <Container>
            <Navbar.Brand href="/">GroupPost</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link" to="/">Posts</Link>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/createaccount">Create Account</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </div>
    )
  }
}
export default Home