import { Router } from '@angular/router';
import { ClientService } from '../../classes/services/client.service';
import { Component, OnInit } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent  implements OnInit {
  code: number = 0;
  userName: string = '';
  email: string = '';
  lastName: string = '';

  constructor(private Clientservice: ClientService, private router: Router) {}

  ngOnInit() {
    const client = this.Clientservice.getClient();
    console.log('code:', client.code);
    console.log('nom:', client.name);
    console.log('lastname:', client.lastname);
    console.log('email:', client.email);
    console.log('Client:', client);
    this.userName = client.name;
    this.lastName = client.lastname;
  }

  Clientinfo(): void {

  }
  clearLocalStorage(): void {
    localStorage.clear();
    console.log('Local storage cleared');
    this.router.navigate(['login']);
  }
  logout(): void {
    localStorage.clear();
    console.log('Local storage cleared');
    this.router.navigate(['login']);
  }

  side1() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['client'], { state: { client } });
  }
  side2() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['profil'], { state: { client } });
  }
  side3() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['historique'], { state: { client } });
  }
  side4() {
    const client = this.Clientservice.getClient();
    this.router.navigate(['validation'], { state: { client } });
  }
  saveChanges(){}
}
