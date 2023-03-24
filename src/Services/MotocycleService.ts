import { isValidObjectId } from 'mongoose';
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

  public async getAll() {
    const motocycleODM = new MotorcycleODM();
    const motos = await motocycleODM.getAll();
    if (motos) {
      const allMotos = motos.map((moto) => this.createMotocycleDomain(moto));
      return { status: 200, message: allMotos };
    }
    return { status: 404, message: 'Motorcycle not found' };
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) return { status: 422, message: 'Invalid mongo id' };
    const motoODM = new MotorcycleODM();
    const moto = await motoODM.getById(id);
    if (moto) {
      const motoDomain = this.createMotocycleDomain(moto);
      return { status: 200, message: motoDomain };
    }
    return { status: 404, message: 'Motorcycle not found' };
  }
}

export default MotorcycleService;