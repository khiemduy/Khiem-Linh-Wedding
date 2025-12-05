// Basic script to wire config and simple features
document.addEventListener('DOMContentLoaded',function(){
  const info = typeof weddingInfo !== 'undefined' ? weddingInfo : {};
  // names and date
  document.getElementById('names').textContent = (info.groom || 'Groom') + ' & ' + (info.bride || 'Bride');
  document.getElementById('date').textContent = info.date || '';
  document.getElementById('place').textContent = info.place || '';

  // hero image
  const heroImg = document.getElementById('heroImg');
  if(info.heroImage) heroImg.src = info.heroImage;

  // story
  if(info.story) document.getElementById('story').textContent = info.story;

  // create gallery thumbnails from albumFolder listing pattern
  const gallery = document.getElementById('gallery');
  if(info.album && info.album.length){
    info.album.forEach(src=>{
      const img = document.createElement('img');
      img.src = src;
      gallery.appendChild(img);
    });
  } else {
    // placeholder images
    for(let i=1;i<=4;i++){
      const img = document.createElement('img');
      img.src = 'assets/images/placeholder-' + i + '.jpg';
      gallery.appendChild(img);
    }
  }

  // Countdown
  function updateCountdown(){
    if(!info.date) return;
    const target = new Date(info.date);
    const now = new Date();
    const diff = target - now;
    if(diff<=0){ document.getElementById('countdown').textContent = 'Today!'; return; }
    const days = Math.floor(diff/86400000);
    const hrs = Math.floor((diff%86400000)/3600000);
    const mins = Math.floor((diff%3600000)/60000);
    const secs = Math.floor((diff%60000)/1000);
    document.getElementById('countdown').textContent = days+'d '+hrs+'h '+mins+'m '+secs+'s';
  }
  updateCountdown();
  setInterval(updateCountdown,1000);

  // Music control (if audio provided in config)
  let audio;
  if(info.music){
    audio = new Audio(info.music);
    audio.loop = true;
  }
  const playBtn = document.getElementById('playBtn');
  playBtn.addEventListener('click', function(){
    if(!audio) return alert('No music configured. Put file path in data/config.js');
    if(audio.paused){ audio.play(); playBtn.textContent = '⏸ Pause Music'; }
    else { audio.pause(); playBtn.textContent = '▶︎ Play Music'; }
  });

  // Simple RSVP handler (local)
  const form = document.getElementById('rsvpForm');
  const result = document.getElementById('rsvpResult');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('guestName').value;
    const qty = document.getElementById('guestQty').value;
    result.textContent = `Cảm ơn ${name}. Đã ghi nhận ${qty} khách mời.`;
    form.reset();
  });

});
