// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDQabwr0X3VGv6vH0n9yjMYSec0jhDXij8',
    authDomain: 'ng-ecommerce-mazmi.firebaseapp.com',
    databaseURL: 'https://ng-ecommerce-mazmi.firebaseio.com',
    projectId: 'ng-ecommerce-mazmi',
    storageBucket: 'ng-ecommerce-mazmi.appspot.com',
    messagingSenderId: '884108123'
  }
};
