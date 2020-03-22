import axios from "axios"
import { toast } from "react-toastify"

const randomDog = axios.create({ baseURL: "https://random.dog" })

randomDog.interceptors.response.use(
  response => response.data,
  error => {
    // if (error.response.status === 401) {
    //   window.location.replace("/login")
    // }
    toast.error(error.toString())
    return Promise.reject(error)
  }
)

export default randomDog

// randomDog.defaults.headers.common.Authorization = AUTH_TOKEN
