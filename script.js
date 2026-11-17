function calcularTudo() {
    // Pegando os valores digitados
    let nome = document.getElementById('nome').value || "Morador(a)";
    let moradores = parseInt(document.getElementById('moradores').value) || 1;
    
    let gotas = parseFloat(document.getElementById('gotas').value) || 0;
    let contaAgua = parseFloat(document.getElementById('contaAgua').value) || 0;
    
    let aparelhos = parseInt(document.getElementById('aparelhos').value) || 0;
    let horas = parseFloat(document.getElementById('horas').value) || 0;
    let contaLuz = parseFloat(document.getElementById('contaLuz').value) || 0;

    // --- CÁLCULO DA ÁGUA ---
    // 1 gota = 0.00005 litros. 43200 minutos em um mês.
    let litrosDesperdicio = (gotas * 0.00005) * 43200;
    // Estimativa de custo da água: R$ 5,00 por 1000 litros (m³)
    let custoAguaDesperdicio = (litrosDesperdicio / 1000) * 5.00;

    // --- CÁLCULO DA ENERGIA ---
    // Consumo stand-by: 0.5W por aparelho/hora. 30 dias.
    let kwhDesperdicio = (aparelhos * 0.5 * horas * 30) / 1000;
    // Estimativa de custo da energia: R$ 0,80 por kWh
    let custoLuzDesperdicio = kwhDesperdicio * 0.80;

    // --- RESULTADO FINAL ---
    let divResultado = document.getElementById('resultado-final');
    divResultado.style.display = "block";

    let mensagem = `<h3> Resultado para ${nome}</h3>`;
    
    // Parte da Água
    if (gotas > 0) {
        mensagem += `<p> <strong>Água:</strong> Você está desperdiçando cerca de <span class="destaque">${litrosDesperdicio.toFixed(1)} litros</span> por mês. Isso representa um prejuízo de <span class="destaque">R$ ${custoAguaDesperdicio.toFixed(2)}</span>.</p>`;
    } else {
        mensagem += `<p> <strong>Água:</strong> Parabéns! Sem desperdício por vazamento.</p>`;
    }

    // Parte da Energia
    if (aparelhos > 0 && horas > 0) {
        mensagem += `<p> <strong>Energia:</strong> Seus aparelhos em stand-by consomem <span class="destaque">${kwhDesperdicio.toFixed(2)} kWh</span> por mês. Prejuízo invisível de <span class="destaque">R$ ${custoLuzDesperdicio.toFixed(2)}</span>.</p>`;
    } else {
        mensagem += `<p> <strong>Energia:</strong> Parabéns! Sem gastos com stand-by.</p>`;
    }

    // Total (Impacto na Família)
    let prejuizoTotal = custoAguaDesperdicio + custoLuzDesperdicio;
    
    if (prejuizoTotal > 0) {
        mensagem += `<hr style="margin: 10px 0; border: 0; border-top: 1px solid #ccc;">`;
        mensagem += `<p> <strong>Prejuízo total da casa:</strong> <span class="destaque-verde">R$ ${prejuizoTotal.toFixed(2)} por mês</span>.</p>`;
        mensagem += `<p> Isso equivale a <span class="destaque">R$ ${(prejuizoTotal * 12).toFixed(2)} por ano</span> jogados fora!</p>`;
        
        if (moradores > 1) {
            mensagem += `<p><small>Impacto por pessoa na casa: R$ ${(prejuizoTotal / moradores).toFixed(2)}/mês.</small></p>`;
        }
        
        mensagem += `<p style="margin-top: 15px; font-size: 0.9rem; color: #555;"><em>*Dica: Consertar vazamentos e tirar aparelhos da tomada ajuda a Economia Sustentável (ODS 12 e 13).</em></p>`;
    } else {
        mensagem += `<p style="margin-top: 15px; color: #2e7d32; font-weight: bold;">🌍 Excelente! Você já pratica hábitos sustentáveis e economiza dinheiro.</p>`;
    }

    divResultado.innerHTML = mensagem;
}

function limparTudo() {
    document.getElementById('formulario').reset();
    document.getElementById('resultado-final').style.display = "none";
}