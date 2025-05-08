import { axiosInstance } from "./axios";

export const signUp = async (signUpData) => {
  const res = await axiosInstance.post("/auth/signup", signUpData);
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.error("Error fetching auth user:", error);
    return null;
  }
};

export const completeVerfication = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export async function getUserFriends() {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
}

export async function getRecommendedUsers() {
  const res = await axiosInstance.get("/users");
  return res.data;
}

export async function getOutgoingFriendRequests() {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
}

export async function sendFriendRequest(userId) {
  const res = await axiosInstance.post(`/users/sent-requests/${userId}`);
  return res.data;
}

export async function acceptFriendRequest(requestId) {
  const res = await axiosInstance.put(`/users/accept-request/${requestId}`);
  return res.data;
}

export async function getFriendRequests() {
  const res = await axiosInstance.get("/users/friend-requests");
  return res.data;
}

export async function getStreamToken() {
  const res = await axiosInstance.get("/chat/");
  return res.data;
}
