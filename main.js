
function verifyNumberAlready(array, number) {
    return array.includes(number)
}

async function cleanYoutubeUrl(response) {
    const url = await response.result[0].url

    const selectedUrl = url

    $('#button-load').prop('disabled', false)
    $('.random-box').attr('src','./assets/icons/random.png')
    return selectedUrl

}


function changeTheme(theme) {

    $('*').toggleClass('dark-text')
    $('.app').toggleClass('dark-theme')
    $('#video').toggleClass('dark-border')

    if (theme === true) {
        $('.lamp').attr('src', './assets/icons/light-default.png')
    }
    if (theme === false) {
        $('.lamp').attr('src', './assets/icons/light.png')

    }
}


function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        loadMoreVideos()
    }
}

async function loadMoreVideos() {
    $('.random-box').attr('src','./assets/icons/lowOpacity-random.png')
    $('#button-load').prop('disabled', true)
    
    $.ajax({
        url: 'https://mental-space-api.onrender.com/Relaxing/random-music',
        type: 'GET',
        dataType: 'json',
        success: async (response) => {
            const cleanResponse = JSON.stringify(response)
            const objectResp = JSON.parse(cleanResponse)

            let newUrl = await cleanYoutubeUrl(objectResp)
            const videoId = newUrl.split('v=')[1]
            // let newUrl = videoId.replace("watch?v=", "embed/") + "?autoplay=1" + "&enablejsapi=1" // isso é para carregar vídeos usando iframe
            // $('iframe').attr( "src", newUrl) // isso é para carregar vídeos usando iframe

            onYouTubeIframeAPIReady(videoId);
        },
        error: (xhr, status, error) => {
            $('#button-load').prop('disabled', false)
            alert('Erro interno da api sorry :(')
        }
    })
}


$(document).ready(function () {
    let theme = JSON.parse(localStorage.getItem('theme'))

    if (theme && theme === true) {
        changeTheme(theme)
    }

    $('#changeTheme').on('click', () => {
        $('#loader').css('animation', 'circleIn 3.5s');
        setTimeout(() => {
            let theme = JSON.parse(localStorage.getItem('theme'))
            if (!theme) {
                theme = false
            }
            theme = !theme
            changeTheme(theme)

            localStorage.setItem('theme', JSON.stringify(theme))

            $('#loader').css('animation', 'circleOut 1.5s');
        }, 1300);

    })

    $('#button-load').on('click', () => {
        loadMoreVideos()

    })

});

function onYouTubeIframeAPIReady(videoID) {

    if (!videoID) {
        return
    }
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