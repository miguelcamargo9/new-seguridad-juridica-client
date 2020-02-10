// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  SimpleChanges
} from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { Seguimiento902Service } from "../seguimiento902.service";
import { DomainService } from "src/app/domains/domain.service";
import { Domain } from "src/app/domains/domain.model";
import { DomainBoolean } from "../DomainBoolean.model";

declare const $: any;
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: EventTarget;
  getMessage(): string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-crearseguimiento902-cmp",
  templateUrl: "crearseguimiento902.component.html"
})
export class CrearSeguimiento902Component
  implements OnInit, OnChanges, AfterViewInit {
  cities = [
    { value: "paris-0", viewValue: "Paris" },
    { value: "miami-1", viewValue: "Miami" },
    { value: "bucharest-2", viewValue: "Bucharest" },
    { value: "new-york-3", viewValue: "New York" },
    { value: "london-4", viewValue: "London" },
    { value: "barcelona-5", viewValue: "Barcelona" },
    { value: "moscow-6", viewValue: "Moscow" }
  ];
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  routeSub: Subscription;
  solicitudId: Number;
  tipoSiNo: DomainBoolean[];
  tipoEstadoInformeTecnicoJuridico: Domain[];
  tipoSoporteValoracion: Domain[];
  tipoPruebaAportada: Domain[];
  tipoRuta: Domain[];
  tipoTieneViabilidadJuridica: Domain[];
  tipoDeNoViabilidad: Domain[];
  tipoMedidaDeProteccionUrt: Domain[];
  tipoMedidaCautelar: Domain[];
  tipoDeActo: Domain[];
  tipoDecisionDeCierre: Domain[];
  tipoRecurso: Domain[];
  tipoEstadoSinegia: Domain[];


  userList: Domain[];

  matcher = new MyErrorStateMatcher();

  createSeguimiento902: FormGroup;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private seguimiento902Service: Seguimiento902Service,
    private domainService: DomainService) {
    this.tipoSiNo = [new DomainBoolean(false, "No"), new DomainBoolean(true, "Si")];
    this.userList = [new Domain(1, "Juan!")];
  }

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
    const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");
    this.getDomains();
    this.initForm();
    console.log(this.tipoSiNo);
    this.routeSub = this.route.params.subscribe(params => {
      this.solicitudId = params["idSolicitud"];
      this.getDataForm(this.solicitudId);
    });

    // Code for the Validator
    const $validator = $(".card-wizard form").validate({
      rules: {
        firstname: {
          required: true,
          minlength: 3
        },
        lastname: {
          required: true,
          minlength: 3
        },
        email: {
          required: true,
          minlength: 3
        }
      },

      highlight: function (element) {
        $(element)
          .closest(".form-group")
          .removeClass("has-success")
          .addClass("has-danger");
      },
      success: function (element) {
        $(element)
          .closest(".form-group")
          .removeClass("has-danger")
          .addClass("has-success");
      },
      errorPlacement: function (error, element) {
        $(element).append(error);
      }
    });

    // Wizard Initialization
    $(".card-wizard").bootstrapWizard({
      tabClass: "nav nav-pills",
      nextSelector: ".btn-next",
      previousSelector: ".btn-previous",

      onNext: function (tab, navigation, index) {
        var $valid = $(".card-wizard form").valid();
        if (!$valid) {
          $validator.focusInvalid();
          return false;
        }
      },

      onInit: function (tab: any, navigation: any, index: any) {
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
        } else if (
          $current == total_steps ||
          (mobile_device == true && index % 2 == 1)
        ) {
          move_distance += 8;
        }

        if (mobile_device) {
          let x: any = index / 2;
          vertical_level = parseInt(x);
          vertical_level = vertical_level * 38;
        }

        $wizard.find(".moving-tab").css("width", step_width);
        $(".moving-tab").css({
          transform:
            "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
          transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
        });
        $(".moving-tab").css("transition", "transform 0s");
      },

      onTabClick: function (tab: any, navigation: any, index: any) {
        const $valid = $(".card-wizard form").valid();

        if (!$valid) {
          return false;
        } else {
          return true;
        }
      },

      onTabShow: function (tab: any, navigation: any, index: any) {
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

        const button_text = navigation
          .find("li:nth-child(" + $current + ") a")
          .html();

        setTimeout(function () {
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
        } else if (
          $current == total_steps ||
          (mobile_device == true && index % 2 == 1)
        ) {
          move_distance += 8;
        }

        if (mobile_device) {
          let x: any = index / 2;
          vertical_level = parseInt(x);
          vertical_level = vertical_level * 38;
        }

        $wizard.find(".moving-tab").css("width", step_width);
        $(".moving-tab").css({
          transform:
            "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
          transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
        });
      }
    });

    // Prepare the preview for profile picture
    $("#wizard-picture").change(function () {
      const input = $(this);

      if (input[0].files && input[0].files[0]) {
        const reader = new FileReader();

        reader.onload = function (e: any) {
          $("#wizardPicturePreview")
            .attr("src", e.target.result)
            .fadeIn("slow");
        };
        reader.readAsDataURL(input[0].files[0]);
      }
    });

    $('[data-toggle="wizard-radio"]').click(function () {
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

    $('[data-toggle="wizard-checkbox"]').click(function () {
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
  getDomains() {
    this.domainService.getTipoCondicionSolicitante().subscribe(
      data => {
        this.tipoEstadoInformeTecnicoJuridico = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoSoporteValoracion().subscribe(
      data => {
        this.tipoSoporteValoracion = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoPruebaAportada().subscribe(
      data => {
        this.tipoPruebaAportada = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoRuta().subscribe(
      data => {
        this.tipoRuta = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoTieneViabilidadJuridica().subscribe(
      data => {
        this.tipoTieneViabilidadJuridica = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoDeNoViabilidad().subscribe(
      data => {
        this.tipoDeNoViabilidad = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoMedidaDeProteccionUrt().subscribe(
      data => {
        this.tipoMedidaDeProteccionUrt = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoMedidaCautelar().subscribe(
      data => {
        this.tipoMedidaCautelar = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoDeActo().subscribe(
      data => {
        this.tipoDeActo = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoDeDecisionDeCierre().subscribe(
      data => {
        this.tipoDecisionDeCierre = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoRecurso().subscribe(
      data => {
        this.tipoRecurso = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoEstadoSinegia().subscribe(
      data => {
        this.tipoEstadoSinegia = data
      },
      error => {
        console.log("It don't getDomain!" + error);
      }
    );

  }
  initForm() {
    this.createSeguimiento902 = this.formBuilder.group({
      tieneViabilidadTecnica: [null, Validators.required],
      estadoInformeTecnicoJuridicoId: [null, Validators.required],
      fechaInformeTecnicoJuridico: [null, Validators.required],
      areaDelPredioEnCatastroR1YR2: [null, Validators.required],
      areaDelPredioEnFolioDeMatriculaInmobiliaria: [null, Validators.required],
      areaLevantamientoPredial: [null, Validators.required],
      ingenieroProyectoItjId: [null, Validators.required],
      ingenieroRevisoItjId: [null, Validators.required],
      tipoSoporteValoracionId: [null, Validators.required],
      noResolucionOMemorando: [null, Validators.required],
      fechaResolucionMemorando: [null, Validators.required],
      tipoDePruebaAportadaId: [null, Validators.required],
      requierePruebasAdicionales: [null, Validators.required],
      pruebaAdicionalSolicitada: [null, Validators.required],
      anosDePosesionSegunFiso: [null, Validators.required],
      anosDePosesionSegunPrueba: [null, Validators.required],
      tipoDeRutaId: [null, Validators.required],
      tipoTieneViabilidadJuridicaId: [null, Validators.required],
      tipoDeNoViabilidadId: [null, Validators.required],
      tipoMedidaDeProteccionUrtId: [null, Validators.required],
      tipoMedidaCautelarId: [null, Validators.required],
      tipoDeActoId: [null, Validators.required],
      abogadoProyeccionId: [null, Validators.required],
      fechaEnvioAFirmaDeSubdirectorInicio: [null, Validators.required],
      fechaRecibidoFirmaInicio: [null, Validators.required],
      fechaEnvioANumeracionInicio: [null, Validators.required],
      numeroResolucionInicioArchivo: [null, Validators.required],
      fechaResolucion: [null, Validators.required],
      notificacionPersonalInicio: [null, Validators.required],
      fechaNotificacionPersonalInicio: [null, Validators.required],
      notificacionPorAvisoInicio: [null, Validators.required],
      fechaFijacionNotificacionPorAvisoInicio: [null, Validators.required],
      publicacionWebInicio: [null, Validators.required],
      fechaPublicacionWebInicio: [null, Validators.required],
      publicacionEmisora: [null, Validators.required],
      fechaPublicacionEnEmisora: [null, Validators.required],
      publicacionAlcaldia: [null, Validators.required],
      fechaPublicacionAlcaldia: [null, Validators.required],
      recursoDeReposicion: [null, Validators.required],
      numeroDeResolucionQueResuelveRecurso: [null, Validators.required],
      fechaResolucionQueResuelveRecurso: [null, Validators.required],
      fechaComunicacionAProcuraduria: [null, Validators.required],
      fechaEnvioAOripResolucionInicio: [null, Validators.required],
      fechaRegistroEnOripResolucionInicio: [null, Validators.required],
      numeroDeResolucionDePruebas: [null, Validators.required],
      fechaResolucionDePruebas: [null, Validators.required],
      fechaPublicacionEnRadio: [null, Validators.required],
      audienciaPublica: [null, Validators.required],
      fechaAudienciaPublica: [null, Validators.required],
      tipoDecisionDeCierreId: [null, Validators.required],
      abogadoProyeccionCierreId: [null, Validators.required],
      oposicion: [null, Validators.required],
      motivoOposicion: [null, Validators.required],
      fechaRadicadoOposicion: [null, Validators.required],
      fechaEnvioAFirmaDeSubdirectorCierre: [null, Validators.required],
      fechaRecibidoFirmaCierre: [null, Validators.required],
      fechaEnvioANumeracionCierre: [null, Validators.required],
      numeroDeResolucionDeCierre: [null, Validators.required],
      fechaResolucionDeCierre: [null, Validators.required],
      notificacionPersonalCierre: [null, Validators.required],
      fechaNotificacionPersonalCierre: [null, Validators.required],
      notificacionPorAvisoCierre: [null, Validators.required],
      fechaFijacionNotificacionPorAvisoCierre: [null, Validators.required],
      publicacionResolucionCierre: [null, Validators.required],
      fechaPublicacion: [null, Validators.required],
      recursoResolucionCierre: [null, Validators.required],
      tipoRecursoId: [null, Validators.required],
      numeroResolucionResuelveRecurso: [null, Validators.required],
      fechaResolucionResuelveRecurso: [null, Validators.required],
      fechaEnvioAOripResolucionFinal: [null, Validators.required],
      fechaAnotacionANombreDelNuevoPropietario: [null, Validators.required],
      fmiConInscripcionANombreDelNuevoPropietario: [null, Validators.required],
      nombreDelPredioFormalizado: [null, Validators.required],
      areaFormalizada: [null, Validators.required],
      fechaEntregaTitulo: [null, Validators.required],
      tipoEstadoSinegiaId: [null, Validators.required],
      fechaAprobacionSinergia: [null, Validators.required]

    });
  }
  getDataForm(idSolicitud) {
    this.seguimiento902Service.getSeguimiento902(idSolicitud).subscribe(
      seguimiento902Data => {
        this.createSeguimiento902.controls["tieneViabilidadTecnica"].setValue(seguimiento902Data.tieneViabilidadTecnica);
        this.createSeguimiento902.controls["estadoInformeTecnicoJuridicoId"].setValue(seguimiento902Data.estadoInformeTecnicoJuridicoId);
        this.createSeguimiento902.controls["fechaInformeTecnicoJuridico"].setValue(seguimiento902Data.fechaInformeTecnicoJuridico);
        this.createSeguimiento902.controls["areaDelPredioEnCatastroR1YR2"].setValue(seguimiento902Data.areaDelPredioEnCatastroR1YR2);
        this.createSeguimiento902.controls["areaDelPredioEnFolioDeMatriculaInmobiliaria"].setValue(seguimiento902Data.areaDelPredioEnFolioDeMatriculaInmobiliaria);
        this.createSeguimiento902.controls["areaLevantamientoPredial"].setValue(seguimiento902Data.areaLevantamientoPredial);
        this.createSeguimiento902.controls["ingenieroProyectoItjId"].setValue(seguimiento902Data.ingenieroProyectoItjId);
        this.createSeguimiento902.controls["ingenieroRevisoItjId"].setValue(seguimiento902Data.ingenieroRevisoItjId);
        this.createSeguimiento902.controls["tipoSoporteValoracionId"].setValue(seguimiento902Data.tipoSoporteValoracionId);
        this.createSeguimiento902.controls["noResolucionOMemorando"].setValue(seguimiento902Data.noResolucionOMemorando);
        this.createSeguimiento902.controls["fechaResolucionMemorando"].setValue(seguimiento902Data.fechaResolucionMemorando);
        this.createSeguimiento902.controls["tipoDePruebaAportadaId"].setValue(seguimiento902Data.tipoDePruebaAportadaId);
        this.createSeguimiento902.controls["requierePruebasAdicionales"].setValue(seguimiento902Data.requierePruebasAdicionales);
        this.createSeguimiento902.controls["pruebaAdicionalSolicitada"].setValue(seguimiento902Data.pruebaAdicionalSolicitada);
        this.createSeguimiento902.controls["anosDePosesionSegunFiso"].setValue(seguimiento902Data.anosDePosesionSegunFiso);
        this.createSeguimiento902.controls["anosDePosesionSegunPrueba"].setValue(seguimiento902Data.anosDePosesionSegunPrueba);
        this.createSeguimiento902.controls["tipoDeRutaId"].setValue(seguimiento902Data.tipoDeRutaId);
        this.createSeguimiento902.controls["tipoTieneViabilidadJuridicaId"].setValue(seguimiento902Data.tipoTieneViabilidadJuridicaId);
        this.createSeguimiento902.controls["tipoDeNoViabilidadId"].setValue(seguimiento902Data.tipoDeNoViabilidadId);
        this.createSeguimiento902.controls["tipoMedidaDeProteccionUrtId"].setValue(seguimiento902Data.tipoMedidaDeProteccionUrtId);
        this.createSeguimiento902.controls["tipoMedidaCautelarId"].setValue(seguimiento902Data.tipoMedidaCautelarId);
        this.createSeguimiento902.controls["tipoDeActoId"].setValue(seguimiento902Data.tipoDeActoId);
        this.createSeguimiento902.controls["abogadoProyeccionId"].setValue(seguimiento902Data.abogadoProyeccionId);
        this.createSeguimiento902.controls["fechaEnvioAFirmaDeSubdirectorInicio"].setValue(seguimiento902Data.fechaEnvioAFirmaDeSubdirectorInicio);
        this.createSeguimiento902.controls["fechaRecibidoFirmaInicio"].setValue(seguimiento902Data.fechaRecibidoFirmaInicio);
        this.createSeguimiento902.controls["fechaEnvioANumeracionInicio"].setValue(seguimiento902Data.fechaEnvioANumeracionInicio);
        this.createSeguimiento902.controls["numeroResolucionInicioArchivo"].setValue(seguimiento902Data.numeroResolucionInicioArchivo);
        this.createSeguimiento902.controls["fechaResolucion"].setValue(seguimiento902Data.fechaResolucion);
        this.createSeguimiento902.controls["notificacionPersonalInicio"].setValue(seguimiento902Data.notificacionPersonalInicio);
        this.createSeguimiento902.controls["fechaNotificacionPersonalInicio"].setValue(seguimiento902Data.fechaNotificacionPersonalInicio);
        this.createSeguimiento902.controls["notificacionPorAvisoInicio"].setValue(seguimiento902Data.notificacionPorAvisoInicio);
        this.createSeguimiento902.controls["fechaFijacionNotificacionPorAvisoInicio"].setValue(seguimiento902Data.fechaFijacionNotificacionPorAvisoInicio);
        this.createSeguimiento902.controls["publicacionWebInicio"].setValue(seguimiento902Data.publicacionWebInicio);
        this.createSeguimiento902.controls["fechaPublicacionWebInicio"].setValue(seguimiento902Data.fechaPublicacionWebInicio);
        this.createSeguimiento902.controls["publicacionEmisora"].setValue(seguimiento902Data.publicacionEmisora);
        this.createSeguimiento902.controls["fechaPublicacionEnEmisora"].setValue(seguimiento902Data.fechaPublicacionEnEmisora);
        this.createSeguimiento902.controls["publicacionAlcaldia"].setValue(seguimiento902Data.publicacionAlcaldia);
        this.createSeguimiento902.controls["fechaPublicacionAlcaldia"].setValue(seguimiento902Data.fechaPublicacionAlcaldia);
        this.createSeguimiento902.controls["recursoDeReposicion"].setValue(seguimiento902Data.recursoDeReposicion);
        this.createSeguimiento902.controls["numeroDeResolucionQueResuelveRecurso"].setValue(seguimiento902Data.numeroDeResolucionQueResuelveRecurso);
        this.createSeguimiento902.controls["fechaResolucionQueResuelveRecurso"].setValue(seguimiento902Data.fechaResolucionQueResuelveRecurso);
        this.createSeguimiento902.controls["fechaComunicacionAProcuraduria"].setValue(seguimiento902Data.fechaComunicacionAProcuraduria);
        this.createSeguimiento902.controls["fechaEnvioAOripResolucionInicio"].setValue(seguimiento902Data.fechaEnvioAOripResolucionInicio);
        this.createSeguimiento902.controls["fechaRegistroEnOripResolucionInicio"].setValue(seguimiento902Data.fechaRegistroEnOripResolucionInicio);
        this.createSeguimiento902.controls["numeroDeResolucionDePruebas"].setValue(seguimiento902Data.numeroDeResolucionDePruebas);
        this.createSeguimiento902.controls["fechaResolucionDePruebas"].setValue(seguimiento902Data.fechaResolucionDePruebas);
        this.createSeguimiento902.controls["fechaPublicacionEnRadio"].setValue(seguimiento902Data.fechaPublicacionEnRadio);
        this.createSeguimiento902.controls["audienciaPublica"].setValue(seguimiento902Data.audienciaPublica);
        this.createSeguimiento902.controls["fechaAudienciaPublica"].setValue(seguimiento902Data.fechaAudienciaPublica);
        this.createSeguimiento902.controls["tipoDecisionDeCierreId"].setValue(seguimiento902Data.tipoDecisionDeCierreId);
        this.createSeguimiento902.controls["abogadoProyeccionCierreId"].setValue(seguimiento902Data.abogadoProyeccionCierreId);
        this.createSeguimiento902.controls["oposicion"].setValue(seguimiento902Data.oposicion);
        this.createSeguimiento902.controls["motivoOposicion"].setValue(seguimiento902Data.motivoOposicion);
        this.createSeguimiento902.controls["fechaRadicadoOposicion"].setValue(seguimiento902Data.fechaRadicadoOposicion);
        this.createSeguimiento902.controls["fechaEnvioAFirmaDeSubdirectorCierre"].setValue(seguimiento902Data.fechaEnvioAFirmaDeSubdirectorCierre);
        this.createSeguimiento902.controls["fechaRecibidoFirmaCierre"].setValue(seguimiento902Data.fechaRecibidoFirmaCierre);
        this.createSeguimiento902.controls["fechaEnvioANumeracionCierre"].setValue(seguimiento902Data.fechaEnvioANumeracionCierre);
        this.createSeguimiento902.controls["numeroDeResolucionDeCierre"].setValue(seguimiento902Data.numeroDeResolucionDeCierre);
        this.createSeguimiento902.controls["fechaResolucionDeCierre"].setValue(seguimiento902Data.fechaResolucionDeCierre);
        this.createSeguimiento902.controls["notificacionPersonalCierre"].setValue(seguimiento902Data.notificacionPersonalCierre);
        this.createSeguimiento902.controls["fechaNotificacionPersonalCierre"].setValue(seguimiento902Data.fechaNotificacionPersonalCierre);
        this.createSeguimiento902.controls["notificacionPorAvisoCierre"].setValue(seguimiento902Data.notificacionPorAvisoCierre);
        this.createSeguimiento902.controls["fechaFijacionNotificacionPorAvisoCierre"].setValue(seguimiento902Data.fechaFijacionNotificacionPorAvisoCierre);
        this.createSeguimiento902.controls["publicacionResolucionCierre"].setValue(seguimiento902Data.publicacionResolucionCierre);
        this.createSeguimiento902.controls["fechaPublicacion"].setValue(seguimiento902Data.fechaPublicacion);
        this.createSeguimiento902.controls["recursoResolucionCierre"].setValue(seguimiento902Data.recursoResolucionCierre);
        this.createSeguimiento902.controls["tipoRecursoId"].setValue(seguimiento902Data.tipoRecursoId);
        this.createSeguimiento902.controls["numeroResolucionResuelveRecurso"].setValue(seguimiento902Data.numeroResolucionResuelveRecurso);
        this.createSeguimiento902.controls["fechaResolucionResuelveRecurso"].setValue(seguimiento902Data.fechaResolucionResuelveRecurso);
        this.createSeguimiento902.controls["fechaEnvioAOripResolucionFinal"].setValue(seguimiento902Data.fechaEnvioAOripResolucionFinal);
        this.createSeguimiento902.controls["fechaAnotacionANombreDelNuevoPropietario"].setValue(seguimiento902Data.fechaAnotacionANombreDelNuevoPropietario);
        this.createSeguimiento902.controls["fmiConInscripcionANombreDelNuevoPropietario"].setValue(seguimiento902Data.fmiConInscripcionANombreDelNuevoPropietario);
        this.createSeguimiento902.controls["nombreDelPredioFormalizado"].setValue(seguimiento902Data.nombreDelPredioFormalizado);
        this.createSeguimiento902.controls["areaFormalizada"].setValue(seguimiento902Data.areaFormalizada);
        this.createSeguimiento902.controls["fechaEntregaTitulo"].setValue(seguimiento902Data.fechaEntregaTitulo);
        this.createSeguimiento902.controls["tipoEstadoSinegiaId"].setValue(seguimiento902Data.tipoEstadoSinegiaId);
        this.createSeguimiento902.controls["fechaAprobacionSinergia"].setValue(seguimiento902Data.fechaAprobacionSinergia);

      },
      error => {
        console.log("Error Obteniendo el Objeto!" + error);
      }
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    const input = $(this);

    if (input[0].files && input[0].files[0]) {
      const reader: any = new FileReader();

      reader.onload = function (e: any) {
        $("#wizardPicturePreview")
          .attr("src", e.target.result)
          .fadeIn("slow");
      };
      reader.readAsDataURL(input[0].files[0]);
    }
  }
  ngAfterViewInit() {
    $(window).resize(() => {
      $(".card-wizard").each(function () {
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
          } else if (
            $current == total_steps ||
            (mobile_device == true && index % 2 == 1)
          ) {
            move_distance += 8;
          }

          if (mobile_device) {
            let x: any = index / 2;
            vertical_level = parseInt(x);
            vertical_level = vertical_level * 38;
          }

          $wizard.find(".moving-tab").css("width", step_width);
          $(".moving-tab").css({
            transform:
              "translate3d(" +
              move_distance +
              "px, " +
              vertical_level +
              "px, 0)",
            transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
          });

          $(".moving-tab").css({
            transition: "transform 0s"
          });
        }, 500);
      });
    });
  }
}
