import Motorcycle from '../Domains/Motorcycle';
import IMotocycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotocycleDomain(motocycle: IMotocycle | null): (Motorcycle | null) {
    if (motocycle) {
      return new Motorcycle(motocycle);
    }
    return null;
  }

  public async createMotocycle(motocycle: IMotocycle) {
    const motocycleODM = new MotorcycleODM();
    const newMoto = await motocycleODM.create(motocycle);
    return this.createMotocycleDomain(newMoto);
  }
}

export default MotorcycleService;