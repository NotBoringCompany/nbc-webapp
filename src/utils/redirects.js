export const serverSideRedirect = (destination = '/') => {
  return {
    redirect: {
      permanent: false,
      destination,
    },
  };
};
