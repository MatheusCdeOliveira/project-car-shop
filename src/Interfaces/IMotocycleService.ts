import Motocycle from '../Domains/Motorcycle';
import IMotocycle from './IMotorcycle';

type TMotoReturn = {
  status: number,
  message: (string | Motocycle | null) | (Motocycle | null)[] | string 
};

type TMotoUpdate = {
  status: number,
  message: string | (Motocycle | null)
};

interface IMotocycleService {
  createMotocycle(motocycle: IMotocycle): Promise<Motocycle | null>
  getAll(): Promise<TMotoReturn>
  getById(id: string): Promise<TMotoReturn>
  update(id: string, moto: IMotocycle): Promise<TMotoUpdate>
}

export default IMotocycleService;