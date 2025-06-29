document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const email = formData.get('email');
  const res = await fetch('/api/newsletter-signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const result = await res.json();
  if (result.success) {
    form.reset();
    alert('Thanks for signing up!');
  } else {
    alert(result.error || 'Signup failed.');
  }
});
document.getElementById('newsletter-form-bottom').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const email = formData.get('email');
  const res = await fetch('/api/newsletter-signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const result = await res.json();
  if (result.success) {
    form.reset();
    alert('Thanks for signing up!');
  } else {
    alert(result.error || 'Signup failed.');
  }
}); 