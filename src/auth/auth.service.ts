import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }

    try {
      const hashMatches = await compare(pass, user.hashedPassword);
      if (!hashMatches) {
        return null;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (err) {
      console.error("Error verifying password for username: ", username);
      return null;
    }
  }
}
