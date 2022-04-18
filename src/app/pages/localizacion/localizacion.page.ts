import { Component, OnInit } from '@angular/core';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { environment } from '../../../environments/environment';

declare var $: any;
//jquery declaration
// declare global {
//   interface JQuery {
//     mapael(map: any): JQuery;
//     // autocomplete(obj: any): JQuery;
//   }
// }

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.page.html',
  styleUrls: ['./localizacion.page.scss'],
})

export class LocalizacionPage implements OnInit {

  paises: any
  constructor(private readonly infoPersonalService: InfoPersonalService) { }

  async ngOnInit() {
    const terceroId = await this.infoPersonalService.getTerceroId()

    console.log('terceroId', terceroId)

    const paises = await this.infoPersonalService.getInfoComplementariaTercero(environment.API_ENDPOINT_UBICACIONES, 'lugar').toPromise();;
    // const paises = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_LUGAR_NACIMIENTO},TerceroId.Id:${terceroId}`).toPromise();
    // this.paises = JSON.parse(paises[0].Dato).Data
    this.paises = paises
    console.log(' this.paises ', this.paises)
    // (function ($) {
    /**
     * Initialize autocomplete
     *
     * For more info visit https://www.devbridge.com/sourcery/components/jquery-autocomplete/
     *
     * @param {String} input - identifier for the autocomplete element
     * @param {Array} source - array of objects containing the autocomplete source
     */
    function initAutoComplete(input, source) {
      $(input).autocomplete({
        lookup: source,
        showNoSuggestionNotice: true,
        autoSelectFirst: true,
        onSelect: onSelect,
        onSearchComplete: function () {
          var $input = $(this),
            width = $input.outerWidth(true);

          $(".autocomplete-suggestions").css("width", width + "px");
        }
      });
    }

    /**
     * Initialize map
     *
     * @param {String} mapContainer - identifier for the map container
     */
    function initMap(mapContainer, source) {
      var areas = {};

      for (var i = 0; i < source.length; i++) {
        areas[source[i].code] = {
          content: source[i]
        };
      }

      $(mapContainer).mapael({
        map: {
          name: "world_countries",
          // zoom: {
          //     enabled: true
          // },
          defaultArea: {
            attrs: {
              fill: "#bebebe",
              stroke: "#ccc"
            },
            attrsHover: {
              fill: "#e60000"
            },
            eventHandlers: {
              click: function (
                e,
                id,
                mapElem,
                textElem,
                elemOptions
              ) {
                if (typeof elemOptions.content !== "undefined") {
                  // console.log([e, id, mapElem, textElem, elemOptions])
                  onSelect(elemOptions.content);
                }
              }
            }
          },
          afterInit: function () {
            initAutoComplete("#searchInput", source);
          }
        },
        areas: areas
      });
    }

    /**
     * Update map
     *
     * For more info visit http://www.vincentbroute.fr/mapael/
     *
     * @param {String} mapContainer     - identifier for the map container
     * @param {Object} updateOptions    - object containing the new options for the plotted points
     * @param {Array}  newPlots         - object containing the new plotted points to draw on the map
     * @param {Object} deletedPlots     - array containing the plotted points keys to delete from the map
     * @param {Object} opts             - additionnal options
     */
    function updateMap(
      mapContainer,
      updatedOptions,
      newPlots,
      deletedPlots,
      opts
    ) {
      $(mapContainer).trigger("update", [
        updatedOptions,
        newPlots,
        deletedPlots,
        opts
      ]);
    }

    function onSelect(data) {
      console.log(data);
      var $priceContainer = $("#price"),
        $valueContainer = $("#value"),
        $unitContainer = $("#unit");

      $priceContainer.removeClass("hidden");
      $valueContainer.text(data.price);
      $unitContainer.text(data.unit);

      var updatedOpts = { areas: {} },
        opts = {
          animDuration: 500,
          resetAreas: true
        };

      updatedOpts.areas[data.code] = {
        attrs: {
          fill: "#e60000"
        },
        attrsHover: {
          fill: "#ab0707"
        }
      };

      updateMap("#mapContainer", updatedOpts, [], {}, opts);

      return false;
    }

    $(document).ready(async function () {

      var source = [
        {
          value: "Afghanistan",
          code: "AF",
          price: "10",
          unit: "Egresados",
          simulator: "1"
        },
        {
          value: "Albania",
          code: "AL",
          price: "15",
          unit: "Egresados",
          simulator: "1"
        },
        {
          value: "Algeria",
          code: "DZ",
          price: "15",
          unit: "Egresados",
          simulator: "1"
        },
        {
          value: "Andorra",
          code: "AD",
          price: "10",
          unit: "Egresados",
          simulator: "1"
        },
        {
          value: "Angola",
          code: "AO",
          price: "10",
          unit: "Egresados",
          simulator: "1"
        },
        {
          value: "Anguilla",
          code: "AI",
          price: "10",
          unit: "Egresados",
          simulator: "1"
        },
        {
          value: "Antarctica",
          code: "AQ",
          price: "28",
          unit: "QR / MIN",
          simulator: "0"
        }
      ];

      initMap("#mapContainer", source);
    });

  }

}
