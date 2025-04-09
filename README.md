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

## Release Process

We follow a structured release workflow to ensure safe and predictable deployments.

### Case 1: Standard Release

1. **Create a release branch from `main`** (if it doesn’t exist yet):

   ```bash
   git checkout main
   git pull origin main
   git checkout -b release/vX.X.X
   ```

2. **Create feature/fix branches** from the release branch:

   ```bash
   git checkout -b [jira-ticket-branch-name] release/vX.X.X
   ```

3. **Open pull requests** from feature/fix branches to `release/vX.X.X`:

   - Wait for **all checks** to pass before merging
   - Use **squash merge** if there are multiple commits
   - Use **rebase merge** if there’s only one commit

4. **Prepare the release**:

   - Create a PR from `release/vX.X.X` to `main`
   - Before merging, bump the version:

     ```bash
     yarn version:patch   # for bug fixes (0.0.X)
     yarn version:minor   # for new features (0.X.0)
     yarn version:major   # for breaking changes (X.0.0)
     ```

   - Push the updated version:

     ```bash
     git push origin release/vX.X.X
     ```

   - Merge the PR into `main` using **rebase only**

5. **Trigger production deployment**:

   ```bash
   git checkout main
   git pull origin main
   git push origin --tags
   ```

---

### Case 2: Infrastructure-Only Changes

If there are **no code updates** and only changes to infrastructure (e.g., environment variables, config values):

- There’s **no need** to create a release branch or bump the version
- Instead, manually **trigger the production deployment workflow**

---

### General Rules

- Always **rebase merge** into `main`
- Use **squash merge** into release branches if there are multiple commits
