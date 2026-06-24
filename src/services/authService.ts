import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (
  email: string,
  password: string
) => {
  const response = await axios.post(
    `${API_URL}/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};

export const signup = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${API_URL}/signup`,
    data
  );

  return response.data;
};

export const forgotPassword = async (
  email: string
) => {
  const response = await axios.post(
    `${API_URL}/forgot-password`,
    { email }
  );

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};