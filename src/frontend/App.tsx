import React, { useCallback } from "react";
import { upvoteIdea } from "./api";
import { Idea } from "./types";
import { IdeaList } from "./components/IdeaList";
import { Notification } from "./components/Notification";
import { useNotification, useIdea } from "./hooks";

export function App() {
   const { isLoading, hasError, data, updateItem } = useIdea();
   const { showError, showSuccess } = useNotification();
   
   const handleVote = useCallback((e) => {
      const { ideaId } = e.target.dataset;
      if (!ideaId) return;
      
      upvoteIdea(ideaId)
      .then((result: Idea) => {
         updateItem(result)
         showSuccess("Your vote sent!");
      })
      .catch((error: Error) => showError(error.message));
   }, [updateItem, showError]);

   return (
      <section className="layout">
         <h3 className="layout__header">Idea board</h3>
         {isLoading && "loading"}
         {!isLoading && !hasError && data && <IdeaList data={data} onUpvote={handleVote} />}
         <Notification />
      </section>
   );
}