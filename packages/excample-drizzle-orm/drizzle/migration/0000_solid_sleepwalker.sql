CREATE TABLE IF NOT EXISTS "author" (
	"id" serial NOT NULL,
	"author_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chapter_content" (
	"id" serial NOT NULL,
	"comic_id" integer,
	"chapter_id" integer,
	"images" integer,
	CONSTRAINT "chapter_content_comic_id_unique" UNIQUE("comic_id"),
	CONSTRAINT "chapter_content_chapter_id_unique" UNIQUE("chapter_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comic" (
	"id" serial NOT NULL,
	"name" varchar(256),
	"region" varchar(1000),
	"status" varchar(50),
	"latest_chapter" varchar(256),
	"author_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comic_chapter" (
	"id" serial NOT NULL,
	"comic_id" integer,
	"chapter_title" varchar(256),
	"order" integer,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"update_at" timestamp DEFAULT now(),
	CONSTRAINT "comic_chapter_comic_id_unique" UNIQUE("comic_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comic_statis" (
	"id" serial NOT NULL,
	"click_count" integer,
	"collection_count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comic_tag" (
	"id" serial NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"username" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"update_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_collection" (
	"id" serial NOT NULL,
	"user_id" integer,
	"comic_id" integer,
	"create_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_collection_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "user_collection_comic_id_unique" UNIQUE("comic_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_history" (
	"id" serial NOT NULL,
	"user_id" integer,
	"comic_id" integer,
	"chapter_id" integer,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"update_at" timestamp DEFAULT now(),
	CONSTRAINT "user_history_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "user_history_comic_id_unique" UNIQUE("comic_id"),
	CONSTRAINT "user_history_chapter_id_unique" UNIQUE("chapter_id")
);
