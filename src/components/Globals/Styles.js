const { Global } = require("@mantine/core")

const GlobalStyles = () => {
    return (
        <Global 
            styles={(theme) => ({
                body: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.black : theme.white,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                }
            })}
        />
    );
}

export default GlobalStyles;