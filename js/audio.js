// Sounds
var bgSound = document.getElementById('bg_sound');
document.getElementById('bg_sound_mute').addEventListener('click', function (e) {
    e = e || window.event;
    bgSound.muted = !bgSound.muted;
    e.preventDefault();
}, false);

$('.bg-sound-on').click(function () {
    $(this).toggleClass('bg-sound-off');
});

