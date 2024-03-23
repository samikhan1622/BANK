import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
import chalk from 'chalk';
class Customer {
    constructor(fname, lname, age, gen, acc, mob) {
        this.firstName = fname;
        this.lastName = lname;
        this.age = age;
        this.gender = gen;
        this.accNumber = acc;
        this.mobNUmber = mob;
    }
}
;
;
// Class bank
class Bank {
    constructor() {
        this.customer = [];
        this.account = [];
    }
    addCustomer(obj) {
        this.customer.push(obj);
    }
    ;
    addAccountNumer(obj) {
        this.account.push(obj);
    }
    ;
    transactions(accObj) {
        let newAccounts = this.account.filter((acc) => acc.accNumber !== accObj.accNumber);
        this.account = [...newAccounts, accObj];
    }
    ;
}
;
let SamiBank = new Bank;
// Create Customer
for (let i = 1; i <= 5; i++) {
    let fname = faker.person.firstName('male');
    let lname = faker.person.lastName();
    let mob = parseInt(faker.phone.number());
    const cus = new Customer(fname, lname, 23, "male", 1000 + i, mob);
    SamiBank.addCustomer(cus);
    SamiBank.addAccountNumer({ accNumber: cus.accNumber, balance: 100 * i });
}
;
// Bank Functionality
async function bankServices(bank) {
    do {
        let service = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "please select the service.",
            choices: ["Cash Withdraw", "Cash Deposit", "Veiw balance", "Exit"],
        });
        if (service.select == "Cash Withdraw") {
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "please enter your account number",
            });
            let account = SamiBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold("invalid account number"));
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "input",
                    name: "rupee",
                    message: "please enter your amount",
                });
                if (ans.rupee > account.balance) {
                    console.log(chalk.red.bold(`Dear customer your banlace is incufficent.`));
                }
                let newbalance = account.balance - ans.rupee;
                // Transactions method call
                bank.transactions({ accNumber: account.accNumber, balance: newbalance });
            }
            ;
        }
        ;
        if (service.select == "Cash Deposit") {
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "please enter your account number",
            });
            let account = SamiBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold("invalid account number"));
            }
            ;
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    name: "rupee",
                    message: "please enter your amount",
                });
                let newbalance = account.balance + ans.rupee;
                // Transactions method call
                bank.transactions({ accNumber: account.accNumber, balance: newbalance });
            }
            ;
        }
        ;
        if (service.select == "Veiw balance") {
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "please enter your account number",
            });
            let account = bank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold("invalid account number"));
            }
            ;
            if (account) {
                let name = bank.customer.find((item) => item.accNumber == account?.accNumber);
                console.log(`Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(name?.lastName)} your account balance is ${chalk.blue.bold.blueBright(`$${account.balance}`)}`);
            }
            ;
        }
        ;
        if (service.select == "Exit") {
            return;
        }
        ;
    } while (true);
}
;
bankServices(SamiBank);
