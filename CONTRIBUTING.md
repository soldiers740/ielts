# Contributing to Visa Consultant & IELTS/PTE Training Institute

Thank you for your interest in contributing! Please follow these guidelines to ensure smooth collaboration.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Report inappropriate behavior

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature
4. Make your changes
5. Push to your fork
6. Submit a pull request

## Branch Naming Convention

```
feature/description       - New features
fix/description          - Bug fixes
docs/description         - Documentation
refactor/description     - Code refactoring
test/description         - Tests
```

Example: `feature/user-authentication`, `fix/login-button`

## Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

Example:
```
feat(auth): implement JWT authentication

Added JWT token generation and validation.
Users can now login and access protected routes.

Closes #123
```

## Pull Request Process

1. Update README.md with any new features or changes
2. Add tests for new functionality
3. Ensure all tests pass: `npm test`
4. Ensure code follows style guide: `npm run lint`
5. Request review from team members
6. Address review comments
7. Merge only after approval

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test
npm test -- --testNamePattern="test name"
```

## Code Style

We use ESLint and Prettier for code consistency:

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix lint issues
npm run lint:fix
```

## Documentation

- Update relevant `.md` files in `/docs`
- Add JSDoc comments for functions
- Keep README.md up to date
- Document API endpoints

## Reporting Issues

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- System information (OS, Node version, etc.)

## Feature Requests

When requesting features:
- Explain the use case
- Describe the desired behavior
- Provide examples if possible
- Discuss alternatives you've considered

## Questions?

Feel free to:
- Open a GitHub discussion
- Send an email to support@ielts-visa.com
- Check existing documentation

---

Thank you for contributing! 🎉
