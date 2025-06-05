
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod wallet_program {
    use super::*;

    /// Initialize a new wallet account
    pub fn initialize_wallet(ctx: Context<InitializeWallet>, bump: u8) -> Result<()> {
        let wallet = &mut ctx.accounts.wallet;
        wallet.owner = ctx.accounts.owner.key();
        wallet.bump = bump;
        wallet.transaction_count = 0;
        Ok(())
    }

    /// Transfer tokens from wallet
    pub fn transfer_tokens(
        ctx: Context<TransferTokens>,
        amount: u64,
    ) -> Result<()> {
        let wallet = &ctx.accounts.wallet;
        
        // Verify ownership
        require!(
            wallet.owner == ctx.accounts.owner.key(),
            WalletError::Unauthorized
        );

        // Perform transfer
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

        Ok(())
    }

    /// Get wallet info
    pub fn get_wallet_info(ctx: Context<GetWalletInfo>) -> Result<WalletInfo> {
        let wallet = &ctx.accounts.wallet;
        Ok(WalletInfo {
            owner: wallet.owner,
            transaction_count: wallet.transaction_count,
        })
    }
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitializeWallet<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 1 + 8, // discriminator + pubkey + u8 + u64
        seeds = [b"wallet", owner.key().as_ref()],
        bump
    )]
    pub wallet: Account<'info, Wallet>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct TransferTokens<'info> {
    #[account(
        mut,
        seeds = [b"wallet", owner.key().as_ref()],
        bump = wallet.bump
    )]
    pub wallet: Account<'info, Wallet>,
    #[account(mut)]
    pub from_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub to_token_account: Account<'info, TokenAccount>,
    pub owner: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct GetWalletInfo<'info> {
    #[account(
        seeds = [b"wallet", wallet.owner.as_ref()],
        bump = wallet.bump
    )]
    pub wallet: Account<'info, Wallet>,
}

#[account]
pub struct Wallet {
    pub owner: Pubkey,
    pub bump: u8,
    pub transaction_count: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct WalletInfo {
    pub owner: Pubkey,
    pub transaction_count: u64,
}

#[error_code]
pub enum WalletError {
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Insufficient balance")]
    InsufficientBalance,
    #[msg("Invalid token account")]
    InvalidTokenAccount,
}
