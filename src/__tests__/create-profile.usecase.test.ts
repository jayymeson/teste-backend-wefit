import { CreateProfileUseCase } from "@/aplication/user-case/create-profile.usecase";
import { CreateProfileDto } from "@/http/dto/create-profile.dto";
import { ProfileRepository } from "@/infra/repositories/profile.repository";
import { ProfileType } from "@/shared/enums/profile-type.enum";
import { Profile } from "@/infra/adapters/orm/typeorm/schemas/profile.schema";

jest.mock("@/infra/repositories/profile.repository");

describe("CreateProfileUseCase", () => {
  let useCase: CreateProfileUseCase;
  let repository: jest.Mocked<ProfileRepository>;

  beforeEach(() => {
    repository = new ProfileRepository() as jest.Mocked<ProfileRepository>;
    useCase = new CreateProfileUseCase(repository);
  });

  it("should create a new PF profile if CPF is unique", async () => {
    const createProfileDto: CreateProfileDto = {
      type: ProfileType.PF,
      cpf: "12345678909",
      name: "João da Silva",
      cell: "+5511987654321",
      phone: "+551134567890",
      email: "joao.silva@example.com",
      address: {
        zipCode: "12345-678",
        street: "Rua das Flores",
        number: "123",
        city: "Rio de Janeiro",
        neighborhood: "Centro",
        state: "RJ",
      },
      termsAccepted: true,
    };

    repository.findByCpfAndType.mockResolvedValue(null);
    repository.create.mockImplementation(async (data: CreateProfileDto) => {
      const profile = new Profile();
      profile.id = "fake-id";
      profile.type = data.type;
      profile.cnpj = data.cnpj || "";
      profile.cpf = data.cpf;
      profile.name = data.name;
      profile.cell = data.cell;
      profile.phone = data.phone;
      profile.email = data.email;
      profile.address = data.address;
      profile.termsAccepted = data.termsAccepted;
      return profile;
    });

    const result = await useCase.execute(createProfileDto);

    expect(repository.findByCpfAndType).toHaveBeenCalledWith(
      "12345678909",
      ProfileType.PF
    );
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining(createProfileDto)
    );
    expect(result).toBeInstanceOf(Profile);
    expect(result.cpf).toBe("12345678909");
    expect(result.type).toBe(ProfileType.PF);
    expect(result.id).toBeDefined();
  });

  it("should throw error if PF profile with CPF already exists", async () => {
    const createProfileDto: CreateProfileDto = {
      type: ProfileType.PF,
      cpf: "12345678909",
      name: "João da Silva",
      cell: "+5511987654321",
      phone: "+551134567890",
      email: "joao.silva@example.com",
      address: {
        zipCode: "12345-678",
        street: "Rua das Flores",
        number: "123",
        city: "Rio de Janeiro",
        neighborhood: "Centro",
        state: "RJ",
      },
      termsAccepted: true,
    };

    const existingProfile = new Profile();
    existingProfile.id = "existing-id";
    existingProfile.type = ProfileType.PF;
    existingProfile.cnpj = "";
    existingProfile.cpf = "12345678909";
    existingProfile.name = "Existing User";
    existingProfile.cell = "+5511987654320";
    existingProfile.phone = "+551134567889";
    existingProfile.email = "existing@example.com";
    existingProfile.termsAccepted = true;
    existingProfile.address = {
      zipCode: "12345-678",
      street: "Rua Existente",
      number: "124",
      city: "Rio de Janeiro",
      neighborhood: "Centro",
      state: "RJ",
    };

    repository.findByCpfAndType.mockResolvedValue(existingProfile);

    await expect(useCase.execute(createProfileDto)).rejects.toThrow(
      "Já existe um perfil PF com este CPF."
    );
    expect(repository.findByCpfAndType).toHaveBeenCalledWith(
      "12345678909",
      ProfileType.PF
    );
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("should create a new PJ profile if CPF and CNPJ combination is unique", async () => {
    const createProfileDto: CreateProfileDto = {
      type: ProfileType.PJ,
      cnpj: "12345678000199",
      cpf: "12345678909",
      name: "Empresa Exemplo LTDA",
      cell: "+5511987654321",
      phone: "+551134567890",
      email: "contato@empresaexemplo.com",
      address: {
        zipCode: "12345-678",
        street: "Av. Empresarial",
        number: "1000",
        city: "São Paulo",
        neighborhood: "Comercial",
        state: "SP",
      },
      termsAccepted: true,
    };

    repository.findByCpfAndCnpj.mockResolvedValue(null);
    repository.create.mockImplementation(async (data: CreateProfileDto) => {
      const profile = new Profile();
      profile.id = "fake-id";
      profile.type = data.type;
      profile.cnpj = data.cnpj || "";
      profile.cpf = data.cpf;
      profile.name = data.name;
      profile.cell = data.cell;
      profile.phone = data.phone;
      profile.email = data.email;
      profile.address = data.address;
      profile.termsAccepted = data.termsAccepted;
      return profile;
    });

    const result = await useCase.execute(createProfileDto);

    expect(repository.findByCpfAndCnpj).toHaveBeenCalledWith(
      "12345678909",
      "12345678000199"
    );
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining(createProfileDto)
    );
    expect(result).toBeInstanceOf(Profile);
    expect(result.cnpj).toBe("12345678000199");
    expect(result.type).toBe(ProfileType.PJ);
  });

  it("should throw error if PJ profile with CPF and CNPJ already exists", async () => {
    const createProfileDto: CreateProfileDto = {
      type: ProfileType.PJ,
      cnpj: "12345678000199",
      cpf: "12345678909",
      name: "Empresa Exemplo LTDA 1",
      cell: "+5511987654321",
      phone: "+551134567890",
      email: "contato1@empresaexemplo.com",
      address: {
        zipCode: "12345-678",
        street: "Av. Empresarial 1",
        number: "10000",
        city: "São Paulo",
        neighborhood: "Comercial",
        state: "SP",
      },
      termsAccepted: true,
    };

    const existingProfile = new Profile();
    existingProfile.id = "existing-id";
    existingProfile.type = ProfileType.PJ;
    existingProfile.cnpj = "12345678000199";
    existingProfile.cpf = "12345678909";
    existingProfile.name = "Existing PJ";
    existingProfile.cell = "+5511987654320";
    existingProfile.phone = "+551134567889";
    existingProfile.email = "existingpj@example.com";
    existingProfile.termsAccepted = true;
    existingProfile.address = {
      zipCode: "12345-678",
      street: "Av. Existente",
      number: "1001",
      city: "São Paulo",
      neighborhood: "Comercial",
      state: "SP",
    };

    repository.findByCpfAndCnpj.mockResolvedValue(existingProfile);

    await expect(useCase.execute(createProfileDto)).rejects.toThrow(
      "Já existe um perfil PJ com este CPF e CNPJ."
    );
    expect(repository.findByCpfAndCnpj).toHaveBeenCalledWith(
      "12345678909",
      "12345678000199"
    );
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("should throw error if type is invalid", async () => {
    const createProfileDto = {
      type: "INVALID_TYPE",
      cpf: "12345678909",
      name: "Invalid Type User",
      cell: "+5511987654321",
      phone: "+551134567890",
      email: "invalid@example.com",
      address: {
        zipCode: "12345-678",
        street: "Rua Inválida",
        number: "125",
        city: "São Paulo",
        neighborhood: "Comercial",
        state: "SP",
      },
      termsAccepted: true,
    } as unknown as CreateProfileDto;

    await expect(useCase.execute(createProfileDto)).rejects.toThrow(
      "Tipo de perfil inválido."
    );
    expect(repository.findByCpfAndType).not.toHaveBeenCalled();
    expect(repository.findByCpfAndCnpj).not.toHaveBeenCalled();
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("should throw error if PJ profile is missing CNPJ", async () => {
    const createProfileDto: CreateProfileDto = {
      type: ProfileType.PJ,
      cpf: "12345678909",
      name: "Empresa Sem CNPJ",
      cell: "+5511987654321",
      phone: "+551134567890",
      email: "semcnpj@example.com",
      address: {
        zipCode: "12345-678",
        street: "Av. Sem CNPJ",
        number: "1000",
        city: "São Paulo",
        neighborhood: "Comercial",
        state: "SP",
      },
      termsAccepted: true,
    };

    await expect(useCase.execute(createProfileDto)).rejects.toThrow(
      "CNPJ é obrigatório para perfis PJ."
    );
    expect(repository.findByCpfAndCnpj).not.toHaveBeenCalled();
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("should throw error if termsAccepted is false", async () => {
    const createProfileDto: CreateProfileDto = {
      type: ProfileType.PF,
      cpf: "12345678909",
      name: "João da Silva",
      cell: "+5511987654321",
      phone: "+551134567890",
      email: "joao.silva@example.com",
      address: {
        zipCode: "12345-678",
        street: "Rua das Flores",
        number: "123",
        city: "Rio de Janeiro",
        neighborhood: "Centro",
        state: "RJ",
      },
      termsAccepted: false,
    };
  
    await expect(useCase.execute(createProfileDto)).rejects.toThrow(
      "Você deve aceitar os termos para continuar."
    );
  
    expect(repository.create).not.toHaveBeenCalled();
  });
  
});
