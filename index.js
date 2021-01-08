const program = require('commander');
const validetor = require('validator')
const chalk = require('chalk')
const inquire = require('inquirer')
const {addContract,checkMail,listContracts} = require('./contact')

const addQuestons = [
    {
        type: 'input',
        name:'firstName',
        massage:'Type your firstName',
        validate(input){
            if(!input){
                console.log('Please provide Firstname')
            }else{
                return true;
            }
        }
    },
    {
        type: 'input',
        name:'lastName',
        massage:'Type your lastName',
        validate(input){
            if(!input){
                console.log('Please provide lastname')
            }else{
                return true;
            }
        }
    },
    {
        type: 'input',
        name:'email',
        massage:'Type your email',
        async validate(input){
            if(!input || !validetor.isEmail(input)){
                console.log('Please provide a valid email')
            }
            else if(await checkMail( input)){
                console.log(chalk.red.inverse('this Email already exist'))
            }
            else{
                return true;
            }
        }
    },
    {
        type: 'list',
        name:'type',
        massage:'What kind of contract this is?',
        choices:['presonal','professional']
        
    }
]


program.version('0.0.1')
program.description('A Command Line Application')

program
    .command("add")
    .alias('a')
    .description('please add a contract')
    // .requiredOption('-f,--firstName <fname>', 'Type your first name')
    // .requiredOption('-l,--lastName <lname>', 'Type your last name')
    // .requiredOption('-e,--email <email>', 'Type your email')
    // .option('-t,--type <contract>', 'Type your contract', 'personal')
    .action( async () => {
        
         const result = await inquire.prompt(addQuestons)
           addContract(result,result.email)
        
    })



//geting  all contract 
program.command('list')
.alias('l')
.action(async ()=>{
    await listContracts()
})

if (!process.argv[2]) {
    program.help();
}

program.parse(process.argv)

