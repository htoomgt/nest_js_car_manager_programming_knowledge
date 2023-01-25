import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CarDto } from './car.dto';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  public async getCars() {
    return this.carService.getCars();
  }

  @Post()
  public async postCar(@Body() car: CarDto) {
    return this.carService.postCar(car);
  }

  @Get(':id')
  public async getCarById(@Param('id') id: number) {
    console.log('The requested id : ', id);
    return this.carService.getCarById(id);
  }

  @Delete(':id')
  public async deleteCarById(@Param('id') id: number) {
    return this.carService.deleteCarById(id);
  }

  @Put(':id')
  public putCarById(@Param('id') id: number, @Query() query) {
    console.log('The id is : ', id);
    console.log('This query is : ', query);
    const propertyName = query.property_name;
    const propertyValue = query.property_value;

    return this.carService.putCarById(id, propertyName, propertyValue);
  }
}
