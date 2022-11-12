import {
  createStubInstance,
  expect,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {
  MovieRepository,
  ContractRepository,
  ReviewRepository,
} from '../../../repositories';
import {MovieController} from '../../../controllers';
import {responseMessage} from '../../../utils/constants';
import sinon from 'sinon';
import {
  createMovie,
  fetchMovie,
  fetchMovies,
  searchMovies,
  updateMovie,
} from '../../helper';
import {Movie} from '../../../models';

describe('MovieController (unit)', () => {
  let movieRepository: StubbedInstanceWithSinonAccessor<MovieRepository>;
  let contractRepository: StubbedInstanceWithSinonAccessor<ContractRepository>;
  let reviewRepository: StubbedInstanceWithSinonAccessor<ReviewRepository>;
  beforeEach(givenStubbedRepository);

  describe('Movie Controller find', () => {
    it('should fetch movies', async () => {
      const find = movieRepository.stubs.find;
      find.resolves(fetchMovies.data as Movie[]);
      const controller = new MovieController(
        movieRepository,
        contractRepository,
        reviewRepository,
      );
      const movies = await controller.find();
      expect(movies.success).equal(true);
      expect(movies.data).to.have.length(2);
      expect(movies.message).equal(responseMessage.fetchedMovies);
      sinon.assert.called(find);
    });
  });

  describe('Movie Controller findById', () => {
    it('should fetch a movie', async () => {
      const findById = movieRepository.stubs.findById;
      findById.resolves(fetchMovie.data as Movie);
      const controller = new MovieController(
        movieRepository,
        contractRepository,
        reviewRepository,
      );
      const res = await controller.findById('movieID1');
      expect(res.success).equal(true);
      expect(res.data).to.containEql(fetchMovie.data as Movie);
      expect(res.message).equal(responseMessage.fetchedMovie);
      sinon.assert.called(findById);
    });
  });

  describe('Movie Controller create', () => {
    it('should create a movie', async () => {
      const create = movieRepository.stubs.create;
      create.resolves(createMovie.data as Movie);
      const controller = new MovieController(
        movieRepository,
        contractRepository,
        reviewRepository,
      );
      const res = await controller.create(createMovie.data as Movie);
      expect(res.success).equal(true);
      expect(res.data).to.containEql(createMovie.data as Movie);
      expect(res.message).equal(responseMessage.addedMovie);
      sinon.assert.called(create);
    });
  });

  describe('Movie Controller updatedById', () => {
    it('should update a movie', async () => {
      const updateById = movieRepository.stubs.updateById;
      updateById.resolves();
      const controller = new MovieController(
        movieRepository,
        contractRepository,
        reviewRepository,
      );
      const res = await controller.updateById(
        'movieID4',
        updateMovie.data as Movie,
      );
      expect(res.success).equal(true);
      expect(res.message).equal(responseMessage.updatedMovie);
      sinon.assert.called(updateById);
    });
  });

  describe('Movie Controller searchByTitle', () => {
    it('should search movie', async () => {
      const searchByTitle = movieRepository.stubs.find;
      searchByTitle.resolves(searchMovies.data as Movie[]);
      const controller = new MovieController(
        movieRepository,
        contractRepository,
        reviewRepository,
      );
      const res = await controller.searchByTitle('Found');
      expect(res.success).equal(true);
      expect(res.data).to.have.length(1);
      expect(res.message).equal(responseMessage.searchedMovies);
      sinon.assert.called(searchByTitle);
    });
  });

  function givenStubbedRepository() {
    movieRepository = createStubInstance(MovieRepository);
    contractRepository = createStubInstance(ContractRepository);
    reviewRepository = createStubInstance(ReviewRepository);
  }
});
