# Correção da descoberta de versões — 27/09/2026

O fluxo anterior carregava marcas, modelos e os anos de cada versão histórica da família. Na Toyota, a busca por Hilux retornou 77 modelos (incluindo SW4); uma única falha na sequência interrompia toda a abertura. O erro apresentado tratava qualquer falha HTTP como problema de conexão. O status HTTP ocorrido no celular não foi capturado, portanto a causa exata daquele erro não foi confirmada.

A descoberta agora consulta os anos da marca e os modelos de cada combustível no ano exato, pelos endpoints v2 documentados em https://deividfortuna.github.io/fipe/v2/. Mantém o formato interno e o endpoint v1 de preços para preservar consultas salvas. Hilux SW4 é excluída da família da picape. Respostas de descoberta têm cache em memória de 30 minutos, com compartilhamento de requisições simultâneas e descarte de falhas; o preço não é armazenado nesse cache. A persistência das consultas confirmadas continua independente.

Validação real do fluxo novo, incluindo preço confirmado:

- Hilux GR-S 2024: 10 versões disponíveis; 6 chamadas de descoberta.
- HR-V Touring 2024: 4 versões disponíveis; 5 chamadas de descoberta.
- Amarok Highline 2024: 3 versões disponíveis; 5 chamadas de descoberta.

TypeScript, lint e testes de serviço, catálogo/FIPE, persistência e comparação passaram. Ainda é necessário conferir a interface no celular. O APK gerado anteriormente não contém esta correção.
