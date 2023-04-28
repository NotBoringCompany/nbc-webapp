const moralisErrorMessage = (type, code) => {
  if (type === 'auth') {
    switch (code) {
      case 101:
        return `Oops! Invalid email / password.`;
      default:
        return `Oops! Something went wrong.`;
    }
    return;
  }

  return `Oops! Something went wrong.`;
};

export default moralisErrorMessage;
