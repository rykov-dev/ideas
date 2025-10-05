CREATE TABLE idea (
   id serial PRIMARY KEY,
   title varchar(255) not null default '',
   description text not null default '',
   created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vote (
   id serial primary key,
   vote_date timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
   ip inet not null,
   idea_id integer not null,
   CONSTRAINT fk_idea FOREIGN KEY (idea_id) REFERENCES idea(id) ON DELETE CASCADE,
   CONSTRAINT unique_vote UNIQUE (ip, idea_id)
);