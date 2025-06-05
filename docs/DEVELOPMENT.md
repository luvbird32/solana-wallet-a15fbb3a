
# Development Guide

This guide helps developers set up, understand, and contribute to the Solana Wallet project.

## 🚀 Quick Setup

### Prerequisites
- **Node.js** (version 18+) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Solana Wallet Extension** - For testing ([Phantom](https://phantom.app/), [Solflare](https://solflare.com/), or [Backpack](https://backpack.app/))

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/solana-wallet.git
cd solana-wallet

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser to http://localhost:5173
```

## 🏗️ Project Architecture

### Frontend Structure
```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components (buttons, cards, etc.)
│   └── [feature]/     # Feature-specific components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── types/             # TypeScript type definitions
├── api/               # Frontend API clients
└── utils/             # Helper functions
```

### Backend Structure
```
backend/
├── services/          # Business logic
├── api/              # API endpoints
├── config/           # Configuration files
├── models/           # Data models
└── utils/            # Backend utilities
```

## 🔧 Development Workflow

### 1. Running the Application

**Development Mode:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

**Testing:**
```bash
npm test            # Run all tests
npm run test:watch  # Run tests in watch mode
npm run test:ui     # Run tests with UI
```

**Code Quality:**
```bash
npm run lint        # Check code style
npm run type-check  # Check TypeScript types
```

### 2. Making Changes

**Component Development:**
1. Create components in appropriate directories
2. Use TypeScript for type safety
3. Follow existing naming conventions
4. Add tests for new components

**Adding New Features:**
1. Plan the feature architecture
2. Create necessary types
3. Implement backend services (if needed)
4. Create frontend components
5. Add tests
6. Update documentation

## 🧩 Key Technologies

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **React Query** - Data fetching and caching

### Blockchain Integration
- **@solana/web3.js** - Solana blockchain interaction
- **Wallet Adapters** - Connect to various wallets

### Testing
- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **Jest DOM** - DOM testing utilities

## 🔌 Key Concepts

### Wallet Connection
```typescript
// Using the wallet hook
const { connected, publicKey, connect, disconnect } = useWallet();

// Connect to wallet
await connect();

// Check connection status
if (connected && publicKey) {
  console.log('Connected to:', publicKey.toString());
}
```

### Token Operations
```typescript
// Search for tokens
const { data: token, isLoading } = useTokenSearch(searchValue, 'address');

// Get token balances
const { data: balances } = useTokenBalances();
```

### API Integration
```typescript
// Frontend API calls
import { searchTokenByAddress } from '@/api/tokenApi';

const token = await searchTokenByAddress('mint-address');
```

## 🎨 UI Development

### Design System
- **Colors**: Consistent color palette defined in Tailwind config
- **Typography**: Standard font sizes and weights
- **Spacing**: Consistent spacing scale
- **Components**: Reusable components from shadcn/ui

### Component Guidelines
```typescript
// Good component structure
interface ComponentProps {
  title: string;
  onAction: () => void;
  isLoading?: boolean;
}

export const MyComponent = ({ title, onAction, isLoading = false }: ComponentProps) => {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onAction} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Action'}
        </Button>
      </CardContent>
    </Card>
  );
};
```

### Responsive Design
- Mobile-first approach
- Use Tailwind responsive classes
- Test on multiple screen sizes
- Ensure touch-friendly interfaces

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Testing utilities
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

test('renders component correctly', () => {
  render(<MyComponent title="Test" onAction={() => {}} />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### Integration Tests
- Test complete user workflows
- Mock wallet connections
- Test API integrations
- Verify error handling

### Manual Testing
- Test with real wallets
- Try different browsers
- Test on mobile devices
- Verify accessibility

## 🔐 Security Practices

### Frontend Security
- Never store private keys
- Validate all user inputs
- Use HTTPS in production
- Implement proper error boundaries

### Wallet Integration
- Use official wallet adapters
- Verify transaction details
- Handle connection errors gracefully
- Respect user privacy

## 📊 Performance

### Optimization Strategies
- Code splitting with React.lazy
- Image optimization
- Bundle size monitoring
- Caching with React Query

### Monitoring
```typescript
// Performance monitoring
console.time('operation');
// ... your code
console.timeEnd('operation');
```

## 🔄 State Management

### React Query for Server State
```typescript
// Caching and synchronization
const { data, isLoading, error } = useQuery({
  queryKey: ['tokens', address],
  queryFn: () => fetchTokenData(address),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### React Hooks for Local State
```typescript
// Local component state
const [isOpen, setIsOpen] = useState(false);
const [selectedToken, setSelectedToken] = useState<Token | null>(null);
```

## 🐛 Debugging

### Common Issues

**Wallet Connection Problems:**
- Check browser console for errors
- Verify wallet extension is installed
- Ensure correct network settings

**Token Display Issues:**
- Verify token addresses
- Check API responses
- Confirm proper error handling

**Build Errors:**
- Check TypeScript types
- Verify import paths
- Ensure all dependencies are installed

### Debugging Tools
- Browser DevTools
- React DevTools extension
- Network tab for API calls
- Console for error messages

## 🚀 Deployment

### Build Process
```bash
# Create production build
npm run build

# Test production build locally
npm run preview
```

### Environment Configuration
- Development: Local development server
- Staging: Testing environment
- Production: Live application

## 📚 Learning Resources

### Solana Development
- [Solana Documentation](https://docs.solana.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Web3.js Guide](https://solana-labs.github.io/solana-web3.js/)

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### UI Development
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

## 🤝 Getting Help

### Development Support
- Check our [Contributing Guide](CONTRIBUTING.md)
- Open an issue for bugs
- Join community discussions
- Review existing code for examples

### Code Review Process
1. Create feature branch
2. Make changes with tests
3. Submit pull request
4. Address review feedback
5. Merge when approved

---

**Happy coding! Remember to test thoroughly and follow our security guidelines.**
