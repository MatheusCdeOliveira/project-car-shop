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

  public async getAll(req: Request, res: Response) {
    try {
      const cars = await this._service.getAll();
      return res.status(cars.status)
        .json(typeof cars.message === 'string' ? { message: cars.message } : cars.message);
    } catch (error) {
      const err = error as Error;
      return res.status(404).json(err.message);
    }
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const car = await this._service.getById(id);
      return res.status(car.status)
        .json(typeof car.message === 'string' ? { message: car.message } : car.message);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
}

export default CarController;