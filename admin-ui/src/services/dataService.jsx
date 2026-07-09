import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app";

export const goalService = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/goals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });
    return response.data.data[0];
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};

export const expenseService = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = response?.data;

    if (Array.isArray(payload)) {
      return payload;
    }

    if (Array.isArray(payload?.data)) {
      return payload.data;
    }

    return [];
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg || error.message,
    };
  }
};

export const billService = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/bills`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg || error.message,
    };
  }
};