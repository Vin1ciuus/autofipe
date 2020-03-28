function init() {
  var params = window.location.search;
  var query = new URLSearchParams(params);

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
    .then(function(resposta) {
      console.log(resposta);
    });
}

function buscarValor() {}

init();
