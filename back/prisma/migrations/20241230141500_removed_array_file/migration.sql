-- AlterTable
ALTER TABLE "user" ALTER COLUMN "file" SET NOT NULL,
ALTER COLUMN "file" DROP DEFAULT,
ALTER COLUMN "file" SET DATA TYPE TEXT;