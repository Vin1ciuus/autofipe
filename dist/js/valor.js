var form = document.querySelector('form');
form.addEventListener('submit', validar);
var valorFipe = 0;

var juros = {
	scania: 1,
	bancoBrasil: 1.22,
	itau: 1.27,
	bradesco: 1.29,
	santander: 1.47,
	caixa: 1.55
};

function replaceString(oldS, newS, fullS) {
	// Replaces oldS with newS in the string fullS
	for (var i = 0; i < fullS.length; i++) {
		if (fullS.substring(i, i + oldS.length) == oldS) {
			fullS = fullS.substring(0, i) + newS + fullS.substring(i + oldS.length, fullS.length);
		}
	}
	return fullS;
}

function buscarValor() {
	var params = window.location.search;
	var query = new URLSearchParams(params);
	var veiculo = document.getElementById('veiculo');
	var valor = document.getElementById('valor');
	var marca = document.getElementById('marca');
	var ano = document.getElementById('ano');
	var combustivel = document.getElementById('combustivel');

	var jurosScania = document.getElementById('scaniaTaxa');
	var jurosBancoBrasil = document.getElementById('bancoBrasilTaxa');
	var jurosItau = document.getElementById('itauTaxa');
	var jurosBradesco = document.getElementById('bradescoTaxa');
	var jurosSantander = document.getElementById('santanderTaxa');
	var jurosCaixa = document.getElementById('caixaTaxa');

	axios
		.get(
			'https://parallelum.com.br/fipe/api/v1/' +
				query.get('categoria') +
				'/marcas/' +
				query.get('marca') +
				'/modelos/' +
				query.get('modelo') +
				'/anos/' +
				query.get('ano')
		)
		.then(function(resposta) {
			jurosScania.innerText = juros.scania + '% a.m.';
			jurosBancoBrasil.innerText = juros.bancoBrasil + '% a.m.';
			jurosItau.innerText = juros.itau + '% a.m.';
			jurosBradesco.innerText = juros.bradesco + '% a.m.';
			jurosSantander.innerText = juros.santander + '% a.m.';
			jurosCaixa.innerText = juros.caixa + '% a.m.';

			textoVeiculo = resposta.data.Modelo;
			textoValor = 'Valor: ' + resposta.data.Valor;
			textoMarca = 'Marca: ' + resposta.data.Marca;
			textoAno = 'Ano: ' + resposta.data.AnoModelo;
			textoCombustivel = 'Combustível: ' + resposta.data.Combustivel;

			valorFipe = replaceString('R$ ', '', resposta.data.Valor);
			valorFipe = valorFipe.replace('.', '');
			valorFipe = valorFipe.replace(',', '.');
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

	var jurosScania = document.getElementById('scania');
	var jurosBancoBrasil = document.getElementById('bancoBrasil');
	var jurosItau = document.getElementById('itau');
	var jurosBradesco = document.getElementById('bradesco');
	var jurosSantander = document.getElementById('santander');
	var jurosCaixa = document.getElementById('caixa');

	var calcular = document.getElementById('valorFinanciado');
	var entrada = parseFloat(document.getElementById('entrada').value);
	var valorFinanciado = valorFipe - entrada;
	calcular.innerText = 'Valor a ser financiado: R$ ' + valorFinanciado;

	var scania = calcularJuros(juros.scania);
	var bancoBrasil = calcularJuros(juros.bancoBrasil);
	var itau = calcularJuros(juros.itau);
	var bradesco = calcularJuros(juros.bradesco);
	var santander = calcularJuros(juros.santander);
	var caixa = calcularJuros(juros.caixa);

	jurosScania.innerHTML = concatenarResultados(scania);
	jurosBancoBrasil.innerHTML = concatenarResultados(bancoBrasil);
	jurosItau.innerHTML = concatenarResultados(itau);
	jurosBradesco.innerHTML = concatenarResultados(bradesco);
	jurosSantander.innerHTML = concatenarResultados(santander);
	jurosCaixa.innerHTML = concatenarResultados(caixa);
}

function concatenarResultados(resultado) {
	var elemento =
		'Valor da prestação: R$ ' +
		resultado.prestacaoFinal.toFixed(2) +
		'<br> Valor total de juros: R$ ' +
		resultado.jurosTotais.toFixed(2) +
		'<br> Valor com juros: R$ ' +
		resultado.valorTotal.toFixed(2);

	return elemento;
}

function calcularJuros(taxa) {
	var parcelas = parseInt(document.getElementById('parcelas').value);
	var entrada = parseFloat(document.getElementById('entrada').value);
	var juros = taxa / 100;

	var razao = Math.pow(1 + juros, parcelas);
	var coeficiente = juros / (1 - 1 / razao);
	var valorFinanciado = valorFipe - entrada;
	var prestacaoFinal = valorFinanciado * coeficiente;
	var jurosTotais = prestacaoFinal * parcelas - valorFinanciado;
	var valorTotal = prestacaoFinal * parcelas;

	return {
		prestacaoFinal,
		jurosTotais,
		valorTotal
	};
}

buscarValor();
