# Criativas
Repositório destinado ao desenvolvimento ao banco de ideais 'Criativas', da matéria EC47G-C81 - Grupo 06

# Apresentação das Funcionalidades Desenvolvidas
Listagem das Funcionalidades Desenvolvidas

## Cadastro de Usuários
- Permite o registro de novos usuários através da tela de cadastro, onde são informados nome completo, e-mail e senha.
- A senha é armazenada de forma segura no banco de dados com criptografia, garantindo a proteção das informações.

## Login

- Sistema de autenticação que permite aos usuários acessar o sistema.
- Uma sessão é gerada e armazenada no localStorage do navegador para manter o estado do usuário logado.

## Criação de Ideias

- Na tela de cadastro de ideias, é possível enviar um formulário contendo:
- Categoria e texto da ideia (informados pelo usuário).
- Data de criação, usuário responsável e número inicial de curtidas (0), gerados automaticamente.

## Perfil
- Tela dedicada para exibir informações sobre o usuário logado, como nome e e-mail.

## Home

Apresenta uma listagem de todas as ideias cadastradas, exibindo atributos como categoria, texto, autor, data de criação e número de curtidas.

# Instrução de Instalação

Este documento contém as instruções para inicializar as partes backend e frontend do projeto.

## Pré-requisitos

Abaixo estão os pré-requisitos para compilar e executar o sistema

### Compilar e Executar

- **Node.js** instalado (versão 18.17.1 ou superior): [https://nodejs.org/pt](https://nodejs.org/pt);
- Um console para executar os comandos (ex.: CMD, Git Bash ou Terminal do Visual Studio Code);
- Uma conta no MongoDB: [https://www.mongodb.com/pt-br](https://www.mongodb.com/pt-br);
- **Git** (versão 2.47.1 ou superior) - *opcional*: [https://git-scm.com/downloads](https://git-scm.com/downloads);
- Um navegador atualizado para acessar a interface do projeto.

## Vídeo de Instalação das Ferramentas e Execução do Sistema
[Link Google Drive](https://drive.google.com/file/d/1YIk4fIpO3qpetR5HnG4P3J8oMlsrZrQe/view)

## Bibliotecas:

Abaixo estão listadas as bibliotecas e ferramentas utilizadas no projeto, organizadas por **frontend** e **backend**, com suas respectivas versões e links para mais informações.

### Frontend

- **React** (v18.3.1): [https://reactjs.org/](https://reactjs.org/)
- **React DOM** (v18.3.1): [https://reactjs.org/docs/react-dom.html](https://reactjs.org/docs/react-dom.html)
- **React Router DOM** (v6.28.0): [https://reactrouter.com/](https://reactrouter.com/)
- **Vite** (v5.4.10): [https://vitejs.dev/](https://vitejs.dev/)
- **ESLint** (v9.13.0): [https://eslint.org/](https://eslint.org/)

### Backend

- **CORS** (v2.8.5): [https://github.com/expressjs/cors](https://github.com/expressjs/cors)
- **Crypto** (v1.0.1): [https://nodejs.org/api/crypto.html](https://nodejs.org/api/crypto.html)
- **Dotenv** (v16.4.5): [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv)
- **Express** (v4.21.1): [https://expressjs.com/](https://expressjs.com/)
- **JSON Web Token (JWT)** (v9.0.2): [https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- **MongoDB Node.js Driver** (v6.10.0): [https://www.mongodb.com/docs/drivers/node/](https://www.mongodb.com/docs/drivers/node/)
- **Nodemon** (v3.1.7): [https://nodemon.io/](https://nodemon.io/)
- **Passport** (v0.7.0): [https://www.passportjs.org/](https://www.passportjs.org/)
- **Passport Local** (v1.0.0): [https://github.com/jaredhanson/passport-local](https://github.com/jaredhanson/passport-local)

## Baixando o Projeto

### Manual

 1. Dentro do repositório, clique em **Code**.  
 2. Selecione a opção **Download ZIP** para baixar os arquivos.  
 3. Mova o arquivo compactado para a pasta desejada no seu computador.  
 4. Descompacte o arquivo e acesse a pasta criada. 

### Git
 
 1. Crie uma pasta para armazenar o projeto.
 2. Abra o Git Bash dentro da pasta.
 3. Execute o seguinte comando:
 ```bash
 git clone https://github.com/MenossiJose/Criativas.git
 ```
 4. Acesse a pasta Criativas.

## Inicialização e Configuração do Banco de Dados

 1. Acesse [MongoDB](https://www.mongodb.com/pt-br) e faça login.
 2. Crie um novo **Cluster** clicando na opção **Create Cluster**.  
 3. Após criar o cluster, acesse a opção **Connect** e selecione **Drivers**.
 4. Copie o código de conexão fornecido. 
    - **Exemplo**: 
    ```text
    mongodb+srv://seunome:<db_password>@teste123987.w9y02.mongodb.net/?retryWrites=true&w=majority&appName=Teste
    ```
    - Substitua `<db_password>` pela senha que você configurou ao criar o cluster.
 5. Navegue até a pasta do projeto e abra o arquivo `.env` localizado em `parcial/backend`.  
 6. O arquivo `.env` terá os seguintes campos:
    - MONGO_CS=''
    - MONGO_DB_NAME =''
 7. Preencha o campo **MONGO_CS** com o seu link de conexão já com a senha. 
    - **Exemplo**: 
    ```text
    MONGO_CS='mongodb+srv://seunome:senha123@teste123987.w9y02.mongodb.net/?retryWrites=true&w=majority&appName=Teste'
    ```
 8. Preencha o campo **MONGO_DB_NAME** com o nome do seu cluster.
    - **Exemplo**:
    ```text
    MONGO_DB_NAME ='Teste'
    ```

## Inicialização do Backend

Abra um console dentro da pasta do projeto e navegue até a pasta parcial/backend:
```bash
cd parcial/backend
```
Instale as dependências do projeto com o comando:
```bash
npm install
```
Inicie o servidor backend:
```bash
npm run dev
```
## Inicialização do Frontend

Abra um console dentro da pasta do projeto e navegue até a pasta parcial/frontend:
```bash
cd parcial/frontend
```
Instale as dependências do projeto com o comando:
```bash
npm install
```
Inicie o servidor frontend:
```bash
npm run dev
```

## Acesso ao Projeto

Após executar o comando de inicialização do frontend, será exibido um endereço localhost no console (geralmente algo como http://localhost:5173).

Exemplo de saída:
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help

Copie esse endereço e cole no campo de URL do seu navegador para acessar a interface do projeto.

# Roteiro de Teste do Sistema

## Cadastro de Usuário

- Passo 1: Acesse a tela de cadastro.
- Passo 2: Preencha os campos obrigatórios (nome completo, e-mail válido e senha).
- Passo 3: Submeta o formulário para criar a conta.

## Login no Sistema

- Passo 1: Acesse a tela de login.
- Passo 2: Informe o e-mail e senha previamente cadastrados.
- Passo 3: Submeta os dados e autentique-se no sistema.

- Observação: O usuário precisa estar logado para acessar as telas de perfil e cadastro de ideias.

## Acesso à Tela de Perfil

- Pré-requisito: Estar logado no sistema.

- Passo 1: Após o login, acesse a tela de perfil.
- Passo 2: Verifique as informações exibidas, como nome completo e e-mail.

## Cadastro de Ideias

- Pré-requisito: Estar logado no sistema.

- Passo 1: Acesse a tela de cadastro de ideias.
- Passo 2: Preencha os campos obrigatórios (categoria e texto da ideia).
- Passo 3: Submeta o formulário para registrar a ideia no banco de dados.

## Acesso à Tela Home

- Passo 1: Acesse a tela inicial do sistema.
- Passo 2: Verifique a listagem de ideias cadastradas, confirmando a exibição dos atributos como categoria, texto, autor, data de criação e curtidas.
