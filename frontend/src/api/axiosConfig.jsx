import axios from "axios";

export default axios.create({
    baseURL: `${import.meta.env.YOUR_API_KEY_HERE}`,
    headers: {
      'Content-Type': 'application/json',
    },
})
