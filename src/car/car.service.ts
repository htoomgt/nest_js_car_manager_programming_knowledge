import { HttpException, Injectable } from '@nestjs/common';
import { CarDto } from './car.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/Car.interfaces';

const carProjection = {
  _v: false,
  _id: false,
};

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {}

  public async getCars(): Promise<CarDto[]> {
    const cars = await this.carModel.find({}, carProjection).exec();
    if (!cars || !cars[0]) {
      throw new HttpException('Not Found', 404);
    }
    return cars;
  }

  public async postCar(nawCar: CarDto) {
    const car = await new this.carModel(nawCar);
    return car.save();
  }

  public async getCarById(id): Promise<CarDto> {
    const car = await this.carModel.findOne({ id }, carProjection).exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }

  public async deleteCarById(id: number): Promise<any> {
    const car = await this.carModel.deleteOne({ id }).exec();
    if (car.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }

  public async putCarById(
    id: number,
    propertyName: string,
    propertValue: string,
  ) {
    const car = await this.carModel
      .findOneAndUpdate({ id }, { [propertyName]: propertValue })
      .exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }
}
