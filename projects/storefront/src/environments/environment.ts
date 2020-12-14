// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
    apiUrl: 'http://127.0.0.1:8000',
    apiFileUrl: 'http://127.0.0.1:8000',
    apiBckEndUrl: 'http://localhost:4200/',
    //apiBckEndUrl: 'http://34.212.132.27/nsi-app/dist/',
    // apiUrl: 'http://34.212.132.27/api/public/index.php',
    // apiFileUrl: 'http://34.212.132.27/api/public/index.php',
	paypalClientId: 'AfqNKvCkZ4ExY1NKEB0kwrnqpcX7JfZRC1eNr7787k8WizTyOYIwWYCxLrYry28OlLx6v41bDH1NCtA7',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
