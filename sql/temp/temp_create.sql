-- Table: wrappid.Authors

-- DROP TABLE IF EXISTS wrappid."Authors";

CREATE TABLE IF NOT EXISTS wrappid."Authors"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text COLLATE pg_catalog."default",
    "isActive" boolean,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS wrappid."Authors"
    OWNER to postgres;

-- Table: wrappid.Posts

-- DROP TABLE IF EXISTS wrappid."Posts";

CREATE TABLE IF NOT EXISTS wrappid."Posts"
(
    id integer NOT NULL,
    title character varying(255) COLLATE pg_catalog."default",
    "authorId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Posts_pkey" PRIMARY KEY (id),
    CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("authorId")
        REFERENCES wrappid."Authors" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS wrappid."Posts"
    OWNER to postgres;