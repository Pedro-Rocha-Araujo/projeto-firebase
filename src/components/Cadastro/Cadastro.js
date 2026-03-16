import { useState } from "react"
import { Link } from "react-router-dom"

function Cadastro() {
    const [usuario, setUsuario] = useState({
        email: "",
        senha: ""
    })

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
    function salvarInput(e) {
        e.preventDefault()
        alert("Cadastrado!")
        setUsuario({
            email: "",
            senha: ""
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