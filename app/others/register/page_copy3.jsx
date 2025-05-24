"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = async () => {
    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    const { error } = result;
    if (error) {
      alert(error.message);
    } else {
      alert(isLogin ? 'Logged in!' : 'Signup successful!');
      router.push('/'); // Redirect to chat page
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAuth} style={styles.button}>
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      <p>
        {isLogin ? 'No account?' : 'Already have an account?'}{' '}
        <a onClick={() => setIsLogin(!isLogin)} style={styles.toggle}>
          {isLogin ? 'Sign Up' : 'Login'}
        </a>
      </p>
    </div>
  );
}

const styles = {
  container: { maxWidth: '400px', margin: 'auto', padding: '2rem' },
  input: { display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '100%' },
  button: { padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none' },
  toggle: { color: '#0070f3', cursor: 'pointer' },
};
