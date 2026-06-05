const http = require('http');

// Test root endpoint
http.get('http://localhost:8081/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('Root endpoint:', JSON.parse(data)));
}).on('error', (err) => console.error(err));

// Test professional endpoint
http.get('http://localhost:8081/professional', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('Professional data:', JSON.parse(data)));
}).on('error', (err) => console.error(err));

// Test health endpoint
http.get('http://localhost:8081/health', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('Health endpoint:', JSON.parse(data)));
}).on('error', (err) => console.error(err));
