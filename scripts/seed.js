import { loremIpsum} from "lorem-ipsum";
import { Pool } from "pg";

const getRandomNumber = () => Math.floor(Math.random() * 10);
const createRandomIP = () => {};

const pool = new Pool({
   user: "dev",
   password: "devpassword",
   database: "ideas",
   host: "localhost"
});

async function createDummyIdeas(count = 10) {
   const dummyIdeas = [];
   for (let i = 0; i < 10; i++) {
      const title = loremIpsum({ count: 1, units: "sentence" });
      const description = loremIpsum({ count: 1, units: "paragraph" });

      const { rows } = await pool.query(`INSERT INTO idea (title, description) VALUES ($1, $2) RETURNING *`,
         [title, description]
      );

      dummyIdeas.push(...rows);
   }
}

async function attachVotes(ideas) {
   for (const { id } of ideas) {
      const ip = createRandomIP(ipPool);
      await pool.query(`INSERT INTO vote (id, ip) VALUES ($1, $2) RETURNING *`,
         [id, ip]
      );
   }
}

async function fillDb() {
   const ideas = await createDummyIdeas(3);
   attachVotes(ideas);
}

try {
   fillDb().then(() => process.exit(0));
} catch (error) {
   console.error(error);
}