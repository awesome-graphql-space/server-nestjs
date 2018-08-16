import {MigrationInterface, QueryRunner} from "typeorm";

export class firstmigration1534390326918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`userId` int NOT NULL AUTO_INCREMENT, `email` varchar(191) NOT NULL, `password` varchar(255) NOT NULL, `username` varchar(191) NOT NULL, `displayName` varchar(191) NOT NULL, PRIMARY KEY (`userId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tweet` (`tweetId` int NOT NULL AUTO_INCREMENT, `text` varchar(191) NOT NULL, `upload` varchar(191) NULL, `slug` varchar(191) NULL, `views` int NULL, `userId` int NULL, UNIQUE INDEX `IDX_cd44c43ec59a38de63cd80b6dd` (`slug`), PRIMARY KEY (`tweetId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `tweet` ADD CONSTRAINT `FK_a9703cf826200a2d155c22eda96` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tweet` DROP FOREIGN KEY `FK_a9703cf826200a2d155c22eda96`");
        await queryRunner.query("DROP INDEX `IDX_cd44c43ec59a38de63cd80b6dd` ON `tweet`");
        await queryRunner.query("DROP TABLE `tweet`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
