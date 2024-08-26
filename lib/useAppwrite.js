import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useAppwrite = (fn) => {
    const [data, setdata] = useState([])
    const [isLoading, setIsLosading] = useState(false);
  
    const fetchData = async () => {
      try {
        setIsLosading(true);
        const response = await fn();
        setdata(response);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLosading(false);
      }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData()

    return {data, isLoading, refetch};
}