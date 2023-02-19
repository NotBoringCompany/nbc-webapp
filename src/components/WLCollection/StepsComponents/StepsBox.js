import { Box } from '@mantine/core';

const StepsBox = ({style, children, marginBottom, marginTop}) => {
    const getMarginBottom = marginBottom ? marginBottom : 15;
    const getMarginTop = marginTop ? marginTop : 0;
    return (
        <Box
            style={style ? style : {border: '2px solid white'}}
            sx={(theme) => ({
                borderRadius: theme.radius.md,
                width: '100%',
                textAlign: 'center',
                marginBottom: getMarginBottom,
                marginTop: getMarginTop,
            })}
        >
            {children}
        </Box>
    );
}

export default StepsBox;