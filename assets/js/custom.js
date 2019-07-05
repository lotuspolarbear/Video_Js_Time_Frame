$(document).ready(function(){

    $('.clip-btn').click(function(e){
        e.preventDefault();
        var total_duration = $('#video_html5_api')[0].duration;
        var currentTime = $('#video_html5_api')[0].currentTime;
        var start_time = currentTime - 60;
        var end_time = currentTime + 60;
        if(start_time < 0){
            start_time = 0;
        }
        if(end_time > total_duration){
            end_time = total_duration;
        }
        
        var connectSlider = document.getElementById('time_slider');
        var start_percentage = (start_time/total_duration*100).toString();
        connectSlider.noUiSlider.set([start_percentage, null]);
        var end_percentage = (end_time/total_duration*100).toString();
        connectSlider.noUiSlider.set([null, end_percentage]);

        $('.noUi-base').css('display', 'block');
        $('.vjs-marker').css('display', 'block');
    })
    var player = videojs("video");

    player.markers({
        markerStyle: {
            'width': "0%",
            'border-radius': '0%',
            'background-color': '#f6c606',
            'margin': '0px!important'
        },
        breakOverlay:{
         display: false,
         displayTime: 10,
         text: function(marker) {
            return "This is an break overlay: " + marker.text;
         }
        },
        markers: [
         {
            time: 0,
            text: "this",
            duration: 10
         }
        ]
    });


    $('#start_time').change(function(){
        setMarker();
        var connectSlider = document.getElementById('time_slider');
        var total_duration = $('#video_html5_api')[0].duration;
        var start_time = this.value;
        var start_percentage = (start_time/total_duration*100).toString();
        connectSlider.noUiSlider.set([start_percentage, null]);     
    })

    $('#end_time').change(function(){
        var start_time = $('#start_time').val();
        var end_time = $('#end_time').val();
        if(end_time == ""){
            end_time = 0;
        }
        if(parseFloat(end_time) < parseFloat(start_time)){

        } else {
            setMarker();
            var connectSlider = document.getElementById('time_slider');
            var total_duration = $('#video_html5_api')[0].duration;
            var end_percentage = (end_time/total_duration*100).toString();
            connectSlider.noUiSlider.set([null, end_percentage]);
        }
    })

    $('#start_time').keyup(function(){
        setMarker();
        var connectSlider = document.getElementById('time_slider');
        var total_duration = $('#video_html5_api')[0].duration;
        var start_time = this.value;
        var start_percentage = (start_time/total_duration*100).toString();
        connectSlider.noUiSlider.set([start_percentage, null]);
    })

    $('#end_time').keyup(function(){
        var start_time = $('#start_time').val();
        var end_time = $('#end_time').val();
        if(end_time == ""){
            end_time = 0;
        }
        if(parseFloat(end_time) < parseFloat(start_time)){

        } else {
            setMarker();
            var connectSlider = document.getElementById('time_slider');
            var total_duration = $('#video_html5_api')[0].duration;
            var end_percentage = (end_time/total_duration*100).toString();
            connectSlider.noUiSlider.set([null, end_percentage]);
        }        
    })

    function setMarker(){
        var total_duration = $('#video_html5_api')[0].duration;
        var start_time = $('#start_time').val();
        var end_time = $('#end_time').val();
        
        if(start_time == ""){
            start_time = 0;
        }        
        if(start_time < 0){
            start_time = 0;
        }
        if(end_time > total_duration){
            end_time = total_duration;
        }
        //Place this statement after If statement
        player.currentTime(parseFloat(start_time));
        var width = ((end_time - start_time) / total_duration * 100).toString();
        
        var markers = player.markers.getMarkers();
        $('.vjs-marker').css('width', width+'%');
        
        markers[0].time = start_time;
        player.markers.updateTime();      
    }    

    var ComponentsNoUiSliders = function() {

        var time_slider = function() {

            var startInput = document.getElementById('start_time');
            var endInput = document.getElementById('end_time');
            var connectSlider = document.getElementById('time_slider');

            noUiSlider.create(connectSlider, {
                start: [0, 100],
                behaviour: 'drag',
                connect: true,
                range: {
                    'min': 0,
                    'max': 100
                }
            });

            var connectBar = document.createElement('div'),
                connectBase = connectSlider.getElementsByClassName('noUi-base')[0],
                connectHandles = connectSlider.getElementsByClassName('noUi-origin');

            connectBar.className += 'connect';
            connectBase.appendChild(connectBar);

            connectSlider.noUiSlider.on('update', function( values, handle ) {

                var total_duration = $('#video_html5_api')[0].duration;
                var roundedString = parseFloat(values[0]/100*total_duration).toFixed(1);
                var start_time = Number(roundedString);
                var roundedString = parseFloat(values[1]/100*total_duration).toFixed(1);
                var end_time = Number(roundedString);
                startInput.value = start_time;
                endInput.value = end_time;

                setMarker();

                var side = handle ? 'right' : 'left',
                    offset = (connectHandles[handle].style.left).slice(0, - 1);

                if ( handle === 1 ) {
                    offset = 100 - offset;
                }

                connectBar.style[side] = offset + '%';
            });            
        }


        return {

            init: function() {
                time_slider();

            }

        };

    }();

    ComponentsNoUiSliders.init();
});