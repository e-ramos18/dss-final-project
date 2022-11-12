import {UserRepository} from '@loopback/authentication-jwt';
import {givenHttpServerConfig} from '@loopback/testlab';
import {Application} from '../application';
import {CustomResponse} from '../types';
import {responseMessage} from '../utils/constants';

export async function givenRunningApplicationWithCustomConfiguration() {
  const app = new Application({
    rest: givenHttpServerConfig(),
  });

  await app.boot();

  app.bind('datasources.config.database').to({
    name: 'database',
    connector: 'mongodb',
  });

  await app.start();
  return app;
}

export async function givenUserRepositories(app: Application) {
  const userRepo = await app.getRepository(UserRepository);
  return {userRepo};
}

export const fetchMovies: CustomResponse<{}> = {
  success: true,
  data: [
    {
      id: 'movieID1',
      title: 'Aquaman',
      description:
        'Aquaman is a 2018 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
      cost: '$1.148 billion',
      imageUrl: 'sampleImageURL1',
      year: '2018',
    },
    {
      id: 'movieID2',
      title: 'Black Adam',
      description:
        'Black Adam is a 2022 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
      cost: '$1 billion',
      imageUrl: 'sampleImageURL2',
      year: '2022',
    },
  ],
  message: responseMessage.fetchedMovies,
};

export const fetchMovie: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'movieID1',
    title: 'Aquaman',
    description:
      'Aquaman is a 2018 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
    cost: '$1.148 billion',
    imageUrl: 'sampleImageURL1',
    year: '2018',
  },
  message: responseMessage.fetchedMovies,
};

export const createMovie: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'movieID3',
    title: 'Created movie',
    description:
      'New movie is a 2018 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
    cost: '$1.148 billion',
    imageUrl: 'sampleImageURL1',
    year: '2018',
    actorsIds: ['sampleActorId'],
  },
  message: responseMessage.addedMovie,
};

export const updateMovie: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'movieID4',
    title: 'Created movie',
    description:
      'New movie is a 2018 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
    cost: '$1.148 billion',
    imageUrl: 'sampleImageURL1',
    year: '2018',
    actorsIds: ['sampleActorId'],
  },
  message: responseMessage.addedMovie,
};

export const searchMovies: CustomResponse<{}> = {
  success: true,
  data: [
    {
      id: 'movieID5',
      title: 'Found',
      description:
        'Found is a 2018 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
      cost: '$1.148 billion',
      imageUrl: 'sampleImageURL1',
      year: '2018',
    },
  ],
  message: responseMessage.fetchedMovies,
};

export const fetchReviews: CustomResponse<{}> = {
  success: true,
  data: [
    {
      id: 'reviewID1',
      movieId: 'movieID1',
      userId: 'userID1',
      description: 'Sample review',
      rating: 5,
      isApproved: false,
    },
    {
      id: 'reviewID2',
      movieId: 'movieID2',
      userId: 'userID2',
      description: 'Sample review',
      rating: 3,
      isApproved: false,
    },
  ],
  message: responseMessage.fetchedReviews,
};

export const fetchReview: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'reviewID2',
    movieId: 'movieID2',
    userId: 'userID2',
    description: 'Sample review',
    rating: 5,
    isApproved: false,
  },

  message: responseMessage.fetchedReview,
};

export const createReview: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'reviewID3',
    movieId: 'movieID3',
    userId: 'userID3',
    description: 'Sample review',
    rating: 5,
    isApproved: false,
  },
  message: responseMessage.addedReview,
};

export const updateReview: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'reviewID4',
    movieId: 'movieID4',
    userId: 'userID4',
    description: 'Sample review',
    rating: 5,
    isApproved: false,
  },
  message: responseMessage.updatedReview,
};

export const fetchActors: CustomResponse<{}> = {
  success: true,
  data: [
    {
      id: 'actorID1',
      fname: 'Dwayne',
      lname: 'Johnson',
      age: '2',
      gender: 'Male',
      about:
        'Dwayne is a 2022 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
      imageUrl: 'sampleImageURL1',
    },
    {
      id: 'actorID2',
      fname: 'Gal',
      lname: 'Gadot',
      age: '2',
      gender: 'Female',
      about:
        'Gal is a 2022 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
      imageUrl: 'sampleImageURL1',
    },
  ],
  message: responseMessage.fetchedActors,
};

export const fetchActor: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'actorID3',
    fname: 'Ned',
    lname: 'Stark',
    age: '20',
    gender: 'Male',
    about:
      'Ned is a 2022 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
    imageUrl: 'sampleImageURL1',
  },
  message: responseMessage.fetchedActor,
};

export const createActor: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'actorID4',
    fname: 'Rob',
    lname: 'Stab',
    age: '20',
    gender: 'Male',
    about:
      'Rob is a 2022 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
    imageUrl: 'sampleImageURL1',
  },
  message: responseMessage.addedActor,
};

export const updateActor: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'actorID5',
    fname: 'Sansa',
    lname: 'Lannister',
    age: '20',
    gender: 'Female',
    about:
      'Rob is a 2022 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
    imageUrl: 'sampleImageURL1',
  },
  message: responseMessage.updatedActor,
};

export const searchActors: CustomResponse<{}> = {
  success: true,
  data: [
    {
      id: 'actorID6',
      fname: 'John',
      lname: 'Wick',
      age: '2',
      gender: 'Male',
      about:
        'John is a 2022 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,',
      imageUrl: 'sampleImageURL1',
    },
  ],
  message: responseMessage.fetchedActors,
};

export const fetchUsers: CustomResponse<{}> = {
  success: true,
  data: [
    {
      id: 'userID1',
      email: 'user1@mail.com',
      name: 'User1',
      role: 'User',
      isApproved: false,
    },
    {
      id: 'userID2',
      email: 'user2@mail.com',
      name: 'User2',
      role: 'User',
      isApproved: false,
    },
  ],
  message: responseMessage.fetchedUsers,
};

export const fetchUser: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'userID2',
    email: 'user2@mail.com',
    name: 'User2',
    role: 'User',
    isApproved: false,
  },
  message: responseMessage.fetchedUser,
};

export const updateUser: CustomResponse<{}> = {
  success: true,
  data: {
    id: 'userID4',
    email: 'user4@mail.com',
    name: 'User4',
    role: 'User',
    isApproved: false,
  },
  message: responseMessage.addedUser,
};

export const searchUsers: CustomResponse<{}> = {
  success: true,
  data: [
    {
      id: 'userID7',
      email: 'user7@mail.com',
      name: 'User found',
      role: 'User',
      isApproved: false,
    },
  ],
  message: responseMessage.searchedUsers,
};
