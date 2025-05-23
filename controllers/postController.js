import db from '../config/database.js';

// Create Post
export const createPost = async (req, res) => {
  const { title, content, author_id} = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO posts (title, content) VALUES (?, ?)',
      [title, content]
    );
    res.status(201).json({ message: 'Post created', postId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT posts.*, users.username AS author 
      FROM posts 
      JOIN users ON posts.author_id = users.id
      ORDER BY posts.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get Single Post
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching post' });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    res.json({ message: 'Post updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM posts WHERE id = ?', [id]);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
