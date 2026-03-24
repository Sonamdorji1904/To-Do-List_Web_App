import { app, port } from './index.js';

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});