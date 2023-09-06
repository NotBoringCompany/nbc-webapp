import { Button, Flex, Text } from '@mantine/core';
import AuthForm from '../Form/AuthForm';
import { IconAlertOctagon } from '@tabler/icons';
import { useContext, useState } from 'react';
import { useMoralis } from 'react-moralis';
import AuthContext from '../Auth/AuthContext';

const SettingsLayout = () => {
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLinkAccount, setShowLinkAccount] = useState(false);
  const [showLinkWallet, setShowLinkWallet] = useState(false);
  const [resetFormTrigger, setResetFormTrigger] = useState(false);

  const { user } = useMoralis();


  const { emailUser } = useContext(AuthContext);

  const handleEmailChange = () => {
    setShowChangeEmail(!showChangeEmail);
    if (showChangePassword) {
      setShowChangePassword(false);
    }
    if (showLinkAccount) {
      setShowLinkAccount(false);
    }
    if (showLinkWallet) {
      setShowLinkWallet(false);
    }
    setResetFormTrigger(!resetFormTrigger);
  }

  const handlePasswordChange = () => {
    setShowChangePassword(!showChangePassword);
    if (showChangeEmail) {
      setShowChangeEmail(false);
    }
    if (showLinkAccount) {
      setShowLinkAccount(false);
    }
    if (showLinkWallet) {
      setShowLinkWallet(false);
    }
    setResetFormTrigger(!resetFormTrigger);
  }

  const handleLinkAccount = () => {
    setShowLinkAccount(!showLinkAccount);
    if (showChangeEmail) {
      setShowChangeEmail(false);
    }
    if (showChangePassword) {
      setShowChangePassword(false);
    }
    if (showLinkWallet) {
      setShowLinkWallet(false);
    }
    setResetFormTrigger(!resetFormTrigger);
  }

  const handleLinkWallet = () => {
    setShowLinkWallet(!showLinkWallet);
    if (showChangeEmail) {
      setShowChangeEmail(false);
    }
    if (showChangePassword) {
      setShowChangePassword(false);
    }
    if (showLinkAccount) {
      setShowLinkAccount(false);
    }
    setResetFormTrigger(!resetFormTrigger);
  }

  return (
    <Flex
      direction='column'
      align='center'
    >
      <Text sx={(theme) => ({
        color: theme.colors.nbcGreen[0],
        fontSize: '36px',
        [theme.fn.smallerThan('md')]: {
          fontSize: '20px',
        }
      })}
      >
        You can either link your account to an email/wallet if you haven&apos;t done so or you can change your email and password.
      </Text>
      <Flex
            direction='row'
            align='center'
            justify='center'
            w='50%'
            mt={24}
            mb={24}
            sx={(theme) => ({
              padding: '5px 5px 5px 5px',
              borderRadius: theme.radius.md,
              border: '2px solid #ca4242',
            })}
          >
            <IconAlertOctagon
              size={50}
              color='#ca4242'
              style={{ marginRight: 20 }}
            />
            <Text
              weight='600'
              sx={(theme) => ({
                fontSize: '24px',
                color: '#ca4242',
                [theme.fn.smallerThan('md')]: {
                  fontSize: '16px',
                },
              })}
            >
              NOTE: You are only able to change your email once every 7 days.
            </Text>
          </Flex>
      <Flex
        direction='row'
      >
        <Button
          disabled={!emailUser || !user?.attributes?.email}
          sx={(theme) => ({
            backgroundColor: '#42ca9f',
            marginRight: 20,
            ':hover': {
              transform: 'scale(1.01) translate(1px, -3px)',
              transitionDuration: '200ms',
              backgroundColor: '#42ca9f',
            },

            [theme.fn.smallerThan('sm')]: {
              fontSize: 10,
            }
          })}
          onClick={() => handleEmailChange()}
        >
          Change email
        </Button>
        <Button
          sx={(theme) => ({
            backgroundColor: '#42ca9f',
            ':hover': {
              transform: 'scale(1.01) translate(1px, -3px)',
              transitionDuration: '200ms',
              backgroundColor: '#42ca9f',
            },

            [theme.fn.smallerThan('sm')]: {
              fontSize: 10,
            }
          })}
          onClick={() => handlePasswordChange()}
        >
          Change password
        </Button>
        <Button
          disabled={emailUser || user?.attributes?.email}
          sx={(theme) => ({
            backgroundColor: '#42ca9f',
            marginLeft: 20,
            ':hover': {
              transform: 'scale(1.01) translate(1px, -3px)',
              transitionDuration: '200ms',
              backgroundColor: '#42ca9f',
            },

            [theme.fn.smallerThan('sm')]: {
              fontSize: 10,
            }
          })}
          onClick={() => handleLinkAccount()}
        >
          Link your account
        </Button>
        <Button
          disabled={user?.attributes?.ethAddress}
          sx={(theme) => ({
            backgroundColor: '#42ca9f',
            marginLeft: 20,
            ':hover': {
              transform: 'scale(1.01) translate(1px, -3px)',
              transitionDuration: '200ms',
              backgroundColor: '#42ca9f',
            },

            [theme.fn.smallerThan('sm')]: {
              fontSize: 10,
            }
          })}
          onClick={() => handleLinkWallet()}
        >
          Link your wallet
        </Button>
      </Flex>
      <AuthForm 
        changeEmail={showChangeEmail} 
        changePassword={showChangePassword} 
        linkAccount={showLinkAccount} 
        linkWallet={showLinkWallet}
        resetFormTrigger={resetFormTrigger}
        setResetFormTrigger={setResetFormTrigger}
      />
    </Flex>
  );
};

export default SettingsLayout;
