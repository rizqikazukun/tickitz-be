-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tbl_cinemas_rzq_id_seq;

-- Table Definition
CREATE TABLE "public"."tbl_cinemas_rzq" (
    "id" int4 NOT NULL DEFAULT nextval('tbl_cinemas_rzq_id_seq'::regclass),
    "movie_id" int4,
    "name" varchar(200),
    "city" varchar(255),
    "address" varchar(255),
    "show_times" jsonb,
    "price" int4,
    "logo" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tbl_months_rzq_id_seq;

-- Table Definition
CREATE TABLE "public"."tbl_months_rzq" (
    "id" int4 NOT NULL DEFAULT nextval('tbl_months_rzq_id_seq'::regclass),
    "name" varchar(20),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tbl_movies_rzq_id_seq;

-- Table Definition
CREATE TABLE "public"."tbl_movies_rzq" (
    "id" int4 NOT NULL DEFAULT nextval('tbl_movies_rzq_id_seq'::regclass),
    "name" varchar(200),
    "release_date" date,
    "duration" varchar(100),
    "genres" jsonb,
    "directed_by" varchar(255),
    "casts" jsonb,
    "synopsis" text,
    "poster" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tbl_order_history_rzq_id_seq;

-- Table Definition
CREATE TABLE "public"."tbl_order_history_rzq" (
    "id" int4 NOT NULL DEFAULT nextval('tbl_order_history_rzq_id_seq'::regclass),
    "movie_id" int4,
    "cinema_id" int4,
    "user_uid" uuid,
    "created_at" date,
    "movie_srarted" date,
    "seat" jsonb,
    "barcode_url" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tbl_payments_rzq_id_seq;

-- Table Definition
CREATE TABLE "public"."tbl_payments_rzq" (
    "id" int4 NOT NULL DEFAULT nextval('tbl_payments_rzq_id_seq'::regclass),
    "name" varchar(200),
    "logo" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tbl_seats_rzq_id_seq;

-- Table Definition
CREATE TABLE "public"."tbl_seats_rzq" (
    "id" int4 NOT NULL DEFAULT nextval('tbl_seats_rzq_id_seq'::regclass),
    "seat_a" jsonb,
    "seat_b" jsonb,
    "seat_c" jsonb,
    "seat_d" jsonb,
    "seat_e" jsonb,
    "seat_f" jsonb,
    "seat_g" jsonb,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Extension for uuid type
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tbl_users_rzq_id_seq;

-- Table Definition
CREATE TABLE "public"."tbl_users_rzq" (
    "id" int4 NOT NULL DEFAULT nextval('tbl_users_rzq_id_seq'::regclass),
    "first_name" varchar(100),
    "last_name" varchar(100),
    "phone_number" varchar(20),
    "role" varchar(20),
    "email" varchar(100) unique,
    "uid" uuid DEFAULT uuid_generate_v4() unique,
    "password" varchar(250),
    "photo_profile" text,
    PRIMARY KEY ("id")
);

ALTER TABLE tbl_cinemas_rzq ADD CONSTRAINT "fk_tbl_cinemas_rzq_tbl_movies_rzq" FOREIGN KEY ("movie_id") REFERENCES "public"."tbl_movies_rzq"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE tbl_order_history_rzq ADD CONSTRAINT "fk_movieid_tbl_movies_rzq" FOREIGN KEY ("movie_id") REFERENCES "public"."tbl_movies_rzq"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE tbl_order_history_rzq ADD CONSTRAINT "fk_cinemaid_tbl_cinemas_rzq" FOREIGN KEY ("cinema_id") REFERENCES "public"."tbl_cinemas_rzq"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE tbl_order_history_rzq ADD CONSTRAINT "fk_userid_tbl_users_rzq" FOREIGN KEY ("user_uid") REFERENCES "public"."tbl_users_rzq"("uid") ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO "public"."tbl_movies_rzq" ("name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
('Petualangan Upin dan Ipin', '2013-02-15', '120 min', '["Comedy", "Family"]', 'Shin', '["Upin", "Ipin", "Kak Ros", "Opah"]', 'Pada dahulu kala', 'https://m.media-amazon.com/images/M/MV5BMDgzZjNkMTUtNTdlOC00OGZiLWE2OGUtMzcyOWNiZmRmMzQxXkEyXkFqcGdeQXVyNDE2NjE1Njc@._V1_SX300.jpg');
INSERT INTO "public"."tbl_movies_rzq" ("name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
('Sherina''s Adventure 2', '2023-09-28', '126 min', '["Adventure", "Comedy", "Drama"]', 'Riri Riza', '["Sherina Munaf", "Derby Romero", "Isyana Sarasvati"]', 'Sadam, a true adventurer, reunites with his brave childhood friend, Sherina, when she embarks on a journalistic adventure.', 'https://m.media-amazon.com/images/M/MV5BMTI3MzliMmItZjQ3NC00MTJhLTk1YmYtMzU2NmYxMDAyNDQxXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_SX300.jpg');
INSERT INTO "public"."tbl_movies_rzq" ("name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
('Sherina''s Adventure', '2000-06-14', '112 min', '["Adventure", "Comedy", "Drama"]', 'Riri Riza', '["Sherina Munaf", "Derby Romero", "Didi Petet"]', 'Adventure of a little girl who just moved to a new town and meet a new friends.', 'https://m.media-amazon.com/images/M/MV5BMGNjNDNlNDktMWVjMS00MWUzLTkyNzktMmE1OGJmMjA5N2VmXkEyXkFqcGdeQXVyMzQ2MTY3MDQ@._V1_SX300.jpg');
INSERT INTO "public"."tbl_movies_rzq" ("name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
('Wotakoi: Love Is Hard for Otaku', '2020-02-07', '114 min', '["Comedy", "Musical", "Romance"]', 'Yûichi Fukuda', '["Mitsuki Takahata", "Kento Yamazaki", "Nanao"]', 'Two office workers, who are also fans of otaku culture, meet and develop a relationship.', 'https://m.media-amazon.com/images/M/MV5BODkyNTU5MWItMWQ1Zi00ZWQwLWJjMzAtMDE2YzZiMWQ3YmE0XkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_SX300.jpg'),
('Oppenheimer', '2023-07-21', '180 min', '["Biography", "Drama", "History"]', 'Christopher Nolan', '["Cillian Murphy", "Emily Blunt", "Matt Damon"]', 'The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.', 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg'),
('Barbie', '2023-07-21', '114 min', '["Adventure", "Comedy", "Fantasy"]', 'Greta Gerwig', '["Margot Robbie", "Ryan Gosling", "Issa Rae"]', 'Barbie suffers a crisis that leads her to question her world and her existence.', 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'),
('I Give My First Love to You', '2009-10-24', '122 min', '["Drama", "Romance"]', 'Takehiko Shinjô', '["Mao Inoue", "Masaki Okada", "Natsuki Harada"]', 'Takuma knows that his life is shorter than the others and he feels that his demise is getting near. He chose to stay away from the girl that he loves so that she can easily move on. What he didn''t know is that he is under-estimati...', 'https://m.media-amazon.com/images/M/MV5BMWQ1OWFjMWUtMWFiNy00MGJkLWFiZGEtMzliNDNiZjJmMWRlXkEyXkFqcGdeQXVyNTgxMjE1NTY@._V1_SX300.jpg'),
('L.DK', '2014-04-12', '113 min', '["Comedy", "Drama", "Romance"]', 'Taisuke Kawamura', '["Kento Yamazaki", "Akiyoshi Nakao", "Ren Kiriyama"]', 'Aoi lives in an apartment by herself. Shusei moves in next to Aoi''s apartment. Shusei is a very popular student. Due to a mistake, Aoi makes the sprinkler go off in his room. Until his room is fixed, he stays with Aoi.', 'https://m.media-amazon.com/images/M/MV5BNTYwOGEyMGItMjcyYS00ZDgzLWJmYjEtNWEwODMyNzc1NDExXkEyXkFqcGdeQXVyNTI4MDA2NDE@._V1_SX300.jpg'),
('Our Meal for Tomorrow', '2017-01-07', '109 min', '["Drama", "Romance"]', 'Masahide Ichii', '["Yûko Araki", "Hairi Katagiri", "Chieko Matsubara"]', 'Ryota and Koharu are high school students. Ryota is indifferent to people and says very little. Koharu is not afraid of to speak her mind and she has a bright personality. Since a game of rice bag jump, they begin to date. They da...', 'https://m.media-amazon.com/images/M/MV5BYjk3ZWMyNGItYjE2ZS00MjIyLTg3Y2YtMWUwMzAwMzk1MTdhXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SX300.jpg'),
('Sekigahara', '2017-08-26', '150 min', '["Drama", "History", "War"]', 'Masato Harada', '["Jun''ichi Okada", "Kôji Yakusho", "Kasumi Arimura"]', 'A depiction of Japan''s 17th Century Battle of Sekigahara where the Army of the East takes up arms against the Army of the West.', 'https://m.media-amazon.com/images/M/MV5BZGFjNTdjOGUtZmRjMC00Mjg1LWI3MDAtZTUwODhmNzlmOGY1XkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg'),
('Tom & Jerry', '2021-02-26', '101 min', '["Animation", "Adventure", "Comedy"]', 'Tim Story', '["Chloë Grace Moretz", "Michael Peña", "Colin Jost"]', 'A chaotic battle ensues between Jerry Mouse, who has taken refuge in the Royal Gate Hotel, and Tom Cat, who is hired to drive him away before the day of a big wedding arrives.', 'https://m.media-amazon.com/images/M/MV5BYzE3ODhiNzAtOWY4MS00NTdiLThmNDctNDM4NjRiNGFmYjI1XkEyXkFqcGdeQXVyMTI2ODM1ODUw._V1_SX300.jpg');

INSERT INTO "public"."tbl_cinemas_rzq" ("movie_id", "name", "city", "address", "show_times", "price", "logo") VALUES
(1, 'CGV Pacific Place', 'South Jakarta', 'Pacific Place Lt. 6. Jln. Jend. Sudirman Kav 52-53, SCBD Jakarta', '["11:30", "14:00", "16:30", "19:00", "19:50", "21:30"]', 75000, 'https://upload.wikimedia.org/wikipedia/commons/6/6c/CGV_Cinemas.svg');

INSERT INTO "public"."tbl_users_rzq" ("first_name", "last_name", "phone_number", "role", "email", "uid", "password", "photo_profile") VALUES
('Obito', 'Uciha', '+819883210', 'admin', 'ucihaobito@example.com', '6cc41b5b-5a26-4ff6-bf3d-42112e798649', '$2b$15$LYkYBPZ5NlnGKV3XRm8mHOJlbSm5yJwZs5/HjvPNiIVOI/FfxJM4G', 'https://upload.wikimedia.org/wikipedia/en/b/bb/ObitoUchiha.png');
INSERT INTO "public"."tbl_users_rzq" ("first_name", "last_name", "phone_number", "role", "email", "uid", "password", "photo_profile") VALUES
('Sasuke', 'Uciha', NULL, 'user', 'ucihasasuke@example.com', '43f1e749-573d-4d7c-b48c-662896edfcca', '$2b$15$LYkYBPZ5NlnGKV3XRm8mHOJlbSm5yJwZs5/HjvPNiIVOI/FfxJM4G', NULL);






