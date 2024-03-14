import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const useFetch = (endPoint: string, deps: any[] = []) => {
  const [data, setData] = useState<any>();
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
      return;
    }
  }
  useEffect(() => {
    fetchData()
  }, [...deps, axios.defaults.headers.Authorization])
  return data
}

export default useFetch;
