-- This is base on postgreSQL Query

DROP TABLE IF EXISTS movies;

CREATE TABLE "movies" (
    "id" SERIAL UNIQUE PRIMARY KEY,
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

CREATE TABLE "cinemas" (
    "id" SERIAL UNIQUE PRIMARY KEY,
    "movie_id" int4,
    "name" varchar(200),
    "city" varchar(255),
    "address" varchar(255),
    "show_times" jsonb,
    "price" int4,
    "logo" text
);

DROP TABLE IF EXISTS "order_history";

CREATE TABLE "order_history" (
    "id" SERIAL UNIQUE PRIMARY KEY,
    "movie_id" int4,
    "cinema_id" int4,
    "user_id" int4,
    "created_at" date,
    "movie_srarted" date,
    "seat" jsonb,
    "barcode_url" text
);

DROP TABLE IF EXISTS "months";

CREATE TABLE "months" (
    "id" SERIAL UNIQUE PRIMARY KEY,
    "name" varchar(20)
);

DROP TABLE IF EXISTS "payments";

CREATE TABLE "payments" (
	"id" SERIAL UNIQUE PRIMARY KEY,
    "name" varchar(200),
    "logo" text
);

DROP TABLE IF EXISTS seats;

CREATE TABLE "seats" (
    "id" SERIAL UNIQUE PRIMARY KEY,
    "seat_a" json,
    "seat_b" json,
    "seat_c" json,
    "seat_d" json,
    "seat_e" json,
    "seat_f" json,
    "seat_g" json,
);

DROP TABLE IF EXISTS "users";

CREATE TABLE "public"."users" (
    "id" SERIAL UNIQUE PRIMARY KEY,
    "first_name" varchar(100),
    "last_name" varchar(100),
    "phone_number" varchar(20),
    "email" varchar(100),
    "password" varchar(250),
    "photo_profile" text
);

ALTER TABLE cinemas ADD CONSTRAINT fk_cinemas_movies FOREIGN KEY (movie_id) REFERENCES movies (id);
ALTER TABLE order_history ADD CONSTRAINT fk_movieId_movies FOREIGN KEY (movie_id) REFERENCES movies (id);
ALTER TABLE order_history ADD CONSTRAINT fk_cinemaId_cinemas FOREIGN KEY ("cinema_id") REFERENCES "cinemas" ("id");
ALTER TABLE order_history ADD CONSTRAINT fk_userId_users FOREIGN KEY (user_id) REFERENCES users (id);

