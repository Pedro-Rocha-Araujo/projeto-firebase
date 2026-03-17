import { useState, useEffect } from "react"
import { auth } from "../../FirebaseConnection"
import { onAuthStateChanged } from "firebase/auth"
import { Navigate } from "react-router-dom"

function Privado({children}) {
    const [carregando, setCarregando] = useState(true)
    const [logado, setLogado] = useState(false)

    useEffect(()=>{
        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user)=>{
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }
                    localStorage.setItem("@detailUser", JSON.stringify(userData))
                    setCarregando(false)
                    setLogado(true)
                }else{  
                    setCarregando(false)
                    setLogado(false)
                }
            })
        }

        checkLogin()
    }, [])

    if(carregando) {
        return(
            <div></div>
        )
    }
    if(!logado){
        return <Navigate to={"/"} />
    }else{
        return children 
    }

}

export default Privado