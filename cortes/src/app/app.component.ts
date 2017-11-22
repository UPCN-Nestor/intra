import { Component, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { HeaderModule } from 'upcn-header-lib';

declare var BpTspSolver:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  options: any;
  
  tsp: any;
  order: any;
  dirs: any;

  numDir: number;

  @ViewChild("gmap") map: google.maps.Map;
  @ViewChild("directions") dir: any;

  overlays: any[];
  
  ngOnInit() {
      this.options = {
          center: {lat: -38.5545, lng: -58.7396},
          zoom: 13
      };

      this.numDir = 0;

      var startTime:any = new Date();

      this.tsp = new BpTspSolver(this.map, this.dir);
      this.tsp.setAvoidHighways(true);
      this.tsp.setTravelMode(google.maps.TravelMode.DRIVING);

      this.tsp.addAddress("65 2230 Necochea", ()=> {});
      this.tsp.addAddress("65 2630 Necochea", ()=> {});
      this.tsp.addAddress("65 2930 Necochea", ()=> {});
      this.tsp.addAddress("65 2030 Necochea", ()=> {});
      this.tsp.addAddress("65 3030 Necochea", ()=> {});
      this.tsp.addAddress("65 1830 Necochea", ()=> {});
      this.tsp.addAddress("65 1730 Necochea", ()=> {});
      this.tsp.addAddress("65 1930 Necochea", ()=> {});

      this.tsp.addAddress("63 2230 Necochea", ()=> {});
      this.tsp.addAddress("63 2630 Necochea", ()=> {});
      this.tsp.addAddress("63 2930 Necochea", ()=> {});
      this.tsp.addAddress("63 2030 Necochea", ()=> {});
      this.tsp.addAddress("63 3030 Necochea", ()=> {});
      this.tsp.addAddress("63 1830 Necochea", ()=> {});
      this.tsp.addAddress("63 1730 Necochea", ()=> {});
      this.tsp.addAddress("63 1930 Necochea", ()=> {});
     
      this.tsp.addAddress("59 2230 Necochea", ()=> {});
      this.tsp.addAddress("59 2630 Necochea", ()=> {});
      this.tsp.addAddress("59 2930 Necochea", ()=> {});
      this.tsp.addAddress("59 2030 Necochea", ()=> {});
      this.tsp.addAddress("59 3030 Necochea", ()=> {});
      this.tsp.addAddress("59 1830 Necochea", ()=> {});
      this.tsp.addAddress("59 1730 Necochea", ()=> {});
      this.tsp.addAddress("59 1930 Necochea", ()=> {});

      this.tsp.addAddress("75 2230 Necochea", ()=> {});
      this.tsp.addAddress("75 2630 Necochea", ()=> {});
      this.tsp.addAddress("75 2930 Necochea", ()=> {});
      this.tsp.addAddress("75 2030 Necochea", ()=> {});
      this.tsp.addAddress("75 3030 Necochea", ()=> {});
      this.tsp.addAddress("75 1830 Necochea", ()=> {});
      this.tsp.addAddress("75 1730 Necochea", ()=> {});
      this.tsp.addAddress("75 1930 Necochea", ()=> {});

      this.tsp.addAddress("79 2230 Necochea", ()=> {});
      this.tsp.addAddress("79 2630 Necochea", ()=> {});
      this.tsp.addAddress("79 2930 Necochea", ()=> {});
      this.tsp.addAddress("79 2030 Necochea", ()=> {});
      this.tsp.addAddress("79 3030 Necochea", ()=> {});
      this.tsp.addAddress("79 1830 Necochea", ()=> {});
      this.tsp.addAddress("79 1730 Necochea", ()=> {});
      this.tsp.addAddress("79 1930 Necochea", ()=> {});

      this.tsp.addAddress("61 2230 Necochea", ()=> {});
      this.tsp.addAddress("61 2630 Necochea", ()=> {});
      this.tsp.addAddress("61 2930 Necochea", ()=> {});
      this.tsp.addAddress("61 2030 Necochea", ()=> {});
      this.tsp.addAddress("61 3030 Necochea", ()=> {});
      this.tsp.addAddress("61 1830 Necochea", ()=> {});
      this.tsp.addAddress("61 1730 Necochea", ()=> {});
      this.tsp.addAddress("61 1930 Necochea", ()=> {});

      this.tsp.addAddress("77 2230 Necochea", ()=> {});
      this.tsp.addAddress("77 2630 Necochea", ()=> {});
      this.tsp.addAddress("77 2930 Necochea", ()=> {});
      this.tsp.addAddress("77 2030 Necochea", ()=> {});
      this.tsp.addAddress("77 3030 Necochea", ()=> {});
      this.tsp.addAddress("77 1830 Necochea", ()=> {});
      this.tsp.addAddress("77 1730 Necochea", ()=> {});
      this.tsp.addAddress("77 1930 Necochea", ()=> {});

      this.tsp.addAddress("57 2230 Necochea", ()=> {});
      this.tsp.addAddress("57 2630 Necochea", ()=> {});
      this.tsp.addAddress("57 2930 Necochea", ()=> {});
      this.tsp.addAddress("57 2030 Necochea", ()=> {});
      this.tsp.addAddress("57 3030 Necochea", ()=> {});
      this.tsp.addAddress("57 1830 Necochea", ()=> {});
      this.tsp.addAddress("57 1730 Necochea", ()=> {});
      this.tsp.addAddress("57 1930 Necochea", ()=> {});

      this.tsp.addAddress("77 1230 Necochea", ()=> {});
      this.tsp.addAddress("77 1630 Necochea", ()=> {});
      this.tsp.addAddress("77 1930 Necochea", ()=> {});
      this.tsp.addAddress("77 1030 Necochea", ()=> {});
      this.tsp.addAddress("77 3230 Necochea", ()=> {});
      this.tsp.addAddress("77 830 Necochea", ()=> {});
      this.tsp.addAddress("77 730 Necochea", ()=> {});
      this.tsp.addAddress("77 930 Necochea", ()=> {});
/*
      this.tsp.addAddress("67 1230 Necochea", ()=> {});
      this.tsp.addAddress("67 1630 Necochea", ()=> {});
      this.tsp.addAddress("67 1930 Necochea", ()=> {});
      this.tsp.addAddress("67 1030 Necochea", ()=> {});
      this.tsp.addAddress("67 3230 Necochea", ()=> {});
      this.tsp.addAddress("67 830 Necochea", ()=> {});
      this.tsp.addAddress("67 730 Necochea", ()=> {});
      this.tsp.addAddress("67 930 Necochea", ()=> {});

      this.tsp.addAddress("71 1230 Necochea", ()=> {});
      this.tsp.addAddress("71 1630 Necochea", ()=> {});
      this.tsp.addAddress("71 1930 Necochea", ()=> {});
      this.tsp.addAddress("71 1030 Necochea", ()=> {});
      this.tsp.addAddress("71 3230 Necochea", ()=> {});
      this.tsp.addAddress("71 830 Necochea", ()=> {});
      this.tsp.addAddress("71 730 Necochea", ()=> {});
      this.tsp.addAddress("71 930 Necochea", ()=> {});

      this.tsp.addAddress("83 1230 Necochea", ()=> {});
      this.tsp.addAddress("83 1630 Necochea", ()=> {});
      this.tsp.addAddress("83 1930 Necochea", ()=> {});
      this.tsp.addAddress("83 1030 Necochea", ()=> {});
      this.tsp.addAddress("83 3230 Necochea", ()=> {});
      this.tsp.addAddress("83 830 Necochea", ()=> {});
      this.tsp.addAddress("83 730 Necochea", ()=> {});
      this.tsp.addAddress("83 930 Necochea", ()=> {});
*/
      //this.tsp.setOnProgressCallback(this.progress);

      this.tsp.solveRoundTrip( ()=> {
        var dirRes = this.tsp.getGDirections();
        var dir = dirRes.routes[0];

        var dirRenderer = new google.maps.DirectionsRenderer({
          directions: dirRes,
          hideRouteList: true,
          map: this.map,
          panel: null,
          preserveViewport: false,
          suppressInfoWindows: true,
          suppressMarkers: true });

        var labels = this.tsp.getAddresses();
        var order = this.tsp.getOrder();

        
        var bestPathLabelStr="";
        for (var i = 0; i < dir.legs.length; ++i) {
          if (labels[order[i+1]] == null) {
            bestPathLabelStr += order[i+1];
          } else {
            bestPathLabelStr += labels[order[i+1]];
          }
          bestPathLabelStr += "\n";
        }

        document.getElementById("dirData").innerHTML = 
          "<textarea id='dirOutputList' rows='10' cols='100'>" 
          + bestPathLabelStr + "</textarea><br>";

        // Raw path output
        var bestPathLatLngStr = dir.legs[0].start_location.toString() + "\n";
        for (var i = 0; i < dir.legs.length; ++i) {
          bestPathLatLngStr += dir.legs[i].end_location.toString() + "\n";
            }
        document.getElementById("exportData").innerHTML = 
          "<textarea id='outputList' rows='10' cols='100'>" 
          + bestPathLatLngStr + "</textarea><br>";

        var endTime:any = new Date();
        var timeDiff = endTime - startTime;
        timeDiff /= 1000;
        alert(timeDiff);

      });     

      //tsp.solveAtoZ(onSolveCallback);  
  }

  progress(tsp) {
    //alert(tsp.getNumDirectionsComputed());    
  }

}
