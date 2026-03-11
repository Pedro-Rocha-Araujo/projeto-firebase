import { useState } from "react"
import { db } from "../FirebaseConnection"
import {collection, addDoc} from "firebase/firestore"

function App() {
  const [post, setPost] = useState({
    titulo: "",
    autor: ""
  })

  function capturarInput(e) {
    const nameInput = e.target.name
    const valueInput = e.target.value
    setPost((prevValue)=>{
      return{
        ...prevValue,
        [nameInput]: valueInput
      }
    })
  }

  async function salvarPost(e) {
    e.preventDefault()
    await addDoc(collection(db, "posts"), {
      titulo: post.titulo,
      autor: post.autor
    })
    .then(()=>{
      console.log("Registro feito com Sucesso!")
    })
    .catch((error)=>{
      console.log(error)
    })
    setPost({
      titulo: "",
      autor: ""
    })
  }
  return (
    <div>
      <h1>Formulário</h1>
      <form onSubmit={salvarPost}>
        <label>Título </label>
        <input onChange={capturarInput} name="titulo" value={post.titulo} type="text" required />
        <br /><br />
        <label>Autor </label>
        <input onChange={capturarInput} name="autor" value={post.autor} type="text" required />
        <br /><br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
