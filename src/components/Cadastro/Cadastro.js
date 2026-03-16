import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../FirebaseConnection"
import { createUserWithEmailAndPassword } from "firebase/auth"

function Cadastro() {
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
        await createUserWithEmailAndPassword(auth, usuario.email, usuario.senha)
        .then(()=>{
    
            setUsuario({
                email: "",
                senha: ""
            })
            alert("Cadastrado!")
            navigate("/admin", {replace: true})
        })
        .catch(()=>{
            alert("Erro!")
        })
    }
    return(
        <div className="div-login">
            <h1>Cadastrar-se</h1>
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

                <button type="submit">Cadastrar</button>
            </form>
            <Link to={"/"}>Fazer o Log-in</Link>
        </div>
    )
}
export default Cadastro