CREATE TABLE `reservation`(
    `reser_id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `cid` VARCHAR(255) NOT NULL,
    `uid` VARCHAR(255) NOT NULL,
    `review_id` INT NULL,
    `start` VARCHAR(255) NOT NULL,
    `end` VARCHAR(255) NOT NULL,
    `key_state` INT NOT NULL
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
    `banned` INt NOT NULL DEFAULT '0',
    UNIQUE (`acc`)
);
CREATE TABLE `save`(
    `uid` VARCHAR(255) NOT NULL,
    `cid` VARCHAR(255) NOT NULL
);
CREATE TABLE `enableTime`(
    `cid` VARCHAR(255) NOT NULL,
    `PeriodText` TEXT NOT NULL,
    UNIQUE (`cid`)
);
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 

INSERT INTO `classroom` (`building`, `name`, `code`) VALUES ('資工系館', '一般教室', 'insB10'),
('資工系館', '一般教室', 'insB12'),
('資工系館', '一般教室', 'insB07'),
('資工系館', '視聽教室', 'ins303'),
('資工系館', '研究生教室', 'ins407'),
('資工系館', '研討室', 'ins409'),
('資工系館', '視聽教室', 'ins101'),
('資工系館', '視聽教室', 'ins105'),
('資工系館', '個人電腦實驗室', 'ins203'),
('資工系館', '3D多媒體教學實驗室', 'ins205'),
('資工系館', '電子電路實驗室', 'ins301'),
('資工系館', '212討論室', 'ins212');

INSERT INTO `enableTime` (`cid`, `PeriodText`) VALUES
('insB10', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('insB12', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('insB07', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('ins303', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('ins407', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('ins409', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('ins101', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('ins105', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('ins203', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('ins205', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('ins301', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]'),
('ins212', '[{"day":1,"startPeriod":1,"endPeriod":8},{"day":2,"startPeriod":1,"endPeriod":8},{"day":3,"startPeriod":1,"endPeriod":8},{"day":4,"startPeriod":1,"endPeriod":8},{"day":5,"startPeriod":1,"endPeriod":8}]');

INSERT INTO `user` (`acc`, `pwd`, `pwdtips`, `level`) VALUES ('root', 'root', 'haha', 0);

flush privileges;
