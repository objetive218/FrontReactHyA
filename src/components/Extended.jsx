/* eslint-disable react/prop-types */
import { useContext, useState } from "react";

import LoginContext from "../context/LoginContex";

const Extended = ({ post, setPost }) => {
    const { user, token, getPosts } = useContext(LoginContext);
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        title: post.title,
        body: post.body,
    });

    async function handleDelete(e) {
        e.preventDefault();

        if (user && user.id === post.user_id) {
            const res = await fetch(`/api/postDocument/${post.id}`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            setPost(e => e.filter(e => e.id !== post.id))
            const data = await res.json();

            console.log(data);
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        const res = await fetch(`/api/postDocument/${post.id}`, {
            method: "put",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        getPosts()
        setShow(false);
        const data = await res.json();

        console.log(data);

    }

    return (
        <div key={post.id} className="sheet" >
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Creado por : {post.user.name}</p>
            <button onClick={handleDelete}>Borrar</button>
            {user?.id === post?.user_id ? <button onClick={() => setShow(!show)}>Editar</button> : ""}
            {show ? <form action="#" onSubmit={handleUpdate}>
                <input value={formData.title} type="text" onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                } name="title" id="title" placeholder="Title" />
                <textarea value={formData.body} name="Post content" onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                } id="Post content" rows="6" placeholder="Post content"></textarea>
                <button>Editar</button>
            </form> : ""}
        </div >
    );
}

export default Extended;
