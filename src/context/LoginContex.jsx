import { createContext, useEffect, useState } from "react";


const LoginContext = createContext();
// eslint-disable-next-line react/prop-types
const LoginProvider = function ({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [closeForm, setCloseForm] = useState(false)
    const [allPost, setAllPost] = useState([])
    async function getUser() {
        const res = await fetch("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();

        if (res.ok) {
            setUser(data);
        }
    }

    async function getPosts() {
        const res = await fetch("/api/postDocument");
        const data = await res.json();

        if (res.ok) {
            setAllPost(data);
        }
        console.log(data)
    }


    useEffect(() => {
        getPosts();
        if (token) {
            getUser();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (<LoginContext.Provider value={{ token, setToken, user, setUser, closeForm, setCloseForm, allPost, setAllPost, getPosts }} >{children}</LoginContext.Provider>)
}
export { LoginProvider };
export default LoginContext;