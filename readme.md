# APP

GymPass styl app.

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o números de check-in realizados pelos usuário logado;
- [x] Deve ser possível o usuários obter seu histórico de check-ins;
- [x] Deve ser possível o usuário obter academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] O usuário não deve poder fazer dois check-ins no mesmo dia
- [x] O usuário não deve o poder fazer check-in se não estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após ser criado
- [x] O check-in só pode ser validado por adminstradores;
- [x] A academia só poder ser cadastradas por administradores

## RNFs (Requisitos Não Funcionais)

- [x] A senha do usuário precisa estar criptgrafada
- [x] Os dados precisam estar persistidos em um banco de dados postgresSQL
- [x] Todas as listas precisam estar paginadas com até 20 items por paginas;
- [x] O usuário precisa ser identificado por um JWT


// para configurar o ambiente de test vitest tem que linkar o pacote de teste 
 ao projeto
 'npm link' no pacote de test
 'npm link ${pacote}' no projeto