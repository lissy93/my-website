<h1 align="center">✨ My Website</h1>
<p align="center">
  <i>My personal site, with projects, posts and a contact form</i><br>
  🌐 <b><a href="https://aliciasykes.com">aliciasykes.com</a></b>
</p>
<p align="center">
  <a href="https://aliciasykes.com"><img width="64" src="static/favicon.svg" /></a>
</p>

This is my personal website. It's configurable, so feel free to use it, or any parts of it for yourself :)

---

### Developing

#### Prerequisites

You'll need Node.js 22+ and Git installed, and optionally Docker.<br>
The site is built with SvelteKit + Svelte 5, in TypeScript.

#### Setup Commands

```
git clone git@github.com:Lissy93/my-website.git
cd my-website
npm install
npm run dev
```

<details>
  <summary><h4>Project Commands</h4></summary>

- `npm run dev` - Starts the dev server, with hot reload
- `npm run build` - Builds the site for production
- `npm run preview` - Previews the production build locally
- `npm start` - Starts the Node server (build required first)
- `npm run check` - Type checks with svelte-check
- `npm run lint` - Checks formatting and linting with Prettier and ESLint
- `npm run format` - Fixes formatting with Prettier

</details>

---

### Configuring

Site info, socials, RSS feeds and contact options are in [`src/lib/config.ts`](src/lib/config.ts).<br>
Bio and projects are in [`src/lib/content.ts`](src/lib/content.ts).<br>
Secrets (GitHub token, mail API key) go in `.env`. Copy [`.env.example`](.env.example) to get started, each one is explained in there.

---

### Deploying

#### Option 1 - Cloud

Fork the repo, and import it into Vercel or Netlify. The right adapter gets picked automatically.

#### Option 2 - Docker

Run `docker compose up --build`<br>
Or build the image with `docker build -t my-website .`, then start it with `docker run -p 3000:3000 -e ORIGIN=http://localhost:3000 my-website`

#### Option 3 - Node

Follow the dev steps above, then run `npm run build`.<br>
You can then start the server with `node build`.

When self-hosting, set `ORIGIN` to the URL the site is served from

---

### License

Licensed under [MIT](LICENSE).<br>

<!-- License + Copyright -->
<p  align="center">
  <i>© <a href="https://aliciasykes.com">Alicia Sykes</a> 2012 - 2026</i><br>
  <i>Licensed under <a href="https://gist.github.com/Lissy93/143d2ee01ccc5c052a17">MIT</a></i><br>
  <a href="https://github.com/lissy93"><img src="https://cdn.as93.net/84m3gc?w=56" /></a><br>
  <sup>Thanks for visiting :)</sup>
</p>

<!-- Dinosaur -->
<!--
                        . - ~ ~ ~ - .
      ..     _      .-~               ~-.
     //|     \ `..~                      `.
    || |      }  }              /       \  \
(\   \\ \~^..'                 |         }  \
 \`.-~  o      /       }       |        /    \
 (__          |       /        |       /      `.
  `- - ~ ~ -._|      /_ - ~ ~ ^|      /- _      `.
              |     /          |     /     ~-.     ~- _
              |_____|          |_____|         ~ - . _ _~_-_
-->
