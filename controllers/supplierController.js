const pool = require('../config/database');

const getSuppliers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM suppliers ORDER BY name');
    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao listar fornecedores' });
  }
};

const getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM suppliers WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar fornecedor' });
  }
};

const createSupplier = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO suppliers (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, address]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao criar fornecedor' });
  }
};

const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    const result = await pool.query(
      'UPDATE suppliers SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5 RETURNING *',
      [name, email, phone, address, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao atualizar fornecedor' });
  }
};

const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM suppliers WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao deletar fornecedor' });
  }
};

module.exports = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
};
