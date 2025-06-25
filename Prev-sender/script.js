// Funções da home.html (Gerador de Link)
function gerarLink() {
  const data = {
    iframe: document.getElementById('iframeLink').value,
    cnpj: document.getElementById('cnpj').value,
    pedido: document.getElementById('pedido').value
  };

  const json = JSON.stringify(data);
  const base64 = btoa(json); // codifica em Base64

  const url = `sender-prev.html?d=${base64}`;
  const resultado = `<a href="\${url}" target="_blank">\${url}</a>`;
  document.getElementById('linkFinal').innerHTML = resultado;
}

function atualizarPreview() {
  const iframeUrl = document.getElementById('iframeLink').value.trim();
  const previewIframe = document.getElementById('previewIframe');
  if (previewIframe) {
    previewIframe.src = iframeUrl || '';
  }
}

function limparPreview() {
  const previewIframe = document.getElementById('previewIframe');
  const linkFinal = document.getElementById('linkFinal');
  if (previewIframe) previewIframe.src = '';
  if (linkFinal) linkFinal.innerHTML = '';
}

// Funções da sender-prev.html
function limparInput(botao) {
  const input = botao.parentElement.querySelector('input');
  if (input) {
    input.value = '';
  }
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || '';
}

function carregarIframe() {
  const dataParam = getQueryParam('d');

  if (dataParam) {
    try {
      const json = atob(dataParam);
      const dados = JSON.parse(json);
      const iframeLink = dados.iframe;
      const iframe = document.getElementById('pagamentoIframe');
      if (iframe && iframeLink) {
        iframe.src = iframeLink;
      }
    } catch (error) {
      console.error('Erro ao decodificar o parâmetro Base64:', error);
    }
  }
}

// Executar automaticamente se estiver na página de destino
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('pagamentoIframe')) {
    carregarIframe();
  }
});