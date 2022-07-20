var faker = require('faker');

var database = {
  projects: [],
  tutorials: [],
};

for (var i = 1; i <= 300; i++) {
  database.projects.push({
    id: i,
    projectName: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    status: faker.random.number({ min: 1, max: 3 }).toString(),
    clientCompany: faker.company.companyName(),
    projectLeader: faker.name.firstName(),
    estimatedBudget: faker.finance.amount(),
    spentBudget: faker.finance.amount(),
    estimatedDuration: faker.finance.amount(),
  });
  database.tutorials.push({
    id: i,
    title: faker.name.jobTitle(),
    description: faker.lorem.sentences(),
    published: faker.random.boolean(),
  });
}

console.log(JSON.stringify(database));
