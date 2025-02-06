import { useContext, useState } from "react";
import LoginContext from "../context/LoginContex";
import Register from "./Register";
import Login from "./Login";
import '../App.css'
const NavBar = () => {
    const { user, closeForm, setCloseForm, token, setUser, setToken, getPosts } = useContext(LoginContext)
    const [loginForm, setLoginForm] = useState(false)
    const [file, setFile] = useState({});
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

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Selecciona un archivo primero");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/import-excel", {
                method: "post",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            console.log(result);
            alert("Archivo importado correctamente");
            getPosts()
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            alert("Error al importar el archivo");
        }
    };
    
    return (
        <nav>
            <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
            <button onClick={handleUpload}>Cargar</button>
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
            {user ?"": <button onClick={() => setLoginForm(!loginForm)} className="login">Login</button>}
            {loginForm ? <Login setLoginForm={setLoginForm} /> : ""}
        </nav>
    );
}

export default NavBar;
