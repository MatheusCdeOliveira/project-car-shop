import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarService from '../Services/CarService';

const carRoutes = Router();

const carService = new CarService();
const carController = new CarController(carService);

carRoutes.post('/cars', (req, res, next) => carController.createCar(req, res, next));
carRoutes.get('/cars', (req, res) => carController.getAll(req, res));
carRoutes.get('/cars/:id', (req, res) => carController.getById(req, res));
carRoutes.put('/cars/:id', (req, res, next) => carController.update(req, res, next));

export default carRoutes;