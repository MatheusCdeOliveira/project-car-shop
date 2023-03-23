import { model, Model, models, Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async getAll(): Promise<ICar[]> {
    const cars = this.model.find();
    return cars;
  }

  public async getById(id: string): Promise<ICar | null | undefined> {
    const car = await this.model.findById(id);
    return car;
  }

  public async update(id: string, obj: Partial<ICar>): Promise<ICar | null> {
    return this.model.findByIdAndUpdate({ _id: id }, { ...obj }, { new: true });
  }
}

export default CarODM;