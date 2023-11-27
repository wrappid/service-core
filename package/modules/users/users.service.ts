import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class UsersService {
  //Get sequelize connection instance for differnce database
  sequelize1 = DatabaseService.getConnection("wrappid-database1")
  sequelize2 = DatabaseService.getConnection("wrappid-database2")
  constructor(
  ) {}
  async findAllUsers(): Promise<any> {
    return this.sequelize1.models["Users"].findAll();
  }
  async findAllStudents(): Promise<any> {
    return this.sequelize2.models["Students"].findAll();
  }
}
