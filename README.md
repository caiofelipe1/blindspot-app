# BlindSpot — Inteligência Competitiva Automotiva

Aplicativo mobile desenvolvido para o **Desafio 1 da Ford FIAP 2026**, com foco em inteligência competitiva automotiva. O BlindSpot permite consultar, visualizar e comparar fichas técnicas de veículos, com integração em tempo real à Tabela FIPE.

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
- Ficha técnica completa: motor, transmissão, desempenho, dimensões e segurança
- Consulta de preço FIPE na ficha, com confirmação de modelo/versão e ano/combustível; sem substituição automática por anos próximos
- Consultas FIPE salvas por veículo no aparelho: reabertura sem rede, atualização manual, alteração de versão e remoção. Valor, versão, combustível, código, referência e data da consulta aparecem na comparação e no compartilhamento.
- Comparação lado a lado de até 3 veículos, com adição, troca e remoção na própria tela, rolagem lateral e compartilhamento das especificações
- Destaques por especificação quando os dados estão completos e comparáveis, sem recomendar um vencedor geral
- Escolha dos atributos existentes nas fichas para comparação, com indicação de informações indisponíveis por veículo e compartilhamento da seleção
- Favoritos com persistência local
- Sistema de notificações in-app (toast)
- Feedback tátil (haptics) em toda a navegação
- Conta local com cadastro em duas etapas (dados e confirmação), login e opção funcional de lembrar sessão

### Limitações da conta local

Explorar, comparar e salvar favoritos não exige conta. O cadastro opcional funciona apenas no aparelho, sem backend, sincronização ou recuperação de senha por e-mail; não há opção de recuperação na interface. Favoritos e histórico são compartilhados por instalação. Instalações novas começam sem favoritos; listas já salvas são preservadas. Nome, e-mail e credenciais permanecem em AsyncStorage; esse armazenamento de senhas não é adequado para autenticação de produção. Se o módulo de conta for mantido para produção, será necessária uma integração de autenticação segura.

“Lembrar de mim” preserva a sessão após reiniciar; desmarcado, somente o cadastro é preservado. Na primeira atualização do armazenamento antigo, a sessão é encerrada para solicitar uma escolha explícita, preservando as contas cadastradas. A segunda etapa não coleta endereço nem solicita aceite de documentos indisponíveis.

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

- [APK atualizado — página de download no EAS](https://expo.dev/accounts/caiofelipe1/projects/blindspot-app/builds/64557db7-bcc2-456b-95d8-6ecf042f4c41) — versão 1.0.0, build de 27/09/2026 com as correções de consulta FIPE e apresentação de preços.
- A consulta FIPE nesse APK foi confirmada em aparelho pelo integrante responsável. Os demais fluxos devem ser conferidos pelo roteiro abaixo.
- Arquivos APK locais ficam em `dist/`, pasta ignorada pelo Git. A cópia `dist/BlindSpot-1.0.0.apk` gerada anteriormente corresponde ao build antigo; para a entrega, use o link atualizado acima.
- Pacote Android: `com.caiofelipe1.blindspot`.

Para gerar novamente, com uma conta Expo autorizada no projeto:

```bash
npx eas-cli build --platform android --profile preview
```

Depois de baixar o APK no Android, abra o arquivo e permita a instalação pelo navegador/gerenciador de arquivos, se o sistema solicitar. Os dados dessa instalação são separados dos dados usados no Expo Go.

Roteiro de conferência no aparelho:

1. Abrir o app, acessar **Ver todos** e buscar um veículo.
2. Abrir a ficha, adicionar/remover favoritos e conferir a persistência ao reabrir.
3. Comparar três veículos, trocar/remover um deles e compartilhar a comparação.
4. Consultar a FIPE, confirmar a seleção e conferir o preço salvo nos cards e na comparação.
5. Reabrir sem conexão para conferir catálogo, favoritos e consultas já salvas; tentar atualizar a FIPE e conferir o tratamento da falha.
6. Conferir cadastro, login, logout e a opção de lembrar a sessão.

A compilação e os testes automatizados não substituem essa validação no aparelho.

### Pré-requisitos

- Node.js 18+
- Expo Go instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Instalação

```bash
npm install
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

## Estrutura do projeto

### Referências do catálogo

Os 17 veículos permanecem disponíveis. Seis fichas têm revisão parcial documentada e onze ainda não foram verificadas; nenhuma está certificada integralmente. Consulte [a revisão dos dados](docs/revisao-dados-catalogo.md) para conhecer correções, fontes e pendências por veículo.

Preços sem fonte foram removidos. Ranger e Pulse possuem preços históricos identificados; a FIPE aparece separadamente na comparação, usando a última consulta confirmada e salva. A comparação não classifica preços históricos nem consultas FIPE (que podem ter referências diferentes), e não destaca vantagens técnicas de fichas parciais/não verificadas. Fontes e observações acompanham o compartilhamento.

### Integração externa e consultas salvas

A descoberta de versões usa a API v2 da Parallelum por marca e ano/combustível, evitando consultar individualmente todas as versões históricas. Listas bem-sucedidas são reaproveitadas em memória por 30 minutos; consultas de preço e atualizações continuam acessando a API v1. Falhas de limite (HTTP 429), tempo de resposta e indisponibilidade do serviço têm mensagens específicas. Testes dessa camada: `node scripts/test-fipe-service.cjs`.

Na ficha, toque em **Consultar preço FIPE**, confira a versão/combustível e confirme a consulta. O resultado real da API Parallelum é salvo no aparelho e aparece na seção **Preço** da comparação. A versão escolhida na FIPE é explicitada, pois a correspondência entre nomes do catálogo e da API não é certificada automaticamente. **Atualizar preço** consulta novamente a seleção salva; **Alterar versão** permite substituí-la após nova consulta bem-sucedida. Uma falha preserva a consulta anterior e sua data. Alterações de versão/ano no catálogo invalidam o reaproveitamento da associação antiga.

As consultas não são atualizadas em segundo plano. Abrir a ficha ou comparação utiliza o armazenamento local; atualizar exige rede. Nenhum resultado simulado substitui falhas da API. Essa integração fornece preços e identificação, não substitui os dados locais de especificações técnicas nem implementa autenticação remota.

Verificações: `node scripts/test-saved-fipe.cjs`, `node scripts/test-catalog-fipe.cjs` e `node scripts/test-comparison.cjs`. O teste opcional `node scripts/check-fipe-live.cjs` executa a descoberta e a confirmação de preço usadas pelo app, com requisições reais, sem alterar consultas salvas. Aceita marca, modelo, ano e trecho da versão como argumentos. Em desenvolvimento, falhas também registram no Metro o status HTTP, o código e o endpoint, sem cabeçalhos ou dados salvos. Teste de interface Android continua necessário.

```
app/                  # Rotas (Expo Router)
src/
  components/         # Componentes reutilizáveis
  data/               # Mocks de veículos
  services/           # Integração com API FIPE
  stores/             # Estado global (Zustand)
  styles/             # Tokens de design
assets/               # Imagens e ícones
```
