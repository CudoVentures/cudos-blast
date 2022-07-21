const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')
const { spawnSync } = require('child_process')

const { getPackageRootPath } = require('../../utilities/package-info')
const BlastError = require('../../utilities/blast-error')

async function initCmd(argv) {
  handleCustomDirCreation(argv)
  try {
    await fsExtra.copy(
      path.join(getPackageRootPath(), 'template'),
      argv.dir
    )
  } catch (error) {
    throw new BlastError(`Error copying folder: ${error}`)
  }
  console.log(`Sample project initialized in ${argv.dir !== '.' ? argv.dir : process.cwd()}`)

  console.log('Installing default dependencies...')
  spawnSync(`npm install --prefix "${argv.dir}"`, {
    stdio: 'inherit',
    shell: true
  })
  console.log('Project is ready')
}

function handleCustomDirCreation(argv) {
  if (argv.dir !== undefined && argv.dir !== '' && argv.dir !== '.' && !fs.existsSync(argv.dir)) {
    console.log('Directory does not exist, creating and initializing it...')
    try {
      fs.mkdirSync(argv.dir, { recursive: true })
    } catch (error) {
      throw new BlastError(`Error creating new directory: ${error}`)
    }
  }
}

module.exports = { initCmd: initCmd }
