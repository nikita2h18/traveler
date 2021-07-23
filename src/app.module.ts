import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { RegistrationModule } from "./registration/registration.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProfileModule } from "./profile/profile.module";
import { TravelModule } from "./travel/travel.module";
import { LikeModule } from './like/like.module';
import { CommentModule } from "./comment/comment.module";
import { SubscriberModule } from "./subscriber/subscriber.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    RegistrationModule,
    UserModule,
    ProfileModule,
    TravelModule,
    LikeModule,
    CommentModule,
    SubscriberModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService
  ]
})
export class AppModule {
}
