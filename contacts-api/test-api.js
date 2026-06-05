const http = require('http');

function testGetAll() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000/', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function testGetSingle(contactId) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000/${contactId}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function runTests() {
  try {
    const allContacts = await testGetAll();
    console.log('✅ Test 1 - All contacts:', allContacts);

    if (allContacts.length > 0) {
      const singleContact = await testGetSingle(allContacts[0]._id);
      console.log('✅ Test 2 - Single contact:', singleContact);
    }
  } catch (err) {
    console.log('❌ Error testing API:', err.message);
  }
}

runTests();
