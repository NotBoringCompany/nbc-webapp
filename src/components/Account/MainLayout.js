import { useCallback, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

const { Flex, createStyles } = require('@mantine/core');
const { default: Layout } = require('../Layout/Layout');
const { default: AccountOverviewBox } = require('./OverviewBox');

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    padding: '24px 0',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },
  accountOverviewBoxContainer: {
    marginRight: '80px',
    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
      marginTop: '0',
      marginBottom: '24px',
      justifyContent: 'center',
    },
  },
}));

const AccountMainLayout = ({ pageName, children, pageTitle, description }) => {
  const { user } = useMoralis();
  const { classes } = useStyles();
  return (
    <Layout withAuth pageTitle={pageTitle} description={description}>
      <Flex className={classes.container} direction='row'>
        <Flex className={classes.accountOverviewBoxContainer}>
          <AccountOverviewBox
            pageName={pageName ?? pageTitle}
            email={user?.attributes?.email}
            ethAddress={user?.attributes?.ethAddress}
          />
        </Flex>
        <div style={{ width: '100%' }}>{children}</div>
      </Flex>
    </Layout>
  );
};

export default AccountMainLayout;
