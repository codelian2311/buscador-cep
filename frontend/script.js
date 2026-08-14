// Pegando os elementos do HTML
const formulario = document.getElementById("formulario-busca");
const campoRua = document.getElementById("campo-rua");
const resultado = document.getElementById("resultado");

// Dados temporários para testar o site
const enderecos = [
    {
        rua: "Rui Barbosa",
        cep: "85845-000"
    },
    {
        rua: "Afonso Pena",
        cep: "85845-064"
    },
    {
        rua: "Heiji Sakai",
        cep: "85845-055"
    },
    {
        rua: "Jose Bianchini",
        cep: "85845-037"
    },
    {
        rua: "Duque de Caxias",
        cep: "85845-076"
    }
];

// Esse código será executado quando o formulário for enviado
formulario.addEventListener("submit", function (evento) {

    // Impede a página de atualizar
    evento.preventDefault();

    // Pega o que a pessoa digitou
    const ruaDigitada = campoRua.value.trim();

    // Procura a rua dentro da lista
    const enderecoEncontrado = enderecos.find(function (endereco) {

        return endereco.rua.toLowerCase()
            === ruaDigitada.toLowerCase();
    });

    // Verifica se encontrou
    if (enderecoEncontrado) {

        resultado.innerHTML = `
            <div class="resultado-sucesso">
                <h2>Endereço encontrado</h2>

                <p>
                    <strong>Rua:</strong>
                    ${enderecoEncontrado.rua}
                </p>

                <p>
                    <strong>CEP:</strong>
                    ${enderecoEncontrado.cep}
                </p>
            </div>
        `;

    } else {

        resultado.innerHTML = `
            <div class="resultado-erro">
                <h2>Rua não encontrada</h2>

                <p>
                    Verifique o nome informado e tente novamente.
                </p>
            </div>
        `;
    }
});