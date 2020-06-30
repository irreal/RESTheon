import { Injectable } from "@nestjs/common";

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: "test",
        hashedPassword:
          "$2b$10$0hD45mZUeYas77PlT2tX9eSxQHTLv4Z9wQ4TQHj3Mc0M82rz46HA6" // test123
      },
      {
        userId: 2,
        username: "milos",
        hashedPassword:
          "$2b$10$aZ9JL18mq2mwwEP4PeFmse.yP2RWzSl.sKISDNoRkQocjFTdaXMLi" // test123
      },
      {
        userId: 3,
        username: "ljuba",
        hashedPassword:
          "$2b$10$2Y85FD89eq2f4NuXgyxKBeOVdhRW38PJQZUn6FuR.BhTIi2f3ydZa" // test123
      }
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
