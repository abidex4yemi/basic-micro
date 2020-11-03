/* eslint-disable no-console */
const app = require('.');

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Task service running on port ${PORT}`);
});
