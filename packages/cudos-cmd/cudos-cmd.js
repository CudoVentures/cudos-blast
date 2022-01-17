#!/usr/bin/env node

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const commands = require('./commands')
const CudosError = require('../cudos-utilities/cudos-error')

async function main() {
  await yargs(hideBin(process.argv))
    .scriptName('cudos')
    .version()
    .usage('$0 <cmd> [args]')
    .command(commands.initInfo)
    .command(commands.compileInfo)
    .command(commands.testInfo)
    .command(commands.unitTestInfo)
    .command(commands.nodeInfo)
    .command(commands.runInfo)
    .command(commands.keysInfo)
    .demandCommand(1, 'No command specified!') // user must specify atleast one command
    .recommendCommands()
    .strict() // checks if the command or optional parameters are specified, if not - user friendly error
    .showHelpOnFail(true) // show help automatically
    .help()
    .fail((message, error) => {
      // yargs error message goes here so this is a way to check if error is from yargs
      if (message) {
        yargs.showHelp()
        console.error(message)
      } else {
        return setImmediate(() => { throw error })
      }
      process.exit(1)
    })
    .argv
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    if (error instanceof CudosError) {
      console.error(`${error}`)
    } else {
      console.error('Unexpected exception occured!')
      console.error(error.stack)
    }
    process.exit(1)
  })
