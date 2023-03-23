import { model, Model, models, Schema } from 'mongoose';

class AbstractODM<T> {
  private schema: Schema<T>;
  private model: Model<T>;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async getAll(): Promise<T[]> {
    const cars = this.model.find();
    return cars;
  }

  public async getById(id: string): Promise<T | null | undefined> {
    const car = await this.model.findById(id);
    return car;
  }

  public async update(id: string, obj: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate({ _id: id }, { ...obj }, { new: true });
  }
}

export default AbstractODM;