import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CacheInterceptor } from './common/interceptors/cache.interceptor';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new CacheInterceptor(new Reflector()));

  app.enableCors();

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Auth API')
      .setDescription('Documentação da API de autenticação e itens')
      .setVersion('1.0')
      .addBearerAuth() // JWT Auth
      .addBasicAuth() // 👈 adiciona Basic Auth
      .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key') // 👈 mantém também a API Key
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    console.log(`📘 Swagger disponível em: http://localhost:${PORT}/docs`);
  }

  await app.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
  });
}
bootstrap();
