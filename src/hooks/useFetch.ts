import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const useFetch = (endPoint: string) => {
  const auth:any = useAuth()
  const [data, setData] = useState([]);
  async function fetchData() {
    try{
      const options: any = {
        Headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      };
      const {data} = await axios.get(endPoint, options);
      setData(data);
    }catch(error:any){
      auth.setAlert({
        open: true,
        message: error,
        type: "error",
        autoClose: true
      })
    }
  }
  useEffect(() => {
    fetchData()
  }, [axios.defaults.headers.Authorization])
  return data
}

export default useFetch;
