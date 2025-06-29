// Test script to verify PocketBase connection
// Run with: node test-pocketbase.js

const PocketBase = require('pocketbase');

async function testConnection() {
  const pb = new PocketBase('https://dpocket-production.up.railway.app');
  
  try {
    console.log('Testing PocketBase connection...');
    
    // Test basic connection
    const health = await pb.health.check();
    console.log('✅ Health check passed:', health);
    
    // Test collections
    const collections = await pb.collections.getFullList();
    console.log('✅ Collections retrieved:', collections.length, 'collections');
    
    // Find the events collection
    const eventsCollection = collections.find(col => col.name === 'events');
    if (eventsCollection) {
      console.log('✅ Events collection found:', eventsCollection.name);
      console.log('   Fields:', eventsCollection.schema.map(f => f.name).join(', '));
    } else {
      console.log('❌ Events collection not found');
    }
    
    // Test creating a test record
    console.log('\nTesting record creation...');
    const testRecord = await pb.collection('events').create({
      Title: 'Test Event',
      Venue: 'Test Venue',
      Date: '2024-01-01',
      Price: 'Free',
      Description: 'This is a test event',
      Status: 'pending'
    });
    console.log('✅ Test record created:', testRecord.id);
    
    // Clean up - delete the test record
    await pb.collection('events').delete(testRecord.id);
    console.log('✅ Test record cleaned up');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.status) {
      console.error('   Status:', error.status);
    }
  }
}

testConnection(); 