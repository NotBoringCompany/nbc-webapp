import { Divider, Flex, Text } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';

export const IndividualPoolDataText = ({
  title,
  text,
  extraComponent = <></>,
}) => {
  return (
    <Flex
      direction='column'
      sx={(theme) => ({
        marginBottom: 20,
      })}
    >
      <Flex direction='row' align='center'>
        <IconAlertOctagon color='#42ca9f' style={{ marginRight: 10 }} />
        <Text size={20} weight={600}>
          {title}
        </Text>
        {extraComponent}
      </Flex>

      <Flex style={{ marginBottom: 10 }}>
        <Divider color='#42ca9f' style={{ width: '100%' }} />
      </Flex>
      <Text align='left'>{text}</Text>
    </Flex>
  );
};
