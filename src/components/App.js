import { useState } from "react"
import { db } from "../FirebaseConnection"
import {collection, addDoc, getDocs} from "firebase/firestore"

function App() {
  const [post, setPost] = useState({
    titulo: "",
    autor: ""
  })

  const[lista, setLista] = useState([])

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
  async function buscarPosts() {
    const postsRef = collection(db, "posts")
    await getDocs(postsRef)
    .then((itens)=>{
      let list = []
      itens.forEach((doc)=>{
        list.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })
      setLista(list)
      console.log("Busca feia com Sucesso")
    })
    .catch((erro)=>{
      console.log(erro)
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
      <br />
      <button onClick={buscarPosts}>Listar Posts</button>
      <ul>
        {lista.map((_,i)=>{
          return(
            <div key={i}>
            <li>
              <h3>Título: {_.titulo}</h3>
              <p>Autor: {_.autor}</p>
            </li>
            <br />
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
