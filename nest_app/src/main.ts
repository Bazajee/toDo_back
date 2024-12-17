import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });



async function bootstrap() {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    const port = parseInt(process.env.NEST_RUNNING_PORT);
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: 'http://localhost:5173', 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
        credentials: true,
      });
    app.use(cookieParser());
    await app.listen(port);
}

bootstrap();
