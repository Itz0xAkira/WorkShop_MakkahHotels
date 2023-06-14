import { addUser, User } from "./src/user";

let NewUser: User = {
  groupNumber: 1,
  firstName: "Ahmed",
  lastName: "Omar",
  passport: "A1234",
  dateOfBirth: "1/1/2000",
  isMale: true,
  digitalIdentityURL: "1234",
  phoneNumber: "102412",
};

addUser(NewUser);
