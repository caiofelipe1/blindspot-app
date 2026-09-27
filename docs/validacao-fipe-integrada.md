# FIPE na comparação — 27/09/2026

Fluxo: ficha → consultar/confirmar versão → API real → salvar no aparelho → comparar → compartilhar. Mantidas telas e componentes existentes; sem nova aba.

Consulta salva conserva seleção da API, resultado, data e identidade da ficha. Reabrir não dispara rede. Atualizar chama diretamente a seleção salva, sem repetir busca de marcas/modelos/anos. Alterar versão só substitui a consulta anterior após resposta válida e persistência bem-sucedida; cancelar mantém o valor anterior. Remover consulta não altera favoritos nem histórico.

Validação da resposta: marca, nome do modelo/versão, ano e sigla de combustível precisam corresponder à seleção; preço, código FIPE e mês de referência precisam estar preenchidos no formato esperado. A escolha explícita do usuário continua necessária: essas verificações não certificam equivalência técnica entre a versão do mock e a nomenclatura FIPE.

Comparação mostra valor, identificação FIPE e referência com data. Compartilhamento conserva esses campos mesmo quando somente “Preço FIPE” foi selecionado. Não há ranking de preços de meses diferentes, nem mistura com preços históricos. Consultas não são atualizadas automaticamente.

## Evidências

- Testes automatizados: reabertura; atualização com falha preservando valor anterior; gravações concorrentes de dois carros; remoção persistente; associação inválida depois de alteração do ano/versão; erro de leitura e nova tentativa; compartilhamento com valor, código, versão, combustível, mês e data; respostas divergentes/incompletas rejeitadas.
- Consulta real em 27/09/2026: Ranger Raptor 3.0 V6 Bi-Turbo 4WD AUT., ano 2025, gasolina, código 003506-8, mês setembro de 2026. Usados serviço e validação do app, quatro requisições. Certificados públicos confiáveis do Windows foram fornecidos ao Node 20 via variável temporária apenas no comando de teste, pois seu conjunto padrão de certificados rejeitou a conexão. Nenhuma validação TLS foi desabilitada nem configuração do aplicativo alterada.
- Ainda não executado nesta etapa: teste visual e interação no Android/Expo Go/APK. O teste de rede no computador não comprova conectividade no dispositivo.

## Roteiro Android

### Correção de combustível — 27/09/2026

Relato do usuário reproduzido no HR-V: a seleção real é `2024-5` e o preço retorna `SiglaCombustivel: F`. A validação anterior reconhecia somente códigos 1/G, 2/A e 3/D, rejeitando Flex e elétricos. Acrescentados 4/E e 5/F, preservando rejeição de códigos desconhecidos e combustível divergente. Testes cobrem aceitação e rejeição para os cinco códigos.

Consultas reais com serviço e validação corrigidos: HR-V Touring 1.5 Flex TB 16V 5p Aut., 2024-5/F, FIPE 014102-0; Dolphin Plus (Elétrico), 2024-4/E, FIPE 095009-2. Ambas retornaram referência setembro/2026 e passaram. Teste do gesto no celular permanece a cargo da validação Android.

O script de teste real aceita marca, modelo, ano e trecho da versão: `node scripts/check-fipe-live.cjs Honda HR-V 2024 "Touring 1.5"` ou `node scripts/check-fipe-live.cjs BYD Dolphin 2024 Plus`.

1. Abrir Ranger; consultar FIPE, conferir e salvar. Voltar à comparação de dois ou três veículos e conferir seção Preço.
2. Compartilhar só Preço FIPE e conferir presença de versão, combustível, código, referência e data.
3. Encerrar/reabrir o app sem rede: consulta deve continuar visível. Atualizar sem rede deve mostrar erro mantendo o resultado anterior.
4. Restaurar a conexão e atualizar. Alterar versão e cancelar: valor anterior permanece; confirmar outra consulta válida: associação é substituída.
5. Remover consulta e reabrir: não deve reaparecer. Demais carros, favoritos e histórico permanecem.

O feedback do professor sobre integração é atendido de forma mais completa por este percurso. Catálogo/especificações e conta ainda são locais; não apresentar a mudança como eliminação de todos os mocks.
