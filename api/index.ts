import { Handler } from "@netlify/functions";
import * as awsServerlessExpress from "aws-serverless-express";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";

let cachedServer: any;

async function bootstrapServer() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance(); // pega o Express interno
  return awsServerlessExpress.createServer(expressApp);
}

export const handler: Handler = async (event, context) => {
  cachedServer = cachedServer ?? (await bootstrapServer());
  return awsServerlessExpress.proxy(cachedServer, event, context, "PROMISE").promise;
};
