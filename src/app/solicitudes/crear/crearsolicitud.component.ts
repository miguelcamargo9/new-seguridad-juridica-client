// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { FormBuilder } from "@angular/forms";
import { DomainService } from "src/app/domains/domain.service";
import { Departament } from "src/app/models/Deparamento";
import { Municipio } from "src/app/models/Municipio";
import { Domain } from "../../domains/domain.model";
import { Persona } from "src/app/models/Persona";

declare const $: any;
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: EventTarget;
  getMessage(): string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: "app-crearsolicitud-cmp",
  templateUrl: "crearsolicitud.component.html"
})
export class CrearSolicitudComponent implements OnInit, OnChanges, AfterViewInit {
  departamentos: Departament[];
  municipios: Municipio[];
  tiposCondicionSolicitante: Domain[];
  tiposPruebaUnion: Domain[];
  tiposSexos: Domain[];
  tiposDocumento: Domain[];

  personas: Persona[] = [new Persona()];

  matcher = new MyErrorStateMatcher();
  type: FormGroup;

  constructor(private formBuilder: FormBuilder, private domainServcie: DomainService) {}

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      "has-error": this.isFieldValid(form, field),
      "has-feedback": this.isFieldValid(form, field)
    };
  }
  ngOnInit() {
    this.getDomains();
    const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");

    this.type = this.formBuilder.group({
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      expedienteSIT: [
        null,
        [Validators.required, Validators.minLength(19), Validators.maxLength(19)]
      ],
      fiso: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      departamento: [null, [Validators.required]],
      departamentoDane: [{ value: null, disabled: true }, [Validators.required]],
      municipio: [null, [Validators.required]],
      municipioDane: [{ value: null, disabled: true }, [Validators.required]],
      corregimiento: [null],
      vereda: [null],
      condicionSolicitante: [null, [Validators.required]],
      pruebaUnion: [null, [Validators.required]],
      primerNombreSolicitante: [null, [Validators.required]],
      segundoNombreSolicitante: [null],
      primerApellidoSolicitante: [null, [Validators.required]],
      segundoApellidoSolicitante: [null],
      sexo: [null, [Validators.required]],
      tipoDocumento: [null, [Validators.required]],
      documento: [null, [Validators.required]],
      nombrePredio: [null, [Validators.required]],
      folioMatricula: [null, [Validators.required]],
      numeroPredial: [null],
      predioMayorExtension: [null, [Validators.required]],
      nombrePredioMayor: [null],
      areaSolicitada: [null, [Validators.required]]
    });
    this.populateForm();
    // Code for the Validator
    const $validator = $(".card-wizard form").validate({
      rules: {
        expedienteSIT: {
          required: true,
          minlength: 19,
          maxlength: 19
        },
        // fiso: {
        //   required: true,
        //   minlength: 7
        // },
        departamento: {
          required: true
        }
        // departamentoDane: {
        //   required: true
        // },
        // municipio: {
        //   required: true
        // },
        // municipioDane: {
        //   required: true
        // }
      },

      highlight: function(element) {
        $(element)
          .closest(".form-group")
          .removeClass("has-success")
          .addClass("has-danger");
      },
      success: function(element) {
        $(element)
          .closest(".form-group")
          .removeClass("has-danger")
          .addClass("has-success");
      },
      errorPlacement: function(error, element) {
        $(element).append(error);
      }
    });

    // Wizard Initialization
    $(".card-wizard").bootstrapWizard({
      tabClass: "nav nav-pills",
      nextSelector: ".btn-next",
      previousSelector: ".btn-previous",

      onNext: function(tab, navigation, index) {
        var $valid = $(".card-wizard form").valid();
        console.log("NOOOOOO", $(".card-wizard form"));
        if (!$valid) {
          $validator.focusInvalid();
          return false;
        }
      },

      onInit: function(tab: any, navigation: any, index: any) {
        // check number of tabs and fill the entire row
        let $total = navigation.find("li").length;
        let $wizard = navigation.closest(".card-wizard");

        let $first_li = navigation.find("li:first-child a").html();
        let $moving_div = $('<div class="moving-tab">' + $first_li + "</div>");
        $(".card-wizard .wizard-navigation").append($moving_div);

        $total = $wizard.find(".nav li").length;
        let $li_width = 100 / $total;

        let total_steps = $wizard.find(".nav li").length;
        let move_distance = $wizard.width() / total_steps;
        let index_temp = index;
        let vertical_level = 0;

        let mobile_device = $(document).width() < 600 && $total > 3;

        if (mobile_device) {
          move_distance = $wizard.width() / 2;
          index_temp = index % 2;
          $li_width = 50;
        }

        $wizard.find(".nav li").css("width", $li_width + "%");

        let step_width = move_distance;
        move_distance = move_distance * index_temp;

        let $current = index + 1;

        if ($current == 1 || (mobile_device == true && index % 2 == 0)) {
          move_distance -= 8;
        } else if ($current == total_steps || (mobile_device == true && index % 2 == 1)) {
          move_distance += 8;
        }

        if (mobile_device) {
          let x: any = index / 2;
          vertical_level = parseInt(x);
          vertical_level = vertical_level * 38;
        }

        $wizard.find(".moving-tab").css("width", step_width);
        $(".moving-tab").css({
          transform: "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
          transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
        });
        $(".moving-tab").css("transition", "transform 0s");
      },

      onTabClick: function(tab: any, navigation: any, index: any) {
        const $valid = $(".card-wizard form").valid();

        if (!$valid) {
          return false;
        } else {
          return true;
        }
      },

      onTabShow: function(tab: any, navigation: any, index: any) {
        let $total = navigation.find("li").length;
        let $current = index + 1;
        elemMainPanel.scrollTop = 0;
        const $wizard = navigation.closest(".card-wizard");

        // If it's the last tab then hide the last button and show the finish instead
        if ($current >= $total) {
          $($wizard)
            .find(".btn-next")
            .hide();
          $($wizard)
            .find(".btn-finish")
            .show();
        } else {
          $($wizard)
            .find(".btn-next")
            .show();
          $($wizard)
            .find(".btn-finish")
            .hide();
        }

        const button_text = navigation.find("li:nth-child(" + $current + ") a").html();

        setTimeout(function() {
          $(".moving-tab").text(button_text);
        }, 150);

        const checkbox = $(".footer-checkbox");

        if (index !== 0) {
          $(checkbox).css({
            opacity: "0",
            visibility: "hidden",
            position: "absolute"
          });
        } else {
          $(checkbox).css({
            opacity: "1",
            visibility: "visible"
          });
        }
        $total = $wizard.find(".nav li").length;
        let $li_width = 100 / $total;

        let total_steps = $wizard.find(".nav li").length;
        let move_distance = $wizard.width() / total_steps;
        let index_temp = index;
        let vertical_level = 0;

        let mobile_device = $(document).width() < 600 && $total > 3;

        if (mobile_device) {
          move_distance = $wizard.width() / 2;
          index_temp = index % 2;
          $li_width = 50;
        }

        $wizard.find(".nav li").css("width", $li_width + "%");

        let step_width = move_distance;
        move_distance = move_distance * index_temp;

        $current = index + 1;

        if ($current == 1 || (mobile_device == true && index % 2 == 0)) {
          move_distance -= 8;
        } else if ($current == total_steps || (mobile_device == true && index % 2 == 1)) {
          move_distance += 8;
        }

        if (mobile_device) {
          let x: any = index / 2;
          vertical_level = parseInt(x);
          vertical_level = vertical_level * 38;
        }

        $wizard.find(".moving-tab").css("width", step_width);
        $(".moving-tab").css({
          transform: "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
          transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
        });
      }
    });

    // Prepare the preview for profile picture
    $("#wizard-picture").change(function() {
      const input = $(this);

      if (input[0].files && input[0].files[0]) {
        const reader = new FileReader();

        reader.onload = function(e: any) {
          $("#wizardPicturePreview")
            .attr("src", e.target.result)
            .fadeIn("slow");
        };
        reader.readAsDataURL(input[0].files[0]);
      }
    });

    $('[data-toggle="wizard-radio"]').click(function() {
      const wizard = $(this).closest(".card-wizard");
      wizard.find('[data-toggle="wizard-radio"]').removeClass("active");
      $(this).addClass("active");
      $(wizard)
        .find('[type="radio"]')
        .removeAttr("checked");
      $(this)
        .find('[type="radio"]')
        .attr("checked", "true");
    });

    $('[data-toggle="wizard-checkbox"]').click(function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this)
          .find('[type="checkbox"]')
          .removeAttr("checked");
      } else {
        $(this).addClass("active");
        $(this)
          .find('[type="checkbox"]')
          .attr("checked", "true");
      }
    });

    $(".set-full-height").css("height", "auto");
  }

  ngOnChanges(changes: SimpleChanges) {
    const input = $(this);

    if (input[0].files && input[0].files[0]) {
      const reader: any = new FileReader();

      reader.onload = function(e: any) {
        $("#wizardPicturePreview")
          .attr("src", e.target.result)
          .fadeIn("slow");
      };
      reader.readAsDataURL(input[0].files[0]);
    }
  }
  ngAfterViewInit() {
    $(window).resize(() => {
      $(".card-wizard").each(function() {
        setTimeout(() => {
          const $wizard = $(this);
          const index = $wizard.bootstrapWizard("currentIndex");
          let $total = $wizard.find(".nav li").length;
          let $li_width = 100 / $total;

          let total_steps = $wizard.find(".nav li").length;
          let move_distance = $wizard.width() / total_steps;
          let index_temp = index;
          let vertical_level = 0;

          let mobile_device = $(document).width() < 600 && $total > 3;
          if (mobile_device) {
            move_distance = $wizard.width() / 2;
            index_temp = index % 2;
            $li_width = 50;
          }

          $wizard.find(".nav li").css("width", $li_width + "%");

          let step_width = move_distance;
          move_distance = move_distance * index_temp;

          let $current = index + 1;

          if ($current == 1 || (mobile_device == true && index % 2 == 0)) {
            move_distance -= 8;
          } else if ($current == total_steps || (mobile_device == true && index % 2 == 1)) {
            move_distance += 8;
          }

          if (mobile_device) {
            let x: any = index / 2;
            vertical_level = parseInt(x);
            vertical_level = vertical_level * 38;
          }

          $wizard.find(".moving-tab").css("width", step_width);
          $(".moving-tab").css({
            transform: "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
            transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
          });

          $(".moving-tab").css({
            transition: "transform 0s"
          });
        }, 500);
      });
    });
  }
  selectDepartmento(event) {
    const selectDepartamento = this.departamentos.find(
      departamento => departamento.id === event.value
    );
    this.type.controls["departamentoDane"].setValue(selectDepartamento.dane);
    this.domainServcie.getMunicipiosPorDepartamento(selectDepartamento.id).subscribe(
      municipiosData => {
        this.municipios = municipiosData;
      },
      error => {
        console.log("There was an error while retrieving Municipios!" + error);
      }
    );
  }
  selectMunicipio(event) {
    const selectMunicipio = this.municipios.find(municipio => municipio.id === event.value);
    this.type.controls["municipioDane"].setValue(selectMunicipio.dane);
  }
  getDomains() {
    this.domainServcie.getDepartamentos().subscribe(
      departamentosData => {
        this.departamentos = departamentosData;
      },
      error => {
        console.log("There was an error while retrieving Departamentos!" + error);
      }
    );
    this.domainServcie.getTipoCondicionSolicitante().subscribe(
      tiposCondicionSolicitanteData => {
        this.tiposCondicionSolicitante = tiposCondicionSolicitanteData;
      },
      error => {
        console.log("There was an error while retrieving Departamentos!" + error);
      }
    );
    this.domainServcie.getTipoSexo().subscribe(
      tiposSexosData => {
        this.tiposSexos = tiposSexosData;
      },
      error => {
        console.log("There was an error while retrieving Departamentos!" + error);
      }
    );
    this.domainServcie.getTipoDocumento().subscribe(
      tiposDocumentosData => {
        this.tiposDocumento = tiposDocumentosData;
      },
      error => {
        console.log("There was an error while retrieving Departamentos!" + error);
      }
    );
  }
  addPersona() {
    const persona = new Persona();
    this.personas.splice(-1, 0, persona);
    this.populateForm();
  }
  deletePersona() {
    const lastPosition = this.personas.length - 1;
    this.unPopulateForm(lastPosition);
    this.personas.pop();
  }
  populateForm() {
    this.personas.forEach((persona, key) => {
      this.type.addControl(`primerNombreOtroSolicitante${key}`, new FormControl());
      this.type.addControl(`segundoNombreOtroSolicitante${key}`, new FormControl());
      this.type.addControl(`primerApellidoOtroSolicitante${key}`, new FormControl());
      this.type.addControl(`segundoApellidoOtroSolicitante${key}`, new FormControl());
      this.type.addControl(`sexoOtro${key}`, new FormControl());
      this.type.addControl(`tipoDocumentoOtro${key}`, new FormControl());
      this.type.addControl(`documentoOtro${key}`, new FormControl());
    });
    console.log(this.type.controls);
  }
  unPopulateForm(lastPosition: number) {
    this.type.removeControl(`primerNombreOtroSolicitante${lastPosition}`);
    this.type.removeControl(`segundoNombreOtroSolicitante${lastPosition}`);
    this.type.removeControl(`primerApellidoOtroSolicitante${lastPosition}`);
    this.type.removeControl(`segundoApellidoOtroSolicitante${lastPosition}`);
    this.type.removeControl(`sexoOtro${lastPosition}`);
    this.type.removeControl(`tipoDocumentoOtro${lastPosition}`);
    this.type.removeControl(`documentoOtro${lastPosition}`);
    console.log(this.type.controls);
  }
}
