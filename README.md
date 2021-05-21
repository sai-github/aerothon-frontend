# chmod777-frontend

[![Node.js CI](https://github.com/sai-github/chmod777-frontend/actions/workflows/node.js.yml/badge.svg)](https://github.com/sai-github/chmod777-frontend/actions/workflows/node.js.yml) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setting up and getting started with project

-   `git clone https://github.com/sai-github/chmod777-frontend.git`
-   `cd chmod777-frontend`
-   `yarn install`
-   `yarn start`
-   configure `REACT_APP_BACKEND_URL` and `PORT` in `.env` file
-   to ignore these changes being pushed back to repo run `git update-index --assume-unchanged .env`

## Tips when contributing to the project

-   Preferably use vscode with prettier and eslint extensions (Use local installation of project instead of your global settings)
-   If you are using vscode you may also use format on save feature
-   If you use different editors with different formatting styles, please check if your commits are getting formatted with pre-commit hooks
-   In case there is issue with formatting use `yarn format` to format all your code changes (actually this will format the entire project, assuming the code you started is already formatted it should just be like formatting your changes)
-   Preferabbly use `git rebase` for linear commit history
-   Request review from team members before merging code to `main`

## Available common scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn lint`

Runs eslint on the project and displays the status

Prettier errors are also passed to eslint as error from `eslint-plugin-prettier` in the project

### `yarn format-test`

Runs prettier on project and displays the status

### `yarn format`

Runs prettier on project and formats all matching files in the project

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
