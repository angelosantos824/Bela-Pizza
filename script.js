/**
 * BELLA PIZZA - SISTEMA UNIFICADO
 */

// 1. VARIÁVEIS GLOBAIS (Devem ser declaradas apenas uma vez no topo)
let pedidosMesa = []; // Para a página pedidomesa.html
let itensBag = [];    // Para a página encomenda.html
let totalValor = 0;   // Para o cálculo da Bag

const precos = {
    "Margherita": 12.50, "Pepperoni Premium": 14.90, "Pepperoni Lovers": 16.90,
    "Hawaiian Premium": 15.90, "BBQ Chicken": 14.90, "Chicken Premium": 16.90,
    "Supreme": 17.90, "Supreme Premium": 18.90, "P-Zone Premium": 14.90,
    "Vegetariana Deluxe": 15.50, "Vinho da Casa (Tinto)": 18.00,
    "Água Luso (500ml)": 1.50, "Coca-Cola": 1.80, "Fanta Laranja": 1.80,
    "Guaraná Antárctica": 1.80, "Sprite": 1.80, "Fanta Uva": 1.80,
    "Pepsi": 1.80, "Tiramisù Clássico": 6.50
};

// ==========================================
// 2. FUNÇÕES DO GARÇOM (pedidomesa.html)
// ==========================================
function abrirMensagem() {
    const modal = document.getElementById('caixa-aviso');
    const texto = document.getElementById('texto-engracado');
    if (modal && texto) {
        const piadas = ["O Luigi está a caminho! 🏃‍♂️", "Garçom a postos! 🚨", "O queijo está a derreter! 🧀"];
        texto.innerText = piadas[Math.floor(Math.random() * piadas.length)];
        modal.style.display = 'flex';
    }
}

function fecharMensagem() {
    const modal = document.getElementById('caixa-aviso');
    if (modal) modal.style.display = 'none';
}

// ==========================================
// 3. LÓGICA DE PEDIDO NA MESA (pedidomesa.html)
// ==========================================
function adicionarAoCarrinho() {
    const item = document.getElementById('item-selecionado').value;
    const qtd = document.getElementById('qtd-item').value;
    const listaUI = document.getElementById('lista-carrinho');
    const areaCarrinho = document.getElementById('area-carrinho');

    if (item === "Nenhum" || !item) {
        alert("Selecione um produto primeiro!");
        return;
    }

    pedidosMesa.push(`${qtd}x ${item}`);
    listaUI.innerHTML = "";
    pedidosMesa.forEach(p => {
        let li = document.createElement('li');
        li.innerText = "• " + p;
        listaUI.appendChild(li);
    });
    areaCarrinho.style.display = 'block';
}

function enviarWhatsAppFinal() {
    const mesa = document.getElementById('mesa').value;
    const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
    
    if(!mesa) { alert("Indique a mesa!"); return; }

    let msg = `*NOVO PEDIDO - MESA ${mesa}* 🍕\n\n` +
              `📝 *Itens:* \n- ${pedidosMesa.join('\n- ')}\n\n` +
              `💳 *Pagamento:* ${pagamento}`;

    window.open(`https://wa.me/351924116588?text=${encodeURIComponent(msg)}`, '_blank');
}

// ==========================================
// 4. LÓGICA DE ENCOMENDA/DELIVERY (encomenda.html)
// ==========================================
function adicionarABag() {
    const itemSelect = document.getElementById('enc-item');
    const itemNome = itemSelect.value;
    const qtdInput = document.getElementById('enc-qtd');
    const qtd = parseInt(qtdInput.value);

    if (!itemNome) {
        alert("Selecione um produto para a Bag!");
        return;
    }

    // Lógica Matemática
    itensBag.push(`${qtd}x ${itemNome}`);
    if (precos[itemNome]) {
        totalValor += (precos[itemNome] * qtd);
    }

    // Atualizar UI
    const listaUI = document.getElementById('lista-bag');
    const totalUI = document.getElementById('total-bag');
    const areaBag = document.getElementById('area-bag');

    listaUI.innerHTML = "";
    itensBag.forEach(i => {
        let li = document.createElement('li');
        li.innerHTML = `<span style="color: #e67e22;">💼</span> ${i}`;
        listaUI.appendChild(li);
    });

    totalUI.innerText = totalValor.toFixed(2).replace('.', ',');
    areaBag.style.display = 'block';

    // Reset campos
    itemSelect.value = "";
    qtdInput.value = 1;
}

function enviarBagWhatsApp() {
    const nome = document.getElementById('enc-nome').value;
    const endereco = document.getElementById('enc-endereco').value;
    const pag = document.getElementById('enc-pagamento').value;
    const obs = document.getElementById('enc-obs').value;

    if (!nome || !endereco || itensBag.length === 0) {
        alert("Preencha os dados de entrega e adicione itens!");
        return;
    }

    let msg = `*📦 ENCOMENDA DELIVERY - BELLA PIZZA*\n\n` +
              `👤 *Cliente:* ${nome}\n` +
              `🏠 *Morada:* ${endereco}\n` +
              `💳 *Pagamento:* ${pag}\n` +
              `💰 *Total:* ${totalValor.toFixed(2)}€\n\n` +
              `📋 *ITENS:*\n- ${itensBag.join('\n- ')}\n\n` +
              `💬 *Obs:* ${obs || "Sem notas"}`;

    window.open(`https://wa.me/351924116588?text=${encodeURIComponent(msg)}`, '_blank');

    setTimeout(() => {
        document.getElementById('modal-confirmacao').style.display = 'flex';
    }, 1000);
}