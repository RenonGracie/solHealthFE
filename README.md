# Sol Health

Modern healthcare platform built with cutting-edge technologies.

## Tech Stack

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React 18](https://react.dev/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ESLint](https://eslint.org/) - Static code analysis tool
- [Vitest](https://vitest.dev/) - Next Generation Testing Framework
- [Husky](https://typicode.github.io/husky/) - Git hooks made easy

## Development Setup

1. Install dependencies:

```bash
yarn install
```

2. Start development server:

```bash
yarn dev
```

3. Run tests:

```bash
yarn test
```

## Creating New Tags

⚠️ **Important**: Creating a new tag will trigger the production deployment workflow. Make sure all your changes are committed and tested before creating a tag.

For versioning guidelines, please refer to [Semantic Versioning (SemVer)](https://semver.org/).

### Release Process

1. Create a new branch from `main` for version update:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b release/vX.X.X
   ```

2. Update the version using one of the following commands:

   ```bash
   yarn version:patch  # for small fixes (0.0.X)
   yarn version:minor  # for new features (0.X.0)
   yarn version:major  # for major changes (X.0.0)
   ```

3. Push the branch and create a pull request to `main`:

   ```bash
   git push origin release/vX.X.X
   ```

4. After the PR is approved and merged, checkout `main` and push the tag:

   ```bash
   git checkout main
   git pull origin main
   git push origin --tags
   ```

## Contributing

5. Create a new branch for your feature
6. Make your changes
7. Submit a pull request to `main`
8. After merge, follow the release process above if deploying to production
