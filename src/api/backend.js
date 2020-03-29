import axios from "axios"
import { toast } from "react-toastify"

const backend = axios.create({
  baseURL: `${window.location.origin}/api`
})

backend.interceptors.response.use(
  response => response,
  error => {
    toast.error(error.toString())
    return Promise.reject(error)
  }
)

export default backend
