import { useContext, useState } from "react";
import LoginContext from "../context/LoginContex";

// eslint-disable-next-line react/prop-types
const Login = ({ setLoginForm }) => {
    const { setToken } = useContext(LoginContext);

    const [formData, setFormData] = useState({  
        email: "",
        password: "",  
    })
    const [errors, setErrors] = useState({})

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('api/login', {
            method: "post",
            body: JSON.stringify(formData)
        });

        const data = await res.json()
        if (data.errors) {
            setErrors(data.errors)
        } else {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setLoginForm(false)
        }

    }




    return (
        <div>
            
            <form action="#" className="createForm" onSubmit={handleLogin}>
                <h3>Ingresa en tu cuenta</h3>
                <input value={formData.email} onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                }} type="email" name="email" placeholder="Email" id="email" />
                {errors.email && <p>{errors.email[0]}</p>}
                <input value={formData.password} onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                }} type="password" name="password" placeholder="Password" id="password" />
                {errors.password && <p>{errors.password[0]}</p>}
                <button  >Entrar</button>
            </form>
        </div>
    );
}

export default Login;
