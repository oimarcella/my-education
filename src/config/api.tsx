function api(pathUrl:string, options:RequestInit = {}) {

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    return fetch(`${baseURL}${pathUrl}`,
         {
            headers: {
            'Content-Type': 'application/json', ...(options.headers as Record<string, string> || {})
            },
            ...options
        }
     ).then(response => response.json())
}
export default api