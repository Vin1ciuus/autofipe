var fipeFormulario = document.querySelector("#fipe");

fipeFormulario.reset();

var selectCategoria = document.querySelector("#categoria");
var selectMarca = document.querySelector("#marca");

selectCategoria.addEventListener("change", buscarMarcas);
selectMarca.addEventListener("change", buscarModelos);

function buscarMarcas(evento) {
  var categoria = evento.target.value;
  selectMarca.disabled = true;
  selectMarca.innerHTML = "";

  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.hidden = true;
  defaultOption.selected = "selected";
  defaultOption.innerHTML = "Selecione a marca";
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
    });

  selectMarca.disabled = false;
}

function buscarModelos(evento) {
  var modelo = evento.target.value;

  console.log(modelo);
}
