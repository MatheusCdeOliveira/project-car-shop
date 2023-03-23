import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import ICar from '../../src/Interfaces/ICar';
import CarService from '../../src/Services/CarService';

const createCar: ICar = {
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
   
    sinon.stub(Model, 'create').resolves(createCar);

    const service = new CarService();
    const result = await service.createCar(createCar);

    expect(result).to.be.deep.equal(createCar);
  });

  it('Deveria buscar todos os carros com SUCESSO', async function () {
    // Arrange
   
    sinon.stub(Model, 'find').resolves(getAll);

    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal({ status: 200, message: getAll });
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

    expect(result).to.be.deep.equal({ status: 404, message: 'Car not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});