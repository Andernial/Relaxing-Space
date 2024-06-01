

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
    $('#button-load').prop('disabled',false)
    return selectedUrl

}


function changeTheme(theme){

       $('*').toggleClass('dark-text')
       $('.app').toggleClass('dark-theme')
       $('.button-load').toggleClass('dark-button')

       if(theme === true){
        $('.lamp').attr('src','./assets/icons/light-default.png')
       }
       if(theme === false){
        $('.lamp').attr('src','./assets/icons/light.png')
         
       }
}


function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        loadMoreVideos()
    }
}


// function onPlayerReady(event) {
//     event.target.playVideo(); // Inicia a reprodução do vídeo automaticamente
// }

async function loadMoreVideos(){
    $('#button-load').prop('disabled',true)
    $.ajax({
        url:'https://mental-space-api.onrender.com/Relaxing/random-music',
        type:'GET',
        dataType:'json',
        success: async (response)=>{
            const cleanResponse = JSON.stringify(response)
            const objectResp = JSON.parse(cleanResponse)
      
            let videoId = await cleanYoutubeUrl(objectResp)
            console.log(videoId)
            const newUrl = videoId.split('v=')[1]
            // let newUrl = videoId.replace("watch?v=", "embed/") + "?autoplay=1" + "&enablejsapi=1" // isso é para carregar vídeos usando iframe
            console.log(newUrl)
            // $('iframe').attr( "src", newUrl) // isso é para carregar vídeos usando iframe

            onYouTubeIframeAPIReady(newUrl);
        },
        error:(xhr,status,error) =>{
            $('#button-load').prop('disabled',false)
            console.log("request error",error)
        }
    })
}


$(document).ready(function () {

let theme = JSON.parse(localStorage.getItem('theme'))

if(theme && theme === true){
    changeTheme(theme)
}

    $('#changeTheme').on('click', ()=>{
        let theme = JSON.parse(localStorage.getItem('theme'))
        if(!theme){
            theme = false
        }
        theme = !theme
        changeTheme(theme)

        localStorage.setItem('theme',JSON.stringify(theme))
    })
    
   $('#button-load').on('click', () => {
    loadMoreVideos()
    
})


});


function onYouTubeIframeAPIReady(videoID) {
    if (window.player) {
        window.player.destroy();
    }
    window.player = new YT.Player('video', {
        height: '360',
        width: '640',
        videoId: videoID, 
        host: 'https://www.youtube.com',
        origin: window.location.origin,
        playerVars: {
            'autoplay': 1 
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });

    
}


// comando para chamar animação

// let button = document.getElementById('btn1')

// function load(){
//     let loader = document.getElementById('loader')
//     let page1 = document.getElementById('page1')
//     let page2 = document.getElementById('page2')
    
//     loader.style.animation = 'circleIn 3.5s'
//     setTimeout(()=>{
//         page1.style.display ='none';
//         page2.style.display = 'flex';
//         loader.style.animation = 'circleOut 1.5s'
//     }, 1300)

// }


// button.addEventListener('click', ()=>{
//     load()
// })



// tem esse jeito de carregar os vídeos do youtube na tela, mas isso lota o console de erros :p
// function loadYoutube(){
//     const tag = $("<script></script>");
//     tag.attr('src', 'https://www.youtube.com/player_api');
//     const control = $('script').first();
//     control.before(tag);
// }



// function onYouTubePlayerAPIReady(videoId) {
    // if (window.player) {
    //     window.player.destroy();
    // }
    // window.player = new YT.Player('video', {
//         height: '360',
//         width: '640',
//         videoId: videoId,
//         host: `${window.location.protocol}//www.youtube.com`
//     });
// }




