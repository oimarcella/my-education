import { BrowserRouter, Route, Routes } from "react-router-dom"
import Students from "@pages/Students"
import Teachers from "@pages/Teachers"
import EditStudent from "./pages/EditStudent"

function App() {
  const routes = [
   {path: '/estudantes', component: <Students/>},
   {path: '/editar-estudante/:id', component: <EditStudent/>},
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
