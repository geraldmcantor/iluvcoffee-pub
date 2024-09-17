import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/create-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from '../../src/common/dto/pagination-query.dto';
import { Public } from '../../src/common/decorators/public.decorator';
import { ParseIntPipe } from '../../src/common/pipes/parse-int/parse-int.pipe';
import { Protocol } from '../../src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  findAll(
    @Protocol() protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    //const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
    //return `All the coffees, bruh. Limit ${limit}, Offset: ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log('id is: ' + id);
    return this.coffeesService.findOne(id);
    //return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    this.coffeesService.create(createCoffeeDto);
    return createCoffeeDto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    this.coffeesService.update(id, updateCoffeeDto);
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.coffeesService.remove(id);
    return `This action removes #${id} coffee`;
  }
}
