import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { RegistrationModule } from "./registration/registration.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    RegistrationModule,
    UserModule,
    ProfileModule
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
