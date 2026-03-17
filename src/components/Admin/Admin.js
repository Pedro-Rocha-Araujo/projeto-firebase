import { useState, useEffect } from "react"
import { auth, db } from "../../FirebaseConnection"
import { signOut } from "firebase/auth"
import { addDoc, collection, onSnapshot, query, orderBy, where } from "firebase/firestore"

function Admin() {
    const [tarefa, setTarefa] = useState("")
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])

    useEffect(()=>{
        async function carregarTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            if(userDetail){
                setUser(JSON.parse(userDetail))
                const data = JSON.parse(userDetail)
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("data", "desc"), where("userUid", "==", data?.uid))
                const onsub = onSnapshot(q, (snapshot)=>{
                    let lista = []
                    snapshot.forEach((doc)=>{
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setTarefas(lista)
                })
            }
        }
        carregarTarefas()
    }, [])

    async function adcionarTarefa(e) {
        e.preventDefault()
        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefa,
            data: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            console.log("OK!")
        })
        .catch(()=>{
            alert("Erro no momento do cadastro!")
        })
        setTarefa("")
    }

    async function sairConta() {
        await signOut(auth)
    }

    async function editarTarefa() {
    }

    async function deletarTarefa() {
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
                {tarefas.map((_,i)=>{
                    return(
                        <div key={i} className="tarefas">
                            <p>{_.tarefa}</p>
                            <div className="botoes">
                                <button onClick={editarTarefa} className="btn-editar">Editar</button>
                                <button onClick={deletarTarefa} className="btn-deletar">Deletar</button>
                            </div>
                        </div>
                    )
                })}
            </section>
            <div className="sair">
                <p onClick={sairConta} className="sair">Sair da conta.</p>
            </div>
        </div>
    )
}

export default Admin