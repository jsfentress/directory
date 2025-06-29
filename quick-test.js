// Quick test to verify the correct API endpoint
const PocketBase = require('pocketbase');

async function quickTest() {
  const pb = new PocketBase('https://dpocket-production.up.railway.app');
  
  console.log('Testing PocketBase API endpoint...');
  
  try {
    // Test health
    const health = await pb.health.check();
    console.log('✅ Health check:', health);
    
    // Test creating a record
    console.log('Testing record creation...');
    const record = await pb.collection('events').create({
      Title: 'Quick Test Event',
      Venue: 'Test Venue',
      Date: '2024-01-01',
      Price: 'Free',
      Description: 'Quick test from script',
      Status: 'pending'
    });
    
    console.log('✅ Record created successfully!');
    console.log('Record ID:', record.id);
    console.log('Title:', record.Title);
    
    // Clean up
    await pb.collection('events').delete(record.id);
    console.log('✅ Test record cleaned up');
    
    console.log('\n🎉 SUCCESS! Your PocketBase API is working correctly.');
    console.log('Set POCKETBASE_URL=https://dpocket-production.up.railway.app in your environment variables.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.status) {
      console.error('Status:', error.status);
    }
    console.error('Full error:', error);
  }
}

quickTest(); 