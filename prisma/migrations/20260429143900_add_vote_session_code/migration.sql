ALTER TABLE `VotingToken` ADD COLUMN `sessionCode` VARCHAR(191) NOT NULL DEFAULT 'DEFAULT';
ALTER TABLE `Vote` ADD COLUMN `sessionCode` VARCHAR(191) NOT NULL DEFAULT 'DEFAULT';

CREATE INDEX `VotingToken_sessionCode_idx` ON `VotingToken`(`sessionCode`);
CREATE INDEX `Vote_sessionCode_idx` ON `Vote`(`sessionCode`);
