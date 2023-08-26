import Layout from '@/components/Layout/Layout';
import { Box, Flex, Text } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SignupSuccess = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    // checks if the user's email and token matches. then show the signup message.
    const [alreadyVerified, setAlreadyVerified] = useState(false);
    const router = useRouter();
    const { email } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (email) {
                try {
                    const response = await fetch(`https://nbc-webapp-api-ts-production.up.railway.app/webapp/check-if-verified/${email}`);
                    const { status, error, message, data } = await response.json();
    
                    if (error || status === 500) {
                      if (message === 'User has already verified their email') {
                        setAlreadyVerified(true);
                      }
                        setErrorMsg(message);
                    }
                } catch (err) {
                    setErrorMsg('An error occurred while fetching data: ', err);
                }
            }
        };
    
        fetchData();
    }, [email]);

    // we only show this page if the user has NOT verified their account but their data still exists on the DB
    // we don't have to worry about an expired token, as the scheduler from the backend will delete any expired tokens and thus data with it automatically.
    return (
        <Layout
          pageTitle={errorMsg ? 'Invalid page' : 'Signup successful'}
          description={errorMsg ? 'Invalid page' : 'Thank you for signing up on our web app!'}
        >
          <Flex
            direction='column'
            align='center'
            sx={(theme) => ({
              marginTop: 60,
            })}
            w='100%'
          >
            {!alreadyVerified && !errorMsg ? (
                <>
                <Flex
                direction='row'
                align='center'
                justify='center'
                w='50%'
                sx={(theme) => ({
                  padding: '20px 20px 20px 20px',
                  borderRadius: theme.radius.md,
                  border: '2px solid #42ca9f',
                })}
              >
                <IconAlertOctagon
                  size={50}
                  color='#42ca9f'
                  style={{ marginRight: 20 }}
                />
                <Text
                  sx={(theme) => ({
                    color: theme.colors.nbcGreen[0],
                    fontSize: '40px',
                    fontWeight: 800,
                    [theme.fn.smallerThan('md')]: {
                      fontSize: '32px',
                    },
                  })}
                >
                  Signup Successful!
                </Text>
              </Flex>
              <Flex direction='row' align='center' justify='center' w='50%'>
                <Text
                  sx={(theme) => ({
                    fontSize: 20,
                    marginTop: 30,
                    [theme.fn.smallerThan('md')]: {
                      fontSize: '14px',
                    },
                  })}
                >
                  You have successfully created your account on our web app! <br />
                  In order to login, you will need to{' '}
                  <Text span c='#42ca9f'>
                    verify your email address.
                  </Text>{' '}
                  <br />
                  <br />
                  Please follow the instructions given to your email inbox.
                  <br />
                  <br />
                  NOTE: If you haven&apos;t received any email from us within the next
                  24 hours, please contact support.
                </Text>
              </Flex>
                </>
            ) : (
                <Flex
                direction='row'
                align='center'
                justify='center'
                w='50%'
                sx={(theme) => ({
                  padding: '20px 20px 20px 20px',
                  borderRadius: theme.radius.md,
                  border: '2px solid #ca4242',
                })}
              >
                <IconAlertOctagon size={50} color='#ca4242' style={{marginRight: 20}} />
                <Text weight='600' sx={(theme) => ({
                    fontSize: '32px',
                    color: '#ca4242',
                    [theme.fn.smallerThan('md')]: {
                        fontSize: '24px',
                    }
                })}>
                    You have entered an invalid page.
                </Text>
              </Flex>
            )}
          </Flex>
        </Layout>
      );
};

export default SignupSuccess;
