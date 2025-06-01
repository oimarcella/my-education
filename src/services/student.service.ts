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
  console.info("CONSULTANDO EXISTENCIA DOS IDs GERADOS");
  const newId = await generateUniqueId();

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

function randomName() {
  return `Aluno-${Math.random().toString(36).substring(2, 10)}`;
}

function randomRA() {
  return Math.floor(Math.random() * 90000) + 10000;
}

function randomDegreeId() {
  return Math.floor(Math.random() * 13) + 1;
}

function randomClassId() {
  return Math.floor(Math.random() * 6) + 1;
}

async function generateUniqueId(): Promise<number> {
  let newId: number;
  let exists = false;
  do {
    newId = Math.floor(Math.random() * 9000) + 1000;
    try {
      await getStudentById(newId);
      exists = true;
    } catch {
      exists = false;
    }
  } while (exists);
  return newId;
}

export async function createMassiveStudents(count = 300) {
    const studentsFailed = [];

    for (let i = 0; i < count; i++) {
        const newStudent = {
            name: randomName(),
            ra: randomRA(),
            degreeId: randomDegreeId(),
            classId: randomClassId(),
        };
        
        try{
            await createStudent(newStudent);
        }catch(error){
            console.error(`Erro ao criar estudante ${i + 1}:`, error);
            studentsFailed.push(newStudent);
            continue;
        }

        await new Promise((res) => setTimeout(res, 30));
    }

    console.info(`Ocorreram ${studentsFailed.length} falhas ao criar os estudantes.`);
}

export async function findStudentByRa(ra:number): Promise<TStudent[] | null> {
   const student = await api(`/students/?ra=${ra}`, {
        method: 'GET'
    });
    return student || null;
}