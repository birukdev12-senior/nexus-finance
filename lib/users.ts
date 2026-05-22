export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

const hardcodedUsers: User[] = [
  {
    id: "1",
    email: "patient@test.com",
    password: "password123",
    name: "John Patient",
  },
  {
    id: "2",
    email: "doctor@test.com",
    password: "password123",
    name: "Dr. Jane Smith",
  },
];

export async function findUserByEmail(email: string) {
  return hardcodedUsers.find((user) => user.email === email) || null;
}
