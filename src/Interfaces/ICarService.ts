import Car from '../Domains/Car';
import ICar from './ICar';

interface ICarService {
  createCar(car: ICar): Promise<Car | null>
}

export default ICarService;