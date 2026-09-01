// Navegação suave para a seção de serviços
const botaoDestaque = document.querySelector("#botaoDestaque");
const servicos = document.querySelector("#servicos");

botaoDestaque.addEventListener("click", () => {
  servicos.scrollIntoView({ behavior: "smooth" });
});

// Validação e envio do formulário de contato
const formContato = document.querySelector("#formContato");
const resposta = document.querySelector("#resposta");

formContato.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nomeInput = document.querySelector("#nome");
  const emailInput = document.querySelector("#email");
  const mensagemInput = document.querySelector("#mensagem");

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const mensagem = mensagemInput.value.trim();

  // Limpa mensagens anteriores
  resposta.className = "mensagem-resposta";
  resposta.textContent = "";

  // Validação de campos obrigatórios
  if (!nome || !email || !mensagem) {
    resposta.classList.add("erro");
    resposta.textContent = "⚠️ Por favor, preencha todos os campos obrigatórios.";
    return;
  }

  // Validação de e-mail (formato básico)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    resposta.classList.add("erro");
    resposta.textContent = "⚠️ Por favor, insira um e-mail válido.";
    return;
  }

  // Validação de tamanho mínimo da mensagem
  if (mensagem.length < 10) {
    resposta.classList.add("erro");
    resposta.textContent = "⚠️ A mensagem deve ter pelo menos 10 caracteres.";
    return;
  }

  // Sucesso: exibe confirmação visual clara
  resposta.classList.add("sucesso");
  resposta.innerHTML = `
    ✅ <strong>Mensagem enviada com sucesso!</strong><br>
    Obrigado pelo contato, <strong>${nome}</strong>.<br>
    Responderemos no e-mail <strong>${email}</strong> em até <strong>2 dias úteis</strong>.
  `;

  // Limpa o formulário após envio
  formContato.reset();
});