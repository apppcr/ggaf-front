// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiEndpoint: {
        api: 'http://localhost:3000/api/v1'
    },
    firebaseConfig: {
        apiKey: "AIzaSyBamgpC318vtl2GzH7ZprrBdZItpk5062g",
        authDomain: "ggaf-pcr.firebaseapp.com",
        projectId: "ggaf-pcr",
        storageBucket: "ggaf-pcr.appspot.com",
        messagingSenderId: "872833291085",
        appId: "1:872833291085:web:536ea8a72fef9b27319d04",
        measurementId: "G-026PPLFXYS"
    }, 
    linkSystem: 'http://ggaf.renatobezerra.com.br/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
