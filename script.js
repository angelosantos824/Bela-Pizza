// Variável global para guardar os itens do pedido
let carrinho = [];

// 1. FUNÇÕES DO GARÇOM
function abrirMensagem() {
    const piadas = [
        "O Luigi já calçou as chuteiras! 🏃‍♂️",
        "Garçom detetado a 50 metros! 🚨",
        "O nosso garçom é como o queijo: está em todo o lado! 🧀"
    ];
    const sorteio = piadas[Math.floor(Math.random() * piadas.length)];
    document.getElementById('texto-engracado').innerText = sorteio;
    document.getElementById('caixa-aviso').style.display = 'flex';
}

function fecharMensagem() {
    document.getElementById('caixa-aviso').style.display = 'none';
}

// 2. FUNÇÃO PARA ADICIONAR AO CARRINHO (Sem enviar ainda)
function adicionarAoPedido() {
    const pizza = document.getElementById('pizza').value;
    const qtdPizza = document.getElementById('qtd_pizza').value;
    const bebida = document.getElementById('bebida').value;
    const qtdBebida = document.getElementById('qtd_bebida').value;

    if (pizza !== "Nenhuma" && qtdPizza > 0) {
        carrinho.push(`${qtdPizza}x ${pizza}`);
    }
    if (bebida !== "Nenhuma" && qtdBebida > 0) {
        carrinho.push(`${qtdBebida}x ${bebida}`);
    }

    alert("Item adicionado à lista! Pode escolher mais coisas ou finalizar o pedido.");
    
    // Limpa as seleções para o próximo item
    document.getElementById('pizza').value = "Nenhuma";
    document.getElementById('bebida').value = "Nenhuma";
}

// 3. FUNÇÃO PARA ENVIAR TUDO PARA O WHATSAPP
function enviarParaWhatsApp() {
    const mesa = document.getElementById('mesa').value;
    const pagamento = document.querySelector('input[name="pagamento"]:checked').value;

    if (!mesa) {
        alert("Por favor, selecione a sua mesa!");
        return;
    }

    if (carrinho.length === 0) {
        alert("O seu carrinho está vazio! Adicione itens primeiro.");
        return;
    }

    // Montar a lista de itens
    let listaItens = "";
    carrinho.forEach((item, index) => {
        listaItens += `${index + 1}. ${item}\n`;
    });

    let texto = `*NOVO PEDIDO MULTIPLO - BELLA PIZZA* 🍕\n\n`;
    texto += `📍 *Mesa:* ${mesa}\n\n`;
    texto += `📝 *Itens do Pedido:*\n${listaItens}\n`;
    texto += `💳 *Pagamento:* ${pagamento}\n\n`;
    texto += `_Enviado via Menu Digital_`;

    const numero = "351912345678"; 
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(link, '_blank');
    
    // Opcional: Limpar carrinho após enviar
    carrinho = [];
}