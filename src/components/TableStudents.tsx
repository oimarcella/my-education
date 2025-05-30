import styles from '@styles/components/TableStudents.module.scss';
import useStudentsMapped from '@/hooks/useStudentsMapped';
import type { TStudentMapped } from '@/models/TStudentMapped';
import { useNavigate } from 'react-router-dom';
import {deleteStudent } from '../services/student.service';

function TableStudents() {
  const {students, removeStudent }= useStudentsMapped(); 
  const navigateTo = useNavigate();

  function editStudent(studentId:any){
    navigateTo(`/editar-estudante/${studentId}`);
  }

  async function handleDelete(studentId:number){
    await deleteStudent(studentId);
    removeStudent(studentId);
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className='font-extra-small weight-bold'>ID</th>
          <th className='font-extra-small weight-bold'>Nome</th>
          <th className='font-extra-small weight-bold'>RA</th>
          <th className={`font-extra-small weight-bold ${styles["width-200"]}`}>Série</th>
          <th className='font-extra-small weight-bold'>Classe</th>
        </tr>
      </thead>
      <tbody>
          {students.map((student) => (
            <tr 
            style={{ cursor: 'pointer' }}
            key={student.id}>
              <td className='font-small'>{student.id}</td>
              <td className='font-small'>{student.name}</td>
              <td className='font-small'>{student.ra}</td>
              <td className='font-small'>{student.degreeName}</td>
              <td className='font-small'>{student.classTitle}</td>

              <td className={styles['button-cell']}>
                <span className={styles['button']} onClick={() => handleDelete(student.id)}>
                  <span className="material-icons" style={{ fontSize: 16 }}>delete</span>
                </span>
                <span className={styles['button']} onClick={() => editStudent(student.id)}>
                  <span className="material-icons" style={{ fontSize: 16 }}>edit</span>
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TableStudents