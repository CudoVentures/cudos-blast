#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const commands = require("./commands");
const BlastError = require("../blast-utilities/blast-error");

async function main() {
  await yargs(hideBin(process.argv))
    .scriptName("blast")
    .usage("Usage: $0 <command> [arguments] [command options]")
    .command(commands.initInfo)
    .command(commands.compileInfo)
    .command(commands.testInfo)
    .command(commands.unitTestInfo)
    .command(commands.nodeInfo)
    .command(commands.runInfo)
    .command(commands.keysInfo)
    .command(commands.verifyInfo)
    .demandCommand(1, "No command specified!") // user must specify atleast one command
    .recommendCommands()
    .strict() // checks if the command or optional parameters are specified, if not - user friendly error
    .showHelpOnFail(true) // show help automatically
    .help()
    .fail((message, error) => {
      // yargs error message goes here so this is a way to check if error is from yargs
      if (message) {
        yargs.showHelp();
        console.error(message);
      } else {
        return setImmediate(() => {
          throw error;
        });
      }
      process.exit(1);
    }).argv;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    // Expected erros are thrown as BlastError
    if (error instanceof BlastError) {
      console.error(`${error}`);
    } else {
      console.error("Unexpected exception occured!");
      console.error(error.stack);
    }
    process.exit(1);
  });
