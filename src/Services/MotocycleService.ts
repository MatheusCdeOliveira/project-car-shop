import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotocycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private notFoundErr = 'Motorcycle not found';

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
    if (motos.length === 0) {
      const allMotos = motos.map((moto) => this.createMotocycleDomain(moto));
      return { status: 200, message: allMotos };
    }
    return { status: 404, message: this.notFoundErr };
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) return { status: 422, message: 'Invalid mongo id' };
    const motoODM = new MotorcycleODM();
    const moto = await motoODM.getById(id);
    if (moto) {
      const motoDomain = this.createMotocycleDomain(moto);
      return { status: 200, message: motoDomain };
    }
    return { status: 404, message: this.notFoundErr };
  }

  public async update(id: string, moto: IMotocycle) {
    if (!isValidObjectId(id)) return { status: 422, message: 'Invalid mongo id' };
    const motoODM = new MotorcycleODM();
    const findMoto = await motoODM.getById(id);
    if (findMoto) {
      const update = await motoODM.update(id, moto);
      const updatedMoto = this.createMotocycleDomain(update);
      return { status: 200, message: updatedMoto };
    }
    return { status: 404, message: this.notFoundErr };
  }
}

export default MotorcycleService;