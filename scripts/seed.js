import { loremIpsum} from "lorem-ipsum";
import { Pool } from "pg";
import config from "config";

const dbConfig = config.get("db");

const createRandomIP = (pool = []) => {
   if (Array.isArray(pool) && pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)];
   }
   const octet = () => Math.floor(Math.random() * 254) + 1;
   return `${octet()}.${octet()}.${octet()}.${octet()}`;
};

const pool = new Pool(dbConfig);;

async function createDummyIdeas(count = 10) {
   const dummyIdeas = [];
   for (let i = 0; i < count; i++) {
      const title = loremIpsum({ count: 1, units: "sentence" });
      const description = loremIpsum({ count: 1, units: "paragraph" });

      const { rows } = await pool.query(`INSERT INTO idea (title, description) VALUES ($1, $2) RETURNING *`,
         [title, description]
      );

      dummyIdeas.push(...rows);
   }

   return dummyIdeas;
}

async function attachVotes(ideas) {
   for (const { id } of ideas) {
      const ip = createRandomIP();
      await pool.query(`INSERT INTO vote (idea_id, ip) VALUES ($1, $2) RETURNING *`,
         [id, ip]
      );
   }
}

async function fillDb() {
   const ideas = await createDummyIdeas(10);
   
   await attachVotes(ideas);
}

try {
   fillDb().then(() => process.exit(0));
} catch (error) {
   console.error(error);
}