import { useState, useEffect } from "react"
import { db, auth } from "../FirebaseConnection"
import {collection, doc, addDoc, getDocs, updateDoc, deleteDoc} from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

function App() {
  const [post, setPost] = useState({
    titulo: "",
    autor: ""
  })
  const[lista, setLista] = useState([])
  const[id, setId] = useState("")
  const[email, setEmail] = useState("")
  const[senha, setSenha] = useState("")
  const[user, setUser] = useState(false)
  const[detalhes, setDetalhes] = useState({})

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
  function capturarId(e) {
    setId(e.target.value)
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
  useEffect(()=>{
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
    buscarPosts()
  }, [])

  useEffect(()=>{
    async function checkLogin() {
      onAuthStateChanged(auth, (user)=>{
        if(user){
          setUser(true)
          setDetalhes({
            uid: user.uid,
            email: user.email
          })
        }else{
          setUser(false)
          setDetalhes({})
        }
      })
    }
    checkLogin()
  }, [])

  async function editarPost() {
    const docRef = doc(db, "posts", id)
    await updateDoc(docRef, {
      titulo: post.titulo,
      autor: post.autor
    })
    .then(()=>{
      setPost({
        titulo: "",
        autor: ""
      })
      setId("")
    })
    .catch(()=>{
      return console.log("Erro")
    })
  }
  async function excluirPost(idClicado) {
    const docRef = doc(db, "posts", idClicado)
    await deleteDoc(docRef)
    .then(()=>{
      return alert("Tudo certo!")
    })
    .catch(()=>{ 
      return console.log("Erro!")
    })
  }
  async function cadastrarUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
    .then((valor)=>{
        alert("Cadastrado com Sucesso!")
        setDetalhes({
          uid: valor.user.uid,
          email: valor.user.email
        })
        setUser(true)
        setEmail("")
        setSenha("")
    })
    .catch((erro)=>{
      alert("Erro ao cadastrar!")
      console.log("erro => " +erro)
    })
  }
  async function sair() {
    await signOut(auth)
    setUser(false)
    setDetalhes({})
  }


  return (
    <div>
      <h1>React & Firebase</h1>
      { user && (
        <div>
          <h2>Login realizado com Sucesso!</h2>
          <p>{detalhes.email}</p>
          <button onClick={sair}>Sair</button>
        </div>
      ) }
      <div>
        <h2>Autenticação</h2>
        <label>Email </label>
        <input type="email" onChange={(e)=> setEmail(e.target.value)} value={email} />
        <br /><br />
        <label>Senha </label>
        <input type="password" onChange={(e)=> setSenha(e.target.value)} value={senha} />
        <br /><br />
        <button onClick={cadastrarUsuario}>Cadastrar</button>
      </div>
      <br />
      <hr />
      <h2>Formulário</h2>
      <form onSubmit={salvarPost}>
        <label>Id </label>
        <input name="id" onChange={capturarId} value={id} type="text" />
        <br /><br />
        <label>Título </label>
        <input onChange={capturarInput} name="titulo" value={post.titulo} type="text" required />
        <br /><br />
        <label>Autor </label>
        <input onChange={capturarInput} name="autor" value={post.autor} type="text" required />
        <br /><br />
        <button type="submit">Enviar</button>
      </form>
      <br />
      <button onClick={editarPost}>Editar Post</button>
      <br /><br />
      <hr />
      <h2>Listagem</h2>
      <ul>
        {lista.map((_,i)=>{
          return(
            <div key={i}>
              <li>
                <p>ID: {_.id}</p>
                <h3>Título: {_.titulo}</h3>
                <p>Autor: {_.autor}</p>
              </li>
              <button onClick={ () => excluirPost(_.id) }>Excluir</button>
              <br />
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
