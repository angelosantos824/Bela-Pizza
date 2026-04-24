let pedidosRealizados = [];

function abrirMensagem() {
    const piadas = ["O Luigi está a caminho! 🏃‍♂️", "Garçom a postos! 🚨", "O queijo está a derreter de pressa! 🧀"];
    document.getElementById('texto-engracado').innerText = piadas[Math.floor(Math.random() * piadas.length)];
    document.getElementById('caixa-aviso').style.display = 'flex';
}

function fecharMensagem() {
    document.getElementById('caixa-aviso').style.display = 'none';
}

function adicionarAoCarrinho() {
    const comida = document.getElementById('item-comida').value;
    const bebida = document.getElementById('item-bebida').value;
    const listaUI = document.getElementById('lista-carrinho');
    const areaCarrinho = document.getElementById('area-carrinho');

    if (comida === "Nenhum" && bebida === "Nenhum") {
        alert("Escolha pelo menos um item!");
        return;
    }

    if (comida !== "Nenhum") pedidosRealizados.push(comida);
    if (bebida !== "Nenhum") pedidosRealizados.push(bebida);

    // Atualiza a lista na tela
    listaUI.innerHTML = "";
    pedidosRealizados.forEach(item => {
        let li = document.createElement('li');
        li.innerText = "• " + item;
        listaUI.appendChild(li);
    });

    areaCarrinho.style.display = 'block';
    
    // Limpa os selects para nova escolha
    document.getElementById('item-comida').value = "Nenhum";
    document.getElementById('item-bebida').value = "Nenhum";
}

function mostrarPagamento() {
    const mesa = document.getElementById('mesa').value;
    if (!mesa) {
        alert("Indique a sua mesa primeiro!");
        return;
    }
    document.getElementById('secao-pagamento').style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
}

function enviarWhatsAppFinal() {
    const mesa = document.getElementById('mesa').value;
    const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
    
    let texto = `*PEDIDO FINAL - BELLA PIZZA* 🍕\n\n`;
    texto += `📍 Mesa: ${mesa}\n`;
    texto += `📝 Itens:\n - ${pedidosRealizados.join('\n - ')}\n\n`;
    texto += `💳 Pagamento: ${pagamento}\n`;

    const link = `https://wa.me/351912345678?text=${encodeURIComponent(texto)}`;
    window.open(link, '_blank');
}