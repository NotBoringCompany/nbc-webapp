import { ActionIcon, Avatar, Collapse, CopyButton, Divider, Flex, Text, Tooltip } from '@mantine/core'
import { HeadingOne } from '../Typography/Headings'
import BorderedBox from '../BorderedBox/BorderedBox'
import { MediumButton } from '../Buttons/Universals'
import { IconBox, IconCheck, IconChevronDown, IconCopy, IconLayoutDashboard, IconSettings } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useDisclosure } from '@mantine/hooks'

const AccountOverviewBox = ({ethAddress, email}) => {
    const router = useRouter();
    const [openedOverviewCollapse, { toggle: toggleOverviewCollapse }] = useDisclosure(false);

    return (
        <Flex
            direction='column'
            align='center'
        >
            <HeadingOne sx={{ marginBottom: 50 }}>DASHBOARD</HeadingOne>
            <BorderedBox
                borderRadiusSize='xl'
                minWidth='50%'
                sx={{ border: '3px solid #42ca9f' }}
                py={15}
            >
                <Flex
                    direction='column'
                    align='center'
                    justify='center'
                    mt={10}
                >
                    <Avatar radius='md' size='xl' sx={(theme) => ({
                        backgroundColor: '#42ca9f',
                    })}>
                        {email[0]?.toUpperCase() ?? 'NBC'}
                    </Avatar>
                    <Flex
                        direction='column'
                        mt={20}
                        px={20}
                    >
                        <Flex
                            direction='row'
                            align='center'
                            justify='space-between'
                        >
                            <Text>
                                {`${ethAddress.slice(0, 7)}...${ethAddress.slice(-5)}`}
                            </Text>
                            <CopyButton value={ethAddress ?? ''} timeout={3000}>
                                {({ copied, copy }) => (
                                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position='right'>
                                        <ActionIcon color={copied ? '#42ca9f' : 'white'} onClick={copy}>
                                            {copied ? <IconCheck color='#42ca9f' /> : <IconCopy color='#42ca9f' />}
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </Flex>
                        <Divider color='#42ca9f' size='xs' variant='dashed' />
                        <Text>{email ?? 'No email provided.'}</Text>
                    </Flex>
                </Flex>
                <Flex
                    direction='column'
                    align='start'
                    justify='start'
                >
                    <MediumButton color='transparent' margin='50px 0px 0px 0px' onClick={() => router.replace('/account/dashboard')}>
                        <IconLayoutDashboard size={20} />
                        <Text ml={20} size={18}>Account Dashboard</Text>
                    </MediumButton>
                    <MediumButton color='transparent' margin='10px 0px 0px 0px' onClick={() => router.replace('/account/settings')}>
                        <IconSettings size={20} />
                        <Text ml={20} size={18}>Account Settings</Text>
                    </MediumButton>
                    <MediumButton color='transparent' margin='10px 0px 0px 0px' onClick={toggleOverviewCollapse}>
                        <IconBox size={20} />
                        <Text ml={20} mr={15} size={18}>Inventory</Text>
                        <IconChevronDown size={20} />
                    </MediumButton>
                    <Collapse in={openedOverviewCollapse}>
                        <Flex
                            direction='column'
                            align='start'
                            justify='start'
                            ml={40}
                        >
                            <MediumButton color='transparent'><Text weight={200}>Key Of Salvation</Text></MediumButton>
                            <MediumButton color='transparent'><Text weight={200}>Keychain</Text></MediumButton>
                            <MediumButton color='transparent'><Text weight={200}>Superior Keychain</Text></MediumButton>
                        </Flex>
                    </Collapse>
                </Flex>
            </BorderedBox>
        </Flex>
    )
}

export default AccountOverviewBox