import {
  createStubInstance,
  expect,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {ReviewRepository} from '../../../repositories';
import {ReviewController} from '../../../controllers';
import {responseMessage} from '../../../utils/constants';
import sinon from 'sinon';
import {
  fetchReview,
  fetchReviews,
  createReview,
  updateReview,
} from '../../helper';
import {Review} from '../../../models';

describe('ReviewController (unit)', () => {
  let reviewRepository: StubbedInstanceWithSinonAccessor<ReviewRepository>;
  beforeEach(givenStubbedRepository);

  describe('Review Controller find', () => {
    it('should fetch reviews', async () => {
      const find = reviewRepository.stubs.find;
      find.resolves(fetchReviews.data as Review[]);
      const controller = new ReviewController(reviewRepository);
      const movies = await controller.find();
      expect(movies.success).equal(true);
      expect(movies.data).to.have.length(2);
      expect(movies.message).equal(responseMessage.fetchedReviews);
      sinon.assert.called(find);
    });
  });

  describe('Review Controller findById', () => {
    it('should fetch a review', async () => {
      const findById = reviewRepository.stubs.findById;
      findById.resolves(fetchReview.data as Review);
      const controller = new ReviewController(reviewRepository);
      const res = await controller.findById('reviewID2');
      expect(res.success).equal(true);
      expect(res.data).to.containEql(fetchReview.data as Review);
      expect(res.message).equal(responseMessage.fetchedReview);
      sinon.assert.called(findById);
    });
  });

  describe('Review Controller create', () => {
    it('should create a review', async () => {
      const create = reviewRepository.stubs.create;
      create.resolves(createReview.data as Review);
      const controller = new ReviewController(reviewRepository);
      const res = await controller.create(createReview.data as Review);
      expect(res.success).equal(true);
      expect(res.data).to.containEql(createReview.data as Review);
      expect(res.message).equal(responseMessage.addedReview);
      sinon.assert.called(create);
    });
  });

  describe('Review Controller updatedById', () => {
    it('should update a review', async () => {
      const updateById = reviewRepository.stubs.updateById;
      updateById.resolves();
      const controller = new ReviewController(reviewRepository);
      const res = await controller.updateById(
        'reviewID4',
        updateReview.data as Review,
      );
      expect(res.success).equal(true);
      expect(res.message).equal(responseMessage.updatedReview);
      sinon.assert.called(updateById);
    });
  });

  function givenStubbedRepository() {
    reviewRepository = createStubInstance(ReviewRepository);
  }
});
