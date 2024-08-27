# Relaxing-Space 🌊​ - API DE MUSICAS TEMPORARIAMENTE DESATIVADA 

## Visão geral 👁️​
Relaxing Space foi desenvolvido durante meus testes com uma biblioteca mais antiga chamada jQuery.

Atualmente o projeto contém um botão de rodar músicas aleatórias. Depois de pressionado, o site começa a tocar músicas relaxantes de forma aleatória até o usuário apertar pausa ou novamente o botão para trocar a música(o usuário não precisa manualmente apertar o botão pois o site inicia a próxima música após a ultima terminar.).

As músicas vêm da minha API 'Mental-Space-Api' de um endpoint que traz de forma aleatória URLs de músicas relaxantes.

Você pode acessar o deploy aqui: https://andernial.github.io/Relaxing-Space/ (se você apertar o botão e demorar para acontecer algo, é normal. A API foi hospedada no Render e, às vezes, o Render desativa a API por alguns minutos.)

## Para Acessar Localmente 🏠​
Para acessar o frontEnd localmente basta abrir o arquivo index.html no seu navegador.

## Tecnologias Utilizadas​ 🤖​
jQuery, Ajax, HTML, CSS

jQuery foi utilizado para lidar com os elementos do documento HTML. O Ajax foi usado para realizar as requisições.

## BackEnd 🔙​
Foram utilizadas duas APIs para o desenvolvimento desse projeto:

Mental-Space-API: https://github.com/Andernial/Mental-Space-Api (esta API foi desenvolvida por mim. Nela podemos encontrar diversas rotas com o intuito de trazer ferramentas para ajudar aqueles que sofrem de algum problema relacionado à saúde mental.)

YouTube Player API: https://developers.google.com/youtube/iframe_api_reference?hl=pt-br (esta API desenvolvida pelo YouTube, permite rodar vídeos do YouTube em sites.)

## Considerações Finais 📦​
Este foi um projeto bem divertido de desenvolver, eu mesmo pretendo usar quando quiser escutar músicas mais relaxantes no background.

Para rodar vídeos do youtube eu usei a API youtube player, Existe uma forma mais fácil utilizando a tag <iframe> que diferente da forma que usei, não lota o console de avisos. No entanto utilizando iframes não encontrei nenhuma forma de executar eventos ao final de um vídeo. Para o objetivo deste projeto, ficou bem mais divertido utilizar esta API do YouTube apesar de ela lotar o console de avisos inconsistentes.

Pretendo futuramente consumir outras rotas de minha api e desenvolver um site com um layout mais bacana quando eu tiver tempo (não sei se vou continuar utilizando o jquery para isso)
