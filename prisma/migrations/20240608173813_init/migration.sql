-- CreateTable
CREATE TABLE `authore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_course` INTEGER NOT NULL,
    `id_user` INTEGER NULL,

    INDEX `fk_course`(`id_course`),
    INDEX `fk_user_teacher`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_authore` INTEGER NOT NULL,

    INDEX `create_chat_teacherId`(`id_authore`),
    INDEX `create_chat_userId`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_name` VARCHAR(255) NOT NULL,
    `course_description` LONGTEXT NOT NULL,
    `course_picture` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NULL,
    `id_course` INTEGER NOT NULL,

    INDEX `fk_favorite_on_course`(`id_course`),
    INDEX `fk_user_favorite_course`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feedback_text` MEDIUMTEXT NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_course` INTEGER NOT NULL,

    INDEX `fk_feedback_course`(`id_course`),
    INDEX `fk_feedback_user`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gender` (
    `id` BOOLEAN NOT NULL,
    `gender_name` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lesson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_course` INTEGER NOT NULL,
    `lesson_name` VARCHAR(255) NOT NULL,
    `lesson_description` LONGTEXT NOT NULL,
    `lesson_materials` LONGTEXT NOT NULL,

    INDEX `fk_lesson_course`(`id_course`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text_message` TINYTEXT NOT NULL,
    `date_dispatch` DATETIME(0) NOT NULL,
    `id_user` INTEGER NULL,
    `id_chat` INTEGER NOT NULL,

    INDEX `fk_chatId`(`id_chat`),
    INDEX `fk_message_id_user`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `online` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `online` VARCHAR(8) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_course` INTEGER NOT NULL,

    INDEX `fk_subscribe_on_course`(`id_course`),
    INDEX `fk_user_subscribe_course`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NULL,
    `id_user_data` INTEGER NOT NULL,
    `id_role` INTEGER NOT NULL DEFAULT 3,
    `id_online` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `email`(`email`),
    INDEX `fk_user_data`(`id_user_data`),
    INDEX `fk_user_id_role`(`id_role`),
    INDEX `fk_user_is_online`(`id_online`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(25) NULL,
    `surname` VARCHAR(50) NULL,
    `id_gender` BOOLEAN NOT NULL DEFAULT false,
    `data_birthday` DATE NULL,
    `telephone` VARCHAR(11) NULL,
    `picture` VARCHAR(255) NULL,

    INDEX `fk_user_gender`(`id_gender`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `course_id` INTEGER NULL,
    `lesson_id` INTEGER NULL,
    `completed_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `passed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `course_id`(`course_id`),
    INDEX `lesson_id`(`lesson_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `authore` ADD CONSTRAINT `fk_authore_course` FOREIGN KEY (`id_course`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `authore` ADD CONSTRAINT `fk_user_teacher` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `create_chat_userId` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `fk_chat_authore_id` FOREIGN KEY (`id_authore`) REFERENCES `authore`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `fk_favorite_on_course` FOREIGN KEY (`id_course`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `fk_user_favorite_course` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `fk_feedback_course` FOREIGN KEY (`id_course`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `fk_feedback_user` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lesson` ADD CONSTRAINT `fk_lesson_course` FOREIGN KEY (`id_course`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `fk_message_chat_id` FOREIGN KEY (`id_chat`) REFERENCES `chat`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `fk_message_id_user` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `subscribe` ADD CONSTRAINT `fk_subscribe_on_course` FOREIGN KEY (`id_course`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscribe` ADD CONSTRAINT `fk_user_subscribe_course` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_data` FOREIGN KEY (`id_user_data`) REFERENCES `user_data`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_id_role` FOREIGN KEY (`id_role`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_is_online` FOREIGN KEY (`id_online`) REFERENCES `online`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_data` ADD CONSTRAINT `fk_user_gender` FOREIGN KEY (`id_gender`) REFERENCES `gender`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_progress` ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_progress` ADD CONSTRAINT `user_progress_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_progress` ADD CONSTRAINT `user_progress_ibfk_3` FOREIGN KEY (`lesson_id`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
