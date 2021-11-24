import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LongPressModule } from 'ionic-long-press';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebSpeechRecognition } from './models/WebSpeechRecognition';
import { IonicGestureConfig } from './configs/IonicGestureConfig';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), HammerModule, LongPressModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig },
    SpeechRecognition, MediaCapture, Media, File, WebSpeechRecognition],
  bootstrap: [AppComponent],
})
export class AppModule {}
