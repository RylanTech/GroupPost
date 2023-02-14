import { useContext, useEffect, useState } from "react"
import { Card, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

function EditAccount() {
    let params = useParams()
    let { isLoggedIn, editUser } = useContext(UserContext)
    let [user, setUser] = useState({
        createdAt: "",
        userId: "",
        username: "",
        password: "",
        email: "",
        number: "",
        updatedAt: ""
    })
    let navigate = useNavigate()

    useEffect(() => {
        async function checkingLogin() {
            let i = await isLoggedIn(params.id)
            setUser(i)
            // if (user) {
            //     setLoggedIn(true)
            // } else if (!user) {
            //     setLoggedIn(false)
            // }
        }
        checkingLogin()
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        editUser(user).then(() => {
            navigate(`/account/${params.id}`);
        }).catch(error => {
            console.log(error)
        });
    }

    function handleChange(event) {
        setUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
        console.log(user)
    }

    function userDetails() {
        return (
            <div>
                <Card className="IDcard">
                    <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                        <Card.Text>
                        <form onSubmit={handleSubmit}>
                            <span>Name  </span>
                            <br/>
                            <input placeholder="Enter name" type="text" name="username" value={user.username} onChange={handleChange} />
                            <br></br><br></br>
                            <span>Email  </span>
                            <br/>
                            <input placeholder="Enter email" type="text" name="email" value={user.email} onChange={handleChange} />
                            <br></br><br></br>
                            <span>Phone Number  </span>
                            <br/>
                            <input placeholder="Enter number" type="text" name="number" value={user.number} onChange={handleChange} />
                            <br></br><br></br>
                            <button type="submit">Edit Profile</button>
                        </form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <Container>
                <Row>
                    <div className="col-2"></div>
                    <div className="col-8">
                        {userDetails()}
                    </div>
                    <div className="col-2"></div>
                </Row>
            </Container>
        </div>
    )
}
export default EditAccount