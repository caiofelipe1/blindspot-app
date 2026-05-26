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

- Explorar veículos por categorias (populares, favoritos, elétricos)
- Busca por marca, modelo, ano e versão com integração à API FIPE
- Ficha técnica completa: motor, transmissão, desempenho, dimensões e segurança
- Consulta de preço FIPE em tempo real
- Comparação lado a lado de até 3 veículos com identificação automática de vencedor por especificação
- Favoritos com persistência local
- Sistema de notificações in-app (toast)
- Feedback tátil (haptics) em toda a navegação
- Autenticação com fluxo de login e cadastro em 2 etapas

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
