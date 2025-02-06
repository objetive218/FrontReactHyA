import { useContext, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import LoginContext from './context/LoginContex'
import Create from './components/posts/Create'
import Home from './components/Home'

function App() {
  const { user } = useContext(LoginContext);
  const [closeCreate, setCloseCreate] = useState(true)
  /*
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
  */
  return (
    <>
      <main>
        <NavBar />
        <Home />
        {
          /*
        <button onClick={(e) => setCloseForm(!closeForm)}>Registrarse</button>
        {closeForm && user ? <Register /> : ""}
        {user ? (<>
          <p>Bienvenido{user.name}</p>
          <form>
            <button onClick={handleLogout}>Salir</button>
          </form>
        </>
        ) : <Login />}
            */
         }
        {!closeCreate && user !== null ? <Create setCloseCreate={setCloseCreate} /> : (<>
          <button className='createBtn' onClick={() => setCloseCreate(!closeCreate)}>+</button>
        </>)}
      </main>
    </>
  )
}

export default App
