
// Deployment script for wallet program

const anchor = require('@project-serum/anchor');

module.exports = async function (provider) {
  // Configure client to use the provider.
  anchor.setProvider(provider);

  console.log('Deploying wallet program...');
  
  // Add your deployment logic here
  const program = anchor.workspace.WalletProgram;
  
  console.log('Program ID:', program.programId.toString());
  console.log('Deployment completed successfully!');
};
