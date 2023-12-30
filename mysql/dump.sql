CREATE TABLE `reservation`(
    `reser_id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `cid` VARCHAR(255) NOT NULL,
    `uid` INT NOT NULL,
    `review_id` INT NULL,
    `date` INT NOT NULL,
    `start` INT NOT NULL,
    `end` INT NOT NULL,
    'key_state' INT NOT NULL
);
CREATE TABLE `classroom`(
    `cid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `building` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL
);
CREATE TABLE `reivew`(
    `review_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `reser_id` INT NOT NULL,
    `accept` TINYINT(1) NOT NULL,
    `msg` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `reivew` ADD UNIQUE `reivew_reser_id_unique`(`reser_id`);
CREATE TABLE `user`(
    `uid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `acc` VARCHAR(255) NOT NULL,
    `pwd` VARCHAR(255) NOT NULL,
    `pwdtips` VARCHAR(255) NOT NULL,
    `level` INT NOT NULL DEFAULT '1',
    `point` INt NOT NULL DEFAULT '0',
    `banned` INt NOT NULL DEFAULT '0'
);
CREATE TABLE `save`(
    `uid` INT NOT NULL,
    `cid` VARCHAR(255) NOT NULL
)
ALTER TABLE
    `user` ADD UNIQUE `user_acc_unique`(`acc`);
ALTER TABLE
    `reivew` ADD CONSTRAINT `reivew_reser_id_foreign` FOREIGN KEY(`reser_id`) REFERENCES `reservation`(`reser_id`);
ALTER TABLE
    `reservation` ADD CONSTRAINT `reservation_cid_foreign` FOREIGN KEY(`cid`) REFERENCES `classroom`(`cid`);
ALTER TABLE
    `reservation` ADD CONSTRAINT `reservation_uid_foreign` FOREIGN KEY(`uid`) REFERENCES `user`(`uid`);
ALTER TABLE
    `reservation` ADD CONSTRAINT `reservation_review_id_foreign` FOREIGN KEY(`review_id`) REFERENCES `reivew`(`review_id`);
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 

INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '一般教室', 'insB10');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '一般教室', 'insB12');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '一般教室', 'insB07');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '視聽教室', 'ins303');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '研究生教室', 'ins407');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '研討室', 'ins409');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '視聽教室', 'ins101');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '視聽教室', 'ins105');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '個人電腦實驗室', 'ins203');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '3D多媒體教學實驗室', 'ins205');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '電子電路實驗室', 'ins301');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '212討論室', 'ins212');

INSERT INTO `user` (`acc`, `pwd`, `pwdtips`, `level`) VALUES ('root', 'root', 'haha', 0);

flush privileges;