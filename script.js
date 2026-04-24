/**
 * BELLA PIZZA - SISTEMA DE GESTÃO DE PEDIDOS
 * Projeto Final UC00604 - Frontend
 */

// Variável Global: Armazena a lista de itens que o cliente vai adicionando
let pedidosRealizados = [];

// ==========================================
// 1. FUNÇÕES DO GARÇOM (INTERAÇÃO)
// ==========================================

// Função para abrir o modal de "Chamar Garçom" com frases aleatórias
function abrirMensagem() {
    const piadas = [
        "O Luigi está a caminho! 🏃‍♂️", 
        "Garçom a postos! 🚨", 
        "O queijo está a derreter, ele corre já para aí! 🧀"
    ];
    
    // Sorteia uma frase e injeta no HTML
    document.getElementById('texto-engracado').innerText = piadas[Math.floor(Math.random() * piadas.length)];
    
    // Mostra a caixa de aviso (modal) mudando o display para flex
    document.getElementById('caixa-aviso').style.display = 'flex';
}

// Função para fechar o modal do Garçom
function fecharMensagem() {
    document.getElementById('caixa-aviso').style.display = 'none';
}

// ==========================================
// 2. LÓGICA DO CARRINHO DE COMPRAS
// ==========================================

// Função que guarda os itens escolhidos numa lista temporária
function adicionarAoCarrinho() {
    const item = document.getElementById('item-selecionado').value;
    const qtd = document.getElementById('qtd-item').value;
    const listaUI = document.getElementById('lista-carrinho');
    const areaCarrinho = document.getElementById('area-carrinho');

    // Validação: Impede adicionar se nada estiver selecionado
    if (item === "Nenhum" || item === "") {
        alert("Por favor, selecione um produto primeiro!");
        return;
    }

    // Adiciona a string formatada (ex: "2x Pizza Margherita") ao Array Global
    pedidosRealizados.push(`${qtd}x ${item}`);

    // Limpa a lista visual atual para não duplicar na renderização
    listaUI.innerHTML = "";

    // Percorre o Array e cria um elemento <li> para cada item na tela
    pedidosRealizados.forEach(p => {
        let li = document.createElement('li');
        li.innerText = "• " + p;
        li.style.padding = "5px 0";
        listaUI.appendChild(li);
    });

    // Torna a secção do carrinho visível assim que o primeiro item é adicionado
    areaCarrinho.style.display = 'block';
    
    // Reset dos campos para facilitar a próxima escolha
    document.getElementById('item-selecionado').value = "Nenhum";
    document.getElementById('qtd-item').value = 1;
}

// ==========================================
// 3. FINALIZAÇÃO E PAGAMENTO
// ==========================================

// Função que valida a mesa e mostra as opções de pagamento
function mostrarPagamento() {
    const mesa = document.getElementById('mesa').value;
    
    if (!mesa) {
        alert("Indique o número da sua mesa (1 a 12) antes de fechar a conta!");
        return;
    }
    
    // Mostra a secção de pagamento
    document.getElementById('secao-pagamento').style.display = 'block';
    
    // Faz um scroll suave até o final da página para o cliente ver o pagamento
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// Função que gera o link final e envia para o WhatsApp da Pizzaria
function enviarWhatsAppFinal() {
    const mesa = document.getElementById('mesa').value;
    const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
    
    // Montagem da String da mensagem (Uso de Template Strings com crases ` `)
    let texto = `*NOVO PEDIDO - BELLA PIZZA* 🍕\n\n`;
    texto += `📍 *Mesa:* ${mesa}\n`;
    texto += `📝 *Itens do Pedido:* \n - ${pedidosRealizados.join('\n - ')}\n\n`;
    texto += `💳 *Pagamento:* ${pagamento}\n\n`;
    texto += `_Pedido enviado automaticamente via Menu Digital_`;

    // Configuração do link API do WhatsApp (substituir o número se necessário)
    const numeroPizzaria = "351912345678"; 
    const linkFinal = `https://wa.me/${numeroPizzaria}?text=${encodeURIComponent(texto)}`;

    // Abre o WhatsApp numa nova aba
    window.open(linkFinal, '_blank');
}