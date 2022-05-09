$(document).ready(function () {
    //Estudio gris

    // tab
    $('ul.list li').click(function () { 
        $('ul.list li').removeClass("active");
        $(this).addClass("active");
        
        let musicId = $(this).attr("music-id");
        $(".single .music").removeClass("active");
        $(musicId).addClass("active");
    });

    //player (main)
    let audioURL = "/music/Cris Mj - Una Noche En Medellín (Letra_Lyrics) (1).mp3"


    let audio={};
    audio["music"] = new Audio();
    audio["music"].src = audioURL;

    audio["music"].addEventListener("canplaythrough", function(){
        $('.time').html(new Date(Math.round(audio["music"].duration) * 1000).toISOString().substr(11, 8))
    })

    let interval;
    let pIndex = 0;
    $('.play').click(function(){

        setTimeout(function(){
            
            let audioDuration = Math.round(audio["music"].duration);
            let itemInterval = (audioDuration); // 

            if (isPlaying(audio["music"])) {
                audio["music"].pause();
                $(".play svg").removeClass("fa-pause").addClass("fa-play");

                clearInterval(interval);
            } else {
                audio["music"].play();
                $(".play svg").removeClass("fa-play").addClass("fa-pause");

                interval = setInterval(() => {
                    
                    pIndex++;
                    if ( audio["music"].currentTime >= audioDuration) {
                        clearInterval(interval);
                        audio["music"].pause();
                        pIndex = 1;
                        audio["music"].currentTime = 0; //resetear
                        $(".play svg").removeClass("fa-pause").addClass("fa-play");
                    }

                    $('.time').html(new Date(Math.round(audio["music"].currentTime) * 1000).toISOString().substr(11, 8));

                    $('.seekbar-inner').css({"width": pIndex / 10 + "%"});

                }, itemInterval);
            }
        }, 200); //milisegundos
        
    })    
});

function isPlaying(audElem){
    return !audElem.paused;
}