import api from "@/config/api";
import type { TStudent } from "@/models/TStudent";

export async function getStudents(): Promise<Array<TStudent>>{
    return await api('/students');
}
export async function getStudentById(id:any): Promise<TStudent>{
    return await api(`/students/${id}`);
}
export async function deleteStudent(id:number): Promise<void>{
    return await api(`/students/${id}`,{
        method: 'DELETE'
    });
}
export async function createStudent(student: Omit<TStudent, "id">): Promise<TStudent>{
    
    let newId : number;
    let  exists = false;

    do{
        newId = Math.floor(Math.random() * 10000);
        try{
           await getStudentById(newId);
           exists = true; 
        }
        catch (error) {
            exists = false;
        }
    }
    while (exists)
    
    const newStudent: TStudent = {
        id: newId,
        ...student
    }
    const studentCreated = await api('/students', {
        method: 'POST',
        body: JSON.stringify(newStudent)
    })
    
    return studentCreated;
}
export async function updateStudent(student: TStudent): Promise<TStudent> {
    const updatedStudent = await api(`/students/${student.id}`, {
        method: 'PUT',
        body: JSON.stringify(student)
    });
    return updatedStudent;
}