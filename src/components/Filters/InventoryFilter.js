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

const useStyles = createStyles((theme) => ({
    checkboxStyle: {
        '.mantine-Checkbox-input': {
            ':checked': {
                backgroundColor: theme.colors.nbcGreen,
            }
        }
    },
    sliderStyle: {
        '.mantine-Slider-bar': {
            backgroundColor: theme.colors.nbcGreen,
        },
    }
}));

const InventoryFilter = ({
    openHouse,
    toggleOpenHouse,
    setHouses,
    setTypes,
    openType,
    toggleOpenType,
    luckRating,
    setLuckRating,
    setEndLuckRating,
    setLuckBoost,
}) => {
    const { classes } = useStyles();
    const handleHouseChange = (e) => {
        const { checked, id } = e.target;
        if (checked) {
            setHouses((prev) => [...prev, id]);
        } else {
            setHouses((prev) => prev.filter((house) => house !== id));
        }
    };

    const handleTypeChange = (e) => {
        const { checked, id } = e.target;
        if (checked) {
            setTypes((prev) => [...prev, id]);
        } else {
            setTypes((prev) => prev.filter((house) => house !== id));
        }
    };

    const handleLuckBoostChange = (e) => {
        const { checked, id } = e.target;
        // the id should be something like "LuckBoost1". we need to split to get the "1"
        const boost = id.split('LuckBoost')[1];
        if (checked) {
            setLuckBoost((prev) => [...prev, boost]);
        } else {
            setLuckBoost((prev) => prev.filter((house) => house !== boost));
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
                        <Checkbox label='Tradition' id='Tradition' defaultChecked onClick={(e) => handleHouseChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Chaos' id='Chaos' defaultChecked onClick={(e) => handleHouseChange(e)} className={classes.checkboxStyle} />
                        <Checkbox label='Glory' id='Glory' defaultChecked onClick={(e) => handleHouseChange(e)} className={classes.checkboxStyle}/>
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
                        <Checkbox label='Brawler' id='Brawler' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Crystal' id='Crystal' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Earth' id='Earth' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                    </Group>
                    <Group mb='xs' grow>
                        <Checkbox label='Electric' id='Electric' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Fire' id='Fire' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Frost' id='Frost' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                    </Group>
                    <Group mb='xs' grow>
                        <Checkbox label='Magic' id='Magic' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Nature' id='Nature' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Ordinary' id='Ordinary' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                    </Group>
                    <Group mb='xs' grow>
                        <Checkbox label='Psychic' id='Psychic' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Reptile' id='Reptile' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Spirit' id='Spirit' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                    </Group>
                    <Group mb='xs' grow>
                        <Checkbox label='Toxic' id='Toxic' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Water' id='Water' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
                        <Checkbox label='Wind' id='Wind' defaultChecked onClick={(e) => handleTypeChange(e)} className={classes.checkboxStyle}/>
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
                    className={classes.sliderStyle}
                />
            </Flex>
            <Flex mb={20}>
                <HeadingSix>Luck Boost</HeadingSix>
            </Flex>
            <Flex direction='column'>
                <Group mb='xs' grow>
                    <Checkbox label='1' id='LuckBoost1' defaultChecked onClick={(e) => handleLuckBoostChange(e)} className={classes.checkboxStyle}/>
                    <Checkbox label='1.05' id='LuckBoost1.05' defaultChecked onClick={(e) => handleLuckBoostChange(e)} className={classes.checkboxStyle}/>
                    <Checkbox label='1.2' id='LuckBoost1.2' defaultChecked onClick={(e) => handleLuckBoostChange(e)} className={classes.checkboxStyle}/>
                </Group>
            </Flex>
        </BorderedBox>
    );
};

export default InventoryFilter;
