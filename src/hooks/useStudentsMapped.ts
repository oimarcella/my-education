import { useEffect, useMemo, useState } from "react";
import type { TStudent } from "@/models/TStudent";
import type { TDegree } from "@/models/TDegree";
import type { TClasse } from "@/models/TClasse";
import { getStudents } from "@/services/student.service";
import { getDegrees } from "@/services/degree.service";
import { getClasses } from "@/services/classe.service";
import useStudentsContext from "@/context/StudentsContext";

type TUseStudentsMappedHook = {
	students?: Array<TStudent>;
}

function useStudentsMapped(props: TUseStudentsMappedHook = {}) {
	const [students, setStudents] = useState(Array<TStudent>);
	const [classes, setClasses] = useState(Array<TClasse>);
	const [degrees, setDegrees] = useState(Array<TDegree>);
	const { needUpdateStudent, notifyUpdateStudent } = useStudentsContext();


	function removeStudent(id: number) {
		setStudents(prev => prev.filter(s => s.id !== id));
	}

	function addStudant(student: TStudent) {
		setStudents(prev => [...prev, student]);
	}

	useEffect(() => {

		async function fetchData() {
			const studentsData = await getStudents()
			const degreesData = await getDegrees()
			const classesData = await getClasses()

			setStudents(studentsData);
			setDegrees(degreesData);
			setClasses(classesData);
		}
		fetchData();
	}, [])

	useEffect(() => {

		async function fetchData() {
			if (props.students && props.students.length > 0) {
				setStudents(props.students);
			} else {
				const studentsData = await getStudents()
				setStudents(studentsData);
			}
		}
		fetchData();
	}, [props.students])

	useEffect(() => {
		async function fetchData() {
			const studentsData = await getStudents()

			setStudents(studentsData);
			notifyUpdateStudent();
		}

		if (needUpdateStudent) fetchData();

	}, [needUpdateStudent])

	return useMemo(() => {
		const degreeMap = degrees.reduce((map, degree) => {
			map[degree.id] = degree.name;
			return map;
		}, {} as Record<number, string>);

		const classesMap = classes.reduce((map, item) => {
			map[item.id] = item.name;
			return map;
		}, {} as Record<string, string>);

		const mapped = students.map(student => ({
			...student,
			degreeName: degreeMap[student.degreeId] || 'Grau não encontrado',
			classTitle: classesMap[student.classId] || `Turma não encontrada`,
		}));

		return { students: mapped, removeStudent, addStudant };
	}, [students, degrees]);

}

export default useStudentsMapped