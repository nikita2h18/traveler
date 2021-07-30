-- CreateTable
CREATE TABLE "Notification" (
    "id" INTEGER NOT NULL,
    "isNotified" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
