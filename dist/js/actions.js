var fipeFormulario = document.querySelector("#fipe");

fipeFormulario.reset();

var selectCategoria = document.querySelector("#categoria");
var selectMarca = document.querySelector("#marca");
var selectModelo = document.querySelector("#modelo");

selectCategoria.addEventListener("change", buscarMarcas);
selectMarca.addEventListener("change", buscarModelos);

var categoria = "";
var marca = "";
var modelo = "";
var ano = "";

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
  modelo = evento.target.value;
  selectModelo.disabled = true;
  selectModelo.innerHTML = "";

  defaultOption = criarOpcaoPadrao("Selecione o modelo");

  selectModelo.appendChild(defaultOption);

  axios
    .get(
      "https://parallelum.com.br/fipe/api/v1/" +
        categoria +
        "/marcas/" +
        modelo +
        "/modelos"
    )
    .then(function(resposta) {
      console.log(resposta);
      resposta.data.modelos.map(function(modelo) {
        var option = document.createElement("option");
        option.innerHTML = modelo.nome;
        option.value = modelo.codigo;

        selectModelo.appendChild(option);
      });
      selectModelo.disabled = false;
    });
}
