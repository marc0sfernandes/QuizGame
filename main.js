var questoes = document.getElementById('numero_de_questoes');
var categoria = document.getElementById('categoria');
var dificuldade = document.getElementById('dificuldade');
var listaEnviada = false;

function enviar() {
  if (listaEnviada) {
    alert("Você já enviou uma lista de perguntas.");
    return;
  }
  quantidadeQuestoes = questoes.value;
  categoria_selecionada = categoria.value;
  dificuldade_selecionada = dificuldade.value;
  fetch(`https://opentdb.com/api.php?amount=${quantidadeQuestoes}&category=${categoria_selecionada}&difficulty=${dificuldade_selecionada}&type=multiple`)
    .then(response => response.json())
    .then(data => {

      resultadoEnvio = data.results;
      createQuestion();
      listaEnviada= true;
    })
    .catch(error => {
      // Caso ocorra algum erro na requisição
      console.error(error);
    });
}

const caixa = document.createElement("div");
caixa.classList.add("display_box")
const botao_checar = document.createElement("button")
botao_checar.classList.add("alinhar_botao")
botao_checar.textContent = "Verificar Respostas";
botao_checar.addEventListener("click", verificarRespostas);

function createQuestion() {
  for (i = 0; i < resultadoEnvio.length; i++) {
    const div = document.createElement("div");
    caixa.appendChild(div);
    var alternativas = resultadoEnvio[i].incorrect_answers;
    alternativas.push(resultadoEnvio[i].correct_answer);
    const pergunta = document.createElement("p");
    pergunta.innerHTML = i + 1 + "-" + resultadoEnvio[i].question;
    div.appendChild(pergunta);
    const formulario = document.createElement("form");
    document.body.appendChild(caixa);

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Embaralhar as alternativas
    const alternativasEmbaralhadas = shuffleArray(alternativas);
    var acertos = 0
    for (a = 0; a < alternativas.length; a++) {
      const criar_alternativa = document.createElement("input");
      criar_alternativa.type = "radio";
      criar_alternativa.value = alternativasEmbaralhadas[a];
      criar_alternativa.name = "resposta" + i;
      criar_alternativa.id = "resposta" + i;

      const label = document.createElement("label");
      label.classList.add('display');
      label.appendChild(criar_alternativa);
      const alternativa_conteudo = document.createTextNode(decodeHTMLEntities(alternativasEmbaralhadas[a]));
      label.appendChild(alternativa_conteudo);
      formulario.appendChild(label);
      div.appendChild(formulario);
      caixa.appendChild(botao_checar);
    }
  }
}

function decodeHTMLEntities(text) {
  const entities = {
    '&#039;': "'",
    // Adicione aqui outras entidades HTML que você deseja decodificar
  };

  return text.replace(/&#(\d+);|&#[xX]([A-Fa-f0-9]+);/g, (match, dec, hex) => {
    if (dec) {
      return String.fromCharCode(dec);
    } else if (hex) {
      return String.fromCharCode(parseInt(hex, 16));
    } else {
      return match;
    }
  }).replace(/&(amp|lt|gt|quot|#039);/g, (match, entity) => {
    return entities[entity] || match;
  });
}

function verificarRespostas() {
  var respostasMarcadas = document.querySelectorAll("input[type='radio']:checked");
  var quantidadePerguntas = resultadoEnvio.length;
  var quantidadeRespostasMarcadas = respostasMarcadas.length;

  if (quantidadeRespostasMarcadas !== quantidadePerguntas) {
    alert("Por favor, responda todas as perguntas.");
    return;
  }

  var acertos = 0;
  var erros = 0;

  for (var i = 0; i < respostasMarcadas.length; i++) {
    var respostaMarcada = respostasMarcadas[i];
    var perguntaIndex = respostaMarcada.name.slice(8); // Extrai o número da pergunta do nome do campo de resposta
    var respostaCorreta = resultadoEnvio[perguntaIndex].correct_answer;

    if (respostaMarcada.value === respostaCorreta) {
      acertos++;
    } else {
      erros++;
    }
  }

  alert("Acertos: " + acertos +"  Erros: " + erros)
  window.location.reload();
}
