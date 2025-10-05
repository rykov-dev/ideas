import { useEffect, useState } from 'react';
import { Idea } from '../types';
import { getIdeas } from '../api';

export function useIdea() {
   const [isLoading, setIsLoading] = useState<boolean>();
   const [error, setError] = useState<Error | null>();
   const [data, setData] = useState<Idea[]>();

   const query = async () => {
      setIsLoading(true);
      setError(null);

      try {
         const ideas = await getIdeas();
         setData(ideas);
         setIsLoading(false);
      } catch (error) {
         setIsLoading(false);
         setError(error);
      }
   };
   const updateItem = (newItem: Idea) => {
      setData((old) => {
         return old?.map(item => item.id === newItem.id ? newItem : item)
      });
   }

   useEffect(() => {
      if (isLoading || data) return
      query();
   }, []);

   return {
      isLoading,
      hasError: Boolean(error),
      error,
      data,
      updateItem
   };
}