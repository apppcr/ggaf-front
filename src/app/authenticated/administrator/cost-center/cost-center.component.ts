import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CentroDeCusto } from '../../../core/models/centro-de-custo.model';
import { NewCostCenterComponent } from './dialog/new-cost-center/new-cost-center.component';

@Component({
    selector: 'app-cost-center',
    templateUrl: './cost-center.component.html',
    styleUrls: ['./cost-center.component.scss']
})
export class CostCenterComponent implements OnInit {

    displayedColumns: string[] = ['id', 'nome', 'excluir', 'editar'];
    dataSource = new MatTableDataSource<CentroDeCusto>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    openDialogNewCostCenter(): void {
        const dialogRef = this.dialog.open(NewCostCenterComponent, {
            width: '600px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}

const ELEMENT_DATA: CentroDeCusto[] = [
    { id: 1, name: "nome 1" },
    { id: 2, name: "nome 2" },
    { id: 3, name: "nome 3" },
    { id: 4, name: "nome 4" },
    { id: 5, name: "nome 5" },
    { id: 6, name: "nome 6" },
    { id: 7, name: "nome 7" },
    { id: 8, name: "nome 8" },
    { id: 9, name: "nome 9" },
]
