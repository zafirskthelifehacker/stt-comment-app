import { Component, NgZone, OnInit } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

const MEDIA_FILES_KEY = 'mediaFiles';
declare const webkitSpeechRecognition: any;

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss'],
})
export class SpeechComponent implements OnInit {

  // mediaFiles = [];

  // isAudioRecording;
  // audio;
  // audioPath;

  listenText;

  webRecognition = new webkitSpeechRecognition();
  isStoppedWebSpeechRecog = false;
  webText = '';
  webTempWords;

  constructor(private speechRecognition: SpeechRecognition, private file: File, private storage: Storage,
    private media: Media, private platform: Platform, public zone: NgZone) {
  }

  ngOnInit() {
    // if (this.platform.is('cordova')) {
    //   this.storage.get(MEDIA_FILES_KEY).then(response => {
    //     // this.mediaFiles = JSON.parse(response) || [];
    //   });
    // } else {
      this.webRecognition.interimResults = true;
      this.webRecognition.lang = 'en-US';
      this.webRecognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');
        this.webTempWords = transcript;
        this.listenText = transcript;
    });
    // }
  }

  requestPermission() {
    this.speechRecognition.requestPermission().then(
      () => console.log('Granted'),
      () => console.log('Not Granted'),
    );
  }

  async listenToVoice() {
    // if (this.platform.is('cordova')) {
    //   // await this.captureAudio();
    //   this.speechRecognition.startListening()
    //   .subscribe(
    //     (matches: string[]) => {
    //       console.log(matches);
    //       this.zone.run(() => {
    //         this.listenText = matches[0];
    //       });
    //     },
    //     (onerror) => console.log('error:', onerror)
    //   );;
    //   // this.stopCaptureAudio();
    // } else {
      this.isStoppedWebSpeechRecog = false;
      this.webRecognition.start();
      console.log('Speech recognition started');
      this.webRecognition.addEventListener('end', (condition) => {
        if (this.isStoppedWebSpeechRecog) {
          this.webRecognition.stop();
          console.log('End speech recognition');
        } else {
          this.webText = this.webText + ' ' + this.webTempWords + '.';
          this.webTempWords = '';
          this.webRecognition.start();
        }
      });
    // }
  }

  async stopListenToVoice() {
    // if (this.platform.is('cordova')) {
    //   this.speechRecognition.stopListening();
    // } else {
      this.isStoppedWebSpeechRecog = true;
      this.webText = this.webText + ' ' + this.webTempWords + '.';
      this.webTempWords = '';
      this.webRecognition.stop();
      console.log('End speech recognition');
    // }
  }

  // async captureAudio() {
  //   try {
  //      let fileName =
  //         'stt_record_' +
  //         new Date().getDate() + '_' +
  //         new Date().getMonth() + '_' +
  //         new Date().getFullYear() + '_' +
  //         new Date().getHours() + '_' +
  //         new Date().getMinutes() + '_' +
  //         new Date().getSeconds();
  //      if (this.platform.is('ios')) {
  //         fileName = fileName + '.m4a';
  //         this.audioPath = this.file.documentsDirectory + fileName;
  //         this.audio = this.media.create(this.audioPath.replace(/file:\/\//g, ''));
  //      } else if (this.platform.is('android')) {
  //         fileName = fileName + '.mp3';
  //         this.audioPath = this.file.externalDataDirectory + fileName;
  //         this.audio = this.media.create(this.audioPath.replace(/file:\/\//g, ''));
  //      }
  //      this.audio.startRecord();
  //      this.isAudioRecording = true;
  //      console.log('Start Record');
  //   } catch (error) {
  //      console.log(error);
  //   }
  // }

  // stopCaptureAudio() {
  //   console.log('Stop Record');
  //   this.audio.stopRecord();
  //   this.isAudioRecording = false;
  // }

  // playAudio() {
  //   try {
  //      this.audio = this.media.create(this.audioPath);
  //      this.audio.play();
  //      this.audio.setVolume(0.8);
  //   } catch (error) {
  //      console.log(error);
  //   }
  // }

}
