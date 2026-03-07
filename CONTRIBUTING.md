# Contributing to first-model

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Code of Conduct](#code-of-conduct)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**
- A code editor (VS Code recommended)

### Required Tools

```bash
# Check your versions
node --version
npm --version
git --version
```

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/first-model.git
cd first-model
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your API keys:

```env
OPENAI_API_KEY=your_openai_key_here
GROQ_API_KEY=your_groq_key_here
PORT=3000
NODE_ENV=development
```

**Important**: Never commit your `.env` file!

### 4. Verify Setup

```bash
# Start the development server
npm start

# Test the API
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

---

## How to Contribute

### Types of Contributions We Welcome

- 🐛 **Bug Fixes**: Fix issues or unexpected behavior
- ✨ **New Features**: Add new functionality
- 📝 **Documentation**: Improve README, comments, or guides
- 🎨 **Code Quality**: Refactoring, optimization, cleanup
- 🧪 **Tests**: Add or improve test coverage
- 🔒 **Security**: Security improvements or vulnerability fixes
- 🌐 **Integration**: Add support for new AI models or APIs

### Before You Start

1. **Check existing issues** - Someone may already be working on it
2. **Open an issue first** - Discuss major changes before coding
3. **Keep it focused** - One feature/fix per pull request
4. **Follow conventions** - Match the existing code style

---

## Code Standards

### JavaScript/ES6+ Style

We follow modern JavaScript best practices:

#### General Rules

- Use **ES6+ syntax** (const/let, arrow functions, async/await)
- Use **meaningful variable names**
- Add **comments for complex logic**
- Keep **functions small and focused**
- Use **async/await** over callbacks/promises chains
- Handle **errors properly**

#### Examples

**✅ GOOD:**

```javascript
// Clear, descriptive function name
async function generateAIResponse(userMessage) {
  try {
    // Validate input
    if (!userMessage || typeof userMessage !== 'string') {
      throw new Error('Invalid message format');
    }

    // Call API with proper error handling
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}
```

**❌ BAD:**

```javascript
// Unclear name, no error handling, callback hell
function gr(m, cb) {
  openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: m }]
  }).then(r => {
    cb(r.choices[0].message.content);
  });
}
```

### File Organization

```
first-model/
├── components/           # Reusable components
│   ├── chatHandler.js   # Chat logic
│   ├── validators.js    # Input validation
│   └── utils.js         # Utility functions
├── routes/              # Express routes
│   └── chat.js          # Chat endpoints
├── middleware/          # Express middleware
│   ├── errorHandler.js  # Error handling
│   └── rateLimit.js     # Rate limiting
├── config/              # Configuration
│   └── openai.js        # OpenAI setup
├── index.js             # Entry point
├── server.js            # Server setup
└── .env                 # Environment variables (not committed)
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `chat-handler.js` |
| Variables | camelCase | `userMessage` |
| Constants | UPPER_SNAKE_CASE | `MAX_TOKENS` |
| Functions | camelCase | `generateResponse()` |
| Classes | PascalCase | `ChatService` |
| Components | PascalCase | `MessageHandler` |

### Code Formatting

We use standard JavaScript formatting:

```javascript
// Indentation: 2 spaces
// Quotes: Single quotes for strings
// Semicolons: Required
// Trailing commas: Use in multiline

const config = {
  model: 'llama-3.3-70b-versatile',
  temperature: 0.7,
  maxTokens: 500,  // Trailing comma
};
```

---

## Commit Guidelines

### Commit Message Format

We follow the **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(api): add support for GPT-4` |
| `fix` | Bug fix | `fix(chat): resolve timeout error` |
| `docs` | Documentation | `docs(readme): update installation steps` |
| `style` | Code style/formatting | `style: fix indentation in chat.js` |
| `refactor` | Code refactoring | `refactor(utils): simplify error handling` |
| `test` | Adding/updating tests | `test(api): add chat endpoint tests` |
| `chore` | Maintenance tasks | `chore(deps): update dependencies` |
| `perf` | Performance improvements | `perf(api): optimize response caching` |
| `security` | Security fixes | `security: sanitize user inputs` |

### Examples

**Good Commit Messages:**

```bash
feat(api): add streaming response support

- Implement Server-Sent Events for real-time responses
- Add client-side event listener
- Update documentation with streaming examples

Closes #15

fix(chat): prevent API timeout on long responses

The timeout was occurring because the default was too short.
Increased to 30 seconds and added retry logic.

Fixes #23

docs(contributing): add code style guidelines

Added examples of good and bad code patterns to help
new contributors understand our coding standards.
```

**Bad Commit Messages:**

```bash
# Too vague
fix: bug

# Not descriptive
update stuff

# Missing type
added new feature

# All lowercase, no structure
fixed the thing that was broken
```

### Commit Best Practices

- **Keep commits atomic** - One logical change per commit
- **Write descriptive messages** - Explain what and why
- **Reference issues** - Use `Closes #123` or `Fixes #456`
- **Use imperative mood** - "Add feature" not "Added feature"
- **Separate subject from body** - Blank line between them

---

## Pull Request Process

### 1. Create a Branch

```bash
# Update your fork's main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/add-streaming-support
# or
git checkout -b fix/timeout-error
```

**Branch Naming:**

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring
- `test/description` - Tests

### 2. Make Your Changes

- Write clean, well-commented code
- Follow the code standards above
- Test your changes thoroughly
- Update documentation if needed

### 3. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a good message
git commit -m "feat(api): add streaming response support"
```

### 4. Push to Your Fork

```bash
git push origin feature/add-streaming-support
```

### 5. Open a Pull Request

Go to GitHub and open a pull request with:

**Title**: Clear, descriptive summary
```
feat(api): Add streaming response support
```

**Description Template:**

## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement
- [ ] Security fix

## Changes Made
- Added streaming endpoint at `/api/chat/stream`
- Implemented Server-Sent Events
- Updated client-side to handle streaming
- Added documentation for streaming API

## Testing
- [ ] Tested locally
- [ ] All existing tests pass
- [ ] Added new tests (if applicable)
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots or GIFs demonstrating the change]

## Related Issues
Closes #15

## Checklist
- [ ] My code follows the code style of this project
- [ ] I have updated the documentation accordingly
- [ ] I have added tests to cover my changes
- [ ] All new and existing tests passed
- [ ] My changes generate no new warnings
- [ ] I have checked my code for security issues

### 6. Respond to Feedback

- Address review comments promptly
- Push additional commits to the same branch
- Engage in constructive discussion
- Update your PR description if scope changes

### 7. Merge

Once approved:
- Maintainers will merge your PR
- Your branch will be deleted
- You'll be credited in the release notes

---

## Testing

### Manual Testing

Before submitting, test your changes:

```bash
# Start the server
npm start

# Test basic functionality
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Test message"}'

# Test error handling
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": ""}'

# Test with long messages
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"$(head -c 10000 </dev/urandom | base64)\"}"
```

### Automated Tests (Future)

When we add automated tests:

```bash
# Run all tests
npm test

# Run specific test file
npm test chat.test.js

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### What to Test

- ✅ **Happy path** - Normal expected usage
- ✅ **Edge cases** - Empty inputs, very long inputs
- ✅ **Error handling** - Invalid inputs, API failures
- ✅ **Performance** - Response times, rate limits
- ✅ **Security** - Input validation, injection attempts

---

## Documentation

### Code Comments

**When to Comment:**

- Complex logic or algorithms
- Non-obvious decisions or workarounds
- API usage or external integrations
- Important security or performance considerations

**Examples:**

```javascript
// ✅ GOOD - Explains WHY
// We use a higher temperature for creative tasks but lower for factual queries
const temperature = isCreativeTask ? 0.9 : 0.3;

// Using Groq instead of OpenAI for faster inference on simple queries
const provider = query.length < 100 ? groq : openai;

// ❌ BAD - States the obvious
// Set temperature to 0.7
const temperature = 0.7;

// ❌ BAD - Redundant
// Increment counter by 1
counter++;
```

### README Updates

Update the README when you:

- Add new features
- Change API endpoints
- Modify installation steps
- Add new dependencies
- Change configuration requirements

### API Documentation

Document new endpoints:

```javascript
/**
 * POST /api/chat
 * 
 * Send a message to the AI model and receive a response.
 * 
 * Request Body:
 *   {
 *     "message": string (required, max 5000 chars)
 *   }
 * 
 * Response:
 *   {
 *     "response": string,
 *     "model": string,
 *     "timestamp": string (ISO 8601)
 *   }
 * 
 * Errors:
 *   400 - Invalid or missing message
 *   500 - Server or API error
 *   429 - Rate limit exceeded
 */
router.post('/chat', async (req, res) => {
  // Implementation
});
```

---

## Development Workflow

### Typical Workflow

```bash
# 1. Sync with upstream
git checkout main
git pull upstream main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes
# ... code, code, code ...

# 4. Test changes
npm start
# Manual testing

# 5. Commit
git add .
git commit -m "feat: add my feature"

# 6. Push
git push origin feature/my-feature

# 7. Create PR on GitHub

# 8. Address review feedback
# ... make changes ...
git add .
git commit -m "fix: address review comments"
git push origin feature/my-feature

# 9. Wait for merge
# 10. Celebrate! 🎉
```

### Staying Up to Date

```bash
# Add upstream remote (one time)
git remote add upstream https://github.com/achille010/first-model.git

# Sync your fork
git checkout main
git fetch upstream
git merge upstream/main
git push origin main

# Update your feature branch
git checkout feature/my-feature
git rebase main
git push origin feature/my-feature --force-with-lease
```

---

## Code Review Guidelines

### For Contributors

When your PR is under review:

- **Be responsive** - Reply to comments promptly
- **Be open** - Accept constructive criticism gracefully
- **Be thorough** - Address all review comments
- **Be patient** - Reviews take time
- **Ask questions** - If feedback is unclear, ask for clarification

### For Reviewers

When reviewing PRs:

- **Be constructive** - Suggest improvements, don't just criticize
- **Be specific** - Point to exact lines and explain why
- **Be timely** - Review within a reasonable timeframe
- **Be appreciative** - Acknowledge good work
- **Be thorough** - Check code quality, tests, docs, security

**Review Checklist:**

- [ ] Code follows project standards
- [ ] Changes are well-tested
- [ ] Documentation is updated
- [ ] No security vulnerabilities introduced
- [ ] No hardcoded secrets or credentials
- [ ] Error handling is appropriate
- [ ] Performance is acceptable
- [ ] Code is readable and maintainable

---

## Getting Help

### Resources

- **Documentation**: Check the [README](README.md)
- **Issues**: Search [existing issues](https://github.com/achille010/first-model/issues)
- **Discussions**: Open a discussion for questions
- **Security**: See [SECURITY.md](SECURITY.md) for security concerns

### Questions?

If you're unsure about anything:

1. **Check the docs** - README, CONTRIBUTING, issues
2. **Search issues** - Your question might be answered
3. **Ask in an issue** - Open a new issue with the `question` label
4. **Be specific** - Provide context, code samples, error messages

---

## Recognition

### Contributors

All contributors will be recognized in:

- GitHub contributors list
- Release notes (for significant contributions)
- README acknowledgments (for major features)

### Hall of Fame

Special recognition for:

- First-time contributors
- Multiple substantial contributions
- Security vulnerability reports
- Exceptional code quality or documentation

---

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

**Quick Summary:**

- Be respectful and professional
- Provide constructive feedback
- Accept criticism gracefully
- Focus on collaboration
- Maintain confidentiality (private repository)

---

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

## Thank You! 🙏

Your contributions make this project better for everyone. We appreciate your time and effort!

**Questions or suggestions about this guide?** Open an issue and let us know!

---

**Last Updated**: March 2026  
**Maintained by**: achille010

This CONTRIBUTING.md file includes:

1. ✅ **Complete Development Setup** - Step-by-step instructions
2. ✅ **Code Standards** - Detailed style guide with examples
3. ✅ **Commit Guidelines** - Conventional commits with examples
4. ✅ **PR Process** - Full workflow from branch to merge
5. ✅ **Testing Guide** - How to test changes
6. ✅ **Documentation Requirements** - When and how to document
7. ✅ **Development Workflow** - Typical day-to-day process
8. ✅ **Code Review Guidelines** - For both contributors and reviewers
9. ✅ **Examples** - Good vs bad patterns throughout

It's comprehensive, practical, and encourages quality contributions!