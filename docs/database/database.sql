-- This is base on postgreSQL Query
-- DDL

-- DROP DATABASE IF EXISTS tickitz;
-- CREATE DATABASE tickitz;
-- SET search_path TO tickitz;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS movies;

CREATE TABLE tickitz."public"."movies" (
    "id" SERIAL4 UNIQUE PRIMARY KEY,
    "name" varchar(200),
    "release_date" date,
    "duration" varchar(100),
    "genres" jsonb,
    "directed_by" varchar(255),
    "casts" jsonb,
    "synopsis" text,
    "poster" text
);


DROP TABLE IF EXISTS "cinemas";

CREATE TABLE "public"."cinemas" (
    "id" SERIAL4 UNIQUE PRIMARY KEY,
    "movie_id" int4,
    "name" varchar(200),
    "city" varchar(255),
    "address" varchar(255),
    "show_times" jsonb,
    "price" int4,
    "logo" text
);

DROP TABLE IF EXISTS "order_history";

CREATE TABLE "public"."order_history" (
    "id" SERIAL4 UNIQUE PRIMARY KEY,
    "movie_id" int4,
    "cinema_id" int4,
    "user_uid" UUID,
    "created_at" date,
    "movie_srarted" date,
    "seat" jsonb,
    "barcode_url" text
);

DROP TABLE IF EXISTS "months";

CREATE TABLE "public"."months" (
    "id" SERIAL4 UNIQUE PRIMARY KEY,
    "name" varchar(20)
);

DROP TABLE IF EXISTS "payments";

CREATE TABLE "public"."payments" (
	"id" SERIAL4 UNIQUE PRIMARY KEY,
    "name" varchar(200),
    "logo" text
);

DROP TABLE IF EXISTS seats;

CREATE TABLE "public"."seats" (
    "id" SERIAL4 UNIQUE PRIMARY KEY,
    "seat_a" jsonb,
    "seat_b" jsonb,
    "seat_c" jsonb,
    "seat_d" jsonb,
    "seat_e" jsonb,
    "seat_f" jsonb,
    "seat_g" jsonb
);

DROP TABLE IF EXISTS "users";

CREATE TABLE "public"."users" (
    "id" SERIAL4 UNIQUE PRIMARY KEY,
    "first_name" varchar(100),
    "last_name" varchar(100),
    "phone_number" varchar(20),
    "role" varchar(20),
    "email" varchar(100) UNIQUE,
    "uid" UUID DEFAULT uuid_generate_v4() UNIQUE,
    "password" varchar(250),
    "photo_profile" text
);


-- Adding FK
-- DDL
ALTER TABLE cinemas ADD CONSTRAINT fk_cinemas_movies FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE order_history ADD CONSTRAINT fk_movieId_movies FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE order_history ADD CONSTRAINT fk_cinemaId_cinemas FOREIGN KEY ("cinema_id") REFERENCES "cinemas" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE order_history ADD CONSTRAINT fk_userId_users FOREIGN KEY (user_uid) REFERENCES users (uid) ON DELETE CASCADE ON UPDATE CASCADE;


-- Seeder

insert into movies (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
values ('Petualangan Upin dan Ipin', '2013-02-15', '120 min', '["Comedy", "Family"]', 'Shin', '["Upin","Ipin", "Kak Ros", "Opah"]', 'Pada dahulu kala', 
'https://m.media-amazon.com/images/M/MV5BMDgzZjNkMTUtNTdlOC00OGZiLWE2OGUtMzcyOWNiZmRmMzQxXkEyXkFqcGdeQXVyNDE2NjE1Njc@._V1_SX300.jpg');

insert into cinemas  (movie_id, name, city, address, show_times, price, logo)
values (1, 'CGV Pacific Place', 'South Jakarta', 'Pacific Place Lt. 6. Jln. Jend. Sudirman Kav 52-53, SCBD Jakarta',
'["11:30","14:00","16:30","19:00","19:50","21:30"]', 75000, 'https://upload.wikimedia.org/wikipedia/commons/6/6c/CGV_Cinemas.svg')
returning id;

INSERT INTO users ("first_name", "last_name", "phone_number", "role", "email", "password", "photo_profile"  ) 
values ('Obito','Uciha','+819883210', 'admin', 'ucihaobito@example.com', 'null', 'https://upload.wikimedia.org/wikipedia/en/b/bb/ObitoUchiha.png');


-- DML
select * from movies m ;
select * from cinemas c ;
select * from users u ;	
select * from order_history oh ;




   















-- EOL