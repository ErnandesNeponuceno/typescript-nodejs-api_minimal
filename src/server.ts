import fastify from "fastify";
import data from './data/data.json'; 

const server = fastify({ logger: true });

const personagens = data as Array<{ id: number; name: string; casa: string }>;

server.get('/personagens', async (req, res) => {
    res.type('application/json').code(200);
    return personagens;
});

interface PersonParams {
    id: string;
}

server.get<{ Params: PersonParams }>('/personagens/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const person = personagens.find(d => d.id === id);

    if (!person) {
        res.type('application/json').code(404);
        return { message: "Personagem não encontrado" };
    } else {
        res.type('application/json').code(200);
        return person;
    }
});

server.listen({ port: 3333 }, () => {
    console.log('Servidor iniciado');
});
