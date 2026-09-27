# BlindSpot — Inteligência Competitiva Automotiva

Aplicativo mobile desenvolvido para o **Desafio 1 da Ford FIAP 2026**, com foco em inteligência competitiva automotiva. O BlindSpot reúne fichas técnicas em uma interface padronizada, permite comparar até três veículos e consulta preços FIPE pela API Parallelum.

## Objetivo

A análise de veículos concorrentes exige reunir informações dispersas e comparar versões, especificações e preços. O aplicativo facilita essa tarefa com um catálogo pesquisável, seleção de atributos e comparação lado a lado. A integração externa complementa as fichas com preços de referência consultados e salvos pelo usuário.

## Acesso para avaliação

**[Baixar o APK Android](https://expo.dev/artifacts/eas/dt4H8-o8h1Y92O4gFzNQbdUtWRXrDipG9ulGU1ctErI.apk)** — versão 1.0.0, build de 27/09/2026.

1. Abra o link no Android e baixe o arquivo APK. Este instalador não é compatível com iPhone/iOS.
2. Abra o arquivo e autorize a instalação pelo navegador ou gerenciador de arquivos, caso o Android solicite.
3. Inicie o **BlindSpot**. Não é necessário instalar Expo Go, iniciar servidor ou criar uma conta para explorar, favoritar e comparar veículos.

Uma instalação nova começa sem favoritos ou consultas FIPE salvas. Novas consultas de preço exigem internet; o catálogo e as consultas já salvas podem ser acessados sem conexão. O APK final foi testado em aparelho pelo grupo, incluindo consulta FIPE e fechamento e reabertura do aplicativo.

---

## Integrantes

| RM | Nome |
|----|------|
| 565065 | Augusto Barcelos Barros |
| 556197 | Caio Felipe de Lima Bezerra |
| 555541 | Juan Francisco Alves Muradas |
| 555931 | Lucas Derenze Simidu |
| 554873 | Sofia Fernandes |

---

## Funcionalidades

- Explorar veículos por seções do catálogo (destaques, outros modelos e elétricos)
- Busca por marca, modelo, ano e versão entre as fichas disponíveis no catálogo, funcionando sem conexão
- Fichas técnicas com os dados disponíveis de motor, transmissão, desempenho, dimensões e segurança
- Consulta de preço FIPE na ficha, com confirmação de modelo/versão e ano/combustível; sem substituição automática por anos próximos
- Consultas FIPE salvas por veículo no aparelho: reabertura sem rede, atualização manual, alteração de versão e remoção. Valor, versão, combustível, código, referência e data da consulta aparecem na comparação e no compartilhamento.
- Comparação lado a lado de até 3 veículos, com adição, troca e remoção na própria tela, rolagem lateral e compartilhamento das especificações
- Escolha dos atributos existentes nas fichas para comparação, com indicação de informações indisponíveis por veículo e compartilhamento da seleção
- Favoritos com persistência local
- Sistema de notificações in-app (toast)
- Feedback tátil (haptics) em toda a navegação
- Conta local com cadastro em duas etapas (dados e confirmação), login e opção funcional de lembrar sessão

### Limitações da conta local

O cadastro opcional funciona apenas no aparelho, sem backend, sincronização ou recuperação por e-mail. Favoritos e histórico pertencem à instalação, não a uma conta individual. Nome, e-mail e credenciais são armazenados em AsyncStorage; a autenticação local tem finalidade acadêmica e não é adequada para produção. Use dados fictícios no cadastro.

“Lembrar de mim” preserva a sessão após reiniciar; desmarcado, somente o cadastro é preservado.

---

## Stack

- **Expo** (SDK 54) + **React Native** + **TypeScript**
- **Expo Router** - navegação baseada em arquivos
- **NativeWind** - estilização via Tailwind para React Native
- **Zustand** - gerenciamento de estado global com persistência via AsyncStorage
- **Axios** - integração com a API FIPE (`parallelum.com.br`)
- **expo-haptics** - feedback tátil

---

## Como rodar o Blindspot App

### APK Android (entrega)

O perfil `preview` do EAS gera um APK instalável, sem depender do Expo Go ou de um servidor de desenvolvimento.

- [APK atualizado — download direto](https://expo.dev/artifacts/eas/dt4H8-o8h1Y92O4gFzNQbdUtWRXrDipG9ulGU1ctErI.apk) — versão 1.0.0, build de 27/09/2026 com as correções de consulta FIPE e apresentação de preços.
- Pacote Android: `com.caiofelipe1.blindspot`.

Para gerar novamente, com uma conta Expo autorizada no projeto:

```bash
npx eas-cli build --platform android --profile preview
```

Depois de baixar o APK no Android, abra o arquivo e permita a instalação pelo navegador/gerenciador de arquivos, se o sistema solicitar. Os dados dessa instalação são separados dos dados usados no Expo Go.

### Guia de uso

1. Abrir o app, acessar **Ver todos** e buscar um veículo.
2. Abrir a ficha, adicionar/remover favoritos e conferir a persistência ao reabrir.
3. Comparar três veículos, trocar/remover um deles e compartilhar a comparação.
4. Consultar a FIPE, confirmar a seleção e conferir o preço salvo nos cards e na comparação.
5. Reabrir sem conexão para conferir catálogo, favoritos e consultas já salvas; tentar atualizar a FIPE e conferir o tratamento da falha.
6. Conferir cadastro, login, logout e a opção de lembrar a sessão.

### Desenvolvimento local

- Ambiente utilizado: Node.js 20.19.4 e npm.
- Expo Go compatível com **SDK 54**, caso opte por executar o código no celular. No Android, a versão compatível está disponível na [página do Expo Go para SDK 54](https://expo.dev/go?sdkVersion=54&platform=android&device=true). O APK da entrega funciona de forma independente.

### Instalação

```bash
npm ci
```

### Iniciar

```bash
npm start
```

Escaneie o QR code com o Expo Go para abrir o app.

### Credenciais de teste

```
Email: test@ford.com
Senha: 123456
```

---

## Dados e integração externa

### Referências do catálogo

Os 17 veículos permanecem disponíveis. Seis fichas têm revisão parcial documentada e onze ainda não foram verificadas; nenhuma está certificada integralmente. Consulte [a revisão dos dados](docs/revisao-dados-catalogo.md) para conhecer correções, fontes e pendências por veículo.

Ranger e Pulse possuem preços históricos identificados no catálogo. Uma consulta FIPE salva tem prioridade na exibição de preço da ficha e dos cards. A seção de preços da comparação apresenta a FIPE e seus dados de referência, sem misturar valores históricos. Fichas parciais ou não verificadas não recebem destaques de vantagem técnica. Fontes e observações acompanham o compartilhamento.

### Integração externa e consultas salvas

A descoberta de versões usa a API v2 da Parallelum por marca e ano/combustível, evitando consultar individualmente todas as versões históricas. Listas bem-sucedidas são reaproveitadas em memória por 30 minutos; consultas de preço e atualizações continuam acessando a API v1. Falhas de limite (HTTP 429), tempo de resposta e indisponibilidade do serviço têm mensagens específicas. Testes dessa camada: `node scripts/test-fipe-service.cjs`.

Na ficha, toque em **Consultar preço FIPE**, confira a versão/combustível e confirme a consulta. O resultado real da API Parallelum é salvo no aparelho e aparece na seção **Preço** da comparação. A versão escolhida na FIPE é explicitada, pois a correspondência entre nomes do catálogo e da API não é certificada automaticamente. **Atualizar preço** consulta novamente a seleção salva; **Alterar versão** permite substituí-la após nova consulta bem-sucedida. Uma falha preserva a consulta anterior e sua data. Alterações de versão/ano no catálogo invalidam o reaproveitamento da associação antiga.

As consultas não são atualizadas em segundo plano. Abrir a ficha ou comparação utiliza o armazenamento local; atualizar exige rede. Nenhum resultado simulado substitui falhas da API. Essa integração fornece preços e identificação, não substitui os dados locais de especificações técnicas nem implementa autenticação remota.

O serviço externo pode limitar novas consultas (HTTP 429) ou ficar indisponível. Nessas situações, o app informa o motivo e preserva os preços já salvos; gerar ou reinstalar o APK não remove limites impostos pelo serviço. Consulte a [documentação da Parallelum](https://deividfortuna.github.io/fipe/) para as condições de acesso.

## Verificações técnicas

Após instalar as dependências:

```bash
npx tsc --noEmit
npm run lint
node scripts/test-auth.cjs
node scripts/test-catalog-fipe.cjs
node scripts/test-comparison.cjs
node scripts/test-fipe-service.cjs
node scripts/test-saved-fipe.cjs
```

Os testes cobrem conta local, filtros, comparação, validação das respostas FIPE, cache, persistência e tratamento de falhas. Para uma consulta real opcional, que consome a cota do serviço e não altera dados salvos:

```bash
node scripts/check-fipe-live.cjs Toyota Hilux 2024 GR-S
```

## Estrutura do projeto

```
app/                  # Rotas (Expo Router)
src/
  components/         # Componentes reutilizáveis
  data/               # Catálogo local de veículos
  services/           # Integração com API FIPE
  stores/             # Estado global (Zustand)
  styles/             # Tokens de design
  utils/              # Filtros, comparação e validações
assets/               # Imagens e ícones
scripts/              # Testes e verificações
docs/                 # Revisões e referências técnicas
```
