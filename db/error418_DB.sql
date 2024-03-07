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
    length REAL,
    height REAL
);

--ALTER TABLE public.product OWNER TO db_user;

-- tabella zone
CREATE TABLE public.zone (
    id SERIAL PRIMARY KEY,
    xCoordinate REAL,
    yCoordinate REAL,
    length REAL,
    orientation BOOLEAN
);

--ALTER TABLE public.zone OWNER TO db_user;


-- tabella column
CREATE TABLE public.zone_column (
    id SERIAL PRIMARY KEY,
    zone_id INTEGER REFERENCES public.zone(id) NOT NULL,
    width REAL,
	column_order INTEGER
);

--ALTER TABLE public.zone_column OWNER TO db_user;


-- tabella level
CREATE TABLE public.level (
    id SERIAL PRIMARY KEY,
    zone_id INTEGER REFERENCES public.zone(id) NOT NULL,
    height REAL,
	level_order INTEGER
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
DELETE FROM public.categorize;
DELETE FROM public.category;
DELETE FROM public.product;
DELETE FROM public.zone;
DELETE FROM public.zone_column;
DELETE FROM public.level;
DELETE FROM public.bin;
ALTER SEQUENCE public.category_id_seq RESTART WITH 1;
ALTER SEQUENCE public.product_id_seq RESTART WITH 1;
ALTER SEQUENCE public.zone_id_seq RESTART WITH 1;
ALTER SEQUENCE public.zone_column_id_seq RESTART WITH 1;
ALTER SEQUENCE public.level_id_seq RESTART WITH 1;
ALTER SEQUENCE public.bin_id_seq RESTART WITH 1;
INSERT INTO public.category (name) VALUES ('Electronics');
INSERT INTO public.category (name) VALUES ('Books');
INSERT INTO public.category (name) VALUES ('Clothing');
INSERT INTO public.category (name) VALUES ('Smartphones');
INSERT INTO public.product (name, length, width, height, weight) VALUES ('iPhone', 0.174, 7.3, 14.7, 0.7);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('Harry Potter', 0.2, 13, 20, 2);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('T-Shirt', 0.2, 30, 20, 0.5);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('Samsung', 0.174, 7.3, 14.7, 0.7);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('Lord of the Rings', 0.2, 13, 20, 2);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('Pants', 0.2, 30, 20, 0.5);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('Huawei', 0.174, 7.3, 14.7, 0.7);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('The Hobbit', 0.2, 13, 20, 2);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('Shoes', 0.2, 30, 20, 0.5);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('Xiaomi', 0.174, 7.3, 14.7, 0.7);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('The Silmarillion', 0.2, 13, 20, 2);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('Socks', 0.2, 30, 20, 0.5);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('OnePlus', 0.174, 7.3, 14.7, 0.7);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('The Children of Húrin', 0.2, 13, 20, 2);
INSERT INTO public.product (name, length, width, height, weight) VALUES ('Jacket', 0.2, 30, 20, 0.5);
INSERT INTO public.categorize (product_id, category_id) VALUES (1, 1);
INSERT INTO public.categorize (product_id, category_id) VALUES (1, 4);
INSERT INTO public.categorize (product_id, category_id) VALUES (2, 2);
INSERT INTO public.categorize (product_id, category_id) VALUES (3, 3);
INSERT INTO public.categorize (product_id, category_id) VALUES (4, 1);
INSERT INTO public.categorize (product_id, category_id) VALUES (4, 4);
INSERT INTO public.categorize (product_id, category_id) VALUES (5, 2);
INSERT INTO public.categorize (product_id, category_id) VALUES (6, 3);
INSERT INTO public.categorize (product_id, category_id) VALUES (7, 1);
INSERT INTO public.categorize (product_id, category_id) VALUES (7, 4);
INSERT INTO public.categorize (product_id, category_id) VALUES (8, 2);
INSERT INTO public.categorize (product_id, category_id) VALUES (9, 3);
INSERT INTO public.categorize (product_id, category_id) VALUES (10, 1);
INSERT INTO public.categorize (product_id, category_id) VALUES (10, 4);
INSERT INTO public.categorize (product_id, category_id) VALUES (11, 2);
INSERT INTO public.categorize (product_id, category_id) VALUES (12, 3);
INSERT INTO public.categorize (product_id, category_id) VALUES (13, 4);
INSERT INTO public.categorize (product_id, category_id) VALUES (14, 2);
INSERT INTO public.categorize (product_id, category_id) VALUES (15, 3);
INSERT INTO public.zone (xcoordinate, ycoordinate, length, orientation) VALUES (0,0,2,False);
INSERT INTO public.zone (xcoordinate, ycoordinate, length, orientation) VALUES (10,10,2,False);
INSERT INTO public.zone (xcoordinate, ycoordinate, length, orientation) VALUES (20,20,2,False);
INSERT INTO public.zone (xcoordinate, ycoordinate, length, orientation) VALUES (30,30,2,False);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (1,1,1);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (1,2,2);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (1,1,3);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (2,2,1);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (2,1,2);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (3,1,1);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (3,2,2);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (3,2,3);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (3,1,4);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (4,1,1);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (4,2,2);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (4,1,3);
INSERT INTO public.zone_column (zone_id, width, column_order) VALUES (4,2,4);
INSERT INTO public.level (zone_id, height, level_order) VALUES (1,2,1);
INSERT INTO public.level (zone_id, height, level_order) VALUES (1,1,2);
INSERT INTO public.level (zone_id, height, level_order) VALUES (1,3,3);
INSERT INTO public.level (zone_id, height, level_order) VALUES (2,1,1);
INSERT INTO public.level (zone_id, height, level_order) VALUES (2,1,2);
INSERT INTO public.level (zone_id, height, level_order) VALUES (2,1,3);
INSERT INTO public.level (zone_id, height, level_order) VALUES (2,2,4);
INSERT INTO public.level (zone_id, height, level_order) VALUES (3,3,1);
INSERT INTO public.level (zone_id, height, level_order) VALUES (3,1,2);
INSERT INTO public.level (zone_id, height, level_order) VALUES (4,2,1);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (1,1,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (1,2,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (1,3,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (2,1,1);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (2,2,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (2,3,2);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (3,1,3);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (3,2,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (3,3,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (4,4,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (4,5,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (5,4,4);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (5,5,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (6,4,5);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (6,5,6);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (7,4,7);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (7,5,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (8,6,8);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (8,7,9);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (8,8,10);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (8,9,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (9,6,11);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (9,7,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (9,8,12);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (9,9,13);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (10,10,14);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (10,11,15);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (10,12,NULL);
INSERT INTO public.bin (level_id, column_id, product_id) VALUES (10,13,NULL);
