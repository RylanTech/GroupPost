import { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function CreateAccount() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [number, setNumber] = useState()

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        let user = {
            username,
            password,
            email,
            number
        }
        createUser(user).then((response) => {;
            console.log(response)
            navigate("/login" )
        }).catch(error => {
            console.log(error);
            window.alert('Failed signup');
        });
    }

    return (
        <div className='loginPage'>
            <form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <div className='col-md-4'></div>
                    <div className='col-md-4 loginPanel'>
                        <div className='lih'>
                            <center>
                                <h1>SIGNUP</h1>
                            </center>
                        </div>
                        <span>USERNAME  </span>
                        <input placeholder="Enter username" type="text" name="username" onChange={e => setUsername(e.target.value)} />
                        <br></br><br></br>
                        <span>PASSWORD  </span>
                        <input placeholder="Enter password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
                        <br /><br></br>
                        <span>EMAIL  </span>
                        <input placeholder="Enter Email" type="text" name="email" onChange={e => setEmail(e.target.value)} />
                        <br /><br></br>
                        <span>PHONE NUMBER  </span>
                        <input placeholder="Enter number" type="text" name="number" onChange={e => setNumber(e.target.value)} />
                        <br /><br></br>
                        <button>
                            Create Account
                        </button>
                    </div>
                    <div className='col-md-4'></div>
                </Row>
            </Container>
        </form>
        </div>
    );
}
export default CreateAccount