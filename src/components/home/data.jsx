import axios from "axios";
import { useEffect, useState } from "react";

export default function Data() {
    const [data, setData] = useState([])
    useEffect(() => {
    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      .then(response => {
        // Handle the successful response
        setData(response.data)
        console.log("success")
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
    }, [])
    return data;
  }
