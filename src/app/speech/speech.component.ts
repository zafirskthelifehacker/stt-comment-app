import { Component, NgZone, OnInit } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss'],
})
export class SpeechComponent implements OnInit {

  mediaFiles = [];

  isAudioRecording;
  audio;
  audioPath;

  listenText;

  constructor(private speechRecognition: SpeechRecognition, private file: File, private storage: Storage,
    private media: Media, private platform: Platform, public zone: NgZone) {
  }

  ngOnInit() {
    this.storage.get(MEDIA_FILES_KEY).then(response => {
      this.mediaFiles = JSON.parse(response) || [];
    });
  }

  requestPermission() {
    this.speechRecognition.requestPermission().then(
      () => console.log('Granted'),
      () => console.log('Not Granted'),
    );
  }

  async listenToVoice() {
    await this.speechRecognition.startListening()
    .subscribe(
      (matches: string[]) => {
        // this.captureAudio();
        console.log(matches);
        this.zone.run(() => {
          this.listenText = matches[0];
        });
      },
      (onerror) => console.log('error:', onerror)
    );;
    // this.stopCaptureAudio();
  }

  async stopListenToVoice() {
    this.speechRecognition.stopListening();
  }

  captureAudio() {
    try {
       let fileName =
          'stt_record_' +
          new Date().getDate() + '_' +
          new Date().getMonth() + '_' +
          new Date().getFullYear() + '_' +
          new Date().getHours() + '_' +
          new Date().getMinutes() + '_' +
          new Date().getSeconds();
       if (this.platform.is('ios')) {
          fileName = fileName + '.m4a';
          this.audioPath = this.file.documentsDirectory + fileName;
          this.audio = this.media.create(this.audioPath.replace(/file:\/\//g, ''));
       } else if (this.platform.is('android')) {
          fileName = fileName + '.mp3';
          this.audioPath = this.file.externalDataDirectory + fileName;
          this.audio = this.media.create(this.audioPath.replace(/file:\/\//g, ''));
       }
       this.audio.startRecord();
       this.isAudioRecording = true;
       console.log('ZAFIR');
    } catch (error) {
       console.log(error);
    }
  }

  stopCaptureAudio() {
    console.log('ZAFIR2');
    this.audio.stopRecord();
    this.isAudioRecording = false;
  }

  playAudio() {
    try {
       this.audio = this.media.create(this.audioPath);
       this.audio.play();
       this.audio.setVolume(0.8);
    } catch (error) {
       console.log(error);
    }
  }

}
