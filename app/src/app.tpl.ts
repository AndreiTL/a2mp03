export const template = `
<div class="rootcontainer">
  <my-header></my-header>
  <div class="appcontainer">
    <div *ngIf="!enableChild">   
        <span>Waiting for location resolve.</span>
    </div>
    <div *ngIf="enableChild">
        <div class="weatherbox">
            <weather [amounttowns]="amountTowns" [location]="coordinates"></weather>
        </div>
        <div class="googlemapbox">
            <googlemap [zoom]="zoom" [location]="coordinates"></googlemap>     
        </div>        
    </div>
  </div>
  <my-footer></my-footer>
</div>
`;
