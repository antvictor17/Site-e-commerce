const pool = require('../config/database');

// LISTAR TODOS
const getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, s.name AS supplier_name,
      CASE WHEN p.quantity <= p.min_quantity THEN true ELSE false END AS low_stock
      FROM products p
      LEFT JOIN suppliers s ON p.supplier_id = s.id
      ORDER BY p.name
    `);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Não existem produtos cadastrados.' });
    }
    else {
      return res.status(200).json(result.rows);
    }
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao listar produtos', error: err.message });
  }
};

// BUSCAR POR ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT p.*, s.name AS supplier_name,
      CASE WHEN p.quantity <= p.min_quantity THEN true ELSE false END AS low_stock
      FROM products p
      LEFT JOIN suppliers s ON p.supplier_id = s.id
      WHERE p.id = $1
    `, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar produto', error: err.message });
  }
};

// CRIAR
const createProduct = async (req, res) => {
  const { name, description, price, quantity, min_quantity, supplier_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (name, description, price, quantity, min_quantity, supplier_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, price, quantity, min_quantity || 5, supplier_id]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao criar produto', error: err.message });
  }
};

// ATUALIZAR
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, min_quantity, supplier_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE products SET name = $1, description = $2, price = $3, quantity = $4,
       min_quantity = $5, supplier_id = $6 WHERE id = $7 RETURNING *`,
      [name, description, price, quantity, min_quantity, supplier_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao atualizar produto', error: err.message });
  }
};

// DELETAR
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    return res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao deletar produto', error: err.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };