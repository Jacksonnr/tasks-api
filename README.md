# Sistema Gerenciador de Tarefas

Esta é uma API para gerenciar tarefas (tasks), permitindo operações CRUD completas, além de uma funcionalidade especial para importar tarefas em massa a partir de um arquivo CSV.

## Funcionalidades

- **Criação de uma Task**: Adiciona uma nova tarefa ao banco de dados.
- **Listagem de Todas as Tasks**: Retorna uma lista de todas as tarefas armazenadas.
- **Atualização de uma Task pelo `id`**: Permite a atualização de uma tarefa específica pelo seu `id`.
- **Remoção de uma Task pelo `id`**: Remove uma tarefa específica pelo seu `id`.
- **Marcar uma Task como Completa pelo `id`**: Marca uma tarefa específica como completa usando o seu `id`.
- **Importação em Massa de Tasks via CSV**: Permite a importação de múltiplas tarefas a partir de um arquivo CSV.

## Tecnologias Utilizadas

- **Node.js** com **Fastify**: Framework para construção da API.
- **Sqlite**: Banco de dados relacional leve, ideal para projetos pequenos e médios.
- **Zod**: Biblioteca para validação de esquemas e dados, útil para garantir que suas entradas estejam corretas antes de serem processadas pela API.
- **TypeScript**: Adiciona tipagem estática ao JavaScript, ajudando a evitar erros e melhorar a manutenção do código.
- **Knex**: Um construtor de consultas SQL para Node.js, facilitando a interação com o banco de dados SQLite e a construção de queries SQL de forma programática.


## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/) 
- Uma ferramenta de teste de API, como [INSOMNIA](https://insomnia.rest/) ou [POSTMAN](https://www.postman.com/)


## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/Jacksonnr/tasks-api.git
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure o ambiente:

    Antes de iniciar o servidor, você pode precisar configurar variáveis de ambiente, como o banco de dados. Certifique-se de criar um arquivo .env com as configurações apropriadas. Um exemplo de arquivo .env pode ser:

    ```bash
    DATABASE_URL = './db/app.db'
    ```

4. Crie o banco de dados:

    ```bash
    npx knex migrate:latest
    ```

5. Inicie o servidor:

    ```bash
    npm run dev
    ```

6. Configure a ferramenta de testes de API para fazer requisições aos endpoints.



O servidor estará disponível em `http://localhost:3333`.

## Endpoints da API

### 1. Registro de uma nova Task

- **POST** `/tasks`
- **Descrição**: Registra uma nova taks.
- **Corpo da Requisição**:

    ```json
    {
	"title": "test task number 1",
	"description": "testing if other task create in bd, in my application"
    }
    ```

- **Resposta**: 201 Created


### 2. Visualização de Task

- **GET** `/tasks`
- **Descrição**: Retorna os dados de todas as tasks cadastradas.
- **Corpo da Requisição**: (Não é necessário)
- **Resposta**: 200 OK

    ```json
    {
		"id": "3eb0f416-08e7-4c14-8ef6-e3dcf9a28b12",
		"title": "test task",
		"description": "testing if the task create in bd, in my application",
		"completed_at": null,
		"created_at": "2024-08-28 15:11:51",
		"updated_at": null
	}
    ```

### 3. Atualização de Task

- **PUT** `/tasks/:id`
- **Descrição**: Atualiza a task através do id.
- **Corpo da Requisição** (obrigatório passar o titulo e a descrição):

    ```json
    {
	"title": "update task test",
	"description": "testing updated task"
    }   
    ```

- **Resposta**: 200 OK

### 4. Exclusão de Task

- **DELETE** `/tasks/:id`
- **Descrição**: Exclui uma task através do id.
- **Corpo da Requisição**: (Não é necessário)
- **Resposta**: 200 OK



### 5. Conclusão de Task

- **PATCH** `/tasks/:id/complete`
- **Descrição**: Marca como concluída uma task através do id.
- **Corpo da Requisição**: (Não é necessário)
- **Resposta**: 200 OK



### 6. Importação de Task via arquivo CSV

- **POST** `/tasks/upload-csv`
- **Descrição**: Importa para o sistema tasks em massa (via aquivo csv).
- **Corpo da Requisição**: (Não é necessário)
- **Resposta**: 200 OK
- **Formato do multipart/form-data**:
  
    O arquivo CSV deve ser enviado no campo `file`. Exemplo de uma requisição utilizando Insomnia:

    1. No Insomnia, selecione o método **POST** e insira a URL da API: `http://localhost:3000/tasks/upload-csv`.
    2. Vá para a aba **Body**.
    3. Selecione a opção **Multipart Form**.
    4. Adicione um novo campo com o nome `file`.
    5. No campo de valor, selecione o arquivo CSV do seu computador.

- **Resposta**: 200 OK



## Contribuindo

Se você quiser contribuir com este projeto, sinta-se à vontade para abrir issues e pull requests. Toda contribuição é bem-vinda!
