const formulario = document.getElementById("formulario-busca");
const campoRua = document.getElementById("campo-rua");
const resultado = document.getElementById("resultado");

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

    resultado.innerHTML = `
        <div class="resultado-carregando">
            Pesquisando endereço...
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

        resultado.innerHTML = enderecos
            .map(function (endereco) {

                return `
                    <div class="resultado-sucesso">
                        <h2>Endereço encontrado</h2>

                        <p>
                            <strong>CEP:</strong>
                            ${endereco.cep}
                        </p>

                        <p>
                            <strong>Rua:</strong>
                            ${endereco.logradouro}
                        </p>

                        <p>
                            <strong>Bairro:</strong>
                            ${endereco.bairro || "Não informado"}
                        </p>

                        <p>
                            <strong>Cidade:</strong>
                            ${endereco.localidade} - ${endereco.uf}
                        </p>

                        <button
                            type="button"
                            class="botao-copiar"
                            data-cep="${endereco.cep}"
                        >
                            Copiar CEP
                        </button>
                    </div>
                `;
            })
            .join("");

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