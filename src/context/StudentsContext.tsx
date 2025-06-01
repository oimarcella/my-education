import { createContext, useContext, useState } from "react";


export type StudentsContextT = {
    needUpdateStudent: boolean;
    notifyUpdateStudent: () => void;
}

interface IProviderProps {
    children: React.ReactNode;
}

const StudentsContext = createContext<StudentsContextT | undefined>(undefined);

export const StudentsProvider = (props:IProviderProps)=>{
    const [needUpdateStudent, setNeedUpdateStudent] = useState<boolean>(false);

    const notifyUpdateStudent = () => {
        setNeedUpdateStudent(!needUpdateStudent);
    }


    return (
        <StudentsContext.Provider value={{needUpdateStudent, notifyUpdateStudent}}>
            {props.children}
        </StudentsContext.Provider>
    )
};

 const useStudentsContext = () => {
    const context = useContext(StudentsContext);
    if (!context) throw new Error("useStudentsContext precisa estar dentro de um StudentsProvider");
    return context;
  };

  export default useStudentsContext;