import "reflect-metadata";
import { DataSource } from "typeorm";

import { IS_PROD } from "./lib/constants";
import { User } from "./entity/User";
import { Profile } from "./entity/Profile";
import { Question } from "./entity/Question";
import { Comment } from "./entity/Comment";
import { Post } from "./entity/Post";
import { QuestionCommentNotificatoin } from "./entity/QuestionCommentNotification";

export const AppDataSource = new DataSource({
  type: "postgres",
  url:
    process.env.DATABASE_URL ||
    "potsgres://postgres:postgres@localhost:5432/revue",
  entities: [
    User,
    Profile,
    Question,
    Comment,
    Post,
    QuestionCommentNotificatoin,
  ],
  logging: !IS_PROD,
  migrations: ["build/migration/*.js"],
});
