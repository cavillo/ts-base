#!/bin/sh

# Installing dependencies
npm i

# Removing extra files
rm -rf .git
rm -rf init.sh

echo "Project ${PROJECT_NAME} is ready!"
echo "  cd ${PROJECT_NAME}"
echo ""
echo "- Run TS:    npm run start-ts"
echo "- Lint:      npm run lint"
echo "- Run tests: npm run test"
echo "- Build JS:  npm run build"
echo "- Run JS:    npm start"