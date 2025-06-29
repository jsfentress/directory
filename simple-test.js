// Simple test using fetch to verify the API endpoint
async function simpleTest() {
  const baseUrl = 'https://dpocket-production.up.railway.app';
  
  console.log('Testing PocketBase API endpoint...');
  console.log('Base URL:', baseUrl);
  
  try {
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseUrl}/api/health`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check passed:', healthData);
    } else {
      console.log('❌ Health check failed:', healthResponse.status);
    }
    
    // Test creating a record
    console.log('\n2. Testing record creation...');
    const testData = {
      Title: 'Simple Test Event',
      Venue: 'Test Venue',
      Date: '2024-01-01',
      Price: 'Free',
      Description: 'Simple test from script',
      Status: 'pending'
    };
    
    const createResponse = await fetch(`${baseUrl}/api/collections/events/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (createResponse.ok) {
      const record = await createResponse.json();
      console.log('✅ Record created successfully!');
      console.log('Record ID:', record.id);
      console.log('Title:', record.Title);
      
      // Clean up
      console.log('\n3. Cleaning up test record...');
      const deleteResponse = await fetch(`${baseUrl}/api/collections/events/records/${record.id}`, {
        method: 'DELETE'
      });
      
      if (deleteResponse.ok) {
        console.log('✅ Test record cleaned up');
      } else {
        console.log('⚠️ Could not clean up test record');
      }
      
      console.log('\n🎉 SUCCESS! Your PocketBase API is working correctly.');
      console.log('Set POCKETBASE_URL=https://dpocket-production.up.railway.app in your environment variables.');
      
    } else {
      const errorText = await createResponse.text();
      console.log('❌ Record creation failed:', createResponse.status);
      console.log('Error details:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

simpleTest(); 