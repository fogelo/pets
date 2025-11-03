1. Собрать образ
`docker build -t my-nginx .`

2. Запустить контейнер
`docker run -d -p 8080:80 --name my-nginx-container my-nginx`

