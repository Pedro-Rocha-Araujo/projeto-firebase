import { useState } from "react"
import { auth } from "../../FirebaseConnection"
import { signOut } from "firebase/auth"

function Admin() {
    const [tarefa, setTarefa] = useState("")
    function adcionarTarefa(e) {
        e.preventDefault()
        setTarefa("")
        alert("OK!")
    }

    async function sairConta() {
        await signOut(auth)
    }

    return(
        <div className="admin">
            <h1>Adcionar Tarefas</h1>
            <form onSubmit={adcionarTarefa}>
                <textarea 
                    onChange={(e)=> setTarefa(e.target.value)} 
                    placeholder="Digite sua nova tarefa" 
                    value={tarefa}
                    required   
                />
                <button type="submit">Adicionar</button>
            </form>
            <section>
                <div className="tarefas">
                    <p>Tarefa número 1</p>
                    <div className="botoes">
                        <button className="btn-editar">Editar</button>
                        <button className="btn-deletar">Deletar</button>
                    </div>
                </div>
            </section>
            <div className="sair">
                <p onClick={sairConta} className="sair">Sair da conta.</p>
            </div>
        </div>
    )
}

export default Admin