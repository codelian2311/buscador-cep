const formulario = document.getElementById("formulario-busca");
const campoRua = document.getElementById("campo-rua");
const resultado = document.getElementById("resultado");
const botaoBuscar = formulario.querySelector(
    "button[type='submit']"
);

const URL_API = "https://buscador-cep-api.onrender.com";

formulario.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const ruaDigitada = campoRua.value.trim();

    if (ruaDigitada.length < 3) {

        resultado.innerHTML = `
            <div class="resultado-erro">
                <h2>Nome muito curto</h2>

                <p>
                    Digite pelo menos 3 letras.
                </p>
            </div>
        `;

        return;
    }

    botaoBuscar.disabled = true;
    botaoBuscar.textContent = "Buscando...";

    resultado.innerHTML = `
        <div class="resultado-carregando">
            <strong>Pesquisando endereço...</strong>

            <p>
                O servidor pode levar alguns segundos para iniciar.
            </p>
        </div>
    `;

    try {

        const ruaPreparada = encodeURIComponent(ruaDigitada);

        const resposta = await fetch(
            `${URL_API}/api/cep?rua=${ruaPreparada}`
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar o servidor.");
        }

        const enderecos = await resposta.json();

        if (enderecos.length === 0) {

            resultado.innerHTML = `
                <div class="resultado-erro">
                    <h2>Rua não encontrada</h2>

                    <p>
                        Verifique o nome informado e tente novamente.
                    </p>
                </div>
            `;

            return;
        }

        const quantidade = enderecos.length;

const textoQuantidade = quantidade === 1
    ? "1 endereço encontrado"
    : `${quantidade} endereços encontrados`;

resultado.innerHTML = `
    <p class="resultado-resumo">
        ${textoQuantidade}
    </p>

    <div class="lista-enderecos">

        ${enderecos.map(function (endereco) {

            return `
                <article class="resultado-sucesso">

                    <header class="resultado-cabecalho">

                        <div>
                            <span class="resultado-rotulo">
                                CEP
                            </span>

                            <strong class="resultado-cep">
                                ${endereco.cep}
                            </strong>
                        </div>

                        <button
                            type="button"
                            class="botao-copiar"
                            data-cep="${endereco.cep}"
                        >
                            Copiar CEP
                        </button>

                    </header>

                    <dl class="resultado-dados">

                        <div>
                            <dt>Logradouro</dt>

                            <dd>
                                ${endereco.logradouro || "Não informado"}
                            </dd>
                        </div>

                        <div>
                            <dt>Bairro</dt>

                            <dd>
                                ${endereco.bairro || "Não informado"}
                            </dd>
                        </div>

                        <div>
                            <dt>Município</dt>

                            <dd>
                                ${endereco.localidade} — ${endereco.uf}
                            </dd>
                        </div>

                    </dl>

                </article>
            `;

        }).join("")}

    </div>
`;

    } catch (erro) {

        resultado.innerHTML = `
            <div class="resultado-erro">
                <h2>Erro de conexão</h2>

                <p>
                    Não foi possível conectar ao servidor.
                </p>
            </div>
        `;

        console.error(erro);

    } finally {

        botaoBuscar.disabled = false;
        botaoBuscar.textContent = "Buscar CEP";
    }
});

resultado.addEventListener("click", async function (evento) {

    if (!evento.target.classList.contains("botao-copiar")) {
        return;
    }

    const botao = evento.target;
    const cep = botao.dataset.cep;

    try {

        await navigator.clipboard.writeText(cep);

        botao.textContent = "CEP copiado!";

        setTimeout(function () {
            botao.textContent = "Copiar CEP";
        }, 2000);

    } catch (erro) {

        console.error("Não foi possível copiar o CEP.", erro);

        botao.textContent = "Erro ao copiar";
    }
});