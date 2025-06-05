
# Smart Contracts

This directory contains Solana smart contracts (programs) for the wallet application.

## Overview

The smart contracts in this directory provide core functionality for the wallet including:
- Token operations
- Multi-signature wallet operations
- Staking programs
- Custom program interactions

## Prerequisites

Before working with these smart contracts, ensure you have:
- [Rust](https://rustup.rs/) installed
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) installed
- [Anchor Framework](https://project-serum.github.io/anchor/getting-started/installation.html) (recommended)

## Structure

```
smart-contracts/
├── programs/           # Smart contract source code
├── tests/             # Test files
├── migrations/        # Deployment scripts
├── target/           # Compiled programs (auto-generated)
└── Anchor.toml       # Anchor configuration
```

## Development Workflow

1. **Build Programs**
   ```bash
   anchor build
   ```

2. **Test Programs**
   ```bash
   anchor test
   ```

3. **Deploy to Devnet**
   ```bash
   solana config set --url devnet
   anchor deploy
   ```

4. **Deploy to Mainnet**
   ```bash
   solana config set --url mainnet-beta
   anchor deploy
   ```

## Configuration

Update the program IDs in:
- `Anchor.toml` - for deployment configuration
- `src/utils/solanaPrograms.ts` - for frontend integration

## Security Considerations

- Always test on devnet before mainnet deployment
- Use multi-signature wallets for program upgrades
- Implement proper access controls
- Audit code before production deployment

## Contributing

1. Follow Rust and Solana best practices
2. Write comprehensive tests
3. Document all public functions
4. Submit PRs with clear descriptions
