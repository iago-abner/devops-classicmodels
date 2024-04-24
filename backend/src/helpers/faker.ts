import { faker } from "@faker-js/faker";

export function randomPersonData() {
  return {
    nome: faker.person.fullName(),
    cpf: faker.location.zipCode("###.###.###-##"),
    dataNascimento: faker.date.past({ years: 20 }),
    email: faker.internet.email(),
    sexo: faker.person.sex(),
    telefone: faker.phone.number(),
    cargo: {
      nome: faker.person.jobTitle(),
      valorPorHora: faker.number.float({ min: 50, max: 500 }),
    },
    enderecos: {
      numero: faker.number.int({ min: 1, max: 99 }),
      complemento: faker.location.streetAddress(),
      bairro: faker.location.street(),
      cidade: faker.location.state(),
      estado: faker.location.state({ abbreviated: true }),
      cep: faker.location.zipCode("#####-###"),
      rua: faker.location.street(),
    },
  };
}

export const generatePerson = ({ count }: { count: number }) =>
  faker.helpers.multiple(randomPersonData, {
    count,
  });
