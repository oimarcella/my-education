import TableStudents from "@/components/TableStudents";
import { getDegrees } from "@/services/degree.service";
import { useEffect } from "react";

const Students = () => {
    useEffect(() => {
        async function fetchDegree(){
            const teste = await getDegrees()
        }
        fetchDegree();
    }, [])
    return (
        <div>
            <h1>Estudantes</h1>
            <p>Clique na linha correspondente ao aluno que deseja editar</p>
            
            <TableStudents />
        </div>
    )
}

export default Students;