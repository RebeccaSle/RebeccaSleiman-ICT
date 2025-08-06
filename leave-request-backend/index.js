require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
app.use(cors());


app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/leaves', leaveRoutes);
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
