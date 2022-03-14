const { initCmd } = require("./init/init.js");
const { compileCmd } = require("./compile/compile.js");
const { testCmd } = require("./test/test.js");
const { unitTestCmd } = require("./unittest/unittest.js");
const { runCmd } = require("./run/run.js");
const keys = require("./keys/keys.js");
const node = require("./node/node.js");
const { handleVerify } = require("./verify/verify.js");

const initInfo = {
  command: "init",
  describe: "Create a sample project",
  builder: (yargs) => {
    yargs
      .option("dir", {
        alias: "d",
        type: "string",
        default: ".",
        description: "Project directory",
      })
      .version(false);
  },
  handler: initCmd,
};

const compileInfo = {
  command: "compile",
  describe:
    "Compile the smart contracts in the workspace in alphabetical order",
  builder: (yargs) => {},
  handler: compileCmd,
};

const testInfo = {
  command: "test",
  describe: "Run the integration tests",
  builder: (yargs) => {
    yargs.version(false);
  },
  handler: testCmd,
};

const unitTestInfo = {
  command: "unittest",
  describe: "Run smart contracts' unit tests",
  builder: (yargs) => {
    yargs
      .option("quiet", {
        alias: "q",
        type: "boolean",
        default: false,
        description: "Hide cargo log messages",
      })
      .version(false);
  },
  handler: unitTestCmd,
};

const runInfo = {
  command: "run <scriptFilePath>",
  describe: "Run a single script",
  builder: (yargs) => {
    yargs.positional("scriptFilePath", {
      type: "string",
      describe: "Relative file path of the script",
    });
  },
  handler: runCmd,
};

const keysInfo = {
  command: "keys",
  describe: "Manage node's accounts (keys)",
  builder: (yargs) => {
    yargs
      .command(
        "ls",
        "List all accounts in the local node key storage",
        () => {},
        keys.keysListCmd
      )
      .command(
        "add <name>",
        "Add an account to the local node key storage",
        () => {
          yargs.positional("name", {
            type: "string",
            describe: "Account name to be added",
          });
          yargs.option("tty", {
            alias: "t",
            hidden: true,
            type: "boolean",
            default: false,
          });
        },
        keys.keysAddCmd
      )
      .command(
        "rm <name>",
        "Remove an account from the local node key storage",
        () => {
          yargs.positional("name", {
            type: "string",
            describe: "Account name to be deleted",
          });
          yargs.option("force", {
            alias: "f",
            type: "boolean",
            default: false,
            description: "Delete without confirmation",
          });
        },
        keys.keysRmCmd
      )
      .command(
        "fund <name>",
        "Transfer tokens from the default local node faucet to selected account",
        () => {
          yargs.positional("name", {
            type: "string",
            describe: "Account name to be funded",
          });
          yargs.option("tokens", {
            alias: "t",
            type: "string",
            required: true,
            describe:
              "The amount of tokens in acudos. Example: --tokens 100000",
          });
        },
        keys.keysFundCmd
      )
      .demandCommand(1, "No command specified!") // user must specify atleast one command
      .version(false);
  },
};

const nodeInfo = {
  command: "node",
  describe: "Manage a local CUDOS node",
  builder: (yargs) => {
    yargs
      .command(
        "start",
        "Start a fresh local node",
        () => {
          yargs.option("log", {
            alias: "l",
            type: "boolean",
            default: false,
            description: "Continuously output the node logs",
          });
        },
        node.startNodeCmd
      )
      .command(
        "stop",
        "Stop the running local node",
        () => {},
        node.stopNodeCmd
      )
      .command(
        "status",
        "Check if a local node is running",
        () => {},
        node.nodeStatusCmd
      )
      .demandCommand(1, "No command specified!") // user must specify atleast one command
      .version(false);
  },
};

const verifyInfo = {
  command: "verify",
  describe: "used to verify the code-id with given library",
  builder: (yargs) => {
    yargs.option("libname", {
      alias: "l",
      type: "string",
      requiresArg: true,
      description: "library which needs to be verified",
    });
    yargs.option("contractAddress", {
      alias: "c",
      type: "string",
      requiresArg: true,
      description: "Deployed contract present on chain",
    });
  },
  handler: handleVerify,
};

module.exports = {
  initInfo: initInfo,
  compileInfo: compileInfo,
  testInfo: testInfo,
  unitTestInfo: unitTestInfo,
  runInfo: runInfo,
  keysInfo: keysInfo,
  nodeInfo: nodeInfo,
  verifyInfo: verifyInfo,
};
