import { useContext, useState } from "react";
import LoginContext from "../context/LoginContex";

const Register = () => {
    const { setCloseForm, setToken } = useContext(LoginContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const [errors, setErrors] = useState({})
    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch('api/register', {
            method: "post",
            body: JSON.stringify(formData)
        });

        const data = await res.json()
        if (data.errors) {
            setErrors(data.errors)
        } else {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            console.log(data)
            setCloseForm(true)
        }

    }




    return (
        <div>
            
            <form className="createForm" action="#" onSubmit={handleRegister}>
                <h3>Registrar una nueva cuenta</h3>
                <input value={formData.name} onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                }} type="text" name="name" placeholder="Name" id="name" />
                {errors.name && <p>{errors.name[0]}</p>}
                <input value={formData.email} onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                }} type="email" name="email" placeholder="Email" id="email" />
                {errors.email && <p>{errors.email[0]}</p>}
                <input value={formData.password} onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                }} type="password" name="password" placeholder="Password" id="password" />
                {errors.password && <p>{errors.password[0]}</p>}
                <input value={formData.password_confirmation} onChange={(e) => {
                    setFormData({ ...formData, password_confirmation: e.target.value })
                }} type="password" name="confirm_password" placeholder="Confirme Password" id="confirm_password" />
                {errors.password_confirmation && <p>{errors.password_confirmation[0]}</p>}
                <button  >enviar</button>
            </form>
        </div>
    );
}

export default Register;
