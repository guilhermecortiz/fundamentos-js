const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_BTN_MOSTRAR = "mostrarTudo"
class Tela {
  static obterCodigoHtml(item) {
  return `
    <div class="col-md-3">
      <div class="card" style="width: 50%;">
        <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
      </div>
      <br />
    </div>`
  }

  static alterarConteudoHTML(codigoHtml) {
    const conteudo = document.getElementById(ID_CONTEUDO)
    conteudo.innerHTML = codigoHtml
    // console.log(conteudo.innerHTML)
  }

  static gerarStringHTMLPelaImagem(itens) {
    //para cada item da lista, vai executar a funcao obterCodigoHtml
    //ao final, vai concatenar tudos em uma unica string
    //moda de Array para Sting
    return itens.map(Tela.obterCodigoHtml).join('')
  }

  static atualizarImagens(itens) {
    const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
    Tela.alterarConteudoHTML(codigoHtml)
  }

  static configurarBotaoJogar(funcaoOnClick) {
    const btnJogar = document.getElementById(ID_BTN_JOGAR)
    btnJogar.onclick = funcaoOnClick
  }
}