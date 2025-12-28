import api from "@/lib/api";
export const register = async (registrationData) => {
    const response = await api.post('/auth/register', registrationData);
    return response.data;
}
export const login = async (email, password) => {
    const loginData = { email, password };
    console.log("loginData:", loginData);
    const response = await api.post('/auth/login', loginData);
    return response.data;
}

export const getCurrentUser = async () => {
    const response = await api.get('/auth/me', { withAuth: true });
    return response.data;
}