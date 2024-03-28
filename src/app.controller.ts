import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags("Welcome to CRUD by jin with NestJS")
export class AppController {
    constructor() { }

    @Get()
    getHello(): string {
        return "Welcome to CRUD by jin with NestJS";
    }
}
