import mongoose from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): (Car | null) {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    if (cars) {
      const allCars = cars.map((car) => this.createCarDomain(car));
      return { status: 200, message: allCars };
    }
    return { status: 404, message: 'Car not found' };
  }

  public async getById(id: string) {
    if (!mongoose.isValidObjectId(id)) return { status: 422, message: 'Invalid mongo id' };
    const carODM = new CarODM();
    const car = await carODM.getById(id);
    if (car) {
      const getCar = this.createCarDomain(car);
      return { status: 200, message: getCar };
    }
    return { status: 404, message: 'Car not found' };
  }
}

export default CarService;