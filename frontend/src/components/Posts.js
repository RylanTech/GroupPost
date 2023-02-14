import { useContext, useEffect, useState } from "react"
import { Container, ListGroup, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { PostContext } from "../contexts/PostContext"
import { UserContext } from "../contexts/UserContext"

function Post() {
    let { isLoggedIn } = useContext(UserContext)
    let { addPost } = useContext(PostContext)
    let [user, setUser] = useState()
    let [content, setContent] =  useState("test")
  
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

    function handleChange(event) {
        setContent((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
        console.log(content)
    }

    function handleSubmit(event) {
        event.preventDefault();
        let post = {
            content: content.content,
            username: user.username
        }
        console.log(post)
        addPost(post).then(() => {
            window.location.reload()
        }).catch(error => {
            console.log(error)
        });
    }

    function convertCreatedAt(time) {
        let total = new Date(time).toString().split(" ")
        return `${total[0]} ${total[1]} ${total[2]} ${total[3]} ${total[4]}`
    }


    function list(post) {
        if (post === undefined) {
            return "No posts"
        } else {
            return post.slice(0).reverse().map((post) => {
                return (
                    <ListGroup.Item key={post.postId}>
                        <div className="post">
                            <div className="username">
                                {post.username}
                            </div>
                            <div className="content">
                                {post.content}
                                <br/>
                            </div>
                            <div className="details">
                                {convertCreatedAt(post.createdAt)}
                                <br/>
                                <Link to={`/account/${post.userId}`}>{post.username}</Link>
                            </div>
                        </div>
                    </ListGroup.Item>
                )
            })
        }
    }

    function listNA(post) {
        if (post === undefined) {
            return "No posts"
        } else {
            return post.slice(0).reverse().map((post) => {
                return (
                    <ListGroup.Item key={post.postId}>
                        <div className="post">
                            <div className="username">
                                {post.username}
                            </div>
                            <div className="content">
                                {post.content}
                                <br/>
                            </div>
                            <div className="details">
                                {convertCreatedAt(post.createdAt)}
                            </div>
                        </div>
                    </ListGroup.Item>
                )
            })
        }
    }

    if (user) {
        return (
            <div>
                <Container>
                    <Row>
                    <form onSubmit={handleSubmit}>
                    <Row>
                    <div className="col-2">Create Post</div>
                    <textarea className="col-4" type="text" name="content" value={content.content} onChange={handleChange}/>
                    <br/><br/>
                    <button className="postBtn col-2" type="submit">Post</button>
                    </Row>
                    </form>
                    </Row>
                    <br/><br/>
                    <PostContext.Consumer>
                        {({ posts }) => (
                            list(posts)
                        )}
                    </PostContext.Consumer>
                </Container>
            </div>
        )
    } else {
        return (
            <div>
                <Container>
                    <PostContext.Consumer>
                        {({ posts }) => (
                            listNA(posts)
                        )}
                    </PostContext.Consumer>
                </Container>
            </div>
        )
    }
}
export default Post