import { Route, Routes } from "react-router-dom"
import Home from "../Home/Home"
import Cadastro from "../Cadastro/Cadastro"
import Admin from "../Admin/Admin"

function RouterApp(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    )
}

export default RouterApp