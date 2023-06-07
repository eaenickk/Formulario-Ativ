function cadastrarCliente() {
    try {
        // Obter os valores dos campos do formulário
        var nome = document.getElementById('nome').value;
        var id = document.getElementById('id').value;
        var tipoCliente = document.getElementById('tipoCliente').value;
        var endereco = document.getElementById('endereco').value;
        var cep = document.getElementById('cep').value;
        var dataNascimento = document.getElementById('dataNascimento').value;
        var vendedor = document.getElementById('vendedor').value;
        var limiteCredito = document.getElementById('limiteCredito').value;

        var dataNascimentoDate = new Date(dataNascimento);
        var anoNascimento = dataNascimentoDate.getFullYear();
        var anoAtual = new Date().getFullYear();

        if (anoNascimento < 1950 || anoNascimento > anoAtual) {
            throw "A data de nascimento deve estar entre 1950 e o ano atual.";
        }

         // Validar o campo ID
         if (!id.match(/^\d+$/)) {
            throw "O ID deve conter apenas números.";
        }

        // Validar o campo Nome
        if (!nome.match(/^[a-zA-Z\s]+$/)) {
            throw "O campo Nome não pode conter números.";
        }

        // Armazenar nome e ID utilizando cookies
        document.cookie = "nome=" + encodeURIComponent(nome);
        document.cookie = "id=" + encodeURIComponent(id);

        // Exibir mensagem de sucesso
        alert("Cadastro realizado com sucesso!");

        // Limpar os campos do formulário
        document.getElementById('nome').value = "";
        document.getElementById('id').value = "";
        document.getElementById('tipoCliente').value = "";
        document.getElementById('endereco').value = "";
        document.getElementById('cep').value = "";
        document.getElementById('dataNascimento').value = "";
        document.getElementById('vendedor').value = "";
        document.getElementById('limiteCredito').value = "";

        // Atualizar os elementos no topo da página
        atualizarDadosFormulario();

        return false;
    } catch (error) {
        // Exibir mensagem de erro
        alert("Erro ao cadastrar cliente: " + error);
        return false;
    }
}

function atualizarDadosFormulario() {
    // Obter os cookies
    var cookies = document.cookie.split(";");

    // Procurar pelo nome e ID nos cookies
    var nome = null;
    var id = null;
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith("nome=")) {
            nome = decodeURIComponent(cookie.substring("nome=".length));
        }
        if (cookie.startsWith("id=")) {
            id = decodeURIComponent(cookie.substring("id=".length));
        }
    }

    // Atualizar os elementos no topo da página
    var nomeFormularioElement = document.getElementById("nomeFormulario");
    var idFormularioElement = document.getElementById("idFormulario");

    if (nome && id) {
        nomeFormularioElement.textContent = "Nome do formulário: " + nome;
        idFormularioElement.textContent = "ID do formulário: " + id;
    } else {
        nomeFormularioElement.textContent = "";
        idFormularioElement.textContent = "";
    }
}

// Chamar a função para atualizar os dados do formulário quando a página é carregada
window.addEventListener("load", atualizarDadosFormulario);
