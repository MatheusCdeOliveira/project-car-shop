import Motocycle from '../Domains/Motorcycle';
import IMotocycle from './IMotorcycle';

interface IMotocycleService {
  createMotocycle(motocycle: IMotocycle): Promise<Motocycle | null>
}

export default IMotocycleService;