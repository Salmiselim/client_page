import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../classes/services/client.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Admin, Message } from '../../classes/models/message';
import { ChatService } from '../../classes/services/chat.service';
import { Client } from '../../classes/models/client';
import { ChatComponent } from '../chat/chat.component';
import { ResponsableService } from '../../classes/services/responsable.service';
import { Responsable } from '../../classes/models/responsable';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements  OnInit {
  code_cli: number = 0;
  userName: string = '';
  email: string = '';
  lastName: string = '';
  messages: Message[] = [];
  client!: Client;
  responsable!: Responsable;
  currentDate: string | undefined;
  showProfilePopup: boolean = false;




  constructor(
    private Clientservice: ClientService,
    private ResponsableService: ResponsableService,
    private chatService: ChatService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    this.currentDate = today.toLocaleDateString('fr-fr', options);

    const client = this.Clientservice.getClient();
    if (client) {
      this.userName = client.name;
      this.lastName = client.lastname;
      this.code_cli = client.code;
    } else {
      const responsable = this.ResponsableService.getResponsable();
      if (responsable) {
        this.userName = responsable.name;
        this.lastName = responsable.lastname;
        this.code_cli = responsable.codeResponsable;
      }
    }

    this.chatService.connect(() => {
      this.chatService.receiveMessages();
    });

    console.log("this.admin");

    let clientData = localStorage.getItem('client');
    if (clientData !== null) {
      this.client = JSON.parse(clientData);
    }

    let responsableData = localStorage.getItem('responsable');
    if (responsableData !== null) {
      this.responsable = JSON.parse(responsableData);
    }
  }

  toggleProfilePopup() {
    this.showProfilePopup = !this.showProfilePopup;
  }

  goToProfile() {
    // Implement navigation to profile page
  }

  Clientinfo(): void {
    // Implement Clientinfo function
  }
  logout(): void {
    localStorage.clear();
    console.log('Local storage cleared');
    this.router.navigate(['login']);
  }

}
