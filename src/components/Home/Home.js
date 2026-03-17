import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../FirebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"

function Home() {
    const [usuario, setUsuario] = useState({
        email: "",
        senha: ""
    })
    const navigate = useNavigate()

    function pegarInput(e) {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setUsuario((prevValue)=>{
            return {
                ...prevValue,
                [nameInput]: valueInput
            }
        })
    }
    async function salvarInput(e) {
        e.preventDefault()
        await signInWithEmailAndPassword(auth, usuario.email, usuario.senha)
        .then(()=>{
            navigate("/admin", {replace: true})
            alert("Ok!")
        })
        .catch(()=>{
            alert("Erro")
        })
        setUsuario({
            email: "",
            senha: ""
        })
    }

    return(
        <div className="div-home">
            <h1>Fazer Log-in</h1>
            <form onSubmit={salvarInput}>
                <input 
                    type="email" 
                    onChange={pegarInput} 
                    name="email" 
                    value={usuario.email} 
                    placeholder="Digite seu Email"
                    required />

                <input 
                    type="password" 
                    onChange={pegarInput} 
                    name="senha" 
                    value={usuario.senha} 
                    placeholder="Digite sua Senha"
                    required />

                <button type="submit">Entrar</button>
            </form>
            <Link to={"/cadastro"}>Cadastrar-se</Link>
        </div>
    )
}
export default Home