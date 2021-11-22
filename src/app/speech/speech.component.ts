import { Component, NgZone, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss'],
})
export class SpeechComponent implements OnInit {

  listenText;

  constructor(private speechRecognition: SpeechRecognition, public zone: NgZone) {
    this.speechRecognition.requestPermission().then(
      () => console.log('Granted'),
      () => console.log('Not Granted'),
    );
  }

  ngOnInit() {}

  listenToVoice() {
    let temp;
    this.speechRecognition.startListening()
    .subscribe(
      (matches: string[]) => {
        console.log(matches);
        temp = matches[0];
        this.zone.run(() => {
          this.listenText = matches[0];
        });

      },
      (onerror) => console.log('error:', onerror),
      () => {
        this.listenText = temp;
      }
    );
  }

}
