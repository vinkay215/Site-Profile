new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Masiu x Masew",
          artist: "Cưới Thôi",
          cover: "https://i.ytimg.com/vi/hW4z1dYE7No/maxresdefault.jpg",
          source: "https://github.com/nguyenquocvinhdzvcl/music/blob/master/cuithoi.mp3?raw=true",
          url: "https://www.youtube.com/watch?v=hW4z1dYE7No",
          favorited: false
        },
        {
          name: "Masew x Pháo",
          artist: "Điêu Toa",
          cover: "http://revelogue.com/wp-content/uploads/2021/07/masew-anh-dai-dien.jpg",
          source: "https://github.com/nguyenquocvinhdzvcl/music/blob/master/dueutoa.mp3?raw=true",
          url: "https://www.youtube.com/watch?v=KabeMVHgRLQ",
          favorited: true
        },
        {
          name: "MASEW x PHÚC DU x PHÁO x ĐỘ MIXI",
          artist: "ĐỘ TỘC 2",
          cover: "https://i.ytimg.com/vi/Jk38OqdAQxc/maxresdefault.jpg",
          source: "https://github.com/nguyenquocvinhdzvcl/music/blob/master/dotoc2.mp3?raw=true",
          url: "https://www.youtube.com/watch?v=Jk38OqdAQxc",
          favorited: false
        },
        {
          name: "LONG NÓN LÁ X MASEW",
          artist: "ÉP DUYÊN",
          cover: "https://ss-images.saostar.vn/wp700/2018/01/29/2138270/pv-masew-3.jpg",
          source: "https://github.com/nguyenquocvinhdzvcl/music/blob/master/epduyen.mp3?raw=true",
          url: "https://www.youtube.com/watch?v=VhJY7gOpPyU",
          favorited: false
        },
        {
          name: "Masew x Masiu",
          artist: "TÌNH BẠN DIỆU KỲ - Beat Remix",
          cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE8QqTdflpv95efj-_RkTPNkngYcDjfU1LKA&usqp=CAU",
          source: "https://github.com/nguyenquocvinhdzvcl/music/blob/master/tbdk.mp3?raw=true",
          url: "https://www.youtube.com/watch?v=WwqwJAZTI4k",
          favorited: true
        },
        {
          name: "Masiu x Masew",
          artist: "Phố Đã Lên Đèn - Beat Remix",
          cover: "https://event.mediacdn.vn/2020/9/9/masew-p-15996441090381084180737.png",
          source: "https://github.com/nguyenquocvinhdzvcl/music/blob/master/phodalenden.mp3?raw=true",
          url: "https://www.youtube.com/watch?v=mUtf_duwvUI",
          favorited: false
        },
        {
          name: "Masew x Khoi Vu",
          artist: "Nhất Thân",
          cover: "https://yt3.ggpht.com/ytc/AKedOLSh07kp6wVBHJcE9FsHUUO2SpxdJrEG41nThlvp0w=s900-c-k-c0x00ffffff-no-rj",
          source: "https://github.com/nguyenquocvinhdzvcl/music/blob/master/thatthan.mp3?raw=true",
          url: "https://www.youtube.com/watch?v=lxzOIev1Pec",
          favorited: true
        },
        {
          name: "B Ray X Masew",
          artist: "Dư Tiền",
          cover: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/10/29/a/a/d/4/1572318457703_600.jpg",
          source: "https://github.com/nguyenquocvinhdzvcl/music/blob/master/dutien.mp3?raw=true",
          url: "https://www.youtube.com/watch?v=Rz2pVLYWQDI",
          favorited: false
        },
        {
          name: "Alma Zarza - Pedrocapo",
          artist: "Tutu",
          cover: "https://i.ytimg.com/vi/NcfRB2GdnRY/maxresdefault.jpg",
          source: "https://github.com/nguyenquocvinhdzvcl/music/blob/master/tutu.mp3?raw=true",
          url: "https://www.youtube.com/watch?v=MjM3EHkuIaE",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});