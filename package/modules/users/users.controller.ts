import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    ) {}
  @Get('postgres')
  findAllPostgres(): Promise<any> {
    return this.usersService.findAllUsers();
  }
  @Get('nestJs')
  findAllNestJs(): Promise<any> {
    return this.usersService.findAllStudents();
  }
}
