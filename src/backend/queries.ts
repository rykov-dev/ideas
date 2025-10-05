export const GET_IDEAS = `
SELECT
   i.id, title, description, count(v.id) AS votes, COALESCE(array_agg(v.ip), '{}') as ips
FROM idea i
LEFT JOIN vote v ON
   v.idea_id = i.id
GROUP BY i.id
ORDER BY votes DESC
`;
export const GET_IDEA = `
SELECT
   i.id, title, description, count(v.id) AS votes, COALESCE(array_agg(v.ip), '{}') as ips
FROM idea i
LEFT JOIN vote v ON
   v.idea_id = i.id
WHERE i.id = $1
GROUP BY i.id
`;

export const UPVOTE_IDEA = `
INSERT
INTO vote (idea_id, ip)
VALUES ($1, $2)
`;

export const VOTE_COUNT = `
SELECT count(idea_id)
FROM vote
WHERE ip = $1
`