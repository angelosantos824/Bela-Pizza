/**
 * BELLA PIZZA - SISTEMA DE GESTÃO DE PEDIDOS
 * Projeto Final UC00604 - Frontend
 */

// Variável Global: Armazena a lista de itens que o cliente vai adicionando
let pedidosRealizados = [];

// ==========================================
// 1. FUNÇÕES DO GARÇOM (CORRIGIDO)
// ==========================================

function abrirMensagem() {
    // 1. Verificar se o elemento existe na página antes de tentar usar
    const modal = document.getElementById('caixa-aviso');
    const texto = document.getElementById('texto-engracado');

    if (modal && texto) {
        const piadas = [
            "O Luigi está a caminho! 🏃‍♂️", 
            "Garçom a postos! 🚨", 
            "O queijo está a derreter, ele corre já para aí! 🧀"
        ];
        
        // Sorteia a frase
        texto.innerText = piadas[Math.floor(Math.random() * piadas.length)];
        
        // Mostra o modal (IMPORTANTE: usamos 'flex' para centralizar)
        modal.style.display = 'flex';
    } else {
        console.error("Erro: O HTML do modal não foi encontrado na página!");
        alert("O Luigi está a vir! (Mas o modal de aviso não foi encontrado no código HTML)");
    }
}

function fecharMensagem() {
    const modal = document.getElementById('caixa-aviso');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ... restante do código de adicionar ao carrinho e enviar WhatsApp ...
// ==========================================
// 2. LÓGICA DO CARRINHO DE COMPRAS
// ==========================================

function adicionarAoCarrinho() {
    const item = document.getElementById('item-selecionado').value;
    const qtd = document.getElementById('qtd-item').value;
    const listaUI = document.getElementById('lista-carrinho');
    const areaCarrinho = document.getElementById('area-carrinho');

    if (item === "Nenhum" || item === "") {
        alert("Por favor, selecione um produto primeiro!");
        return;
    }

    // Adiciona o item formatado ao Array
    pedidosRealizados.push(`${qtd}x ${item}`);

    // Atualiza a lista visual no HTML
    listaUI.innerHTML = "";
    pedidosRealizados.forEach(p => {
        let li = document.createElement('li');
        li.innerText = "• " + p;
        li.style.padding = "5px 0";
        listaUI.appendChild(li);
    });

    areaCarrinho.style.display = 'block';
    
    // Reset dos campos
    document.getElementById('item-selecionado').value = "Nenhum";
    document.getElementById('qtd-item').value = 1;
}
// ==========================================
// 4. LÓGICA DE ENCOMENDA AO DOMICÍLIO
// ==========================================

function enviarEncomendaWhatsApp() {
    // Captura dos campos
    const nome = document.getElementById('enc-nome').value;
    const tel = document.getElementById('enc-telefone').value;
    const endereco = document.getElementById('enc-endereco').value;
    const pizza = document.getElementById('enc-pizza').value;
    const qtd = document.getElementById('enc-qtd').value;
    const obs = document.getElementById('enc-obs').value;

    // Captura os extras marcados
    let extras = [];
    if (document.getElementById('ex-queijo').checked) extras.push("Extra Queijo");
    if (document.getElementById('ex-bacon').checked) extras.push("Extra Bacon");
    let textoExtras = extras.length > 0 ? extras.join(", ") : "Nenhum";

    // Validação básica
    if (!nome || !endereco || !pizza) {
        alert("Por favor, preencha o nome, endereço e escolha a sua pizza!");
        return;
    }

    // Montagem da mensagem
    let mensagemRaw = `*NOVA ENCOMENDA - DELIVERY* 🚚\n\n` +
                      `👤 *Cliente:* ${nome}\n` +
                      `📞 *Telefone:* ${tel}\n` +
                      `🏠 *Endereço:* ${endereco}\n\n` +
                      `🍕 *Pedido:* ${qtd}x ${pizza}\n` +
                      `➕ *Extras:* ${textoExtras}\n` +
                      `💬 *Obs:* ${obs || "Nenhuma"}\n\n` +
                      `_Enviado via Bella Pizza Web_`;

    const numeroPizzaria = "351924116588";
    const mensagemCodificada = encodeURIComponent(mensagemRaw).replace(/%20/g, '%20');
    
    window.open(`https://wa.me/${numeroPizzaria}?text=${mensagemCodificada}`, '_blank');
}
// ==========================================
// 3. FINALIZAÇÃO E ENVIO (WHATSAPP +351924116588)
// ==========================================

function mostrarPagamento() {
    const mesa = document.getElementById('mesa').value;
    if (!mesa) {
        alert("Indique o número da sua mesa (1 a 12) antes de fechar a conta!");
        return;
    }
    document.getElementById('secao-pagamento').style.display = 'block';
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function enviarWhatsAppFinal() {
    const mesa = document.getElementById('mesa').value;
    const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
    
    // 1. Criamos a mensagem estruturada
    let mensagemRaw = `*NOVO PEDIDO - BELLA PIZZA* 🍕\n\n` +
                      `📍 *Mesa:* ${mesa}\n` +
                      `📝 *Itens:* \n - ${pedidosRealizados.join('\n - ')}\n\n` +
                      `💳 *Pagamento:* ${pagamento}\n\n` +
                      `_Pedido enviado pelo Menu Digital_`;

    // 2. Definimos o número destino (conforme solicitado)
    const numeroPizzaria = "351924116588"; 

    // 3. Convertemos a mensagem para o formato URL usando %20 para espaços
    // Usamos replace(/\s/g, '%20') para garantir que todo espaço em branco vire %20
    const mensagemCodificada = encodeURIComponent(mensagemRaw).replace(/%20/g, '%20');

    // 4. Construímos o link final da API do WhatsApp
    const linkFinal = `https://wa.me/${numeroPizzaria}?text=${mensagemCodificada}`;

    // 5. Abrir em nova aba
    window.open(linkFinal, '_blank');
}