import { request, Router } from "express";
import pool from "../database.js";

const router = Router();
router.get('/add', (req, res) => {
    res.render('productos/add')
});

router.post('/add', async (req, res) => {
    try{
        const {nombre, precio, descripcion, stock, imagenUrl} = req.body;
        const newProducto = {
            nombre,
            precio,
            descripcion,
            stock,
            imagenUrl
        }
        await pool.query('INSERT INTO producto SET ?', [newProducto]);
        res.redirect('/list');
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/list', async (req, res) => {
    try{
        const [result] = await pool.query('SELECT * FROM producto')
        res.render('productos/list', {productos: result});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/edit/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const [producto] = await pool.query('SELECT * FROM producto WHERE id = ?', [id]);
        const productoEdit = producto[0];
        res.render('productos/edit', {producto: productoEdit});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post('/edit/:id', async (req, res) => {
    try{
        const {nombre, precio, descripcion, stock, imagenUrl} = req.body;
        const {id} = req.params;
        const editProducto = {nombre, precio, descripcion, stock, imagenUrl};
        await pool.query('UPDATE producto SET ? WHERE id = ?', [editProducto, id]);
        res.redirect('/list');
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/delete/:id', async (req, res) => {
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM producto WHERE id = ?', [id]);
        res.redirect('/list');
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

export default router;