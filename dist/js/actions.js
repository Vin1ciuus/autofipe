var fipeFormulario = document.querySelector("#fipe");

fipeFormulario.reset();

var selectCategoria = document.querySelector("#categoria");
var selectMarca = document.querySelector("#marca");
var selectModelo = document.querySelector("#modelo");
var selectAno = document.querySelector("#ano");

selectCategoria.addEventListener("change", buscarMarcas);
selectMarca.addEventListener("change", buscarModelos);
selectModelo.addEventListener("change", buscarAnos);

var categoria = "";
var marca = "";
var modelo = "";

function criarOpcaoPadrao(texto) {
  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.hidden = true;
  defaultOption.selected = "selected";
  defaultOption.innerHTML = texto;

  return defaultOption;
}

function buscarMarcas(evento) {
  categoria = evento.target.value;
  selectMarca.disabled = true;
  selectModelo.disabled = true;
  selectAno.disabled = true;
  selectMarca.innerHTML = "";

  defaultOption = criarOpcaoPadrao("Selecione a Marca");

  selectMarca.appendChild(defaultOption);

  axios
    .get("https://parallelum.com.br/fipe/api/v1/" + categoria + "/marcas")
    .then(function(resposta) {
      resposta.data.map(function(marca) {
        var option = document.createElement("option");
        option.innerHTML = marca.nome;
        option.value = marca.codigo;

        selectMarca.appendChild(option);
      });
      selectMarca.disabled = false;
    });
}

function buscarModelos(evento) {
  marca = evento.target.value;
  selectModelo.disabled = true;
  selectAno.disabled = true;
  selectModelo.innerHTML = "";

  defaultOption = criarOpcaoPadrao("Selecione o modelo");

  selectModelo.appendChild(defaultOption);

  axios
    .get(
      "https://parallelum.com.br/fipe/api/v1/" +
        categoria +
        "/marcas/" +
        marca +
        "/modelos"
    )
    .then(function(resposta) {
      resposta.data.modelos.map(function(modelo) {
        var option = document.createElement("option");
        option.innerHTML = modelo.nome;
        option.value = modelo.codigo;

        selectModelo.appendChild(option);
      });
      selectModelo.disabled = false;
    });
}

function buscarAnos(evento) {
  modelo = evento.target.value;
  selectAno.disabled = true;
  selectAno.innerHTML = "";

  defaultOption = criarOpcaoPadrao("Selecione o ano");

  selectAno.appendChild(defaultOption);

  axios
    .get(
      "https://parallelum.com.br/fipe/api/v1/" +
        categoria +
        "/marcas/" +
        marca +
        "/modelos/" +
        modelo +
        "/anos"
    )
    .then(function(resposta) {
      resposta.data.map(function(ano) {
        var option = document.createElement("option");
        option.innerHTML = ano.nome;
        option.value = ano.codigo;

        selectAno.appendChild(option);
      });
      selectAno.disabled = false;
    });
}
