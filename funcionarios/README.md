cd funcionarios
docker build -t sistema-funcionarios .
docker run -d -p 8080:80 sistema-funcionarios

http://localhost:8080/