const program = require('commander');
const {addContract} = require('./contact')
const validetor = require('validator')
const chalk = require('chalk')
program.version('0.0.1')
program.description('A Command Line Application')

program
    .command("add")
    .alias('a')
    .description('please add a contract')
    .requiredOption('-f,--firstName <fname>', 'Type your first name')
    .requiredOption('-l,--lastName <lname>', 'Type your last name')
    .requiredOption('-e,--email <email>', 'Type your email')
    .option('-t,--type <contract>', 'Type your contract', 'personal')
    .action(({
        firstName,
        lastName,
        email,
        type
    }) => {
        
        const result = {
            firstName,
            lastName,
            email,
            type
        }
        if(validetor.isEmail(email)){
            console.log(chalk.blueBright.inverse('name : ' + firstName + "  " + lastName + "  email : " + email + " number-type:  " + type))
            addContract(result,email)
        }else{
            console.log(chalk.red.inverse('Please provide valid email'))
        }
        
    })

if (!process.argv[2]) {
    program.help();
}
program.parse(process.argv)
