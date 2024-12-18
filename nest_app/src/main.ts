import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });



async function bootstrap() {
    const port = parseInt(process.env.NEST_RUNNING_PORT);
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: process.env.NODE_ENV === 'production' ? 'https://todo.salesthomas.fr' : 'http://localhost:5173', 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
        credentials: true,
      });
    app.use(cookieParser());
    await app.listen(port);
}

bootstrap();
