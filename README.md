My Education App

# Rodando o servidor
Isso vai subir um servidor fake para poder simular que temos uma API funcionando.
Ele se baseia num arquivo JSON que criei, em data/data.json, e cria as rotas. 
```npx json-server --watch data/data.json```

Endpoints:
http://localhost:3000/students
http://localhost:3000/degrees
http://localhost:3000/classes
http://localhost:3000/relashionships
http://localhost:3000/matters
http://localhost:3000/teachers

# Rodando a interface
Na raíz do projeto rode o comando ```npm run dev``` e ele vai estar rodando na url: http://localhost:5173/

Rotas:
http://localhost:5173/estudantes
http://localhost:5173/editar-estudante/id
http://localhost:5173/professores