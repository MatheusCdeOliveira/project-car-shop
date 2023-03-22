import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import ICarService from '../Interfaces/ICarService';

class CarController {
  private _service: ICarService;

  constructor(service: ICarService) {
    this._service = service;
  }

  public async createCar(req: Request, res: Response, next: NextFunction) {
    const car: ICar = {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body.status,
      buyValue: req.body.buyValue,
      doorsQty: req.body.doorsQty,
      seatsQty: req.body.seatsQty,
    };
    try {
      const newCar = await this._service.createCar(car);
      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;