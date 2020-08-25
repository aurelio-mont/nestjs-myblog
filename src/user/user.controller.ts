import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto } from './dtos';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async getMany() {
        const data = await this.userService.getMany();
        return { data };
    }
    
    @Get(':id')
    async getOne(
        @Param() id: number
    ) {
        const data = await this.userService.getOne(id);
        return { data };
    }

    @Post()
    async createOne(
        @Body() dto: CreateUserDto
    ) {
        const data = await this.userService.createOne(dto);
        return { 
            message: 'Usuario Creado',    
            data
        };
    }
    
    @Put(':id')
    async editOne(
        @Param() id: number,
        @Body() dto: EditUserDto
    ) {
      const data = await this.userService.editOne(id, dto);
      return { 
        message: 'Usuario Modificado',    
        data
    };  
    }

    @Delete(':id')
    async deleteOne(
        @Param() id: number
    ) {
        const data = await this.userService.deleteOne(id);
        return { message: "Usuario eliminado", data }
    }

}
