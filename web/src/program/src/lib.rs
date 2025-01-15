use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Product {
    pub manufacturer: Pubkey,
    pub timestamp: i64,
    pub verified_count: u64,
    pub is_authentic: bool,
}

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let product_account = next_account_info(accounts_iter)?;
    let manufacturer = next_account_info(accounts_iter)?;

    if !manufacturer.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    let mut product_data = Product::try_from_slice(&instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;
    
    product_data.manufacturer = *manufacturer.key;
    product_data.is_authentic = true;
    
    product_data.serialize(&mut &mut product_account.data.borrow_mut()[..])?;
    
    msg!("Product registered successfully");
    Ok(())
}