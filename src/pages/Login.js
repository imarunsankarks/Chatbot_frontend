// src/components/Login.js
import { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useTheme } from "../context/theme";
import { FcGoogle } from "react-icons/fc";
function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { theme } = useTheme();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login:", { email, password });
        // Later: call backend API → onLogin(token)
    };
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/login"; // FastAPI Google OAuth route
    };

    return (
        <Container className="d-flex justify-content-center align-items-center ">
            <Card className={`shadow-lg rounded-4 p-5 ${theme === 'light' ? "light" : "dark"}`} style={{ width: "450px", height: "535px", overflow: "hidden" }}>
                <h3 className="text-center mb-3">Login</h3>
                <Form onSubmit={handleSubmit}>
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

                    <Button type="submit" variant="primary" className="w-100">
                        Login
                    </Button>
                </Form>
                <Button
                    variant="light"
                    className="w-100 border d-flex align-items-center mt-3 justify-content-center"
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle size={20} className="me-2" />
                    Sign in with Google
                </Button>

                <div className="text-center mt-3">
                    <small>
                        Don’t have an account? <a href="/signup">Sign up</a>
                    </small>
                </div>
            </Card>
        </Container>
    );
}

export default Login;
