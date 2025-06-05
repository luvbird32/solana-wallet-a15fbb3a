
# Contributing Guide

Thank you for your interest in contributing to the Solana Wallet project! This guide will help you get started.

## 🌟 Ways to Contribute

### For Everyone
- **Report Bugs** - Help us find and fix issues
- **Suggest Features** - Share your ideas for improvements
- **Improve Documentation** - Make our guides clearer
- **Test the App** - Use it and tell us what works or doesn't

### For Developers
- **Fix Bugs** - Tackle open issues
- **Add Features** - Implement new functionality
- **Write Tests** - Help ensure code quality
- **Review Code** - Help review pull requests

## 🚀 Getting Started

### 1. Set Up Your Development Environment

**Requirements:**
- Node.js (version 18 or higher)
- Git
- A Solana wallet extension (for testing)

**Setup Steps:**
```bash
# Clone the repository
git clone https://github.com/your-username/solana-wallet.git

# Navigate to the project
cd solana-wallet

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 2. Understanding the Project Structure

```
solana-wallet/
├── src/                    # Frontend React application
│   ├── components/         # UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   └── types/             # TypeScript type definitions
├── backend/               # Business logic and services
│   ├── services/          # Core business logic
│   ├── api/              # API endpoints
│   └── config/           # Configuration files
└── docs/                 # Documentation
```

## 📝 Contribution Workflow

### 1. Find Something to Work On

**Good First Issues:**
- Look for issues labeled `good first issue`
- Documentation improvements
- UI/UX enhancements
- Bug fixes with clear reproduction steps

**Bigger Projects:**
- New features
- Performance improvements
- Security enhancements

### 2. Before You Start

1. **Check existing issues** - Someone might already be working on it
2. **Open an issue** - Discuss your idea before starting work
3. **Get assignment** - Ask to be assigned to avoid duplicate work

### 3. Making Changes

**Branch Naming:**
- `feature/add-token-search` - for new features
- `fix/wallet-connection-bug` - for bug fixes
- `docs/update-readme` - for documentation

**Code Guidelines:**
- Use TypeScript for type safety
- Follow existing code style
- Write clear, descriptive commit messages
- Add tests for new functionality

### 4. Testing Your Changes

**Before Submitting:**
```bash
# Run tests
npm test

# Check code formatting
npm run lint

# Test the build
npm run build

# Test with a real wallet
# Connect your wallet and try all features
```

**Manual Testing:**
- Connect different wallets (Phantom, Solflare, Backpack)
- Test on different browsers
- Try both desktop and mobile
- Test with real tokens on devnet

### 5. Submitting Your Changes

**Pull Request Checklist:**
- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated (if needed)
- [ ] Manual testing completed
- [ ] Clear PR description

**PR Description Template:**
```markdown
## What This Changes
Brief description of what you changed

## Why This Change
Explain the problem you're solving

## How to Test
Step-by-step testing instructions

## Screenshots (if UI changes)
Before/after images

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Manual testing completed
```

## 🔧 Development Guidelines

### Frontend Development

**Component Guidelines:**
- Keep components small and focused
- Use TypeScript for all components
- Follow React best practices
- Make components reusable when possible

**Styling:**
- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design
- Test on different screen sizes

### Backend Development

**Service Guidelines:**
- Keep business logic in services
- Use proper error handling
- Add JSDoc comments
- Write unit tests

**Security:**
- Never log sensitive data
- Validate all inputs
- Use proper encryption
- Follow security best practices

### Testing

**What to Test:**
- Unit tests for utilities and services
- Component tests for UI interactions
- Integration tests for workflows
- Manual tests with real wallets

**Testing Tools:**
- Vitest for unit tests
- React Testing Library for components
- Manual testing with browser extensions

## 🎨 Design Guidelines

### User Experience
- Keep interactions simple and intuitive
- Provide clear feedback for all actions
- Use consistent terminology
- Consider accessibility

### Visual Design
- Follow the existing color scheme
- Use consistent spacing and typography
- Ensure good contrast ratios
- Test on different devices

## 🔐 Security Considerations

### What We Care About
- Never store private keys or seed phrases
- Validate all user inputs
- Use secure random number generation
- Protect against common web vulnerabilities

### Reporting Security Issues
- **DO NOT** open public issues for security vulnerabilities
- Email security issues privately to [security-email]
- We'll respond within 24 hours

## 🐛 Bug Reports

### Good Bug Reports Include
- **Clear title** - What's wrong in a few words
- **Steps to reproduce** - How to trigger the bug
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Environment** - Browser, wallet, OS details
- **Screenshots** - If it's a visual issue

### Bug Report Template
```markdown
**Summary**: Brief description

**Steps to Reproduce**:
1. Do this
2. Then this
3. See the error

**Expected**: What should happen
**Actual**: What actually happens
**Browser**: Chrome 120, Firefox 115, etc.
**Wallet**: Phantom, Solflare, etc.
```

## 💡 Feature Requests

### Good Feature Requests Include
- **Problem description** - What need does this address?
- **Proposed solution** - How would this work?
- **Alternatives considered** - Other ways to solve this
- **Use cases** - Who would use this and how?

## 🤝 Community Guidelines

### Be Respectful
- Use welcoming and inclusive language
- Respect different viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Communication
- Be clear and concise
- Ask questions when unsure
- Help others learn and grow
- Share knowledge and resources

## 🏆 Recognition

### Contributors
- All contributors are recognized in our README
- Regular contributors may be invited as maintainers
- Outstanding contributions are highlighted

### Types of Contributions We Value
- Code contributions (features, fixes, tests)
- Documentation improvements
- Bug reports and testing
- Community support and mentoring
- Design and UX contributions

## ❓ Questions?

**Need Help?**
- Check our [documentation](../docs/)
- Open a discussion issue
- Ask in our community chat
- Reach out to maintainers

**Not Sure Where to Start?**
- Look for `good first issue` labels
- Ask what needs help in discussions
- Review recent pull requests for examples
- Start with documentation improvements

---

**Thank you for contributing to the Solana Wallet project! Your efforts help make blockchain technology more accessible to everyone.**
