## External APIs
- [Joke API](https://jokeapi.dev)
- [Azure Translation API](https://learn.microsoft.com/en-us/azure/cognitive-services/translator/)

## Deployment
- Deployed the website on Azure Static Web Apps
- Github workflow file for pushing code to Azure

## Environment Variables
To run this website, you will need:
```
REACT_APP_TRANSLATOR_KEY=
REACT_APP_TRANSLATOR_ENDPOINT=
REACT_APP_JOKE_API=
```
You will need to create a Translator resource on Azure to get the first two variables.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
