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

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const motos = await this._service.getAll();
      return res.status(motos.status)
        .json(typeof motos.message === 'string' ? { message: motos.message } : motos.message);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const moto = await this._service.getById(id);
      return res.status(moto.status)
        .json(typeof moto.message === 'string' ? { message: moto.message } : moto.message);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const moto: IMotocycle = {
      ...req.body,
    };
    try {
      const update = await this._service.update(id, moto);
      return res.status(update.status)
        .json(typeof update.message === 'string'
          ? { message: update.message } : update.message);
    } catch (error) {
      next(error);
    }
  }
}

export default MotorcycleController;