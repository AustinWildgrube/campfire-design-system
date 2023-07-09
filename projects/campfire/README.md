# Campfire Design System

Campfire is a design language. It creates consistent user experiences within our products. Campfire's UI styles, patterns,
components, and other assets are all reusable. By creating these pre-produced elements,  we can put more emphasis on use cases and business
needs. Campfire is flexible and is meant to help transform into a custom solution.

## Browser support
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## Installation
Install the component library.
```bash
$ npm install usi-campfire
```
Import the component modules you want to use into your `app.module.ts` file and [feature modules](https://angular.io/guide/feature-modules). Campfire uses
secondary entry points for all of its components and omits a primary entry point, meaning each component will need to be imported from its respective folder.

```diff
+ import { UsiAvatarModule } from 'usi-campfire/avatar';
+ import { UsiButtonModule } from 'usi-campfire/button';

@NgModule({
  imports: [
+   UsiAvatarModule,
+   UsiButtonModule 
  ],
})
export class AppModule {
}
```

To pull in Campfire's global CSS variables we need to import the stylesheet into our `angular.json`.
```diff
{
  "styles": [
+   "node_modules/usi-campfire/campfire.css"
  ]
}
```

## Contributing
After cloning `usi-campfire` and running `npm install` to install its dependencies, you may also run the following commands:

1. `npm start` runs the Campfire test app locally.
2. `npm run storybook` runs the Storybook app at `http://localhost:9009`
3. `npm run lint` checks the code style.
4. `npm test` runs the complete test suite.
5. `npm run test:watch [name]` runs some test files and monitors for changes.
6. `npm run build_lib` creates a build of Campfire under publish directory.

### How to Submit a Pull Request
**Before submitting a pull request, please make sure to follow the steps below:**

- If you have fixed a bug or added a feature that should be tested, please add test cases!
- Make sure the test suite passes (`npm run test`).
- Make sure your code lints (`npm run lint`).
- Make sure to rebase your code to keep the history clean.
- Make sure your commit message meet the requirements presented below

After the steps above have been completed please follow the list below.

1. Fork the repository of `usi-campfire`. The latter steps must be done on the forked repository
2. On main: `git remote add upstream https://github.com/AustinWildgrube/campfire-design-system.git`
3. On main: `git pull upstream main`
4. Checkout to the feature branch (for example, if the branch is called docs-fix): `git checkout docs-fix`
5. On docs-fix rebase on main: `git rebase origin/main`
6. On docs-fix resolve codes and commit: `git commit -a`, you need to follow the commit message guidelines
7. Then, push up: `git push` (might need -f, just be sure you understand force pushing before you do it)
8. Submit a Pull Request on the GitHub

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  But also,
we use the git commit messages to **generate the Campfire change log**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

Footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples:

```
docs(changelog): update change log to beta.5
```
```
fix(button): change padding from 8px to 12px

The designers were wanting the padding to match their new style and figured it was time to change it 
in the component library.
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Breaking Changes
If the commit introduces a breaking change, it should include a `!` in the header after the scope. The commit must also include a body describing the breaking
change and what needs to be fixed to accommodate it.

```
feat(button)!: add secondary entry point

The button component needed a secondary entry point to reduce the size of the module. Instead of the button being 
imported from the shared module, it will now be imported from the button folder.
```

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## Release
Perform the following steps to **release** a **new version**:
* Bump the version in `package.json`
* Update the [change log](https://ui.wldgrb.com/?path=/story/changelog--page)
* Merge release branch into `origin/main`
* [Release](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/managing-releases-in-a-repository) the new version in the [usi-campfire
  ](https://github.com/AustinWildgrube/campfire-design-system) repo.
