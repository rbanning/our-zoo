// Creates Angular's environment.ts and environment.prod.ts files from the environment variables
//from https://medium.com/@ferie/how-to-pass-environment-variables-at-building-time-in-an-angular-application-using-env-files-4ae1a80383c

const fs = require('fs');   //was an import statement

// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
const targetProdPath = './src/environments/environment.prod.ts';

// Load node modules
const colors = require('colors');
require('dotenv').config();   //was .load()

const buildConfig = (production: boolean) => {
    return  `export const environment = {
        trelloUrl: '${process.env.TRELLO_URL}',
        trelloApi: '${process.env.TRELLO_API}',
        trelloToken: '${process.env.TRELLO_TOKEN}',
        trelloBoardId: '${process.env.TRELLO_BOARD_ID}',
        trelloListId: '${process.env.TRELLO_LIST_ID}',
        appName: '${process.env.APP_NAME}',
        platform: '${process.env.PLATFORM}',
        production: '${process.env.PRODUCTION || production}'
     };
     `;
};

// `environment.ts` file structure
const envConfigFile = buildConfig(false);
const envProdConfigFile = buildConfig(true);

//environment.ts log setup
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

//write the file
fs.writeFile(targetPath, envConfigFile, (err) => {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});

//environment.prod.ts log setup
console.log(colors.magenta('The file `environment.prod.ts` will be written with the following content: \n'));
console.log(colors.grey(envProdConfigFile));

//write the file
fs.writeFile(targetProdPath, envProdConfigFile, (err) => {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.prod.ts file generated correctly at ${targetProdPath} \n`));
   }
});

//done
