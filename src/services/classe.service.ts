import api from "@/config/api";
import type { TClasse } from "@/models/TClasse";

export async function getClasses(): Promise<Array<TClasse>>{
    return await api('/classes');
}
export async function getClasseById(id:any): Promise<TClasse>{
    return await api(`/classes/${id}`);
}
export async function deleteClasse(id:any): Promise<void>{
    return await api(`/classes/${id}`,{
        method: 'DELETE'
    });
}