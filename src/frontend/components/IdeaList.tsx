import React from "react";
import { Idea } from "../types";

export function IdeaList({ data, onUpvote }) {
   return (<ul className="idea-list" onClick={onUpvote}>
      {data
      .sort(({ votes: votesA }: Idea, { votes: votesB }: Idea) => votesB - votesA)
      .map(idea => <IdeaItem key={`${idea.id}-${idea.votes}`} {...idea} />)}
   </ul>);
}

function IdeaItem({ id, title, description, votes = 0, isVoted }) {
   return (<article className="idea-card">
      <b className="idea-card__title">{title}</b>
      <p className="idea-card__description">
         {description}
      </p>
      <section className="idea-card__footer card-footer">
         <span className="card-footer__vote-counter">{votes}</span>
         <button
            data-idea-id={id}
            className="card-footer__vote-button"
            disabled={isVoted}
         >
            Vote
         </button>
      </section>
   </article>)
}