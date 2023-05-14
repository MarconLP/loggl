<p align="center">
  <h3 align="center">Loggl</h3>

  <p align="center">
    The self-hostable LogSnag alternative.
    <br />
    <a href="https://loggl.net"><strong>Learn more »</strong></a>
  </p>

<p align="center">
  <a href='https://github.com/MarconLP/loggl/stargazers'><img src='https://img.shields.io/github/stars/MarconLP/loggl'  alt='Github Stars'/></a>
  <!--<a href="https://news.ycombinator.com/item?id=34279062"><img src="https://img.shields.io/badge/Hacker%20News-352-%23FF6600" alt="Hacker News"></a>-->
  <a href="https://github.com/MarconLP/loggl/pulse"><img src="https://img.shields.io/github/commit-activity/m/MarconLP/loggl" alt="Commits-per-month"></a>
  <a href="https://loggl.net"><img src="https://img.shields.io/badge/Pricing-Free-brightgreen" alt="Pricing"></a>
  <a href="https://twitter.com/Marcon565"><img src="https://img.shields.io/twitter/follow/Marcon565?style=flat" alt='twitter'></a>
</p>

<p align="center">
  <a href="https://loggl.net">Website</a> - <a href="https://github.com/MarconLP/loggl/issues">Issue</a> - <a href="https://github.com/MarconLP/loggl/issues/new">Bug report</a>
</p>

## Loggl

Loggl is an self-hostable product analytics product. Automate the collection of every event on your website or app, with no need to send data to 3rd parties. 

![product cover](https://github.com/marconlp/loggl/blob/main/cover.png)

## Development

### Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/MarconLP/loggl/fork). If you plan to distribute the code, make sure to comply with our `LICENSE.md`.

   ```sh
   git clone https://github.com/MarconLP/loggl.git
   ```

2. Go to the project folder

   ```sh
   cd loggl
   ```

3. Install packages with yarn

   ```sh
   npm i
   ```

4. Set up your .env file
   - Duplicate `.env.example` to `.env`
   - Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the .env file.
   - <details>
     <summary>Fill in the other variables</summary>
        <details>
        <summary>Configure DATABASE_URL</summary>

      1. Open [Railway](https://railway.app/) and click "Start a New Project", and select Provision "PostgreSQL".
      2. Select the Postgres App and copy the `DATABASE_URL` into the `.env`.

        </details>
        <details>
        <summary>Obtaining the Github API Credentials</summary>

      1. Open [Github Developer Settings](https://github.com/settings/apps).
      2. Next, go to [OAuth Apps](https://github.com/settings/developers) from the side pane. Then click the "New OAuth App" button. Make sure to set `Authorization callback URL` to `<Loggl URL>/api/auth/callback/github` replacing Loggl URL with the URI at which your application runs.
      3. Copy the `Client ID` as `GITHUB_ID` into the `.env`.
      4. Next, click "Generate a new client secret" and copy the `Client secret` as `GITHUB_SECRET` into the `.env`.

        </details>
        <details>
        <summary>Obtaining the Firebase Credentials</summary>

      1. TODO: ADD Firebase documentation

        </details>
     </details>

5. Run (in development mode)

   ```sh
   npm run dev
   ```

[//]: # (### E2E-Testing)

[//]: # (Be sure to set the environment variable `NEXTAUTH_URL` to the correct value. If you are running locally, as the documentation within `.env.example` mentions, the value should be `http://localhost:3000`.)

[//]: # (```sh)

[//]: # (# In a terminal just run:)

[//]: # (npm run test:e2e)

[//]: # (```)

## Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMarconLP%2Floggl&env=DATABASE_URL,NEXTAUTH_SECRET,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET)

[//]: # (## Contributing)
[//]: # (Please see our contributing guide at `CONTRIBUTING.md`)

## License
Distributed under the Sustainable Use License. See `LICENSE.md` for more information.