# Revalidation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Coding Style

To ensure consistency across formatting of files, we use Prettier. Please ensure you setup your IDE using one of the following tutorials.

In case you haven't done this, there is also now a git-hook to ensure your code updates match the Prettier style:

- Webstorm: `https://prettier.io/docs/en/webstorm.html`
- VSCode: `https://github.com/prettier/prettier`
- Sublime: `https://github.com/danreeves/sublime-prettier`

## Git Hooks

[Local Git Hooks](https://www.atlassian.com/git/tutorials/git-hooks) are managed and maintained using [Husky](https://github.com/typicode/husky).

There is currently one `pre-commit` active githook in the project which can be found within `package.json`. This git hook runs;

1.  **Prettier:** Ensures that the code follows the same style independant of developer. Prettier will restructure your code on every commit.
2.  **Linting:** Ensures typescript and scss code is linted by runing `ng lint`. Any errors occurred during linting will prevent the commit from completing

## State Management

We are using [NGXS](https://www.ngxs.io/) for state management. The [NGXS cli](https://www.ngxs.io/plugins/cli) can be leveraged in order to auto generate files.

Example usage;

```
ngxs --name foo
```

Full options

```
--name name         Store name
--directory path    By default, the prompt is set to the current directory
--folder-name name  Use your own folder name, default: state
--spec boolean      Creates a spec file for store, default: true
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
