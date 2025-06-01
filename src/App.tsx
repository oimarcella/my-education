import { BrowserRouter, Route, Routes } from "react-router-dom"
import Students from "@pages/Students"
import Teachers from "@pages/Teachers"
import EditStudent from "./pages/EditStudent"
import AddStudent from "./pages/AddStudent"

function App() {
  const routes = [
   {path: '/', component: <Students/>},
   {path: '/editar-estudante/:id', component: <EditStudent/>},
   {path: '/cadastrar-estudante/', component: <AddStudent/>},
   {path: '/professores', component: <Teachers/>}
  ]

  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((route, key) => <Route key={key} path={route.path} element={route.component}/>)
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
