import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!users.length) return res.status(401).json({ message: 'Invalid email or password' });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.status(200).json({ message: 'Login successful', userId: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
