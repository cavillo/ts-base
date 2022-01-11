#!/usr/bin/env node
const cp = require('child_process');
const fs = require('fs');
const path = require('path');

let PROJECT_NAME;
let PROJECT_DIR;

const log = (...args) => console.log('|-> ', ...args);
const logError = (...args) => console.error('Error: ', ...args);

const cleanup = () => {
  if (fs.existsSync(PROJECT_DIR)) {
    cp.execSync(`rm -rf ${PROJECT_DIR}`);
  }
};

const handleError = (error) => {
  logError('An error was encountered while executing', error.message);
  cleanup();
  process.exit(1);
};

const init = () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    logError('PROJECT_NAME required');
    process.exit();
  }
  PROJECT_NAME = args[0];
  PROJECT_DIR = path.join(process.cwd(), PROJECT_NAME);

  // check if a folder already exists with this name and fail gracefully
  if (fs.existsSync(PROJECT_DIR)) {
    logError('PROJECT_NAME already exists');
    process.exit();
  }
};

const createProject = () => {
  try {
    log('Creating project directory...');
    cp.execSync(`git clone https://github.com/cavillo/ts-base.git ${PROJECT_NAME} --quiet`);

    // updating package.json
    log('Setting up project...');
    const packageJson = path.join(PROJECT_DIR, 'package.json');
    const json = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
    json.name = PROJECT_NAME;
    json.version = "1.0.0";
    json.author = "";
    json.license = "";
    json.bin = {};

    fs.writeFileSync(packageJson, JSON.stringify(json, null, 2), 'utf8');

    // removing git directory and package lock
    const packageLockJson = path.join(PROJECT_DIR, 'package-lock.json');
    const binDir = path.join(PROJECT_DIR, 'bin');
    const gitDir = path.join(PROJECT_DIR, '.git');
    cp.execSync(`rm -rf ${packageLockJson}`);
    cp.execSync(`rm -rf ${binDir}`);
    cp.execSync(`rm -rf ${gitDir}`);
    cp.execSync(`rm .drone.yml`);

    // installing dependendies
    log('Installing dependendies...');
    cp.execSync(`npm i --prefix ${PROJECT_DIR} --silent`);

    log(`Project [${PROJECT_NAME}] created succesfully! ✅`);
    log('Happy ts coding! 💪');
    log('');

    printHelp(PROJECT_NAME);
  } catch (error) {
    handleError(error);
  }
};

const printHelp = (PROJECT_NAME) => {
  log(`\tcd ${PROJECT_NAME}`);
  log('');
  log('\tnpm run start-ts    run TS');
  log('\tnpm run lint        lint');
  log('\tnpm run test        run tests');
  log('\tnpm run build       build JS');
  log('\tnpm start           run builded JS\n');
};

// Create project
init();
createProject();
