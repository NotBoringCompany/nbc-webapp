const { createStyles, Button } = require('@mantine/core');

const useStyles = createStyles(() => ({
  connectButton: {
    backgroundColor: '#42ca9f',
    transitionDuration: '200ms',
    '&:hover': {
      transform: 'scale(1.01) translate(1px, -3px)',
      backgroundColor: '#42ca9f',
    },
  },
}));

const ConnectWalletButton = ({ onShowSelectWallet }) => {
  const { classes } = useStyles();

  return (
    <>
      <Button
        className={classes.connectButton}
        onClick={() => onShowSelectWallet(true)}
      >
        Connect Wallet
      </Button>
    </>
  );
};

export default ConnectWalletButton;
