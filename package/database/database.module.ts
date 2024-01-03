import { Module, OnModuleInit } from "@nestjs/common";
import { DatabaseService } from "./database.service";
// import { Users } from "../entity/user.entity";
// import { Posts } from "../entity/post.entity";

/**
 * @todo missing coding documentation
 *
 * @description
 */
@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseService, ...DatabaseService.getAllDatabaseProviders()],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}
  async onModuleInit() {
    try {
      console.log(`DatabaseModule:: Start`);
      // const connection = await (
      //   await this.databaseService.getConnection("wrappid")
      // ).initialize();

      // console.log(connection);

      // const userRepository = connection.getRepository(Users);
      // const postRepository = connection.getRepository(Posts);

      // Create a user
      // const user = new Users();
      // user.username = "john_doe";

      // Create a post associated with the user
      // const post = new Posts();
      // post.title = "My First Post";
      // post.content = "This is the content of my first post";
      // post.user = user;

      // await userRepository.save(user);
      // await postRepository.save(post);
      // const photoToUpdate = await userRepository.findOneBy({
      //   id: 2,
      // });
      // console.log(photoToUpdate);

      // const userWithPosts = await connection.manager.findOne(Users, {
      //   where: { id: 1 },
      //   relations: ["posts"],
      // });
      // if (userWithPosts) {
      //   console.log("User:", userWithPosts.username);
      //   console.log("Posts:");
      //   userWithPosts.posts.forEach((post: { title: any; content: any }) => {
      //     console.log(`- ${post.title}: ${post.content}`);
      //   });
      // } else {
      //   console.log("User not found");
      // }
      // const newEntities = [User];
      // connection.entityMetadatas.push(
      //   ...newEntities.map((entity) => connection.getMetadata(entity)),
      // );
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }
}
