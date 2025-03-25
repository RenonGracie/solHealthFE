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

1. Create a new branch from `develop` for version update:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/vX.X.X
   ```

2. Update the version using one of the following commands:

   ```bash
   yarn version:patch  # for small fixes (0.0.X)
   yarn version:minor  # for new features (0.X.0)
   yarn version:major  # for major changes (X.0.0)
   ```

3. Push the branch and create a pull request to `develop`:

   ```bash
   git push origin release/vX.X.X
   ```

4. After the PR is approved and merged, checkout `develop` and push the tag:
   ```bash
   git checkout develop
   git pull origin develop
   git push origin --tags
   ```

There are two ways to create a new tag:

### 1. Using Automated Commands (Recommended)

First, check your current version:

```bash
cat package.json | grep version
```

Make sure you're on the `develop` branch and all changes are committed:

```bash
git checkout develop
git pull origin develop
git status  # should show "nothing to commit, working tree clean"
```

Then run one of the following commands:

```bash
yarn version:patch  # for small fixes (0.0.X)
yarn version:minor  # for new features (0.X.0)
yarn version:major  # for major changes (X.0.0)
```

Push the changes and the new tag:

```bash
git push origin develop
git push origin --tags
```

### 2. Manual Tag Creation

You can also create a tag manually:

```bash
git tag v1.2.3  # replace with your desired version
git push origin v1.2.3
```

Note: Tags starting with 'v' will trigger the production deployment workflow.

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request to `develop`
4. After merge, follow the release process above if deploying to production
