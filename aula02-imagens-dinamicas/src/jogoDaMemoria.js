class JogoDaMemoria {
  // se mandar um obj = { tela: 1, idade: 2, etc: 3 }
  // vai ignorar o resto das propriedades e pegar somente a propriedades
  // tela
  constructor({ tela }) {
    this.tela = tela
    // caminho do arquivo, sempre relativo
    // ao index.html!
    this.heoisIniciais = [
      { img: './arquivos/batman.png', nome: 'batman'},
      { img: './arquivos/groot.png', nome: 'groot'},
      { img: './arquivos/thor.png', nome: 'thor'},
      { img: './arquivos/mulhermaravilha.png', nome: 'mulhermaravilha'},
    ]
  }
  // para usar o this, não podemos usar static
  inicializar() {
    // vai pegar todas as funcoes da classe tela!
    //coloca todos os herois na tela
    this.tela.atualizarImagens(this.heoisIniciais)
  }
}