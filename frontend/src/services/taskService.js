import api from "../lib/api";
export const createTask = async (taskData) => {
    const response = await api.post('/tasks', taskData, { withAuth: true });
    return response.data;
}
export const getTasks = async () => {
    const response = await api.get('/tasks', { withAuth: true });
    return response.data;
}
export const getTask = async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`, { withAuth: true });
    return response.data;
}
export const updateTask = async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData, { withAuth: true });
    return response.data;
}
export const deleteTask = async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`, { withAuth: true });
    return response.data;
}
