Este é um código JavaScript para criar e enviar uma lista de perguntas usando a API Open Trivia DB. Ele também permite verificar as respostas selecionadas pelo usuário.

#Funcionalidades
O usuário pode especificar o número de perguntas desejadas, a categoria e a dificuldade.
As perguntas são obtidas através da API Open Trivia DB.
As perguntas são exibidas na página, juntamente com as opções de resposta.
As opções de resposta são embaralhadas para evitar uma ordem fixa.
O usuário pode marcar as respostas e verificar a pontuação.
Após verificar as respostas, a página é recarregada para permitir a criação de uma nova lista de perguntas.
#Como usar
Adicione o código JavaScript a uma página HTML existente ou crie um novo arquivo HTML.
Certifique-se de ter elementos HTML com os IDs numero_de_questoes, categoria e dificuldade para permitir que o usuário especifique as opções desejadas.
Certifique-se de ter um elemento HTML onde as perguntas e as opções de resposta serão exibidas. Este elemento deve ter uma classe display_box.
O código fornecido adicionará automaticamente um botão "Verificar Respostas" e manipulará o evento de clique nesse botão.
Certifique-se de ter a biblioteca fetch disponível no ambiente em que o código será executado. Geralmente, isso está disponível nos navegadores modernos.
Certifique-se de ter uma conexão de internet ativa para acessar a API Open Trivia DB.
#Notas adicionais
Este código utiliza a função shuffleArray para embaralhar as opções de resposta. Certifique-se de que essa função esteja definida no seu ambiente de execução.
A função decodeHTMLEntities é usada para decodificar entidades HTML presentes nas perguntas e respostas retornadas pela API.
Este código manipula erros de requisição usando catch para exibir mensagens de erro no console.
Espero que este README seja útil para entender e utilizar o código fornecido. Se você tiver alguma dúvida, sinta-se à vontade para perguntar.
