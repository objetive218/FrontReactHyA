import { useContext, useState } from "react";
import LoginContext from "../../context/LoginContex";

// eslint-disable-next-line react/prop-types
const Create = ({ setCloseCreate }) => {
    const { token, getPosts } = useContext(LoginContext);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    async function handleCreate(e) {
        e.preventDefault();

        const res = await fetch("/api/post-documents", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        getPosts();
        if (data.errors) {
            setErrors(data.errors);
        } else {
            setCloseCreate(true)   
        }
        
    }

    return (
        <>
            <form action="#" onSubmit={handleCreate} className="createForm">
                <button onClick={() => setCloseCreate(true)} className="close">x</button>
                <h3>Crear un nuevo archivo</h3>
                <input type="text" onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                } name="title" id="title" placeholder="Title" />
                <textarea name="Post content" onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                } id="Post content" rows="6" placeholder="Post content"></textarea>
                <button>Crear</button>
            </form>
        </>
    );
}

export default Create;
