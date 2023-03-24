import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotocycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotocycleService';

const motoNotFound = 'Motorcycle not found';

const motoOutput = new Motorcycle({
  id: '641df7668ae7b3776c3765f4',
  model: 'Honda Cb 800f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30,
  category: 'Street',
  engineCapacity: 600,
});

const moto = {
  id: '641df7668ae7b3776c3765f4',
  model: 'Honda Cb 800f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30,
  category: 'Street',
  engineCapacity: 600,
};

const getAll: IMotocycle[] = [
  {
    id: '641df7668ae7b3776c3765f4',
    model: 'Honda Cb 700f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '641df7728ae7b3776c3765f6',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Black',
    status: true,
    buyValue: 30,
    category: 'Street',
    engineCapacity: 600,
  },
];

const getById: IMotocycle = {
  id: '641df7728ae7b3776c3765f6',
  model: 'Honda Cb 700f Hornet',
  year: 2002,
  color: 'White',
  status: true,
  buyValue: 15.99,
  category: 'Street',
  engineCapacity: 600,
};

describe('Deveria testar as camadas de moto', function () {
  it('Deveria criar uma moto nova com SUCESSO', async function () {
    // Arrange
   
    sinon.stub(Model, 'create').resolves(motoOutput);

    const service = new MotorcycleService();
    const result = await service.createMotocycle(moto);

    expect(result).to.be.deep.equal(motoOutput);
  });

  it('Deveria buscar todas as motos com SUCESSO', async function () {
    // Arrange
   
    sinon.stub(Model, 'find').resolves(getAll);

    const service = new MotorcycleService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal({ status: 200, message: getAll });
  });

  it('Deveria tentar buscar todas as motos sem SUCESSO ', async function () {
    // Arrange
   
    sinon.stub(Model, 'find').resolves([]);

    const service = new MotorcycleService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal({ status: 404, message: motoNotFound });
  });

  it('Deveria buscar uma moto com ID específico com SUCESSO', async function () {
    // Arrange
   
    sinon.stub(Model, 'findById').resolves(getById);

    const service = new MotorcycleService();
    const result = await service.getById('641df7728ae7b3776c3765f6');

    expect(result).to.be.deep.equal({ status: 200, message: getById });
  });

  it('Deveria buscar um carro com ID inexistente', async function () {
    // Arrange
   
    sinon.stub(Model, 'findById').resolves(null);

    const service = new MotorcycleService();
    const result = await service.getById('651df7728ae7b3776c3765f6');

    expect(result).to.be.deep.equal({ status: 404, message: motoNotFound });
  });

  it('Deveria buscar uma moto pelo ID e atualizar', async function () {
    // Arrange
   
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motoOutput);
    sinon.stub(Model, 'findById').resolves(motoOutput);

    const service = new MotorcycleService();
    const result = await service.update('641df7668ae7b3776c3765f4', moto);

    expect(result).to.deep.equal({ status: 200, message: moto });
  });

  it('Deveria buscar um carro por um id inexistente e não atualizar', async function () {
    // Arrange
   
    sinon.stub(Model, 'findById').resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate')
      .resolves({ status: 404, message: 'Motorcycle not found' });

    const service = new MotorcycleService();
    const result = await service.update('651df7668ae7b3776c3765f4', moto);

    expect(result).to.deep.equal({ status: 404, message: motoNotFound });
  });

  afterEach(function () {
    sinon.restore();
  });
});