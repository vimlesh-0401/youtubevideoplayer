import { Component, OnInit } from '@angular/core';
declare var YT: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'youtubeplayer';
  videoId = 'c5VaFyKhGs8';
  playerReady: boolean = false;
  player: any = null;
  ngOnInit() {
    setTimeout(() => {
      this.initPlayer();
    }, 1000)
  }

  getYoutbutVideoIdFromUrlOrCode(urlOrCode: string) {
    if (urlOrCode.indexOf('youtube.com') > -1) {
      return this.getYoutubeVideoId(urlOrCode);
    } else {
      return urlOrCode;
    }
  }

  getYoutubeVideoId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return 'error';
    }
  }

  initPlayer() {
    this.player = new YT.Player('youtubevideoplayer', {
      height: '390',
      width: '640',
      videoId: this.getYoutbutVideoIdFromUrlOrCode(this.videoId),
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        enablejsapi: 1,
        controls: 1,
        disablekb: 1,
        showsearch: 0,
        rel: 0,
        showInfo: 0,
        fs: 0,
        ecver: 0,
        playsinline: 1,
        origin: window.location.origin
      },
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this)
      }
    });
  }

  onPlayerReady(event: any) {
    this.playerReady = true;
  }

  onPlayerStateChange(event: any) {
    if (event.data === YT.PlayerState.PLAYING) {
      const time = event.target.getCurrentTime();
      console.log('Playing at ' + time);
    }
  }
  onPlayerError(event: any) {
    console.log('Error: ' + event.data);
  }

  playVideo() {
    if(this.player) {
      this.player.playVideo();
    }
  }

  pauseVideo() {
    if(this.player) {
      this.player.pauseVideo();
    }
  }
}
