# The Looking Glass

## Users

| username    | password |     persona |
|-------------|:--------:|------------:|
| adminuser   |   1234   |       admin |
| editoruser  |   1234   |      editor |
| normaluser1 |   1234   |        user |

## Redux

Redux was setup to handle the global state of the user authentication. Login logic was handled there, with the currently logged in user and persona stored in the the global state. Borrowed books are also stored in the global state for future components to use.

Logic and state pertaining only to each individual components were contained within the components itself instead of into redux. If time permitted, a state machine (ie. xstate) would have been used to manage individual component logic and state.

## Project Structure

```
project
│   node_modules
│   public
│   └───data // mock json responses with hardcoded data
│   src
|   └───app
│   |    └───hooks.ts
|   |    └───store.ts
│   └───components // individual screens/features
│   |       └───analytics
│   |       └───auth
|   |       └───books
|   |       └───user-management
|   |       └───common // reusable components
|   |       └───layouts // skeleton for app ui
|   └───App.tsx
|   └───index.tsx
```

## Code Implementation

- Created mock data contained in json files that can be obtained to the frontend through a fetch request, allowing easy switching to a real fetch response in the future.
- Created base layouts and authentication, as these act as the backbone to the entire app
  - Feature routes are handled through AuthRedirection
- Implemented each screen

## Scalability

The project is scalable as only global logic and state data are kept inside the reducer. Everything that pertains only to an individual screen/component are kept within that component itself. As mentioned previously, this would be further optimised through the use of state machines, to separate UI from logic.

Future features can be implemented by simply making a folder in components to contain the .tsx and service, then a route added to it within the AuthRedirection component.
