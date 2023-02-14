import { useContext, useEffect, useState } from "react"
import { Card, Container, ListGroup } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { PostContext } from "../contexts/PostContext"

function EditPost() {
    let { getPost, updatePost } = useContext(PostContext)
    let params = useParams()
    let navigate = useNavigate()
    let [post, setPost] = useState({
        content: ""
    })

    useEffect(() => {
        async function startUp() {
            setPost(await getPost(params.id))
        }
        startUp()
    }, [])

    function handleSubmit(event) {
        console.log(post)
        event.preventDefault();
        updatePost(post).then(() => {
            navigate(`/`);
        }).catch(error => {
            console.log(error)
        });
    }

    function handleChange(event) {
        setPost((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    return (
        <div>
            <Container>
            <Card className="IDcard">
                    <Card.Body>
                        <Card.Title>Post</Card.Title>
                        <form onSubmit={handleSubmit}>
                            <input placeholder="Enter Post" type="text" name="content" value={post.content} onChange={handleChange} />
                            <br></br><br></br>
                            <button type="submit">Edit Post</button>
                        </form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
export default EditPost