import SelectWallet from '../Modals/SelectWallet';

const { createStyles, Button } = require('@mantine/core');
const { useState } = require('react');

const useStyles = createStyles((theme) => ({
    connectButton: {
        backgroundColor: '#42ca9f',
    
        '&:hover': {
          transform: 'scale(1.01) translate(1px, -3px)',
          transitionDuration: '200ms',
          backgroundColor: '#42ca9f',
        },
      },
}));

const ConnectWalletButton = () => {
    const [showSelectWallet, setShowSelectWallet] = useState(false);
    const { classes } = useStyles();

    const handleShow = () => {
        setShowSelectWallet(true);
    }

    return (
        <>
            <Button className={classes.connectButton} onClick={() => handleShow()}>Connect Wallet</Button>
            <SelectWallet showSelectWallet={showSelectWallet} setShowSelectWallet={setShowSelectWallet} />
        </>
    );
};

export default ConnectWalletButton;