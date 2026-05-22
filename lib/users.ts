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
  {
    id: "3",
    email: "admin@nexus.com",
    password: "password123",
    name: "Nexus Admin",
  },
];

export async function findUserByEmail(email: string) {
  return hardcodedUsers.find((user) => user.email === email) || null;
}
