cd alunos
docker build -t sistema-alunos .
docker run -d -p 8081:80 sistema-alunos
