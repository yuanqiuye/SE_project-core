CREATE TABLE `reservation`(
    `reser_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `cid` INT NOT NULL,
    `uid` INT NOT NULL,
    `review_id` INT NULL,
    `date` DATE NOT NULL,
    `start` INT NOT NULL,
    `end` INT NOT NULL
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
    `name` VARCHAR(255) NOT NULL,
    `acc` VARCHAR(255) NOT NULL,
    `pwd` VARCHAR(255) NOT NULL,
    `pwdtips` VARCHAR(255) NOT NULL,
    `level` INT NOT NULL DEFAULT '1'
);
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

INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '一般教室', 'INSB10');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '一般教室', 'INSB12');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '一般教室', 'INSB07');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '視聽教室', 'INS303');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '研究生教室', 'INS407');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '研討室', 'INS409');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '視聽教室', 'INS101');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '視聽教室', 'INS105');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '個人電腦實驗室', 'INS203');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '3D多媒體教學實驗室', 'INS205');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '電子電路實驗室', 'INS301');
INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '212討論室', 'INS212');

INSERT INTO `user` (`name`, `acc`, `pwd`, `pwdtips`, `level`) VALUES ('test account', 'root', 'root', 'haha', 0);

flush privileges;