import type { TClasse } from "@/models/TClasse";
import type { TDegree } from "@/models/TDegree";
import { getClasses } from "@/services/classe.service";
import { getDegrees } from "@/services/degree.service";
import { createStudent} from "@/services/student.service";
import styles from "@/styles/pages/AddStudent.module.scss";

import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent(){
    const navigateTo = useNavigate();
    const [student, setStudent] = useState({
        name: '',
        ra: '',
        degree: '',
        class: ''
    });
    const [classes, setClasses] = useState([] as Array<TClasse>);
    const [degrees, setDegrees] = useState([] as Array<TDegree>);

    async function fetchData() {
        const classesFetched = await getClasses();
        const degreesFetched = await getDegrees();
        setClasses(classesFetched);
        setDegrees(degreesFetched);
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    function clearFields() {
        setStudent({
            name: '',
            ra: '',
            degree: '',
            class: ''
        });
    }



    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setStudent({ ...student, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try{
            createStudent({
                ...student,
                ra: Number(student.ra),
                degreeId: Number(student.degree),
                classId: Number(student.class)
            });
            clearFields();
            alert('Estudante criado com sucesso');
            navigateTo('/');
        }
        catch (error) {
            alert('Erro ao criar estudante');
        }
        
    }

    return(
    <div className={`${styles["new-student-page"]}`}>
    <h1 className={`${styles["page-title"]}`}>Cadastrar novo aluno</h1>

    <form onSubmit={handleSubmit} className={`${styles["student-form"]}`}>
        <div className={`${styles["form-group"]}`}>
            <label htmlFor="name" className={`${styles["form-label"]} ${styles["sr-only"]}`}>Nome do Estudante</label>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Nome completo do estudante"
                value={student.name}
                onChange={handleChange}
                className={`${styles["form-input"]}`}
            />
        </div>

        <div className={`${styles["form-group"]}`}>
            <label htmlFor="ra" className={`${styles["form-label"]} ${styles["sr-only"]}`}>Registro Acadêmico (RA)</label>
            <input
                type="number"
                name="ra"
                id="ra"
                placeholder="Registro Acadêmico (RA)"
                value={student.ra}
                onChange={handleChange}
                className={`${styles["form-input"]}`}
            />
        </div>

        <div className={`${styles["form-group"]}`}>
            <label htmlFor="degree" className={`${styles["form-label"]} ${styles["sr-only"]}`}>Série</label>
            <select
                name="degree"
                id="degree"
                value={student.degree}
                onChange={handleChange}
                className={`${styles["form-select"]}`}
            >
                <option value="">Selecione a série</option>
                {degrees.map((degree) => (
                    <option key={degree.id} value={degree.id}>
                        {degree.name}
                    </option>
                ))}
            </select>
        </div>

        <div className={`${styles["form-group"]}`}>
            <label htmlFor="class" className={`${styles["form-label"]} ${styles["sr-only"]}`}>Classe</label>
            <select
                name="class"
                id="class"
                value={student.class}
                onChange={handleChange}
                className={`${styles["form-select"]}`}
            >
                <option value="">Selecione a classe</option>
                {classes.map((classe) => (
                    <option key={classe.id} value={classe.id}>
                        {classe.name}
                    </option>
                ))}
            </select>
        </div>
        
        <div className={`${styles["form-actions"]}`}>
            <button type="submit" className={`btn btn-primary ${styles["submit-button"]}`}>Salvar Estudante</button>
            <button type="button" onClick={() => {navigateTo("/")}} className={`btn btn-secondary ${styles["back-button"]}`}>Voltar para Início</button>
        </div>
    </form>
</div>
)
}
export default AddStudent;