import authRepository from "./auth.repository";
import { hashPassword, comparePassword } from "./utils/password";
import { generateToken } from "./utils/jwt";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

class AuthService {
  async register(data: RegisterInput) {
    const { name, email, password } = data;

    const existingUser = await authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await authRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async login(data: LoginInput) {
    const { email, password } = data;

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user._id.toString());

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    };
  }

  async getProfile(userId: string) {
  const user = await authRepository.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
}

export default new AuthService();