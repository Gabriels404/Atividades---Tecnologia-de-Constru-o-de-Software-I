class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = notaFinal;
  }

  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    return `${this.nome} - ${this.curso}`;
  }
}

const alunos = [];
const form = document.getElementById("formAluno");
const tabela = document.getElementById("tabelaAlunos");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const nota = document.getElementById("nota").value;

  const aluno = new Aluno(nome, idade, curso, nota);
  alunos.push(aluno);
  renderTabela();
  form.reset();
});

function renderTabela() {
  tabela.innerHTML = "";
  alunos.forEach((a, i) => {
    const row = `<tr>
      <td>${a.nome}</td>
      <td>${a.idade}</td>
      <td>${a.curso}</td>
      <td>${a.notaFinal}</td>
      <td><button onclick="excluir(${i})">Excluir</button></td>
    </tr>`;
    tabela.innerHTML += row;
  });
}

function excluir(i) {
  alunos.splice(i, 1);
  renderTabela();
}
