import Motocycle from '../Domains/Motorcycle';
import IMotocycle from './IMotorcycle';

type TMotoReturn = {
  status: number,
  message: (string | Motocycle | null) | (Motocycle | null)[] | string 
};

interface IMotocycleService {
  createMotocycle(motocycle: IMotocycle): Promise<Motocycle | null>
  getAll(): Promise<TMotoReturn>
  getById(id: string): Promise<TMotoReturn>
}

export default IMotocycleService;