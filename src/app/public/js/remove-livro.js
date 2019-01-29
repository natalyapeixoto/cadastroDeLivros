const tabelaLivros = document.querySelector("#livros")
  tabelaLivros.addEventListener("click", (evento)=>{
    const elementoClicado = evento.target

    if(elementoClicado.dataset.type == 'remove') {
      const livroId = elementoClicado.dataset.ref

      fetch(`http://localhost:3000/livros/${livroId}`, { method: 'DELETE' })
        .then(resposta =>{
          let tr = elementoClicado.closest(`#livro_${livroId}`)
          tr.remove()
        })
        .catch(erro => console.log(erro))
        
    }
  })