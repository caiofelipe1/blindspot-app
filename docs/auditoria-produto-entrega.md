# Auditoria de produto e aderência — 27/09/2026

## Escopo e conclusão

Revisão das rotas, componentes, catálogo, persistência, busca, comparação, FIPE e documentação, confrontada com Ford_V2.pdf (Mobile, página 13) e FORD_apresentacao.pdf (Desafio 01). Não houve alteração funcional nesta auditoria. Não é certificação visual nem teste do APK em dispositivo.

O núcleo de consulta e comparação faz sentido. Há incoerências de produto, dados sem validação suficiente e pendências de entrega; não é possível declarar aderência integral. O PDF `FordV1 - Alunos (1).pdf` não foi localizado: os requisitos específicos de Mobile do primeiro semestre continuam sem confirmação.

## Requisitos

### Implementação após a auditoria

Primeiro bloco concluído: abertura prioriza explorar/comparar e apresenta conta como opcional; removidos link e rota de recuperação indisponível, notas dos cards e títulos de popularidade/custo-benefício sem evidência. Favoritos começam vazios em novas instalações, preservando listas existentes. Busca recuperou contraste normal. Cadastro mantido provisoriamente devido à rubrica V1 ainda não confirmada. Os achados abaixo registram o estado auditado; revisão factual do catálogo, padronização e validação do APK continuam pendentes.

| Critério | Situação |
| --- | --- |
| Consultar marca/modelo/versão | Implementado para 17 veículos locais; não é pesquisa geral do mercado. |
| Definir atributos desejados | Parcial: seleciona campos existentes; não pesquisa atributos arbitrários. Remover o campo livre sem preenchimento melhorou a experiência, mas não implementou essa capacidade do desafio. |
| Padronizar saída e explicitar ausências | Comparação apresenta ausências; ficha oculta alguns campos/seções. Vocabulário dos atributos ainda precisa de padronização. |
| Validar exemplo Ranger Raptor | Revisão documental registrada em validacao-ranger-raptor.md; conferência visual no Android pendente. Não estende validação aos demais carros. |
| Fluxos sem erros e UX consistente | Há testes de lógica aprovados; revisão de produto abaixo e validação em dispositivo ainda pendentes. |
| APK instalável e executável | Configuração EAS preview existe; geração, instalação e execução não comprovadas nesta auditoria. |
| README completo e demonstração de todas as telas | README existe; faltam evidências finais, instruções de entrega do APK e demonstração completa. |
| Login/cadastro/recuperação | Não são explicitamente exigidos no slide de Mobile da Sprint 3. Autenticação/JWT aparecem em outra disciplina; não transferir automaticamente esse requisito para Mobile. Rubrica V1 não disponível. |

## Achados por fluxo

| Prioridade | Área / evidência | Problema e recomendação |
| --- | --- | --- |
| Alta | Conta: app/login.tsx, reset-password.tsx | “Esqueceu a senha?” abre apenas explicação de indisponibilidade. Não entrega a ação sugerida. Remover a entrada enquanto não houver recuperação real. A correção anterior eliminou a promessa falsa, mas não tornou esse fluxo útil. |
| Alta | Conta: authStore.ts, profile.tsx | Conta local não habilita função relevante nem separa favoritos/histórico. Recomendação de produto: uso direto sem cadastro e aba Sobre. Antes de eliminar o módulo inteiro, conferir eventual requisito V1 ou integração prevista pelo grupo. Não construir backend só para justificar telas opcionais. |
| Alta | authStore.ts | Senhas ficam em texto legível no AsyncStorage. Não apresentar esse mecanismo como autenticação de produção. Se conta for requisito, precisa de uma solução real de autenticação. |
| Média | index.tsx | Login/cadastro têm destaque maior que explorar, apesar de toda a função principal ser livre. A abertura não adapta esses convites à sessão existente. Tornar consultar/comparar a ação principal. |
| Média | index.tsx, explore.tsx | “Encontre o Carro Ideal” e linguagem de compra aproximam o app de um catálogo comercial; o desafio é apoiar análise competitiva da Ford. Ajustar apresentação para pesquisa de especificações e comparação. |
| Alta | vehicles.mock.ts | Dados fixos não equivalem a dados validados. Há selos “verificado” acompanhados apenas de nomes genéricos de fontes, sem documento/URL, data ou rastreabilidade. Reservar o selo a registros efetivamente conferidos. |
| Alta | vehicles.mock.ts, Pulse Impetus T200 2024 | Motor registrado como “1.3 Turbo 200 Flex”; comunicado Fiat de 25/06/2024 identifica Turbo 200 como 1.0. Divergência confirmada por fonte oficial, suficiente para exigir revisão factual do catálogo. Outras combinações suspeitas não foram certificadas nesta auditoria. |
| Alta | VehicleCard.tsx, vehicles.mock.ts | Notas numéricas fixas sem avaliações nem metodologia. Remover estrelas/notas ou definir uma medida real e explicar sua origem. |
| Média | explore.tsx | “Mais acessados essa semana” não usa acessos; “Top elétricos custo benefício” não usa cálculo; “Favoritos para acessar agora” é lista fixa. Usar títulos factuais como “Destaques do catálogo”, “Outros modelos” e “Elétricos”. |
| Média | VehicleSection.tsx | Todos os “Ver todos” levam ao catálogo global. Funciona e foi aprovado pelo usuário; “Ver catálogo” seria mais preciso se a intenção continuar sendo global. Sem necessidade de refazer o fluxo. |
| Alta | favoritesStore.ts | Instalação nova já começa com cinco favoritos vindos do mock. Favorito deve representar escolha do usuário; começar vazio. Alterar o padrão não deve apagar escolhas já persistidas. |
| Média | favoritesStore.ts, vehicleStore.ts, profile.tsx | Favoritos/histórico pertencem ao dispositivo, mesmo trocando a conta. Faz sentido sem login; com contas, a experiência sugere uma separação que não existe. |
| Baixa | register.tsx, register-info.tsx | Segunda etapa apenas confirma dados. É funcional, mas aumenta o percurso de uma conta sem benefício atual. Reavaliar junto com o módulo de conta. |
| Alta | vehicle/[id].tsx, SpecRow | Ficha omite dados/seções ausentes e valores podem ser limitados a duas linhas. Padronizar campos relevantes, explicitar ausência e permitir ler o valor completo; especialmente importante para modos/equipamentos da Ranger. |
| Alta | Ficha, cards, comparação | Preços fixos não têm referência temporal igualmente visível. Não tratar preço histórico do material e FIPE consultada como valores da mesma natureza. Mostrar origem/referência junto ao preço e conservar essa distinção no compartilhamento. |
| Média | Ficha: fontes | Nomes de fabricantes acompanhados de ícone de confirmação não permitem conferir o dado. Disponibilizar documento/URL, versão/ano e referência temporal apropriada. |
| Média | ComparisonAttributes.tsx | Seletor reúne campos de todo o catálogo. Pode oferecer atributos ausentes em todos os carros selecionados, repetindo parte da frustração do campo personalizado. Priorizar os disponíveis em pelo menos um selecionado. |
| Média | comparison.tsx, utils/comparison.ts | Comparação de 2–3 carros e gerenciamento fazem sentido. Segurança aparece como lista textual, dificultando cotejo por equipamento; padronizar os equipamentos mais relevantes. Não há pesquisa externa de especificações. |
| Média | utils/comparison.ts | Compartilhamento leva os valores e campos escolhidos, mas não toda a proveniência/notas de validação. Levar também referência e limitações relevantes para não perder contexto fora do app. |
| Média | fipeLookup.ts | FIPE é complemento útil, não requisito explícito. Correspondência de família de modelo não comprova equivalência exata de acabamento/motorização; manter seleção explícita e testar casos reais. Testes atuais usam respostas simuladas. |
| Média | result.tsx, recently-viewed.tsx, VehicleCard.tsx | Duas colunas de 170 + espaçamento 20 + margens 32 exigem 392 pontos. Risco estrutural de corte em telas estreitas; ajustar largura ao espaço disponível. Ainda não reproduzido em dispositivo nesta auditoria. |
| Média | BottomNav.tsx, _layout.tsx | Barra inferior com medidas fixas e telas com fundo branco sob tema automático merecem teste de áreas seguras, tema escuro e fonte ampliada. São riscos de layout, não falhas visuais comprovadas aqui. |
| Média | profile.tsx, persistência | Redirecionamento não aguarda explicitamente hidratação da conta. Avaliar abertura direta/reinício com sessão salva para descartar redirecionamento prematuro. Testes da store não cobrem esse comportamento da tela. |
| Baixa | explore.tsx | Busca funcional tem opacidade reduzida, podendo parecer desabilitada. Melhorar contraste/estado visual. |
| Baixa | app/modal.tsx | Rota remanescente do template, em inglês, sem finalidade no produto. Remover do escopo navegável/entrega. |
| Alta | README.md, eas.json | Documentar APK final, instalação, limitações reais, demonstração e validação. Orientação genérica para Expo Go precisa considerar compatibilidade com SDK 54, problema já encontrado pelo usuário. |

## O que manter

Busca encadeada pelo catálogo disponível; catálogo completo acessível; ficha por veículo; comparação de até três com adicionar/trocar/remover; escolha de atributos existentes; favoritos escolhidos pelo usuário; histórico local; compartilhamento; FIPE como consulta complementar claramente identificada. Não há justificativa no enunciado lido para acrescentar sensores ou funcionalidades decorativas.

## Ordem recomendada

1. Retirar promessas sem função ou evidência: recuperação indisponível, avaliações, rankings e favoritos pré-selecionados; decidir papel da conta considerando a ressalva V1.
2. Conferir dados dos veículos e seus selos/fontes. Se o prazo exigir catálogo menor, priorizar um conjunto rastreável que permita comparação útil, preservando a Ranger exigida.
3. Uniformizar ficha, ausências e referência dos preços; eliminar cortes de conteúdo e grades com largura fixa.
4. Executar roteiro no Android e no APK final; completar README e demonstração. Não aumentar escopo antes disso.

## Verificação executada

Em 27/09: scripts/test-auth.cjs, scripts/test-catalog-fipe.cjs e scripts/test-comparison.cjs aprovados; TypeScript --noEmit aprovado; ESLint em app e src: zero erros, sete avisos. Os testes não validam a veracidade das especificações, a API FIPE ao vivo nem o layout/instalação Android.

## Fontes

- Downloads/Ford_V2.pdf, página 13 (Mobile Sprint 3); separar dos requisitos das outras disciplinas.
- Downloads/FORD_apresentacao.pdf, especialmente slides 7, 13, 15, 16 e 18 (dor, exemplo, entrada/saída e atributos).
- [Fiat, comunicado de 25/06/2024](https://www.media.stellantis.com/br-pt/fiat/press/fiat-pulse-supera-a-marca-de-150-mil-unidades-produzidas-no-polo-automotivo-de-betim): motorizações do Pulse.

Este relatório refina a ordem sugerida na revisão anterior: autenticação de produção não deve ser tratada como obrigação de Mobile sem confirmar a necessidade do módulo.
