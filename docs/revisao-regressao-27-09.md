# Revisão após integração FIPE — 27/09/2026

## Escopo

Leitura de todas as rotas e componentes dos fluxos principais: abertura, explorar, busca/resultados, ficha, FIPE, comparação/atributos/compartilhamento, favoritos, histórico, login/cadastro/perfil, navegação e persistência. Verificação por código, testes automatizados, consultas reais e exportação Android. Não houve controle de emulador nem execução visual no telefone nesta revisão.

## Corrigido

1. **Família FIPE:** Corolla Cross e Dolphin Mini eram aceitos como candidatos de Corolla e Dolphin. Agora são excluídos dessas famílias; associações antigas salvas também não são reaproveitadas. Versões da família correta continuam disponíveis.
2. **Consulta salva:** o recebimento aceitava diferenças de pontuação/acentos/caixa no nome, mas a reabertura exigia igualdade literal. A verificação agora usa a mesma normalização, evitando ocultar uma consulta aceita.
3. **Sessão:** perfil podia redirecionar antes de carregar a conta persistida. Perfil aguarda leitura; login/cadastro bloqueiam confirmação durante leitura. Falha de armazenamento mostra nova tentativa, em vez de presumir conta ausente ou continuar carregando indefinidamente. Estado de carregamento separado das credenciais, sem gravá-lo no armazenamento.
4. **Voltar:** login, cadastro, resultados, histórico e ficha agora possuem destino alternativo quando não existe tela anterior.
5. **Favoritos:** estado vazio passou a rolar; grade usa uma coluna em telas pequenas/fonte ampliada e cabeçalho permite quebra. Ajuste estrutural; resultado visual ainda depende de teste no celular.
6. **Notificações:** IDs não colidem em eventos no mesmo milissegundo; dependências do efeito corrigidas. Falha de vibração não gera rejeição de Promise sem tratamento.
7. **Template:** removida rota residual em inglês `/modal`, sem função no produto.
8. **Verificação técnica:** lint completo incluía scripts CommonJS sem reconhecer `__dirname` e arquivos gerados do Expo. Configuração corrigida; imports/avisos remanescentes limpos. Script legado FIPE foi substituído pelo teste que usa o serviço real do app: não aceita ano próximo nem desativa TLS.

## Resultados

- TypeScript: aprovado.
- ESLint do repositório inteiro: zero erros e zero avisos após correções.
- Testes de conta: cadastro, duplicidade, lembrar sessão, reinício, logout, migração e falha/nova tentativa de leitura aprovados.
- Testes catálogo/FIPE: combinações locais, filtros, famílias de modelo, cinco códigos de combustível, rejeição de resposta divergente/incompleta aprovados.
- Testes comparação: 0–3 veículos, troca, remoção, atributos, unidades, dados ausentes e compartilhamento aprovados.
- Testes consultas salvas: reinício, gravação concorrente, falha preservando resultado, remoção, identidade/ano/versão, formatação de nome e rejeição de família errada aprovados.
- Bundle Android/Hermes exportado com 3.209 módulos. Saída temporária: `C:\Users\caiof\AppData\Local\Temp\blindspot-review-android-20260927-032655`. Isto não é APK instalado nem certificação visual. Após a exportação, houve um ajuste adicional pequeno na rejeição de associações FIPE antigas; TypeScript, lint e teste de persistência foram repetidos.
- API real nesta revisão: Polo GTS 2024 Flex (005521-2), Corolla XEi 2024 Flex (002111-3) e S10 H.Country 2024 Diesel (004464-4), todos referência setembro/2026. HR-V, Dolphin e Ranger foram validados nas etapas anteriores. O primeiro teste S10 não encontrou o texto “High Country”; a API usa “H.Country”, e a consulta subsequente passou.

## Pendências que não devem ser confundidas com bugs resolvidos

- Dados técnicos: seis fichas parcialmente revisadas, onze não verificadas. Ver revisao-dados-catalogo.md. Compilar e consultar FIPE não valida dimensões, equipamentos ou desempenho.
- Conta permanece local; autenticação remota/recuperação não implementadas. Favoritos, histórico e consultas são por aparelho. Não apresentar como autenticação de produção.
- Seleção de atributos usa campos disponíveis no catálogo; pesquisa externa de especificações arbitrárias não implementada.
- Validação Android: teclado, fonte ampliada, safe areas, estado sem rede, troca de telas durante requisição, reinício e compartilhamento precisam de teste interativo. APK final, instalação e evidência de todas as telas permanecem pendentes.

Não foi encontrado erro de compilação ou falha nas verificações executadas após as correções. Isso não permite afirmar ausência de qualquer erro em dispositivo.
