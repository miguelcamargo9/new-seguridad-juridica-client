import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { InformeTecnicoJuridicoService } from "../informeTecnicoJuridico.service";
import { Subscription } from "rxjs";
import { DomainService } from "src/app/domains/domain.service";
import { Domain } from "src/app/domains/domain.model";
import { Colindante } from "../colindante.model";
import * as ClassicEditor from "ckeditor5-build-alignment-b64image";

@Component({
  selector: "app-crearInformeTecnicoJuridico",
  templateUrl: "./crearInformeTecnicoJuridico.component.html",
})
export class CrearInformeTecnicoJuridicoComponent implements OnInit {
  routeSub: Subscription;
  isLinear = true;

  editor = ClassicEditor;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  editorsFormGroup: FormGroup;
  colindanteForm: FormGroup;

  tipoPredios: Domain[];
  tipoEstadosInformeTecnicoJuridico: Domain[];
  tipoConstrucciones: Domain[];
  tipoUsos: Domain[];
  tipoExplotaciones: Domain[];
  usersAbodago: Domain[];
  usersIngeniero: Domain[];
  cardinalidadValues = ["NORTE", "SUR", "ESTE", "OESTE"];

  solicitudId: number;
  informeTecnicoJuridicoId: number;
  informacionVurId: number;
  informacionCatastralId: number;
  informacionPredialId: number;
  colindanteId: number;

  colindantesInfo: Colindante[] = [];
  colindanteButton: String = "add";

  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private informeTecnicoJuridicoService: InformeTecnicoJuridicoService,
    private domainService: DomainService
  ) {}

  ngOnInit() {
    console.log(this.cardinalidadValues);
    this.initForms();
    this.getDomains();
    this.routeSub = this.route.params.subscribe((params) => {
      this.solicitudId = params["idSolicitud"];
      this.getDataForm(this.solicitudId);
    });
  }

  initForms() {
    this.firstFormGroup = this._formBuilder.group({
      zona: ["", Validators.required],
      sector: ["", Validators.required],
      comuna: ["", Validators.required],
      barrio: ["", Validators.required],
      manzana: ["", Validators.required],
      direccion: ["", Validators.required],
      tipoPredioId: ["", Validators.required],
      idPredial: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      referenciaCatastral: ["", Validators.required],
      analisisDireccion: ["", Validators.required],
      fmiMatriz: ["", Validators.required],
      fmiDerivados: ["", Validators.required],
      tipoEstadoVurId: ["", Validators.required],
      propietario: ["", Validators.required],
      documentoAperturaFmi: ["", Validators.required],
      areaTerreno: ["", Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      direccion: ["", Validators.required],
      folio: ["", Validators.required],
      propietario: ["", Validators.required],
      areaConstruidaR1R2: ["", Validators.required],
      areaTerrenoShp: ["", Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      idProyecto: ["", Validators.required],
      direccion: ["", Validators.required],
      areaConstruidaLevantamiento: ["", Validators.required],
      tipoConstruccionId: ["", Validators.required],
      tipoUsoId: ["", Validators.required],
      tipoExplotacionId: ["", Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      ingenieroElaboroId: ["", Validators.required],
      abogadoElaboroId: ["", Validators.required],
      validadorLiderTecnicoId: ["", Validators.required],
      validadorLiderJuridicoId: ["", Validators.required],
      ingenieroElaboroFecha: ["", Validators.required],
      abogadoElaboroFecha: ["", Validators.required],
      fechaValidacionTecnica: ["", Validators.required],
      fechaValidacionJuridica: ["", Validators.required],
    });
    this.editorsFormGroup = this._formBuilder.group({
      analisisEspacial: ["", Validators.required],
      naturalezaJuridicaPredioAcuerdoEstudioFmi: ["", Validators.required],
      descripcionCaso: ["", Validators.required],
      conclusionRutaJuridica: ["", Validators.required],
    });
    this.colindanteForm = this._formBuilder.group({
      cardinalidad: ["", Validators.required],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
    });
  }

  getDataForm(idSolicitud) {
    this.informeTecnicoJuridicoService.getInformeTecnicoJuridico(idSolicitud).subscribe(
      (informeTecnicoJuridicoData) => {
        console.log("service data", informeTecnicoJuridicoData);

        // FormGroup1
        this.informeTecnicoJuridicoId = informeTecnicoJuridicoData.id;
        this.firstFormGroup.controls["zona"].setValue(informeTecnicoJuridicoData.zona);
        this.firstFormGroup.controls["sector"].setValue(informeTecnicoJuridicoData.sector);
        this.firstFormGroup.controls["comuna"].setValue(informeTecnicoJuridicoData.comuna);
        this.firstFormGroup.controls["barrio"].setValue(informeTecnicoJuridicoData.barrio);
        this.firstFormGroup.controls["manzana"].setValue(informeTecnicoJuridicoData.manzana);
        this.firstFormGroup.controls["direccion"].setValue(informeTecnicoJuridicoData.direccion);
        this.firstFormGroup.controls["tipoPredioId"].setValue(
          informeTecnicoJuridicoData.tipoPredioId
        );
        this.firstFormGroup.controls["idPredial"].setValue(informeTecnicoJuridicoData.idPredial);

        // EditorsGroup
        this.editorsFormGroup.controls["analisisEspacial"].setValue(
          informeTecnicoJuridicoData.analisisEspacial
        );
        this.editorsFormGroup.controls["naturalezaJuridicaPredioAcuerdoEstudioFmi"].setValue(
          informeTecnicoJuridicoData.naturalezaJuridicaPredioAcuerdoEstudioFmi
        );
        this.editorsFormGroup.controls["descripcionCaso"].setValue(
          informeTecnicoJuridicoData.descripcionCaso
        );
        this.editorsFormGroup.controls["conclusionRutaJuridica"].setValue(
          informeTecnicoJuridicoData.conclusionRutaJuridica
        );

        // FormGroup5
        this.fifthFormGroup.controls["ingenieroElaboroId"].setValue(
          informeTecnicoJuridicoData.ingenieroElaboroId
        );
        this.fifthFormGroup.controls["ingenieroElaboroFecha"].setValue(
          this.changeDate(informeTecnicoJuridicoData.ingenieroElaboroFecha)
        );
        this.fifthFormGroup.controls["abogadoElaboroId"].setValue(
          informeTecnicoJuridicoData.abogadoElaboroId
        );
        this.fifthFormGroup.controls["abogadoElaboroFecha"].setValue(
          this.changeDate(informeTecnicoJuridicoData.abogadoElaboroFecha)
        );
        this.fifthFormGroup.controls["validadorLiderTecnicoId"].setValue(
          informeTecnicoJuridicoData.validadorLiderTecnicoId
        );
        this.fifthFormGroup.controls["fechaValidacionTecnica"].setValue(
          this.changeDate(informeTecnicoJuridicoData.fechaValidacionTecnica)
        );
        this.fifthFormGroup.controls["validadorLiderJuridicoId"].setValue(
          informeTecnicoJuridicoData.validadorLiderJuridicoId
        );
        this.fifthFormGroup.controls["fechaValidacionJuridica"].setValue(
          this.changeDate(informeTecnicoJuridicoData.fechaValidacionJuridica)
        );

        // FormGroup2
        this.informeTecnicoJuridicoService
          .getInformacionVurByInformeTecnicoJuridicoId(this.informeTecnicoJuridicoId)
          .subscribe(
            (informacionVurData) => {
              this.informacionVurId = informacionVurData.id;
              this.secondFormGroup.controls["referenciaCatastral"].setValue(
                informacionVurData.referenciaCatastral
              );
              this.secondFormGroup.controls["analisisDireccion"].setValue(
                informacionVurData.analisisDireccion
              );
              this.secondFormGroup.controls["fmiMatriz"].setValue(informacionVurData.fmiMatriz);
              this.secondFormGroup.controls["fmiDerivados"].setValue(
                informacionVurData.fmiDerivados
              );
              this.secondFormGroup.controls["tipoEstadoVurId"].setValue(
                informacionVurData.tipoEstadoVurId
              );
              this.secondFormGroup.controls["propietario"].setValue(informacionVurData.propietario);
              this.secondFormGroup.controls["documentoAperturaFmi"].setValue(
                informacionVurData.documentoAperturaFmi
              );
              this.secondFormGroup.controls["areaTerreno"].setValue(informacionVurData.areaTerreno);
            },
            (error) => {
              console.log("Error Obteniendo el Objeto!" + error);
            }
          );

        // FormGroup3
        this.informeTecnicoJuridicoService
          .getInformacionCatastralByInformeTecnicoJuridicoId(this.informeTecnicoJuridicoId)
          .subscribe(
            (informacionCatastralData) => {
              this.informacionCatastralId = informacionCatastralData.id;
              this.thirdFormGroup.controls["direccion"].setValue(
                informacionCatastralData.direccion
              );
              this.thirdFormGroup.controls["folio"].setValue(informacionCatastralData.folio);
              this.thirdFormGroup.controls["propietario"].setValue(
                informacionCatastralData.propietario
              );
              this.thirdFormGroup.controls["areaConstruidaR1R2"].setValue(
                informacionCatastralData.areaConstruidaR1R2
              );
              this.thirdFormGroup.controls["areaTerrenoShp"].setValue(
                informacionCatastralData.areaTerrenoShp
              );
            },
            (error) => {
              console.log("Error Obteniendo el Objeto!" + error);
            }
          );

        // FormGroup4
        this.informeTecnicoJuridicoService
          .getInformacionPredialByInformeTecnicoJuridicoId(this.informeTecnicoJuridicoId)
          .subscribe(
            (informacionPredialData) => {
              this.informacionPredialId = informacionPredialData.id;
              this.fourthFormGroup.controls["idProyecto"].setValue(
                informacionPredialData.idProyecto
              );
              this.fourthFormGroup.controls["direccion"].setValue(informacionPredialData.direccion);
              this.fourthFormGroup.controls["areaConstruidaLevantamiento"].setValue(
                informacionPredialData.areaConstruidaLevantamiento
              );
              this.fourthFormGroup.controls["tipoConstruccionId"].setValue(
                informacionPredialData.tipoConstruccionId
              );
              this.fourthFormGroup.controls["tipoUsoId"].setValue(informacionPredialData.tipoUsoId);
              this.fourthFormGroup.controls["tipoExplotacionId"].setValue(
                informacionPredialData.tipoExplotacionId
              );
            },
            (error) => {
              console.log("Error Obteniendo el Objeto!" + error);
            }
          );
        //INFORMACION DE COLINDANTES
        this.getColindantesByInformeTecnicoJuridicoId(this.informeTecnicoJuridicoId);
      },
      (error) => {
        console.log("Error Obteniendo el Objeto!" + error);
      }
    );
  }

  getDomains() {
    this.domainService.getTipoPredio().subscribe(
      (data) => {
        this.tipoPredios = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoEstadoVur().subscribe(
      (data) => {
        this.tipoEstadosInformeTecnicoJuridico = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoConstruccion().subscribe(
      (data) => {
        this.tipoConstrucciones = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoUso().subscribe(
      (data) => {
        this.tipoUsos = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
    this.domainService.getTipoExplotacion().subscribe(
      (data) => {
        this.tipoExplotaciones = data;
      },
      (error) => {
        console.log("It don't getDomain!" + error);
      }
    );
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

  save(nameForm, redirect = false) {
    switch (nameForm) {
      case "firstFormGroup":
        const data = this.firstFormGroup.value;
        data.id = this.informeTecnicoJuridicoId * 1;
        data.solicitudId = this.solicitudId * 1;
        if (this.informeTecnicoJuridicoId == null || this.informeTecnicoJuridicoId == 0) {
          console.log("Create");
          this.informeTecnicoJuridicoService
            .postCreateInformeTecnicoJuridico(data)
            .subscribe((result) => {
              this.informeTecnicoJuridicoId = result;
              this.toastr.success("Formulario Creado Correctamente", "Informe Tecnico Juridico");
              if (redirect) this.router.navigate(["/solicitudes/ver/" + data.solicitudId]);
            });
        } else {
          console.log("Update");
          this.informeTecnicoJuridicoService
            .putUpdateInformeTecnicoJuridico(data)
            .subscribe((params) => {
              this.toastr.success(
                "Formulario Actualizado Correctamente",
                "Informe Tecnico Juridico"
              );
              if (redirect) this.router.navigate(["/solicitudes/ver/" + data.solicitudId]);
            });
        }
        break;
      case "secondFormGroup":
        const dataSecondFormGroup = this.secondFormGroup.value;
        dataSecondFormGroup.id = this.informacionVurId * 1;
        dataSecondFormGroup.solicitudId = this.solicitudId * 1;
        dataSecondFormGroup.informeTecnicoJuridicoId = this.informeTecnicoJuridicoId * 1;
        if (this.informacionVurId == null || this.informacionVurId == 0) {
          console.log("Create");
          this.informeTecnicoJuridicoService
            .postCreateInformacionVur(dataSecondFormGroup)
            .subscribe((result) => {
              this.informacionVurId = result;
              this.toastr.success("Formulario Creado Correctamente", "Informe Tecnico Juridico");
              if (redirect)
                this.router.navigate(["/solicitudes/ver/" + dataSecondFormGroup.solicitudId]);
            });
        } else {
          console.log("Update");
          this.informeTecnicoJuridicoService
            .putUpdateInformacionVur(dataSecondFormGroup)
            .subscribe((params) => {
              this.toastr.success(
                "Formulario Actualizado Correctamente",
                "Informe Tecnico Juridico"
              );
              if (redirect)
                this.router.navigate(["/solicitudes/ver/" + dataSecondFormGroup.solicitudId]);
            });
        }
        break;
      case "thirdFormGroup":
        const dataThirdFormGroup = this.thirdFormGroup.value;
        dataThirdFormGroup.id = this.informacionCatastralId * 1;
        dataThirdFormGroup.solicitudId = this.solicitudId * 1;
        dataThirdFormGroup.informeTecnicoJuridicoId = this.informeTecnicoJuridicoId * 1;
        if (this.informacionCatastralId == null || this.informacionCatastralId == 0) {
          console.log("Create");
          this.informeTecnicoJuridicoService
            .postCreateInformacionCatastral(dataThirdFormGroup)
            .subscribe((result) => {
              this.informacionCatastralId = result;
              this.toastr.success("Formulario Creado Correctamente", "Informe Tecnico Juridico");
              if (redirect)
                this.router.navigate(["/solicitudes/ver/" + dataThirdFormGroup.solicitudId]);
            });
        } else {
          console.log("Update");
          this.informeTecnicoJuridicoService
            .putUpdateInformacionCatastral(dataThirdFormGroup)
            .subscribe((params) => {
              this.toastr.success(
                "Formulario Actualizado Correctamente",
                "Informe Tecnico Juridico"
              );
              if (redirect)
                this.router.navigate(["/solicitudes/ver/" + dataThirdFormGroup.solicitudId]);
            });
        }
        break;
      case "fourthFormGroup":
        const dataFourthFormGroup = this.fourthFormGroup.value;
        dataFourthFormGroup.id = this.informacionPredialId * 1;
        dataFourthFormGroup.solicitudId = this.solicitudId * 1;
        dataFourthFormGroup.informeTecnicoJuridicoId = this.informeTecnicoJuridicoId * 1;
        if (this.informacionPredialId == null || this.informacionPredialId == 0) {
          console.log("Create");
          this.informeTecnicoJuridicoService
            .postCreateInformacionPredial(dataFourthFormGroup)
            .subscribe((result) => {
              this.informacionPredialId = result;
              this.toastr.success("Formulario Creado Correctamente", "Informe Tecnico Juridico");
              if (redirect)
                this.router.navigate(["/solicitudes/ver/" + dataFourthFormGroup.solicitudId]);
            });
        } else {
          console.log("Update");
          this.informeTecnicoJuridicoService
            .putUpdateInformacionPredial(dataFourthFormGroup)
            .subscribe((params) => {
              this.toastr.success(
                "Formulario Actualizado Correctamente",
                "Informe Tecnico Juridico"
              );
              if (redirect)
                this.router.navigate(["/solicitudes/ver/" + dataFourthFormGroup.solicitudId]);
            });
        }
        break;
      case "fifthFormGroup":
        if (this.fifthFormGroup.invalid) {
          console.log("Invalido", this.findInvalidControls(this.fifthFormGroup));
          this.toastr.error("Formulario Invalido", "Informe Tecnico Juridico");
          return;
        } else {
          const dataFifthFormGroup = this.fifthFormGroup.value;
          dataFifthFormGroup.solicitudId = this.solicitudId * 1;
          dataFifthFormGroup.id = this.informeTecnicoJuridicoId * 1;
          if (this.informeTecnicoJuridicoId == null || this.informeTecnicoJuridicoId == 0) {
            console.log("Create");
            this.informeTecnicoJuridicoService
              .postCreateInformeTecnicoJuridico(dataFifthFormGroup)
              .subscribe((result) => {
                this.informeTecnicoJuridicoId = result;
                this.toastr.success("Formulario Creado Correctamente", "Informe Tecnico Juridico");
                if (redirect)
                  this.router.navigate(["/solicitudes/ver/" + dataFifthFormGroup.solicitudId]);
              });
          } else {
            console.log("Update");
            this.informeTecnicoJuridicoService
              .putUpdateInformeTecnicoJuridicoUltimaHoja(dataFifthFormGroup)
              .subscribe((params) => {
                this.toastr.success(
                  "Formulario Actualizado Correctamente",
                  "Informe Tecnico Juridico"
                );
                if (redirect)
                  this.router.navigate(["/solicitudes/ver/" + dataFifthFormGroup.solicitudId]);
              });
          }
        }
        break;
      case "editorsFormGroup":
        if (this.editorsFormGroup.invalid) {
          console.log("Invalido", this.findInvalidControls(this.editorsFormGroup));
          this.toastr.error("Formulario Invalido", "Informe Tecnico Juridico");
          return;
        } else {
          const dataEditorsFormGroup = this.editorsFormGroup.value;
          dataEditorsFormGroup.solicitudId = this.solicitudId * 1;
          dataEditorsFormGroup.id = this.informeTecnicoJuridicoId * 1;
          if (this.informeTecnicoJuridicoId == null || this.informeTecnicoJuridicoId == 0) {
            console.log("Create");
            this.informeTecnicoJuridicoService
              .postCreateInformeTecnicoJuridico(dataEditorsFormGroup)
              .subscribe((result) => {
                this.informeTecnicoJuridicoId = result;
                this.toastr.success("Formulario Creado Correctamente", "Informe Tecnico Juridico");
                if (redirect)
                  this.router.navigate(["/solicitudes/ver/" + dataEditorsFormGroup.solicitudId]);
              });
          } else {
            console.log("Update");
            this.informeTecnicoJuridicoService
              .putUpdateInformeTecnicoJuridicoTexts(dataEditorsFormGroup)
              .subscribe((params) => {
                this.toastr.success(
                  "Formulario Actualizado Correctamente",
                  "Informe Tecnico Juridico"
                );
                if (redirect)
                  this.router.navigate(["/solicitudes/ver/" + dataEditorsFormGroup.solicitudId]);
              });
          }
        }
        break;
      case "colindanteForm":
        if (this.colindantesInfo.length <= 0 && this.colindanteForm.invalid) {
          console.log("Invalido no sale", this.findInvalidControls(this.fifthFormGroup));
          this.toastr.error("Formulario Invalido", "Informe Tecnico Juridico");
          return;
        }
        break;
    }
  }

  clearColindante() {
    this.colindanteButton = "add";
    this.colindanteForm.controls["nombre"].setValue(null);
    this.colindanteForm.controls["apellido"].setValue(null);
    this.colindanteForm.controls["cardinalidad"].setValue(null);
  }

  loadColindantes(colindanteId: number, process: String) {
    this.colindanteId = colindanteId;
    this.colindanteButton = process;
    this.informeTecnicoJuridicoService
      .getColindanteByid(colindanteId)
      .subscribe((colindanteData) => {
        this.colindanteForm.controls["nombre"].setValue(colindanteData.nombre || null);
        this.colindanteForm.controls["apellido"].setValue(colindanteData.apellido);
        this.colindanteForm.controls["cardinalidad"].setValue(
          this.cardinalidadValues.indexOf(colindanteData.cardinalidad)
        );
      });
  }

  getColindantesByInformeTecnicoJuridicoId(seguimiento902Id: number) {
    console.log("Llenando informacion");
    this.informeTecnicoJuridicoService
      .geColindanteByInformeTecnicoJuridicoId(seguimiento902Id)
      .subscribe((dataColindante) => {
        this.colindantesInfo = dataColindante;
        if (this.colindantesInfo[0]) {
          //this.loadColindantes(this.colindantesInfo[0].id, "add");
        }
      });
  }

  getDataFormColindantes() {
    const formData = this.colindanteForm.value;
    return {
      informeTecnicoJuridicoId: this.informeTecnicoJuridicoId,
      nombre: formData.nombre,
      apellido: formData.apellido,
      cardinalidad: formData.cardinalidad,
    };
  }

  addColindante() {
    if (this.colindanteForm.invalid) {
      console.log("Invalido", this.findInvalidControls(this.fifthFormGroup));
      this.toastr.error("Formulario Invalido", "Informe Tecnico Juridico");
    } else {
      const data = this.getDataFormColindantes();
      this.informeTecnicoJuridicoService.postCreateColindante(data).subscribe((result) => {
        this.toastr.success("Colindante creado con exito", "Informe Tecnico Juridico");
        this.getColindantesByInformeTecnicoJuridicoId(this.informeTecnicoJuridicoId);
        this.clearColindante();
      });
    }
  }

  editColindante() {
    const data = this.getDataFormColindantes();
    const finalData = {
      ...data,
      id: this.colindanteId,
    };
    this.informeTecnicoJuridicoService.putUpdateColindante(finalData).subscribe(() => {
      this.toastr.success("Colindante editada con exito", "Informe Tecnico Juridico");
      this.getColindantesByInformeTecnicoJuridicoId(this.informeTecnicoJuridicoId);
    });
  }

  deleteColindante() {
    this.informeTecnicoJuridicoService.deleteColindante(this.colindanteId).subscribe((result) => {
      this.toastr.success("Colindante eliminado con exito", "Informe Tecnico Juridico");
      this.getColindantesByInformeTecnicoJuridicoId(this.informeTecnicoJuridicoId);
      this.colindanteButton = "add";
      this.clearColindante();
    });
  }

  onNext(formGroup, nameForm) {
    if (nameForm === "colindanteForm" && this.colindantesInfo.length <= 0 && formGroup.invalid) {
      console.log("Invalido", this.findInvalidControls(formGroup));
      this.toastr.error("Formulario Invalido", "Informe Tecnico Juridico");
      return;
    } else if (formGroup.invalid && nameForm !== "colindanteForm") {
      console.log("Invalido", this.findInvalidControls(formGroup));
      this.toastr.error("Formulario Invalido", "Informe Tecnico Juridico");
      return;
    } else {
      this.save(nameForm);
    }
  }

  findInvalidControls(formGroup) {
    const invalid = [];
    const controls = formGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  changeDate(d: Date) {
    if (d == null) return null;
    return new Date(d);
  }
  showDate(d: String) {
    if (d == null) return null;
    return d.substring(0, 10);
  }
}