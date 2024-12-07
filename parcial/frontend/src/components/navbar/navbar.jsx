import styles from './navbar.module.css'
import { Link, redirect } from 'react-router-dom'



export default function Navbar() {

    const authData = JSON.parse(localStorage.getItem('auth'))


    return (
        <nav className={styles.navbarContainer}>
            <p>NAVBAR AQUI</p>
            <Link to={'/'}>Home</Link>
            <br />
            
            <Link to={'/ideas'}>Ideias</Link>
            <br />

            <Link to={'/profile'}>Perfil</Link>
            <br />

            <Link to={'/auth'}>Entrar</Link>
            <br />




        </nav>
    )
} 