// Navegação suave para a seção de serviços
const botaoDestaque = document.querySelector("#botaoDestaque");
const servicos = document.querySelector("#servicos");

botaoDestaque.addEventListener("click", () => {
  servicos.scrollIntoView({ behavior: "smooth" });
});

// Validação e envio do formulário de contato
const formContato = document.querySelector("#formContato");
const resposta = document.querySelector("#resposta");

// Controla o timeout de sumiço automático da mensagem de sucesso (Rodada 2).
// Guardado fora do handler para poder cancelar um timeout antigo se o
// usuário enviar o formulário de novo antes dos 5s acabarem.
let timeoutMensagemSucesso = null;

formContato.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nomeInput = document.querySelector("#nome");
  const emailInput = document.querySelector("#email");
  const mensagemInput = document.querySelector("#mensagem");

  const nome = nomeInput.value.trim();
  // O campo de e-mail ainda depende da branch feature/interface (Natã).
  // Guardado assim para não quebrar o formulário enquanto o campo não existe no HTML.
  const email = emailInput ? emailInput.value.trim() : "";
  const mensagem = mensagemInput.value.trim();

  // Limpa mensagens anteriores
  clearTimeout(timeoutMensagemSucesso);
  resposta.className = "mensagem-resposta";
  resposta.textContent = "";

  // Validação de campos obrigatórios
  if (!nome || (emailInput && !email) || !mensagem) {
    resposta.classList.add("erro");
    resposta.textContent = "⚠️ Por favor, preencha todos os campos obrigatórios.";
    return;
  }

  // Validação de e-mail (formato básico) — só roda quando o campo existir
  if (emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      resposta.classList.add("erro");
      resposta.textContent = "⚠️ Por favor, insira um e-mail válido.";
      return;
    }
  }

  // Validação de tamanho mínimo da mensagem
  if (mensagem.length < 10) {
    resposta.classList.add("erro");
    resposta.textContent = "⚠️ A mensagem deve ter pelo menos 10 caracteres.";
    return;
  }

  // Sucesso: exibe confirmação visual clara.
  // Nome/e-mail são inseridos como texto (não innerHTML) para evitar XSS.
  resposta.classList.add("sucesso");
  resposta.textContent = "";

  const linha1 = document.createElement("strong");
  linha1.textContent = "✅ Mensagem enviada com sucesso!";
  resposta.appendChild(linha1);
  resposta.appendChild(document.createElement("br"));

  resposta.appendChild(document.createTextNode("Obrigado pelo contato, "));
  const nomeForte = document.createElement("strong");
  nomeForte.textContent = nome;
  resposta.appendChild(nomeForte);
  resposta.appendChild(document.createTextNode("."));
  resposta.appendChild(document.createElement("br"));

  if (emailInput) {
    resposta.appendChild(document.createTextNode("Responderemos no e-mail "));
    const emailForte = document.createElement("strong");
    emailForte.textContent = email;
    resposta.appendChild(emailForte);
    resposta.appendChild(document.createTextNode(" em até "));
  } else {
    resposta.appendChild(document.createTextNode("Responderemos em até "));
  }
  const prazoForte = document.createElement("strong");
  prazoForte.textContent = "2 dias úteis";
  resposta.appendChild(prazoForte);
  resposta.appendChild(document.createTextNode("."));

  // Limpa o formulário após envio
  formContato.reset();

  // Rodada 2: a mensagem de sucesso some sozinha após 5s, pedido do cliente
  // (ele achava estranho ela ficar na tela indefinidamente).
  timeoutMensagemSucesso = setTimeout(() => {
    resposta.className = "mensagem-resposta";
    resposta.textContent = "";
  }, 5000);
});