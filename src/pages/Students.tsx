import styles from "@/styles/pages/Students.module.scss";
import TableStudents from "@/components/TableStudents";
import { useEffect, useState } from "react";
import { createMassiveStudents, getStudents } from "@/services/student.service";
import type { TStudent } from "@/models/TStudent";
import { useNavigate } from "react-router-dom";
import useStudentsContext from "@/context/StudentsContext";
import PieChartGrafic from "@/components/PieChartGrafic";
import useStudentsMapped from "@/hooks/useStudentsMapped";

const QUANTITY_STUDENTS = 300;

const Students = () => {
    const [students, setStudents] = useState([] as TStudent[]);
    const navigateTo = useNavigate();
    const {needUpdateStudent, notifyUpdateStudent} = useStudentsContext();
    const [isLoading, setIsLoading] = useState(false);
    const { students: studentsMapped } = useStudentsMapped();
    const [dataClasses, setDataClasses] = useState(Array<{name:string, value:number}> || []);

    async function fetchStudents() {
        const studentsFetched = await getStudents();
        setStudents( studentsFetched);
    }

    function getStudentsByClass(): Array<{name:string, value:number}>{
        const data = studentsMapped.reduce((accumulator, item)=>{
            let classe = item.classTitle;
            let groupFound = accumulator.find(group => group.name == `Classe ${classe}`)

            if(groupFound){
                groupFound.value++;
            }
            else{
                accumulator.push({
                    name: `Classe ${item.classTitle}`,
                    value: 1
                })
            }
            return accumulator
        }, [] as Array<{name:string, value:number}>);

        return data;
    }
    
    useEffect(()=>{
        fetchStudents();
        const dataGraphics = getStudentsByClass();
        setDataClasses(dataGraphics);
    }, []);

     useEffect(()=>{
        if(needUpdateStudent){
            fetchStudents();
            const dataGraphics = getStudentsByClass();
            setDataClasses(dataGraphics);
            notifyUpdateStudent()
        }
    }, [needUpdateStudent, studentsMapped]);

    useEffect(() => {
    if (studentsMapped && studentsMapped.length > 0) {
        const dataGraphics = getStudentsByClass();
        setDataClasses(dataGraphics);
    }
}, [studentsMapped]);

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
                <button className={`btn btn-primary fit-content`} onClick={() => redirectToAddStudent()}>
                    <span className="onlyMobile">
                        Novo aluno
                    </span>
                    <span className="onlyDesk">
                        Cadastrar novo aluno
                    </span>
                </button>
            </div>

            <div className={`${styles["stats-section"]}`}>
                <div className={`${styles["stat-box"]}`}>
                    <span className={`${styles["stat-number"]}`}>{students.length}</span>
                    <span className={`${styles["stat-label"]}`}>Total de Alunos</span>
                </div>
                <div className={`${styles["stat-box"]}`}>
                    <PieChartGrafic data={dataClasses}/>
                </div>
            </div>

			<button className={`btn btn-primary ${styles["btn-random-generation"]} ${isLoading && "disabled"} has-icon`} onClick={handleMassiveGenerationStudents}>
				<span className="material-icons">
				autorenew
				</span> 

                    <span className="onlyDesk">
                        Gerar + {QUANTITY_STUDENTS} alunos
                    </span>
				  <span className="onlyMobile">
                    + {QUANTITY_STUDENTS} alunos
                  </span>
			</button>

            <p className={`${styles["table-info"]} ${styles.onlyDesk}`}>
                Passe o cursor sobre as linhas da tabela para visualizar detalhes ou realizar ações.
            </p>
			

            <TableStudents />
        </div>
    )
}

export default Students;