// ======== EXERCÍCIO 1 =========
class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  getNome() { return this.nome; }
  setNome(n) { this.nome = n; }

  getIdade() { return this.idade; }
  setIdade(i) { this.idade = i; }

  getCargo() { return this.cargo; }
  setCargo(c) { this.cargo = c; }

  getSalario() { return this.salario; }
  setSalario(s) { this.salario = s; }

  toString() {
    return `${this.nome} (${this.cargo}) - R$${this.salario}`;
  }
}

let funcionarios = [];
let indiceEdicao = -1;

const form = document.getElementById("formFuncionario");
const tabela = document.getElementById("tabelaFuncionarios");
const relatorio = document.getElementById("relatorio");

// ======== EXERCÍCIO 2 =========
// Cadastrar e Editar com funções anônimas
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = Number(document.getElementById("idade").value);
  const cargo = document.getElementById("cargo").value;
  const salario = Number(document.getElementById("salario").value);

  if (indiceEdicao === -1) {
    const f = new Funcionario(nome, idade, cargo, salario);
    funcionarios.push(f);
  } else {
    funcionarios[indiceEdicao].setNome(nome);
    funcionarios[indiceEdicao].setIdade(idade);
    funcionarios[indiceEdicao].setCargo(cargo);
    funcionarios[indiceEdicao].setSalario(salario);
    indiceEdicao = -1;
  }

  form.reset();
  renderTabela();
});

// Renderiza tabela
function renderTabela() {
  tabela.innerHTML = "";
  funcionarios.forEach((f, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${f.getNome()}</td>
      <td>${f.getIdade()}</td>
      <td>${f.getCargo()}</td>
      <td>R$ ${f.getSalario()}</td>
      <td>
        <button onclick="editar(${i})">Editar</button>
        <button onclick="excluir(${i})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

// ======== EXERCÍCIO 3 =========
// Arrow functions para busca, edição e exclusão
const excluir = (i) => {
  funcionarios.splice(i, 1);
  renderTabela();
};

const editar = (i) => {
  const f = funcionarios[i];
  document.getElementById("nome").value = f.getNome();
  document.getElementById("idade").value = f.getIdade();
  document.getElementById("cargo").value = f.getCargo();
  document.getElementById("salario").value = f.getSalario();
  indiceEdicao = i;
};

// ======== EXERCÍCIO 4 =========
// Relatórios com map, filter, reduce, new Set()

document.getElementById("btnSalarioMaior").addEventListener("click", () => {
  const lista = funcionarios.filter(f => f.getSalario() > 5000);
  relatorio.innerHTML = `<p><b>Funcionários com salário > 5000:</b></p><ul>${
    lista.map(f => `<li>${f.toString()}</li>`).join("")
  }</ul>`;
});

document.getElementById("btnMediaSalarial").addEventListener("click", () => {
  if (funcionarios.length === 0) {
    relatorio.innerHTML = "<p>Nenhum funcionário cadastrado.</p>";
    return;
  }
  const media = funcionarios.reduce((acc, f) => acc + f.getSalario(), 0) / funcionarios.length;
  relatorio.innerHTML = `<p><b>Média salarial:</b> R$ ${media.toFixed(2)}</p>`;
});

document.getElementById("btnCargosUnicos").addEventListener("click", () => {
  const cargos = [...new Set(funcionarios.map(f => f.getCargo()))];
  relatorio.innerHTML = `<p><b>Cargos únicos:</b> ${cargos.join(", ")}</p>`;
});

document.getElementById("btnNomesMaiusculo").addEventListener("click", () => {
  const nomes = funcionarios.map(f => f.getNome().toUpperCase());
  relatorio.innerHTML = `<p><b>Nomes em maiúsculo:</b> ${nomes.join(", ")}</p>`;
});
