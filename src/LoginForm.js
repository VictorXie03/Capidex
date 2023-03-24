import React, { useState } from 'react';

const LoginForm = ({ Login, Register, error }) => {
    const [details, setDetails] = useState({ username: "", password: "" });
    const [isOnLoginForm, setIsOnLoginForm] = useState(true)

    const loginSubmitHandler = e => {
        e.preventDefault();
        Login(details);
    }

    const registerSubmitHandler = e => {
        e.preventDefault();
        Register(details);
    }

    const switchToRegisterHandler = () => {
        setDetails({ username: "", password: "" }); // Clear input fields
        setIsOnLoginForm(false);
    }

    const switchToLoginHandler = () => {
        setDetails({ username: "", password: "" }); // Clear input fields
        setIsOnLoginForm(true);
    }

    return (
        <div className="login-form-container">
            {isOnLoginForm ?
                <div className="login-form-border">
                    <form onSubmit={loginSubmitHandler}>
                        <div className="form-inner">
                            <h2>Login</h2>
                            {(error !== "") ? (<div className="error">{error}</div>) : ""}
                            <div className="form-group">
                                <label htmlFor="username" />
                                <input className="inputfield" type="username" name="username" id="username" placeholder="Username" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" />
                                <input className="inputfield" type="password" name="password" id="password" placeholder="Password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                            </div>
                            <input type="submit" value="LOGIN" />
                        </div>
                    </form>
                    <button className="switch-to-register-button" onClick={switchToRegisterHandler}>REGISTER</button>
                </div>
                : <div className="login-form-border">
                    <form onSubmit={registerSubmitHandler}>
                        <div className="form-inner">
                            <h2>Register</h2>
                            {(error !== "") ? (<div className="error">{error}</div>) : ""}
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input className="inputfield" type="text" name="username" id="username" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input className="inputfield" type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                            </div>
                            <input type="submit" value="REGISTER" />
                        </div>
                    </form>
                    <button onClick={switchToLoginHandler}>Already have an account, LOGIN</button>
                </div>}
        </div>
    )
}

export default LoginForm;
