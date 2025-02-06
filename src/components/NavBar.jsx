import { useContext, useState } from "react";
import LoginContext from "../context/LoginContex";
import Register from "./Register";
import Login from "./Login";
import '../App.css'
const NavBar = () => {
    const { user, closeForm, setCloseForm, token, setUser, setToken } = useContext(LoginContext)
    const [loginForm, setLoginForm] = useState(false)

    async function handleLogout(e) {
        e.preventDefault();
        const res = await fetch("/api/logout", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            setCloseForm(false);
        }
    }





    return (
        <nav>
            <button className="home">Home</button>
            {user ? "" : <button className="register" onClick={(e) => setCloseForm(!closeForm)}>Registrarse</button>}
            {closeForm && !user ? <Register /> : ""}
            {user ? (<>
                <p className="user">Bienvenid@ {user.name}</p>
                <form>
                    <button className="logout" onClick={handleLogout}>Salir</button>
                </form>
            </>
            ) : ""}
            {user ? "" : <button onClick={() => setLoginForm(!loginForm)} className="login">Login</button>}
            {loginForm ? <Login setLoginForm={setLoginForm} /> : ""}
        </nav>
    );
}

export default NavBar;
