import { Box, Flex } from '@mantine/core'

const WLVerificationStepBox = ({style, children, marginBottom, marginTop}) => {
    const getMarginBottom = marginBottom ? marginBottom : 15;
    const getMarginTop = marginTop ? marginTop : 0;
    return (
        <Box
            style={style ? style : { border: '2px solid white' }}
            sx={(theme) => ({
                borderRadius: theme.radius.md,
                width: '100%',
                textAlign: 'center',
                marginBottom: getMarginBottom,
                marginTop: getMarginTop,
            })}
        >
            <Flex
                direction='row'
                align='center'
                justify='space-between'
                sx={(theme) => ({
                    marginLeft: 15,
                })}
            >
                {children}
            </Flex>
        </Box>
    )
}

export default WLVerificationStepBox