const pool = require('../config/database');

// LISTAR TODOS
const getSuppliers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM suppliers ORDER BY name');
    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao listar fornecedores', error: err.message });
  }
};

// BUSCAR POR ID
const getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM suppliers WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar fornecedor', error: err.message });
  }
};

// CRIAR
const createSupplier = async (req, res) => {
  const { name, email, phone, cnpj, address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO suppliers (name, email, phone, cnpj, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, cnpj, address]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao criar fornecedor', error: err.message });
  }
};

// ATUALIZAR
const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, cnpj, address } = req.body;
  try {
    const result = await pool.query(
      'UPDATE suppliers SET name = $1, email = $2, phone = $3, cnpj = $4, address = $5 WHERE id = $6 RETURNING *',
      [name, email, phone, cnpj, address, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao atualizar fornecedor', error: err.message });
  }
};

// DELETAR
const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM suppliers WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
    return res.status(200).json({ message: 'Fornecedor deletado com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao deletar fornecedor', error: err.message });
  }
};

module.exports = { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier };