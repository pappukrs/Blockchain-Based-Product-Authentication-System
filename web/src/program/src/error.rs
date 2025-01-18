use solana_program::program_error::ProgramError;
use thiserror::Error;

#[derive(Error, Debug, Copy, Clone)]
pub enum BlocenityError {
    #[error("Invalid Manufacturer")]
    InvalidManufacturer,
    #[error("Product Already Registered")]
    ProductAlreadyRegistered,
}

impl From<BlocenityError> for ProgramError {
    fn from(e: BlocenityError) -> Self {
        ProgramError::Custom(e as u32)
    }
}