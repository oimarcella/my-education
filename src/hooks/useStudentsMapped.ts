import { useEffect, useMemo, useState } from "react";
import type { TStudent } from "@/models/TStudent";
import type { TDegree } from "@/models/TDegree";
import type { TClasse } from "@/models/TClasse";
import { getStudents } from "@/services/student.service";
import { getDegrees } from "@/services/degree.service";
import { getClasses } from "@/services/classe.service";

function useStudentsMapped() {
    const [students, setStudents] = useState(Array<TStudent>);
    const [classes, setClasses] = useState(Array<TClasse>);
    const [degrees, setDegrees] = useState(Array<TDegree>);

    function removeStudent(id: number) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }

    useEffect(()=>{

      async function fetchData(){
        const studentsData = await getStudents()
        const degreesData = await getDegrees()
        const classesData = await getClasses()

        setStudents(studentsData);
        setDegrees(degreesData);
        setClasses(classesData);
      }
      fetchData();
    }, [])

   return useMemo(() => {
    const degreeMap = degrees.reduce((map, degree) => {
      map[degree.id] = degree.name;
      return map;
    }, {} as Record<number, string>);

    const enriched = students.map(student => ({
      ...student,
      degreeName: degreeMap[student.degreeId] || 'Grau não encontrado',
      classTitle: classes[student.classId].name || 'Turma não encontrada',
    }));

    return {students: enriched, removeStudent};
  }, [students, degrees]);

}

export default useStudentsMapped