class JogoDaMemoria {
  // se mandar um obj = { tela: 1, idade: 2, etc: 3 }
  // vai ignorar o resto das propriedades e pegar somente a propriedades
  // tela
  constructor({ tela, util }) {
    this.tela = tela
    this.util = util
    // caminho do arquivo, sempre relativo
    // ao index.html!
    this.heroisIniciais = [
      { img: './arquivos/batman.png', nome: 'batman'},
      { img: './arquivos/groot.png', nome: 'groot'},
      { img: './arquivos/thor.png', nome: 'thor'},
      { img: './arquivos/mulhermaravilha.png', nome: 'mulhermaravilha'},
    ]
    this.iconePadrao = './arquivos/padrao.png'
    this.heroisEscondidos = []
    this.heroisSelecionados = []
  }
  // para usar o this, não podemos usar static
  inicializar() {
    // vai pegar todas as funcoes da classe tela!
    // coloca todos os herois na tela
    this.tela.atualizarImagens(this.heroisIniciais)
    //força a tela a usar o THIS de jogo da memoria
    this.tela.configurarBotaoJogar(this.jogar.bind(this))
    this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
  }
  async embaralhar() {
    const copias = this.heroisIniciais
    // duplicar os itens
    .concat(this.heroisIniciais)
    // entrar em cada item e cria um id aleatório
    .map(item => {
      return Object.assign({}, item, { id: Math.random() / 0.5} )
    })
    // ordenar aleatoriamente
    .sort(() => Math.random() - 0.5)
    this.tela.atualizarImagens(copias)
    this.tela.exibirCarregando()
    // vamos esperar 1 segundo para atualizar a tela
    await this.util.timeout(1000)
    this.esconderHerois(copias)
    this.tela.exibirCarregando(false)
  }
  esconderHerois(herois) {
    // vamos trocar a imagem de todos os herois existentes
    // pelo ícone padrão
    // como fizemos no construtor, vamos extrair somente o necessário
    // usando a sintaxe ({ chave: 1 }) estamos falando que vamos retornar
    // o que estiver dentro dos parênteses
    // quando não usamos ":" (exemplo do id), o JS entende que o nome
    // é o mesmo do valor. Ex. id: id, virá id
    const heroisOcultos = herois.map(( { nome, id } ) => ({
      id,
      nome,
      img: this.iconePadrao,
    }))
    // atualizamos a tela com os herois ocultos
    this.tela.atualizarImagens(heroisOcultos)
    // guardamos os herois para trabalhar com eles depois
    this.heroisOcultos = heroisOcultos
  }
  exibirHerois(nomeHeroi) {
    // vamos procurar esse heroi pelo nome em nossos heroisIniciais
    //vamos obter somente a imagem delete
    const { img } = this.heroisIniciais.find(({ nome }) => nomeHeroi === nome)
    //vamos criar a função na tela, para exibir somente o herois selecionado
    this.tela.exibirHerois(nomeHeroi, img)
  }
  verificarSelecao(id, nome) {
    const item = { id, nome }
    // vamos verificar a quantidade de herois selecionados
    // e tomar ação se escolheu certo ou errado
    const heroisSelecionados = this.heroisSelecionados.length
    switch(heroisSelecionados){
      case 0:
        // adiciona a escolha na lista, esperando pela próxima
        // clicada
        this.heroisSelecionados.push(item)
        break;
      case 1:
        // se a quantidade de escolhidos for 1, significa
        // que o usuário só pode escolher mais um
        // vamos obter o primeiro item da lista
        const [ opcao1 ] = this.heroisSelecionados
        // zerar itens para não selecionar mais de dois
        this.heroisSelecionados = []
        // conferimos se os nomes e ids batem conforme
        // o esperado
        if(opcao1.nome ===item.nome && 
          //aqui verifica se são ids diferentes para
          // o usuário não clicar duas vezes no mesmo
          opcao1.id !== item.id
          ) {
            this.exibirHerois(item.nome)
            // como o padrão é true, não precisa passar nada
            this.tela.exibirMensagem()
            // para a execução
            return;
          }
          this.tela.exibirMensagem(false)
          // fim do case!
        break;
    }
  }
  jogar() {
    this.embaralhar()
  }
}