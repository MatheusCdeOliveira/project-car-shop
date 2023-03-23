import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
 
  constructor(
    obj: IVehicle,
  ) {
    this.id = obj.id;
    this.model = obj.model;
    this.year = obj.year;
    this.color = obj.color;
    this.status = obj.status || false;
    this.buyValue = obj.buyValue;
  }

  public setId(id: string) {
    this.id = id;
  }

  public get Id() {
    return this.id;
  }

  public set Model(model: string) {
    this.model = model;
  }

  public get Model() {
    return this.model;
  }

  public set Year(year: number) {
    this.year = year;
  }

  public get Year() {
    return this.year;
  }

  public set Color(color: string) {
    this.color = color;
  }

  public get Color() {
    return this.color;
  }

  public setStatus(status: boolean) {
    this.status = status;
  }

  public get Status() {
    return this.status;
  }

  public set BuyValue(buyValue: number) {
    this.buyValue = buyValue;
  }

  public get BuyValue() {
    return this.buyValue;
  }
}

export default Vehicle;