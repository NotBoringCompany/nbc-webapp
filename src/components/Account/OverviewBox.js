import {
  ActionIcon,
  Avatar,
  CopyButton,
  Divider,
  Flex,
  Text,
  Tooltip,
} from '@mantine/core';
import { HeadingOne } from '../Typography/Headings';
import BorderedBox from '../BorderedBox/BorderedBox';
import { MediumButton } from '../Buttons/Universals';
import {
  IconBox,
  IconCheck,
  IconCopy,
  IconLayoutDashboard,
  IconSettings,
} from '@tabler/icons';
import { useRouter } from 'next/router';

const AccountOverviewBox = ({ pageName, ethAddress, email }) => {
  const router = useRouter();

  return (
    <Flex direction='column' align='center'>
      <HeadingOne sx={{ marginBottom: 50 }}>{pageName}</HeadingOne>
      <BorderedBox
        borderRadiusSize='xl'
        sx={{ border: '3px solid #42ca9f' }}
        py={15}
      >
        <Flex direction='column' align='center' justify='center' mt={10}>
          <Avatar
            radius='md'
            size='xl'
            sx={(theme) => ({
              backgroundColor: theme.colors.nbcGreen,
            })}
          >
            {email?.[0]?.toUpperCase() ?? 'NBC'}
          </Avatar>
          <Flex direction='column' mt={20} px={20}>
            <Flex direction='row' align='center' justify='space-between'>
              <Text>
                {`${ethAddress.slice(0, 7)}...${ethAddress.slice(-5)}`}
              </Text>
              <CopyButton value={ethAddress ?? ''} timeout={3000}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? 'Copied' : 'Copy'}
                    withArrow
                    position='right'
                  >
                    <ActionIcon
                      color={copied ? '#42ca9f' : 'white'}
                      onClick={copy}
                    >
                      {copied ? (
                        <IconCheck color='#42ca9f' />
                      ) : (
                        <IconCopy color='#42ca9f' />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Flex>
            <Divider color='#42ca9f' size='xs' variant='dashed' />
            <Text>{email ?? 'No email provided.'}</Text>
          </Flex>
        </Flex>
        <Flex direction='column' align='start' justify='start'>
          <MediumButton
            color='transparent'
            margin='50px 0px 0px 0px'
            onClick={() => router.replace('/account/dashboard')}
          >
            <IconLayoutDashboard size={20} />
            <Text ml={20} size={18}>
              Account Dashboard
            </Text>
          </MediumButton>
          <MediumButton
            color='transparent'
            margin='10px 0px 0px 0px'
            onClick={() => router.replace('/account/settings')}
          >
            <IconSettings size={20} />
            <Text ml={20} size={18}>
              Account Settings
            </Text>
          </MediumButton>
          <MediumButton
            color='transparent'
            margin='10px 0px 0px 0px'
            onClick={() => router.replace('/account/inventory')}
          >
            <IconBox size={20} />
            <Text ml={20} mr={15} size={18}>
              Inventory
            </Text>
          </MediumButton>
        </Flex>
      </BorderedBox>
    </Flex>
  );
};

export default AccountOverviewBox;
