import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      return setError("Passwords do not match.");

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      setError("Failed to create an account.");
    }
    setLoading(false);
  }

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const decrementCount = () => {
    setCount((prevCount) => prevCount - 1);
  };
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={confirmPasswordRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'> Login</Link>
      </div>
      <div>
        <button onClick={decrementCount}>-</button>
        <div>{count}</div>
        <button onClick={incrementCount}>+</button>
        <div>{windowWidth}</div>
      </div>
    </>
  );
}
