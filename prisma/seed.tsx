import prisma from "@/lib/prisma";
// prisma = require("@/lib/prisma");

type User = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phone: string;
  jobs?: object;
};

function getUsers(): Array<User> {
  return [
    {
      name: "uswinnerton0",
      email: "joag0@uiuc.edu",
      password: "lD0=.%JA*",
      isAdmin: false,
      phone: "239 730 8185",
      jobs: {
        create: {
          description: "Pests",
          address: "21 park place",
          warranty: 3
        }
      }
    },
    {
      name: "fgladyer1",
      email: "akiossel1@youtu.be",
      password: "qB5?e6e~O",
      isAdmin: false,
      phone: "606 262 1281",
      jobs: {
        create: {
          description: "Termite",
          address: "21 park place",
          warranty: 2
        }
      }
    },
    {
      name: "hthorn2",
      email: "cunitt2@slate.com",
      password: "eC9+6mvaQ=wO`{+@",
      isAdmin: false,
      phone: "266 165 3058",
      jobs: {
        create: {
          description: "Termite",
          address: "90 smith street",
          warranty: 3
        }
      }
    },
    {
      name: "wbrane3",
      email: "epickring3@hp.com",
      password: 'xX2=HSkCu$$"6B',
      isAdmin: false,
      phone: "336 396 3972",
      jobs: {
        create: {
          description: "Ants",
          address: "90 smith street",
          warranty: 1
        }
      }
    },
    {
      name: "Rene",
      email: "rene@gmail.com",
      password: "Rene1234!",
      isAdmin: true,
      phone: "123 456 7890",
    },
    {
      name: "David Kim",
      email: "dhskim22@gmail.com",
      password: "abc123!",
      isAdmin: true,
      phone: "139 730 8185",
    },
    {
      email: "bao4ltyfe@gmail.com",
      name: "bao",
      password: "123Abc",
      isAdmin: true,
      phone: "123-231-3344",
    },
  ];
}

async function main() {

  await prisma.user.deleteMany();
  await prisma.job.deleteMany();

  const userData = getUsers();
  try {
    for (let user of userData) {
      let newUser = await prisma.user.create({
        data: user,
      });
      console.log("User created:", newUser)
    }
  } catch (error) {
    console.error("Error creating users: ", error)
  }

}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
