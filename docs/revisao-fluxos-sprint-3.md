# Revisão dos fluxos - Sprint 3 Mobile

Revisão inicial: 24/09/2026. Atualização: 26/09/2026. Entrega: 27/09.

Escopo: leitura do código e verificações estáticas. Os cenários abaixo ainda precisam ser executados no Android; esta revisão não certifica o APK.

## Correções implementadas

- Explorar: “Ver todos” e seta abrem o catálogo, com contagem real (ajuste anterior).
- Marcas: somente marcas com ficha no catálogo são exibidas; o toque encaminha a marca escolhida à busca imediatamente.
- Busca: filtros locais de marca/modelo/ano/versão, com opções dependentes e correspondência exata. Funciona sem rede, mostra contagem e limpa seleções dependentes ao mudar um filtro.
- FIPE: consulta separada na ficha, seleção explícita de modelo/versão e ano/combustível, limitada ao ano da ficha. Não usa anos próximos nem zero km como substituto. Resultado identifica seleção, código e referência. Há nova tentativa em caso de erro e descarte de respostas antigas ao trocar seleção/ficha. Testes automatizados cobrem combinações dos 17 veículos e rejeição de ano/versão divergentes; consulta real no Android ainda pendente.
- Favoritos: o histórico continua acessível com zero favoritos; remover o último favorito encerra o modo de edição.
- Cards: o toque no coração não deve propagar para a abertura da ficha.
- Histórico: identificadores inexistentes não são adicionados pela ficha.
- Cadastro: indicador corrigido para duas etapas.
- Perfil: redirecionamento declarativo para login quando não existe usuário, sem chamar navegação durante a renderização.
- Comparação: tabela de 2 ou 3 veículos com rolagem lateral conjunta, seleção pesquisável, troca na mesma coluna, remoção e limpeza. Estados de 0 e 1 veículo permitem completar a seleção. Compartilhamento inclui todas as colunas. Destaques omitem empates totais, dados incompletos e unidades incompatíveis; consumo só é destacado em km/l com o mesmo combustível. Removidos o vencedor geral e a quantidade fictícia de avaliações da comparação. Ficha orienta como trocar carros quando a seleção está cheia.

## Pendências prioritárias

| Prioridade | Fluxo | Evidência no código | Critério para concluir |
| --- | --- | --- | --- |
| Alta | Autenticação de produção | Conta permanece local, com credenciais/senhas em AsyncStorage. Recuperação por e-mail não implementada; envio fictício removido e limitação explícita no app. | Backend/autenticação segura e recuperação real continuam pendentes; não apresentar conta local como pronta para produção. |
| Média | Validação de conta local | “Lembrar de mim” controla a persistência da sessão. Cadastro termina em confirmação de nome/e-mail, sem coleta de endereço descartado nem aceite de documentos inexistentes. Testes de reinício, logout, duplicidade e migração passaram. | Conferir no Android os fluxos e a migração, que preserva contas antigas e encerra a sessão anterior. |
| Alta | Validação visual da Ranger Raptor | Dados revisados em 27/09; campos do slide incluídos, lacunas removidas e divergências documentadas em `validacao-ranger-raptor.md`. | Conferir a ficha revisada no Android, incluindo observações, selo parcial e atributos na comparação. |
| Média | Avaliações e destaques | Notas nos cards são estáticas. Títulos de popularidade não vêm de métricas. Avaliações fictícias já foram removidas da comparação. | Remover alegações sem fonte ou identificá-las claramente como dados demonstrativos. |
| Média | Favoritos e conta | Favoritos/histórico são globais por instalação; lista começa com favoritos do mock. | Definir se dados são do dispositivo ou de cada conta e manter a experiência coerente. |
| Média | Layout | Cards fixos de 170 px em grids de duas colunas podem exceder telas estreitas. | Conferir catálogo/histórico em Android estreito e com fonte ampliada. |
| Alta | Entrega | Perfil EAS `preview` prevê APK; `production` prevê AAB. Build e instalação não foram validados nesta revisão. | Gerar APK, instalar, executar o roteiro e preparar README/demonstração de todas as telas. |

## Roteiro manual no Android

Atualização: a comparação permite selecionar atributos existentes nas fichas por seção, cancelar alterações e restaurar a tabela completa. O campo de texto personalizado foi removido por decisão do usuário: não havia pesquisa externa para preenchê-lo. Dados ausentes em um veículo permanecem indisponíveis. A seleção é mantida durante a sessão e aplicada ao compartilhamento. A seleção de campos cobre parte da intenção do enunciado; pesquisa livre de atributos arbitrários não está implementada.

Marcar somente depois de executar. Usar contas de teste, sem dados pessoais reais.

- [ ] Abrir sem cadastro, navegar pelas abas e voltar sem tela vazia ou travamento.
- [ ] Tocar em “Ver todos” e nas setas dos três carrosséis; abrir ficha e voltar.
- [ ] Tocar numa marca (ex.: Ford); conferir se a busca abre com essa marca selecionada. Limpar tudo e confirmar que ela não reaparece sozinha.
- [ ] Buscar por marca, modelo, ano e versão. Conferir se o resultado corresponde exatamente à seleção.
- [ ] Trocar marca/modelo/ano e conferir limpeza de filtros dependentes; cancelar um seletor pelo voltar do Android sem mudar a seleção.
- [ ] Sem rede, abrir busca e conferir que opções, contagem e resultados do catálogo continuam funcionando.
- [ ] Favoritar pelo coração sem abrir a ficha; conferir inclusão/remoção na aba Favoritos.
- [ ] Remover todos os favoritos; conferir acesso a “Vistos recentemente”. Adicionar outro favorito e verificar que ele não permanece no modo de edição.
- [ ] Abrir fichas e verificar ordem do histórico e persistência após reiniciar o app.
- [ ] Selecionar 0, 1, 2 e 3 veículos para comparação; conferir adição, busca no seletor, cancelamento pelo voltar do Android, rolagem lateral alinhada, remoção, troca com 3 carros, limpeza e compartilhamento incluindo o terceiro carro. Abrir uma quarta ficha e conferir orientação de limite.
- [ ] Consultar FIPE; escolher versão, depois ano/combustível e confirmar. Conferir seleção, código e referência no resultado. Testar versão sem o ano da ficha, falha de rede e nova tentativa; trocar versão e verificar que o preço antigo desaparece. Sair durante carregamento e abrir outra ficha.
- [ ] Em Comparar, escolher somente Potência e Torque; aplicar e compartilhar. Selecionar Suspensão; conferir valores/ausências nos três carros. Trocar um carro, cancelar alterações no seletor e restaurar a tabela completa. Desmarcar tudo deve impedir aplicar. O campo de texto personalizado não deve aparecer.
- [ ] Testar login inválido, cadastro com e-mail repetido, confirmação de senha, logout e reabertura com/sem “Lembrar de mim”. Encerrar o processo e reabrir para testar a sessão, não apenas colocar em segundo plano.
- [ ] Conferir confirmação do cadastro e texto de conta local. “Esqueceu sua senha?” deve informar indisponibilidade e permitir voltar ao login ou explorar, sem prometer envio de e-mail.
- [ ] Conferir teclado, áreas seguras, texto ampliado e grids em tela estreita.
- [ ] Repetir os fluxos críticos no APK instalado, sem depender do Expo Go.

## Ordem sugerida após esta revisão

1. Validar busca e FIPE no Android; usuário já confirmou que a comparação dos três veículos funciona, demais cenários do roteiro ainda pendentes.
2. Validar escolha de atributos no Android e conferir os dados da Ranger Raptor.
3. Fechar fluxos de conta conforme a integração disponível.
4. Revisar visual, executar roteiro no APK e documentar a entrega.
