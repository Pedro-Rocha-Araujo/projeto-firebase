import { Route, Routes } from "react-router-dom"
import Home from "../Home/Home"
import Cadastro from "../Cadastro/Cadastro"

function RouterApp(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    )
}

export default RouterApp