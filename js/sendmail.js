var btn = document.getElementById('envarMensagem')

btn.addEventListener('click',()=>{
    var nome = document.getElementById('nome').value
    var email = document.getElementById('email').value
    var telefone = document.getElementById('telefone').value
    var assunto = document.getElementById('assunto').value
    var menssagem = document.getElementById('menssagem').value

    if(nome && email && telefone && assunto && menssagem){
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "me2803390@gmail.com",
            Password : "60D37F3F9DCFCB84D6988D0BD93D76999C5C",
            To : 'joaopap1234@gmail.com',
            From : "me2803390@gmail.com",
            Subject : `Chegou um email para voce`,
            Body : `NOME:${nome} <br>\n ASSUNTO:${assunto} <br>\n TELEFONE: ${telefone} <br>\n EMAIL: ${email}<br>\n${menssagem}`
        }).then(()=>{
            alert('sua mensagem foi enviada')
        });
    }else{
        alert('Preencha todos os campos')
    }
})




