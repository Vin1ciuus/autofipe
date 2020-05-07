var form = document.querySelector("form");
form.addEventListener("submit", validar);
var valorFipe = 0;

function replaceString(oldS, newS, fullS) {
  // Replaces oldS with newS in the string fullS
  for (var i = 0; i < fullS.length; i++) {
    if (fullS.substring(i, i + oldS.length) == oldS) {
      fullS =
        fullS.substring(0, i) +
        newS +
        fullS.substring(i + oldS.length, fullS.length);
    }
  }
  return fullS;
}

function buscarValor() {
  var params = window.location.search;
  var query = new URLSearchParams(params);
  var veiculo = document.getElementById("veiculo");
  var valor = document.getElementById("valor");
  var marca = document.getElementById("marca");
  var ano = document.getElementById("ano");
  var combustivel = document.getElementById("combustivel");

  axios
    .get(
      "https://parallelum.com.br/fipe/api/v1/" +
        query.get("categoria") +
        "/marcas/" +
        query.get("marca") +
        "/modelos/" +
        query.get("modelo") +
        "/anos/" +
        query.get("ano")
    )
    .then(function (resposta) {
      console.log(resposta.data);
      textoVeiculo = resposta.data.Modelo;
      textoValor = "Valor: " + resposta.data.Valor;
      textoMarca = "Marca: " + resposta.data.Marca;
      textoAno = "Ano: " + resposta.data.AnoModelo;
      textoCombustivel = "Combustível: " + resposta.data.Combustivel;

      valorFipe = replaceString("R$ ", "", resposta.data.Valor);
      valorFipe = valorFipe.replace(".", "");
      valorFipe = valorFipe.replace(",", ".");
      valorFipe = parseFloat(valorFipe);

      veiculo.innerText = textoVeiculo;
      valor.innerText = textoValor;
      marca.innerText = textoMarca;
      ano.innerText = textoAno;
      combustivel.innerText = textoCombustivel;
    });
}

function validar(evento) {
  evento.preventDefault();

  var parcelas = parseInt(document.getElementById("parcelas").value);
  var entrada = parseFloat(document.getElementById("entrada").value);
  var juros = 3 / 100;

  var razao = Math.pow(1 + juros, parcelas);
  var coeficiente = juros / (1 - 1 / razao);
  var valorFinanciado = valorFipe - entrada;
  var prestacaoFinal = valorFinanciado * coeficiente;
  var jurosTotais = prestacaoFinal * parcelas - valorFinanciado;
  var valorTotal = prestacaoFinal * parcelas;

  console.table(
    "Prestação final: " + prestacaoFinal,
    "Total com juros: " + jurosTotais,
    "Valor total: " + valorTotal
  );
}

buscarValor();
