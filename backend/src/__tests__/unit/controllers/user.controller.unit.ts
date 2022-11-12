import {
  createStubInstance,
  expect,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {UserRepository} from '../../../repositories';
import {UserController} from '../../../controllers';
import {responseMessage} from '../../../utils/constants';
import sinon from 'sinon';
import {fetchUser, fetchUsers, searchActors, updateUser} from '../../helper';
import {User} from '../../../models';
import {BcryptHasher} from '../../../services/hash.password';
import {MyUserService} from '../../../services/user-service';
import {JWTService} from '../../../services/jwt-service';

describe('UserController (unit)', () => {
  let userRepository: StubbedInstanceWithSinonAccessor<UserRepository>;
  let bcryptHasher: BcryptHasher;
  let userService: MyUserService;
  let controller: UserController;
  let jwtService: JWTService;
  before(givenStubbedRepository);

  describe('User Controller find', () => {
    it('should fetch users', async () => {
      const find = userRepository.stubs.find;
      find.resolves(fetchUsers.data as User[]);
      const users = await controller.find();
      expect(users.success).equal(true);
      expect(users.data).to.have.length(2);
      expect(users.message).equal(responseMessage.fetchedUsers);
      sinon.assert.called(find);
    });
  });

  describe('User Controller findById', () => {
    it('should fetch a user', async () => {
      const findById = userRepository.stubs.findById;
      findById.resolves(fetchUser.data as User);
      const res = await controller.findById('actorID2');
      expect(res.success).equal(true);
      expect(res.data).to.containEql(fetchUser.data as User);
      expect(res.message).equal(responseMessage.fetchedUser);
      sinon.assert.called(findById);
    });
  });

  describe('User Controller updatedById', () => {
    it('should update a user', async () => {
      const updateById = userRepository.stubs.updateById;
      updateById.resolves();
      const res = await controller.updateById(
        'movieID4',
        updateUser.data as User,
      );
      expect(res.success).equal(true);
      expect(res.message).equal(responseMessage.updatedUser);
      sinon.assert.called(updateById);
    });
  });

  describe('User Controller searchByName', () => {
    it('should search user', async () => {
      const searchByName = userRepository.stubs.find;
      searchByName.resolves(searchActors.data as User[]);
      const res = await controller.searchByName('John');
      expect(res.success).equal(true);
      expect(res.data).to.have.length(1);
      expect(res.message).equal(responseMessage.searchedUsers);
      sinon.assert.called(searchByName);
    });
  });

  function givenStubbedRepository() {
    userRepository = createStubInstance(UserRepository);
    bcryptHasher = createStubInstance(BcryptHasher);
    userService = createStubInstance(MyUserService);
    jwtService = createStubInstance(JWTService);

    controller = new UserController(
      userRepository,
      bcryptHasher,
      userService,
      jwtService,
    );
  }
});
