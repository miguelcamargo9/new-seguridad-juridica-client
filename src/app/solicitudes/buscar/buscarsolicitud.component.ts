import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { SolicitudService } from "../solicitudes.service";
import { Solicitud } from "../solicitudes.model";
import { Subject } from "rxjs";

interface TypeSeach {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-buscarsolicitud-cmp",
  templateUrl: "buscarsolicitud.component.html"
})
export class BuscarSolicitudComponent implements OnInit {
  typesSearch: TypeSeach[] = [
    { value: "expedienteSIT", viewValue: "Expediente SIT" },
    { value: "fiso", viewValue: "FISO" },
    { value: "folio", viewValue: "Folio de matrícula inmobiliaria" },
    { value: "cedulaSolicitante", viewValue: "Cedula Solicitante" },
    { value: "nombreSolicitante", viewValue: "Nombre Solicitante" }
  ];
  buscarSolicitud: FormGroup;
  // dtOptions: DataTables.Settings = {};
  solicitudes: Solicitud[];
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit() {
    this.buscarSolicitud = this.formBuilder.group({
      searchValue: [null, [Validators.required]],
      typeSearch: [null, [Validators.required]]
    });
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

  onSubmit() {
    if (this.buscarSolicitud.valid) {
      this.solicitudService
        .postBuscarSolicitud(this.buscarSolicitud.value)
        .subscribe(resultSolicitudes => {
          this.solicitudes = resultSolicitudes;
          this.dtTrigger.next();
        });
    } else {
      this.toastr.error("Formulario Invalido", "Buscar Solicitud");
    }
  }

  standardWord(str) {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÇç",
        to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuucc",
        mapping = {};

    for(let i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );


      var ret = [];
      for( let i = 0, j = str.length; i < j; i++ ) {
        var c = str.charAt( i );
        if( mapping.hasOwnProperty( str.charAt( i ) ) )
          ret.push( mapping[ c ] );
        else
          ret.push( c );
      }
      console.log("STrign finallll: ", ret.join( '' ))
      return ret.join( '' );

  };
}
