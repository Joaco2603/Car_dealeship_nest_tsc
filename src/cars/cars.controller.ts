import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseUUIDPipe,
  Body,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  //CRUD

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get('/:id')
  getACar(@Param('id', ParseUUIDPipe) id: string): object {
    const car = this.carsService.findOneById(id);
    return car;
  }

  @Post('/')
  createCar(@Body() createCarDto: CreateCarDto) {
    const car = this.carsService.create(createCarDto);
    return car;
  }

  @Patch('/:id')
  updateCar(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete('/:id')
  deleteCar(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.carsService.delete(id);
  }
}
