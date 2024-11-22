import { useState } from 'react';
import ReusableInput from '../components/reusableInput';
import '../styles/loginStyles.css';
import logo from '../assets/logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="body">
            <div className="login-container">
                <div>
                    <img src={logo} alt="logo" className="logo" />
                </div>
                <form onSubmit={handleSubmit}>

                    <ReusableInput label="E-mail"
                        className="input-field"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <ReusableInput label="Senha"
                        className="input-field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">ENTRAR</button>
                </form>
                <div>
                    <button>REGISTRAR</button>
                </div>
                <h3>Esqueceu sua senha?</h3>
            </div>
        </div>
    );
};



export default Login;