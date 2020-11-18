# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber um email com instruções para recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Miltrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha oa resetar senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;


**RNF**

**RN**

- O usuário não pode alterar seu email para um email já utlizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve poder receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder vizualizar as notificações não lidas;


**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horario disponivel de um prestador;
- O usuário deve poder listar os horarios disponiveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores devem ser armazendas em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h as 18h (Primeiro as 8h, último as 17h);
- O usuário não pode agendar em um horário ja agendado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
