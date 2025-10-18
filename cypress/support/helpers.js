import { faker } from '@faker-js/faker';

export function getRandomNumber() {
  return faker.number.int({ min: 1000, max: 9999 });
}

export function getRandomEmail() {
  return faker.internet.email();
}

export function getRandomName() {
  return faker.person.fullName();
}

export function getRandomUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email()
  };
}
