import { useContext, useState } from "react";
import Extended from "./Extended";
import LoginContext from "../context/LoginContex";

const Home = () => {
    const {allPost, setAllPost} = useContext(LoginContext)
    const [post,setPost] = useState([])
   
    return (
        <section className="content">
             {allPost.length > 0 ? allPost.map((post) => (
                 <Extended key={post.id} post={post} setPost={setAllPost}/>
             ) ) : "no hay archivos"}
        </section>
    );
}

export default Home;
