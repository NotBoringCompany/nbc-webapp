export const apiPost = async (url, requestBody) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_REST_API_DOMAIN}/${url}`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
    const response = await res.json();
    if (!res.ok) {
      throw ('Error ', response);
    }
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
