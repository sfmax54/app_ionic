/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here */
      WikitudePlugin._sdkKey = "QwrJJBHLbWkhzzV5LKkCK0koWPTx4eh6alyIjlGoB13XE55iEABG5jPer2nei0aZSBB2yoTQsXzh+veMvOfRT7LnrSHluGspl70TS9uleyG22Dsy1o0LY7k4hAkuq6CjPG3E2KA8gFF1/UfbBc/Qb8Z+/liRcBzM0dG00EWWvtlTYWx0ZWRfX6JCG/kD2n79crEBZXftQK45wOWSxTI/Bb4NdPzgyZaZRrOWN3DQjRzl4SPNsVVOZtg2KQzyVYviNBn8nJWg77W4snJHoGG5YDHJPr8AKIBxWUILpC8QqkQ9358y+/7K2eclXndp9YgbN/A+w6+k+p6txNL2NCNVWLY/t05c12esPWIDFTJM+oFSYQKEQGa+Rxazd04la2ZMC7M5rWpodJ1thfEC1biL7LM+KI4I1UjVw/EEQ31uifKFyB6ZRoHQ/cIk6Zs97fIb/g8kVxmUHiHY7BgXuNEYY6lHRo3i6NLZ8ahYij4HiScbUyYcAf7q97yRQQENmW38vJOWFwqzjU/A2ZM4jzTi0ugGlKxzI6N1t8DL3lnnoDO0P+wYNK1BCxOAVuEXbGBSeQVI3oW84TJ8hspRLxF0PJlyl6PB8Bvq9p0DI0c7aH1XbWq1hdtS2IAmhyb0Wi10q3W6GrAts8AcIubWNz6HVszRdQm2BGSroVWB6MvaXCU=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking
      );

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works
       * through the function below for the direction Ionic2 app --> Wikitude SDK
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }

      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );
      */

    });
  }
}
