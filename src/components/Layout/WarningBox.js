import { Text, Flex } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
import BorderedBox from '../BorderedBox/BorderedBox';
import { COLORS } from '../Globals/colors';

const WarningBox = ({ title, description }) => {
  return (
    <BorderedBox
      variant='red'
      borderRadiusSize='md'
      p='lg'
      sx={{
        marginTop: 15,
      }}
    >
      <Flex direction='row' align='center' justify='center'>
        <IconAlertOctagon
          color={COLORS.red}
          size={40}
          style={{ marginRight: 10 }}
        />
        <Text sx={{ fontSize: 40, color: '#ca4242', fontWeight: 700 }}>
          {title}
        </Text>
      </Flex>
      <Text size='lg'>{description}</Text>
    </BorderedBox>
  );
};

export default WarningBox;
