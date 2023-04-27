const maxSelectedKey = (combo) => {
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

export default maxSelectedKey;
