import axios from "axios"

const diapromURL = "http://localhost:8060/api/1.0/"

export const instanceDiaprom = axios.create({
  // withCredentials: true,
  baseURL: diapromURL,
})

instanceDiaprom.interceptors.request.use((config) => {
  return {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${localStorage.getItem("accessToken") || "asf"}` },
  }
})

