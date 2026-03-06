import React, { useState } from 'react';

const LoginForm = ({ Login, Register, error }) => {
    const [details, setDetails] = useState({ username: '', password: '' });
    const [isOnLoginForm, setIsOnLoginForm] = useState(true);

    const loginSubmitHandler = e => {
        e.preventDefault();
        Login(details);
    };

    const registerSubmitHandler = e => {
        e.preventDefault();
        Register(details);
    };

    const switchToRegister = () => {
        setDetails({ username: '', password: '' });
        setIsOnLoginForm(false);
    };

    const switchToLogin = () => {
        setDetails({ username: '', password: '' });
        setIsOnLoginForm(true);
    };

    return (
        <div className="login-form-container">
            <h2>{isOnLoginForm ? 'USER LOGIN' : 'REGISTER'}</h2>

            {error && <div className="error">{error}</div>}

            <form onSubmit={isOnLoginForm ? loginSubmitHandler : registerSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="username">USERNAME</label>
                    <input
                        className="inputfield"
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        value={details.username}
                        onChange={e => setDetails({ ...details, username: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">PASSWORD</label>
                    <input
                        className="inputfield"
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        value={details.password}
                        onChange={e => setDetails({ ...details, password: e.target.value })}
                    />
                </div>
                <input
                    type="submit"
                    value={isOnLoginForm ? 'LOGIN' : 'REGISTER'}
                    className={isOnLoginForm ? 'login-btn' : 'register-btn'}
                />
            </form>

            <button
                className={isOnLoginForm ? 'switch-to-register-button' : 'switch-to-login-button'}
                onClick={isOnLoginForm ? switchToRegister : switchToLogin}
            >
                {isOnLoginForm ? '→ CREATE AN ACCOUNT' : '→ ALREADY HAVE AN ACCOUNT'}
            </button>
        </div>
    );
};

export default LoginForm;