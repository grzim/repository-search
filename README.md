# Repository List

## Overview

The project aim is to showcase DDD (Domain-Driven Design) principles within a React application.

## Domains

The project is structured into three main domains:
- **Repository Search UI (Core)**: The central domain focused on presenting repositories to users.
- **API**: Handles all GraphQL communication, encapsulating the business logic for data exchange.
- **Error Handling**: Comprises two subdomains dedicated to managing errors - one for API errors and another for UI errors.

### Repository Search UI

This is the core domain responsible for the primary functionality of displaying repositories to users. It operates independently, using a specific adapter to communicate with the API. The adapter is divided into a fetch function for direct API interaction and a transform function that converts API responses to UI-friendly data.

![Repository Search UI Layers](public%2Flayers.png)

### API

This domain includes all the logic related to GraphQL communication, abstracting the complexities of data exchange from other domains.

### Error Handling

This domain is designed to manage errors, consisting of two subdomains:
- **API Error Module**: Manages errors related to API communication.
- **UI Error Module**: Handles errors presented to the user.

#### API Error Subdomain

API errors are handled by wrapping asynchronous functions with `useWithErrorHandling`, which logs errors without changing the function's original behavior.

```ts
export const client = new ApolloClient({
  uri: apolloClientUri,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env[`REACT_APP_GITHUB_TOKEN`]}`,
  },
});

client.query = withErrorLog(client.query);

```
#### UI Error subdomain
UI error handling requires wrapping the application with an Error Module Provider to effectively manage UI errors.
```tsx
 <ErrorHandlingProvider>{children}</ErrorHandlingProvider>
 ```
`useWithErrorHandling` is used similarly to handle errors, managing side effects like displaying errors to the user.

```ts
const props = useWithErrorHandling(
  usePaginatedResource<Repository>(getGithubReposAdapter),
);
```
## Tests

### Behavioral and unit tests
The project includes behavioral tests for component interactions and unit tests for individual functions, ensuring both the overall application behavior and the utility functions meet the requirements.
To test components interactions in bounded contexts integration tests have been added

### Type transformation testing
To minimize hardcoded types, type transformations are used extensively, with tests ensuring their accuracy and reliability.

Example:
```ts
// src/utils/test/transformations.type-test.ts
type SimpleNestedObject = {
  primaryField: number;
  nestedObject: {
    nestedField: string;
    anotherNestedField: boolean;
  };
};

assertType<ConvertFieldsToSnakeCase<SimpleNestedObject>>({
  primary_field: 1,
  nested_object: {
    nested_field: `value`,
    another_nested_field: true,
  },
});

```

### Maintainability
Test maintainability is enhanced through dynamic test naming


```js
describe(`${RepositoriesContainer.name} component`, () => {
  it(`calls ${useWithErrorHandling.name} on error`, () => {
    /.../
  })
})

```
reusable test functions
```ts
export const expectRepositoriesToBePresent = (repos: Repository[]): void => {
  repos
    .flatMap((repo) => [repo.name, getStargazers(repo), getForks(repo)])
    .forEach((item: string) => {
      expect(screen.getByText(item, { exact: false })).toBeInTheDocument();
    });
};
```
and meta-programming techniques for focused testing.

Example: An object that allows for destructuring at any level without throwing an error.
```ts
const handler: ProxyHandler<Record<string, unknown>> = {
  get: (target, prop) =>
    prop in target
      ? target[prop as keyof typeof target]
      : new Proxy({}, handler),
};

export const anything = new Proxy<Record<string, unknown>>({}, handler) as any;

```

## Models

The application utilizes a variety of models:

- **entities** - primary objects of the domain
- **value objects** - represent descriptive aspects of the domain
- **services** - process domain-specific business rules
- **repositories** - shapes retrieved from the data storage
- **aggregations** - a cluster of domain objects that can be treated as a single unit

## Factories

React hooks are used as factories to aggregate data for asynchronous resources, streamlining data management within the application.
Three factories are implemented:  one for configuring pagination mechanisms, another for creating resources with asynchronous data, and a third dedicated to constructing paginated asynchronous resources. Functionality and scalability is achieved through the inversion of control paradigm.

## Separation of concerns

The project ensures a clear separation of concerns, with pure data transformations and decoupled application components.
In /utils folder pure functions (not associated with any domain) are stored, used later in the application

## Typing

In order to make type system scalable - there are as few hard-coded types as possible and all other types are derived. 

## Components

There are 4 components in the app

![components.png](public%2Fcomponents.png)

## Styling

The MUI library and styled components are used for styling, providing a cohesive and customizable UI.
A theme object is used to manage variables:
```ts
const theme = createTheme({
  spacing: 8,
});

export const themeVariables = {
  spacingBig: `${theme.spacing(2.5)}`,
  background: `#faf9fd`,
};

```
## Development utilities

- **husky** - to run tests on each commit
- **craco** - to handle path aliases
- **prettier** - code formatting
- **jslint** - code linting

## Security

In order not to use API token directly in the frontend code, token is stored in `.env.local` file

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

