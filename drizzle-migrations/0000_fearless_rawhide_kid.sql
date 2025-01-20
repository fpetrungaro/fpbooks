CREATE TABLE `books` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(50) NOT NULL,
	`author` varchar(50) NOT NULL,
	`published_date` timestamp,
	`genre` varchar(20) NOT NULL,
	CONSTRAINT `books_id` PRIMARY KEY(`id`),
	CONSTRAINT `books_title_unique` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
