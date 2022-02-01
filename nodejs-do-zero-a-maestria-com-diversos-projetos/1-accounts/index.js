import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';

// Entry point
function main() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que você deseja?',
                choices: [
                    'Criar conta',
                    'Consultar Saldo',
                    'Depositar',
                    'Sacar',
                    'Sair'
                ]
            }
        ])
        .then(answers => {
            switch (answers.action) {
                case 'Criar conta':
                    createAccountMessage();
                    break;
                case 'Consultar Saldo':
                    getBalanceMessage();
                    break;
                case 'Depositar':
                    setBalanceMessage('deposit');
                    break;
                case 'Sacar':
                    setBalanceMessage('withdraw');
                    break;
                case 'Sair':
                    exit();
                    break;
            }
        })
        .catch(err => {
            console.log('Main: ', err);
        });
}

// Show message for create account section
function createAccountMessage() {
    inquirer
        .prompt([
            {
                name: 'name',
                message: 'Qual o nome da conta?'
            }
        ])
        .then(answers => {
            if (!validateUser(answers.name)) {
                createAccount(answers.name);
            } else {
                delayedMessage('Usuário já registrado!', main);
            }
        })
        .catch(err => {
            console.log('createAccountMessage: ', err);
        });
}

// Show message for get balance section
function getBalanceMessage() {
    inquirer
        .prompt([
            {
                name: 'name',
                message: 'Qual o nome da conta?'
            }
        ])
        .then(answers => {
            if (validateUser(answers.name)) {
                getBalance(answers.name);
            } else {
                delayedMessage('Usuário não encontrado!', main);
            }
        })
        .catch(err => {
            console.log('getBalanceMessage: ', err);
        });
}

// Show message for set balance section
function setBalanceMessage(action) {
    inquirer
        .prompt([
            {
                name: 'name',
                message: 'Qual o nome da conta?'
            },
            {
                name: 'amount',
                message: 'Qual o valor?'
            }
        ])
        .then(answers => {
            if (validateUser(answers.name)) {
                setBalance(answers.name, answers.amount, action);
            } else {
                delayedMessage('Usuário não encontrado!', main);
            }
        })
        .catch(err => {
            console.log('setBalanceMessage: ', err);
        });
}

// Creates the user on database
function createAccount(name) {
    let db = JSON.parse(getDatabaseContent());

    db[name] = {
        balance: 0
    };

    setDatabaseContent(db);
    delayedMessage('Usuário registrado!', main);
}

// Get the users balance
function getBalance(name) {
    let db = JSON.parse(getDatabaseContent());
    delayedMessage(`O saldo de ${name} é R$${db[name].balance} reais.`, main);
}

// Set the users balance
function setBalance(name, amount, action) {
    let db = JSON.parse(getDatabaseContent());

    if (action == 'deposit') {
        db[name].balance = parseFloat(db[name].balance) + parseFloat(amount);
        setDatabaseContent(db);
        delayedMessage(`Foi depositado ${amount} na conta de ${name}.`, main);
    } else if (action == 'withdraw') {
        db[name].balance = parseFloat(db[name].balance) - parseFloat(amount);

        if (db[name].balance < 0) {
            delayedMessage('Saldo não disponível.', main);
            return;
        }

        setDatabaseContent(db);
        delayedMessage(`Foi sacado ${amount} na conta de ${name}.`, main);
    } else {
        delayedMessage('Ação não reconhecida.', main);
    }
}

// Checks if the user exists, if so calls a callback or return to the main menu
function validateUser(name) {
    if (!fs.existsSync('db.json')) {
        setDatabaseContent();
    }

    let db = JSON.parse(getDatabaseContent());

    if (db[name]) {
        return true;
    } else {
        return false;
    }
}

// Get data from the db.json
function getDatabaseContent() {
    return fs.readFileSync('./db.json', {encoding: 'utf-8'});
}

// Set data from db.json
function setDatabaseContent(data = '{}') {
    data = JSON.stringify(data);
    fs.writeFileSync('./db.json', data, {encoding: 'utf-8'});
}

// Show a feedback message and calls a callback after 1sec
function delayedMessage(message, callback) {
    console.log(message);

    setTimeout(() => {
        callback();
    }, 1000);
}

// Quit the aplication after 1sec
function exit() {
    console.log(chalk.green('Obrigado por usar nosso app ;)'));

    setTimeout(() => {
        process.exit();
    }, 1000);
}

// Calls the main function
main();
