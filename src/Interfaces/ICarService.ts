import Car from '../Domains/Car';
import ICar from './ICar';

type TError = {
  status: number,
  message: (string | Car | null) | (Car | null)[] | string
};

interface ICarService {
  createCar(car: ICar): Promise<Car | null>
  getAll(): Promise<TError>
  getById(id: string): Promise<TError>
}

export default ICarService;