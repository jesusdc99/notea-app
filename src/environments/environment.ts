// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAx0VnoGQuySdb3zv6v1uwSoQPP9q1zqMU",
    authDomain: "notea-app.firebaseapp.com",
    databaseURL: "https://notea-app.firebaseio.com",
    projectId: "notea-app",
    storageBucket: "notea-app.appspot.com",
    messagingSenderId: "201939165867",
    appId: "1:201939165867:web:9d5f6ad311c61837098dee"
  },
  collection: "todo",
  weatherConfig: {
    apiKey: '70dcc262c44ebb77af9b3125b25de986',
    defaultLocation: 'Cordoba',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
