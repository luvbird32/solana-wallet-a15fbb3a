
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

/// # Wallet Program
/// 
/// A Solana program that provides basic wallet functionality including:
/// - Wallet initialization with owner authentication
/// - Secure token transfers with ownership verification
/// - Transaction counting and wallet information retrieval
/// 
/// This program uses Program Derived Addresses (PDAs) to create deterministic
/// wallet accounts tied to specific owners.
#[program]
pub mod wallet_program {
    use super::*;

    /// Initialize a new wallet account for a user
    /// 
    /// Creates a new wallet PDA (Program Derived Address) that is uniquely tied
    /// to the provided owner's public key. The wallet stores the owner's key,
    /// a bump seed for the PDA, and a transaction counter.
    /// 
    /// # Arguments
    /// * `ctx` - The context containing all required accounts
    /// * `bump` - The bump seed used to derive the wallet PDA
    /// 
    /// # Returns
    /// * `Result<()>` - Success or error result
    /// 
    /// # Security
    /// - Only the specified owner can initialize their wallet
    /// - Uses PDA to ensure wallet uniqueness per owner
    /// - Requires owner signature for initialization
    pub fn initialize_wallet(ctx: Context<InitializeWallet>, bump: u8) -> Result<()> {
        let wallet = &mut ctx.accounts.wallet;
        wallet.owner = ctx.accounts.owner.key();
        wallet.bump = bump;
        wallet.transaction_count = 0;
        
        msg!("Wallet initialized for owner: {}", wallet.owner);
        Ok(())
    }

    /// Transfer tokens from one account to another
    /// 
    /// Performs a secure token transfer with ownership verification.
    /// Only the wallet owner can initiate transfers from their associated
    /// token accounts. Updates the transaction counter after successful transfer.
    /// 
    /// # Arguments
    /// * `ctx` - The context containing all required accounts for the transfer
    /// * `amount` - The amount of tokens to transfer (in smallest denomination)
    /// 
    /// # Returns
    /// * `Result<()>` - Success or error result
    /// 
    /// # Security
    /// - Verifies that the signer owns the wallet
    /// - Uses Cross-Program Invocation (CPI) for token transfers
    /// - Increments transaction count for audit trail
    /// 
    /// # Errors
    /// - `WalletError::Unauthorized` if signer is not the wallet owner
    pub fn transfer_tokens(
        ctx: Context<TransferTokens>,
        amount: u64,
    ) -> Result<()> {
        let wallet = &ctx.accounts.wallet;
        
        // Verify ownership - critical security check
        require!(
            wallet.owner == ctx.accounts.owner.key(),
            WalletError::Unauthorized
        );

        // Perform the token transfer via CPI to the SPL Token program
        let cpi_accounts = Transfer {
            from: ctx.accounts.from_token_account.to_account_info(),
            to: ctx.accounts.to_token_account.to_account_info(),
            authority: ctx.accounts.owner.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        token::transfer(cpi_ctx, amount)?;

        // Update transaction count
        let wallet = &mut ctx.accounts.wallet;
        wallet.transaction_count += 1;

        msg!("Transferred {} tokens. New transaction count: {}", amount, wallet.transaction_count);
        Ok(())
    }

    /// Retrieve wallet information
    /// 
    /// Returns the current state of a wallet including the owner's public key
    /// and the total number of transactions performed through this wallet.
    /// This is a read-only operation that doesn't modify any state.
    /// 
    /// # Arguments
    /// * `ctx` - The context containing the wallet account to query
    /// 
    /// # Returns
    /// * `Result<WalletInfo>` - The wallet information or error
    /// 
    /// # Note
    /// This is a view function that can be called by anyone to inspect
    /// wallet state. No sensitive information is exposed.
    pub fn get_wallet_info(ctx: Context<GetWalletInfo>) -> Result<WalletInfo> {
        let wallet = &ctx.accounts.wallet;
        Ok(WalletInfo {
            owner: wallet.owner,
            transaction_count: wallet.transaction_count,
        })
    }
}

/// Account validation struct for wallet initialization
/// 
/// Defines the accounts required to initialize a new wallet:
/// - wallet: The PDA account to be created
/// - owner: The user who will own this wallet (must sign)
/// - system_program: Required for account creation
#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitializeWallet<'info> {
    /// The wallet account to be initialized
    /// - Uses PDA derived from "wallet" seed and owner's public key
    /// - Space calculation: 8 (discriminator) + 32 (pubkey) + 1 (u8) + 8 (u64)
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 1 + 8, // discriminator + pubkey + u8 + u64
        seeds = [b"wallet", owner.key().as_ref()],
        bump
    )]
    pub wallet: Account<'info, Wallet>,
    
    /// The owner of the wallet (must sign the transaction)
    #[account(mut)]
    pub owner: Signer<'info>,
    
    /// System program required for creating new accounts
    pub system_program: Program<'info, System>,
}

/// Account validation struct for token transfers
/// 
/// Defines the accounts required for transferring tokens:
/// - wallet: The wallet PDA (for ownership verification)
/// - token accounts: Source and destination for the transfer
/// - owner: Must sign and own the wallet
/// - token_program: SPL Token program for CPI
#[derive(Accounts)]
pub struct TransferTokens<'info> {
    /// The wallet account (used for ownership verification)
    #[account(
        mut,
        seeds = [b"wallet", owner.key().as_ref()],
        bump = wallet.bump
    )]
    pub wallet: Account<'info, Wallet>,
    
    /// Source token account (tokens will be transferred from here)
    #[account(mut)]
    pub from_token_account: Account<'info, TokenAccount>,
    
    /// Destination token account (tokens will be transferred to here)
    #[account(mut)]
    pub to_token_account: Account<'info, TokenAccount>,
    
    /// The wallet owner (must sign the transaction)
    pub owner: Signer<'info>,
    
    /// SPL Token program for performing the transfer
    pub token_program: Program<'info, Token>,
}

/// Account validation struct for wallet information queries
/// 
/// Defines the accounts required to query wallet information:
/// - wallet: The wallet PDA to query (read-only)
#[derive(Accounts)]
pub struct GetWalletInfo<'info> {
    /// The wallet account to query information from
    #[account(
        seeds = [b"wallet", wallet.owner.as_ref()],
        bump = wallet.bump
    )]
    pub wallet: Account<'info, Wallet>,
}

/// Wallet account data structure
/// 
/// Stores the persistent state for each wallet including:
/// - owner: The public key of the wallet owner
/// - bump: The bump seed used to derive this PDA
/// - transaction_count: Total number of transactions performed
#[account]
pub struct Wallet {
    /// The public key of the wallet owner
    pub owner: Pubkey,
    
    /// The bump seed used to derive this wallet's PDA
    pub bump: u8,
    
    /// Total number of transactions performed through this wallet
    pub transaction_count: u64,
}

/// Data structure returned by get_wallet_info
/// 
/// Contains publicly accessible information about a wallet:
/// - owner: The wallet owner's public key
/// - transaction_count: Total transactions performed
#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct WalletInfo {
    /// The public key of the wallet owner
    pub owner: Pubkey,
    
    /// Total number of transactions performed through this wallet
    pub transaction_count: u64,
}

/// Custom error codes for the wallet program
/// 
/// Defines specific error conditions that can occur during program execution.
/// These provide more descriptive error messages than generic Anchor errors.
#[error_code]
pub enum WalletError {
    /// Attempted operation by non-owner of the wallet
    #[msg("Unauthorized access: Only the wallet owner can perform this operation")]
    Unauthorized,
    
    /// Insufficient token balance for the requested operation
    #[msg("Insufficient balance: Not enough tokens to complete the transaction")]
    InsufficientBalance,
    
    /// Invalid token account provided
    #[msg("Invalid token account: The provided token account is not valid")]
    InvalidTokenAccount,
}
