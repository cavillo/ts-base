#!/usr/bin/env node
const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const log = (...args) => console.log('|-> ', ...args);

const cleanup = () => {
  console.log('Cleaning up...');
  const projectDir = path.join(__dirname, '..', projectName);
  if (fs.existsSync(projectDir)) {
    cp.execSync(`rm -rf ${projectDir}`);
  }
};

const handleError = (error) => {
  console.error('Error: An error was encountered while executing');
  console.error(error);
  cleanup();
  console.log('Exiting...');
  process.exit(1);
};

const createProject = () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Error: PROJECT_NAME required');
    process.exit();
  }
  const projectName = args[0];
  const projectDir = path.join(__dirname, '..', projectName);

  // check if a folder already exists with this name and fail gracefully
  if (fs.existsSync(projectDir)) {
    console.error('Error: PROJECT_NAME already exists');
    process.exit();
  }

  try {
    console.log('|-> Creating project directory...');
    cp.execSync(`git clone https://github.com/cavillo/ts-base.git ${projectName} --quiet`);

    // updating package.json
    console.log('|-> Setting up project...');
    const packageJson = path.join(projectDir, 'package.json');
    const json = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
    json.name = projectName;
    json.version = "1.0.0";
    json.author = "";
    json.license = "";

    fs.writeFileSync(packageJson, JSON.stringify(json, null, 2), 'utf8');

    // removing git directory and package lock
    const packageLockJson = path.join(projectDir, 'package-lock.json');
    const binDir = path.join(projectDir, 'bin');
    const gitDir = path.join(projectDir, '.git');
    cp.execSync(`rm -rf ${packageLockJson}`);
    cp.execSync(`rm -rf ${binDir}`);
    cp.execSync(`rm -rf ${gitDir}`);

    // installing dependendies
    console.log('|-> Installing dependendies...');
    cp.execSync(`npm i --prefix ${projectDir} --silent`);

    console.log(`|-> Project [${projectName}] created succesfully! ✅`);
    console.log('|-> Happy ts coding! 💪\n');

    printHelp(projectName);
  } catch (error) {
    handleError(error);
  }
};

const printHelp = (projectName) => {
  console.log(`\tcd ${projectName}\n`);
  console.log('\tnpm run start-ts    run TS');
  console.log('\tnpm run lint        lint');
  console.log('\tnpm run test        run tests');
  console.log('\tnpm run build       build JS');
  console.log('\tnpm start           run builded JS\n');
};

// Create project
createProject();
