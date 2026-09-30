import { User, IUser } from "./models/user.model";

class AuthRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    return await User.create(userData);
  }
}

export default new AuthRepository();