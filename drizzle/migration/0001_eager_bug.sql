CREATE TRIGGER before_user_update
BEFORE UPDATE ON users
FOR EACH ROW
SET NEW.test_update = UNIX_TIMESTAMP();
--> statement-breakpoint
INSERT INTO `users` (`id`, `name`, `password`, `email`, `create_time`, `update_time`, `test`, `test_update`)
VALUES (
  DEFAULT,
  'wong',
  '123',
  '123@qq.com',
  DEFAULT,
  DEFAULT,
  UNIX_TIMESTAMP(),
  UNIX_TIMESTAMP()
);