# z-cli
This repo builds a cli search application which allows a user to search across different types of entities. To get an initial help on how to use this app, run `npm install` and then `npm start`. This should show basic help.

To get help on each entity search, run `npm run search:<entity>`. This should show instructions on how to search on a specific entity and all allowed searchable fields.

## Testing
Unit tests are included and can be run using `npm test`. A [CI pipeline](https://github.com/venkatramachandran/z-cli/blob/main/.github/workflows/build.yml) is included which runs tests on every commit to `main` branch and all PRs to the `main` branch.
