export const post = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  });
}
