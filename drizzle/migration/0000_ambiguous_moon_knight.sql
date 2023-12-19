CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`content` varchar(256),
	`author_id` int,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`create_time` timestamp NOT NULL DEFAULT (now()),
	`update_time` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`test` bigint,
	`test_update` bigint,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);

