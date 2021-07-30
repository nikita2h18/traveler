-- AlterTable
CREATE SEQUENCE "notification_id_seq";
ALTER TABLE "Notification" ALTER COLUMN "id" SET DEFAULT nextval('notification_id_seq');
ALTER SEQUENCE "notification_id_seq" OWNED BY "Notification"."id";
