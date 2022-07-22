# Github User Finder

Aplicação que permite a busca por nome de usuários do Github e mostra seus repositórios.

###

![](readme/Home.png)\


## 🛠 Tecnologias utilizadas

* react: `Framework Javascript baseado em componentes`
* typescript: `Linguagem de programação com tipagem estática`
* javascript: `Linguagem de programação com tipagem dinâmica`
* axios: `Cliente HTTP para fazer requisições à API`
* styled-components: `Estilização dos componentes com CSS-in-JS`
* redux: `Controle e gerenciamento de estados`
* redux-saga: `Suporte para requisições assíncronas`
* react-router-dom: `Roteamento do sistema`
* unform: `Criação de formulários para React e React Native`
* uuidv4: `Criação de identificadores únicos universais`
* yup: `Construtor de esquemas de validações de formulários`
* polished: `Ferramenta de estilização css`
* eslint: `Ferramenta de análise de erros em códigos`
* prettier: `Ferramenta de formatação de códigos`
* reactotron: `Ferramenta para inspecionar estados`

## ✨ Features implementadas

### Página de search

* Busca por nome de usuário
* Validação de search vazio

### Página de Listagem de Repositórios

* Exibição de dados do usuário
* Navegação entre lista de repositórios públicos e starred
* Busca por nome de repositório público
* Paginação com opções de quantidade de itens por página
* Duas opções de visualização de repositórios por lista ou grid
* Refresh da página sem perder os dados de busca
* Redirecionamento para página inicial caso a url seja mainpulada
* Tratamento para usuário não encontrado e redirecionamento
* Toasts de erro, warning e success

## 📥 Execute esse projeto no seu computador

* Clonar Repositório: `git clone https://github.com/dxwebster/github-user-finder.git`
* Instalar dependências: `yarn`
* Criar aquivo .env com as seguintes variáveis:

```
REACT_APP_ENVIRONMENT = "development"
NODE_ENV = "development"
```

* Rodar Aplicação: `yarn start`

## 📕 Licença

Todos os arquivos incluídos aqui, incluindo este _Readme_, estão sob Licença MIT.\
Criado com ❤ por [Adriana Lima](https://github.com/dxwebster)
