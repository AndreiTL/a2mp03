export const template: string = `
<div class="appcontainer">
    <googlemap [location]="this.getLocation | async" [zoom]="this.zoom"></googlemap>
    <weather [amounttowns]="this.amountTowns" [location]="this.getLocation | async"></weather>     
</div>
`;