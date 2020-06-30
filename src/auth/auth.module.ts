import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { BasicAuthStrategy } from "./basic-auth.strategy";

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, BasicAuthStrategy]
})
export class AuthModule {}
