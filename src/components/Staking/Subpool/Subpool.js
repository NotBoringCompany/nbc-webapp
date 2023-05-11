import {
    Box,
    Button,
    Divider,
    Flex,
    HoverCard,
    List,
    Loader,
    Modal,
    SimpleGrid,
    Text,
} from '@mantine/core';
import { IconAlertOctagon, IconQuestionCircle } from '@tabler/icons';
import MathJax from 'react-mathjax2';
import NFTCard from '../NFTCard';
import { cardColumnsBreakpoints } from '@/components/Breakpoints/CardColumns';
import SubpoolWarning from './SubpoolWarning';
import SubpoolData from './SubpoolData';
import NFTStaked from './NFTStaked';

const Subpool = ({
    subpoolDataExists,
    subpoolData,
    stakingPoolData,
    stakingPoolId,
    subpoolId,
    userOwnsThisSubpool,
    backtrackSubpoolPoints,
    subpoolTokenShare,
    showClaimModal,
    claimDone,
    handleClaimReward,
    claimLoading,
    showUnstakeModal,
    unstakeDone,
    handleUnstake,
    unstakeLoading,
    setShowClaimModal,
    setShowUnstakeModal,
    handleClaimModal,
    handleUnstakeModal,
}) => {
    const now = new Date().getTime();

    return (
        <Flex direction='column' align='center' justify='center'>
            {!subpoolDataExists && (
                <Box
                    sx={(theme) => ({
                        borderRadius: theme.radius.md,
                        minWidth: '50%',
                        border: '2px solid #ca4242',
                        padding: '20px',
                        textAlign: 'center',
                        marginTop: 15,
                    })}
                >
                    <Flex direction='row' align='center' justify='center'>
                        <IconAlertOctagon
                            color='#ca4242'
                            size={40}
                            style={{ marginRight: 10 }}
                        />
                        <Text
                            sx={(theme) => ({
                                fontSize: 40,
                                color: '#ca4242',
                                fontWeight: 700,
                            })}
                        >
                            SUBPOOL PAGE NOT AVAILABLE
                        </Text>
                    </Flex>
                    <Text size='lg'>
                        This subpool might not exist or is not available.
                    </Text>
                </Box>
            )}
            {subpoolDataExists && (
                <>
                    <Text
                        sx={(theme) => ({
                            fontSize: 72,
                            fontWeight: 700,
                            color: '#42ca9f',
                        })}
                    >
                        Staking Pool {stakingPoolId} {'<>'} Subpool {subpoolId}
                    </Text>
                    <Flex direction='row' align='center' justify='center' my={25}>
                        <SubpoolData 
                            subpoolData={subpoolData}
                            stakingPoolData={stakingPoolData}
                            userOwnsThisSubpool={userOwnsThisSubpool}
                            backtrackSubpoolPoints={backtrackSubpoolPoints}
                            subpoolTokenShare={subpoolTokenShare}
                            handleClaimModal={handleClaimModal}
                            handleUnstakeModal={handleUnstakeModal}
                        />
                        <SubpoolWarning stakingPoolData={stakingPoolData} />
                    </Flex>
                    <NFTStaked 
                        subpoolData={subpoolData}
                        cardColumnsBreakpoints={cardColumnsBreakpoints}
                    />
                </>
            )}
            <Modal
                opened={showClaimModal}
                centered
                onClose={() => setShowClaimModal(false)}
                title={
                    <Text size={24}>
                        {!claimDone ? 'Claim Reward' : 'Reward Claimed'}
                    </Text>
                }
                withCloseButton={false}
            >
                {!claimDone && (
                    <>
                        <Flex direction='row'>
                            <IconAlertOctagon size={30} style={{ marginRight: 10 }} />
                            <Text size={16}>
                                Claiming {subpoolTokenShare} {stakingPoolData.Reward.Name}.
                                Proceed?
                            </Text>
                        </Flex>
                        <Flex direction='row' align='center' justify='center' mt={15}>
                            <Button
                                size='sm'
                                sx={(theme) => ({
                                    backgroundColor: '#42ca9f',
                                    minHeight: '40px',
                                    minWidth: '5vw',

                                    '&:hover': {
                                        transform: 'scale(1.01) translate(1px, -3px)',
                                        transitionDuration: '200ms',
                                        backgroundColor: '#42ca9f',
                                    },

                                    '&:active': {
                                        transform: 'translateY(2px)',
                                    },
                                })}
                                onClick={handleClaimReward}
                            >
                                {claimLoading ? <Loader color='white' /> : <Text>Confirm</Text>}
                            </Button>
                        </Flex>
                    </>
                )}
                {claimDone && (
                    <>
                        <Flex direction='row'>
                            <Text size={16}>Reward claimed successfully! Redirecting...</Text>
                        </Flex>
                    </>
                )}
            </Modal>
            <Modal
                opened={showUnstakeModal}
                centered
                onClose={() => setShowUnstakeModal(false)}
                title={
                    <Text size={24}>
                        {!unstakeDone ? 'Confirm Unstake' : 'Unstake Successful'}
                    </Text>
                }
                withCloseButton={false}
            >
                {!unstakeDone && (
                    <>
                        <Flex direction='row'>
                            <IconAlertOctagon
                                size={30}
                                color='#ca4242'
                                style={{ marginRight: 10 }}
                            />
                            <Text c='#ca4242' size={16}>
                                WARNING: Unstaking will remove this subpool. Are you sure you
                                want to continue?
                            </Text>
                        </Flex>
                        <Flex direction='row' align='center' justify='center' mt={15}>
                            <Button
                                size='sm'
                                sx={(theme) => ({
                                    backgroundColor: '#ca4242',
                                    minHeight: '40px',
                                    minWidth: '5vw',

                                    '&:hover': {
                                        transform: 'scale(1.01) translate(1px, -3px)',
                                        transitionDuration: '200ms',
                                        backgroundColor: '#ca4242',
                                    },

                                    '&:active': {
                                        transform: 'translateY(2px)',
                                    },
                                })}
                                onClick={handleUnstake}
                            >
                                {unstakeLoading ? (
                                    <Loader color='white' />
                                ) : (
                                    <Text>Confirm</Text>
                                )}
                            </Button>
                        </Flex>
                    </>
                )}
                {unstakeDone && (
                    <>
                        <Flex direction='row'>
                            <Text size={16}>Unstake successful! Redirecting...</Text>
                        </Flex>
                    </>
                )}
            </Modal>
        </Flex>
    );
};

export default Subpool;
