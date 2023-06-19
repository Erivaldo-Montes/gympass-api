# APP

GymPass styl app.

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o números de check-in realizados pelos usuário logado;
- [] Deve ser possível o usuários obter seu histórico de check-ins;
- [] Deve ser possível o usuário obter academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] O usuário não deve poder fazer dois check-ins no mesmo dia
- [x] O usuário não deve o poder fazer check-in se não estiver perto (100m) da academia
- [] O check-in só pode ser validado até 20 minutos após ser criado
- [] O check-in só pode ser validado por adminstradores;
- [] A academia só poder ser cadastradas por administradores

## RNFs (Requisitos Não Funcionais)

- [x] A senha do usuário precisa estar criptgrafada
- [x] Os dados precisam estar persistidos em um banco de dados postgresSQL
- [] Todas as listas precisam estar paginadas com até 20 items por paginas;
- [] O usuário precisa ser identificado por um JWT
