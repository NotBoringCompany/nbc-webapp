import { Flex, Text } from '@mantine/core';
import AuthForm from '../Form/AuthForm';

const SettingsLayout = () => {
  return (
    <Flex direction='column'>
      <Text
        weight='300'
        size='24px'
        mb='12px'
        sx={(theme) => ({
          color: theme.colors.nbcGreen[0],
        })}
      >
        Email & Password
      </Text>
      <AuthForm />
    </Flex>
  );
};

export default SettingsLayout;
