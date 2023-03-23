import Car from '../Domains/Car';
import ICar from './ICar';

type TReturn = {
  status: number,
  message: (string | Car | null) | (Car | null)[] | string 
};
type TUpdate = {
  status: number,
  message: string | (Car | null)
};

interface ICarService {
  createCar(car: ICar): Promise<Car | null>
  getAll(): Promise<TReturn>
  getById(id: string): Promise<TReturn>
  update(id: string, car: ICar): Promise<TUpdate>
}

export default ICarService;