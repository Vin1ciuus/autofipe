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

      veiculo.innerText = textoVeiculo;
      valor.innerText = textoValor;
      marca.innerText = textoMarca;
      ano.innerText = textoAno;
      combustivel.innerText = textoCombustivel;
    });
}

buscarValor();
