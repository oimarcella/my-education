import styles from "@/styles/pages/Students.module.scss";
import TableStudents from "@/components/TableStudents";
import { useEffect, useState } from "react";
import { createMassiveStudents, getStudents } from "@/services/student.service";
import type { TStudent } from "@/models/TStudent";
import { useNavigate } from "react-router-dom";
import useStudentsContext from "@/context/StudentsContext";

const QUANTITY_STUDENTS = 2; // Define a constant for the number of students to generate

const Students = () => {
    const [students, setStudents] = useState([] as TStudent[]);
    const navigateTo = useNavigate();
    const {needUpdateStudent, notifyUpdateStudent} = useStudentsContext();
    const [isLoading, setIsLoading] = useState(false);

    async function fetchStudents() {
        const studentsFetched = await getStudents();
        setStudents( studentsFetched);
    }
    
    useEffect(()=>{
        fetchStudents();
    }, []);

     useEffect(()=>{
        if(needUpdateStudent){
            fetchStudents();
            notifyUpdateStudent()
        }
    }, [needUpdateStudent]);

    function redirectToAddStudent() {
        navigateTo("/cadastrar-estudante");
    }

    async function handleMassiveGenerationStudents(){
        setIsLoading(true);

		await createMassiveStudents(QUANTITY_STUDENTS);
		setTimeout(() => {
			setIsLoading(false);			
		}, 3000);

        alert("Novos alunos gerados com sucesso!");
        notifyUpdateStudent();
    }



    return (
       <div className={`${styles["page"]}`}>
            <div className={`${styles["header"]}`}>
                <h1 className={`${styles["title"]}`}>Gestão de Estudantes</h1>
                <button className={`btn-primary`} onClick={() => redirectToAddStudent()}>
                    Cadastrar Novo Aluno
                </button>
            </div>

            <div className={`${styles["stats-section"]}`}>
                <div className={`${styles["stat-box"]}`}>
                    <span className={`${styles["stat-number"]}`}>{students.length}</span>
                    <span className={`${styles["stat-label"]}`}>Total de Alunos</span>
                </div>
            </div>

			<button className={`btn-primary ${styles["btn-random-generation"]} ${isLoading && "disabled"} has-icon`} onClick={handleMassiveGenerationStudents}>
				<span className="material-icons">
				autorenew
				</span> 
				Gerar + {QUANTITY_STUDENTS} alunos
			</button>

            <p className={`${styles["table-info"]}`}>
                Interaja com as linhas da tabela para visualizar detalhes ou realizar ações.
            </p>
			

            <TableStudents />
        </div>
    )
}

export default Students;