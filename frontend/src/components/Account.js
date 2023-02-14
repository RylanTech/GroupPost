import { useContext, useEffect, useState } from "react"
import { Button, Card, Container, ListGroup, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { PostContext } from "../contexts/PostContext"
import { UserContext } from "../contexts/UserContext"

function Account() {
    let params = useParams()
    let { getUser } = useContext(UserContext)
    let { getUserPost, deletePost } = useContext(PostContext)

    let [user, setUser] = useState({
        createdAt: "",
        userId: "",
        username: "",
        password: "",
        email: "",
        number: "",
        updatedAt: ""
    })
    let [posts, setPosts] = useState()
    let navigate = useNavigate()


    useEffect(() => {
        async function checkingLogin() {
            let i = await getUser(params.id)
            setUser(i)
            setPosts(await getUserPost(params.id))
        }
        checkingLogin()
    }, [])

    function convertCreatedAt(time) {
        let total = new Date(time).toString().split(" ")
        return `${total[0]} ${total[1]} ${total[2]} ${total[3]} ${total[4]}`
    }

    function userPosts() {
            return posts.map((post) => {
                return (
                    <ListGroup.Item key={post.postId}>
                        <div className="post">
                            <div className="username">
                                {post.username}
                            </div>
                            <div className="content">
                                {post.content}
                                <br />
                            </div>
                            <div className="details">
                                {convertCreatedAt(post.createdAt)}
                                <br />
                            </div>
                            <Row>
                                <div className="col-1"><Link className="btn btn-success option" to={`/post/edit/${post.postId}`}>Edit</Link></div>
                                <div className="col-1"></div>
                                <div className="col-1"><Button variant="danger" className="option" onClick={() => deletePost(post.postId).then(
                                    window.location.reload()
                                )}>Delete</Button></div>
                            </Row>
                        </div>
                    </ListGroup.Item>
                )
            })
        }

    function userPostsNA() {
            return posts.map((post) => {
                return (
                    <ListGroup.Item key={post.postId}>
                        <div className="post">
                            <div className="username">
                                {post.username}
                            </div>
                            <div className="content">
                                {post.content}
                                <br />
                            </div>
                            <div className="details">
                                {convertCreatedAt(post.createdAt)}
                                <br />
                            </div>
                        </div>
                    </ListGroup.Item>
                )
            })
        }

    function userDetails() {
        if (user.userId && posts == undefined) {
            return (
                <div>
                    <Card className="IDcard">
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>
                                User ID: {user.userId}
                                <br />
                                Email: {user.email}
                                <br />
                                Phone: {user.number}
                                <br />
                                Joined on: {convertCreatedAt(user.createdAt)}
                                <br />
                                <br />
                                <Link to={`/account/edit/${user.userId}`}>Edit</Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                </div>
            )
        } else if (user.userId) {
            return (
                <div>
                    <Card className="IDcard">
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>
                                User ID: {user.userId}
                                <br />
                                Email: {user.email}
                                <br />
                                Phone: {user.number}
                                <br />
                                Joined on: {convertCreatedAt(user.createdAt)}
                                <br />
                                <br />
                                <Link to={`/account/edit/${user.userId}`}>Edit</Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                    {userPosts()}
                </div>
            )
        } else if (posts == undefined) {
            return (
                <div>
                    <Card className="IDcard">
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>
                                Email: {user.email}
                                <br />
                                Joined on: {convertCreatedAt(user.createdAt)}
                                <br />
                                <br />
                                <Link to={`/account/edit/${user.userId}`}>Edit</Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        } else {
            return (
                <div>
                    <Card className="IDcard">
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>
                                Email: {user.email}
                                <br />
                                Joined on: {convertCreatedAt(user.createdAt)}
                                <br />
                                <br />
                                <Link to={`/account/edit/${user.userId}`}>Edit</Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br/>
                    {userPostsNA()}
                </div>
            )
        }
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
export default Account