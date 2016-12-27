export const template = `
<div class="appcontainer">
    <div *ngIf="enableChild">
        <weather [amounttowns]="amountTowns" [location]="coordinates"></weather>     
        <googlemap [zoom]="zoom" [location]="coordinates"></googlemap>
    </div>
</div>
`;
