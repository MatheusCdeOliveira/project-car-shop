import { NextFunction, Request, Response } from 'express';
import IMotocycle from '../Interfaces/IMotorcycle';
import IMotocycleService from '../Interfaces/IMotocycleService';

class MotorcycleController {
  private _service: IMotocycleService;

  constructor(service: IMotocycleService) {
    this._service = service;
  }

  public async createMotocycle(req: Request, res: Response, next: NextFunction) {
    const motocycle: IMotocycle = {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body.status,
      buyValue: req.body.buyValue,
      category: req.body.category,
      engineCapacity: req.body.engineCapacity,
    };
    try {
      const newMoto = await this._service.createMotocycle(motocycle);
      return res.status(201).json(newMoto);
    } catch (error) {
      next(error);
    }
  }
}

export default MotorcycleController;