import { getItem, setItem } from "../utils";
import api from "./api";
import { APIResponse } from "../types";
import { rsaEncrypt } from "../utils/rsa";

export const register = async (
  name: string,
  email: string,
  password: string,
  role: string,
  isApproved: boolean
): Promise<string> => {
  try {
    const publicKey = await api.get("/users/key");
    const encryptedPassword = rsaEncrypt(password, publicKey.data.data);
    await api.post("/users/signup", {
      name,
      email,
      password: encryptedPassword,
      role,
      isApproved,
    });
    return "";
  } catch (error) {
    // @ts-ignore
    return error.response.data.error.message;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const publicKey = await api.get("/users/key");
    const encryptedPassword = rsaEncrypt(password, publicKey.data.data);
    const res = await api.post("/users/login", {
      email,
      password: encryptedPassword,
    });
    if (!res.data.success) {
      return res.data.message;
    }
    setItem("token", res.data.data);
    return "";
  } catch (error) {
    // @ts-ignore
    return error.response.data.error.message;
  }
};

export const getCurrentUser = async (): Promise<APIResponse> => {
  try {
    const token = getItem("token");
    if (!token)
      return {
        data: null,
        error: "Unauthorized",
      };
    const res = await api.get("/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return {
      data: res.data.data,
      error: "",
    };
  } catch (error) {
    return {
      data: null,
      // @ts-ignore
      error: error.response.data.error.message,
    };
  }
};
