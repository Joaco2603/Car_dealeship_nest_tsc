import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { UpdateCarDto, CreateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
  ];

  public findAll() {
    return this.cars;
  }

  public findOneById(id: string): object {
    const Car = this.cars.find((car) => car.id == id);
    if (!Car) throw new NotFoundException(`Car with id: ${id} not found`);
    return Car;
  }

  // public create({ brand, model }: CreateCarDto) {
  //   const car: Car = {
  //     id: uuid(),
  //     brand: brand,
  //     model: model,
  //   };
  //   return car;
  // }

  public create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);
    return car;
  }

  public update(id: string, updateCarDto: UpdateCarDto) {
    let carDb = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid`);

    this.cars = this.cars.map((car: any) => {
      if (car.id === id) {
        carDb = { ...carDb, ...updateCarDto, id };
        return carDb;
      }
      return car;
    });
    return carDb;
  }

  public delete(id: string) {
    const carDb = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return carDb;
  }

  public fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
    return this.cars;
  }
}
