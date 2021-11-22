import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listenText;

  constructor(private speechRecognition: SpeechRecognition) {
    this.speechRecognition.requestPermission().then(
      () => console.log('Granted'),
      () => console.log('Not Granted'),
    );
  }

  listenToVoice() {
    this.speechRecognition.startListening()
    .subscribe(
      (matches: string[]) => {
        console.log(matches);
        this.listenText = matches;
      },
      (onerror) => console.log('error:', onerror)
    );
  }

}
