import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    nameUser = '';
    constructor() { }

    ngOnInit(): void {
        this.nameUser = JSON.parse(localStorage.getItem('currentUser')).name
    }

}
