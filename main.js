

function getAnotherUrl() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://mental-space-api.onrender.com/Relaxing/random-music',
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                resolve(response);
            },
            error: (xhr, status, error) => {
                reject(error);
            }
        });
    });
}

function verifyNumberAlready(array, number) {
    return array.includes(number)
}

async function manageNumbers(response) {
    let selectedNumber = []
    let newNumber = response.result[0]
    let currentNumbers = JSON.parse(localStorage.getItem('numero'))
    if (currentNumbers) {
      
        console.log(newNumber)
        // if(urls.length === currentNumbers.length){
        //     currentNumbers = []
        //     localStorage.setItem('numero',JSON.stringify(currentNumbers))
        // }

        do {
            const response = await getAnotherUrl()
            console.log(response)
            newNumber = response.result[0]
        } while (verifyNumberAlready(currentNumbers, newNumber.id));


        currentNumbers.forEach(number => {
            selectedNumber.push(number)
        });

        selectedNumber.push(newNumber.id)

        localStorage.setItem('numero', JSON.stringify(selectedNumber))

    }

    if (!currentNumbers) {
        console.log(newNumber)
        selectedNumber.push(newNumber.id)
        localStorage.setItem('numero', JSON.stringify(selectedNumber))
    }
    console.log(newNumber.url)
    return newNumber.url
    

}

async function cleanYoutubeUrl(response){
    const randomNumber = await manageNumbers(response)

    console.log(randomNumber)
    
    const selectedUrl = randomNumber
    // const startIndex = selectedUrl.split('v=')
    // const videoId = startIndex[1]

    return selectedUrl

}


$(document).ready(function () {


   

   $('#button-load').on('click', () => {

    $.ajax({
        url:'https://mental-space-api.onrender.com/Relaxing/random-music',
        type:'GET',
        dataType:'json',
        success: async (response)=>{
            const cleanResponse = JSON.stringify(response)
            const objectResp = JSON.parse(cleanResponse)
      
            let videoId = await cleanYoutubeUrl(objectResp)
            console.log(videoId)
            let newUrl = videoId.replace("watch?v=", "embed/") + "?autoplay=1"
            console.log(newUrl)
            $('iframe').attr( "src", newUrl)
        
        },
        error:(xhr,status,error) =>{
            console.log("request error",error)
        }
    })

    
})


});




// tem esse jeito de carregar os vídeos do youtube na tela, mas isso lota o console de erros :p
// function loadYoutube(){
//     const tag = $("<script></script>");
//     tag.attr('src', 'https://www.youtube.com/player_api');
//     const control = $('script').first();
//     control.before(tag);
// }



// function onYouTubePlayerAPIReady(videoId) {
//     if (window.player) {
//         window.player.destroy();
//     }
//     window.player = new YT.Player('video', {
//         height: '360',
//         width: '640',
//         videoId: videoId,
//         host: `${window.location.protocol}//www.youtube.com`
//     });
// }




