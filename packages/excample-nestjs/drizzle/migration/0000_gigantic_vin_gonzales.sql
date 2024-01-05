CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial NOT NULL,
	"content" varchar(256),
	"author_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"name" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"create_time" timestamp DEFAULT now() NOT NULL,
	"update_time" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
