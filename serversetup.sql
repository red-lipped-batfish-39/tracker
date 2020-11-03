
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


create table users (
user_id serial primary key,
username varchar(50) unique,
email varchar(250) unique,
password varchar(250))
with(
    oids = false
)
;


create table period_date(
  period_id serial primary key,
  start_date date,
  end_date date,
  user_id int not null,
  constraint user_id foreign key(user_id) references users(user_id)
  
)
with(
    oids = false
)
;