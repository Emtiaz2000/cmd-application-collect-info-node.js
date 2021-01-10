const fs = require('fs')

const chalk = require('chalk')
const util = require('util')
const readFilePromise = util.promisify(fs.readFile)
const writeFilePromise = util.promisify(fs.writeFile)




//lode data from json file
const loadContract = async () => {
    try {
        const data = await readFilePromise('./contracts.json', "utf-8")
        const arr = JSON.parse(data)
        return arr;
    } catch (err) {
        return []
    }
}





//marching data 
const addContract = async (contract, email) => {
    //console.log(contract)
    const contracts = await loadContract();
    const exestingCon = await checkMail(email)
    if (exestingCon) {
        console.log(chalk.red.inverse('this eamil is already exist'))
    } else {
        contracts.push(contract);
        await saveContract(contracts)
        console.log(chalk.green.inverse('contract added successfully'))
    }
}



//save data to json file
const saveContract = async (contracts) => {
    const contractJson = JSON.stringify(contracts)
    //console.log(contractJson)
    await writeFilePromise('./contracts.json', contractJson)

}




//checking email
const checkMail = async (email) => {
    const contracts = await loadContract();
    return contracts.find(everycontract => {
         everycontract.email === email;
    })
}




//return all contract 

const listContracts = async () => {
    const result = await readFilePromise('./contracts.json', 'utf-8');
    console.log(JSON.parse(result))
}



//delete contract from contract.json 
const deleteContract = async (email) => {
    const contracts = await loadContract()
    const contract = await checkMail(email)
    if (!contract) {
        console.log(chalk.red.inverse('no contract to remove'))
    } else {
        const updatedContracts = contracts.filter(contract => contract.email !== email)
        await saveContract(updatedContracts)
        console.log(chalk.green.inverse('Contract successfully remove'))
    }
}



//searching any contract

const findContract = async (email) => {
    const contracts = await loadContract()
    const contract = await checkMail(email)
    if (!contract) {
        console.log(chalk.red.inverse('No contract with that email'))
    } else {
        const getContract = contracts.filter(contract => contract.email === email)
        console.log(getContract)
    }

}


//updateing  contracts method

const updateContract = async (updates, email) => {
    const contracts = await loadContract()

    const checkEmail = await checkMail(email)
    const {
        firstName,
        lastName,
        email: inputEmail,
        type
    } = updates
    console.log(updates)
    if (checkEmail) {
        const updatedcontact = {
            firstName: firstName ? firstName : checkEmail.firstName,
            lastName: lastName ? lastName : checkEmail.lastName,
            email: inputEmail ? inputEmail : checkEmail.email,
            type
        }
        //updated contact 
        const updateEverything = contracts.map(contact => contact.email === email ? (contact = updatedcontact) : contact)
        //save updated contact
        await saveContract(updateEverything)
        console.log(chalk.green.inverse('contact successfully updated'))
    } else {
        console.log(chalk.red.inverse('No contract with that email'))
        console.log(contracts)
    }
}


module.exports = {
    addContract,
    checkMail,
    listContracts,
    deleteContract,
    findContract,
    updateContract

}
