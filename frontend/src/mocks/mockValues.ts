import { CustomApiResponse } from "../types";

export const moviesMock: CustomApiResponse<{}> = {
  success: true,
  data: [
    {
      id: "63677b05f80591e0f0c7eb22",
      title: "Black Adam",
      description:
        "Black Adam is a 2022 American superhero film based on the DC Comics character of the same name, produced by New Line Cinema, DC Films",
      cost: "$3million",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/a9/Black_Adam_%28film%29_poster.jpg",
      actorsIds: ["63651c601602db179d3bd152", "6367943460fb463dd5604e30"],
      year: "2022",
    },
    {
      id: "63677c96f80591e0f0c7eb23",
      title: "Wonder Woman",
      description:
        "Wonder Woman is a 2017 superhero film based on the DC Comics character of the same name. Produced by Warner Bros. Pictures, DC Films, Atlas Entertainment .",
      cost: "$2million",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/b/b0/Wonder_Woman_%282017_film%29_poster.jpg",
      actorsIds: ["636648ee3b37860e952ba254"],
      year: "2017",
    },
    {
      id: "636793eb60fb463dd5604e2f",
      title: "Man of Steel",
      description:
        "Man of Steel is a 2013 superhero film based on the DC Comics character Superman. Produced by Syncopy, and distributed by Warner Bros.",
      cost: "$42 million",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/5/50/Man_of_Steel_%28film%29_poster.jpg",
      actorsIds: ["6367943460fb463dd5604e30"],
      year: "2013",
    },
    {
      id: "63679dfe60fb463dd5604e31",
      title: "Aquaman",
      description:
        "Aquaman is a 2018 American superhero film based on the DC character of the same name. Produced by DC Films and Peter Safran Productions,",
      cost: "$1.148 billion",
      imageUrl:
        "https://t3.gstatic.com/images?q=tbn:ANd9GcSZQ3UdS40E3IQMiN9aKeTSlyS30Cx757xsgZ51Snz5OjDzq5DI",
      actorsIds: ["63679e2760fb463dd5604e32"],
      year: "2018",
    },
    {
      id: "6367a35a60fb463dd5604e33",
      title: "Shazam",
      description:
        "Shazam! is a 2019 superhero film based on the DC character of the same name, produced by New Line Cinema, DC Films, and the Safran Company",
      cost: "$1 millon",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c2/Shazam%21_%28film%29_poster.jpg",
      actorsIds: ["6367a38560fb463dd5604e34"],
      year: "2019",
    },
  ],
  message: "Fetch movies successfully.",
};

export const movieMock: CustomApiResponse<{}> = {
  success: true,
  data: {
    id: "6367a35a60fb463dd5604e33",
    title: "Shazam",
    description:
      "Shazam! is a 2019 superhero film based on the DC character of the same name, produced by New Line Cinema, DC Films, and the Safran Company",
    cost: "$1 millon",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c2/Shazam%21_%28film%29_poster.jpg",
    actorsIds: ["6367a38560fb463dd5604e34"],
    year: "2019",
  },
  message: "Fetch movie successfully.",
};

export const actorsMock: CustomApiResponse<{}> = {
  success: true,
  data: [
    {
      id: "63651c601602db179d3bd152",
      fname: "Dwayne",
      lname: "Johnson",
      gender: "Male",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/330px-Dwayne_Johnson_2014_%28cropped%29.jpg",
      about:
        "Dwayne Douglas Johnson, also known by his ring name The Rock, is an American-Canadian actor, producer, businessman, former football player, and former professional wrestler.",
      age: "50",
    },
    {
      id: "636648ee3b37860e952ba254",
      fname: "Gal",
      lname: "Gadot",
      gender: "Female",
      imageUrl:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSHfVk6KNx4Ocy5sVJwo0PqVz_g01OM9k2_MNfzTVK07yABwLBi",
      about:
        "Gal Gadot-Varsano is an Israeli actress and model. At age 18, she was crowned Miss Israel 2004. She then served in the Israel Defense Forces for two years as a combat fitness instructor, whereafter she began studying at IDC Herzliya while building her modeling and acting careers. ",
      age: "37",
    },
  ],
  message: "Fetch actors successfully.",
};

export const actorMock: CustomApiResponse<{}> = {
  success: true,
  data: {
    id: "63651c601602db179d3bd152",
    fname: "Dwayne",
    lname: "Johnson",
    gender: "Male",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/330px-Dwayne_Johnson_2014_%28cropped%29.jpg",
    about:
      "Dwayne Douglas Johnson, also known by his ring name The Rock, is an American-Canadian actor, producer, businessman, former football player, and former professional wrestler.",
    age: "50",
  },
  message: "Fetch actor successfully.",
};

export const usersMock: CustomApiResponse<{}> = {
  success: true,
  data: [
    {
      name: "user1",
      email: "user1@mail.com",
      role: "User",
    },
    {
      name: "user2",
      email: "user2@mail.com",
      role: "User",
    },
  ],
  message: "Fetch movies successfully.",
};

export const userMock: CustomApiResponse<{}> = {
  success: true,
  data: {
    name: "user1",
    email: "user1@mail.com",
    role: "User",
  },
  message: "Fetch movie successfully.",
};

export const reviewsMock: CustomApiResponse<{}> = {
  success: true,
  data: [
    {
      id: "63677b05f80591e0f0c7eb28",
      description: "Black Adam is a nice movie",
      isApproved: false,
      userId: "63651c601602db179d3bd152",
      movieId: "6367943460fb463dd5604e30",
      rating: 4,
    },
    {
      id: "63677b05f80591e0f0c7eb28",
      description: "Thisis a nice movie",
      isApproved: false,
      userId: "63651c601602db179d3bd153",
      movieId: "6367943460fb463dd5604e30",
      rating: 3,
    },
  ],
  message: "Fetch reviews successfully.",
};

export const reviewMock: CustomApiResponse<{}> = {
  success: true,
  data: {
    id: "63677b05f80591e0f0c7eb28",
    description: "Thisis a nice movie",
    isApproved: false,
    userId: "63651c601602db179d3bd153",
    movieId: "6367943460fb463dd5604e30",
    rating: 3,
  },
  message: "Fetch review successfully.",
};
