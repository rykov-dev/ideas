import { Idea } from './types';

export async function getIdeas(): Promise<Idea[]> {
   const res = await fetch("/api/v1/idea");
   const items = await res.json();

   return items;
}

export async function upvoteIdea(id: string): Promise<Idea> {
   const res = await fetch(`/api/v1/idea/${id}/vote`);
   const result = await res.json();

   if (res.status === 309) {
      throw new Error(result.error);
   }

   return result;
}