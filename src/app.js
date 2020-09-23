const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  
  const repo = {id: uuid(), title, url, techs, likes: 0};
  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params; 
  const {title, url, techs} = request.body;

  const repoIndex = repositories.findIndex(repository => repository.id === id); 

  if(repoIndex < 0){
    return response.status(400).json("ID not found");
  }

  const repo = {
    id,
    title, 
    url,
    techs,
    likes: repositories[repoIndex].likes,
  } 

  repositories[repoIndex] = repo; 

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  
  const repoIndex = repositories.findIndex(repository => repository.id === id); 

  if(repoIndex < 0){
    return response.status(400).json("ID not found");
  }
  
  repositories.splice(repoIndex, 1);

  return response.status(204).send("Removido com sucesso");
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  
  const repoIndex = repositories.findIndex(repository => repository.id === id); 

  if(repoIndex < 0){
    return response.status(400).json("ID not found");
  }

  const test = repositories[repoIndex]; 
  
  const {title, url, techs, likes} = test;

  const repo = {
    id,
    title, 
    url, 
    techs,
    likes: likes + 1,
  } 

  repositories[repoIndex] = repo;

  return response.json(repo);
});

module.exports = app;
