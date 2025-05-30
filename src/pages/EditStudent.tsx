import { useParams } from "react-router-dom"

function EditStudent(){
    const params = useParams()
    console.log("EditStudent - params", params)

    return(<>
        <h1>Estudante {params.id}</h1>
    </>)
}
export default EditStudent