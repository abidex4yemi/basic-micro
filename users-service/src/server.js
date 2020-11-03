/* eslint-disable no-console */
const app = require('.');

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
