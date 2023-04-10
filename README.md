# Angular Firebase Auth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.

  This is an Angular application that provides user authentication functionalities such as signup, login, and logout using Firebase as the backend authentication service. The application also includes error handling for Firebase authentication and form validation. Token-based authentication is implemented using sessionStorage to store the token. Additionally, route guards using 'CanActivate' are implemented to protect certain routes, and the localId of the authenticated user is displayed in the dashboard.

## Installation

1-Clone the repository to your local machine using 'git clone'.\
2-Navigate to the project directory using the command line.\
3-Run 'npm install' to install the dependencies.\
4-Update the Firebase configuration in the 'environment.ts' file with your own Firebase project credentials.\
5-Run 'ng serve' to start the development server.\
6-Open your browser and navigate to 'http://localhost:4200/' to see the application in action.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
