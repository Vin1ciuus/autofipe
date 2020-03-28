var fipeFormulario = document.querySelector("#fipe");

fipeFormulario.reset();

//Pegando todos os elementos que vão ser usados
var selectCategoria = document.querySelector("#categoria");
var selectMarca = document.querySelector("#marca");
var selectModelo = document.querySelector("#modelo");
var selectAno = document.querySelector("#ano");
var btnEnviar = document.querySelector("#enviar");

//Atribuindo a mudança dos elementos para as respectivas funções
selectCategoria.addEventListener("change", buscarMarcas);
selectMarca.addEventListener("change", buscarModelos);
selectModelo.addEventListener("change", buscarAnos);
selectAno.addEventListener("change", habilitarBotao);
fipeFormulario.addEventListener("submit", redirecionar);

//Declarando variasveis globais
var categoria = "";
var marca = "";
var modelo = "";
var ano = "";

//Funções
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
  btnEnviar.disabled = true;
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
  btnEnviar.disabled = true;
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
  btnEnviar.disabled = true;
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
        if (ano.nome == "32000") return;
        var option = document.createElement("option");
        option.innerHTML = ano.nome;
        option.value = ano.codigo;

        selectAno.appendChild(option);
      });
      selectAno.disabled = false;
    });
}

function habilitarBotao(evento) {
  ano = evento.target.value;
  btnEnviar.disabled = false;
}

function redirecionar(evento) {
  evento.preventDefault();

  window.location.href =
    "/valor.html?categoria=" +
    categoria +
    "&marca=" +
    marca +
    "&modelo=" +
    modelo +
    "&ano=" +
    ano;
}
