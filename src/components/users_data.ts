import { faker } from "@faker-js/faker";

type User = {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
    username: string;
    avatarURL: string;
  };
  bio: {
    dob: string;
    nationality: string;
    phone: number;
  };
  sex: "male" | "female";
  status: "Active" | "Inactive";
  role: string;
  email: string;
  teams: string;
};

function createRandomUser(): User {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const dob = faker.date.birthdate({ max: 40, mode: "age" });

  return {
    _id: faker.string.uuid(),
    name: {
      avatarURL: faker.image.urlPicsumPhotos({ width: 128, height: 128 }),
      firstName,
      lastName,
      username: faker.internet.userName({ firstName }),
    },
    bio: {
      phone: faker.number.int({ min: 1000000000, max: 9999999999 }),
      dob: `${dob.getDate() < 10 ? `0${dob.getDate()}` : `${dob.getDate()}`}-${
        dob.getMonth() < 10 ? `0${dob.getMonth()}` : `${dob.getMonth()}`
      }-${dob.getFullYear()}`,
      nationality: faker.location.country(),
    },
    email,
    sex,
    role: faker.helpers.arrayElement([
      "Product Designmer",
      "Product Manager",
      "Backend Developer",
      "Frontend Developer",
      "UX Designer",
      "UX Copywriter",
      "UI Designer",
      "Fullstack Developer",
      "QA Engineer",
    ]),
    status: faker.helpers.arrayElement(["Active", "Inactive"]),
    teams:
      "Design,Engineering,Marketing,Sales,Support,Operations,Finance",
  };
}

const fakeUsersData: Array<User> = [];
for (let i = 0; i < 100; i++) {
  fakeUsersData.push(createRandomUser());
}
const modifyUser = (user: User) => {
  const index = fakeUsersData.findIndex((u) => u._id === user._id);
  fakeUsersData[index] = user;
}
const deleteUser = (user: User) => {
  fakeUsersData.filter((u) => u._id !== user._id);
}
const fetchData = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    rows: fakeUsersData.slice(start, end),
    rowCount: fakeUsersData.length,
  };
};

export { type User, fetchData, fakeUsersData, modifyUser, deleteUser };
