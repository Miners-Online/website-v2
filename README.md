# Website V2
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

New and improved version of our website

## Getting Started

1. In the `core` directory, create a new environment file called `.env.local`.
2. Navigate to <https://github.com/settings/developers> and create a new OAuth app.
    - Set the authorization callback URL to `http://localhost:3000/api/auth/callback/github`.
3. Add your app's client id and secret and the following variable to your `.env.local` file:

    ```yaml
    GITHUB_APP_CLIENT_ID=xxx
    GITHUB_APP_SECRET=xxx
    NEXTAUTH_SECRET=xxx
    ```

    For the `NEXTAUTH_SECRET`, you can generate a random value in the command line via this `openssl` command:

    ```shell
    openssl rand -base64 32`
    ```

4. Finally, install all the dependencies, and start running the app. **Make sure you are in the `core` directory!**

    ```shell
    npm install
    # then
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🧞 Commands

All commands are run from the `/core` folder of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run start`           | Preview your build locally, before deploying     |
| `npm run lint`            | Performs TypeScript checks                       |

## License

This repository is licensed with the Miners Online Public Software License see [LICENSE.md](./LICENSE.md) for more details.

For third-party licenses see [docs/third-party/README.md](./docs/third-party/README.md).

## Contributors ✨

Thanks go to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://minersonline.uk/"><img src="https://avatars.githubusercontent.com/u/41990982?v=4?s=100" width="100px;" alt="Samuel Hulme"/><br /><sub><b>Samuel Hulme</b></sub></a><br /><a href="https://github.com/Miners-Online/base-repository/commits?author=ajh123" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://allcontributors.org"><img src="https://avatars.githubusercontent.com/u/46410174?v=4?s=100" width="100px;" alt="All Contributors"/><br /><sub><b>All Contributors</b></sub></a><br /><a href="https://github.com/Miners-Online/base-repository/commits?author=all-contributors" title="Documentation">📖</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome!
