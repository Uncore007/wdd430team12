export type User = {
  id: string;
  email: string;
  password: string;
  role: "customer" | "seller"; // Defines user roles
};
