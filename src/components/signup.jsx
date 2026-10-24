import { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    // 1. Client-side validation
    if (!trimmedEmail) {
      setMessage('Please enter your email address.');
      return;
    }

    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setMessage('Subscribing...');

    // 2. HTTP POST request with try-catch
    try {
      const response = await fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed.');
      }

      // Success outcome message
      setMessage(data.message || 'Successfully subscribed! Welcome email sent.');
      setEmail('');
    } catch (error) {
      // Error outcome message
      setMessage(
        error.message || 'Could not connect to the server. Please ensure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="signup">
      <h2>Sign Up To My Newsletter</h2>
      <p>Enter your email to receive updates about DEV@Deakin.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          disabled={loading}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {message && <p id="message">{message}</p>}
    </section>
  );
}

export default Signup;
