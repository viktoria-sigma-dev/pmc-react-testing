const maxClicks = 2;
const audioSrc = "https://cdn.pixabay.com/audio/2023/06/17/audio_c3c5d0cfad.mp3";
let audio = new Audio(audioSrc);

function playMusic() {
  audio.addEventListener('ended', () => {
    console.log("ended");
    audio = new Audio(audioSrc);
    audio.volume = 0;
    audio.play();
  });

  audio.volume = 0;
  audio.play();

  return audio;
}

function checkNecessarySlot() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mvsBorchagovka = document.querySelectorAll(".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive")[15];
      if (mvsBorchagovka.src !== 'https://eq.hsc.gov.ua/images/hsc_s.png') {
        console.log("Found borshagovka change", new Date())
      }

      const mvsLiviyBereg = document.querySelectorAll(".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive")[0];
      if (mvsLiviyBereg.src !== 'https://eq.hsc.gov.ua/images/hsc_s.png') {
        console.log("Found liviy bereg change", new Date())
      }

      const mvsMrii = document.querySelectorAll(".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive")[1];
      if (mvsMrii && mvsMrii.src !== 'https://eq.hsc.gov.ua/images/hsc_s.png') {
        resolve({ found: true });
      } else {
        resolve({ found: false });
      }
    }, 500);
  });
}

async function clickButton(source) {
  const button = source;
  if (button) {
    button.click();
  }
  const result = await checkNecessarySlot();
  if (result.found) {
    console.log("result is found");
    audio.pause();
    console.log("noiseAudio will play");
    const noiseAudio = new Audio('https://zvukipro.com/uploads/files/2019-07/1564471433_sound_04967.mp3');
    noiseAudio.volume = 1;
    noiseAudio.play();
    alert('Image source does not match the expected URL. Stopping the process.');
  }
  return result;
}

async function clickButtons() {
  let currentClick = 0;

  do {
    currentClick++;
    const res = await clickButton(document.querySelectorAll("#prev")[1]);
    if (res.found) {
      return;
    }
  } while (currentClick < maxClicks);

  currentClick = 0;

  do {
    currentClick++;
    const res = await clickButton(document.getElementById("prev"));
    if (res.found) {
      return;
    }
  } while (currentClick < maxClicks);

  await clickButtons();
}

playMusic();
clickButtons();
