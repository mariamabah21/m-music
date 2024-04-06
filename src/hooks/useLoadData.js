import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function useLoadData(fetchData) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const artist = await fetchData();
        setData(artist);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return [data, isLoading];
}
