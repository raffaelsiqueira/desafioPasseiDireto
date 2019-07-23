Desafio Passei Direto - Catálogo de discos

Catálogo de Discos - Tarefa desafio do processo seletivo do Passei Direto

## Primeiros passos

Essas instruções farão com que você tenha uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

Possuir o Docker (versão mínima: 2.0.0), o Nodejs (versão minima: 8.0.0) e o NPM (versão mínima: 6.4.1) instalados em sua máquina.

### Instalação

Na pasta do projeto, instalar as dependências necessárias do Nodejs através do comando:

```
npm install
```

## Como rodar

Serão necessários dois terminais abertos na pasta raiz do projeto. Um para subir o banco de dados e outro para a aplicação em si.

### Subindo o banco de dados

Para deixar o banco de dados de pé, é necessário rodar o seguinte comando docker:

```
docker run --rm --name raffael -p 3306:3306 -v <PROJ_ROOT>/docker/data:/var/lib/mysql -v <PROJ_ROOT>/docker/sql:/docker-entrypoint-initdb.d -e MYSQL_ROOT_PASSWORD=123456 mysql:latest
```

Incluindo o diretório onde está a pasta da aplicação. Como exemplo, o que foi utilizado durante o desenvolvimento:

```
docker run --rm --name raffael -p 3306:3306 -v c:/raffael/data:/var/lib/mysql -v c:/raffael/sql:/docker-entrypoint-initdb.d -e MYSQL_ROOT_PASSWORD=123456 mysql:latest
```

### Inicializando a aplicação

No outro terminal que foi aberto, rodar o seguinte comando que subirá a aplicação backend em nodejs e a frontend em react:

```
npm run dev
```

## Configurações de banco

É necessário criar na pasta raiz do projeto um arquivo chamado 'config.js', que está incluído no gitignore para não ser versionado. Nele devem conter as informações de banco no seguinte formato:

```
module.exports = {
    host:'localhost',
    user: 'root',
    password:'',
    database:'db_discos'
}
```
