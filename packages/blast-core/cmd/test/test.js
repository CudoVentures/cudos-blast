const path = require('path')
const fs = require('fs')
const { spawnSync } = require('child_process')
const BlastError = require('../../utilities/blast-error')
const {
  getPackageRootPath,
  getProjectRootPath
} = require('../../utilities/package-info')
const { checkNodeOnline } = require('../../utilities/get-node-status')

const JS_TESTS_FOLDER_NAME = 'tests'

async function testCmd(argv) {
  const testDir = path.join(getProjectRootPath(), JS_TESTS_FOLDER_NAME)
  const globalsPath = path.join(getPackageRootPath(), 'lib/bre.js')

  if (!fs.existsSync(testDir)) {
    throw new BlastError('No tests folder found! Make sure to place your JavaScript tests in /' +
    JS_TESTS_FOLDER_NAME)
  }
  await checkNodeOnline(argv.network)
  const silent = argv.silent ? '--silent' : ''
  console.log('Running JavaScript tests...')

  process.env.BLAST_NETWORK = argv.network ?? ''
  // here JEST uses only initial globals file setup. process.env (not globals) persist through the new spawned process
  spawnSync(`npx --no --prefix "${getPackageRootPath()}" jest "${testDir}" ` +
    `--setupFilesAfterEnv="${globalsPath}" --testTimeout=15000 ${silent} --detectOpenHandles`,
  {
    stdio: 'inherit',
    shell: true
  })
}

module.exports = { testCmd: testCmd }
