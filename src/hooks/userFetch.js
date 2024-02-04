import axios from "axios";
import { useState } from "react"


const userFetch = () => {
    const [apiData, setApiData] = useState();
    const [isLoading, setIsLoading] = useState()
    const [hasError, setHasError] = useState()

    const getApi = url => {
        axios.get(url)
        .then(res => {
            setHasError(false)
            setApiData(res.data)})
        .catch(err => {
            setHasError(true)
            console.log(err)})
        .finally(() => {
            setIsLoading(false)
        });
    }

    return [apiData, getApi, isLoading, hasError];
  
}

export default userFetch