import React, { useContext, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let { signInUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        signInUser(username, password).then((response) => {;
            console.log(response)
            let i = response.userAndToken.userId
            navigate("/account/" + i)
            window.location.reload()
        }).catch(error => {
            console.log(error);
            window.alert('Failed login');
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
                                <h1>LOGIN</h1>
                            </center>
                        </div>
                        <span>USERNAME  </span>
                        <input placeholder="Enter username" type="text" name="username" onChange={e => setUsername(e.target.value)} />
                        <br></br><br></br>
                        <span>PASSWORD  </span>
                        <input placeholder="Enter password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
                        <br /><br></br>
                        <button>
                            Sign In
                        </button>
                    </div>
                    <div className='col-md-4'></div>
                </Row>
            </Container>
        </form>
        </div>
    );
};

export default SignIn;