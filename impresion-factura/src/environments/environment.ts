// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  /*
  production: false,
  baseUrl: "http://localhost:4200/",
  clientUrl: "http://localhost:4200/",
  */

  // Para prod porque no logro cambiar los environments
  production: true,
  baseUrl: "http://192.168.0.214:8070/",
  clientUrl: "http://192.168.0.214:8070/",

};

