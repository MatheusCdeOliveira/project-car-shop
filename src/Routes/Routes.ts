import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarService from '../Services/CarService';

const routes = Router();

const carService = new CarService();
const carController = new CarController(carService);

routes.post('/cars', (req, res, next) => carController.createCar(req, res, next));
routes.get('/cars', (req, res) => carController.getAll(req, res));
routes.get('/cars/:id', (req, res) => carController.getById(req, res));

export default routes;