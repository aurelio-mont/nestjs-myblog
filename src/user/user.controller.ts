import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { AppResource } from 'src/app.roles';

@ApiTags('User')
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
        @Param('id', ParseIntPipe) id: number
    ) {
        const data = await this.userService.getOne(id);
        return { data };
    }

    @Auth({
        possession: 'any',
        action: 'create',
        resource: AppResource.USER,
      })
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
    
    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.USER,
      })
    @Put(':id')
    async editOne(
        @Param('id') id: number,
        @Body() dto: EditUserDto
    ) {
      const data = await this.userService.editOne(id, dto);
      return { 
        message: 'Usuario Modificado',    
        data
    };  
    }

    @Auth({
        action: 'delete',
        possession: 'own',
        resource: AppResource.USER,
      })
    @Delete(':id')
    async deleteOne(
        @Param('id') id: number
    ) {
        const data = await this.userService.deleteOne(id);
        return { message: "Usuario eliminado", data }
    }
}
