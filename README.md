# Hello Techies
Recently, I happen to integrate youtube [iframe api](https://developers.google.com/youtube/iframe_api_reference) in angular application. Where we needed event callbacks from youtube videos. Regardless of frameworks this approach will work on all other javascript applications. So, Let start.

## First Thing First
Setup your application (Angular, Vue, Node, etc), add this code into your application.
In my case, I've added thin the index.html file (Inside <head></head> tag.

```
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Youtubeplayer</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <script src="https://www.youtube.com/iframe_api"></script>
  </head>
  <body>
    <app-root></app-root>
  </body>
  </html>
```

## Add A Container:

For YouTube Video player we need a container where iframe will be placed, YT player will find the container using id attribute.
```
  <div id="youtubevideoplayer"></div>
  <div class="card-container" *ngIf="playerReady">
    <button class="card card-small" (click)="playVideo()" tabindex="0">
      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1200 1200">
        <path d="M 600,1200 C 268.65,1200 0,931.35 0,600 0,268.65 268.65,0 600,0 c 331.35,0 600,268.65 600,600 0,331.35 -268.65,600 -600,600 z M 450,300.45 450,899.55 900,600 450,300.45 z"/>
      </svg>
      <span>Play</span>
    </button>

    <button class="card card-small" (click)="pauseVideo()" tabindex="0">
      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1200 1200">
        <path d="M 600,0 C 268.62914,0 0,268.62914 0,600 c 0,331.37086 268.62914,600 600,600 331.37086,0 600,-268.62914 600,-600 C 1200,268.62914 931.37086,0 600,0 z m -269.16515,289.38 181.71397,0 0,621.24 -181.71397,0 0,-621.24 z m 356.61633,0 181.71399,0 0,621.24 -181.71399,0 0,-621.24 z" />
      </svg>
      <span>Pause</span>
    </button>
  </div>
```

## Get Youtube Video Id:
If you have youtube video id then well and good otherwise use below methods to get Id from youtube embedded video.

```
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
```
## Time to initialise YT player.
```
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
```
Add Utility methods to get player status events

```
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
```
Finally add click events for play and pause video
```
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
```
And that's it!

## Happy Coding!