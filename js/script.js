const button = document.getElementById('send-question');

const consultaGemini = async (question) => {
    const keyGoogle = 'AIzaSyBZaybh57iVi23jcLvzuIrabNG4f3td60A';
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + keyGoogle;

    const requestData = {
        contents: [
            {
                parts: [
                    {
                        text: `${question}`
                    }
                ]
            }
        ]
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Corrigido aqui
        },
        body: JSON.stringify(requestData)
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error('Erro ao enviar a pergunta.');
        }
        const data = await response.json();
        const respostaTextIA = data.candidates[0].content.parts[0].text;
        respostaIA(respostaTextIA);
    } catch (error) {
        console.error('Erro:', error);
    }
};

const respostaIA = (responseTextIA) => {
    const textAreaPt = document.getElementById('responseIA');
    textAreaPt.value = responseTextIA;
};

button.addEventListener('click', () => {
    const question = document.getElementById('response').value;
    consultaGemini(question);
});



// Função para ajustar dinamicamente a altura do textarea
function ajustarAlturaTextArea() {
    const textAreaPt = document.getElementById('responseIA');
    textAreaPt.style.height = 'auto'; // Define a altura como automática para redefinir

    // Define a altura do textarea com base no conteúdo
    textAreaPt.style.height = textAreaPt.scrollHeight + 'px';
}

// Chama a função sempre que o conteúdo do textarea mudar
document.getElementById('responseIA').addEventListener('input', ajustarAlturaTextArea);
