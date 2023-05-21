import { Checkbox, Collapse, Flex, Group, Slider, createStyles } from '@mantine/core';
import {
    HeadingFive,
    HeadingFour,
    HeadingOne,
    HeadingSix,
    HeadingThree,
    HeadingTwo,
} from '../Typography/Headings';
import {
    IconAdjustments,
    IconChevronDown,
    IconChevronUp,
    IconFilter,
} from '@tabler/icons';
import { MediumButton } from '../Buttons/Universals';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

const { default: BorderedBox } = require('../BorderedBox/BorderedBox');

const InventoryFilter = () => {
    const [openHouse, { toggle: toggleOpenHouse }] = useDisclosure(false);
    const [houses, setHouses] = useState([]);
    const [types, setTypes] = useState([]);
    const [openType, { toggle: toggleOpenType }] = useDisclosure(false);
    const [luckRating, setLuckRating] = useState(100);
    const [endLuckRating, setEndLuckRating] = useState(100);
    const [luckBoost, setLuckBoost] = useState(100);
    const [endLuckBoost, setEndLuckBoost] = useState(100);

    const handleHouseChange = (e) => {
        const { checked, id } = e.target;
        if (checked) {
            setHouses((prev) => [...prev, id]);
        } else {
            setHouses((prev) => prev.filter((house) => house !== id));
        }
    }

    const handleTypeChange = (e) => {
        const { checked, id } = e.target;
        if (checked) {
            setTypes((prev) => [...prev, id]);
        } else {
            setTypes((prev) => prev.filter((house) => house !== id));
        }
    }
    
    return (
        <BorderedBox
            sx={{ marginTop: 25, padding: '10px 20px 10px 20px' }}
            variant='green'
            borderRadiusSize='md'
        >
            <Flex justify='center' align='center' mb={30}>
                <IconAdjustments
                    size={35}
                    color='#42ca9f'
                    style={{ marginRight: 10 }}
                />
                <HeadingFour>Filters</HeadingFour>
            </Flex>
            <Flex justify='space-between' mb={20}>
                <HeadingSix>House</HeadingSix>
                <MediumButton onClick={toggleOpenHouse} color='transparent'>
                    {openHouse ? (
                        <IconChevronUp color='#42ca9f' />
                    ) : (
                        <IconChevronDown color='#42ca9f' />
                    )}
                </MediumButton>
            </Flex>
            <Collapse in={openHouse}>
                <Flex direction='column' mb={20}>
                    <Group mb='xs'>
                        <Checkbox label='Tradition' id='Tradition' onClick={(e) => handleHouseChange(e)} />
                        <Checkbox label='Chaos' id='Chaos' onClick={(e) => handleHouseChange(e)} />
                        <Checkbox label='Glory' id='Glory' onClick={(e) => handleHouseChange(e)} />
                    </Group>
                </Flex>
            </Collapse>
            <Flex justify='space-between' mb={20}>
                <HeadingSix>Type</HeadingSix>
                <MediumButton onClick={toggleOpenType} color='transparent'>
                    {openType ? (
                        <IconChevronUp color='#42ca9f' />
                    ) : (
                        <IconChevronDown color='#42ca9f' />
                    )}
                </MediumButton>
            </Flex>
            <Collapse in={openType}>
                <Flex mb={20} direction='column'>
                    <Group mb='xs' grow>
                        <Checkbox label='Brawler' id='Brawler' onClick={(e) => handleTypeChange(e)} />
                        <Checkbox label='Crystal' id='Crystal' onClick={(e) => handleTypeChange(e)} />
                        <Checkbox label='Earth' id='Earth' onClick={(e) => handleTypeChange(e)} />
                    </Group>
                    <Group mb='xs' grow>
                        <Checkbox label='Electric' id='Electric' onClick={(e) => handleTypeChange(e)} />
                        <Checkbox label='Fire' id='Fire' onClick={(e) => handleTypeChange(e)} />
                        <Checkbox label='Frost' id='Frost' onClick={(e) => handleTypeChange(e)} />
                    </Group>
                    <Group mb='xs' grow>
                        <Checkbox label='Magic' id='Magic' onClick={(e) => handleTypeChange(e)} />
                        <Checkbox label='Nature' id='Nature' onClick={(e) => handleTypeChange(e)} />
                        <Checkbox label='Ordinary' id='Ordinary' onClick={(e) => handleTypeChange(e)} />
                    </Group>
                    <Group mb='xs' grow>
                        <Checkbox label='Psychic' id='Psychic' onClick={(e) => handleTypeChange(e)} />
                        <Checkbox label='Reptile' id='Reptile' onClick={(e) => handleTypeChange(e)} />
                        <Checkbox label='Spirit' id='Spirit' onClick={(e) => handleTypeChange(e)} />
                    </Group>
                    <Group mb='xs' grow>
                        <Checkbox label='Toxic' id='Toxic' onClick={(e) => handleTypeChange(e)} />
                        <Checkbox label='Water' id='Water' onClick={(e) => handleTypeChange(e)} />
                        <Checkbox label='Wind' id='Wind' onClick={(e) => handleTypeChange(e)} />
                    </Group>
                </Flex>
            </Collapse>
            <Flex mb={20}>
                <HeadingSix>Luck Rating</HeadingSix>
            </Flex>
            <Flex direction='column'>
                <Slider
                    value={luckRating}
                    onChange={setLuckRating}
                    onChangeEnd={setEndLuckRating}
                    labelAlwaysOn
                    mb={20}
                    sx={(theme) => ({
                        '& .mantine-Slider-bar': {
                            backgroundColor: theme.colors.nbcGreen,
                        },
                    })}
                />
            </Flex>
            <Flex mb={20}>
                <HeadingSix>Luck Boost</HeadingSix>
            </Flex>
            <Flex direction='column'>
                <Slider
                    value={luckBoost}
                    onChange={setLuckBoost}
                    onChangeEnd={setEndLuckBoost}
                    labelAlwaysOn
                    sx={(theme) => ({
                        '& .mantine-Slider-bar': {
                            backgroundColor: theme.colors.nbcGreen,
                        },
                    })}
                />
            </Flex>
        </BorderedBox>
    );
};

export default InventoryFilter;
