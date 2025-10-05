import { Router, Request, Response } from 'express';
import { getIdeas, getIdea, upvoteIdea, getVoteCount } from './methods';

export const ideaRouter = Router();
const VOTE_LIMIT = 10;

ideaRouter
   .get("/", async (req: Request, res: Response) => {
      const clientIp = req.clientIp;
      const ideas = await getIdeas();
      const voteCount = await getVoteCount(clientIp);
      const canVote = voteCount < VOTE_LIMIT;

      res.json(ideas.map((idea) => ({
         ...idea,
         isVoted: !canVote || idea.ips.includes(clientIp)
      })));
   })
   .get("/:id", async (req: Request, res: Response) => {
      const { id: ideaId } = req.params;

      if (!ideaId || isNaN(Number(ideaId)))
         return res.status(400).json({ error: 'Invalid idea ID' });

      const idea = await getIdea(ideaId);
      res.json({ idea });
   })
   .get("/:id/vote", async (req: Request, res: Response) => {
      const { id: ideaId } = req.params;

      if (!ideaId || isNaN(Number(ideaId)))
         return res.status(400).json({ error: 'Invalid idea ID' });

      const clientIp = req.clientIp;
      const targetIdea = await getIdea(ideaId);

      if (targetIdea.ips.some((ip: string) => ip === clientIp))
         return res.status(309).json({ error: "You already voted for this idea." });
      
      const voteCount = await getVoteCount(clientIp);
      const canVote = voteCount < VOTE_LIMIT;
      console.log(voteCount, VOTE_LIMIT);

      if (!canVote)
         return res.status(309).json({ error: "You reached vote limit." });

      await upvoteIdea(ideaId as string, clientIp as string);
      const votedIdea = await getIdea(ideaId as string);

      res.json({ ...votedIdea, isVoted: true });
   });
