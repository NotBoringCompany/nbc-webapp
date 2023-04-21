const keyNum = (combo) => {
	switch (combo) {
		case "single":
			return "one key";
		case "pair":
			return "two keys";
		case "trio":
			return "three keys";
		case "pentuple":
			return "five keys";
		case "flush":
			return "fifteen keys";
	}
};

export default keyNum;
