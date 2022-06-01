import { alteraimagem, inserirFilme, removerFilme, buscarPorNome,  buscarPorid, alterarFilme } from '../repository/filmeRepository.js'

import multer from 'multer'

import { Router } from 'express'

const server = Router();
const upload= multer({dest:'storage/capafilmes'})

server.post ('/filme', async (req, resp) => {

try{

const filmeParaInserir = req.body;

if (!filmeParaInserir.nome)
throw new Error('bota nome');

if (!filmeParaInserir.sinopse)
throw new Error('bota sinopse');

if (!filmeParaInserir.avaliacao == undefined || filmeParaInserir.avaliacao < 0)
throw new Error('bota avaliacao');

if (!filmeParaInserir.lancamento)
throw new Error('bota lancamento');

if (!filmeParaInserir.disponivel)
throw new Error('bota disponivel');

if (!filmeParaInserir.usuario)
throw new Error('nao tem usuario');

const filme = await inserirFilme(filmeParaInserir);


resp.send (filme);

}

catch(err){

resp.status(400).send({

erro : err.message

})

}

})

server.put('/filme/:id/capa', upload.single('harry') ,async(req,resp) => {
    try{
     const{id}= req.params;
     const imagem = req.file.path;

     const resposta= await alteraimagem(imagem,id);

     if (resposta !=1)
     throw new Error('a imagem nao pode se salva')

     resp.status(204).send();  
     
    }
    catch (err){
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.delete('/filme/:id', async (req, resp) => {
    try{
    const { id } = req.params;

    const resposta = await removerFilme(id);
    if (resposta != 1)
        throw new Error ('filme não saiu!');

    resp.status(204).send();
    }
    catch(err){
        resp.status(400).send({
            erro:err.message
    })
    }
})

server.get('/filme/busca', async(req,resp) =>{
    try{
        const {nome}   = req.query;

        const resposta= await buscarPorNome(nome);

        if( !resposta)
        resp.status(404).send([])

        else
            resp.send(resposta);

    } catch(err){
        resp.status(400).send({
            erro:  err.message
        })
    }
})



server.get('/filme/:id', async(req,resp) =>{
    try{
        const  id  = Number (req.params.id);

        const resposta= await buscarPorid(id);

        if(! resposta)
        resp.status(404).send([])

        else
            resp.send(resposta);

    } catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.put('/filme/:id', async (req,resp) =>{
    try{
        const {id } = req.params;
        const filme =req.body;

        if (!filme.nome)
        throw new Error('bota nome');
        
        if (!filme.sinopse)
        throw new Error('bota sinopse');
        
        if (!filme.avaliacao == undefined || filme.avaliacao < 0)
        throw new Error('bota avaliacao');
        
        if (!filme.lancamento)
        throw new Error('bota lancamento');
        
        if (filme.disponivel == undefined)
        throw new Error('bota disponivel');
        
        if (!filme.usuario)
        throw new Error('nao tem usuario');
   

        const resposta = await alterarFilme(id,filme);
     if (resposta != 1)
        throw new Error('filme não pode ser alterado');
    else
        resp.status(204).send();

    }catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})

export default server;