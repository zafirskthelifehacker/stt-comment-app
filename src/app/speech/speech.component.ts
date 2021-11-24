import { Component, NgZone, OnInit } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MediaCapture } from '@ionic-native/media-capture/ngx';

declare const cordova: any;
const MEDIA_FILES_KEY = 'mediaFiles';
declare const webkitSpeechRecognition: any;

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss'],
})
export class SpeechComponent implements OnInit {
  
  listenText;
  
  // webRecognition = new webkitSpeechRecognition();
  // isStoppedWebSpeechRecog = false;
  // webText = '';
  // webTempWords;
  listening = false;
  options = {
    language: 'en-US',
    showPopup: false,
    showPartial: true
  };

  constructor(private speechRecognition: SpeechRecognition, private mediaCapture: MediaCapture, private storage: Storage,
    private media: Media, private platform: Platform, public zone: NgZone) {
  }

  ngOnInit() {
    //   this.webRecognition.interimResults = true;
    //   this.webRecognition.lang = 'en-US';
    //   this.webRecognition.addEventListener('result', (e) => {
    //     const transcript = Array.from(e.results)
    //       .map((result) => result[0])
    //       .map((result) => result.transcript)
    //       .join('');
    //     this.webTempWords = transcript;
    //     this.listenText = transcript;
    // });
  }

  requestPermission() {
    this.speechRecognition.requestPermission().then(
      () => console.log('Granted'),
      () => console.log('Not Granted'),
    );
  }

  // requestPermission() {
  //   const permissions: any = cordova.plugins.permissions;
  //   permissions.requestPermissions(
  //     [
  //       permissions.RECORD_AUDIO,
  //       permissions.MODIFY_AUDIO_SETTINGS
  //     ],
  //     (status) => console.log(status),
  //     (error) => console.log(error)
  //   );
  // }

  listenToVoice() {
    console.log('Speech Recognition Started');
    this.listening = true;
    let temp;
    this.speechRecognition.startListening(this.options)
    .subscribe(
      (matches: string[]) => {
        console.log(matches);
        temp = matches[0];
        this.zone.run(() => {
          this.listening = false;
          this.listenText = matches[0];
        });

      },
      (onerror) => console.log('error:', onerror),
      () => {
        this.listenText = temp;
      }
    );
  }

  stopListenToVoice() {
    this.zone.run(() => {
      this.listening = false;
    });
    this.speechRecognition.stopListening();
    console.log('Speech Recognition Ended');
  }

  // listenToVoice() {
  //   this.isStoppedWebSpeechRecog = false;
  //   this.listening = true;
  //   this.webRecognition.start();
  //   console.log('Speech Recognition Started');
  //   this.webRecognition.addEventListener('end', (condition) => {
  //     if (this.isStoppedWebSpeechRecog) {
  //       this.webRecognition.stop();
  //       console.log('End Speech Recognition');
  //     } else {
  //       this.webText = this.webText + ' ' + this.webTempWords + '.';
  //       this.webTempWords = '';
  //       this.webRecognition.start();
  //     }
  //   });
  // }

  // stopListenToVoice() {
  //   this.listening = false;
  //   this.isStoppedWebSpeechRecog = true;
  //   this.webText = this.webText + ' ' + this.webTempWords + '.';
  //   this.webTempWords = '';
  //   this.webRecognition.stop();
  //   console.log('End Speech Recognition');
  // }

}
