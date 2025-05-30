import api from "@/config/api";
import type { TDegree } from "@/models/TDegree";

export async function getDegrees(): Promise<Array<TDegree>>{
    return await api('/degrees');
}
export async function getDegreeById(id:any): Promise<TDegree>{
    return await api(`/degrees/${id}`);
}
export async function deleteDegree(id:any): Promise<void>{
    return await api(`/degrees/${id}`,{
        method: 'DELETE'
    });
}