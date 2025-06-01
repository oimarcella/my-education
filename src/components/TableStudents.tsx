import styles from '@styles/components/TableStudents.module.scss';
import useStudentsMapped from '@/hooks/useStudentsMapped';
import { useNavigate } from 'react-router-dom';
import { deleteStudent, findStudentByRa } from '../services/student.service';
import useStudentsContext from '@/context/StudentsContext';
import { useState, type FormEvent } from 'react';
import type { TStudent } from '@/models/TStudent';

function TableStudents() {
	const navigateTo = useNavigate();
	const { notifyUpdateStudent } = useStudentsContext();
	const [filters, setFilters] = useState({
		ra: '',
	});
	const [filteredStudents, setFilteredStudents] = useState<TStudent[] | null>(null);
	const { students, removeStudent } = useStudentsMapped({students: filteredStudents  || undefined});

	function editStudent(studentId: any) {
		navigateTo(`/editar-estudante/${studentId}`);
	}

	async function handleDelete(studentId: number) {
		await deleteStudent(studentId);
		removeStudent(studentId);
		notifyUpdateStudent();
	}

	// TODO - ainda queri adicionar outros filtros usando select
	function handleChange(event: React.ChangeEvent<HTMLInputElement /*| HTMLSelectElement*/>) {
		setFilters({
			...filters,
			[event.target.name]: event.target.value
		});
	}
	
	async function handleSubmit(event:FormEvent) {
		event.preventDefault();

		const filtered = await findStudentByRa(Number(filters.ra));
		setFilteredStudents(filtered);
	}

	return (
		<div className={styles['table-container']}>
			<div className={styles["filters"]}>
				<form onSubmit={handleSubmit}>
					<input type="number" placeholder='RA' name='ra' id='ra' min={0} onChange={handleChange} value={filters.ra}/>
					<button type='submit'>Filtrar</button>
				</form>
			</div>
			<table className={styles.table}>
				<thead>
					<tr>
						<th className={`font-extra-small weight-bold ${styles["width-100"]}`}>ID</th>
						<th className={`font-extra-small weight-bold ${styles["width-100"]}`}>RA</th>
						<th className='font-extra-small weight-bold'>Nome</th>
						<th className={`font-extra-small weight-bold`}>Série</th>
						<th className={`font-extra-small weight-bold ${styles["width-200"]}`}>Classe</th>
						<th className={styles['actions-header']}></th>
					</tr>
				</thead>
				<tbody>
					{students.map((student) => (
						<tr key={student.id}>
							<td className='font-small'>{student.id}</td>
							<td className='font-small'>{student.ra}</td>
							<td className='font-small'>{student.name}</td>
							<td className='font-small'>{student.degreeName}</td>
							<td className='font-small' colSpan={2}>{student.classTitle}</td>

							<td className={styles['action-buttons-cell']}>
								<span className={`${styles['action-button']} ${styles['delete-button']}`} onClick={() => handleDelete(student.id)}>
									<span className="material-icons" style={{ fontSize: 16 }}>delete</span>
								</span>
								<span className={`${styles['action-button']} ${styles['edit-button']}`} onClick={() => editStudent(student.id)}>
									<span className="material-icons" style={{ fontSize: 16 }}>edit</span>
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TableStudents