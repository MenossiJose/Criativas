import { useState } from 'react';
import ReusableInput from '../components/reusableInput';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <ReusableInput/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <ReusableInput/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};



export default Login;