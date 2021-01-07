const fs = require('fs')
const chalk = require('chalk')
const util = require('util')
const readFilePromise = util.promisify(fs.readFile)
const writeFilePromise = util.promisify(fs.writeFile)

//lode data from json file
const loadContract = async () => {
    try {
        const data = await readFilePromise('./contracts.json', "utf-8")
        const arr =  JSON.parse(data)
        return arr ;
    } catch (err) {
        return []
    }
}

//marching data 
const addContract = async (contract,email) => {
    //console.log(contract)
    const contracts = await loadContract();
    const exestingCon = await checkMail(email)
    if(exestingCon){
        console.log(chalk.red.inverse('this eamil is already exist'))
    }else{
        contracts.push(contract);
        await saveContract(contracts)
    }
}
//save data to json file
const saveContract = async (contracts) => {
    const contractJson = JSON.stringify(contracts)
    //console.log(contractJson)
    await writeFilePromise('./contracts.json', contractJson)
    console.log(chalk.green.inverse('contract added successfully'))
}

//checking email
const checkMail = async (email)=>{
    const contracts = await loadContract();
    return  contracts.find(everycontract =>{
        return everycontract.email === email;
    })
}

module.exports = {
    addContract
}