// Set up a whitelist and check against it:
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
  'https://localhost:3001',
  'http://35.245.205.138',
  'https://35.245.205.138',
  'http://35.245.205.138:3000',
  'https://35.245.205.138:3000',
  'http://35.245.205.138:3001',
  'https://35.245.205.138:3001',
  'http://jan.dev',
  'https://jan.dev',
  'http://jan.dev:3000',
  'https://jan.dev:3000',
  'http://jan.dev:3001',
  'https://jan.dev:3001'
];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

module.exports = corsOptions;
