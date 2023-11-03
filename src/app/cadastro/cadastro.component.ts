import { Component } from '@angular/core';
import { CadastroService } from '../cadastro.service';
import { Guid } from "guid-typescript";
import { CepService } from '../cep.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  cadastroObj: CadastroObj;
  cadastroList: CadastroObj[];
  showCadastro: boolean;
  cepService: CepService;

    constructor(private cadSrv: CadastroService, private http: HttpClient){
      
      this.cepService = new CepService(this.http);
      this.cadastroObj = new CadastroObj();
      this.showCadastro = false
      this.cadastroList = [];
      
    }

    ngOnInit(): void{
      this.getAllCadastros();
    }

    SalvarCliente(): void{

      this.cadastroObj.id = Guid.create().toString();
      this.cadastroList.push(this.cadastroObj);
      localStorage.setItem('Cadastros', JSON.stringify(this.cadastroList));
      this.cadastroObj = new CadastroObj();
      this.showCadastro = false;
    }

    cancelaCadastro(): void{
      this.cadastroObj = new CadastroObj();
      this.showCadastro = false;
    } 

    consultaCep(cep: any) {
      debugger
      this.cepService.buscarCEP(cep).subscribe((info) => this.setCep(info));
    }
    
    setCep(info: any) {
      this.cadastroObj.bairro = info.bairro;
      this.cadastroObj.cidade = info.localidade;
      this.cadastroObj.endereco = info.logradouro;
    }
    
    getAllCadastros() {
      if (localStorage.getItem('Cadastros')) {
        const jsonString = localStorage.getItem('Cadastros');
        const json = JSON.parse(jsonString!);

        if (Array.isArray(json)) {
          this.cadastroList = json.map(item => Object.assign(new CadastroObj(), item));
        } else {
          this.cadastroList = [];
        }
      } else {
        this.cadastroList = [];
      }
    }
    
}



export class CadastroObj {
  id: string;
  tipoCliente: string;
  documento: number;
  nomeRazaoSocial: string;
  nomeFantasia: string;
  cep: number;
  endereco: string;
  bairro: string;
  cidade: string;
  telefone: number;
  email: string;

  constructor(){
    this.id="";
    this.tipoCliente="";
    this.documento= 0;
    this.nomeRazaoSocial="";
    this.nomeFantasia="";
    this.cep=0;
    this.endereco="";
    this.bairro="";
    this.cidade="";
    this.telefone=0;
    this.email="";
  }
}