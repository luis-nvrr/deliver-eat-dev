export default {
  fetch: () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            id: '5a03638052fd231590d04eb5',
            name: 'John Kite',
            username: 'johnkite',
          }),
        500,
      ),
    ),
};
