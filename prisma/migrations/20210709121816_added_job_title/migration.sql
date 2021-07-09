-- CreateTable
create TABLE "User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
create TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
create TABLE "Travel" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "pointFrom" TEXT NOT NULL,
    "pointTo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
create UNIQUE INDEX "User.login_unique" ON "User"("login");

-- CreateIndex
create UNIQUE INDEX "Profile_userId_unique" ON "Profile"("userId");

-- AddForeignKey
alter table "Profile" add FOREIGN KEY ("userId") REFERENCES "User"("id") ON delete CASCADE ON update CASCADE;

-- AddForeignKey
alter table "Travel" add FOREIGN KEY ("userId") REFERENCES "User"("id") ON delete CASCADE ON update CASCADE;
