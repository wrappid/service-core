-- DROP SCHEMA IF EXISTS wrappid;

CREATE SCHEMA IF NOT EXISTS wrappid;

-- DROP TABLE IF EXISTS wrappid."ApiRequestLogs";

CREATE TABLE IF NOT EXISTS wrappid."ApiRequestLogs"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    access_key text COLLATE pg_catalog."default",
    endpoint text COLLATE pg_catalog."default",
    request text COLLATE pg_catalog."default",
    header_stack jsonb,
    response jsonb,
    start_ts timestamp with time zone,
    created_ts timestamp with time zone,
    updated_ts timestamp with time zone,
    end_ts timestamp with time zone,
    req_body jsonb,
    ip text COLLATE pg_catalog."default",
    response_status text COLLATE pg_catalog."default",
    response_header jsonb,
    CONSTRAINT api_request_logs_pkey PRIMARY KEY (id)
)