
const urls = ['https://www.youtube.com/watch?v=qw50dx9KO-c', 'https://www.youtube.com/watch?v=RReTCVFifEM', 'https://www.youtube.com/watch?v=gU-8U7Z-E64&t=102s']

function selectRandom() {
    const randomNumber = Math.floor(Math.random() * urls.length) 
    return randomNumber
}

function verifyNumberAlready(array, number) {
    return array.includes(number)
}

function manageNumbers() {
    let selectedNumber = []
    let newNumber;
    let currentNumbers = JSON.parse(localStorage.getItem('numero'))

    if (currentNumbers) {
        newNumber = selectRandom()

        if(urls.length === currentNumbers.length){
            currentNumbers = []
            localStorage.setItem('numero',JSON.stringify(currentNumbers))
        }

        do {
            newNumber = selectRandom()
        } while (verifyNumberAlready(currentNumbers, newNumber));


        currentNumbers.forEach(number => {
            selectedNumber.push(number)
        });

        selectedNumber.push(newNumber)

        localStorage.setItem('numero', JSON.stringify(selectedNumber))

    }

    if (!currentNumbers) {
        newNumber = selectRandom()
        selectedNumber.push(newNumber)
        localStorage.setItem('numero', JSON.stringify(selectedNumber))
    }
    console.log(newNumber)
    return newNumber

}

function cleanYoutubeUrl(){
    const randomNumber = manageNumbers()
    
    const selectedUrl = urls[randomNumber]
    const startIndex = selectedUrl.split('v=')
    const videoId = startIndex[1]

    console.log(videoId)
    return videoId

}

const loadMoreButton = $('#button-load').on('click', () => {

        let videoId = cleanYoutubeUrl()
   
        onYouTubePlayerAPIReady(videoId)
    
    
})

$(document).ready(function () {
    loadYoutube()
});

function loadYoutube(){
    const tag = $("<script></script>");
    tag.attr('src', 'https://www.youtube.com/player_api');
    const control = $('script').first();
    control.before(tag);
}



function onYouTubePlayerAPIReady(videoId) {
    if (window.player) {
        window.player.destroy();
    }
    window.player = new YT.Player('video', {
        height: '360',
        width: '640',
        videoId: videoId,
        host: `${window.location.protocol}//www.youtube.com`
    });
}




