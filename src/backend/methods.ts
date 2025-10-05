import { Pool } from "pg";
import { GET_IDEA, GET_IDEAS, UPVOTE_IDEA, VOTE_COUNT } from './queries';
import config from "config";

const dbConfig = config.get("db");
const pool = new Pool(dbConfig);

export async function getIdeas() {
   const { rows } = await pool.query(GET_IDEAS);

   return rows;
}

export async function getIdea(ideaId: string | number) {
   const { rows } = await pool.query(GET_IDEA, [ideaId]);

   return rows[0];
}

export async function upvoteIdea(ideaId: string | number, ip: string) {
   const { rows } = await pool.query(UPVOTE_IDEA, [ideaId, ip]);

   return rows;
}

export async function getVoteCount(clientIp: string) {
   const { rows } = await pool.query(VOTE_COUNT, [clientIp]);

   return rows[0].count;
}