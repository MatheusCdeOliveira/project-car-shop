import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

const carNotFound = 'Car not found';

const carOutput = new Car({
  id: '641c904c4206dff0d8ebe33f',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
});

const car = {
  id: '641c904c4206dff0d8ebe33f',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

const getAll: ICar[] = [{
  id: '641c904c4206dff0d8ebe33f',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
},
{
  id: '741c904c4216dff3d8ebe33f',
  model: 'Marea',
  year: 2002,
  color: 'White',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
}];

const getById: ICar = {
  id: '741c904c4216dff3d8ebe33f',
  model: 'Marea',
  year: 2002,
  color: 'White',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

describe('Deveria testar as camadas de car', function () {
  it('Deveria criar um carro novo com SUCESSO', async function () {
    // Arrange
   
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.createCar(car);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria buscar todos os carros com SUCESSO', async function () {
    // Arrange
   
    sinon.stub(Model, 'find').resolves(getAll);

    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal({ status: 200, message: getAll });
  });

  it('Deveria tentar buscar todos os carros sem SUCESSO ', async function () {
    // Arrange
   
    sinon.stub(Model, 'find').resolves([]);

    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal({ status: 404, message: carNotFound });
  });

  it('Deveria buscar um carro com ID específico com SUCESSO', async function () {
    // Arrange
   
    sinon.stub(Model, 'findById').resolves(getById);

    const service = new CarService();
    const result = await service.getById('741c904c4216dff3d8ebe33f');

    expect(result).to.be.deep.equal({ status: 200, message: getById });
  });

  it('Deveria buscar um carro com ID inexistente', async function () {
    // Arrange
   
    sinon.stub(Model, 'findById').resolves(null);

    const service = new CarService();
    const result = await service.getById('741c001c4216dff3d8ebe33f');

    expect(result).to.be.deep.equal({ status: 404, message: carNotFound });
  });

  it('Deveria buscar um carro pelo ID e atualizar', async function () {
    // Arrange
   
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);
    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService();
    const result = await service.update('641c904c4206dff0d8ebe33f', car);

    expect(result).to.deep.equal({ status: 200, message: car });
  });

  it('Deveria buscar um carro por um id inexistente e não atualizar', async function () {
    // Arrange
   
    sinon.stub(Model, 'findById').resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate').resolves({ status: 404, message: carNotFound });

    const service = new CarService();
    const result = await service.update('651c904c4206dff0d8ebe33f', car);

    expect(result).to.deep.equal({ status: 404, message: carNotFound });
  });

  afterEach(function () {
    sinon.restore();
  });
});