import { useState, useEffect } from "react"
import { auth, db } from "../../FirebaseConnection"
import { signOut } from "firebase/auth"
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from "firebase/firestore"

function Admin() {
    const [tarefa, setTarefa] = useState("")
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])
    const [editando, setEditando] = useState(null)

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
        if(editando !== null){
            concluirEdicao()
            return
        }
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

    async function editarTarefa(_) {
        setTarefa(_.tarefa)
        setEditando(_)
    }

    async function deletarTarefa(id) {
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    async function concluirEdicao() {
        const docRef = doc(db, "tarefas", editando?.id)
        await updateDoc(docRef, {
            tarefa: tarefa
        })
        .then(()=>{
            console.log("Tarefa editada!")
            setTarefa("")
            setEditando(null)
        })
        .catch(()=>{
            console.log("Erro ao editar!")
        })
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
                <button type="submit">{editando === null? "Adicionar": "Editar"}</button>
            </form>
            <section>
                {tarefas.map((_,i)=>{
                    return(
                        <div key={i} className="tarefas">
                            <p>{_.tarefa}</p>
                            <div className="botoes">
                                <button onClick={()=>editarTarefa(_)} className="btn-editar">Editar</button>
                                <button onClick={()=>deletarTarefa(_.id)} className="btn-deletar">Deletar</button>
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