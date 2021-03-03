import faker from "faker";

export const genAccounts = (n = 50) => {
  const accounts = [];
  const genders = ["female", "male"];
  const languages = ["English", "French", "German"];

  for (let i = 0; i < n; i++) {
    const fakeAccount = {
      id: faker.random.uuid(),
      avatar: faker.image.dataUri(150, 150),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      address: faker.address.city() + " " + faker.address.streetName(),
      gender: faker.random.arrayElement(genders),
      birthDate: faker.date
        .past(90, new Date(new Date().setYear(new Date().getFullYear() - 18)))
        .getTime(),
      company: faker.company.companyName(),
      github: faker.internet.url(),
      facebook: faker.internet.url(),
      languages: [faker.random.arrayElement(languages)],
      fax: faker.phone.phoneNumber("+7 (###) ###-##-##"),
      phone1: faker.phone.phoneNumber("+7 (###) ###-##-##"),
      phone2: faker.phone.phoneNumber("+7 (###) ###-##-##"),
      skills: ["HTML", "CSS", "JavaScript"],
      additionalInfo: faker.lorem.words(10),
      hobbies: ["art", "sports"],
    };

    fakeAccount.passwordRepeat = fakeAccount.password;
    fakeAccount._key = fakeAccount.id;
    accounts.push(fakeAccount);
  }
  return accounts;
};
