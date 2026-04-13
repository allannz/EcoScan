function pegarValor(nome) {
  let opcoes = document.getElementsByName(nome);
  for (let opcao of opcoes) {
    if (opcao.checked) {
      return Number(opcao.value);
    }
  }
  return 0;
}

/* ================== ANIMAÇÃO SCROLL ================== */
const elementos = document.querySelectorAll(".secao");

const observer = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("aparecer");
      } else {
        entrada.target.classList.remove("aparecer");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

elementos.forEach((el) => observer.observe(el));

/* ================== FUNÇÕES GLOBAIS ================== */

function calcularPercentual(valor, max) {
  return (valor / max) * 100;
}

function nivel(p) {
  if (p >= 70) return "Excelente";
  if (p >= 40) return "Bom";
  return "Precisa melhorar";
}

function gerarDicas(percentual, boas, melhorias) {
  return percentual < 70 ? melhorias : boas;
}

/* ================== FUNÇÃO PRINCIPAL ================== */

function calcular() {
  let perguntas = [
    "agua1","agua2","agua3",
    "energia1","energia2","energia3",
    "res1","res2","res3",
    "cons1","cons2","cons3"
  ];

  // ✅ Validação
  for (let p of perguntas) {
    let opcoes = document.getElementsByName(p);

    if (![...opcoes].some(o => o.checked)) {
      alert("Responda todas as perguntas antes de continuar!");
      return;
    }
  }

  let max = 6;

  // 📊 Coleta de dados
  let agua = pegarValor("agua1") + pegarValor("agua2") + pegarValor("agua3");

  let energia =
    pegarValor("energia1") + pegarValor("energia2") + pegarValor("energia3");

  let residuos =
    pegarValor("res1") + pegarValor("res2") + pegarValor("res3");

  let consumo =
    pegarValor("cons1") + pegarValor("cons2") + pegarValor("cons3");

  // 📈 Percentuais
  let pAgua = calcularPercentual(agua, max);
  let pEnergia = calcularPercentual(energia, max);
  let pResiduos = calcularPercentual(residuos, max);
  let pConsumo = calcularPercentual(consumo, max);

  // 📊 Média geral
  let geral = (pAgua + pEnergia + pResiduos + pConsumo) / 4;

  // 🧠 Classificação geral
  let classificacao =
    geral >= 70 ? "Alto nível sustentável" :
    geral >= 40 ? "Nível médio" :
    "Baixo nível sustentável";

  // 💡 Dicas
  let dicaAgua = gerarDicas(
    pAgua,
    "Uso eficiente da água.",
    "Reduza o tempo de banho, evite deixar torneiras abertas e verifique vazamentos."
  );

  let dicaEnergia = gerarDicas(
    pEnergia,
    "Consumo energético adequado.",
    "Desligue equipamentos, evite standby e aproveite melhor a luz natural."
  );

  let dicaResiduos = gerarDicas(
    pResiduos,
    "Boa gestão de resíduos.",
    "Separe corretamente, reduza descartáveis e priorize reciclagem."
  );

  let dicaConsumo = gerarDicas(
    pConsumo,
    "Consumo consciente.",
    "Planeje compras, evite desperdícios e prefira produtos duráveis."
  );

  let dicaGeral =
    geral < 70
      ? "Há oportunidades de melhoria nos seus hábitos. Pequenas mudanças geram grande impacto."
      : "Excelente! Seus hábitos contribuem positivamente para o meio ambiente.";

  // 👤 Nome (opcional)
  let nome = document.getElementById("nome")?.value || "Participante";

  // 🧾 Resultado
  document.getElementById("resultado").innerHTML = `
    <h2>Resultados</h2>

    Água: ${pAgua.toFixed(0)}% (${nivel(pAgua)})<br>
    Energia: ${pEnergia.toFixed(0)}% (${nivel(pEnergia)})<br>
    Resíduos: ${pResiduos.toFixed(0)}% (${nivel(pResiduos)})<br>
    Consumo: ${pConsumo.toFixed(0)}% (${nivel(pConsumo)})<br><br>

    <strong>Impacto geral:</strong> ${geral.toFixed(0)}% (${nivel(geral)})<br>
    <strong>Classificação:</strong> ${classificacao}<br><br>

    <strong>💧 Água:</strong><br>${dicaAgua}<br><br>
    <strong>⚡ Energia:</strong><br>${dicaEnergia}<br><br>
    <strong>♻️ Resíduos:</strong><br>${dicaResiduos}<br><br>
    <strong>🛒 Consumo:</strong><br>${dicaConsumo}<br><br>

    <strong>🌱 Geral:</strong><br>${dicaGeral}
  `;

  // 🔽 Scroll automático pro resultado
  document.getElementById("resultado").scrollIntoView({ behavior: "smooth" });
}