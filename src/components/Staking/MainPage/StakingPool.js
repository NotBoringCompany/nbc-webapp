const { Box } = require('@mantine/core')

const StakingPool = ({children}) => {
    return (
        <Box
            sx={(theme) => ({
                border: '3px solid #42ca9f',
                marginTop: 80,
                borderRadius: theme.radius.xl,
            })}
        >
            {children}
        </Box>
    )
}

export default StakingPool