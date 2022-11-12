import {
  createStubInstance,
  expect,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ActorRepository} from '../../../repositories';
import {ActorController} from '../../../controllers';
import {responseMessage} from '../../../utils/constants';
import sinon from 'sinon';
import {
  createActor,
  fetchActor,
  fetchActors,
  searchActors,
  updateActor,
} from '../../helper';
import {Actor} from '../../../models';

describe('ActorController (unit)', () => {
  let actorRepository: StubbedInstanceWithSinonAccessor<ActorRepository>;
  beforeEach(givenStubbedRepository);

  describe('Actor Controller find', () => {
    it('should fetch actors', async () => {
      const find = actorRepository.stubs.find;
      find.resolves(fetchActors.data as Actor[]);
      const controller = new ActorController(actorRepository);
      const movies = await controller.find();
      expect(movies.success).equal(true);
      expect(movies.data).to.have.length(2);
      expect(movies.message).equal(responseMessage.fetchedActors);
      sinon.assert.called(find);
    });
  });

  describe('Actor Controller findById', () => {
    it('should fetch an actor', async () => {
      const findById = actorRepository.stubs.findById;
      findById.resolves(fetchActor.data as Actor);
      const controller = new ActorController(actorRepository);
      const res = await controller.findById('actorID3');
      expect(res.success).equal(true);
      expect(res.data).to.containEql(fetchActor.data as Actor);
      expect(res.message).equal(responseMessage.fetchedActor);
      sinon.assert.called(findById);
    });
  });

  describe('Actor Controller create', () => {
    it('should create an actor', async () => {
      const create = actorRepository.stubs.create;
      create.resolves(createActor.data as Actor);
      const controller = new ActorController(actorRepository);
      const res = await controller.create(createActor.data as Actor);
      expect(res.success).equal(true);
      expect(res.data).to.containEql(createActor.data as Actor);
      expect(res.message).equal(responseMessage.addedActor);
      sinon.assert.called(create);
    });
  });

  describe('Actor Controller updatedById', () => {
    it('should update an actor', async () => {
      const updateById = actorRepository.stubs.updateById;
      updateById.resolves();
      const controller = new ActorController(actorRepository);
      const res = await controller.updateById(
        'actorID5',
        updateActor.data as Actor,
      );
      expect(res.success).equal(true);
      expect(res.message).equal(responseMessage.updatedActor);
      sinon.assert.called(updateById);
    });
  });

  describe('Actor Controller searchByName', () => {
    it('should search actor', async () => {
      const searchByName = actorRepository.stubs.find;
      searchByName.resolves(searchActors.data as Actor[]);
      const controller = new ActorController(actorRepository);
      const res = await controller.searchByName('John');
      expect(res.success).equal(true);
      expect(res.data).to.have.length(1);
      expect(res.message).equal(responseMessage.searchedMovies);
      sinon.assert.called(searchByName);
    });
  });

  function givenStubbedRepository() {
    actorRepository = createStubInstance(ActorRepository);
  }
});
