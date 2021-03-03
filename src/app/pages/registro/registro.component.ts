import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  constructor(private auth: AuthService,
              private router:Router) { }

  ngOnInit() {

    this.usuario = new UsuarioModel;

   }

  onSubmit(form: NgForm) {
    Swal.fire({
      allowOutsideClick:false,
      text: 'espere por favor',
      icon: 'info',

    })
    Swal.showLoading();

    if (form.invalid) { return;}
   
    this.auth.NuevoUsuario(this.usuario)
      .subscribe(resp => {
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email',this.usuario.email);
        }
        this.router.navigateByUrl('/home');
        console.log(resp);
      }, (err) => {
          console.log(err.error.error.message);

          Swal.fire({
         
            icon: 'error',
            title: 'error al registrar',
            text: err.error.error.message
      
          });
      });
   }
}
