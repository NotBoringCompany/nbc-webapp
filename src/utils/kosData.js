export const maxSelectedKey = (combo) => {
	switch (combo) {
		case 'single':
			return 1;
		case 'pair':
			return 2;
		case 'trio':
			return 3;
		case 'pentuple':
			return 5;
		case 'flush':
			return 15;
	}
};

// all currently available key combos.
export const keyCombos = [
	{ value: 'single', label: 'Single (1 key)' },
	{ value: 'pair', label: 'Pair (2 keys)' },
	{ value: 'trio', label: 'Trio (3 keys)' },
	{ value: 'pentuple', label: 'Pentuple (5 keys)' },
	{ value: 'flush', label: 'Flush (15 keys)' },
];
