class LivroDao {
   
  constructor(db) {
    this._db = db
  }

  buscarPorId(id){
    return new Promise((resolve, reject)=>{
        this._db.get(`SELECT * FROM livros WHERE id= ?`, 
        [id],
        (erro, resultados) =>{
          if(erro) return reject(erro)

          return resolve(resultados)
           })
        }
    
    )
    
  }
  adiciona(livro){
    return new Promise((resolve, reject)=>{
      this._db.run(`INSERT INTO livros(
        titulo, 
        preco, 
        descricao
      )values(?,?,?)`
      , 
        [
          livro.titulo, 
          livro.preco, 
          livro.descricao
        ],
        function(err){
          if(err){
          console.log(err)
          return reject("Não foi possível adicionar o livro!")
        }
        resolve()
      }
      )
    })
  }
  remove(id) {

    return new Promise ((resolve, reject)=>{
      this._db.get(
        `DELETE FROM livros WHERE id = ?
        `,
        [id],
        (erro)=>{
          if(erro) return reject('não foipossivel deletar')
          return resolve()
        }
      )
    })
  }

  atualiza(livro) {
    return new Promise((resolve, reject) => {
        this._db.run(`
            UPDATE livros SET
            titulo = ?,
            preco = ?,
            descricao = ?
            WHERE id = ?
        `,
        [
            livro.titulo,
            livro.preco,
            livro.descricao,
            livro.id
        ],
        erro => {
            if (erro) {
                return reject('Não foi possível atualizar o livro!');
            }

            resolve();
        });
    });
}

  lista() {
    return new Promise((resolve, reject) => {

      this._db.all(
        'SELECT * FROM livros',
       (erro, resultados) =>{
          if(erro) return reject("nao foi possivel fz a parada")

          return resolve(resultados)
           } )

    })
   
  }
}

module.exports = LivroDao