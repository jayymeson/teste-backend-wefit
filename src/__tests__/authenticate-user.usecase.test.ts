import { AuthenticateUserUseCase } from "@/aplication/user-case/authenticate-user.usecase";
import { LoginDto } from "@/http/dto/login.dto";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("AuthenticateUserUseCase", () => {
  let useCase: AuthenticateUserUseCase;

  beforeEach(() => {
    useCase = new AuthenticateUserUseCase();
  });

  it("should authenticate user with correct credentials", async () => {
    const loginDto: LoginDto = {
      email: "wefit@wefit.com",
      password: "senha_root_123",
    };

    (jwt.sign as jest.Mock).mockReturnValue("fake_jwt_token");

    const result = await useCase.execute(loginDto);

    expect(result).toEqual({ token: "fake_jwt_token" });
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: loginDto.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );
  });

  it("should throw error with incorrect email", async () => {
    const loginDto: LoginDto = {
      email: "wrong@wefit.com",
      password: "senha_root_123",
    };

    await expect(useCase.execute(loginDto)).rejects.toThrow("Invalid credentials");
  });

  it("should throw error with incorrect password", async () => {
    const loginDto: LoginDto = {
      email: "wefit@wefit.com",
      password: "wrong_password",
    };

    await expect(useCase.execute(loginDto)).rejects.toThrow("Invalid credentials");
  });
});
