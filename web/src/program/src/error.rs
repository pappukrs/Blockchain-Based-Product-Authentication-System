use solana_program::program_error::ProgramError;
use thiserror::Error;

#[derive(Error, Debug, Copy, Clone)]
pub enum VerifiChainError {
    #[error("Invalid Manufacturer")]
    InvalidManufacturer,
    #[error("Product Already Registered")]
    ProductAlreadyRegistered,
}

impl From<VerifiChainError> for ProgramError {
    fn from(e: VerifiChainError) -> Self {
        ProgramError::Custom(e as u32)
    }
}