import { useState } from "react";
import { Flex, Text, Select } from "@mantine/core";
import keyNum from "@/utils/keynum";

const DATA = [
	{ value: "single", label: "Single (1 key)" },
	{ value: "pair", label: "Pair (2 keys)" },
	{ value: "trio", label: "Trio (3 keys)" },
	{ value: "pentuple", label: "Pentuple (5 keys)" },
	{ value: "flush", label: "Flush (15 keys)" },
];

const Box = ({ onSelect, selected }) => {
	return (
		<Flex
			px={24}
			py={16}
			direction={"column"}
			w={"100%"}
			sx={{ border: "2px solid #42ca9f" }}
		>
			<Text mb={"sm"}>Key Combo</Text>
			<Select placeholder="Pick a Key Combo" data={DATA} onChange={onSelect} />
			{!!selected ? (
				<Text mt={"md"}>
					Pick any {keyNum(selected)} and optionally, a keychain.
				</Text>
			) : null}
		</Flex>
	);
};

export default function Stake() {
	const [selected, setSelected] = useState(null);
	const handleSelect = (e) => {
		//Do more logic here later
		setSelected(e);
	};
	return (
		<Flex dir="row">
			<Box onSelect={handleSelect} selected={selected} />
		</Flex>
	);
}

export async function getServerSideProps(ctx) {
	return {
		props: {
			data: null,
		},
	};
}
