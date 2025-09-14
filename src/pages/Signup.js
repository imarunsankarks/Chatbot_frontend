// src/components/Signup.js
import { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useTheme } from "../context/theme";

function Signup({ onSignup }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup:", { name, email, password });
        // Later: call backend API → onSignup(token)
    };

    return (
        <Container className="d-flex justify-content-center align-items-center ">
            <Card className={`shadow-lg rounded-4 p-5 ${theme === 'light' ? "light" : "dark"}`} style={{ width: "450px", height: "535px", overflow: "hidden" }}>
                <h3 className="text-center mb-3">Sign Up</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="success" className="w-100">
                        Sign Up
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <small>
                        Already have an account? <a href="/login">Login</a>
                    </small>
                </div>
            </Card>
        </Container>
    );
}

export default Signup;
