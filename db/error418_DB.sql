-- Elimina il database se esiste già
--DROP DATABASE IF EXISTS error418_DB;

-- Creazione del database
--CREATE DATABASE error418_DB WITH TEMPLATE = template0 ENCODING = 'UTF8';

--ALTER DATABASE error418_DB OWNER TO db_user;

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

SET default_tablespace = '';

SET default_table_access_method = heap;


-- Connessione al database appena creato
--\c error418_DB;


-- tabella category
CREATE TABLE public.category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

--ALTER TABLE public.category OWNER TO db_user;



-- tabella product
CREATE TABLE public.product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    weight REAL,
    width REAL,
    lenght REAL,
    height REAL 
);

--ALTER TABLE public.product OWNER TO db_user;

-- tabella zone
CREATE TABLE public.zone (
    id SERIAL PRIMARY KEY,
    xCoordinate REAL,
    yCoordinate REAL,
    lenght REAL,
    orientation BOOLEAN
);

--ALTER TABLE public.zone OWNER TO db_user;


-- tabella column
CREATE TABLE public.zone_column (
    id SERIAL PRIMARY KEY,
    zone_id INTEGER REFERENCES public.zone(id) NOT NULL,
    width REAL
);

--ALTER TABLE public.zone_column OWNER TO db_user;


-- tabella level
CREATE TABLE public.level (
    id SERIAL PRIMARY KEY,
    zone_id INTEGER REFERENCES public.zone(id) NOT NULL,
    height REAL 
);

--ALTER TABLE public.level OWNER TO db_user;


-- tabella bin
CREATE TABLE public.bin (
    id SERIAL PRIMARY KEY,
    level_id INTEGER REFERENCES public.level(id) NOT NULL,
    column_id INTEGER REFERENCES public.zone_column(id) NOT NULL,
    product_id INTEGER REFERENCES public.product(id)
);

--ALTER TABLE public.bin OWNER TO db_user;


-- table categorize
CREATE TABLE public.categorize (
category_id INTEGER REFERENCES public.category(id),
product_id INTEGER REFERENCES public.product(id),
PRIMARY KEY (category_id, product_id)
);

--ALTER TABLE public.categorize OWNER TO db_user;
