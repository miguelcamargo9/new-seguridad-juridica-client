// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { Seguimiento902Service } from "../seguimiento902.service";
import { DomainService } from "src/app/domains/domain.service";
import { Domain } from "src/app/domains/domain.model";
import { DomainBoolean } from "../DomainBoolean.model";
import { Seguimiento902EtapaIncio } from "../seguimiento902EtapaInicio.model";
import { Seguimiento902EtapaCierre } from "../seguimiento902EtapaCierre.model";

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
  selector: "app-crearseguimiento902-cmp",
  templateUrl: "crearseguimiento902.component.html",
})
export class CrearSeguimiento902Component implements OnInit, OnChanges, AfterViewInit {
  emailFormControl = new FormControl("", [Validators.required, Validators.email]);
  routeSub: Subscription;

  usersAbodago: Domain[];
  usersIngeniero: Domain[];
  usersTransversal: Domain[];

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
  tipoMotivoSuspension: Domain[];
  tipoMotivoDeCorreccionSinergia: Domain[];
  tipoViabilidadTecnica: Domain[];

  solicitudId: number;
  seguimiento902Id: number;
  initialStageId: number;
  finalStageId: number;
  fiso: string;
  expedienteSit: string;

  viewPruebaAdicionalSolicitada: boolean = false;
  viewTipoDeNoViabilidadId: boolean = false;
  viewFechaNotificacionPersonalInicio: boolean = false;
  viewFechaPublicacionWebInicio: boolean = false;
  viewFechaFijacionNotificacionPorAvisoInicio: boolean = false;
  viewFechaPublicacionEnEmisora: boolean = false;
  viewFechaPublicacionAlcaldia: boolean = false;
  viewNumeroDeResolucionQueResuelveRecurso: boolean = false;
  viewMotivoOposicion: boolean = false;
  viewTipoMotivoSuspension: boolean = false;
  viewFechaAprobacionSinergia: boolean = false;
  viewMotivoDeCorreccionSinergia: boolean = false;
  viewResolucionModificacionAclaracion: boolean = false;
  viewResolucionModificacionAclaracionCierre: boolean = false;

  // Form Cierre
  viewMotivoOposicionCierre: boolean = false;
  viewFechaNotificacionPersonalCierre: boolean = false;
  viewFechaNotificacionPorAvisoCierre: boolean = false;
  viewFechaPublicacionResolucionCierre: boolean = false;
  viewResolucionCierre: boolean = false;
  userList: Domain[];

  initialStages: Seguimiento902EtapaIncio[];
  finalStages: Seguimiento902EtapaCierre[];

  initialStageButton: String = "add";
  finalStageButton: String = "add";

  matcher = new MyErrorStateMatcher();

  createSeguimiento902: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private seguimiento902Service: Seguimiento902Service,
    private domainService: DomainService
  ) {
    this.tipoSiNo = [new DomainBoolean(false, "No"), new DomainBoolean(true, "Si")];
  }

  save(redirect = false) {
    let data = this.createSeguimiento902.value;
    data.id = this.seguimiento902Id * 1;
    data.solicitudId = this.solicitudId * 1;
    if (this.seguimiento902Id == null || this.seguimiento902Id == 0) {
      console.log("Create");
      this.seguimiento902Service.postCreateSeguimiento902(data).subscribe((result) => {
        this.seguimiento902Id = result;
        this.toastr.success("Formulario Creado Correctamente", "Seguimiento 902");
        if (redirect) this.router.navigate(["/solicitudes/ver/" + data.solicitudId]);
      });
    } else {
      console.log("Update");
      this.seguimiento902Service.putUpdateSeguimiento902(data).subscribe((params) => {
        this.toastr.success("Formulario Actualizado Correctamente", "Seguimiento 902");
        if (redirect) this.router.navigate(["/solicitudes/ver/" + data.solicitudId]);
      });
    }
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.createSeguimiento902.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  onSubmit() {
    if (this.createSeguimiento902.invalid) {
      console.log("Invalido", this.findInvalidControls());
      this.toastr.error("Formulario Invalido", "Seguimiento 902");
      return;
    }
    this.save(true);
    // display form values on success
    // console.log("SUCCESS!! :-)", this.createSeguimiento902.value);
  }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      "has-error": this.isFieldValid(form, field),
      "has-feedback": this.isFieldValid(form, field),
    };
  }
  ngOnInit() {
    const e = this;
    const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");
    this.getDomains();
    this.initForm();
    this.routeSub = this.route.params.subscribe((params) => {
      this.solicitudId = params["idSolicitud"];
      this.getDataForm(this.solicitudId);
    });

    // Code for the Validator
    const $validator = $(".card-wizard form").validate({
      rules: {
        tipoViabilidadTecnicaId: { required: true },
        estadoInformeTecnicoJuridicoId: { required: true },
        areaDelPredioEnCatastroR1YR2: { required: true },
        areaDelPredioEnFolioDeMatriculaInmobiliaria: { required: true },
        areaLevantamientoPredial: { required: true },
        ingenieroProyectoItjId: { required: true },
        ingenieroRevisoItjId: { required: true },
        tipoSoporteValoracionId: { required: true },
        noResolucionOMemorando: { required: true },
        fechaResolucionMemorando: { required: true },
        tipoDePruebaAportadaId: { required: true },
        requierePruebasAdicionales: { required: true },
        anosDePosesionSegunFiso: { required: true },
        anosDePosesionSegunPrueba: { required: true },
        tipoDeRutaId: { required: true },
        tipoTieneViabilidadJuridicaId: { required: true },
        tipoMedidaDeProteccionUrtId: { required: true },
        tipoMedidaCautelarId: { required: true },
        tipoDeActoId: { required: true },
        abogadoProyeccionId: { required: true },
        numeroResolucionInicioArchivo: { required: true },
        fechaResolucion: { required: true },
        recursoDeReposicion: { required: true },
        fechaComunicacionAProcuraduria: { required: true },
        fechaEnvioAOripResolucionInicio: { required: true },
        fechaRegistroEnOripResolucionInicio: { required: true },
        resolucionModificacionAclaracion: { required: true },
        resolucionModificacionAclaracionCierre: { required: true },
        tipoDecisionDeCierreId: { required: true },
        abogadoProyeccionCierreId: { required: true },
        oposicion: { required: true },
        numeroDeResolucionDeCierre: { required: true },
        fechaResolucionDeCierre: { required: true },
        recursoResolucionCierre: { required: true },
        fechaEnvioAOripResolucionFinal: { required: true },
        fechaAnotacionANombreDelNuevoPropietario: { required: true },
        fmiConInscripcionANombreDelNuevoPropietario: { required: true },
        nombreDelPredioFormalizado: { required: true },
        areaFormalizada: { required: true },
      },

      highlight: function (element) {
        $(element).closest(".form-group").removeClass("has-success").addClass("has-danger");
      },
      success: function (element) {
        $(element).closest(".form-group").removeClass("has-danger").addClass("has-success");
      },
      errorPlacement: function (error, element) {
        $(element).append(error);
      },
    });

    // Wizard Initialization
    $(".card-wizard").bootstrapWizard({
      tabClass: "nav nav-pills",
      nextSelector: ".btn-next",
      previousSelector: ".btn-previous",

      onNext: function (tab, navigation, index) {
        console.log("Pagina Actual", index);
        var $valid = $(".card-wizard form").valid();
        if (!$valid) {
          if (index === 5 && e.initialStages.length > 0) {
            e.loadEtapaInicio(e.initialStages[0].id, "edit");
            return true;
          } else {
            if (index === 8 && e.finalStages.length > 0) {
              e.loadEtapaCierre(e.finalStages[0].id, "edit");
              return true;
            } else {
              $validator.focusInvalid();
              return false;
            }
          }
        } else {
          if (index === 5 && e.initialStages.length < 1) {
            e.toastr.error("Debe Agregar al menos un registro.");
            return false;
          } else {
            if (index === 8 && e.finalStages.length < 1) {
              e.toastr.error("Debe Agregar al menos un registro.");
              return false;
            } else {
              e.save();
            }
          }
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
          transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)",
        });
        $(".moving-tab").css("transition", "transform 0s");
      },

      onTabClick: function (tab: any, navigation: any, index: any) {
        const $valid = $(".card-wizard form").valid();
        if (!$valid) {
          if (index === 4 && e.initialStages.length > 0) {
            e.loadEtapaInicio(e.initialStages[0].id, "edit");
            return true;
          } else {
            if (index === 7 && e.finalStages.length > 0) {
              e.loadEtapaCierre(e.finalStages[0].id, "edit");
              return true;
            } else {
              $validator.focusInvalid();
              return false;
            }
          }
        } else {
          if (index === 4 && e.initialStages.length < 1) {
            e.toastr.error("Debe Agregar al menos un registro.");
            return false;
          } else {
            if (index === 7 && e.finalStages.length < 1) {
              e.toastr.error("Debe Agregar al menos un registro.");
              return false;
            } else {
              e.save();
            }
          }
        }
      },

      onTabShow: function (tab: any, navigation: any, index: any) {
        let $total = navigation.find("li").length;
        let $current = index + 1;
        elemMainPanel.scrollTop = 0;
        const $wizard = navigation.closest(".card-wizard");

        // If it's the last tab then hide the last button and show the finish instead
        if ($current >= $total) {
          $($wizard).find(".btn-next").hide();
          $($wizard).find(".btn-finish").show();
        } else {
          $($wizard).find(".btn-next").show();
          $($wizard).find(".btn-finish").hide();
        }

        const button_text = navigation.find("li:nth-child(" + $current + ") a").html();

        setTimeout(function () {
          $(".moving-tab").text(button_text);
        }, 150);

        const checkbox = $(".footer-checkbox");

        if (index !== 0) {
          $(checkbox).css({
            opacity: "0",
            visibility: "hidden",
            position: "absolute",
          });
        } else {
          $(checkbox).css({
            opacity: "1",
            visibility: "visible",
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
          transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)",
        });
      },
    });

    // Prepare the preview for profile picture
    $("#wizard-picture").change(function () {
      const input = $(this);

      if (input[0].files && input[0].files[0]) {
        const reader = new FileReader();

        reader.onload = function (e: any) {
          $("#wizardPicturePreview").attr("src", e.target.result).fadeIn("slow");
        };
        reader.readAsDataURL(input[0].files[0]);
      }
    });

    $('[data-toggle="wizard-radio"]').click(function () {
      const wizard = $(this).closest(".card-wizard");
      wizard.find('[data-toggle="wizard-radio"]').removeClass("active");
      $(this).addClass("active");
      $(wizard).find('[type="radio"]').removeAttr("checked");
      $(this).find('[type="radio"]').attr("checked", "true");
    });

    $('[data-toggle="wizard-checkbox"]').click(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).find('[type="checkbox"]').removeAttr("checked");
      } else {
        $(this).addClass("active");
        $(this).find('[type="checkbox"]').attr("checked", "true");
      }
    });

    $(".set-full-height").css("height", "auto");
  }
  getDomains() {
    this.domainService.getUsersByRol("Abogado").subscribe(
      (data) => {
        this.usersAbodago = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );

    this.domainService.getUsersByRol("Ingeniero").subscribe(
      (data) => {
        this.usersIngeniero = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );

    this.domainService.getUsersByRol("Transversal").subscribe(
      (data) => {
        this.usersTransversal = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoEstadoInformeTecnicoJuridico().subscribe(
      (data) => {
        this.tipoEstadoInformeTecnicoJuridico = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoSoporteValoracion().subscribe(
      (data) => {
        this.tipoSoporteValoracion = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoPruebaAportada().subscribe(
      (data) => {
        this.tipoPruebaAportada = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoRuta().subscribe(
      (data) => {
        this.tipoRuta = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoTieneViabilidadJuridica().subscribe(
      (data) => {
        this.tipoTieneViabilidadJuridica = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoDeNoViabilidad().subscribe(
      (data) => {
        this.tipoDeNoViabilidad = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoMedidaDeProteccionUrt().subscribe(
      (data) => {
        this.tipoMedidaDeProteccionUrt = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoMedidaCautelar().subscribe(
      (data) => {
        this.tipoMedidaCautelar = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoDeActo().subscribe(
      (data) => {
        this.tipoDeActo = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoDeDecisionDeCierre().subscribe(
      (data) => {
        this.tipoDecisionDeCierre = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoRecurso().subscribe(
      (data) => {
        this.tipoRecurso = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoEstadoSinegia().subscribe(
      (data) => {
        this.tipoEstadoSinegia = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoMotivoSuspension().subscribe(
      (data) => {
        this.tipoMotivoSuspension = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoMotivoDeCorreccionSinergia().subscribe(
      (data) => {
        this.tipoMotivoDeCorreccionSinergia = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoViabilidadTecnica().subscribe(
        (data) => {
          this.tipoViabilidadTecnica = data;
        },
        (error) => {
          console.log("It don't getDomain!" + error);
        }
    );
  }
  initForm() {
    this.createSeguimiento902 = this.formBuilder.group({
      tipoViabilidadTecnicaId: [null, Validators.required],
      estadoInformeTecnicoJuridicoId: [null, Validators.required],
      fechaInformeTecnicoJuridico: [null],
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
      pruebaAdicionalSolicitada: [null],
      anosDePosesionSegunFiso: [null, Validators.required],
      anosDePosesionSegunPrueba: [null, Validators.required],
      tipoDeRutaId: [null, Validators.required],
      tipoTieneViabilidadJuridicaId: [null, Validators.required],
      tipoDeNoViabilidadId: [null],
      tipoMotivoSuspensionId: [null],
      tipoMedidaDeProteccionUrtId: [null, Validators.required],
      tipoMedidaCautelarId: [null, Validators.required],
      tipoDeActoId: [null, Validators.required],
      abogadoProyeccionId: [null, Validators.required],
      numeroResolucionInicioArchivo: [null, Validators.required],
      fechaResolucion: [null, Validators.required],
      notificacionPersonalInicio: [null],
      fechaNotificacionPersonalInicio: [null],
      notificacionPorAvisoInicio: [null],
      fechaFijacionNotificacionPorAvisoInicio: [null],
      publicacionWebInicio: [null],
      fechaPublicacionWebInicio: [null],
      publicacionEmisora: [null],
      fechaPublicacionEnEmisora: [null],
      publicacionAlcaldia: [null],
      fechaPublicacionAlcaldia: [null],
      recursoDeReposicion: [null, Validators.required],
      numeroDeResolucionQueResuelveRecurso: [null],
      fechaResolucionQueResuelveRecurso: [null],
      fechaComunicacionAProcuraduria: [null, Validators.required],
      fechaEnvioAOripResolucionInicio: [null, Validators.required],
      fechaRegistroEnOripResolucionInicio: [null, Validators.required],
      resolucionModificacionAclaracion: [null, Validators.required],
      resolucionModificacionAclaracionCierre: [null, Validators.required],
      numeroDeResolucionDePruebas: [null],
      fechaResolucionDePruebas: [null],
      fechaPublicacionEnRadio: [null],
      audienciaPublica: [null],
      fechaAudienciaPublica: [null],
      tipoDecisionDeCierreId: [null, Validators.required],
      abogadoProyeccionCierreId: [null, Validators.required],
      oposicion: [null, Validators.required],
      motivoOposicion: [null],
      fechaRadicadoOposicion: [null],
      numeroDeResolucionDeCierre: [null, Validators.required],
      fechaResolucionDeCierre: [null, Validators.required],
      notificacionPersonalCierre: [null],
      fechaNotificacionPersonalCierre: [null],
      notificacionPorAvisoCierre: [null],
      fechaFijacionNotificacionPorAvisoCierre: [null],
      publicacionResolucionCierre: [null],
      fechaPublicacion: [null],
      recursoResolucionCierre: [null, Validators.required],
      tipoRecursoId: [null],
      numeroResolucionResuelveRecurso: [null],
      fechaResolucionResuelveRecurso: [null],
      fechaEnvioAOripResolucionFinal: [null, Validators.required],
      fechaAnotacionANombreDelNuevoPropietario: [null, Validators.required],
      fmiConInscripcionANombreDelNuevoPropietario: [null, Validators.required],
      nombreDelPredioFormalizado: [null, Validators.required],
      areaFormalizada: [null, Validators.required],
      fechaEntregaTitulo: [null],
      tipoEstadoSinegiaId: [null],
      fechaAprobacionSinergia: [null],
      tipoMotivoDeCorreccionSinergiaId: [null],
    });
  }
  changeDate(d: Date) {
    if (d == null) return null;
    return new Date(d);
  }
  showDate(d: String) {
    if (d == null) return null;
    return d.substring(0, 10);
  }
  getDataForm(idSolicitud) {
    this.seguimiento902Service.getSeguimiento902(idSolicitud).subscribe(
      (seguimiento902Data) => {
        console.log("service data", seguimiento902Data);
        this.seguimiento902Id = seguimiento902Data.id;
        this.fiso = seguimiento902Data.fiso;
        this.expedienteSit = seguimiento902Data.expedienteSit;
        this.viewTipoMotivoSuspension = seguimiento902Data.tipoTieneViabilidadJuridicaId === 3 ? true : false;
        this.viewTipoDeNoViabilidadId = seguimiento902Data.tipoTieneViabilidadJuridicaId === 2 ? true : false;

        this.createSeguimiento902.controls["tipoViabilidadTecnicaId"].setValue(
          seguimiento902Data.tipoViabilidadTecnicaId
        );
        this.createSeguimiento902.controls["estadoInformeTecnicoJuridicoId"].setValue(
          seguimiento902Data.estadoInformeTecnicoJuridicoId
        );
        this.createSeguimiento902.controls["fechaInformeTecnicoJuridico"].setValue(
          this.changeDate(seguimiento902Data.fechaInformeTecnicoJuridico)
        );
        this.createSeguimiento902.controls["areaDelPredioEnCatastroR1YR2"].setValue(
          seguimiento902Data.areaDelPredioEnCatastroR1YR2
        );
        this.createSeguimiento902.controls["areaDelPredioEnFolioDeMatriculaInmobiliaria"].setValue(
          seguimiento902Data.areaDelPredioEnFolioDeMatriculaInmobiliaria
        );
        this.createSeguimiento902.controls["areaLevantamientoPredial"].setValue(
          seguimiento902Data.areaLevantamientoPredial
        );
        this.createSeguimiento902.controls["ingenieroProyectoItjId"].setValue(
          seguimiento902Data.ingenieroProyectoItjId
        );
        this.createSeguimiento902.controls["ingenieroRevisoItjId"].setValue(
          seguimiento902Data.ingenieroRevisoItjId
        );
        this.createSeguimiento902.controls["tipoSoporteValoracionId"].setValue(
          seguimiento902Data.tipoSoporteValoracionId
        );
        this.createSeguimiento902.controls["noResolucionOMemorando"].setValue(
          seguimiento902Data.noResolucionOMemorando
        );
        this.createSeguimiento902.controls["fechaResolucionMemorando"].setValue(
          this.changeDate(seguimiento902Data.fechaResolucionMemorando)
        );
        this.createSeguimiento902.controls["tipoDePruebaAportadaId"].setValue(
          seguimiento902Data.tipoDePruebaAportadaId
        );
        this.createSeguimiento902.controls["requierePruebasAdicionales"].setValue(
          seguimiento902Data.requierePruebasAdicionales
        );
        this.createSeguimiento902.controls["pruebaAdicionalSolicitada"].setValue(
          seguimiento902Data.pruebaAdicionalSolicitada
        );
        this.createSeguimiento902.controls["anosDePosesionSegunFiso"].setValue(
          seguimiento902Data.anosDePosesionSegunFiso
        );
        this.createSeguimiento902.controls["anosDePosesionSegunPrueba"].setValue(
          seguimiento902Data.anosDePosesionSegunPrueba
        );
        this.createSeguimiento902.controls["tipoDeRutaId"].setValue(
          seguimiento902Data.tipoDeRutaId
        );
        this.createSeguimiento902.controls["tipoTieneViabilidadJuridicaId"].setValue(
          seguimiento902Data.tipoTieneViabilidadJuridicaId
        );
        this.createSeguimiento902.controls["tipoDeNoViabilidadId"].setValue(
          seguimiento902Data.tipoDeNoViabilidadId
        );
        this.createSeguimiento902.controls["tipoMotivoSuspensionId"].setValue(
          seguimiento902Data.tipoMotivoSuspensionId
        );
        this.createSeguimiento902.controls["tipoMedidaDeProteccionUrtId"].setValue(
          seguimiento902Data.tipoMedidaDeProteccionUrtId
        );
        this.createSeguimiento902.controls["tipoMedidaCautelarId"].setValue(
          seguimiento902Data.tipoMedidaCautelarId
        );
        this.createSeguimiento902.controls["tipoDeActoId"].setValue(
          seguimiento902Data.tipoDeActoId
        );
        this.createSeguimiento902.controls["abogadoProyeccionId"].setValue(
          seguimiento902Data.abogadoProyeccionId
        );
        this.createSeguimiento902.controls["numeroResolucionInicioArchivo"].setValue(
          seguimiento902Data.numeroResolucionInicioArchivo
        );
        this.createSeguimiento902.controls["fechaResolucion"].setValue(
          this.changeDate(seguimiento902Data.fechaResolucion)
        );
        this.createSeguimiento902.controls["notificacionPersonalInicio"].setValue(
          seguimiento902Data.notificacionPersonalInicio
        );
        this.createSeguimiento902.controls["fechaNotificacionPersonalInicio"].setValue(
          this.changeDate(seguimiento902Data.fechaNotificacionPersonalInicio)
        );
        this.createSeguimiento902.controls["notificacionPorAvisoInicio"].setValue(
          seguimiento902Data.notificacionPorAvisoInicio
        );
        this.createSeguimiento902.controls["fechaFijacionNotificacionPorAvisoInicio"].setValue(
          this.changeDate(seguimiento902Data.fechaFijacionNotificacionPorAvisoInicio)
        );
        this.createSeguimiento902.controls["publicacionWebInicio"].setValue(
          seguimiento902Data.publicacionWebInicio
        );
        this.createSeguimiento902.controls["fechaPublicacionWebInicio"].setValue(
          this.changeDate(seguimiento902Data.fechaPublicacionWebInicio)
        );
        this.createSeguimiento902.controls["publicacionEmisora"].setValue(
          seguimiento902Data.publicacionEmisora
        );
        this.createSeguimiento902.controls["fechaPublicacionEnEmisora"].setValue(
          this.changeDate(seguimiento902Data.fechaPublicacionEnEmisora)
        );
        this.createSeguimiento902.controls["publicacionAlcaldia"].setValue(
          seguimiento902Data.publicacionAlcaldia
        );
        this.createSeguimiento902.controls["fechaPublicacionAlcaldia"].setValue(
          this.changeDate(seguimiento902Data.fechaPublicacionAlcaldia)
        );
        this.createSeguimiento902.controls["recursoDeReposicion"].setValue(
          seguimiento902Data.recursoDeReposicion
        );
        this.createSeguimiento902.controls["numeroDeResolucionQueResuelveRecurso"].setValue(
          seguimiento902Data.numeroDeResolucionQueResuelveRecurso
        );
        this.createSeguimiento902.controls["fechaResolucionQueResuelveRecurso"].setValue(
          this.changeDate(seguimiento902Data.fechaResolucionQueResuelveRecurso)
        );
        this.createSeguimiento902.controls["fechaComunicacionAProcuraduria"].setValue(
          this.changeDate(seguimiento902Data.fechaComunicacionAProcuraduria)
        );
        this.createSeguimiento902.controls["fechaEnvioAOripResolucionInicio"].setValue(
          this.changeDate(seguimiento902Data.fechaEnvioAOripResolucionInicio)
        );
        this.createSeguimiento902.controls["fechaRegistroEnOripResolucionInicio"].setValue(
          this.changeDate(seguimiento902Data.fechaRegistroEnOripResolucionInicio)
        );
        this.createSeguimiento902.controls["numeroDeResolucionDePruebas"].setValue(
          seguimiento902Data.numeroDeResolucionDePruebas
        );
        this.createSeguimiento902.controls["fechaResolucionDePruebas"].setValue(
          this.changeDate(seguimiento902Data.fechaResolucionDePruebas)
        );
        this.createSeguimiento902.controls["fechaPublicacionEnRadio"].setValue(
          this.changeDate(seguimiento902Data.fechaPublicacionEnRadio)
        );
        this.createSeguimiento902.controls["audienciaPublica"].setValue(
          seguimiento902Data.audienciaPublica
        );
        this.createSeguimiento902.controls["fechaAudienciaPublica"].setValue(
          this.changeDate(seguimiento902Data.fechaAudienciaPublica)
        );
        this.createSeguimiento902.controls["tipoDecisionDeCierreId"].setValue(
          seguimiento902Data.tipoDecisionDeCierreId
        );
        this.createSeguimiento902.controls["abogadoProyeccionCierreId"].setValue(
          seguimiento902Data.abogadoProyeccionCierreId
        );
        this.createSeguimiento902.controls["oposicion"].setValue(seguimiento902Data.oposicion);
        this.createSeguimiento902.controls["motivoOposicion"].setValue(
          seguimiento902Data.motivoOposicion
        );
        this.createSeguimiento902.controls["fechaRadicadoOposicion"].setValue(
          this.changeDate(seguimiento902Data.fechaRadicadoOposicion)
        );
        this.createSeguimiento902.controls["numeroDeResolucionDeCierre"].setValue(
          seguimiento902Data.numeroDeResolucionDeCierre
        );
        this.createSeguimiento902.controls["fechaResolucionDeCierre"].setValue(
          this.changeDate(seguimiento902Data.fechaResolucionDeCierre)
        );
        this.createSeguimiento902.controls["notificacionPersonalCierre"].setValue(
          seguimiento902Data.notificacionPersonalCierre
        );
        this.createSeguimiento902.controls["fechaNotificacionPersonalCierre"].setValue(
          this.changeDate(seguimiento902Data.fechaNotificacionPersonalCierre)
        );
        this.createSeguimiento902.controls["notificacionPorAvisoCierre"].setValue(
          seguimiento902Data.notificacionPorAvisoCierre
        );
        this.createSeguimiento902.controls["fechaFijacionNotificacionPorAvisoCierre"].setValue(
          this.changeDate(seguimiento902Data.fechaFijacionNotificacionPorAvisoCierre)
        );
        this.createSeguimiento902.controls["publicacionResolucionCierre"].setValue(
          seguimiento902Data.publicacionResolucionCierre
        );
        this.createSeguimiento902.controls["fechaPublicacion"].setValue(
          this.changeDate(seguimiento902Data.fechaPublicacion)
        );
        this.createSeguimiento902.controls["recursoResolucionCierre"].setValue(
          seguimiento902Data.recursoResolucionCierre
        );
        this.createSeguimiento902.controls["tipoRecursoId"].setValue(
          seguimiento902Data.tipoRecursoId
        );
        this.createSeguimiento902.controls["numeroResolucionResuelveRecurso"].setValue(
          seguimiento902Data.numeroResolucionResuelveRecurso
        );
        this.createSeguimiento902.controls["fechaResolucionResuelveRecurso"].setValue(
          this.changeDate(seguimiento902Data.fechaResolucionResuelveRecurso)
        );
        this.createSeguimiento902.controls["fechaEnvioAOripResolucionFinal"].setValue(
          this.changeDate(seguimiento902Data.fechaEnvioAOripResolucionFinal)
        );
        this.createSeguimiento902.controls["fechaAnotacionANombreDelNuevoPropietario"].setValue(
          this.changeDate(seguimiento902Data.fechaAnotacionANombreDelNuevoPropietario)
        );
        this.createSeguimiento902.controls["fmiConInscripcionANombreDelNuevoPropietario"].setValue(
          seguimiento902Data.fmiConInscripcionANombreDelNuevoPropietario
        );
        this.createSeguimiento902.controls["nombreDelPredioFormalizado"].setValue(
          seguimiento902Data.nombreDelPredioFormalizado
        );
        this.createSeguimiento902.controls["areaFormalizada"].setValue(
          seguimiento902Data.areaFormalizada
        );
        this.createSeguimiento902.controls["fechaEntregaTitulo"].setValue(
          this.changeDate(seguimiento902Data.fechaEntregaTitulo)
        );
        this.createSeguimiento902.controls["tipoEstadoSinegiaId"].setValue(
          seguimiento902Data.tipoEstadoSinegiaId
        );
        this.createSeguimiento902.controls["fechaAprobacionSinergia"].setValue(
          this.changeDate(seguimiento902Data.fechaAprobacionSinergia)
        );
        this.createSeguimiento902.controls["tipoMotivoDeCorreccionSinergiaId"].setValue(
          seguimiento902Data.tipoMotivoDeCorreccionSinergiaId
        );
        this.createSeguimiento902.controls["resolucionModificacionAclaracion"].setValue(
          seguimiento902Data.resolucionModificacionAclaracion
        );
        this.createSeguimiento902.controls["resolucionModificacionAclaracionCierre"].setValue(
          seguimiento902Data.resolucionModificacionAclaracionCierre
        );
        this.initialStageButton = seguimiento902Data.resolucionModificacionAclaracion ? "add" : "";
        this.finalStageButton = seguimiento902Data.resolucionModificacionAclaracionCierre ? "add" : "";

        this.getSeguimiento902EtapaInicioBySeguimiento902Id(seguimiento902Data.id);
        this.getSeguimiento902EtapaCierreBySeguimiento902Id(seguimiento902Data.id);
      },
      (error) => {
        console.log("Error Obteniendo el Objeto!" + error);
      }
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    const input = $(this);

    if (input[0].files && input[0].files[0]) {
      const reader: any = new FileReader();

      reader.onload = function (e: any) {
        $("#wizardPicturePreview").attr("src", e.target.result).fadeIn("slow");
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
            transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)",
          });

          $(".moving-tab").css({
            transition: "transform 0s",
          });
        }, 500);
      });
    });
  }
  selectRequierePruebasAdicionales(event) {
    this.viewPruebaAdicionalSolicitada = event.value ? true : false;
  }
  selectNotificacionPersonalInicio(event) {
    this.viewFechaNotificacionPersonalInicio = event.value ? true : false;
  }
  selectPublicacionWebInicio(event) {
    this.viewFechaPublicacionWebInicio = event.value ? true : false;
  }
  selectNotificacionPorAvisoInicio(event) {
    this.viewFechaFijacionNotificacionPorAvisoInicio = event.value ? true : false;
  }
  selectPublicacionEmisora(event) {
    this.viewFechaPublicacionEnEmisora = event.value ? true : false;
  }
  selectPublicacionAlcaldia(event) {
    this.viewFechaPublicacionAlcaldia = event.value ? true : false;
  }
  selectRecursoDeReposicion(event) {
    this.viewNumeroDeResolucionQueResuelveRecurso = event.value ? true : false;
  }
  selectOposicion(event) {
    this.viewMotivoOposicion = event.value ? true : false;
  }
  selectTieneViabilidadJuridica(event) {
    this.viewTipoDeNoViabilidadId = event.value === 2 ? true : false;
    this.viewTipoMotivoSuspension = event.value === 3 ? true : false;
  }
  selectEstadoSinegia(event) {
    this.viewFechaAprobacionSinergia = event.value === 1 ? true : false;
    this.viewMotivoDeCorreccionSinergia = event.value === 2 || event.value === 3 ? true : false;
  }
  selectResolucionModificacionAclaracion(event) {
    this.viewResolucionModificacionAclaracion = event.value ? true : false;
    if (!event.value && this.initialStages.length === 0) {
      this.addEtapaInicio();
    } else {
      if (event.value) {
        this.initialStageButton = "add";
      }
    }
  }
  selectResolucionModificacionAclaracionCierre(event) {
    this.viewResolucionModificacionAclaracionCierre = event.value ? true : false;
    if (!event.value && this.finalStages.length === 0) {
      this.addEtapaCierre();
    } else {
      if (event.value) {
        this.finalStageButton = "add";
      }
    }
  }


  // Form Cierre
  selectOposicionCierre(event) {
    this.viewMotivoOposicionCierre = event.value ? true : false;
  }
  selectNotificacionPersonalCierre(event) {
    this.viewFechaNotificacionPersonalCierre = event.value ? true : false;
  }
  selectNotificacionPorAvisoCierre(event) {
    this.viewFechaNotificacionPorAvisoCierre = event.value ? true : false;
  }
  selectPublicacionResolucionCierre(event) {
    this.viewFechaPublicacionResolucionCierre = event.value ? true : false;
  }
  selectResolucionCierre(event) {
    this.viewResolucionCierre = event.value ? true : false;
  }

  loadEtapaInicio(initialStageId: number, process: String) {
    this.initialStageId = initialStageId;
    this.initialStageButton = process;
    this.seguimiento902Service
      .getSeguimiento902EtapaInicioById(initialStageId)
      .subscribe((seguimiento902EtapaInicialData) => {
        this.createSeguimiento902.controls["tipoDeActoId"].setValue(
          seguimiento902EtapaInicialData.tipoDeActoId || null
        );
        this.createSeguimiento902.controls["abogadoProyeccionId"].setValue(
          seguimiento902EtapaInicialData.abogadoProyeccionId
        );
        this.createSeguimiento902.controls["numeroResolucionInicioArchivo"].setValue(
          seguimiento902EtapaInicialData.numeroResolucionInicioArchivo
        );
        this.createSeguimiento902.controls["fechaResolucion"].setValue(
          this.changeDate(seguimiento902EtapaInicialData.fechaResolucion)
        );
        this.createSeguimiento902.controls["notificacionPersonalInicio"].setValue(
          seguimiento902EtapaInicialData.notificacionPersonalInicio
        );
        this.createSeguimiento902.controls["fechaNotificacionPersonalInicio"].setValue(
          this.changeDate(seguimiento902EtapaInicialData.fechaNotificacionPersonalInicio)
        );
        this.createSeguimiento902.controls["notificacionPorAvisoInicio"].setValue(
          seguimiento902EtapaInicialData.notificacionPorAvisoInicio
        );
        this.createSeguimiento902.controls["fechaFijacionNotificacionPorAvisoInicio"].setValue(
          this.changeDate(seguimiento902EtapaInicialData.fechaFijacionNotificacionPorAvisoInicio)
        );
        this.createSeguimiento902.controls["publicacionWebInicio"].setValue(
          seguimiento902EtapaInicialData.publicacionWebInicio
        );
        this.createSeguimiento902.controls["fechaPublicacionWebInicio"].setValue(
          this.changeDate(seguimiento902EtapaInicialData.fechaPublicacionWebInicio)
        );
        this.createSeguimiento902.controls["publicacionEmisora"].setValue(
          seguimiento902EtapaInicialData.publicacionEmisora
        );
        this.createSeguimiento902.controls["fechaPublicacionEnEmisora"].setValue(
          this.changeDate(seguimiento902EtapaInicialData.fechaPublicacionEnEmisora)
        );
        this.createSeguimiento902.controls["publicacionAlcaldia"].setValue(
          seguimiento902EtapaInicialData.publicacionAlcaldia
        );
        this.createSeguimiento902.controls["fechaPublicacionAlcaldia"].setValue(
          this.changeDate(seguimiento902EtapaInicialData.fechaPublicacionAlcaldia)
        );
        this.createSeguimiento902.controls["recursoDeReposicion"].setValue(
          seguimiento902EtapaInicialData.recursoDeReposicion
        );
        this.createSeguimiento902.controls["numeroDeResolucionQueResuelveRecurso"].setValue(
          seguimiento902EtapaInicialData.numeroDeResolucionQueResuelveRecurso
        );
        this.createSeguimiento902.controls["fechaResolucionQueResuelveRecurso"].setValue(
          this.changeDate(seguimiento902EtapaInicialData.fechaResolucionQueResuelveRecurso)
        );
        this.createSeguimiento902.controls["fechaComunicacionAProcuraduria"].setValue(
          this.changeDate(seguimiento902EtapaInicialData.fechaComunicacionAProcuraduria)
        );
        this.createSeguimiento902.controls["fechaEnvioAOripResolucionInicio"].setValue(
          this.changeDate(seguimiento902EtapaInicialData.fechaEnvioAOripResolucionInicio)
        );
        this.createSeguimiento902.controls["fechaRegistroEnOripResolucionInicio"].setValue(
          this.changeDate(seguimiento902EtapaInicialData.fechaRegistroEnOripResolucionInicio)
        );
        this.viewFechaNotificacionPersonalInicio = seguimiento902EtapaInicialData.notificacionPersonalInicio;
        this.viewFechaFijacionNotificacionPorAvisoInicio = seguimiento902EtapaInicialData.notificacionPorAvisoInicio;
        this.viewFechaPublicacionWebInicio = seguimiento902EtapaInicialData.publicacionWebInicio;
        this.viewFechaPublicacionEnEmisora = seguimiento902EtapaInicialData.publicacionEmisora;
        this.viewFechaPublicacionAlcaldia = seguimiento902EtapaInicialData.publicacionAlcaldia;
        this.viewNumeroDeResolucionQueResuelveRecurso = seguimiento902EtapaInicialData.recursoDeReposicion;
      });
  }

  clearEtapaInicio() {
    this.initialStageButton = "add";
    this.createSeguimiento902.controls["tipoDeActoId"].setValue(null);
    this.createSeguimiento902.controls["abogadoProyeccionId"].setValue(null);
    this.createSeguimiento902.controls["numeroResolucionInicioArchivo"].setValue(null);
    this.createSeguimiento902.controls["fechaResolucion"].setValue(null);
    this.createSeguimiento902.controls["notificacionPersonalInicio"].setValue(null);
    this.createSeguimiento902.controls["fechaNotificacionPersonalInicio"].setValue(null);
    this.createSeguimiento902.controls["notificacionPorAvisoInicio"].setValue(null);
    this.createSeguimiento902.controls["fechaFijacionNotificacionPorAvisoInicio"].setValue(null);
    this.createSeguimiento902.controls["publicacionWebInicio"].setValue(null);
    this.createSeguimiento902.controls["fechaPublicacionWebInicio"].setValue(null);
    this.createSeguimiento902.controls["publicacionEmisora"].setValue(null);
    this.createSeguimiento902.controls["fechaPublicacionEnEmisora"].setValue(null);
    this.createSeguimiento902.controls["publicacionAlcaldia"].setValue(null);
    this.createSeguimiento902.controls["fechaPublicacionAlcaldia"].setValue(null);
    this.createSeguimiento902.controls["recursoDeReposicion"].setValue(null);
    this.createSeguimiento902.controls["numeroDeResolucionQueResuelveRecurso"].setValue(null);
    this.createSeguimiento902.controls["fechaResolucionQueResuelveRecurso"].setValue(null);
    this.createSeguimiento902.controls["fechaComunicacionAProcuraduria"].setValue(null);
    this.createSeguimiento902.controls["fechaEnvioAOripResolucionInicio"].setValue(null);
    this.createSeguimiento902.controls["fechaRegistroEnOripResolucionInicio"].setValue(null);
    this.viewFechaNotificacionPersonalInicio = false;
    this.viewFechaFijacionNotificacionPorAvisoInicio = false;
    this.viewFechaPublicacionWebInicio = false;
    this.viewFechaPublicacionEnEmisora = false;
    this.viewFechaPublicacionAlcaldia = false;
    this.viewNumeroDeResolucionQueResuelveRecurso = false;
  }

  getSeguimiento902EtapaInicioBySeguimiento902Id(seguimiento902Id: number) {
    this.seguimiento902Service
      .getSeguimiento902EtapaInicioBySeguimiento902Id(seguimiento902Id)
      .subscribe((dataseguimeinto902EtapaInicio) => {
        this.initialStages = dataseguimeinto902EtapaInicio;
        if (this.initialStages[0]) {
          this.loadEtapaInicio(this.initialStages[0].id, "edit");
        }
      });
  }

  getSeguimiento902EtapaCierreBySeguimiento902Id(seguimiento902Id: number) {
    this.seguimiento902Service
      .getSeguimiento902EtapaCierreBySeguimiento902Id(seguimiento902Id)
      .subscribe((dataseguimeinto902EtapaCierre) => {
        this.finalStages = dataseguimeinto902EtapaCierre;
        if (this.finalStages[0]) {
          this.loadEtapaCierre(this.finalStages[0].id, "edit");
        }
      });
  }

  getDataFormEtapaInicio() {
    const formData = this.createSeguimiento902.value;
    return {
      seguimiento902Id: this.seguimiento902Id,
      tipoDeActoId: formData.tipoDeActoId,
      abogadoProyeccionId: formData.abogadoProyeccionId,
      numeroResolucionInicioArchivo: formData.numeroResolucionInicioArchivo,
      fechaResolucion: formData.fechaResolucion,
      notificacionPersonalInicio: formData.notificacionPersonalInicio,
      fechaNotificacionPersonalInicio: formData.fechaNotificacionPersonalInicio,
      notificacionPorAvisoInicio: formData.notificacionPorAvisoInicio,
      fechaFijacionNotificacionPorAvisoInicio: formData.fechaFijacionNotificacionPorAvisoInicio,
      publicacionWebInicio: formData.publicacionWebInicio,
      fechaPublicacionWebInicio: formData.fechaPublicacionWebInicio,
      publicacionEmisora: formData.publicacionEmisora,
      fechaPublicacionEnEmisora: formData.fechaPublicacionEnEmisora,
      publicacionAlcaldia: formData.publicacionAlcaldia,
      fechaPublicacionAlcaldia: formData.fechaPublicacionAlcaldia,
      recursoDeReposicion: formData.recursoDeReposicion,
      numeroDeResolucionQueResuelveRecurso: formData.numeroDeResolucionQueResuelveRecurso,
      fechaResolucionQueResuelveRecurso: formData.fechaResolucionQueResuelveRecurso,
      fechaComunicacionAProcuraduria: formData.fechaComunicacionAProcuraduria,
      fechaEnvioAOripResolucionInicio: formData.fechaEnvioAOripResolucionInicio,
      fechaRegistroEnOripResolucionInicio: formData.fechaRegistroEnOripResolucionInicio,
    };
  }

  addEtapaInicio() {
    if (!$(".card-wizard form").valid()) {
      this.toastr.error("Formulario Invalido", "Seguimiento 902");
    } else {
      const data = this.getDataFormEtapaInicio();
      this.seguimiento902Service.postCreateSeguimiento902EtapaInicio(data).subscribe((result) => {
        this.toastr.success(
          "RESOLUCIÓN DE MODIFICACIÓN / ACLARACIÓN creada con exito",
          "Seguimiento 902"
        );
        this.getSeguimiento902EtapaInicioBySeguimiento902Id(this.seguimiento902Id);
        this.clearEtapaInicio();
      });
    }
  }

  editEtapaInicio() {
    const data = this.getDataFormEtapaInicio();
    const finalData = {
      ...data,
      id: this.initialStageId,
    };
    this.seguimiento902Service.putUpdateSeguimiento902EtapaInicio(finalData).subscribe(() => {
      this.toastr.success(
        "RESOLUCIÓN DE MODIFICACIÓN / ACLARACIÓN editada con exito",
        "Seguimiento 902"
      );
      this.getSeguimiento902EtapaInicioBySeguimiento902Id(this.seguimiento902Id);
    });
  }

  deleteEtapaInicio() {
    this.seguimiento902Service
      .deleteSeguimiento902EtapaInicio(this.initialStageId)
      .subscribe((result) => {
        this.toastr.success(
          "RESOLUCIÓN DE MODIFICACIÓN / ACLARACIÓN eliminada con exito",
          "Seguimiento 902"
        );
        this.getSeguimiento902EtapaInicioBySeguimiento902Id(this.seguimiento902Id);
        this.initialStageButton = "add";
      });
  }

  loadEtapaCierre(finalStageId: number, process: String) {
    this.finalStageId = finalStageId;
    this.finalStageButton = process;
    this.seguimiento902Service
      .getSeguimiento902EtapaCierreById(finalStageId)
      .subscribe((seguimiento902EtapaCierreData) => {
        this.createSeguimiento902.controls["tipoDecisionDeCierreId"].setValue(
          seguimiento902EtapaCierreData.tipoDecisionDeCierreId
        );
        this.createSeguimiento902.controls["abogadoProyeccionCierreId"].setValue(
          seguimiento902EtapaCierreData.abogadoProyeccionCierreId
        );
        this.createSeguimiento902.controls["oposicion"].setValue(
          seguimiento902EtapaCierreData.oposicion
        );
        this.createSeguimiento902.controls["motivoOposicion"].setValue(
          seguimiento902EtapaCierreData.motivoOposicion
        );
        this.createSeguimiento902.controls["fechaRadicadoOposicion"].setValue(
          this.changeDate(seguimiento902EtapaCierreData.fechaRadicadoOposicion)
        );
        this.createSeguimiento902.controls["numeroDeResolucionDeCierre"].setValue(
          seguimiento902EtapaCierreData.numeroDeResolucionDeCierre
        );
        this.createSeguimiento902.controls["fechaResolucionDeCierre"].setValue(
          this.changeDate(seguimiento902EtapaCierreData.fechaResolucionDeCierre)
        );
        this.createSeguimiento902.controls["notificacionPersonalCierre"].setValue(
          seguimiento902EtapaCierreData.notificacionPersonalCierre
        );
        this.createSeguimiento902.controls["fechaNotificacionPersonalCierre"].setValue(
          this.changeDate(seguimiento902EtapaCierreData.fechaNotificacionPersonalCierre)
        );
        this.createSeguimiento902.controls["notificacionPorAvisoCierre"].setValue(
          seguimiento902EtapaCierreData.notificacionPorAvisoCierre
        );
        this.createSeguimiento902.controls["fechaFijacionNotificacionPorAvisoCierre"].setValue(
          this.changeDate(seguimiento902EtapaCierreData.fechaFijacionNotificacionPorAvisoCierre)
        );
        this.createSeguimiento902.controls["publicacionResolucionCierre"].setValue(
          seguimiento902EtapaCierreData.publicacionResolucionCierre
        );
        this.createSeguimiento902.controls["fechaPublicacion"].setValue(
          this.changeDate(seguimiento902EtapaCierreData.fechaPublicacion)
        );
        this.createSeguimiento902.controls["recursoResolucionCierre"].setValue(
          seguimiento902EtapaCierreData.recursoResolucionCierre
        );
        this.createSeguimiento902.controls["tipoRecursoId"].setValue(
          seguimiento902EtapaCierreData.tipoRecursoId
        );
        this.createSeguimiento902.controls["numeroResolucionResuelveRecurso"].setValue(
          seguimiento902EtapaCierreData.numeroResolucionResuelveRecurso
        );
        this.createSeguimiento902.controls["fechaResolucionResuelveRecurso"].setValue(
          this.changeDate(seguimiento902EtapaCierreData.fechaResolucionResuelveRecurso)
        );
        this.viewMotivoOposicionCierre = seguimiento902EtapaCierreData.oposicion;
        this.viewFechaNotificacionPersonalCierre = seguimiento902EtapaCierreData.notificacionPersonalCierre;
        this.viewFechaNotificacionPorAvisoCierre = seguimiento902EtapaCierreData.notificacionPorAvisoCierre;
        this.viewFechaPublicacionResolucionCierre = seguimiento902EtapaCierreData.publicacionResolucionCierre;
        this.viewResolucionCierre = seguimiento902EtapaCierreData.recursoResolucionCierre;
      });
  }

  clearEtapaCierre() {
    this.finalStageButton = "add";
    this.createSeguimiento902.controls["tipoDecisionDeCierreId"].setValue(null);
    this.createSeguimiento902.controls["abogadoProyeccionCierreId"].setValue(null);
    this.createSeguimiento902.controls["oposicion"].setValue(null);
    this.createSeguimiento902.controls["motivoOposicion"].setValue(null);
    this.createSeguimiento902.controls["fechaRadicadoOposicion"].setValue(null);
    this.createSeguimiento902.controls["numeroDeResolucionDeCierre"].setValue(null);
    this.createSeguimiento902.controls["fechaResolucionDeCierre"].setValue(null);
    this.createSeguimiento902.controls["notificacionPersonalCierre"].setValue(null);
    this.createSeguimiento902.controls["fechaNotificacionPersonalCierre"].setValue(null);
    this.createSeguimiento902.controls["notificacionPorAvisoCierre"].setValue(null);
    this.createSeguimiento902.controls["fechaFijacionNotificacionPorAvisoCierre"].setValue(null);
    this.createSeguimiento902.controls["publicacionResolucionCierre"].setValue(null);
    this.createSeguimiento902.controls["fechaPublicacion"].setValue(null);
    this.createSeguimiento902.controls["recursoResolucionCierre"].setValue(null);
    this.createSeguimiento902.controls["tipoRecursoId"].setValue(null);
    this.createSeguimiento902.controls["numeroResolucionResuelveRecurso"].setValue(null);
    this.createSeguimiento902.controls["fechaResolucionResuelveRecurso"].setValue(null);
    this.viewMotivoOposicionCierre = false;
    this.viewFechaNotificacionPersonalCierre = false;
    this.viewFechaNotificacionPorAvisoCierre = false;
    this.viewFechaPublicacionResolucionCierre = false;
    this.viewResolucionCierre = false;
  }

  getDataFormEtapaCierre() {
    const formData = this.createSeguimiento902.value;
    return {
      seguimiento902Id: this.seguimiento902Id,
      tipoDecisionDeCierreId: formData.tipoDecisionDeCierreId,
      abogadoProyeccionCierreId: formData.abogadoProyeccionCierreId,
      oposicion: formData.oposicion,
      motivoOposicion: formData.motivoOposicion,
      fechaRadicadoOposicion: formData.fechaRadicadoOposicion,
      numeroDeResolucionDeCierre: formData.numeroDeResolucionDeCierre,
      fechaResolucionDeCierre: formData.fechaResolucionDeCierre,
      notificacionPersonalCierre: formData.notificacionPersonalCierre,
      fechaNotificacionPersonalCierre: formData.fechaNotificacionPersonalCierre,
      notificacionPorAvisoCierre: formData.notificacionPorAvisoCierre,
      fechaFijacionNotificacionPorAvisoCierre: formData.fechaFijacionNotificacionPorAvisoCierre,
      publicacionResolucionCierre: formData.publicacionResolucionCierre,
      fechaPublicacion: formData.fechaPublicacion,
      recursoResolucionCierre: formData.recursoResolucionCierre,
      tipoRecursoId: formData.tipoRecursoId,
      numeroResolucionResuelveRecurso: formData.numeroResolucionResuelveRecurso,
      fechaResolucionResuelveRecurso: formData.fechaResolucionResuelveRecurso,
    };
  }

  addEtapaCierre() {
    if (!$(".card-wizard form").valid()) {
      this.toastr.error("Formulario Invalido", "Seguimiento 902");
    } else {
      const data = this.getDataFormEtapaCierre();
      this.seguimiento902Service.postCreateSeguimiento902EtapaCierre(data).subscribe((result) => {
        this.toastr.success(
          "RESOLUCIÓN DE MODIFICACIÓN / ACLARACIÓN creada con exito",
          "Seguimiento 902"
        );
        this.getSeguimiento902EtapaCierreBySeguimiento902Id(this.seguimiento902Id);
        this.clearEtapaCierre();
      });
    }
  }

  editEtapaCierre() {
    const data = this.getDataFormEtapaCierre();
    const finalData = {
      ...data,
      id: this.finalStageId,
    };
    this.seguimiento902Service.putUpdateSeguimiento902EtapaCierre(finalData).subscribe(() => {
      this.toastr.success(
        "RESOLUCIÓN DE MODIFICACIÓN / ACLARACIÓN editada con exito",
        "Seguimiento 902"
      );
      this.getSeguimiento902EtapaCierreBySeguimiento902Id(this.seguimiento902Id);
    });
  }

  deleteEtapaCierre() {
    this.seguimiento902Service
      .deleteSeguimiento902EtapaCierre(this.finalStageId)
      .subscribe((result) => {
        this.toastr.success(
          "RESOLUCIÓN DE MODIFICACIÓN / ACLARACIÓN eliminada con exito",
          "Seguimiento 902"
        );
        this.getSeguimiento902EtapaCierreBySeguimiento902Id(this.seguimiento902Id);
        this.finalStageButton = "add";
      });
  }
}
