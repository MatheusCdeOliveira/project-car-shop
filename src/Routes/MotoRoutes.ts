import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import MotorcycleService from '../Services/MotocycleService';

const motoRoutes = Router();
const motoService = new MotorcycleService();
const motoController = new MotorcycleController(motoService);

motoRoutes.post('/motorcycles', (req, res, next) => motoController.createMotocycle(req, res, next));
motoRoutes.get('/motorcycles', (req, res, next) => motoController.getAll(req, res, next));
motoRoutes.get('/motorcycles/:id', (req, res) => motoController.getById(req, res));

export default motoRoutes;